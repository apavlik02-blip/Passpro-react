import {
  JOURNEY_STEPS,
  REQUIRED_STEP_COUNT,
  daysSince,
  isLicensed,
  journeyDay,
  nextStep,
  recruitFlags,
  requiredDone,
} from './journeySteps.js'
import { getLicense } from './licenses.js'

export function recruitLabel(recruit) {
  return recruit.name || recruit.email || 'Unnamed recruit'
}

export function daysToLicensed(recruit) {
  const issued = recruit.steps?.license_issued
  if (!issued) return null
  return Math.max(1, Math.round((new Date(issued) - new Date(recruit.started_at)) / 86400000))
}

export function agencyKpis(recruits, now = Date.now()) {
  const licensed = recruits.filter((r) => isLicensed(r.steps))
  const withReadiness = recruits.filter((r) => typeof r.readiness === 'number' && !r.steps?.exam_passed)
  const durations = licensed.map(daysToLicensed).filter((d) => d !== null)
  return {
    total: recruits.length,
    licensed: licensed.length,
    needsAttention: recruits.filter((r) => recruitFlags(r, now).length > 0).length,
    avgReadiness: withReadiness.length
      ? Math.round(withReadiness.reduce((sum, r) => sum + r.readiness, 0) / withReadiness.length)
      : null,
    avgDaysToLicensed: durations.length
      ? Math.round(durations.reduce((sum, d) => sum + d, 0) / durations.length)
      : null,
  }
}

// Plain-text weekly report for pilots (paste into an email).
export function buildWeeklyReport(agency, recruits, now = Date.now()) {
  const kpis = agencyKpis(recruits, now)
  const date = new Date(now).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
  const lines = [
    `${agency.name}: Licensed in 30 Days weekly report (${date})`,
    '',
    `Recruits: ${kpis.total} · Licensed: ${kpis.licensed} · Need attention: ${kpis.needsAttention}`,
  ]
  if (kpis.avgReadiness !== null) lines.push(`Average exam readiness (not yet passed): ${kpis.avgReadiness}%`)
  if (kpis.avgDaysToLicensed !== null) lines.push(`Average days to licensed: ${kpis.avgDaysToLicensed}`)
  lines.push('')

  recruits.forEach((recruit) => {
    const next = nextStep(recruit.steps)
    const flags = recruitFlags(recruit, now)
    const license = getLicense(recruit.license_key)
    lines.push(
      `• ${recruitLabel(recruit)} (${license?.name ?? recruit.license_key}), day ${journeyDay(recruit.started_at, now)}: ` +
        `${requiredDone(recruit.steps)}/${REQUIRED_STEP_COUNT} steps` +
        (next ? `, next: ${next.title}` : ', all steps done') +
        (typeof recruit.readiness === 'number' ? `, readiness ${recruit.readiness}%` : '') +
        (flags.length ? `. Attention: ${flags.map((f) => f.label).join('; ')}` : '. On track.'),
    )
  })
  if (!recruits.length) lines.push('No recruits yet.')
  return lines.join('\n')
}

function csvCell(value) {
  const text = value === null || value === undefined ? '' : String(value)
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

export function buildCsv(recruits, now = Date.now()) {
  const header = [
    'Recruit', 'Email', 'License', 'Started', 'Day', 'Steps done', 'Next step',
    'Readiness', 'Last quiz score', 'Mock exams', 'Flashcards reviewed', 'Days since active',
    'Days to licensed', 'Flags',
    ...JOURNEY_STEPS.map((step) => step.title),
  ]
  const rows = recruits.map((r) => [
    recruitLabel(r),
    r.email,
    getLicense(r.license_key)?.name ?? r.license_key,
    new Date(r.started_at).toLocaleDateString(),
    journeyDay(r.started_at, now),
    `${requiredDone(r.steps)}/${REQUIRED_STEP_COUNT}`,
    nextStep(r.steps)?.title ?? 'Complete',
    r.readiness,
    r.last_quiz_score,
    r.quizzes_taken,
    r.cards_reviewed,
    daysSince(r.last_activity, now),
    daysToLicensed(r),
    recruitFlags(r, now).map((f) => f.label).join('; '),
    ...JOURNEY_STEPS.map((step) =>
      r.steps?.[step.key] ? new Date(r.steps[step.key]).toLocaleDateString() : '',
    ),
  ])
  return [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n')
}
