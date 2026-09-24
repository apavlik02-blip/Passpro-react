import { useLicense } from '../../hooks/useLicense.jsx'
import { LICENSES } from '../../lib/licenses.js'
import { humanizeSlug } from '../../lib/format.js'
import { drillBlueprint } from '../../lib/examHistory.js'

export function ExamPicker({ onSelect }) {
  const { license } = useLicense()
  const blueprint = license.exam
  const others = LICENSES.filter((item) => item.key !== license.key)
  const topDomains = Object.entries(blueprint.weights)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)

  return (
    <section className="flex flex-col gap-8">
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Practice exam
        </p>
        <h2 className="font-serif text-3xl font-medium">
          A full-length Wisconsin {license.name} mock exam.
        </h2>
      </div>

      <article className="grid grid-cols-1 border border-gold-500/50 bg-ink-900 md:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col p-6 sm:p-8">
          <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            PSI Series {license.series} · your track
          </p>
          <h3 className="mb-3 font-serif text-2xl font-medium">
            {blueprint.totalQuestions} questions · {blueprint.timeLimitMinutes} minutes ·{' '}
            {blueprint.passingScore}% to pass
          </h3>
          <p className="mb-6 flex-1 text-muted">
            Questions are sampled domain by domain in the same proportions as the official
            outline. Answers and explanations appear when you submit, with a score for each
            domain.
          </p>
          <div>
            <button
              className="inline-flex min-w-[200px] items-center justify-center rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
              onClick={() => onSelect(blueprint)}
              type="button"
            >
              Start {license.name} exam
            </button>
          </div>
        </div>
        <div className="border-t border-line p-6 sm:p-8 md:border-t-0 md:border-l">
          <p className="mb-3 font-mono text-[11px] tracking-widest text-muted uppercase">
            Heaviest domains
          </p>
          {topDomains.map(([domain, weight]) => (
            <div className="flex items-baseline justify-between gap-3 border-b border-line py-2.5" key={domain}>
              <span className="text-sm text-paper">{humanizeSlug(domain)}</span>
              <span className="font-mono text-[12px] text-gold-500 tabular-nums">{weight} Q</span>
            </div>
          ))}
        </div>
      </article>

      <div>
        <p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Quick drills
        </p>
        <p className="mb-4 text-sm text-muted">
          Ten questions from one domain, with explanations. Good for fixing a weak spot in 10
          minutes.
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(blueprint.weights)
            .sort((a, b) => b[1] - a[1])
            .map(([domain]) => (
              <button
                className="border border-line bg-ink-900 px-3 py-2 text-sm text-paper transition hover:border-gold-500/60 hover:text-gold-400"
                key={domain}
                onClick={() => onSelect(drillBlueprint(domain, humanizeSlug(domain), license.key))}
                type="button"
              >
                {humanizeSlug(domain)}
              </button>
            ))}
        </div>
      </div>

      <div>
        <p className="mb-3 font-mono text-[11px] tracking-widest text-muted uppercase">
          Other Wisconsin exams
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {others.map((item) => (
            <button
              className="flex flex-col border border-line bg-ink-900 p-5 text-left transition hover:border-gold-500/60"
              key={item.key}
              onClick={() => onSelect(item.exam)}
              type="button"
            >
              <span className="mb-1 font-mono text-[10.5px] tracking-widest text-gold-500 uppercase">
                Series {item.series}
              </span>
              <span className="font-serif text-lg text-paper">{item.name}</span>
              <span className="mt-2 font-mono text-[11px] text-muted">Start exam →</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
