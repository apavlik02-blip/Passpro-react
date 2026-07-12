import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react'
import { NavLink } from 'react-router-dom'
import { CheckoutButton } from '../components/CheckoutButton.jsx'
import { subscriptionPrice } from '../lib/constants.js'

const included = [
  'Guided study modules covering every exam topic',
  'Practice exam with real exam-style questions and explanations',
  'Progress tracking so you know when you’re ready',
]

export function HomePage({
  stripePaymentLinkUrl,
  studyModuleCount,
  questionCount,
  supabaseConfigured,
  loading,
  error,
}) {
  let homeStatus = `${studyModuleCount} live study modules · ${questionCount} live questions`

  if (!supabaseConfigured) {
    homeStatus = 'Add Supabase env vars to load your curriculum and question bank.'
  } else if (loading) {
    homeStatus = 'Loading study modules and questions...'
  } else if (error) {
    homeStatus = error
  }

  return (
    <main className="min-h-screen bg-ink-950 text-paper">
      <div className="flex items-center justify-between border-b border-line px-6 py-3 font-mono text-[11px] tracking-widest text-muted uppercase sm:px-10">
        <span>PassPro</span>
        <span className="text-gold-500">Wisconsin Life &amp; Health Exam Prep</span>
      </div>

      <header className="flex flex-wrap items-start justify-end gap-4 px-6 pt-6 sm:px-10">
        <SignedIn>
          <div className="flex flex-wrap items-center gap-3">
            <NavLink
              className="rounded-sm border border-line px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-gold-500/70"
              to="/dashboard"
            >
              Go to dashboard
            </NavLink>
            <UserButton afterSignOutUrl={import.meta.env.BASE_URL} />
          </div>
        </SignedIn>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
        <p className="mb-4 font-mono text-[11px] font-bold tracking-[0.18em] text-gold-500 uppercase">
          Candidate record, open until exam day
        </p>
        <h1 className="mb-6 max-w-[18ch] font-serif text-[2.6rem] leading-[1.15] font-medium text-balance sm:text-6xl lg:text-[4.2rem]">
          Pass your Wisconsin life &amp; health exam, <em className="italic">on the record.</em>
        </h1>
        <p className="mb-9 max-w-[60ch] text-lg leading-relaxed text-muted">
          Study guided modules, practice with real exam-style questions, and track your progress
          until you're ready to sit — full access for {subscriptionPrice}.
        </p>

        <div className="mb-14 flex flex-wrap items-center gap-3">
          <SignedOut>
            <SignUpButton mode="modal">
              <button
                className="rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
                type="button"
              >
                Create account
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button
                className="rounded-sm border border-line px-6 py-3.5 text-sm font-semibold text-paper transition hover:border-gold-500/70"
                type="button"
              >
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <NavLink
              className="rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
              to="/dashboard"
            >
              Open member dashboard
            </NavLink>
            <CheckoutButton stripePaymentLinkUrl={stripePaymentLinkUrl} />
          </SignedIn>
        </div>

        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          {included.map((item, i) => (
            <div className="bg-ink-950 px-6 py-6" key={item}>
              <div className="mb-2 font-mono text-xs font-bold text-gold-500 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="text-sm text-paper">{item}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-xs text-muted">{homeStatus}</p>
      </section>
    </main>
  )
}
