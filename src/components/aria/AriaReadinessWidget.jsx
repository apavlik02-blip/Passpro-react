import { humanizeSlug } from '../../lib/format.js'
import { useAriaProgress } from '../../hooks/useAriaProgress.js'

export function AriaReadinessWidget({ onOpenAria }) {
  const { progress, loading, configured } = useAriaProgress()

  if (!configured || loading || !progress) return null

  return (
    <article className="border border-line bg-ink-900 p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            ARIA readiness
          </p>
          <p className="font-mono text-3xl font-semibold text-gold-500 tabular-nums">
            {progress.current_readiness}%
          </p>
        </div>
        {progress.study_streak > 0 ? (
          <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 font-mono text-xs text-gold-400">
            {progress.study_streak} day streak
          </span>
        ) : null}
      </div>

      <div className="mb-4 h-1.5 bg-line">
        <div
          className="h-full bg-gold-500"
          style={{ width: `${Math.min(100, Math.max(0, progress.current_readiness))}%` }}
        />
      </div>

      {progress.weak_domains?.length ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {progress.weak_domains.map((domain) => (
            <span
              className="border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
              key={domain}
            >
              {humanizeSlug(domain)}
            </span>
          ))}
        </div>
      ) : null}

      <button
        className="w-full rounded-sm bg-gold-500 px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
        onClick={onOpenAria}
        type="button"
      >
        Talk to ARIA
      </button>
    </article>
  )
}
