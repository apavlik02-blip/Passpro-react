import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { agencyFunctionUrl, callAgency } from '../lib/agencyApi.js'

// The signed-in user's agency role and license journey:
// { role: 'owner' | 'manager' | 'recruit' | null, agency, journey }
export function useAgency() {
  const { getToken, isSignedIn } = useAuth()
  const configured = Boolean(agencyFunctionUrl())
  const [me, setMe] = useState(null)
  const [loading, setLoading] = useState(configured)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    try {
      const data = await callAgency('me', {}, getToken)
      setMe(data)
      setError(null)
      return data
    } catch (err) {
      setError(err)
      return null
    }
  }, [getToken])

  useEffect(() => {
    if (!configured || !isSignedIn) return undefined
    let active = true
    callAgency('me', {}, getToken)
      .then((data) => {
        if (!active) return
        setMe(data)
        setError(null)
      })
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [configured, getToken, isSignedIn])

  const run = useCallback(
    async (action, params) => {
      const data = await callAgency(action, params, getToken)
      return data
    },
    [getToken],
  )

  // Signed out (isSignedIn === false) never loads; undefined means Clerk is
  // still initializing.
  return {
    me,
    setMe,
    loading: configured && isSignedIn !== false && loading,
    error,
    configured,
    refresh,
    run,
  }
}
