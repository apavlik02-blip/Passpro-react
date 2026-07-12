import { DataStatePanel } from '../components/DataStatePanel.jsx'
import { humanizeSlug } from '../lib/format.js'

export function StudyPage({ studyModules, loading, error }) {
  if (loading) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Loading study modules"
          message="Fetching curriculum records from Supabase."
        />
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel title="Unable to load study modules" message={error} />
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Study
        </p>
        <h2 className="font-serif text-3xl font-medium">Curriculum pulled from Supabase.</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {studyModules.map((module) => (
          <article
            className="border border-line bg-ink-900 p-6 transition hover:border-gold-500/40"
            key={module.id}
          >
            <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
              {humanizeSlug(module.category)}
            </p>
            <h3 className="mb-2 font-serif text-xl font-medium">{module.title}</h3>
            <p className="mb-3 text-muted">{module.summary}</p>
            <p className="mb-3 font-mono text-xs text-muted">
              {module.estimatedMinutes} minutes
            </p>
            <ul className="space-y-1.5 text-sm text-paper">
              {module.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {!studyModules.length ? (
        <DataStatePanel
          title="No study modules yet"
          message="Run the Supabase seed SQL or insert module records to populate this page."
        />
      ) : null}
    </section>
  )
}
