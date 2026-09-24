// Per-browser history of completed mock exams and drills, keyed by license.
// Lightweight complement to ARIA's server-side progress: it powers the
// dashboard's "last mock" card and weakest-domain drill suggestions even when
// the ARIA Edge Function is unavailable.

const STORAGE_KEY = 'passpro_exam_history'
const MAX_ENTRIES = 50

function readAll() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function recordAttempt(entry) {
  try {
    const next = [{ ...entry, at: new Date().toISOString() }, ...readAll()].slice(0, MAX_ENTRIES)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage unavailable: history is a convenience, not a requirement.
  }
}

export function attemptsForLicense(licenseKey) {
  return readAll().filter((entry) => entry.license === licenseKey)
}

// Weakest domain across the most recent full mock exam for a license.
export function weakestDomain(attempt) {
  const entries = Object.entries(attempt?.domainScores ?? {})
  if (!entries.length) return null
  return entries.sort((a, b) => a[1] - b[1])[0][0]
}

export function drillBlueprint(domain, label, licenseKey, count = 10) {
  return {
    license: licenseKey,
    key: `drill:${domain}`,
    label: `${label} drill`,
    isDrill: true,
    totalQuestions: count,
    timeLimitMinutes: Math.round(count * 1.2),
    passingScore: 70,
    weights: { [domain]: count },
  }
}
