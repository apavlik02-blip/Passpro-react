import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { supabaseFunctionUrl } from '../lib/supabaseFunctions.js'

function ariaFunctionUrl() {
  return import.meta.env.VITE_ARIA_FUNCTION_URL ?? supabaseFunctionUrl('aria')
}

export function useAriaProgress() {
  const { getToken } = useAuth()
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(() => Boolean(ariaFunctionUrl()))

  useEffect(() => {
    const url = ariaFunctionUrl()
    if (!url) return

    let cancelled = false

    async function load() {
      try {
        const token = await getToken()
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ action: 'get_progress' }),
        })
        const data = await res.json()
        if (!cancelled && data.type === 'progress') {
          setProgress(data.data)
        }
      } catch {
        // Widget stays hidden if ARIA isn't reachable yet.
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [getToken])

  // Persists first-run onboarding answers (target exam, exam date, hours/week,
  // confidence) through the aria Edge Function — service-role writes only, the
  // browser never touches aria_progress directly.
  const saveOnboarding = useCallback(
    async (onboarding) => {
      const url = ariaFunctionUrl()
      if (!url) return null
      const token = await getToken()
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'save_onboarding', payload: { onboarding } }),
      })
      const data = await res.json()
      if (data.type !== 'progress') {
        throw new Error(data.message || 'Could not save onboarding')
      }
      setProgress(data.data)
      return data.data
    },
    [getToken],
  )

  return { progress, loading, configured: Boolean(ariaFunctionUrl()), saveOnboarding }
}
