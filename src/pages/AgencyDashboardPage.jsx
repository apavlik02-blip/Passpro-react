import { Fragment, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { DataStatePanel } from '../components/DataStatePanel.jsx'
import { useAgency } from '../hooks/useAgency.js'
import { AgencyError } from '../lib/agencyApi.js'
import {
  JOURNEY_STEPS,
  REQUIRED_STEP_COUNT,
  daysSince,
  journeyDay,
  nextStep,
  recruitFlags,
  requiredDone,
} from '../lib/journeySteps.js'
import { LICENSES, getLicense } from '../lib/licenses.js'
import { agencyKpis, buildCsv, buildWeeklyReport, recruitLabel } from '../lib/weeklyReport.js'

const eyebrow = 'mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase'
const inputClass =
  'w-full border border-line bg-ink-950 px-3 py-2.5 text-sm text-paper placeholder:text-muted/60 focus:border-gold-500/70 focus:outline-none'
const primaryButton =
  'inline-flex items-center justify-center rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:opacity-50'
const secondaryButton =
  'inline-flex items-center justify-center rounded-sm border border-line px-4 py-2.5 text-sm font-semibold text-paper transition hover:border-gold-500/70 disabled:opacity-50'

function errorText(err, fallback) {
  return err instanceof AgencyError ? err.message : fallback
}

function inviteUrl(code) {
  return `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}/join/${code}`
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

function Stat({ label, value, hint }) {
  return (
    <div className="flex flex-col gap-1 bg-ink-900 p-5">
      <p className="font-mono text-[10.5px] tracking-widest text-muted uppercase">{label}</p>
      <p className="font-mono text-3xl font-semibold text-gold-500 tabular-nums">{value}</p>
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
    </div>
  )
}

function CreateAgency({ onCreate }) {
  const { user } = useUser()
  const [name, setName] = useState('')
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress ?? '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      await onCreate({ name, contact_email: email })
    } catch (err) {
      setError(errorText(err, 'Could not create the agency.'))
      setBusy(false)
    }
  }

  return (
    <section className="flex max-w-2xl flex-col gap-6">
      <div>
        <p className={eyebrow}>Licensed in 30 Days · for agencies</p>
        <h2 className="mb-3 font-serif text-3xl font-medium">Set up your agency.</h2>
        <p className="text-muted">
          Start your free 60-day pilot: up to 25 recruit seats, a license path for every recruit,
          and this dashboard. No card required.
        </p>
      </div>
      <form className="flex flex-col gap-4 border border-line bg-ink-900 p-6" onSubmit={submit}>
        <label className="block">
          <span className="mb-1.5 block text-sm text-paper">Agency or IMO name</span>
          <input className={inputClass} minLength={2} onChange={(e) => setName(e.target.value)} required value={name} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-paper">Contact email</span>
          <input className={inputClass} onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
        </label>
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <div>
          <button className={primaryButton} disabled={busy} type="submit">
            {busy ? 'Creating…' : 'Start my pilot'}
          </button>
        </div>
      </form>
      <p className="text-sm text-muted">
        Want a walkthrough first? <Link className="text-gold-400 underline" to="/agencies#pilot">Request a pilot call</Link>.
      </p>
    </section>
  )
}

function InvitePanel({ run, onChanged, invites, seatsLeft }) {
  const [form, setForm] = useState({ name: '', email: '', license_key: 'life' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [latest, setLatest] = useState(null)
  const [copied, setCopied] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const result = await run('create_invite', form)
      setLatest({ ...form, code: result.code })
      setForm((current) => ({ ...current, name: '', email: '' }))
      onChanged()
    } catch (err) {
      setError(errorText(err, 'Could not create the invite.'))
    } finally {
      setBusy(false)
    }
  }

  const copyLink = async (code) => {
    if (await copy(inviteUrl(code))) {
      setCopied(code)
      window.setTimeout(() => setCopied(''), 2000)
    }
  }

  const revoke = async (code) => {
    try {
      await run('revoke_invite', { code })
      onChanged()
    } catch (err) {
      setError(errorText(err, 'Could not cancel the invite.'))
    }
  }

  const mailto = (invite) => {
    const license = getLicense(invite.license_key)
    const subject = encodeURIComponent('Your licensing plan: join us on PassPro')
    const body = encodeURIComponent(
      `Hi${invite.name ? ` ${invite.name.split(' ')[0]}` : ''},\n\nWe're sponsoring your Wisconsin ${license?.name ?? ''} license. ` +
        `Use this link to set up your study account and your 30-day license path:\n\n${inviteUrl(invite.code)}\n\nSee you soon!`,
    )
    return `mailto:${invite.email ?? ''}?subject=${subject}&body=${body}`
  }

  return (
    <div className="border border-line bg-ink-900 p-6">
      <p className={eyebrow}>Invite a recruit</p>
      <p className="mb-4 text-sm text-muted">
        {seatsLeft > 0 ? `${seatsLeft} seat${seatsLeft === 1 ? '' : 's'} left on your plan.` : 'All seats are in use.'}{' '}
        Invite links work once and expire after 14 days.
      </p>
      <form className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto_auto]" onSubmit={submit}>
        <input
          aria-label="Recruit name"
          className={inputClass}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Recruit name"
          value={form.name}
        />
        <input
          aria-label="Recruit email"
          className={inputClass}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email (optional)"
          type="email"
          value={form.email}
        />
        <select
          aria-label="License"
          className={inputClass}
          onChange={(e) => setForm({ ...form, license_key: e.target.value })}
          value={form.license_key}
        >
          {LICENSES.map((license) => (
            <option key={license.key} value={license.key}>
              {license.name}
            </option>
          ))}
        </select>
        <button className={primaryButton} disabled={busy || seatsLeft <= 0} type="submit">
          {busy ? 'Creating…' : 'Create link'}
        </button>
      </form>
      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}

      {latest ? (
        <div className="mt-4 border border-gold-500/50 bg-ink-950 p-4">
          <p className="mb-2 text-sm text-paper">
            Invite ready{latest.name ? ` for ${latest.name}` : ''}. Send this link:
          </p>
          <p className="mb-3 font-mono text-[12.5px] break-all text-gold-400">{inviteUrl(latest.code)}</p>
          <div className="flex flex-wrap gap-2">
            <button className={secondaryButton} onClick={() => copyLink(latest.code)} type="button">
              {copied === latest.code ? 'Copied' : 'Copy link'}
            </button>
            <a className={secondaryButton} href={mailto(latest)}>
              Email it
            </a>
          </div>
        </div>
      ) : null}

      {invites.length ? (
        <div className="mt-6">
          <p className="mb-2 font-mono text-[10.5px] tracking-widest text-muted uppercase">Pending invites</p>
          <div className="border-t border-line">
            {invites.map((invite) => (
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-2.5 text-sm" key={invite.code}>
                <span className="text-paper">
                  {invite.invitee_name || invite.invitee_email || 'Unnamed'}{' '}
                  <span className="text-muted">· {getLicense(invite.license_key)?.name}</span>
                </span>
                <span className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-muted">
                    expires {new Date(invite.expires_at).toLocaleDateString()}
                  </span>
                  <button className="text-gold-400 underline" onClick={() => copyLink(invite.code)} type="button">
                    {copied === invite.code ? 'copied' : 'copy link'}
                  </button>
                  <button className="text-muted underline hover:text-red-300" onClick={() => revoke(invite.code)} type="button">
                    cancel
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function RecruitDetail({ recruit, run, onChanged }) {
  const [pending, setPending] = useState(null)
  const [error, setError] = useState('')

  const toggle = async (stepKey, isDone) => {
    setPending(stepKey)
    setError('')
    try {
      await run('set_step', { recruit_user_id: recruit.user_id, step_key: stepKey, done: !isDone })
      onChanged()
    } catch (err) {
      setError(errorText(err, 'Could not update that step.'))
    } finally {
      setPending(null)
    }
  }

  const remove = async () => {
    if (!window.confirm(`Remove ${recruitLabel(recruit)}? Their sponsored study access ends.`)) return
    try {
      await run('remove_recruit', { recruit_user_id: recruit.user_id })
      onChanged()
    } catch (err) {
      setError(errorText(err, 'Could not remove this recruit.'))
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 bg-ink-950 p-5 md:grid-cols-[1.4fr_1fr]">
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {JOURNEY_STEPS.map((step) => {
          const isDone = Boolean(recruit.steps?.[step.key])
          return (
            <label className="flex items-center gap-2.5 text-sm" key={step.key}>
              <input
                checked={isDone}
                className="h-4 w-4 accent-[var(--color-gold-500)]"
                disabled={pending !== null}
                onChange={() => toggle(step.key, isDone)}
                type="checkbox"
              />
              <span className={isDone ? 'text-muted' : 'text-paper'}>
                {step.title}
                <span className="ml-1.5 font-mono text-[10.5px] text-muted">day {step.targetDay}</span>
              </span>
            </label>
          )
        })}
      </div>
      <div className="space-y-1.5 text-sm text-muted">
        <p>Email: <span className="text-paper">{recruit.email || 'not provided'}</span></p>
        <p>Mock exams and quizzes: <span className="text-paper">{recruit.quizzes_taken}</span></p>
        <p>Last score: <span className="text-paper">{recruit.last_quiz_score ?? '—'}{recruit.last_quiz_score != null ? '%' : ''}</span></p>
        <p>Flashcards reviewed: <span className="text-paper">{recruit.cards_reviewed}</span></p>
        <p>Study streak: <span className="text-paper">{recruit.study_streak ?? 0} days</span></p>
        <button className="mt-3 text-xs text-muted underline hover:text-red-300" onClick={remove} type="button">
          Remove recruit
        </button>
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
      </div>
    </div>
  )
}

export function AgencyDashboardPage() {
  const { me, setMe, loading, error, configured, run } = useAgency()
  const [dashboard, setDashboard] = useState(null)
  const [dashError, setDashError] = useState('')
  const [open, setOpen] = useState(null)
  const [reportNote, setReportNote] = useState('')
  const [now] = useState(() => Date.now())

  const isStaff = me?.role === 'owner' || me?.role === 'manager'

  const load = useCallback(async () => {
    try {
      setDashboard(await run('dashboard'))
      setDashError('')
    } catch (err) {
      setDashError(errorText(err, 'Could not load the dashboard.'))
    }
  }, [run])

  useEffect(() => {
    if (!isStaff) return undefined
    let active = true
    run('dashboard')
      .then((data) => active && setDashboard(data))
      .catch((err) => active && setDashError(errorText(err, 'Could not load the dashboard.')))
    return () => {
      active = false
    }
  }, [isStaff, run])

  if (!configured) {
    return <DataStatePanel title="Agency tools unavailable" message="The agency service is not configured." />
  }
  if (loading) {
    return <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Loading your agency…</p>
  }
  if (error && !me) {
    return <DataStatePanel title="Couldn't load your agency" message={error.message} />
  }
  if (me?.role === 'recruit') {
    return (
      <DataStatePanel
        title={`You're a recruit with ${me.agency?.name ?? 'an agency'}`}
        message="Your agency manages this dashboard. Your own steps live on your License Path page."
      />
    )
  }
  if (!isStaff) {
    return (
      <CreateAgency
        onCreate={async (params) => {
          setMe(await run('create_agency', params))
        }}
      />
    )
  }
  if (dashError && !dashboard) {
    return <DataStatePanel title="Couldn't load the dashboard" message={dashError} />
  }
  if (!dashboard) {
    return <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Loading dashboard…</p>
  }

  const { agency, recruits, invites } = dashboard
  const kpis = agencyKpis(recruits, now)
  const seatsLeft = agency.seat_limit - agency.seats_used
  const pilotEnds = agency.pilot_ends_at ? new Date(agency.pilot_ends_at) : null

  const copyReport = async () => {
    const ok = await copy(buildWeeklyReport(agency, recruits, now))
    setReportNote(ok ? 'Weekly report copied. Paste it into an email.' : 'Copy failed. Try the CSV download.')
    window.setTimeout(() => setReportNote(''), 3000)
  }

  const downloadCsv = () => {
    const blob = new Blob([buildCsv(recruits, now)], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${agency.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-recruits-${new Date(now).toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={eyebrow}>
            Agency dashboard · {agency.plan === 'pilot' ? 'Free pilot' : agency.plan}
            {pilotEnds && agency.plan === 'pilot' ? ` until ${pilotEnds.toLocaleDateString()}` : ''}
          </p>
          <h2 className="font-serif text-3xl font-medium sm:text-4xl">{agency.name}</h2>
          <p className="mt-2 text-muted">
            {agency.seats_used} of {agency.seat_limit} seats in use (recruits plus pending invites)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className={secondaryButton} disabled={!recruits.length} onClick={copyReport} type="button">
            Copy weekly report
          </button>
          <button className={secondaryButton} disabled={!recruits.length} onClick={downloadCsv} type="button">
            Download CSV
          </button>
        </div>
      </div>
      {reportNote ? <p className="-mt-4 text-sm text-gold-400">{reportNote}</p> : null}

      <div className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-5 [&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
        <Stat label="Recruits" value={kpis.total} />
        <Stat label="Licensed" value={kpis.licensed} />
        <Stat hint="Behind, inactive, or low readiness" label="Need attention" value={kpis.needsAttention} />
        <Stat hint="Recruits not yet passed" label="Avg readiness" value={kpis.avgReadiness === null ? '—' : `${kpis.avgReadiness}%`} />
        <Stat hint="Target: 30 or fewer" label="Avg days to license" value={kpis.avgDaysToLicensed ?? '—'} />
      </div>

      <InvitePanel invites={invites} onChanged={load} run={run} seatsLeft={seatsLeft} />

      <div>
        <p className={eyebrow}>Recruits</p>
        {recruits.length ? (
          <div className="overflow-x-auto border border-line bg-ink-900">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-line font-mono text-[10.5px] tracking-widest text-muted uppercase">
                  <th className="px-4 py-3 font-normal">Recruit</th>
                  <th className="px-4 py-3 font-normal">License</th>
                  <th className="px-4 py-3 font-normal">Day</th>
                  <th className="px-4 py-3 font-normal">Progress</th>
                  <th className="px-4 py-3 font-normal">Next step</th>
                  <th className="px-4 py-3 font-normal">Readiness</th>
                  <th className="px-4 py-3 font-normal">Last active</th>
                  <th className="px-4 py-3 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {recruits.map((recruit) => {
                  const flags = recruitFlags(recruit, now)
                  const next = nextStep(recruit.steps)
                  const done = requiredDone(recruit.steps)
                  const idle = daysSince(recruit.last_activity, now)
                  const expanded = open === recruit.user_id
                  return (
                    <Fragment key={recruit.user_id}>
                      <tr
                        className="cursor-pointer border-b border-line transition hover:bg-white/[0.03]"
                        onClick={() => setOpen(expanded ? null : recruit.user_id)}
                      >
                        <td className="px-4 py-3.5">
                          <span className="text-paper">{recruitLabel(recruit)}</span>
                          <span className="ml-2 font-mono text-[10px] text-muted">{expanded ? '▲' : '▼'}</span>
                        </td>
                        <td className="px-4 py-3.5">{getLicense(recruit.license_key)?.name ?? recruit.license_key}</td>
                        <td className="px-4 py-3.5 font-mono tabular-nums">{journeyDay(recruit.started_at, now)}/30</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="h-1 w-16 bg-ink-800">
                              <div className="h-full bg-gold-500" style={{ width: `${(done / REQUIRED_STEP_COUNT) * 100}%` }} />
                            </div>
                            <span className="font-mono text-[11px] text-muted tabular-nums">
                              {done}/{REQUIRED_STEP_COUNT}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">{next ? next.title : 'Complete'}</td>
                        <td className="px-4 py-3.5 font-mono tabular-nums text-gold-400">
                          {typeof recruit.readiness === 'number' ? `${recruit.readiness}%` : '—'}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-[12px] tabular-nums text-muted">
                          {idle === 0 ? 'today' : `${idle}d ago`}
                        </td>
                        <td className="px-4 py-3.5">
                          {flags.length ? (
                            <span className="text-red-300">{flags[0].label}{flags.length > 1 ? ` +${flags.length - 1}` : ''}</span>
                          ) : (
                            <span className="text-muted">On track</span>
                          )}
                        </td>
                      </tr>
                      {expanded ? (
                        <tr className="border-b border-line">
                          <td className="p-0" colSpan={8}>
                            <RecruitDetail onChanged={load} recruit={recruit} run={run} />
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <DataStatePanel
            title="No recruits yet"
            message="Create an invite link above and send it to your first recruit. They'll show up here as soon as they join."
          />
        )}
      </div>
    </section>
  )
}
