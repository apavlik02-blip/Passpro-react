import { useState } from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react'
import { NavLink } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter.jsx'
import { useAccess } from '../hooks/useAccess.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { PRICING_TIERS, formatPrice } from '../lib/pricingTiers.js'

function TierCard({ tier, isAnnual }) {
  const { hasAccess, startTrial, startCheckout } = useAccess()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  const priceCents = isAnnual ? tier.priceAnnualCents : tier.priceMonthlyCents
  const isFree = tier.id === 'free'

  async function handleAction() {
    setPending(true)
    setError('')
    const result = isFree
      ? await startTrial()
      : await startCheckout(tier.id, isAnnual ? 'annual' : 'monthly')
    setPending(false)
    if (!result.ok) {
      setError(
        result.error === 'trial_already_used'
          ? 'You’ve already used your free trial — check /account for your status.'
          : result.error === 'price_not_configured'
            ? 'This plan isn’t open for purchase yet.'
            : 'Something went wrong. Try again in a moment.',
      )
    }
    // startCheckout redirects the browser on success — nothing else to do here.
  }

  return (
    <div className="flex flex-col bg-ink-950 px-6 py-7">
      <div className="mb-1 flex items-center justify-between gap-2">
        <h3 className="font-serif text-2xl font-medium">{tier.name}</h3>
        {tier.isPlaceholder ? (
          <span className="border border-line px-2 py-0.5 font-mono text-[10px] tracking-widest text-muted uppercase">
            Pricing TBD
          </span>
        ) : null}
      </div>
      <p className="mb-5 text-sm text-muted">{tier.tagline}</p>

      <div className="mb-6 flex items-baseline gap-1.5">
        <span className="font-serif text-4xl font-medium tabular-nums">
          {formatPrice(priceCents)}
        </span>
        {priceCents > 0 ? (
          <span className="font-mono text-xs text-muted">/ {isAnnual ? 'year' : 'month'}</span>
        ) : (
          <span className="font-mono text-xs text-muted">/ {tier.trialDays} days</span>
        )}
      </div>

      <ul className="mb-7 flex flex-1 flex-col gap-2.5">
        {tier.features.map((feature) => (
          <li className="flex gap-2.5 text-sm text-paper" key={feature}>
            <span aria-hidden="true" className="text-gold-500">
              &middot;
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <SignedOut>
        <SignUpButton mode="modal">
          <button
            className="rounded-sm border border-line px-5 py-3 text-sm font-semibold text-paper transition hover:border-gold-500/70"
            type="button"
          >
            Sign up to get started
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <button
          className="rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-55"
          disabled={pending || (isFree && hasAccess)}
          onClick={handleAction}
          type="button"
        >
          {pending ? 'Working...' : isFree ? 'Start free trial' : 'Subscribe'}
        </button>
        {error ? <p className="mt-3 font-mono text-xs text-red-400">{error}</p> : null}
      </SignedIn>
    </div>
  )
}

export function PricingPage() {
  const { hasAccess, loading } = useAccess()
  const [isAnnual, setIsAnnual] = useState(false)

  useDocumentMeta({
    title: 'Pricing — PassPro',
    description:
      'PassPro subscription tiers: a free trial, Essential, Professional, and Premium plans for Wisconsin insurance license exam prep: Life, Accident & Health, Property, Casualty, and Personal Lines.',
  })

  return (
    <main className="flex min-h-screen flex-col bg-ink-950 text-paper">
      <div className="flex items-center justify-between border-b border-line px-6 py-3 font-mono text-[11px] tracking-widest text-muted uppercase sm:px-10">
        <NavLink to="/">PassPro</NavLink>
        <div className="flex items-center gap-5">
          <NavLink className="hover:text-paper" to="/blog">
            Study Guides
          </NavLink>
          <span className="text-gold-500">Pricing</span>
        </div>
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
        <SignedOut>
          <div className="flex flex-wrap items-center gap-3">
            <SignInButton mode="modal">
              <button
                className="rounded-sm border border-line px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-gold-500/70"
                type="button"
              >
                Sign in
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
        <p className="mb-4 font-mono text-[11px] font-bold tracking-[0.18em] text-gold-500 uppercase">
          Plans
        </p>
        <h1 className="mb-6 max-w-[22ch] font-serif text-[2.6rem] leading-[1.15] font-medium text-balance sm:text-5xl">
          Pick the level of support you need to pass.
        </h1>

        {!loading && hasAccess ? (
          <p className="mb-8 max-w-[60ch] text-sm text-muted">
            You already have access —{' '}
            <NavLink className="text-gold-500 hover:text-gold-400" to="/account">
              see your plan on the Account page
            </NavLink>
            .
          </p>
        ) : null}

        <div className="mb-10 flex items-center gap-3">
          <span className={`font-mono text-xs uppercase ${isAnnual ? 'text-muted' : 'text-paper'}`}>
            Monthly
          </span>
          <button
            aria-checked={isAnnual}
            className="relative h-6 w-11 shrink-0 rounded-full border border-line bg-ink-900 transition"
            onClick={() => setIsAnnual((value) => !value)}
            role="switch"
            type="button"
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-gold-500 transition ${
                isAnnual ? 'left-[22px]' : 'left-0.5'
              }`}
            />
          </button>
          <span className={`font-mono text-xs uppercase ${isAnnual ? 'text-paper' : 'text-muted'}`}>
            Annual
          </span>
        </div>

        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_TIERS.map((tier) => (
            <TierCard isAnnual={isAnnual} key={tier.id} tier={tier} />
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-muted">
          PassPro is independent exam-prep material, not a state-approved pre-licensing
          education provider.
        </p>
      </section>

      <div className="mt-auto">
        <SiteFooter />
      </div>
    </main>
  )
}
