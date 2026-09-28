// Licensed in 30 Days — agency accounts, invites, recruit license journeys,
// and the owner dashboard. The business rules live in SQL functions
// (supabase/migrations/20260925090100_agency_functions.sql) which only the
// service role may execute; this function authenticates the caller with
// Clerk and passes the verified user id through.
//
//   POST { action, ...params }
//
// Public actions (no token): submit_lead, invite_preview
// Signed-in actions: me, create_agency, create_invite, revoke_invite,
//   accept_invite, start_journey, set_step, dashboard, remove_recruit
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

const ERROR_STATUS: Record<string, number> = {
  invalid_lead: 400,
  invalid_name: 400,
  invalid_license: 400,
  invalid_step: 400,
  already_member: 409,
  invite_used: 409,
  invite_expired: 410,
  invite_not_found: 404,
  seat_limit: 402,
  not_staff: 403,
  not_allowed: 403,
  no_journey: 404,
}

function str(value: unknown, max = 200): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed ? trimmed.slice(0, max) : null
}

type Rpc = { fn: string; args: Record<string, unknown> }

function route(action: string, body: Record<string, unknown>, userId: string): Rpc | null {
  switch (action) {
    case 'me':
      return { fn: 'agency_me', args: { p_user: userId } }
    case 'create_agency':
      return {
        fn: 'agency_create',
        args: { p_user: userId, p_name: str(body.name, 120), p_contact_email: str(body.contact_email) },
      }
    case 'create_invite':
      return {
        fn: 'agency_create_invite',
        args: {
          p_user: userId,
          p_license_key: str(body.license_key, 40),
          p_name: str(body.name, 120),
          p_email: str(body.email),
        },
      }
    case 'revoke_invite':
      return { fn: 'agency_revoke_invite', args: { p_user: userId, p_code: str(body.code, 40) } }
    case 'accept_invite':
      return {
        fn: 'agency_accept_invite',
        args: {
          p_user: userId,
          p_code: str(body.code, 40),
          p_display_name: str(body.display_name, 120),
          p_email: str(body.email),
        },
      }
    case 'start_journey':
      return { fn: 'journey_start', args: { p_user: userId, p_license_key: str(body.license_key, 40) } }
    case 'set_step':
      return {
        fn: 'journey_set_step',
        args: {
          p_actor: userId,
          p_target: str(body.recruit_user_id, 120) ?? userId,
          p_step: str(body.step_key, 60),
          p_done: body.done !== false,
        },
      }
    case 'dashboard':
      return { fn: 'agency_dashboard', args: { p_user: userId } }
    case 'remove_recruit':
      return {
        fn: 'agency_remove_recruit',
        args: { p_user: userId, p_recruit: str(body.recruit_user_id, 120) },
      }
    default:
      return null
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return json({ error: 'method_not_allowed' }, 405)
  }

  let body: Record<string, unknown> = {}
  try {
    body = (await req.json()) ?? {}
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }
  const action = typeof body.action === 'string' ? body.action : ''

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const call = async ({ fn, args }: Rpc) => {
    const { data, error } = await supabase.rpc(fn, args)
    if (error) {
      const code = error.message?.startsWith('agency:') ? error.message.slice(7) : null
      if (code) return json({ error: code }, ERROR_STATUS[code] ?? 400)
      console.error(`${fn} failed:`, error.message)
      return json({ error: 'server_error' }, 500)
    }
    return json(data)
  }

  // Public actions.
  if (action === 'submit_lead') {
    return call({
      fn: 'agency_submit_lead',
      args: {
        p_contact_name: str(body.contact_name, 120),
        p_email: str(body.email),
        p_agency_name: str(body.agency_name, 160),
        p_phone: str(body.phone, 40),
        p_recruits_per_year: str(body.recruits_per_year, 40),
        p_message: str(body.message, 2000),
      },
    })
  }
  if (action === 'invite_preview') {
    return call({ fn: 'agency_invite_preview', args: { p_code: str(body.code, 40) } })
  }

  const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '')
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

  const rpc = route(action, body, userId)
  if (!rpc) {
    return json({ error: 'unknown_action' }, 400)
  }
  return call(rpc)
})
