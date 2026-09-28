import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DataStatePanel } from '../components/DataStatePanel.jsx'
import { useAgency } from '../hooks/useAgency.js'
import { useAriaProgress } from '../hooks/useAriaProgress.js'
import { useLicense } from '../hooks/useLicense.jsx'
import { AgencyError } from '../lib/agencyApi.js'
import {
  JOURNEY_STEPS,
  JOURNEY_TARGET_DAYS,
  REQUIRED_STEP_COUNT,
  journeyDay,
  nextStep,
  requiredDone,
} from '../lib/journeySteps.js'
import { LICENSES, getLicense } from '../lib/licenses.js'

const eyebrow = 'mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase'

const STEP_LINKS = {
  exam_scheduled: { href: 'https://test-takers.psiexams.com/wiins', label: 'PSI registration' },
  exam_ready: { to: '/practice-exam', label: 'Take a mock exam' },
  fingerprints: { href: 'https://www.fieldprintwisconsin.com', label: 'Fieldprint Wisconsin' },
  application_submitted: { href: 'https://nipr.com', label: 'NIPR' },
}

function StepLink({ stepKey }) {
  const link = STEP_LINKS[stepKey]
  if (!link) return null
  const className = 'font-mono text-[11px] tracking-wide text-gold-400 underline hover:text-gold-500'
  return link.to ? (
    <Link className={className} to={link.to}>
      {link.label} →
    </Link>
  ) : (
    <a className={className} href={link.href} rel="noreferrer" target="_blank">
      {link.label} ↗
    </a>
  )
}

function StartJourney({ onStart }) {
  const { license } = useLicense()
  const [choice, setChoice] = useState(license.key)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const start = async () => {
    setBusy(true)
    setError('')
    try {
      await onStart(choice)
    } catch (err) {
      setError(err instanceof AgencyError ? err.message : 'Could not start your path.')
      setBusy(false)
    }
  }

  return (
    <section className="flex max-w-2xl flex-col gap-6">
      <div>
        <p className={eyebrow}>License path</p>
        <h2 className="mb-3 font-serif text-3xl font-medium">Get licensed in 30 days.</h2>
        <p className="text-muted">
          A step-by-step path from prelicensing to appointed, with a target day for each step.
          Pick the license you're going for to start your 30-day clock.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {LICENSES.map((item) => (
          <button
            className={`flex items-baseline justify-between border px-4 py-3 text-left text-sm transition ${
              choice === item.key
                ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                : 'border-line bg-ink-900 text-paper hover:border-gold-500/40'
            }`}
            key={item.key}
            onClick={() => setChoice(item.key)}
            type="button"
          >
            {item.name}
            <span className="font-mono text-[11px] text-muted">{item.series}</span>
          </button>
        ))}
      </div>
      <div>
        <button
          className="rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:opacity-50"
          disabled={busy}
          onClick={start}
          type="button"
        >
          {busy ? 'Starting…' : 'Start my 30-day path'}
        </button>
        {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
      </div>
    </section>
  )
}

export function JourneyPage() {
  const { me, setMe, loading, error, configured, run } = useAgency()
  const { progress } = useAriaProgress()
  const { setLicenseKey } = useLicense()
  const [pending, setPending] = useState(null)
  const [stepError, setStepError] = useState('')

  if (!configured) {
    return <DataStatePanel title="License path unavailable" message="The agency service is not configured." />
  }
  if (loading) {
    return <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Loading your path…</p>
  }
  if (error && !me) {
    return <DataStatePanel title="Couldn't load your license path" message={error.message} />
  }

  const journey = me?.journey
  if (!journey) {
    return (
      <StartJourney
        onStart={async (licenseKey) => {
          const data = await run('start_journey', { license_key: licenseKey })
          setLicenseKey(licenseKey)
          setMe(data)
        }}
      />
    )
  }

  const steps = journey.steps ?? {}
  const license = getLicense(journey.license_key)
  const day = journeyDay(journey.started_at)
  const done = requiredDone(steps)
  const next = nextStep(steps)
  const startDate = new Date(journey.started_at)
  const readiness = progress?.current_readiness

  const toggle = async (stepKey, isDone) => {
    setPending(stepKey)
    setStepError('')
    try {
      const updated = await run('set_step', { step_key: stepKey, done: !isDone })
      setMe((current) => ({ ...current, journey: updated }))
    } catch (err) {
      setStepError(err instanceof AgencyError ? err.message : 'Could not save that step.')
    } finally {
      setPending(null)
    }
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={eyebrow}>
            License path · {license ? `${license.name} (${license.series})` : journey.license_key}
            {me?.agency && me.role === 'recruit' ? ` · sponsored by ${me.agency.name}` : ''}
          </p>
          <h2 className="font-serif text-3xl font-medium sm:text-4xl">
            Day {day} of {JOURNEY_TARGET_DAYS}
          </h2>
          <p className="mt-2 text-muted">
            Started {startDate.toLocaleDateString()} · {done} of {REQUIRED_STEP_COUNT} steps done
          </p>
        </div>
        {typeof readiness === 'number' ? (
          <div className="border border-line bg-ink-900 px-5 py-3 text-right">
            <p className="font-mono text-[10.5px] tracking-widest text-muted uppercase">Exam readiness</p>
            <p className="font-mono text-2xl font-semibold text-gold-500 tabular-nums">{readiness}%</p>
          </div>
        ) : null}
      </div>

      <div className="h-1.5 bg-ink-800">
        <div className="h-full bg-gold-500" style={{ width: `${(done / REQUIRED_STEP_COUNT) * 100}%` }} />
      </div>

      {next ? (
        <div className="border border-gold-500/50 bg-ink-900 p-6">
          <p className={eyebrow}>Next step · target day {next.targetDay}</p>
          <h3 className="mb-1 font-serif text-2xl font-medium">{next.title}</h3>
          <p className="mb-3 text-muted">{next.detail}</p>
          <StepLink stepKey={next.key} />
          {next.key === 'exam_ready' && typeof readiness === 'number' && readiness < 80 ? (
            <p className="mt-3 text-sm text-muted">
              You're at {readiness}%. Drills on your weakest domains are the fastest way up.
            </p>
          ) : null}
        </div>
      ) : (
        <div className="border border-gold-500/50 bg-ink-900 p-6">
          <p className={eyebrow}>Done</p>
          <h3 className="font-serif text-2xl font-medium">Every step is complete. Congratulations.</h3>
        </div>
      )}

      <ol className="border-t border-line">
        {JOURNEY_STEPS.map((step, index) => {
          const completedAt = steps[step.key]
          const isDone = Boolean(completedAt)
          const dueDate = new Date(startDate.getTime() + (step.targetDay - 1) * 86400000)
          const late = !isDone && day > step.targetDay && !step.optional
          return (
            <li className="flex items-start gap-4 border-b border-line py-4" key={step.key}>
              <button
                aria-label={isDone ? `Mark "${step.title}" not done` : `Mark "${step.title}" done`}
                aria-pressed={isDone}
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border transition ${
                  isDone ? 'border-gold-500 bg-gold-500 text-ink-950' : 'border-line hover:border-gold-500/70'
                } ${pending === step.key ? 'opacity-50' : ''}`}
                disabled={pending !== null}
                onClick={() => toggle(step.key, isDone)}
                type="button"
              >
                {isDone ? (
                  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                ) : null}
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-mono text-[11px] text-muted tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={isDone ? 'text-muted line-through' : 'text-paper'}>{step.title}</span>
                  {step.owner === 'agency' ? (
                    <span className="font-mono text-[10px] tracking-widest text-muted uppercase">Agency step</span>
                  ) : null}
                  {step.optional ? (
                    <span className="font-mono text-[10px] tracking-widest text-muted uppercase">Optional</span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-muted">{step.detail}</p>
              </div>
              <div className="shrink-0 text-right font-mono text-[11.5px] tabular-nums">
                {isDone ? (
                  <span className="text-gold-400">Done {new Date(completedAt).toLocaleDateString()}</span>
                ) : (
                  <span className={late ? 'text-red-300' : 'text-muted'}>
                    Day {step.targetDay} · {dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ol>
      {stepError ? <p className="text-sm text-red-300">{stepError}</p> : null}
    </section>
  )
}
