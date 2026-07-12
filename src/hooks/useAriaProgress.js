import { useEffect, useState } from 'react'
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

  return { progress, loading, configured: Boolean(ariaFunctionUrl()) }
}
