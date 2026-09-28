import { supabaseFunctionUrl } from './supabaseFunctions.js'

export function agencyFunctionUrl() {
  return import.meta.env.VITE_AGENCY_FUNCTION_URL ?? supabaseFunctionUrl('agency')
}

export const AGENCY_ERROR_MESSAGES = {
  invalid_lead: 'Please add your name, agency, and a valid email.',
  invalid_name: 'Agency name needs at least 2 characters.',
  invalid_license: 'Pick a license for this recruit.',
  already_member: 'This account already belongs to an agency.',
  invite_used: 'This invite link has already been used.',
  invite_expired: 'This invite link has expired. Ask your agency for a new one.',
  invite_not_found: 'This invite link is not valid.',
  seat_limit: 'Every seat on your plan is in use. Remove a recruit or cancel an invite first.',
  not_staff: 'Only agency owners and managers can do that.',
  not_allowed: "You don't have permission to change that recruit.",
  no_journey: 'Start the license path first.',
}

export class AgencyError extends Error {
  constructor(code, status) {
    super(AGENCY_ERROR_MESSAGES[code] ?? 'Something went wrong. Please try again.')
    this.code = code
    this.status = status
  }
}

// POST to the agency Edge Function. Pass getToken (from Clerk's useAuth) for
// signed-in actions; public actions (submit_lead, invite_preview) omit it.
export async function callAgency(action, params = {}, getToken = null) {
  const url = agencyFunctionUrl()
  if (!url) throw new AgencyError('not_configured', 0)

  const headers = { 'Content-Type': 'application/json' }
  if (getToken) {
    const token = await getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let res
  try {
    res = await fetch(url, { method: 'POST', headers, body: JSON.stringify({ action, ...params }) })
  } catch {
    throw new AgencyError('network', 0)
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new AgencyError(data.error ?? 'server_error', res.status)
  return data
}
