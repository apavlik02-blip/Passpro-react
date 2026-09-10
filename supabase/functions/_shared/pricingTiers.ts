// Server-side mirror of src/lib/pricingTiers.js — see that file for the
// pricing-inconsistency and Premium-tier-inferred notes, both still
// unresolved as of this writing. Only what the Edge Functions actually
// need: a way to map a Stripe Price ID back to a tier + billing interval.
//
// Real Stripe Price IDs don't exist yet. Set these as Supabase secrets
// once the Products/Prices are created in the Stripe Dashboard:
//   npx supabase secrets set STRIPE_PRICE_ESSENTIAL_MONTHLY=price_...
// (and so on for every ID below). Until set, checkout-session creation for
// that tier/interval will fail closed with a clear error rather than
// silently using a placeholder price.

export type TierId = 'free' | 'essential' | 'professional' | 'premium'
export type BillingInterval = 'monthly' | 'annual'

const PRICE_ENV_VARS: Record<Exclude<TierId, 'free'>, Record<BillingInterval, string>> = {
  essential: {
    monthly: 'STRIPE_PRICE_ESSENTIAL_MONTHLY',
    annual: 'STRIPE_PRICE_ESSENTIAL_ANNUAL',
  },
  professional: {
    monthly: 'STRIPE_PRICE_PROFESSIONAL_MONTHLY',
    annual: 'STRIPE_PRICE_PROFESSIONAL_ANNUAL',
  },
  premium: {
    monthly: 'STRIPE_PRICE_PREMIUM_MONTHLY',
    annual: 'STRIPE_PRICE_PREMIUM_ANNUAL',
  },
}

export function resolvePriceId(tier: TierId, interval: BillingInterval): string | null {
  if (tier === 'free') return null
  const envVar = PRICE_ENV_VARS[tier][interval]
  return Deno.env.get(envVar) ?? null
}

// Built lazily (not at module load) so a missing secret doesn't crash every
// cold start — same reasoning as stripe-webhook's getStripe().
export function tierForPriceId(priceId: string): { tier: TierId; interval: BillingInterval } | null {
  for (const [tier, intervals] of Object.entries(PRICE_ENV_VARS) as [
    Exclude<TierId, 'free'>,
    Record<BillingInterval, string>,
  ][]) {
    for (const [interval, envVar] of Object.entries(intervals) as [BillingInterval, string][]) {
      if (Deno.env.get(envVar) === priceId) {
        return { tier, interval }
      }
    }
  }
  return null
}
