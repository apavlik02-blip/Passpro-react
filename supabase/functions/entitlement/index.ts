// Returns whether the calling (Clerk-authenticated) user has paid.
// user_entitlements is service-role-only, so the frontend can't read it
// directly with the anon key — this is the narrow, read-only door into it.

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
  } catch {
    return json({ error: 'Invalid or expired session' }, 401)
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const { data } = await supabase
    .from('user_entitlements')
    .select('has_paid, paid_at')
    .eq('user_id', userId)
    .maybeSingle()

  return json({
    has_paid: data?.has_paid ?? false,
    paid_at: data?.paid_at ?? null,
  })
})
