import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DataStatePanel } from '../components/DataStatePanel.jsx'
import { useLicense } from '../hooks/useLicense.jsx'
import { humanizeSlug } from '../lib/format.js'
import { modulesForLicense } from '../lib/licenses.js'

export function StudyPage({ studyModules, loading, error }) {
  const { license } = useLicense()
  const [showAll, setShowAll] = useState(false)
  const trackModules = modulesForLicense(studyModules, license)
  const visibleModules = showAll ? studyModules : trackModules

  if (loading) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Loading study modules"
          message="Fetching your curriculum."
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
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            Study · {license.name} ({license.series})
          </p>
          <h2 className="font-serif text-3xl font-medium">
            {showAll ? 'Every Wisconsin module.' : `Your ${license.name} curriculum.`}
          </h2>
          <p className="mt-2 text-muted">
            {showAll
              ? 'All lessons across the five Wisconsin licenses.'
              : `${trackModules.length} lessons mapped to the Series ${license.series} outline, in study order.`}
          </p>
        </div>
        <button
          className="rounded-sm border border-line px-4 py-2 font-mono text-[11px] tracking-widest text-muted uppercase transition hover:border-gold-500/60 hover:text-gold-400"
          onClick={() => setShowAll((value) => !value)}
          type="button"
        >
          {showAll ? `Show ${license.name} only` : 'Show all licenses'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visibleModules.map((module, index) => (
          <Link
            className="block border border-line bg-ink-900 p-6 transition hover:border-gold-500/40"
            key={module.id}
            to={`/study/${module.id}`}
          >
            <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
              {showAll ? '' : `M-${String(index + 1).padStart(2, '0')} · `}
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
          </Link>
        ))}
      </div>

      {!visibleModules.length ? (
        <DataStatePanel
          title="No study modules yet"
          message="Lessons for this license will appear here once they are published."
        />
      ) : null}
    </section>
  )
}
