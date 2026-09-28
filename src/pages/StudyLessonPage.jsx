import { Link, Navigate, useParams } from 'react-router-dom'
import { DataStatePanel } from '../components/DataStatePanel.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { STUDY_LESSONS } from '../lib/studyLessons.js'
import { humanizeSlug } from '../lib/format.js'
import { useLicense } from '../hooks/useLicense.jsx'
import { modulesForLicense } from '../lib/licenses.js'

export function StudyLessonPage({ studyModules, loading, error }) {
  const { moduleId } = useParams()
  const module = studyModules.find((candidate) => candidate.id === moduleId)
  const Content = STUDY_LESSONS[moduleId]
  const { license } = useLicense()
  const track = modulesForLicense(studyModules, license)
  const trackIndex = track.findIndex((candidate) => candidate.id === moduleId)
  const nextModule = trackIndex >= 0 ? track[trackIndex + 1] : null

  useDocumentMeta({
    title: module ? `${module.title} — PassPro` : 'Study — PassPro',
    description: module?.summary,
  })

  if (loading) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Loading lesson"
          message="Fetching your curriculum."
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

      <div className="flex max-w-[70ch] flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <Link
          className="rounded-sm border border-line px-5 py-3 text-sm font-semibold text-paper transition hover:border-gold-500/70"
          to="/flashcards"
        >
          Drill flashcards
        </Link>
        {nextModule ? (
          <Link
            className="rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
            to={`/study/${nextModule.id}`}
          >
            Next: {nextModule.title} →
          </Link>
        ) : (
          <Link
            className="rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
            to="/practice-exam"
          >
            Take a {license.name} mock exam →
          </Link>
        )}
      </div>
    </section>
  )
}
