import { DataStatePanel } from '../components/DataStatePanel.jsx'
import { practiceExamConfig } from '../lib/constants.js'

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

export function ProgressPage({
  studyModules,
  questionBank,
  categories,
  totalEstimatedMinutes,
  loading,
  error,
}) {
  if (loading) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Loading progress signals"
          message="Calculating content coverage from Supabase records."
        />
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel title="Unable to load progress signals" message={error} />
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Progress
        </p>
        <h2 className="font-serif text-3xl font-medium">
          Content coverage and readiness from live data.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
        <StatCard
          hint={`${totalEstimatedMinutes} guided minutes available`}
          label="Modules ready"
          value={studyModules.length}
        />
        <StatCard
          hint="Current practice bank in Supabase"
          label="Questions ready"
          value={questionBank.length}
        />
        <StatCard
          hint="Distinct content areas available"
          label="Categories covered"
          value={categories.length}
        />
      </div>

      <article className="border border-line bg-ink-900 p-6">
        <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Next milestones
        </p>
        <ul className="space-y-2 text-paper">
          <li>Expand the question bank toward {practiceExamConfig.questionCount}+ prompts</li>
          <li>Add a `user_progress` table for saved scores, attempts, and streaks</li>
          <li>Sync Stripe access state with Supabase user records</li>
        </ul>
      </article>
    </section>
  )
}
