// Stripe webhook — the only source of truth for "did this user pay."
// Frontend redirects to a Stripe Payment Link and back are never trusted
// on their own; access is granted here, after Stripe confirms the charge
// server-to-server.
//
// Secrets required (supabase secrets set):
//   STRIPE_WEBHOOK_SECRET  - from the Stripe Dashboard webhook endpoint (whsec_...)
//   STRIPE_SECRET_KEY      - not used on this function's happy path today,
//                            kept available for future refund/lookup calls
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are injected automatically.
//
// Register this endpoint in the Stripe Dashboard (Developers > Webhooks)
// pointing at ${SUPABASE_URL}/functions/v1/stripe-webhook, subscribed to:
//   checkout.session.completed, charge.refunded,
//   charge.dispute.created, payment_intent.payment_failed

import Stripe from 'npm:stripe@17.4.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

// Lazily constructed — the Stripe SDK throws synchronously if given an
// empty key, which would crash the function at module load (every cold
// start) if STRIPE_SECRET_KEY isn't set yet, not just this one request.
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

const PRICE_USD_CENTS = 1999

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

// deno-lint-ignore no-explicit-any
async function alreadyProcessed(supabase: any, eventId: string): Promise<boolean> {
  const { data } = await supabase
    .from('idempotency_keys')
    .select('key')
    .eq('key', eventId)
    .maybeSingle()
  return Boolean(data)
}

// deno-lint-ignore no-explicit-any
async function markProcessed(supabase: any, eventId: string, resourceType: string, resourceId: string) {
  await supabase.from('idempotency_keys').insert({
    key: eventId,
    resource_type: resourceType,
    resource_id: resourceId,
  })
}

// deno-lint-ignore no-explicit-any
async function writeLedgerPair(
  supabase: any,
  amount: number,
  currency: string,
  referenceType: string,
  referenceId: string,
  idempotencyKey: string,
  description: string,
  reverse = false,
) {
  const clearing = reverse ? 'credit' : 'debit'
  const revenue = reverse ? 'debit' : 'credit'

  await supabase.from('ledger').insert([
    {
      account_id: 'stripe:clearing',
      entry_type: clearing,
      amount,
      currency,
      reference_type: referenceType,
      reference_id: referenceId,
      idempotency_key: idempotencyKey,
      description,
    },
    {
      account_id: 'revenue:passpro',
      entry_type: revenue,
      amount,
      currency,
      reference_type: referenceType,
      reference_id: referenceId,
      idempotency_key: idempotencyKey,
      description,
    },
  ])
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const stripe = getStripe()
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

  if (!stripe || !signature || !webhookSecret) {
    return json({ error: 'Webhook not configured yet' }, 503)
  }

  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return json({ error: 'Invalid signature' }, 400)
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  if (await alreadyProcessed(supabase, event.id)) {
    return json({ received: true, idempotent: true })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id

        if (!userId) {
          console.error('checkout.session.completed with no client_reference_id', session.id)
          break
        }

        const amount = session.amount_total ?? PRICE_USD_CENTS
        const currency = session.currency ?? 'usd'

        await writeLedgerPair(
          supabase,
          amount,
          currency,
          'payment',
          session.id,
          event.id,
          `Checkout completed for ${userId}`,
        )

        await supabase.from('user_entitlements').upsert({
          user_id: userId,
          has_paid: true,
          paid_at: new Date().toISOString(),
          stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
          stripe_checkout_session_id: session.id,
        })

        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const amount = charge.amount_refunded

        // Look up which user this charge's checkout session belongs to via
        // the ledger entry we wrote at purchase time (payment_intent links
        // charge -> session isn't always present, so we key off customer).
        const customerId = typeof charge.customer === 'string' ? charge.customer : null

        await writeLedgerPair(
          supabase,
          amount,
          charge.currency,
          'refund',
          charge.id,
          event.id,
          `Refund for charge ${charge.id}`,
          true,
        )

        if (customerId) {
          await supabase
            .from('user_entitlements')
            .update({ has_paid: false })
            .eq('stripe_customer_id', customerId)
        }

        break
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute
        const customerId =
          typeof dispute.charge === 'string'
            ? (await stripe.charges.retrieve(dispute.charge)).customer
            : null
        const resolvedCustomerId = typeof customerId === 'string' ? customerId : null

        console.warn('Dispute created, revoking access defensively:', dispute.id)

        if (resolvedCustomerId) {
          await supabase
            .from('user_entitlements')
            .update({ has_paid: false })
            .eq('stripe_customer_id', resolvedCustomerId)
        }

        break
      }

      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent
        console.warn('Payment failed:', intent.id, intent.last_payment_error?.message)
        break
      }

      default:
        break
    }

    await markProcessed(supabase, event.id, event.type, event.id)
    return json({ received: true })
  } catch (error) {
    console.error('Error processing webhook event:', event.type, error)
    return json({ error: 'Processing failed' }, 500)
  }
})
