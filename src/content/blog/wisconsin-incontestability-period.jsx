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
        Wisconsin's incontestability period for life insurance is{' '}
        <strong className="text-gold-400">2 years</strong>. After a policy has been in force for
        two years from its issue date, the insurer generally can't contest it or deny a claim
        based on a misstatement in the original application — even if that misstatement would
        otherwise have justified denying coverage.
      </p>

      <FactTable
        title="Wisconsin incontestability period"
        rows={[
          { label: 'Length', value: '2 years' },
          { label: 'Starts from', value: "Policy's issue date" },
          { label: 'After it expires', value: 'Insurer generally cannot contest the policy' },
          { label: 'Common exception', value: 'Fraud, or non-payment of premium' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Why this clause exists</h2>
      <p className="mb-5 text-paper">
        Without an incontestability clause, an insurer could theoretically investigate an
        application for the first time only after a death claim is filed — years into the policy
        — and deny the claim over an old, possibly honest mistake on the application. The
        incontestability period puts a clock on that: the insurer has two years to verify the
        application and challenge anything inaccurate. After that window closes, the policy is
        settled, and the beneficiary can rely on it.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Incontestability protects the beneficiary, not the applicant who lied — it's a deadline on
        the insurer's ability to investigate, not a shield for fraud.
      </blockquote>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Wisconsin's policy provision timing, all in one place
      </h2>
      <p className="mb-5 text-paper">
        This is the last of four timing-based provisions that show up together constantly on the
        exam. Worth knowing all four side by side:
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

      <p className="mb-5 text-paper">
        See the full breakdowns of the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-life-insurance-grace-period">
          grace period
        </Link>{' '}
        and{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-free-look-period">
          free look period
        </Link>
        , or the full{' '}
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
