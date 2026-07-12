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
        Wisconsin's free look period for an individual life insurance policy is{' '}
        <strong className="text-gold-400">10 days</strong>. But if the policy is
        <strong className="text-gold-400"> replacing</strong> an existing one, that window
        extends to <strong className="text-gold-400">20–30 days</strong> — a detail generic
        study guides frequently collapse into a single number, and a favorite place for the
        Wisconsin exam to test whether you actually know the distinction.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">What the free look period is</h2>
      <p className="mb-5 text-paper">
        The free look period is a window after a policy is delivered during which the
        policyholder can cancel it for any reason and receive a full refund of premiums paid —
        no penalty, no explanation required. It exists so buyers aren't locked into a policy they
        agreed to under pressure or without fully reading the terms.
      </p>

      <FactTable
        title="Wisconsin free look period"
        rows={[
          { label: 'Individual life policy', value: '10 days' },
          { label: 'Replacement policy', value: '20–30 days' },
          { label: 'Refund if cancelled', value: 'Full premium returned' },
          { label: 'Reason required', value: 'None' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Why replacements get a longer window</h2>
      <p className="mb-5 text-paper">
        Replacement business — talking a policyholder into cancelling an existing policy in favor
        of a new one — is where Wisconsin's unfair trade practice rules concentrate the most
        scrutiny. A longer free look period on replacements gives the policyholder more time to
        compare the new policy against the one they're giving up, and it's a direct regulatory
        response to{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-twisting-churning-rebating">
          twisting
        </Link>{' '}
        (misrepresenting a policy to induce a replacement) as a recognized risk.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Free look length isn't arbitrary — it's longer exactly where Wisconsin regulators worry
        most about producers pushing unnecessary replacements.
      </blockquote>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Free look vs. grace period — don't mix these up</h2>
      <p className="mb-5 text-paper">
        These two get confused constantly because they're both "day count" provisions, but they
        cover opposite ends of a policy's life:
      </p>

      <FactTable
        title="Quick comparison"
        rows={[
          { label: 'Free look — when it applies', value: 'Right after purchase' },
          { label: 'Free look — what it does', value: 'Lets you cancel for a full refund' },
          { label: 'Grace period — when it applies', value: 'After a missed payment' },
          { label: 'Grace period — what it does', value: 'Keeps coverage active while you catch up' },
        ]}
      />

      <p className="mb-5 text-paper">
        See the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-life-insurance-grace-period">
          Wisconsin grace period breakdown
        </Link>{' '}
        for the other half of this comparison, or the full{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-life-health-exam-study-guide">
          Wisconsin Life &amp; Health Insurance Exam study guide
        </Link>{' '}
        for how policy provisions fit into the exam's overall content outline. PassPro's practice
        questions and ARIA are both built on Wisconsin's actual numbers, not generic multi-state
        defaults.
      </p>
    </>
  )
}
