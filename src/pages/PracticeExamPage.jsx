import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLicense } from '../hooks/useLicense.jsx'
import { drillBlueprint } from '../lib/examHistory.js'
import { humanizeSlug } from '../lib/format.js'
import { DataStatePanel } from '../components/DataStatePanel.jsx'
import { ExamPicker } from '../components/exam/ExamPicker.jsx'
import { ExamRunner } from '../components/exam/ExamRunner.jsx'

export function PracticeExamPage({ questionBank, loading, error }) {
  const { license } = useLicense()
  const [searchParams] = useSearchParams()
  // /practice-exam?drill=<domain> starts a 10-question drill straight away.
  const [activeBlueprint, setActiveBlueprint] = useState(() => {
    const domain = searchParams.get('drill')
    return domain && license.exam.weights[domain]
      ? drillBlueprint(domain, humanizeSlug(domain), license.key)
      : null
  })
  const [attempt, setAttempt] = useState(0)

  if (loading) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Loading question bank"
          message="Fetching practice questions."
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
          message="Practice questions will appear here once they are published."
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
      key={`${activeBlueprint.key}-${attempt}`}
      onExit={() => setActiveBlueprint(null)}
      onRetake={() => setAttempt((value) => value + 1)}
      questionBank={questionBank}
    />
  )
}
