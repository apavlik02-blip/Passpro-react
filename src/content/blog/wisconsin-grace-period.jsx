import { Link } from 'react-router-dom'

function FactTable({ title, rows }) {
  return (
    <div className="my-6 border border-line bg-ink-900">
      <p className="border-b border-line px-5 py-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
        {title}
      </p>
      {rows.map((row) => (
        <div
          className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3.5 last:border-b-0"
          key={row.label}
        >
          <span className="max-w-[42ch] text-[14.5px] text-paper">{row.label}</span>
          <span className="font-mono text-[13px] font-bold whitespace-nowrap text-gold-400">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        The Wisconsin life insurance grace period is <strong className="text-gold-400">31 days</strong>.
        This is one of the most frequently missed numbers on the Wisconsin life and health
        insurance licensing exam — not because it's conceptually hard, but because most national
        study guides default to the more common 30-day figure and never flag the Wisconsin-specific
        exception.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">What the grace period actually is</h2>
      <p className="mb-5 text-paper">
        The grace period is the window after a missed premium due date during which a life
        insurance policy stays in force. If the policyholder dies during the grace period, the
        death benefit is still paid — the insurer simply deducts the unpaid premium from the
        payout. If the premium still hasn't been paid by the end of the grace period, the policy
        lapses.
      </p>

      <FactTable
        title="Wisconsin grace period"
        rows={[
          { label: 'Length', value: '31 days' },
          { label: 'Applies to', value: 'Life insurance policies' },
          { label: 'Coverage during grace period', value: 'Full death benefit remains in force' },
          { label: 'If premium unpaid at end of period', value: 'Policy lapses' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Why 31, not 30?</h2>
      <p className="mb-5 text-paper">
        Most states use a 30-day (or sometimes 31-day) grace period for life insurance, and the
        exact figure is set by each state's insurance code rather than a single national
        standard. Wisconsin's statute specifies <strong className="text-gold-400">31 days</strong>.
        Generic, multi-state exam prep material is written to be broadly true everywhere, so it
        often rounds to "about a month" or defaults to the more common 30-day figure — which is
        exactly the kind of small gap that costs candidates points on a state-specific exam.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        If a study guide doesn't specifically call out Wisconsin's number, assume it's giving you
        the generic figure — and generic isn't what's on this exam.
      </blockquote>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Related provisions worth knowing together</h2>
      <p className="mb-5 text-paper">
        The grace period rarely shows up alone on the exam — it's usually tested alongside the
        other timing-based policy provisions:
      </p>

      <FactTable
        title="Wisconsin policy provision timing"
        rows={[
          { label: 'Grace period', value: '31 days' },
          { label: 'Free look — individual life', value: '10 days' },
          { label: 'Free look — replacement policies', value: '20–30 days' },
          { label: 'Incontestability period', value: '2 years' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Studying this for the exam</h2>
      <p className="mb-5 text-paper">
        This is one fact out of dozens of Wisconsin-specific numbers and rules tested across the
        exam's content outline — see the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-free-look-period">
          Wisconsin free look period breakdown
        </Link>{' '}
        for the other half of this comparison, or the full{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-life-health-exam-study-guide">
          Wisconsin Life &amp; Health Insurance Exam study guide
        </Link>{' '}
        for how the exam is weighted overall. PassPro's practice questions and ARIA (the built-in
        AI study coach) are both built on Wisconsin's actual statutes, not generic multi-state
        defaults — so when you drill policy provisions, you're drilling the real numbers.
      </p>
    </>
  )
}
