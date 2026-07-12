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
        Twisting, churning, and rebating are three separate unfair trade practices prohibited
        under Wisconsin insurance law, and the exam loves testing whether you can tell them
        apart — they all involve a producer's conduct around a sale, but each targets a different
        kind of misbehavior.
      </p>

      <FactTable
        title="The three, side by side"
        rows={[
          { label: 'Twisting', value: 'Misrepresentation to induce replacement' },
          { label: 'Churning', value: 'Excessive replacement for commission' },
          { label: 'Rebating', value: 'Giving an unlicensed inducement to buy' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Twisting</h2>
      <p className="mb-5 text-paper">
        Twisting is using misrepresentation — false or misleading statements about either the
        existing policy or the new one — to convince a policyholder to replace a policy they
        already own. The defining feature is the <strong className="text-gold-400">lie</strong>,
        not the replacement itself. Replacing a policy is legal and sometimes genuinely in the
        client's interest; twisting is doing it by deceiving them about the facts.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Churning</h2>
      <p className="mb-5 text-paper">
        Churning is inducing a policyholder — often the same one, repeatedly — to replace
        policies primarily to generate new commissions for the producer, regardless of whether
        the replacement benefits the client. Where twisting is about a false statement, churning
        is about <strong className="text-gold-400">volume and motive</strong>: a pattern of
        replacements that only make sense as a commission strategy.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Rebating</h2>
      <p className="mb-5 text-paper">
        Rebating is offering a client something of value — cash, gifts, unusually favorable terms
        — as an inducement to buy, beyond what's specified in the policy itself. Unlike twisting
        and churning, rebating doesn't require a replacement at all; it can happen on a first-time
        sale. It's prohibited because it turns insurance sales into a bidding war on side
        incentives rather than the merits of the coverage.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        A fast way to keep these straight: twisting = lying, churning = repeating, rebating =
        bribing.
      </blockquote>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Why Wisconsin ties replacement rules to these</h2>
      <p className="mb-5 text-paper">
        Twisting and churning are both specifically about replacement business, which is exactly
        why Wisconsin gives replacement policies a longer{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-free-look-period">
          free look period
        </Link>{' '}
        (20–30 days instead of the standard 10) — it's a direct regulatory countermeasure giving
        policyholders more time to catch a bad replacement before it's irreversible.
      </p>

      <p className="mb-5 text-paper">
        See the full{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-life-health-exam-study-guide">
          Wisconsin Life &amp; Health Insurance Exam study guide
        </Link>{' '}
        for how unfair trade practices fit into the exam's broader content outline. PassPro's
        practice questions and ARIA are both built on Wisconsin's actual regulatory language, not
        generic multi-state summaries.
      </p>
    </>
  )
}
