// Subscription tier definitions — business config, not user data (per-user
// state lives in public.user_subscriptions, read via the `access` Edge
// Function). Mirrored in supabase/functions/_shared/pricingTiers.ts for the
// Edge Functions (separate runtimes can't share one ES module) — keep both
// in sync by hand, same pattern as examBlueprints.js / the ARIA Edge
// Function's DOMAIN_WEIGHTS documented in CLAUDE.md.
//
// PRICING NOTE — needs a human decision before this goes live with real
// Stripe Prices: every tier's stated "annual" price below is roughly
// monthly x 2.5, not monthly x 12 minus the stated discount. E.g. Essential
// is priced at $39/mo but $99/yr — that's a ~79% discount, not the "27%
// savings" the source pricing doc claims (27% off $39 x 12 would be
// ~$342/yr). Same pattern on every other tier. This looks like a unit
// error in the source document (quarterly price mislabeled annual?) rather
// than an intentional loss-leader. Shipped here exactly as given so nothing
// is silently "corrected" into a number nobody actually decided on — flag
// this to whoever owns pricing before creating real Stripe annual Prices.
//
// Premium tier is reconstructed from the source doc's rationale/revenue
// sections, not from a fully-specified tier block (that block appears to
// have been cut off in the pasted document) — price, annual price, and
// feature list here are inferred and need explicit confirmation.

export const PRICING_TIERS = [
  {
    id: 'free',
    name: 'Free Trial',
    tagline: 'Evaluate PassPro before you commit.',
    priceMonthlyCents: 0,
    priceAnnualCents: 0,
    trialDays: 14,
    requiresCard: false,
    features: [
      '50 practice questions',
      '1 full-length practice exam',
      'Basic study dashboard',
      'Email support',
      'No credit card required',
    ],
  },
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Self-directed exam prep with full ARIA access.',
    priceMonthlyCents: 3900,
    priceAnnualCents: 9900,
    features: [
      'Unlimited practice questions (full question bank)',
      '3 full-length practice exams',
      'AI-powered study recommendations (ARIA)',
      'Adaptive learning paths',
      'Performance analytics & progress tracking',
      '30-day money-back guarantee',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'For serious candidates who want premium support.',
    priceMonthlyCents: 7900,
    priceAnnualCents: 19900,
    features: [
      'Everything in Essential',
      'Unlimited full-length practice exams',
      'Full ARIA study companion — personalized tutoring',
      'Wisconsin state law supplements',
      'Weak-area performance reports',
      'Priority email support (24-hour response)',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Personalized guidance for candidates and teams.',
    // INFERRED — not fully specified in the source doc. Confirm before use.
    priceMonthlyCents: 14900,
    priceAnnualCents: 39900,
    isPlaceholder: true,
    features: [
      'Everything in Professional',
      'ARIA Pro — 1-on-1 coaching hybrid',
      'Guaranteed pass program (full exam fee refund with proof of engagement)',
      'White-label / agency pricing available',
    ],
  },
]

export function getTier(tierId) {
  return PRICING_TIERS.find((tier) => tier.id === tierId) ?? null
}

export function formatPrice(cents) {
  if (cents === 0) return 'Free'
  return `$${(cents / 100).toFixed(2)}`
}
