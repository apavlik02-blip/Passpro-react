import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { DataStatePanel } from '../components/DataStatePanel.jsx'
import { AriaReadinessWidget } from '../components/aria/AriaReadinessWidget.jsx'
import { practiceExamConfig } from '../lib/constants.js'
import { humanizeSlug } from '../lib/format.js'
import AriaChat from '../components/AriaChat.jsx'

function StatCard({ label, value, hint }) {
  return (
    <article className="flex flex-col gap-2 border border-line bg-ink-900 p-6">
      <p className="font-mono text-[11px] tracking-wide text-muted uppercase">{label}</p>
      <strong className="font-mono text-3xl font-semibold text-gold-500 tabular-nums">
        {value}
      </strong>
      <span className="text-sm text-muted">{hint}</span>
    </article>
  )
}

function LedgerSection({ eyebrow, emptyMessage, rows }) {
  return (
    <div>
      <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
        {eyebrow}
      </p>
      {rows.length ? (
        <div className="border-t border-line">
          {rows.map((row) => (
            <div
              className="flex items-center justify-between gap-4 border-b border-line py-4"
              key={row.code}
            >
              <div className="flex min-w-0 flex-1 items-baseline gap-4">
                <span className="shrink-0 font-mono text-[11px] text-muted tabular-nums">
                  {row.code}
                </span>
                <span className="text-paper">{row.title}</span>
              </div>
              <span className="shrink-0 font-mono text-[13px] font-semibold whitespace-nowrap text-gold-500 tabular-nums">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">{emptyMessage}</p>
      )}
    </div>
  )
}

export function DashboardPage({
  studyModules,
  questionBank,
  categories,
  totalEstimatedMinutes,
  loading,
  error,
}) {
  const { openAria } = useOutletContext()
const [activeModule, setActiveModule] = useState(studyModules[0] || null)
  
  if (loading) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Loading dashboard content"
          message="Fetching study modules and questions from Supabase."
        />
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel title="Unable to load dashboard content" message={error} />
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Dashboard
        </p>
        <h2 className="font-serif text-3xl font-medium">
          Everything a new member needs on day one.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          hint={`${totalEstimatedMinutes} total guided minutes`}
          label="Study modules"
          value={studyModules.length}
        />
        <StatCard
          hint="Live questions loaded from Supabase"
          label="Question bank"
          value={questionBank.length}
        />
        <StatCard
          hint={`${practiceExamConfig.timeLimitMinutes} minute target`}
          label="Practice exam"
          value={practiceExamConfig.questionCount}
        />
        <StatCard
          hint="Benchmark for mock exam completion"
          label="Passing score"
          value={`${practiceExamConfig.passingScore}%`}
        />
      </div>

      <AriaReadinessWidget onOpenAria={openAria} />

      {activeModule && (
  <div className="h-[450px] my-4">
    <AriaChat currentModuleId={activeModule.id} />
  </div>
)}
      <LedgerSection 
  emptyMessage="No study modules found in Supabase yet." 
  eyebrow="Study plan" 
  rows={studyModules.map((module, i) => ({
    code: `M-${String(i + 1).padStart(2, '0')}`, 
    title: (
      <button 
        type="button"
        onClick={() => setActiveModule(module)}
        className={`text-left hover:text-gold-500 transition-colors ${activeModule?.id === module.id ? 'text-gold-500 font-bold' : 'text-paper'}`}
      >
        {module.title}
      </button>
    ), 
    value: `${module.estimatedMinutes} min`, 
  }))} 
/>

      <LedgerSection
        emptyMessage="No question categories found in Supabase yet."
        eyebrow="Coverage snapshot"
        rows={categories.map((category, i) => ({
          code: `C-${String(i + 1).padStart(2, '0')}`,
          title: humanizeSlug(category.name),
          value: `${category.questionCount} Q`,
        }))}
      />
    </section>
  )
}
