import { DataStatePanel } from '../components/DataStatePanel.jsx'
import { practiceExamConfig } from '../lib/constants.js'
import { humanizeSlug } from '../lib/format.js'
import { useAriaProgress } from '../hooks/useAriaProgress.js'

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

function formatAttemptDate(isoDate) {
  const parsed = new Date(isoDate)
  if (Number.isNaN(parsed.getTime())) return isoDate
  return parsed.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function weakestDomain(domainScores) {
  const entries = Object.entries(domainScores ?? {})
  if (!entries.length) return null
  return entries.reduce((lowest, entry) => (entry[1] < lowest[1] ? entry : lowest))
}

function AttemptLedger({ attempts }) {
  return (
    <div>
      <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
        Attempt history
      </p>
      <div className="border-t border-line">
        {attempts.map((attempt, i) => {
          const passed = attempt.score >= practiceExamConfig.passingScore
          const weakest = weakestDomain(attempt.domain_scores)
          return (
            <div
              className="flex items-center justify-between gap-4 border-b border-line py-4"
              key={`${attempt.date}-${i}`}
            >
              <div className="flex min-w-0 flex-1 items-baseline gap-4">
                <span className="shrink-0 font-mono text-[11px] text-muted tabular-nums">
                  {formatAttemptDate(attempt.date)}
                </span>
                <span className="truncate text-sm text-muted">
                  {weakest ? `Weakest area: ${humanizeSlug(weakest[0])} (${weakest[1]}%)` : ''}
                </span>
              </div>
              <span
                className={`shrink-0 font-mono text-[11px] font-bold tracking-widest uppercase ${
                  passed ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {passed ? 'Pass' : 'Below'}
              </span>
              <span className="shrink-0 font-mono text-[13px] font-semibold whitespace-nowrap text-gold-500 tabular-nums">
                {attempt.score}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ProgressPage() {
  const { progress, loading, configured } = useAriaProgress()

  if (!configured) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Progress tracking is not configured"
          message="Connect Supabase to record exam attempts and readiness."
        />
      </section>
    )
  }

  if (loading) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Loading your progress"
          message="Fetching your scores, attempts, and readiness."
        />
      </section>
    )
  }

  const attempts = [...(progress?.quiz_history ?? [])].reverse()
  const readiness = progress?.current_readiness ?? 0
  const weakDomains = progress?.weak_domains ?? []

  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Progress
        </p>
        <h2 className="font-serif text-3xl font-medium">
          Your scores, attempts, and exam readiness.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          hint="Blend of your baseline and recent scores"
          label="Readiness"
          value={`${readiness}%`}
        />
        <StatCard
          hint={
            progress?.last_quiz_score != null
              ? `Passing score is ${practiceExamConfig.passingScore}%`
              : 'Finish an exam to record one'
          }
          label="Latest score"
          value={progress?.last_quiz_score != null ? `${progress.last_quiz_score}%` : '—'}
        />
        <StatCard
          hint="Practice exams and ARIA quizzes (last 10 kept)"
          label="Attempts"
          value={attempts.length}
        />
        <StatCard
          hint="Consecutive days with a recorded attempt"
          label="Study streak"
          value={progress?.study_streak ?? 0}
        />
      </div>

      <article className="border border-line bg-ink-900 p-6">
        <div className="mb-3 flex items-baseline justify-between">
          <p className="font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            Readiness
          </p>
          <span className="font-mono text-sm font-semibold text-gold-500 tabular-nums">
            {readiness}% of 100
          </span>
        </div>
        <div className="h-1.5 bg-line">
          <div
            className="h-full bg-gold-500"
            style={{ width: `${Math.min(100, Math.max(0, readiness))}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-muted">
          Readiness rises as you log passing scores and falls when weak areas persist. Aim to hold
          it above the {practiceExamConfig.passingScore}% passing benchmark before your exam date.
        </p>
      </article>

      {weakDomains.length ? (
        <article className="border border-line bg-ink-900 p-6">
          <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            Focus areas
          </p>
          <div className="flex flex-wrap gap-2">
            {weakDomains.map((domain) => (
              <span
                className="border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
                key={domain}
              >
                {humanizeSlug(domain)}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">
            Domains where you scored under 55% on a recent attempt. Drill these in Study, then
            retake a practice exam to clear them.
          </p>
        </article>
      ) : null}

      <article className="border border-line bg-ink-900 p-6">
        {attempts.length ? (
          <AttemptLedger attempts={attempts} />
        ) : (
          <div>
            <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
              Attempt history
            </p>
            <p className="text-muted">
              No attempts recorded yet. Finish a practice exam and your score will appear here
              automatically.
            </p>
          </div>
        )}
      </article>
    </section>
  )
}
