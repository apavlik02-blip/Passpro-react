import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { supabaseFunctionUrl } from '../lib/supabaseFunctions.js'

function accessFunctionUrl() {
  return import.meta.env.VITE_ACCESS_FUNCTION_URL ?? supabaseFunctionUrl('access')
}

function checkoutFunctionUrl() {
  return import.meta.env.VITE_CHECKOUT_FUNCTION_URL ?? supabaseFunctionUrl('create-checkout-session')
}

// Access is granted server-side (the `access` Edge Function validates codes,
// subscriptions, and legacy payments against service-role-only tables), so
// nothing sensitive ships in the bundle and an unlock follows the Clerk
// account across devices. `tier`/`status`/`trialEndsAt` are null unless the
// user's access currently comes from a subscription (see
// src/lib/pricingTiers.js) — an access-code or legacy-payment unlock
// reports has_access without a tier.
export function useAccess() {
  const { getToken } = useAuth()
  const [hasAccess, setHasAccess] = useState(false)
  const [grantedAt, setGrantedAt] = useState(null)
  const [tier, setTier] = useState(null)
  const [status, setStatus] = useState(null)
  const [trialEndsAt, setTrialEndsAt] = useState(null)
  const [loading, setLoading] = useState(() => Boolean(accessFunctionUrl()))
  const [refetchCount, setRefetchCount] = useState(0)

  const refetch = useCallback(() => {
    setRefetchCount((count) => count + 1)
  }, [])

  const applyStatus = useCallback((data) => {
    setHasAccess(Boolean(data.has_access))
    setGrantedAt(data.granted_at ?? null)
    setTier(data.tier ?? null)
    setStatus(data.status ?? null)
    setTrialEndsAt(data.trial_ends_at ?? null)
  }, [])

  useEffect(() => {
    const url = accessFunctionUrl()
    if (!url) return

    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const token = await getToken()
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({}),
        })
        const data = await res.json()
        if (!cancelled) applyStatus(data)
      } catch {
        // Treat an unreachable access service as locked — fail closed.
        if (!cancelled) setHasAccess(false)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [getToken, refetchCount, applyStatus])

  const redeemCode = useCallback(
    async (code) => {
      const url = accessFunctionUrl()
      if (!url) return { ok: false, error: 'not_configured' }

      try {
        const token = await getToken()
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ code }),
        })
        const data = await res.json().catch(() => ({}))
        if (res.ok && data.has_access) {
          applyStatus(data)
          return { ok: true }
        }
        return { ok: false, error: data.error ?? 'invalid_code' }
      } catch {
        return { ok: false, error: 'network' }
      }
    },
    [getToken, applyStatus],
  )

  const startTrial = useCallback(async () => {
    const url = accessFunctionUrl()
    if (!url) return { ok: false, error: 'not_configured' }

    try {
      const token = await getToken()
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'start_trial' }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.has_access) {
        applyStatus(data)
        return { ok: true }
      }
      return { ok: false, error: data.error ?? 'trial_start_failed' }
    } catch {
      return { ok: false, error: 'network' }
    }
  }, [getToken, applyStatus])

  // Redirects the browser to Stripe Checkout — there's no inline result to
  // handle here, Stripe sends the user back to /account or /pricing per the
  // success_url/cancel_url the Edge Function set.
  const startCheckout = useCallback(
    async (tierId, interval) => {
      const url = checkoutFunctionUrl()
      if (!url) return { ok: false, error: 'not_configured' }

      try {
        const token = await getToken()
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ tier: tierId, interval }),
        })
        const data = await res.json().catch(() => ({}))
        if (res.ok && data.url) {
          window.location.assign(data.url)
          return { ok: true }
        }
        return { ok: false, error: data.error ?? 'checkout_failed' }
      } catch {
        return { ok: false, error: 'network' }
      }
    },
    [getToken],
  )

  return {
    hasAccess,
    grantedAt,
    tier,
    status,
    trialEndsAt,
    loading,
    refetch,
    redeemCode,
    startTrial,
    startCheckout,
    configured: Boolean(accessFunctionUrl()),
  }
}
