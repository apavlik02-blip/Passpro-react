import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/layout/PublicHeader.jsx'
import { SiteFooter } from '../components/layout/SiteFooter.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { AgencyError, callAgency } from '../lib/agencyApi.js'
import { AGENCY_PLANS, INCLUDED, PLAN_NOTES } from '../lib/agencyPlans.js'
import { JOURNEY_STEPS } from '../lib/journeySteps.js'

const eyebrow = 'mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase'
const inputClass =
  'w-full border border-line bg-ink-950 px-3 py-2.5 text-sm text-paper placeholder:text-muted/60 focus:border-gold-500/70 focus:outline-none'
const primaryButton =
  'inline-flex items-center justify-center rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:opacity-50'

const SAMPLE_RECRUITS = [
  { name: 'Recruit A', day: 12, step: 'Reach 80% readiness', readiness: 74, flag: null },
  { name: 'Recruit B', day: 19, step: 'Apply for the license', readiness: 86, flag: null },
  { name: 'Recruit C', day: 15, step: 'Schedule the PSI exam', readiness: 48, flag: 'Behind: no activity in 8 days' },
  { name: 'Recruit D', day: 27, step: 'Appointed with carriers', readiness: 91, flag: null },
]

function money(value) {
  return value.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function CostCalculator() {
  const [recruits, setRecruits] = useState(20)
  const [lostPct, setLostPct] = useState(40)
  const [costEach, setCostEach] = useState(3000)
  const lost = Math.round((recruits * lostPct) / 100)
  const total = lost * costEach

  const field = (label, value, setValue, props) => (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] tracking-widest text-muted uppercase">{label}</span>
      <input
        className={`${inputClass} font-mono tabular-nums`}
        inputMode="numeric"
        onChange={(event) => setValue(Math.max(0, Number(event.target.value.replace(/[^0-9]/g, '')) || 0))}
        value={value}
        {...props}
      />
    </label>
  )

  return (
    <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-[1.2fr_1fr]">
      <div className="grid grid-cols-1 gap-5 bg-ink-900 p-6 sm:grid-cols-3">
        {field('Recruits per year', recruits, setRecruits)}
        {field('% never licensed', lostPct, (v) => setLostPct(Math.min(100, v)))}
        {field('Cost per recruit ($)', costEach, setCostEach)}
        <p className="text-xs text-muted sm:col-span-3">
          Example numbers. Replace them with yours: recruiting spend, onboarding and training
          time, and manager hours per recruit.
        </p>
      </div>
      <div className="flex flex-col justify-center bg-ink-900 p-6">
        <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
          {lost} recruits a year never licensed
        </p>
        <p className="mt-1 font-mono text-4xl font-semibold text-gold-500 tabular-nums sm:text-5xl">
          {money(total)}
        </p>
        <p className="mt-2 text-sm text-muted">spent each year on recruits who never write a policy</p>
      </div>
    </div>
  )
}

function PilotForm() {
  const [form, setForm] = useState({
    contact_name: '',
    agency_name: '',
    email: '',
    phone: '',
    recruits_per_year: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await callAgency('submit_lead', form)
      setStatus('sent')
    } catch (err) {
      setError(err instanceof AgencyError ? err.message : 'Something went wrong. Please try again.')
      setStatus('idle')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-gold-500/50 bg-ink-900 p-8">
        <p className={eyebrow}>Request received</p>
        <h3 className="mb-2 font-serif text-2xl font-medium">Thanks, {form.contact_name.split(' ')[0]}.</h3>
        <p className="text-muted">
          Amanda will reach out to set up a 15-minute call about your pilot.
        </p>
      </div>
    )
  }

  return (
    <form className="grid grid-cols-1 gap-4 border border-line bg-ink-900 p-6 sm:grid-cols-2 sm:p-8" onSubmit={submit}>
      <label className="block">
        <span className="mb-1.5 block text-sm text-paper">Your name</span>
        <input className={inputClass} onChange={update('contact_name')} required value={form.contact_name} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-paper">Agency or IMO</span>
        <input className={inputClass} onChange={update('agency_name')} required value={form.agency_name} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-paper">Work email</span>
        <input className={inputClass} onChange={update('email')} required type="email" value={form.email} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-paper">Phone (optional)</span>
        <input className={inputClass} onChange={update('phone')} type="tel" value={form.phone} />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm text-paper">New recruits per year</span>
        <select className={inputClass} onChange={update('recruits_per_year')} value={form.recruits_per_year}>
          <option value="">Choose one</option>
          <option>1–10</option>
          <option>11–25</option>
          <option>26–75</option>
          <option>76+</option>
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm text-paper">What slows your recruits down? (optional)</span>
        <textarea className={`${inputClass} min-h-[96px]`} onChange={update('message')} value={form.message} />
      </label>
      {error ? <p className="text-sm text-red-300 sm:col-span-2">{error}</p> : null}
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button className={primaryButton} disabled={status === 'sending'} type="submit">
          {status === 'sending' ? 'Sending…' : 'Request my free pilot'}
        </button>
        <span className="text-xs text-muted">60 days free on Growth. No card required.</span>
      </div>
    </form>
  )
}

export function AgenciesPage() {
  useDocumentMeta({
    title: 'Licensed in 30 Days — for insurance agencies and IMOs | PassPro',
    description:
      'Get new insurance recruits licensed and appointed in 30 days. Wisconsin exam prep, a license tracker for every recruit, and an owner dashboard. Free 60-day pilot.',
  })

  return (
    <main className="flex min-h-screen flex-col bg-ink-950 text-paper">
      <PublicHeader />

      <section className="mx-auto w-full max-w-6xl px-6 pt-14 pb-12 sm:px-10 sm:pt-20">
        <p className="mb-5 font-mono text-[11px] font-bold tracking-[0.18em] text-gold-500 uppercase">
          For insurance agencies &amp; IMOs · Wisconsin
        </p>
        <h1 className="mb-6 max-w-[16ch] font-serif text-[2.6rem] leading-[1.06] font-medium text-balance sm:text-6xl lg:text-[4.6rem]">
          Recruits licensed in <em className="text-gold-400 italic">30 days.</em>
        </h1>
        <p className="mb-9 max-w-[60ch] text-lg leading-relaxed text-muted">
          Recruits stall on the exam, the paperwork, and the wait for appointments, and some quit
          before their first sale. Licensed in 30 Days takes each recruit from prelicensing to
          appointed, and shows you exactly where every one of them stands.
        </p>
        <div className="flex flex-wrap gap-3">
          <a className={primaryButton} href="#pilot">
            Start a free 60-day pilot
          </a>
          <a
            className="rounded-sm border border-line px-6 py-3.5 text-sm font-semibold text-paper transition hover:border-gold-500/70"
            href="#pricing"
          >
            See pricing
          </a>
        </div>
      </section>

      <section className="border-t border-line bg-ink-900/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10">
          <p className={eyebrow}>The question</p>
          <h2 className="mb-8 max-w-[28ch] font-serif text-3xl font-medium sm:text-4xl">
            What does it cost you when a recruit never gets licensed?
          </h2>
          <CostCalculator />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-px bg-line sm:grid-cols-3">
          {[
            ['01', 'Recruits study the Wisconsin version', 'Lessons, mock exams weighted to the PSI outline, 10-minute drills, and ARIA, the AI coach, for Life, A&H, Property, Casualty, and Personal Lines.'],
            ['02', 'Every recruit gets a 30-day license path', 'Prelicensing, exam, fingerprints, application, and appointments, each with a target day, so nothing sits waiting.'],
            ['03', 'You see who is on track and who is stuck', 'Scores, readiness, last activity, and the next step for every recruit, plus a weekly report for your managers.'],
          ].map(([num, title, body]) => (
            <div className="bg-ink-950 px-6 py-10 sm:px-8" key={num}>
              <div className="mb-3 font-mono text-xs font-bold text-gold-500">{num}</div>
              <h3 className="mb-2 font-serif text-xl font-medium">{title}</h3>
              <p className="text-[14.5px] text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className={eyebrow}>The 30-day path</p>
            <h2 className="mb-4 font-serif text-3xl font-medium">A target day for every step.</h2>
            <p className="text-muted">
              Recruits check off steps as they go. Your dashboard flags anyone who falls behind
              their target day or goes quiet for a week, so you can step in before they drop out.
            </p>
          </div>
          <ol className="border-t border-line">
            {JOURNEY_STEPS.filter((step) => !step.optional).map((step) => (
              <li className="flex items-baseline gap-4 border-b border-line py-3" key={step.key}>
                <span className="w-16 shrink-0 font-mono text-[12px] text-gold-500 tabular-nums">
                  Day {step.targetDay}
                </span>
                <span className="text-paper">{step.title}</span>
                <span className="ml-auto hidden shrink-0 font-mono text-[10.5px] tracking-widest text-muted uppercase sm:inline">
                  {step.owner === 'agency' ? 'Agency' : 'Recruit'}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line bg-ink-900/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10">
          <p className={eyebrow}>Owner dashboard</p>
          <h2 className="mb-2 font-serif text-3xl font-medium">Every recruit, one screen.</h2>
          <p className="mb-8 text-sm text-muted">Sample data shown.</p>
          <div className="overflow-x-auto border border-line bg-ink-900">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line font-mono text-[10.5px] tracking-widest text-muted uppercase">
                  <th className="px-5 py-3 font-normal">Recruit</th>
                  <th className="px-5 py-3 font-normal">Day</th>
                  <th className="px-5 py-3 font-normal">Next step</th>
                  <th className="px-5 py-3 font-normal">Readiness</th>
                  <th className="px-5 py-3 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_RECRUITS.map((row) => (
                  <tr className="border-b border-line last:border-b-0" key={row.name}>
                    <td className="px-5 py-3.5 text-paper">{row.name}</td>
                    <td className="px-5 py-3.5 font-mono tabular-nums">{row.day}/30</td>
                    <td className="px-5 py-3.5">{row.step}</td>
                    <td className="px-5 py-3.5 font-mono tabular-nums text-gold-400">{row.readiness}%</td>
                    <td className="px-5 py-3.5">
                      {row.flag ? (
                        <span className="text-red-300">{row.flag}</span>
                      ) : (
                        <span className="text-muted">On track</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-line" id="pricing">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10">
          <p className={eyebrow}>Pricing</p>
          <h2 className="mb-8 font-serif text-3xl font-medium sm:text-4xl">Priced per recruit seat.</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AGENCY_PLANS.map((plan) => (
              <article
                className={`flex flex-col border bg-ink-900 p-6 ${plan.featured ? 'border-gold-500/70' : 'border-line'}`}
                key={plan.id}
              >
                <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
                  {plan.name}
                  {plan.featured ? ' · pilot plan' : ''}
                </p>
                <p className="font-mono text-3xl font-semibold text-paper tabular-nums">
                  {plan.price}
                  <span className="text-sm font-normal text-muted">{plan.period}</span>
                </p>
                <p className="mt-1 mb-4 text-sm text-gold-400">{plan.recruits}</p>
                <p className="text-sm text-muted">{plan.blurb}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ul className="space-y-2 border-l border-line pl-5 text-[15px] text-paper">
              {INCLUDED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul className="space-y-2 border-l border-gold-500/50 pl-5 text-[15px] text-muted">
              {PLAN_NOTES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-900/40" id="pilot">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className={eyebrow}>Free 60-day pilot</p>
            <h2 className="mb-4 font-serif text-3xl font-medium">Try it with your next recruits.</h2>
            <p className="mb-6 text-muted">
              Growth plan, up to 25 recruits, free for 60 days. In return, we ask to use your
              pilot results (pass rates and days to licensed) and for a short testimonial if it
              works for you.
            </p>
            <div className="border-l-2 border-gold-500 pl-5">
              <p className="font-serif text-lg text-paper">
                Built by Amanda Pavlik, who is going through Wisconsin licensing herself while
                building it.
              </p>
            </div>
          </div>
          <PilotForm />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10">
          <p className={eyebrow}>Questions</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              ['Which licenses are covered?', 'Wisconsin Life, Accident & Health, Property, Casualty, and Personal Lines, each built on the official PSI exam outline.'],
              ['What can my agency see?', 'Each recruit’s license steps, practice scores, readiness, and last activity. Recruits see this before they accept your invite.'],
              ['Who handles prelicensing and appointments?', 'Recruits take prelicensing with an OCI-approved provider and apply with the state. Your agency submits carrier appointments. The path tracks every step.'],
              ['What happens after the pilot?', 'Choose the plan that fits your recruiting volume, or stop. There is no contract during the pilot.'],
            ].map(([q, a]) => (
              <div key={q}>
                <h3 className="mb-2 font-serif text-lg font-medium">{q}</h3>
                <p className="text-[15px] text-muted">{a}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted">
            Already have an invite from your agency? Open the link they sent you. Studying on your
            own? <Link className="text-gold-400 underline" to="/licenses">Compare the licenses</Link>.
          </p>
        </div>
      </section>

      <div className="mt-auto">
        <SiteFooter />
      </div>
    </main>
  )
}
