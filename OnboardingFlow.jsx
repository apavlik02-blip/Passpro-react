// First-run intake for new members, ported from the ARIA prototype's
// OnboardingFlow.tsx and restyled for the Ledger design system. Answers are
// persisted to aria_progress via the aria Edge Function (useAriaProgress.
// saveOnboarding) — never written from the browser directly. A per-user
// localStorage flag guarantees show-once behavior even if the `onboarding`
// jsonb column hasn't been migrated on the live database yet.

import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useAriaProgress } from '../../hooks/useAriaProgress.js'
import { useLicense } from '../../hooks/useLicense.jsx'
import { LICENSES } from '../../lib/licenses.js'

// `license` is the study track the choice activates. `ariaExamType` is what
// the aria Edge Function understands today ('life' | 'health' | 'both');
// P&C choices send null so ARIA falls back to its general defaults.
const EXAM_OPTIONS = [
  ...LICENSES.map((license) => ({
    key: license.key,
    label: license.fullName.replace('Wisconsin ', ''),
    note: `PSI Series ${license.series}`,
    license: license.key,
    ariaExamType: ['life', 'health'].includes(license.key) ? license.key : null,
  })),
  {
    key: 'both',
    label: 'Life + Accident & Health',
    note: '22-01 and 22-03',
    license: 'life',
    ariaExamType: 'both',
  },
  {
    key: 'property_casualty',
    label: 'Property + Casualty',
    note: '22-05 and 22-07',
    license: 'property',
    ariaExamType: null,
  },
]

const HOURS_OPTIONS = [3, 5, 7, 10, 15]
const TOTAL_STEPS = 4

function storageKeyFor(userId) {
  return `passpro_onboarding_${userId}`
}

function hasLocalFlag(userId) {
  if (!userId) return false
  try {
    return Boolean(window.localStorage.getItem(storageKeyFor(userId)))
  } catch {
    return false
  }
}

function setLocalFlag(userId) {
  if (!userId) return
  try {
    window.localStorage.setItem(storageKeyFor(userId), new Date().toISOString())
  } catch {
    // Best effort — the server-side onboarding record is the source of truth.
  }
}

function StepHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-6">
      <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
        {eyebrow}
      </p>
      <h2 className="font-serif text-2xl font-medium text-paper">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-muted">{subtitle}</p> : null}
    </div>
  )
}

function NavButtons({ onBack, onNext, nextLabel = 'Continue', nextDisabled = false }) {
  return (
    <div className="mt-8 flex gap-3">
      {onBack ? (
        <button
          className="rounded-sm border border-line px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-gold-500/60"
          onClick={onBack}
          type="button"
        >
          Back
        </button>
      ) : null}
      <button
        className="flex-1 rounded-sm bg-gold-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={nextDisabled}
        onClick={onNext}
        type="button"
      >
        {nextLabel}
      </button>
    </div>
  )
}

export function OnboardingFlow() {
  const { user } = useUser()
  const { progress, loading, configured, saveOnboarding } = useAriaProgress()
  const { setLicenseKey } = useLicense()
  const [dismissed, setDismissed] = useState(false)
  const [saving, setSaving] = useState(false)
  const [step, setStep] = useState(1)
  const [examType, setExamType] = useState('')
  const [examDate, setExamDate] = useState('')
  const [hoursPerWeek, setHoursPerWeek] = useState(5)
  const [confidence, setConfidence] = useState(50)

  const userId = user?.id
  const open =
    configured &&
    !loading &&
    Boolean(progress) &&
    !progress.onboarding &&
    Boolean(userId) &&
    !hasLocalFlag(userId) &&
    !dismissed

  if (!open) return null

  const close = () => {
    setLocalFlag(userId)
    setDismissed(true)
  }

  const persist = async (payload) => {
    setSaving(true)
    try {
      await saveOnboarding(payload)
    } catch {
      // Don't trap the member in the modal — the local flag still prevents
      // re-showing this session/device, and ARIA falls back to defaults.
    } finally {
      setSaving(false)
      close()
    }
  }

  const handleSkip = () => {
    persist({ skipped: true })
  }

  const handleComplete = () => {
    persist({
      exam_type: EXAM_OPTIONS.find((option) => option.key === examType)?.ariaExamType ?? null,
      exam_date: examDate || null,
      hours_per_week: hoursPerWeek,
      confidence,
      skipped: false,
    })
  }

  const examLabel = EXAM_OPTIONS.find((option) => option.key === examType)?.label ?? 'Not set'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/85 p-4">
      <div className="w-full max-w-lg border border-line bg-ink-950">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <p className="font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            Getting started · Step {step} of {TOTAL_STEPS}
          </p>
          <button
            className="font-mono text-[11px] tracking-wide text-muted uppercase transition hover:text-paper"
            disabled={saving}
            onClick={handleSkip}
            type="button"
          >
            Skip for now
          </button>
        </div>

        <div className="h-1 bg-line">
          <div
            className="h-full bg-gold-500 transition-all"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
          {step === 1 ? (
            <div>
              <StepHeading
                eyebrow="Target exam"
                subtitle="This tunes your practice mix, blueprint weighting, and ARIA's coaching."
                title="Which Wisconsin exam are you preparing for?"
              />
              <div className="flex flex-col gap-2">
                {EXAM_OPTIONS.map((option) => (
                  <button
                    className={`flex items-baseline justify-between gap-4 border px-4 py-3.5 text-left transition ${
                      examType === option.key
                        ? 'border-gold-500 bg-gold-500/10'
                        : 'border-line bg-ink-900 hover:border-gold-500/40'
                    }`}
                    key={option.key}
                    onClick={() => {
                      setExamType(option.key)
                      setLicenseKey(option.license)
                    }}
                    type="button"
                  >
                    <span
                      className={`text-sm font-semibold ${
                        examType === option.key ? 'text-gold-400' : 'text-paper'
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-muted">{option.note}</span>
                  </button>
                ))}
              </div>
              <NavButtons nextDisabled={!examType} onNext={() => setStep(2)} />
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <StepHeading
                eyebrow="Exam date"
                subtitle="Optional — leave blank if you haven't scheduled with PSI yet. ARIA uses this to pace your study schedule."
                title="When is your exam?"
              />
              <input
                className="w-full border border-line bg-ink-900 px-4 py-3 font-mono text-sm text-paper outline-none [color-scheme:dark] focus:border-gold-500/60"
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setExamDate(e.target.value)}
                type="date"
                value={examDate}
              />
              <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} />
            </div>
          ) : null}

          {step === 3 ? (
            <div>
              <StepHeading
                eyebrow="Study time"
                subtitle="Be realistic — a steady pace beats a heroic first week."
                title="How many hours a week can you study?"
              />
              <div className="grid grid-cols-5 gap-2">
                {HOURS_OPTIONS.map((hours) => (
                  <button
                    className={`border px-2 py-3 text-center transition ${
                      hoursPerWeek === hours
                        ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                        : 'border-line bg-ink-900 text-paper hover:border-gold-500/40'
                    }`}
                    key={hours}
                    onClick={() => setHoursPerWeek(hours)}
                    type="button"
                  >
                    <span className="block font-mono text-lg font-semibold tabular-nums">
                      {hours}
                    </span>
                    <span className="block font-mono text-[10px] tracking-wide text-muted uppercase">
                      hrs/wk
                    </span>
                  </button>
                ))}
              </div>
              <NavButtons onBack={() => setStep(2)} onNext={() => setStep(4)} />
            </div>
          ) : null}

          {step === 4 ? (
            <div>
              <StepHeading
                eyebrow="Baseline"
                subtitle="A gut check is fine — your first practice quiz will calibrate this."
                title="How confident do you feel today?"
              />
              <input
                className="w-full accent-gold-500"
                max="90"
                min="10"
                onChange={(e) => setConfidence(Number(e.target.value))}
                step="5"
                type="range"
                value={confidence}
              />
              <div className="mt-1 flex items-baseline justify-between">
                <span className="font-mono text-[11px] text-muted uppercase">Just starting</span>
                <span className="font-mono text-2xl font-semibold text-gold-500 tabular-nums">
                  {confidence}%
                </span>
                <span className="font-mono text-[11px] text-muted uppercase">Very confident</span>
              </div>

              <div className="mt-6 border-t border-line">
                {[
                  { label: 'Exam', value: examLabel },
                  { label: 'Exam date', value: examDate || 'Not scheduled yet' },
                  { label: 'Study time', value: `${hoursPerWeek} hrs/week` },
                  { label: 'Starting confidence', value: `${confidence}%` },
                ].map((row) => (
                  <div
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                    key={row.label}
                  >
                    <span className="font-mono text-[11px] tracking-wide text-muted uppercase">
                      {row.label}
                    </span>
                    <span className="font-mono text-[13px] font-semibold text-gold-500">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <NavButtons
                nextDisabled={saving}
                nextLabel={saving ? 'Saving...' : 'Start studying'}
                onBack={() => setStep(3)}
                onNext={handleComplete}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
