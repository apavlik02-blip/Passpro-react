// ARIA — Claude-powered study coach for PassPro.
//
// Ported from apavlik02-ctrl/ARIA-AI-Agent's app/api/aria/route.ts. Runs as
// a Supabase Edge Function (not a Next.js route) since PassPro is a plain
// Vite SPA with no server of its own. This is the only thing allowed to
// read/write aria_progress (see migrations/20260711120000_aria_progress.sql)
// and the only place ANTHROPIC_API_KEY / the service role key are used.
//
// Secrets required (supabase secrets set):
//   ANTHROPIC_API_KEY   - Anthropic API key
//   CLERK_ISSUER         - Clerk "Frontend API" URL, e.g. https://xyz.clerk.accounts.dev
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are injected automatically by Supabase.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { verifyClerkToken } from '../_shared/clerk.ts'
import {
  calculateNewReadiness,
  getDefaultProgress,
  updateStudyStreak,
  updateWeakDomains,
  type OnboardingData,
  type UserProgress,
} from './progress.ts'
import {
  analyzeReadiness,
  createStudySchedule,
  generatePracticeQuestions,
  getInsuranceRegulation,
} from './tools.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function detectIntent(message: string): { tool?: string; params?: Record<string, string> } {
  const lower = message.toLowerCase()

  if (lower.includes('quiz') || lower.includes('practice question') || lower.includes('diagnostic')) {
    return { tool: 'generate_practice_questions' }
  }
  if (lower.includes('analyze') || lower.includes('readiness') || lower.includes('how am i doing')) {
    return { tool: 'analyze_readiness' }
  }
  if (lower.includes('study plan') || lower.includes('study schedule')) {
    return { tool: 'create_study_schedule' }
  }
  if (
    lower.includes('wisconsin') &&
    (lower.includes('grace') ||
      lower.includes('free look') ||
      lower.includes('incontestab') ||
      lower.includes('replacement'))
  ) {
    const topic = lower.includes('grace')
      ? 'grace_period'
      : lower.includes('free look')
        ? 'free_look'
        : lower.includes('incontestab')
          ? 'incontestability'
          : 'replacement'
    return { tool: 'get_insurance_regulation', params: { state: 'Wisconsin', topic } }
  }

  return {}
}

const ONBOARDING_EXAM_TYPES = ['life', 'health', 'both']

function sanitizeOnboarding(raw: Record<string, unknown>): OnboardingData {
  const examType =
    typeof raw.exam_type === 'string' && ONBOARDING_EXAM_TYPES.includes(raw.exam_type)
      ? (raw.exam_type as OnboardingData['exam_type'])
      : null
  const examDate =
    typeof raw.exam_date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(raw.exam_date)
      ? raw.exam_date
      : null
  const hours = Number(raw.hours_per_week)
  const hoursPerWeek = Number.isFinite(hours) && hours > 0 ? Math.min(40, Math.round(hours)) : null
  const conf = Number(raw.confidence)
  const confidence = Number.isFinite(conf) ? Math.max(0, Math.min(100, Math.round(conf))) : null

  return {
    exam_type: examType,
    exam_date: examDate,
    hours_per_week: hoursPerWeek,
    confidence,
    skipped: raw.skipped === true,
    completed_at: new Date().toISOString(),
  }
}

function isMissingColumnError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false
  // PGRST204: column not found in schema cache (PostgREST); 42703: undefined column (Postgres).
  return (
    error.code === 'PGRST204' ||
    error.code === '42703' ||
    /onboarding/i.test(error.message ?? '')
  )
}

async function getOrCreateProgress(
  // deno-lint-ignore no-explicit-any
  supabase: any,
  userId: string,
): Promise<UserProgress> {
  const { data } = await supabase.from('aria_progress').select('*').eq('user_id', userId).single()
  if (data) return data as UserProgress

  const defaultProgress = getDefaultProgress(userId)
  await supabase.from('aria_progress').insert(defaultProgress)
  return defaultProgress
}

async function updateProgressAfterQuiz(
  // deno-lint-ignore no-explicit-any
  supabase: any,
  userId: string,
  currentProgress: UserProgress,
  quizResult: { overall_score: number; domain_scores: Record<string, number> },
) {
  const newReadiness = calculateNewReadiness(currentProgress.current_readiness, quizResult)
  const newWeakDomains = updateWeakDomains(currentProgress.weak_domains, quizResult.domain_scores)
  const newStreak = updateStudyStreak(currentProgress.study_streak, currentProgress.last_study_date)

  const quizEntry = {
    date: new Date().toISOString(),
    score: quizResult.overall_score,
    domain_scores: quizResult.domain_scores,
  }
  const updatedHistory = [...(currentProgress.quiz_history || []), quizEntry].slice(-10)

  await supabase
    .from('aria_progress')
    .update({
      current_readiness: newReadiness,
      weak_domains: newWeakDomains,
      last_quiz_score: quizResult.overall_score,
      quiz_history: updatedHistory,
      study_streak: newStreak,
      last_study_date: new Date().toISOString().split('T')[0],
    })
    .eq('user_id', userId)

  return { new_readiness: newReadiness, weak_domains: newWeakDomains, study_streak: newStreak }
}

async function callClaude(messages: Message[], systemPrompt: string) {
  const apiKey = Deno.env.get('ANTHROPIC_API_KEY')
  if (!apiKey) {
    return {
      type: 'claude_fallback',
      message:
        "I'm ARIA, your insurance exam coach! I can help with practice questions, study plans, and readiness analysis. Try asking me for a quiz or to analyze your readiness.",
    }
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw new Error(errorBody?.error?.message || `Claude API error (${response.status})`)
  }

  const data = await response.json()
  const text = data.content?.find((b: { type: string }) => b.type === 'text')?.text || ''
  return { type: 'claude_response', message: text }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization') || ''
    const token = authHeader.replace(/^Bearer\s+/i, '')
    if (!token) {
      return json({ type: 'error', message: 'Missing Authorization header' }, 401)
    }

    let userId: string
    try {
      userId = await verifyClerkToken(token)
    } catch {
      return json({ type: 'error', message: 'Invalid or expired session' }, 401)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const body = await req.json()
    const { messages, action, payload, context } = body as {
      messages?: Message[]
      action?: string
      payload?: {
        quizResult?: { overall_score: number; domain_scores: Record<string, number> }
        onboarding?: Record<string, unknown>
      }
      context?: string
    }

    if (action === 'submit_quiz_result' && payload?.quizResult) {
      const progress = await getOrCreateProgress(supabase, userId)
      const updated = await updateProgressAfterQuiz(supabase, userId, progress, payload.quizResult)
      return json({
        type: 'progress_updated',
        data: updated,
        message: `Great job! Your new readiness is ${updated.new_readiness}%.`,
      })
    }

    if (action === 'save_onboarding' && payload?.onboarding) {
      const progress = await getOrCreateProgress(supabase, userId)
      const onboarding = sanitizeOnboarding(payload.onboarding)

      const updates: Record<string, unknown> = { onboarding }
      if (!onboarding.skipped) {
        if (onboarding.exam_type) updates.exam_type = onboarding.exam_type
        if (onboarding.confidence !== null) updates.current_readiness = onboarding.confidence
      }

      let { error } = await supabase.from('aria_progress').update(updates).eq('user_id', userId)
      if (error && isMissingColumnError(error)) {
        // The `onboarding jsonb` column hasn't been migrated yet (see README).
        // Persist the fields that fit the current schema so nothing hard-fails;
        // the client also keeps a local completion flag for show-once behavior.
        const fallback = { ...updates }
        delete fallback.onboarding
        if (Object.keys(fallback).length > 0) {
          ;({ error } = await supabase.from('aria_progress').update(fallback).eq('user_id', userId))
        } else {
          error = null
        }
      }
      if (error) {
        return json({ type: 'error', message: 'Could not save onboarding' }, 500)
      }

      return json({ type: 'progress', data: { ...progress, ...updates, onboarding } })
    }

    if (action === 'get_progress') {
      const progress = await getOrCreateProgress(supabase, userId)
      return json({ type: 'progress', data: progress })
    }

    if (!messages || !Array.isArray(messages)) {
      return json({ type: 'error', message: 'messages array is required' }, 400)
    }

    const userProgress = await getOrCreateProgress(supabase, userId)
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || ''
    const intent = detectIntent(lastUserMessage)

    if (intent.tool) {
      // deno-lint-ignore no-explicit-any
      let toolData: any
      let message = ''

      switch (intent.tool) {
        case 'generate_practice_questions': {
          const domains = userProgress.weak_domains?.length
            ? [...userProgress.weak_domains, 'life_types', 'policy_provisions']
            : ['life_types', 'policy_provisions', 'wisconsin_regulation']
          toolData = await generatePracticeQuestions(supabase, domains.slice(0, 5), 6, 'mixed')
          message = "Here's a diagnostic quiz tailored to your current weak areas."
          break
        }
        case 'analyze_readiness': {
          const latestQuiz = userProgress.quiz_history?.[userProgress.quiz_history.length - 1]
          const quizResults = latestQuiz
            ? { overall_score: latestQuiz.score, domain_scores: latestQuiz.domain_scores }
            : { overall_score: 58, domain_scores: { policy_provisions: 48, wisconsin_regulation: 55 } }
          toolData = analyzeReadiness(quizResults, undefined, userProgress.current_readiness)
          message = "Here's your latest readiness analysis."
          break
        }
        case 'create_study_schedule': {
          // Prefer the exam date / weekly hours captured during onboarding;
          // fall back to the historical defaults (45 days out, 45 min/day).
          const onboarding = userProgress.onboarding
          const today = new Date().toISOString().split('T')[0]
          const fallbackExamDate = new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0]
          const examDate =
            onboarding?.exam_date && onboarding.exam_date > today
              ? onboarding.exam_date
              : fallbackExamDate
          const dailyMinutes = onboarding?.hours_per_week
            ? Math.max(20, Math.min(120, Math.round((onboarding.hours_per_week * 60) / 7 / 5) * 5))
            : 45
          toolData = createStudySchedule(
            examDate,
            userProgress.current_readiness || 50,
            userProgress.weak_domains || ['policy_provisions'],
            dailyMinutes,
          )
          message = 'Personalized study schedule created based on your progress.'
          break
        }
        case 'get_insurance_regulation': {
          toolData = getInsuranceRegulation(intent.params?.state ?? '', intent.params?.topic ?? '')
          message = `Wisconsin regulation for ${intent.params?.topic}.`
          break
        }
      }

      return json({
        type: 'tool_result',
        tool: intent.tool,
        data: toolData,
        message,
        current_progress: {
          readiness: userProgress.current_readiness,
          weak_domains: userProgress.weak_domains,
          streak: userProgress.study_streak,
        },
      })
    }

    let systemPrompt = `You are ARIA, an expert AI coach for the Wisconsin life and health insurance licensing exam. You help students prepare with practice questions, study strategies, concept explanations, and encouragement. Keep responses concise and focused on exam prep. The student's current readiness is ${userProgress.current_readiness}% and their weak areas are: ${userProgress.weak_domains?.join(', ') || 'none identified yet'}.`

    if (context) {
      systemPrompt += ` The student is currently studying the module: ${context}. Direct your primary guidance, definitions, and analogies to match this specific topic blueprint.`
    }

    const result = await callClaude(messages, systemPrompt)
    return json(result)
  } catch (error) {
    console.error('ARIA function error:', error)
    return json({ type: 'error', message: error instanceof Error ? error.message : 'Unknown error' }, 500)
  }
})
