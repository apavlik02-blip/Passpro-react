import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { supabaseFunctionUrl } from '../lib/supabaseFunctions.js'

function entitlementFunctionUrl() {
  return import.meta.env.VITE_ENTITLEMENT_FUNCTION_URL ?? supabaseFunctionUrl('entitlement')
}

export function useEntitlement() {
  const { getToken } = useAuth()
  const [hasPaid, setHasPaid] = useState(false)
  const [paidAt, setPaidAt] = useState(null)
  const [loading, setLoading] = useState(() => Boolean(entitlementFunctionUrl()))
  const [refetchCount, setRefetchCount] = useState(0)

  const refetch = useCallback(() => {
    setRefetchCount((count) => count + 1)
  }, [])

  useEffect(() => {
    const url = entitlementFunctionUrl()
    if (!url) return

    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const token = await getToken()
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (!cancelled) {
          setHasPaid(Boolean(data.has_paid))
          setPaidAt(data.paid_at ?? null)
        }
      } catch {
        // Treat unreachable entitlement service as unpaid — fail closed.
        if (!cancelled) setHasPaid(false)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [getToken, refetchCount])

  return { hasPaid, paidAt, loading, refetch, configured: Boolean(entitlementFunctionUrl()) }
}
