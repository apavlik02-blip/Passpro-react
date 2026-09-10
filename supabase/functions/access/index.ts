// Access gate — three independent ways in, checked in this order, any one
// of them grants access. Nothing here revokes an existing path when another
// is added, so nobody currently holding access loses it:
//   1. access code (public.access_codes / public.user_access)
//   2. legacy one-time Stripe payment (public.user_entitlements.has_paid)
//   3. subscription tier, active or trialing (public.user_subscriptions)
//
//   POST {}                       -> { has_access, granted_at, tier, status,
//                                       trial_ends_at }        (status check)
//   POST { code }                 -> validates + records the grant, or
//                                     403 { error: 'invalid_code' }
//   POST { action: 'start_trial' } -> starts the 14-day free tier (no
//                                      Stripe involved), or 409 if the user
//                                      already has a subscription row
//                                      (trials don't restart)
//
// Deploy with --no-verify-jwt (Clerk tokens, see CLAUDE.md).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { verifyClerkToken } from '../_shared/clerk.ts'

const FREE_TRIAL_DAYS = 14

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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
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

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  let code: string | null = null
  let action: string | null = null
  try {
    const body = await req.json()
    if (typeof body?.code === 'string') {
      code = body.code.trim().toLowerCase()
    }
    if (typeof body?.action === 'string') {
      action = body.action
    }
  } catch {
    // No or malformed body — treat as a status check.
  }

  if (action === 'start_trial') {
    const { data: existing } = await supabase
      .from('user_subscriptions')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle()

    if (existing) {
      return json({ error: 'trial_already_used' }, 409)
    }

    const now = new Date()
    const trialEndsAt = new Date(now.getTime() + FREE_TRIAL_DAYS * 24 * 60 * 60 * 1000)

    const { error } = await supabase.from('user_subscriptions').insert({
      user_id: userId,
      tier: 'free',
      status: 'trialing',
      trial_ends_at: trialEndsAt.toISOString(),
    })

    if (error) {
      return json({ error: 'trial_start_failed' }, 500)
    }

    return json({
      has_access: true,
      granted_at: now.toISOString(),
      tier: 'free',
      status: 'trialing',
      trial_ends_at: trialEndsAt.toISOString(),
    })
  }

  if (code) {
    const { data: match } = await supabase
      .from('access_codes')
      .select('code')
      .eq('code', code)
      .eq('active', true)
      .maybeSingle()

    if (!match) {
      return json({ has_access: false, error: 'invalid_code' }, 403)
    }

    const grantedAt = new Date().toISOString()
    const { error } = await supabase
      .from('user_access')
      .upsert({ user_id: userId, code, granted_at: grantedAt })

    if (error) {
      return json({ error: 'grant_failed' }, 500)
    }

    return json({ has_access: true, granted_at: grantedAt, tier: null, status: null })
  }

  // Deactivating a code (access_codes.active = false) revokes its users.
  const { data: grant } = await supabase
    .from('user_access')
    .select('granted_at, access_codes!inner(active)')
    .eq('user_id', userId)
    .eq('access_codes.active', true)
    .maybeSingle()

  if (grant) {
    return json({ has_access: true, granted_at: grant.granted_at, tier: null, status: null })
  }

  const { data: paid } = await supabase
    .from('user_entitlements')
    .select('has_paid, paid_at')
    .eq('user_id', userId)
    .maybeSingle()

  if (paid?.has_paid) {
    return json({
      has_access: true,
      granted_at: paid.paid_at,
      tier: null,
      status: null,
    })
  }

  const { data: subscription } = await supabase
    .from('user_subscriptions')
    .select('tier, status, trial_ends_at, current_period_end, created_at')
    .eq('user_id', userId)
    .maybeSingle()

  const subscriptionActive =
    subscription?.status === 'active' || subscription?.status === 'trialing'

  return json({
    has_access: subscriptionActive,
    granted_at: subscriptionActive ? subscription?.created_at : null,
    tier: subscription?.tier ?? null,
    status: subscription?.status ?? null,
    trial_ends_at: subscription?.trial_ends_at ?? null,
    current_period_end: subscription?.current_period_end ?? null,
  })
})
