import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { supabaseFunctionUrl } from '../lib/supabaseFunctions.js'

function accessFunctionUrl() {
  return import.meta.env.VITE_ACCESS_FUNCTION_URL ?? supabaseFunctionUrl('access')
}

// Access is granted server-side (the `access` Edge Function validates codes
// against a service-role-only table), so valid codes never ship in the bundle
// and an unlock follows the Clerk account across devices.
export function useAccess() {
  const { getToken } = useAuth()
  const [hasAccess, setHasAccess] = useState(false)
  const [grantedAt, setGrantedAt] = useState(null)
  const [loading, setLoading] = useState(() => Boolean(accessFunctionUrl()))
  const [refetchCount, setRefetchCount] = useState(0)

  const refetch = useCallback(() => {
    setRefetchCount((count) => count + 1)
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
        if (!cancelled) {
          setHasAccess(Boolean(data.has_access))
          setGrantedAt(data.granted_at ?? null)
        }
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
  }, [getToken, refetchCount])

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
          setHasAccess(true)
          setGrantedAt(data.granted_at ?? null)
          return { ok: true }
        }
        return { ok: false, error: data.error ?? 'invalid_code' }
      } catch {
        return { ok: false, error: 'network' }
      }
    },
    [getToken],
  )

  return {
    hasAccess,
    grantedAt,
    loading,
    refetch,
    redeemCode,
    configured: Boolean(accessFunctionUrl()),
  }
}
