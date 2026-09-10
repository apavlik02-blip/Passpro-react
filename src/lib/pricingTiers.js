// Subscription tier definitions — business config, not user data (per-user
// state lives in public.user_subscriptions, read via the `access` Edge
// Function). Mirrored in supabase/functions/_shared/pricingTiers.ts for the
// Edge Functions (separate runtimes can't share one ES module) — keep both
// in sync by hand, same pattern as examBlueprints.js / the ARIA Edge
// Function's DOMAIN_WEIGHTS documented in CLAUDE.md.
//
// PRICING NOTE — the source doc's annual dollar figures didn't match its
// own stated discounts (e.g. "$39/mo or $99/yr (27% savings)" is actually a
// ~79% discount; $342/yr is what 27% off $39 x 12 actually comes to). The
// annual prices below are recomputed from monthly x 12 x (1 - stated
// discount) instead — the discount percentage is treated as the real
// business decision and the dollar figure as the error, since a ~79%
// discount isn't a plausible annual-commitment incentive and 27%/34% is
// exactly the range the doc's own rationale argues for ("matches competitor
// annual pricing strategies"). Still worth a second pair of eyes before
// these become real Stripe annual Prices — this is a recomputation of what
// the doc most likely meant, not a figure anyone explicitly confirmed:
//   Essential:    $39/mo  x12 = $468/yr,  27% off -> $341.64 -> $342/yr
//   Professional: $79/mo  x12 = $948/yr,  34% off -> $625.68 -> $626/yr
//   Premium:      $149/mo x12 = $1788/yr, 38% off -> $1108.56 -> $1109/yr
//     (Premium's 38% isn't from the source doc at all — it has no stated
//     discount for this tier — it's extrapolated from Essential's 27% and
//     Professional's 34% escalating by tier. Confirm independently.)
//
// Premium tier overall is reconstructed from the source doc's
// rationale/revenue sections, not from a fully-specified tier block (that
// block appears to have been cut off in the pasted document) — price and
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
    priceAnnualCents: 34200,
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
    priceAnnualCents: 62600,
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
    priceAnnualCents: 110900,
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
