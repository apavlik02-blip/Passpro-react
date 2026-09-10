// Creates a Stripe Checkout Session for a paid subscription tier and hands
// the frontend the URL to redirect to. Dynamic (one function, any tier x
// interval) rather than a static Stripe Payment Link per tier, because a
// Payment Link can't carry a per-request client_reference_id the way a
// Checkout Session can — and client_reference_id is how stripe-webhook maps
// the resulting subscription back to a Clerk user id.
//
// POST { tier: 'essential' | 'professional' | 'premium', interval: 'monthly' | 'annual' }
//   -> { url }                          on success
//   -> 400 { error: 'unknown_tier' }    tier/interval not recognized
//   -> 503 { error: 'price_not_configured' }  the matching STRIPE_PRICE_*
//                                              secret isn't set yet
//
// Secrets required: STRIPE_SECRET_KEY, STRIPE_PRICE_* (see
// supabase/functions/_shared/pricingTiers.ts), APP_URL (for success/cancel
// redirect — falls back to a relative-safe default if unset).
//
// Deploy with --no-verify-jwt (Clerk tokens, see CLAUDE.md).

import Stripe from 'npm:stripe@17.4.0'
import { verifyClerkToken } from '../_shared/clerk.ts'
import { resolvePriceId, type BillingInterval, type TierId } from '../_shared/pricingTiers.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

let stripe: Stripe | null = null
function getStripe(): Stripe | null {
  const key = Deno.env.get('STRIPE_SECRET_KEY')
  if (!key) return null
  if (!stripe) {
    stripe = new Stripe(key, {
      apiVersion: '2024-06-20',
      httpClient: Stripe.createFetchHttpClient(),
    })
  }
  return stripe
}

const PAYABLE_TIERS: TierId[] = ['essential', 'professional', 'premium']
const INTERVALS: BillingInterval[] = ['monthly', 'annual']

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const authHeader = req.headers.get('Authorization') || ''
  const token = authHeader.replace(/^Bearer\s+/i, '')
  if (!token) {
    return json({ error: 'Missing Authorization header' }, 401)
  }

  let userId: string
  try {
    userId = await verifyClerkToken(token)
  } catch (err) {
    console.error('clerk verification failed:', err instanceof Error ? err.message : String(err))
    return json({ error: 'Invalid or expired session' }, 401)
  }

  const stripeClient = getStripe()
  if (!stripeClient) {
    return json({ error: 'billing_not_configured' }, 503)
  }

  let tier: TierId | undefined
  let interval: BillingInterval | undefined
  try {
    const body = await req.json()
    tier = body?.tier
    interval = body?.interval
  } catch {
    return json({ error: 'invalid_body' }, 400)
  }

  if (!tier || !interval || !PAYABLE_TIERS.includes(tier) || !INTERVALS.includes(interval)) {
    return json({ error: 'unknown_tier' }, 400)
  }

  const priceId = resolvePriceId(tier, interval)
  if (!priceId) {
    console.error(`No Stripe price configured for ${tier}/${interval}`)
    return json({ error: 'price_not_configured' }, 503)
  }

  const appUrl = (Deno.env.get('APP_URL') ?? 'https://passpro-react.vercel.app').replace(/\/$/, '')

  try {
    const session = await stripeClient.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: userId,
      success_url: `${appUrl}/account?checkout=success`,
      cancel_url: `${appUrl}/pricing?checkout=cancelled`,
    })

    if (!session.url) {
      return json({ error: 'session_creation_failed' }, 500)
    }

    return json({ url: session.url })
  } catch (error) {
    console.error('Failed to create checkout session:', error)
    return json({ error: 'session_creation_failed' }, 500)
  }
})
