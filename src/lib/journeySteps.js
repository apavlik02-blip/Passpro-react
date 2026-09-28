// Licensed in 30 Days — the Wisconsin recruit license journey.
// Step keys must match public.journey_step_keys() in
// supabase/migrations/20260925090100_agency_functions.sql.
//
// Target days are a draft 30-day plan (Amanda to confirm timing and costs).
// Facts cited: 20 hrs prelicensing per line, valid 1 year (OCI prelicensing
// page); PSI exam $75, 70% to pass; fingerprints via Fieldprint Wisconsin and
// 24-48 hour application processing when not deferred (OCI licensing FAQ).

export const JOURNEY_TARGET_DAYS = 30

export const JOURNEY_STEPS = [
  {
    key: 'prelicensing_enrolled',
    title: 'Enroll in prelicensing',
    detail: 'An OCI-approved course: 20 hours per line (8 general + 12 line-specific).',
    targetDay: 1,
    owner: 'recruit',
  },
  {
    key: 'prelicensing_complete',
    title: 'Finish prelicensing',
    detail: 'Keep the certificate of completion. PSI requires it at the test center, and it is valid for 1 year.',
    targetDay: 8,
    owner: 'recruit',
  },
  {
    key: 'exam_scheduled',
    title: 'Schedule the PSI exam',
    detail: 'Book online with PSI ($75 per exam). Pick a date about a week out.',
    targetDay: 9,
    owner: 'recruit',
  },
  {
    key: 'exam_ready',
    title: 'Reach 80% readiness',
    detail: 'Score 80%+ on PassPro mock exams before exam day. ARIA tracks your readiness.',
    targetDay: 14,
    owner: 'recruit',
  },
  {
    key: 'exam_passed',
    title: 'Pass the state exam',
    detail: '100 scored questions, 2 hours, 70% to pass.',
    targetDay: 16,
    owner: 'recruit',
  },
  {
    key: 'fingerprints',
    title: 'Get fingerprinted',
    detail: 'Required for the license. Book a location through Fieldprint Wisconsin.',
    targetDay: 17,
    owner: 'recruit',
  },
  {
    key: 'application_submitted',
    title: 'Apply for the license',
    detail: 'Submit the resident license application. OCI processes most in 24 to 48 hours.',
    targetDay: 18,
    owner: 'recruit',
  },
  {
    key: 'license_issued',
    title: 'License issued',
    detail: 'Look up the license on OCI and send the agency the license number.',
    targetDay: 21,
    owner: 'recruit',
  },
  {
    key: 'appointed',
    title: 'Appointed with carriers',
    detail: 'The agency submits carrier appointments. You can sell once appointed.',
    targetDay: 28,
    owner: 'agency',
  },
  {
    key: 'first_sale',
    title: 'First policy written',
    detail: 'Optional milestone. Not part of the 30-day license target.',
    targetDay: 45,
    owner: 'agency',
    optional: true,
  },
]

const REQUIRED = JOURNEY_STEPS.filter((step) => !step.optional)

export function daysSince(iso, now = Date.now()) {
  if (!iso) return 0
  return Math.max(0, Math.floor((now - new Date(iso).getTime()) / 86400000))
}

// Day 1 is the start date.
export function journeyDay(startedAt, now = Date.now()) {
  return daysSince(startedAt, now) + 1
}

export function nextStep(steps = {}) {
  return JOURNEY_STEPS.find((step) => !steps[step.key]) ?? null
}

export function requiredDone(steps = {}) {
  return REQUIRED.filter((step) => steps[step.key]).length
}

export const REQUIRED_STEP_COUNT = REQUIRED.length

export function isLicensed(steps = {}) {
  return Boolean(steps.license_issued)
}

export function isComplete(steps = {}) {
  return REQUIRED.every((step) => steps[step.key])
}

// Flags that tell an agency owner a recruit needs attention.
export function recruitFlags(recruit, now = Date.now()) {
  const steps = recruit.steps ?? {}
  const day = journeyDay(recruit.started_at, now)
  const next = nextStep(steps)
  const flags = []

  if (!isComplete(steps) && next && !next.optional && day > next.targetDay) {
    flags.push({ key: 'behind', label: `Behind: ${next.title.toLowerCase()} (target day ${next.targetDay})` })
  }
  if (daysSince(recruit.last_activity, now) >= 7 && !isComplete(steps)) {
    flags.push({ key: 'inactive', label: `No activity in ${daysSince(recruit.last_activity, now)} days` })
  }
  if (
    !steps.exam_passed &&
    day >= 10 &&
    typeof recruit.readiness === 'number' &&
    recruit.readiness < 70
  ) {
    flags.push({ key: 'readiness', label: `Readiness ${recruit.readiness}%` })
  }
  if (day > JOURNEY_TARGET_DAYS && !isComplete(steps)) {
    flags.push({ key: 'overdue', label: `Day ${day}, past the 30-day target` })
  }
  return flags
}
