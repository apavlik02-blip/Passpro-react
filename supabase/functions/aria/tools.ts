// ARIA's deterministic tools — ported from ARIA-AI-Agent's lib/aria-tools.ts.
//
// generatePracticeQuestions is rewritten to pull from PassPro's real,
// seeded public.questions table (167 questions) instead of ARIA's ~60
// hardcoded SAMPLE_QUESTIONS, so there's one source of truth for exam
// content. Domain weights below mirror src/lib/examBlueprints.js's real
// LIFE_EXAM/HEALTH_EXAM category weights (normalized to fractions), since
// that's PassPro's actual category taxonomy — ARIA's original 8-bucket
// model (life_types/health_insurance/riders/...) didn't match it.

export interface ReadinessAnalysis {
  previous_readiness: number | null
  new_readiness: number
  change: number
  domain_breakdown: Record<string, number>
  weak_domains: string[]
  priority_domains: string[]
  recommendations: string[]
  next_actions: string[]
  days_until_exam?: number
  study_intensity?: string
  analyzed_at: string
}

export interface StudySchedule {
  exam_date: string
  days_until_exam: number
  starting_readiness: number
  target_readiness: number
  daily_minutes: number
  weak_domains_focus: string[]
  schedule: Array<{
    day: number
    date: string
    focus_domains: string[]
    minutes: number
    event: string
    spaced_repetition: boolean
  }>
  generated_at: string
  notes: string
}

export interface RegulationResult {
  state: string
  topic: string
  value: number | null
  details: string
  exam_note: string
  source: string
}

export const DOMAIN_WEIGHTS: Record<string, number> = {
  insurance_regulation: 0.19,
  wisconsin_regulation: 0.15,
  general_insurance: 0.09,
  life_basics: 0.1,
  life_types: 0.12,
  policy_provisions: 0.14,
  annuities: 0.1,
  taxation: 0.05,
  qualified_plans: 0.04,
  wisconsin_health_regulation: 0.12,
  health_basics: 0.07,
  health_plan_types: 0.07,
  disability_income: 0.08,
  medical_plans: 0.08,
  group_health: 0.08,
  dental: 0.04,
  medicare: 0.08,
  medicaid: 0.08,
  ltc: 0.08,
  aca_hipaa: 0.04,
}

const WI_REGULATIONS: Record<string, { days?: number; years?: number; details: string; exam_note: string }> = {
  grace_period: {
    days: 31,
    details: 'Wisconsin requires a 31-day grace period for life insurance policies.',
    exam_note: 'WI uses 31 days (some states use 30). Important state-specific fact.',
  },
  free_look: {
    days: 10,
    details:
      'Standard free-look period in Wisconsin is 10 days for individual life policies (30 days for replacements).',
    exam_note: 'Free look is 10 days standard, longer for replacements.',
  },
  incontestability: {
    years: 2,
    details: 'Incontestability period is 2 years in Wisconsin.',
    exam_note: 'Standard 2-year incontestability clause.',
  },
  replacement: {
    details:
      'Wisconsin has strict replacement rules. A comparison document is required, and a 20-30 day free look often applies to replaced policies.',
    exam_note: 'Replacement triggers additional disclosures and longer free look.',
  },
}

export function getInsuranceRegulation(state: string, topic: string): RegulationResult {
  const normalizedState = state.toLowerCase()
  const normalizedTopic = topic.toLowerCase()

  if (normalizedState === 'wisconsin' && WI_REGULATIONS[normalizedTopic]) {
    const data = WI_REGULATIONS[normalizedTopic]
    return {
      state: 'Wisconsin',
      topic: normalizedTopic,
      value: data.days ?? data.years ?? null,
      details: data.details,
      exam_note: data.exam_note,
      source: 'Wisconsin OCI',
    }
  }

  return {
    state,
    topic: normalizedTopic,
    value: null,
    details: 'General NAIC guidance applies. Verify with current state DOI.',
    exam_note: 'State variations exist — always confirm with official sources for the exam.',
    source: 'NAIC Model',
  }
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// deno-lint-ignore no-explicit-any
export async function generatePracticeQuestions(
  // deno-lint-ignore no-explicit-any
  supabase: any,
  domains: string[],
  count = 6,
  difficulty = 'mixed',
) {
  // NOTE: public.questions uses domain/question/correct/options(jsonb)/know_this —
  // NOT category/prompt/correct_option (that shape only exists in this repo's
  // supabase/seed.sql, which was never actually applied to the live project).
  let query = supabase
    .from('questions')
    .select('id, domain, difficulty, question, options, correct, explanation, know_this')

  if (domains.length) {
    query = query.in('domain', domains)
  }
  if (difficulty !== 'mixed') {
    query = query.eq('difficulty', difficulty)
  }

  const { data, error } = await query
  let pool = error ? [] : (data ?? [])

  if (!pool.length) {
    // Fall back to any question if the requested domains have none.
    const { data: fallback } = await supabase
      .from('questions')
      .select('id, domain, difficulty, question, options, correct, explanation, know_this')
    pool = fallback ?? []
  }

  const selected = shuffle(pool).slice(0, Math.min(count, pool.length))

  return selected.map((q: Record<string, unknown>) => ({
    id: q.id,
    domain: q.domain,
    difficulty: q.difficulty,
    question: q.question,
    options: q.options,
    correct: q.correct,
    explanation: q.explanation,
    know_this: q.know_this || q.explanation,
    metadata: {
      exam_weight: DOMAIN_WEIGHTS[q.domain as string] ?? 0.08,
      passpro_tags: [q.domain, q.difficulty],
    },
  }))
}

export function analyzeReadiness(
  quizResults: { overall_score?: number; domain_scores: Record<string, number> },
  examDate?: string,
  previousReadiness?: number,
): ReadinessAnalysis {
  const overall = quizResults.overall_score ?? 50
  const domainScores = quizResults.domain_scores ?? {}

  let weightedScore = 0
  let totalWeight = 0

  Object.entries(domainScores).forEach(([domain, score]) => {
    const weight = DOMAIN_WEIGHTS[domain] ?? 0.08
    weightedScore += score * weight
    totalWeight += weight
  })

  const newReadiness = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 10) / 10 : overall

  const weakDomains = Object.entries(domainScores)
    .filter(([, score]) => score < 55)
    .map(([domain]) => domain)

  const priorityDomains = Object.entries(domainScores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([d]) => d)

  const recommendations: string[] = []
  if (weakDomains.includes('policy_provisions')) {
    recommendations.push('Master grace period, free look, and incontestability rules.')
  }
  if (weakDomains.some((d) => d.startsWith('health'))) {
    recommendations.push('Review HMO vs PPO differences and Medicare Parts A-D.')
  }
  if (weakDomains.includes('wisconsin_regulation') || weakDomains.includes('insurance_regulation')) {
    recommendations.push('Drill twisting, churning, and rebating — frequently tested unfair trade practices.')
  }
  if (recommendations.length === 0) {
    recommendations.push('Continue balanced review with emphasis on your identified weak domains.')
  }

  const result: ReadinessAnalysis = {
    previous_readiness: previousReadiness ?? null,
    new_readiness: newReadiness,
    change: previousReadiness ? Math.round((newReadiness - previousReadiness) * 10) / 10 : 0,
    domain_breakdown: domainScores,
    weak_domains: weakDomains,
    priority_domains: priorityDomains,
    recommendations,
    next_actions: [
      'Review explanations for missed questions',
      'Schedule targeted practice on weak domains this week',
      'Run a full timed simulation in 7-10 days',
    ],
    analyzed_at: new Date().toISOString(),
  }

  if (examDate) {
    const exam = new Date(examDate)
    const daysLeft = Math.max(Math.ceil((exam.getTime() - Date.now()) / (1000 * 3600 * 24)), 0)
    result.days_until_exam = daysLeft
    result.study_intensity = daysLeft < 21 ? 'High' : daysLeft < 45 ? 'Medium' : 'Standard'
  }

  return result
}

export function createStudySchedule(
  examDate: string,
  currentReadiness = 50,
  weakDomains: string[] = [],
  dailyMinutes = 45,
): StudySchedule {
  const exam = new Date(examDate)
  const today = new Date()
  const daysUntilExam = Math.max(Math.ceil((exam.getTime() - today.getTime()) / (1000 * 3600 * 24)), 1)

  const schedule: StudySchedule['schedule'] = []
  const focusAreas = weakDomains.length > 0 ? weakDomains : ['policy_provisions', 'life_types']

  for (let day = 0; day < Math.min(daysUntilExam, 45); day += 1) {
    const currentDay = new Date(today)
    currentDay.setDate(today.getDate() + day)

    let focus = [...focusAreas]
    if (day > 10) focus = ['life_types', 'annuities', 'wisconsin_regulation']
    if (day > 20) focus = ['mixed_review', 'full_simulation']

    const event = [9, 19, 28].includes(day) ? 'Full Timed Simulation + Review' : 'Study Block'

    schedule.push({
      day: day + 1,
      date: currentDay.toISOString().split('T')[0],
      focus_domains: focus,
      minutes: dailyMinutes,
      event,
      spaced_repetition: day % 3 === 0,
    })
  }

  return {
    exam_date: examDate,
    days_until_exam: daysUntilExam,
    starting_readiness: currentReadiness,
    target_readiness: 85,
    daily_minutes: dailyMinutes,
    weak_domains_focus: weakDomains,
    schedule,
    generated_at: new Date().toISOString(),
    notes: 'Adjust daily_minutes based on your schedule. Re-run analysis after major assessments.',
  }
}
