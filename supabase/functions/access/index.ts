// Access-code gate. Codes are stored server-side in public.access_codes
// (service-role-only) so they never reach the browser bundle; unlocks are
// recorded per Clerk user in public.user_access.
//
//   POST {}         -> { has_access, granted_at }              (status check)
//   POST { code }   -> validates + records the grant, or
//                      403 { error: 'invalid_code' }
//
// Users with a paid entitlement from the retired Stripe flow
// (user_entitlements.has_paid) keep access without a code.
//
// Deploy with --no-verify-jwt (Clerk tokens, see CLAUDE.md).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { verifyClerkToken } from '../_shared/clerk.ts'

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
  try {
    const body = await req.json()
    if (typeof body?.code === 'string') {
      code = body.code.trim().toLowerCase()
    }
  } catch {
    // No or malformed body — treat as a status check.
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

    return json({ has_access: true, granted_at: grantedAt })
  }

  // Deactivating a code (access_codes.active = false) revokes its users.
  const { data: grant } = await supabase
    .from('user_access')
    .select('granted_at, access_codes!inner(active)')
    .eq('user_id', userId)
    .eq('access_codes.active', true)
    .maybeSingle()

  if (grant) {
    return json({ has_access: true, granted_at: grant.granted_at })
  }

  const { data: paid } = await supabase
    .from('user_entitlements')
    .select('has_paid, paid_at')
    .eq('user_id', userId)
    .maybeSingle()

  return json({
    has_access: Boolean(paid?.has_paid),
    granted_at: paid?.paid_at ?? null,
  })
})
