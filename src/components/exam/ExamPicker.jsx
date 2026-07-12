import { EXAM_BLUEPRINTS } from '../../lib/examBlueprints.js'

export function ExamPicker({ onSelect }) {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Practice exam
        </p>
        <h2 className="font-serif text-3xl font-medium">
          Choose a simulated 100-question licensing exam.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {EXAM_BLUEPRINTS.map((blueprint) => (
          <article className="flex flex-col border border-line bg-ink-900 p-6" key={blueprint.key}>
            <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
              {blueprint.label}
            </p>
            <h3 className="mb-2 font-serif text-xl font-medium">
              {blueprint.totalQuestions}-question simulated exam
            </h3>
            <p className="mb-4 flex-1 text-muted">
              {blueprint.timeLimitMinutes} minute target - {blueprint.passingScore}% to pass,
              weighted to match the official Wisconsin content outline.
            </p>
            <div>
              <button
                className="inline-flex min-w-[180px] items-center justify-center rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
                onClick={() => onSelect(blueprint)}
                type="button"
              >
                Start {blueprint.label} exam
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
