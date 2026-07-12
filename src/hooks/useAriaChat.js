import { useCallback, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { supabaseFunctionUrl } from '../lib/supabaseFunctions.js'

const ARIA_QUICK_STARTERS = [
  'Give me a practice quiz',
  'Analyze my readiness',
  'What is the Wisconsin grace period?',
  'Create a study schedule',
]

function ariaFunctionUrl() {
  return import.meta.env.VITE_ARIA_FUNCTION_URL ?? supabaseFunctionUrl('aria')
}

function suggestionsFor(reply) {
  const lower = reply.toLowerCase()
  if (lower.includes('quiz') || lower.includes('question')) {
    return ['Show me another quiz', 'Explain that topic more', 'How am I doing overall?']
  }
  if (lower.includes('readiness') || lower.includes('score') || lower.includes('%')) {
    return ['What should I focus on?', 'Give me a practice quiz', 'Create a study schedule']
  }
  if (lower.includes('schedule') || lower.includes('plan')) {
    return ['Give me a practice quiz', 'What is a grace period?', 'Analyze my readiness']
  }
  return ARIA_QUICK_STARTERS
}

export function useAriaChat() {
  const { getToken } = useAuth()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm ARIA, your insurance exam coach. Ask me anything about your Wisconsin life and health exam — concepts, practice questions, or study tips.",
    },
  ])
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState(ARIA_QUICK_STARTERS)
  const [configured] = useState(() => Boolean(ariaFunctionUrl()))

  const callFunction = useCallback(
    async (body) => {
      const token = await getToken()
      const res = await fetch(ariaFunctionUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      return res.json()
    },
    [getToken],
  )

  const send = useCallback(
    async (text) => {
      const trimmed = text.trim()
      if (!trimmed || loading) return

      const userMessage = { role: 'user', content: trimmed }
      const updated = [...messages, userMessage]
      setMessages(updated)
      setSuggestions([])
      setQuiz(null)
      setLoading(true)

      try {
        const data = await callFunction({ messages: updated })

        if (data.type === 'tool_result' && data.tool === 'generate_practice_questions') {
          setQuiz(data.data)
          setMessages((prev) => [...prev, { role: 'assistant', content: data.message }])
        } else if (data.type === 'tool_result') {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: data.message, toolData: data.data, tool: data.tool },
          ])
          setSuggestions(suggestionsFor(data.message))
        } else {
          const reply = data.message || 'Sorry, I had trouble responding. Try again.'
          setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
          setSuggestions(suggestionsFor(reply))
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Connection error. Please try again.' },
        ])
        setSuggestions(ARIA_QUICK_STARTERS)
      } finally {
        setLoading(false)
      }
    },
    [messages, loading, callFunction],
  )

  const submitQuizResult = useCallback(
    async (quizResult) => {
      try {
        const data = await callFunction({ action: 'submit_quiz_result', payload: { quizResult } })
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.message || 'Quiz complete.' },
        ])
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Quiz complete, but I could not save your progress.' },
        ])
      }
      setQuiz(null)
      setSuggestions(ARIA_QUICK_STARTERS)
    },
    [callFunction],
  )

  return { messages, quiz, loading, suggestions, configured, send, submitQuizResult }
}
