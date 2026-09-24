import { SignUpButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { Link, NavLink } from 'react-router-dom'
import { LicenseCard } from '../components/license/LicenseCards.jsx'
import { PublicHeader } from '../components/layout/PublicHeader.jsx'
import { SiteFooter } from '../components/layout/SiteFooter.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { LICENSE_FAMILIES, LICENSES } from '../lib/licenses.js'

const steps = [
  {
    title: 'Pick your Wisconsin license',
    body: 'Life, Accident & Health, Property, Casualty, or Personal Lines. Switch tracks any time.',
  },
  {
    title: 'Study what the outline weights',
    body: 'Lessons and questions are mapped to the official PSI outline, so study time matches exam points.',
  },
  {
    title: 'Sit a real-length mock exam',
    body: '100 questions, 2 hours, 70% to pass. Each practice exam is sampled domain by domain like the real one.',
  },
]

const wisconsinFacts = [
  { line: 'Casualty', fact: '25/50/10 liability, and uninsured motorist is mandatory at 25/50' },
  { line: 'Property', fact: 'The Wisconsin Insurance Plan settles at ACV, up to $350K for homes' },
  { line: 'Life', fact: 'A 31-day grace period and a 10-day free look on individual life' },
  { line: 'All lines', fact: '10 days’ notice to cancel midterm, 60 days to nonrenew' },
]

export function HomePage({
  studyModuleCount,
  questionCount,
  supabaseConfigured,
  loading,
  error,
}) {
  useDocumentMeta({
    title: 'PassPro — Wisconsin Insurance License Exam Prep',
    description:
      'Exam prep for every major Wisconsin insurance license: Life, Accident & Health, Property, Casualty, and Personal Lines. Built on the official PSI outlines.',
  })

  let homeStatus = `${studyModuleCount} study modules · ${questionCount} practice questions, live`
  if (!supabaseConfigured) {
    homeStatus = 'Curriculum loads once Supabase is configured.'
  } else if (loading) {
    homeStatus = 'Loading curriculum…'
  } else if (error) {
    homeStatus = error
  }

  return (
    <main className="flex min-h-screen flex-col bg-ink-950 text-paper">
      <PublicHeader />

      <section className="mx-auto w-full max-w-6xl px-6 pt-14 pb-12 sm:px-10 sm:pt-20">
        <p className="mb-5 font-mono text-[11px] font-bold tracking-[0.18em] text-gold-500 uppercase">
          Wisconsin insurance licensing · PSI exams
        </p>
        <h1 className="mb-6 max-w-[17ch] font-serif text-[2.6rem] leading-[1.08] font-medium text-balance sm:text-6xl lg:text-[4.4rem]">
          Pass your Wisconsin insurance exam, <em className="text-gold-400 italic">on the record.</em>
        </h1>
        <p className="mb-9 max-w-[58ch] text-lg leading-relaxed text-muted">
          One study system for all five major-line licenses: Life, Accident &amp; Health, Property,
          Casualty, and Personal Lines. Every lesson, question, and mock exam is weighted to the
          official Wisconsin content outline.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <SignedOut>
            <SignUpButton mode="modal">
              <button
                className="rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
                type="button"
              >
                Create your account
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <NavLink
              className="rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
              to="/dashboard"
            >
              Open my dashboard
            </NavLink>
          </SignedIn>
          <a
            className="rounded-sm border border-line px-6 py-3.5 text-sm font-semibold text-paper transition hover:border-gold-500/70"
            href="#licenses"
          >
            Compare the licenses
          </a>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          {[
            ['5', 'Wisconsin licenses'],
            ['100', 'Questions per exam'],
            ['2 hrs', 'Time limit'],
            ['70%', 'To pass'],
          ].map(([value, label]) => (
            <div className="bg-ink-950 px-5 py-5 sm:px-6" key={label}>
              <dt className="font-mono text-[10.5px] tracking-widest text-muted uppercase">{label}</dt>
              <dd className="mt-1 font-mono text-3xl font-semibold text-gold-500 tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 font-mono text-xs text-muted">{homeStatus}</p>
      </section>

      <section className="border-t border-line bg-ink-900/40" id="licenses">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
          <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            Choose your license
          </p>
          <h2 className="mb-10 max-w-[28ch] font-serif text-3xl font-medium sm:text-4xl">
            Every major line Wisconsin tests, each with its own blueprint.
          </h2>

          {LICENSE_FAMILIES.map((family) => (
            <div className="mb-10 last:mb-0" key={family}>
              <p className="mb-4 font-mono text-[11px] tracking-widest text-muted uppercase">
                {family}
              </p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {LICENSES.filter((license) => license.family === family).map((license) => (
                  <LicenseCard key={license.key} license={license} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-px bg-line px-0 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div className="bg-ink-950 px-6 py-10 sm:px-10" key={step.title}>
              <div className="mb-3 font-mono text-xs font-bold text-gold-500 tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="mb-2 font-serif text-xl font-medium">{step.title}</h3>
              <p className="text-[14.5px] text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
              Wisconsin, not a national template
            </p>
            <h2 className="mb-4 font-serif text-3xl font-medium">
              35% of every exam is insurance regulation. Generic prep gets it wrong.
            </h2>
            <p className="text-muted">
              National courses teach the multistate defaults. PSI tests Wisconsin statutes, the
              state residual markets, and OCI's own rules. PassPro teaches the Wisconsin version
              first.
            </p>
          </div>
          <div className="border-t border-line">
            {wisconsinFacts.map((item) => (
              <div className="flex gap-5 border-b border-line py-4" key={item.fact}>
                <span className="w-20 shrink-0 font-mono text-[11px] tracking-wide text-gold-500 uppercase">
                  {item.line}
                </span>
                <span className="text-paper">{item.fact}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-14 sm:px-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
              For agencies &amp; IMOs
            </p>
            <h2 className="mb-2 font-serif text-3xl font-medium">Hiring new producers? Licensed in 30 Days.</h2>
            <p className="max-w-[56ch] text-muted">
              Sponsor your recruits, give each one a 30-day license path, and see who is on track
              and who is stuck. Free 60-day pilot.
            </p>
          </div>
          <Link
            className="rounded-sm border border-gold-500/70 px-6 py-3.5 text-sm font-semibold text-gold-400 transition hover:bg-gold-500/10"
            to="/agencies"
          >
            See the agency program
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-ink-900/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-14 sm:px-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="mb-2 font-serif text-3xl font-medium">Ready when you are.</h2>
            <p className="text-muted">
              Pick a license, take a diagnostic mock exam, and let ARIA build your study plan.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <SignedOut>
              <SignUpButton mode="modal">
                <button
                  className="rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
                  type="button"
                >
                  Create your account
                </button>
              </SignUpButton>
            </SignedOut>
            <Link
              className="rounded-sm border border-line px-6 py-3.5 text-sm font-semibold text-paper transition hover:border-gold-500/70"
              to="/pricing"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-auto">
        <SiteFooter />
      </div>
    </main>
  )
}
