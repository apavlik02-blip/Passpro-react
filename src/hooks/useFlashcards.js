import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { supabaseFunctionUrl } from '../lib/supabaseFunctions.js'

function ariaFunctionUrl() {
  return import.meta.env.VITE_ARIA_FUNCTION_URL ?? supabaseFunctionUrl('aria')
}

// Spaced-repetition state for the flashcard deck. Reviews live in the
// service-role-only flashcard_reviews table, reached through the aria Edge
// Function (get_flashcards / rate_flashcard) — same auth bridge as ARIA chat.
export function useFlashcards() {
  const { getToken } = useAuth()
  const [reviews, setReviews] = useState(null) // Map of card_id -> review row
  const [loadedAt, setLoadedAt] = useState(null) // "now" frozen at fetch time, for due checks
  const [loading, setLoading] = useState(() => Boolean(ariaFunctionUrl()))

  useEffect(() => {
    const url = ariaFunctionUrl()
    if (!url) return undefined

    let cancelled = false

    async function load() {
      try {
        const token = await getToken()
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ action: 'get_flashcards' }),
        })
        const data = await res.json()
        if (!cancelled && data.type === 'flashcards') {
          setReviews(new Map(data.data.map((row) => [row.card_id, row])))
        }
      } catch {
        // Deck still works read-only; ratings just won't persist this session.
      } finally {
        if (!cancelled) {
          setLoadedAt(Date.now())
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [getToken])

  const rate = useCallback(
    async (cardId, rating) => {
      const url = ariaFunctionUrl()
      if (!url) return null
      try {
        const token = await getToken()
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ action: 'rate_flashcard', payload: { cardId, rating } }),
        })
        const data = await res.json()
        if (data.type !== 'flashcard_rated') return null
        setReviews((prev) => {
          const next = new Map(prev ?? [])
          next.set(data.data.card_id, data.data)
          return next
        })
        return data.data
      } catch {
        return null
      }
    },
    [getToken],
  )

  return { reviews, loadedAt, loading, configured: Boolean(ariaFunctionUrl()), rate }
}
