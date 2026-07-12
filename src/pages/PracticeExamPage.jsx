import { useState } from 'react'
import { DataStatePanel } from '../components/DataStatePanel.jsx'
import { ExamPicker } from '../components/exam/ExamPicker.jsx'
import { ExamRunner } from '../components/exam/ExamRunner.jsx'

export function PracticeExamPage({ questionBank, loading, error }) {
  const [activeBlueprint, setActiveBlueprint] = useState(null)

  if (loading) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Loading question bank"
          message="Fetching practice questions from Supabase."
        />
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel title="Unable to load question bank" message={error} />
      </section>
    )
  }

  if (!questionBank.length) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="No questions yet"
          message="Run the Supabase seed SQL or insert question records to populate this page."
        />
      </section>
    )
  }

  if (!activeBlueprint) {
    return <ExamPicker onSelect={setActiveBlueprint} />
  }

  return (
    <ExamRunner
      blueprint={activeBlueprint}
      onExit={() => setActiveBlueprint(null)}
      questionBank={questionBank}
    />
  )
}
