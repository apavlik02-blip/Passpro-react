// Pure helpers for aria_progress — ported from ARIA-AI-Agent's lib/progress.ts,
// unchanged in logic (no Next.js/Supabase-Auth coupling to strip).

export interface OnboardingData {
  exam_type: 'life' | 'health' | 'both' | null
  exam_date: string | null // YYYY-MM-DD
  hours_per_week: number | null
  confidence: number | null // 0-100 self-reported baseline
  skipped: boolean
  completed_at: string
}

export interface UserProgress {
  user_id: string
  exam_type?: string
  current_readiness: number
  weak_domains: string[]
  last_quiz_score?: number
  quiz_history: Array<{
    date: string
    score: number
    domain_scores: Record<string, number>
  }>
  study_streak: number
  last_study_date?: string
  updated_at?: string
  // Stored in an `onboarding jsonb` column (see README — requires a one-line
  // migration). Absent/undefined on databases that haven't added the column.
  onboarding?: OnboardingData | null
}

export interface QuizResult {
  overall_score: number
  domain_scores: Record<string, number>
}

export function getDefaultProgress(userId: string): UserProgress {
  return {
    user_id: userId,
    exam_type: 'life',
    current_readiness: 45,
    weak_domains: ['policy_provisions', 'annuities'],
    quiz_history: [],
    study_streak: 0,
  }
}

export function calculateNewReadiness(
  previousReadiness: number,
  quizResult: QuizResult,
  weight = 0.3,
): number {
  const newReadiness = Math.round(
    previousReadiness * (1 - weight) + quizResult.overall_score * weight,
  )
  return Math.max(0, Math.min(100, newReadiness))
}

export function updateWeakDomains(
  currentWeakDomains: string[],
  quizDomainScores: Record<string, number>,
): string[] {
  const newWeak: string[] = []
  Object.entries(quizDomainScores).forEach(([domain, score]) => {
    if (score < 55) newWeak.push(domain)
  })
  const testedDomains = Object.keys(quizDomainScores)
  const stillWeak = currentWeakDomains.filter((d) => !testedDomains.includes(d))
  return [...new Set([...newWeak, ...stillWeak])].slice(0, 5)
}

export function updateStudyStreak(currentStreak: number, lastStudyDate?: string): number {
  if (!lastStudyDate) return 1
  const last = new Date(lastStudyDate)
  const today = new Date()
  const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 3600 * 24))
  if (diffDays === 0) return currentStreak
  if (diffDays === 1) return currentStreak + 1
  return 1
}
