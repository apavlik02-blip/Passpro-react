import { Link, Navigate, useParams } from 'react-router-dom'
import { DataStatePanel } from '../components/DataStatePanel.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { STUDY_LESSONS } from '../lib/studyLessons.js'
import { humanizeSlug } from '../lib/format.js'

export function StudyLessonPage({ studyModules, loading, error }) {
  const { moduleId } = useParams()
  const module = studyModules.find((candidate) => candidate.id === moduleId)
  const Content = STUDY_LESSONS[moduleId]

  useDocumentMeta({
    title: module ? `${module.title} — PassPro` : 'Study — PassPro',
    description: module?.summary,
  })

  if (loading) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Loading lesson"
          message="Fetching curriculum records from Supabase."
        />
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel title="Unable to load lesson" message={error} />
      </section>
    )
  }

  if (!module) {
    return <Navigate to="/study" replace />
  }

  return (
    <section className="flex flex-col gap-6">
      <Link
        className="font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase hover:text-gold-400"
        to="/study"
      >
        ← Back to study
      </Link>

      <div>
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          {humanizeSlug(module.category)} · {module.estimatedMinutes} minutes
        </p>
        <h2 className="mb-3 font-serif text-3xl font-medium">{module.title}</h2>
        <p className="max-w-[70ch] text-muted">{module.summary}</p>
      </div>

      <ul className="space-y-1.5 border border-line bg-ink-900 p-6 text-sm text-paper">
        {module.objectives.map((objective) => (
          <li key={objective}>{objective}</li>
        ))}
      </ul>

      <article className="max-w-[70ch]">
        {Content ? (
          <Content />
        ) : (
          <DataStatePanel
            title="Lesson content coming soon"
            message="This topic's full study material hasn't been written yet."
          />
        )}
      </article>
    </section>
  )
}
