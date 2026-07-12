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

function DomainGrid({ rows }) {
  return (
    <div className="my-6 grid grid-cols-1 gap-px border border-line bg-line">
      {rows.map((row) => (
        <div className="flex items-center justify-between bg-ink-900 px-4 py-2.5" key={row.label}>
          <span className="text-sm text-paper">{row.label}</span>
          <span className="font-mono text-sm font-bold text-gold-400 tabular-nums">
            {row.pct}
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
        If you're getting licensed to sell life or health insurance in Wisconsin, you have one
        exam standing between you and your first commission check. Here's exactly what's on it,
        how it's weighted, and the details that trip up otherwise well-prepared candidates.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Exam format</h2>
      <p className="mb-5 text-paper">
        Both the Life and Accident &amp; Health exams follow the same structure:
      </p>

      <FactTable
        title="At a glance"
        rows={[
          { label: 'Questions', value: '100, multiple choice' },
          { label: 'Time limit', value: '120 minutes' },
          { label: 'Passing score', value: '70%' },
          { label: 'Administered by', value: 'PSI, for Wisconsin OCI' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        What's actually tested — the Life exam
      </h2>
      <p className="mb-5 text-paper">
        The content isn't evenly distributed. Based on the official content outline, here's
        roughly how the 100 questions break down:
      </p>

      <DomainGrid
        rows={[
          { label: 'Insurance regulation', pct: '20%' },
          { label: 'Wisconsin-specific regulation', pct: '15%' },
          { label: 'Policy provisions', pct: '14%' },
          { label: 'Life insurance types', pct: '12%' },
          { label: 'General insurance concepts', pct: '10%' },
          { label: 'Annuities', pct: '10%' },
          { label: 'Taxation', pct: '5%' },
          { label: 'Qualified plans', pct: '4%' },
        ]}
      />

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Regulation — general and Wisconsin-specific combined — is nearly 35% of the exam. Most
        candidates over-study products and under-study rules. That's backwards.
      </blockquote>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        The state-specific facts everyone gets wrong
      </h2>
      <p className="mb-5 text-paper">
        Wisconsin's numbers don't always match the "generic" insurance facts you'll find in
        national study guides:
      </p>

      <FactTable
        title="Wisconsin regulation quick reference"
        rows={[
          { label: 'Grace period', value: '31 days' },
          { label: 'Free look — individual life', value: '10 days' },
          { label: 'Free look — replacement policies', value: '20–30 days' },
          { label: 'Incontestability', value: '2 years' },
        ]}
      />

      <p className="mb-5 text-paper">
        The grace period is the single most commonly missed number on the exam — most generic
        study guides default to 30 days, but Wisconsin uses <strong className="text-gold-400">31</strong>.{' '}
        <strong className="text-gold-400">Twisting, churning, and rebating</strong> are all
        explicitly prohibited unfair trade practices under Wisconsin law — expect at least one
        question distinguishing between them (twisting = misrepresentation to induce replacement;
        churning = excessive replacement volume for commission).
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">How to actually prepare</h2>
      <p className="mb-5 text-paper">
        Generic, multi-state study guides get you most of the way there, but they're written to
        be true in all 50 states — which means they hedge on exactly the state-specific numbers
        the Wisconsin exam tests directly. The candidates who struggle aren't the ones who don't
        understand insurance; they're the ones who studied the wrong grace period.
      </p>
      <p className="mb-5 text-paper">
        That's the gap PassPro is built for: a Wisconsin-specific question bank, a practice exam
        weighted to match the real OCI content outline, and ARIA — an AI study coach that knows
        Wisconsin's actual rules and can quiz you specifically on the domains you're weakest in.
      </p>
    </>
  )
}
