import { useEffect, useState } from 'react'
import { supabase, supabaseConfigured } from '../lib/supabase.js'

const initialState = {
  studyModules: [],
  questionBank: [],
  loading: supabaseConfigured,
  error: '',
  supabaseConfigured,
}

function mapStudyModule(record) {
  return {
    id: record.id,
    category: record.category,
    title: record.title,
    summary: record.summary,
    estimatedMinutes: record.estimated_minutes,
    objectives: record.objectives ?? [],
  }
}

function mapQuestion(record) {
  return {
    id: record.id,
    category: record.domain,
    difficulty: record.difficulty,
    prompt: record.question,
    options: record.options ?? [],
    correctOption: record.correct,
    explanation: record.explanation,
    knowThis: record.know_this,
    stateSpecific: record.state_specific,
  }
}

export function useLearningContent() {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (!supabaseConfigured) {
      return undefined
    }

    let active = true

    async function loadContent() {
      setState((currentState) => ({
        ...currentState,
        loading: true,
        error: '',
      }))

      const [modulesResult, questionsResult] = await Promise.all([
        supabase
          .from('study_modules')
          .select(
            'id, category, title, summary, estimated_minutes, objectives, sort_order',
          )
          .order('sort_order', { ascending: true }),
        supabase
          .from('questions')
          .select(
            'id, domain, difficulty, question, options, correct, explanation, know_this, state_specific',
          )
          .order('created_at', { ascending: true }),
      ])

      if (!active) {
        return
      }

      if (modulesResult.error || questionsResult.error) {
        setState({
          studyModules: [],
          questionBank: [],
          loading: false,
          error:
            modulesResult.error?.message ??
            questionsResult.error?.message ??
            'Unable to load content from Supabase.',
          supabaseConfigured,
        })
        return
      }

      setState({
        studyModules: modulesResult.data.map(mapStudyModule),
        questionBank: questionsResult.data.map(mapQuestion),
        loading: false,
        error: '',
        supabaseConfigured,
      })
    }

    loadContent()

    return () => {
      active = false
    }
  }, [])

  return state
}
