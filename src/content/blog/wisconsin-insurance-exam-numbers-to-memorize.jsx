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
        Most of the Wisconsin insurance exam tests understanding. A stubborn handful of
        questions test pure recall of specific numbers — and they're the cheapest points on the
        test, because each one is a single fact you either know or don't. Here are the seven
        numbers to have cold before exam day, and the reasoning behind each one so it sticks.
      </p>

      <FactTable
        title="The seven, in one place"
        rows={[
          { label: '1. Grace period (life)', value: '31 days' },
          { label: '2. Free look — new individual policy', value: '10 days' },
          { label: '3. Free look — replacement policy', value: '20–30 days' },
          { label: '4. Incontestability period', value: '2 years' },
          { label: '5. Prelicensing education', value: '20 hrs / 1 yr' },
          { label: '6. Passing score', value: '70%' },
          { label: '7. Exam time limit', value: '2 hours' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">1. The 31-day grace period</h2>
      <p className="mb-5 text-paper">
        After a missed premium, a Wisconsin life policy stays in force for{' '}
        <strong className="text-gold-400">31 days</strong>. Die during the grace period and the
        death benefit pays, minus the overdue premium. <em>The why:</em> the grace period exists
        so a single missed bill doesn't destroy decades of coverage. <em>The trap:</em> most
        national study guides say 30 days, because that's the more common figure elsewhere.
        Wisconsin says 31 — and the exam tests Wisconsin. Full breakdown:{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-life-insurance-grace-period">
          the Wisconsin grace period
        </Link>
        .
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">2. The 10-day free look</h2>
      <p className="mb-5 text-paper">
        A buyer of a new individual life policy has{' '}
        <strong className="text-gold-400">10 days</strong> from delivery to return it for a full
        refund, no questions asked. <em>The why:</em> insurance is sold on a presentation but
        lived in as a contract; the free look is the buyer's chance to read what they actually
        bought after the salesperson leaves.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        3. The 20–30 day replacement free look
      </h2>
      <p className="mb-5 text-paper">
        When the new policy <em>replaces</em> an existing one, the free look stretches to{' '}
        <strong className="text-gold-400">20–30 days</strong>. <em>The why:</em> replacement is
        where the abusive sales practices live — twisting and churning are both
        replacement schemes — so Wisconsin gives replacement buyers double-to-triple the
        reconsideration window as a structural countermeasure. The exam loves this pair because
        it can test the distinction, not just the number:{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-free-look-period">
          10 days new, 20–30 replacing
        </Link>
        .
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        4. The 2-year incontestability period
      </h2>
      <p className="mb-5 text-paper">
        For <strong className="text-gold-400">2 years</strong> from issue, an insurer can
        contest a life policy over misstatements in the application; after that, the policy is
        generally incontestable. <em>The why:</em> it's a deliberate trade — insurers get a fair
        window to catch fraud, and honest policyholders' families get certainty that a
        decades-old paperwork error won't void a claim. Details and exam angles:{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-incontestability-period">
          the incontestability period explained
        </Link>
        .
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        5. 20 hours of prelicensing, valid for 1 year
      </h2>
      <p className="mb-5 text-paper">
        Wisconsin requires <strong className="text-gold-400">20 hours</strong> of approved
        prelicensing education per line, completed{' '}
        <strong className="text-gold-400">no more than one year</strong> before you test
        (s. Ins 26.04). <em>The why:</em> the one-year shelf life exists because stale education
        defeats the purpose — the state wants what you learned to still be in your head when you
        test. <em>The trap:</em> this number can cost you twice — once as an exam question about
        licensing requirements (remember, regulation is 35% of the exam), and once in real life
        if you procrastinate past the window and your certificate expires. The full pipeline is
        in the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-insurance-license-requirements">
          license requirements guide
        </Link>
        .
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">6. 70% to pass</h2>
      <p className="mb-5 text-paper">
        You need <strong className="text-gold-400">70 of 100</strong> scored questions.{' '}
        <em>The why it matters strategically:</em> 30 allowed misses means you don't need
        mastery of every corner of the outline — you need reliable coverage of the heavy
        sections. It also means one brutal question is worth exactly one point; never let it
        cost you three by shaking you.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">7. The 2-hour limit</h2>
      <p className="mb-5 text-paper">
        <strong className="text-gold-400">120 minutes</strong> for 100 scored questions plus
        5–10 unscored experimental ones. <em>The why it matters:</em> that's over a minute per
        question — generous for recall questions that take seconds. The number to internalize
        isn't really the limit; it's the pace. If you're on question 50 with more than an hour
        left, time is not your problem. How the session actually runs, check-in to results, is
        covered in{' '}
        <Link className="text-gold-400 underline" to="/blog/psi-exam-day-wisconsin-insurance">
          Exam Day at PSI
        </Link>
        .
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Chunk them in pairs: 31 and 10 (keep/return), 20–30 and 2 years (replacement and
        contest), 20 hours and 1 year (learn and use), 70% in 2 hours (the finish line).
      </blockquote>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Why numbers are the best points on the exam
      </h2>
      <p className="mb-5 text-paper">
        Concept questions have plausible distractors; number questions don't. Nobody
        half-remembers their way from 31 days to 30 — you either encoded the Wisconsin figure or
        you encoded a generic guide's figure. That makes these the highest-certainty points
        available, and it makes studying from Wisconsin-specific material a measurable edge
        rather than a marketing claim. For context on how much of the exam rides on
        state-specific regulation, see{' '}
        <Link className="text-gold-400 underline" to="/blog/how-hard-is-the-wisconsin-insurance-exam">
          How Hard Is the Wisconsin Insurance License Exam?
        </Link>
      </p>
      <p className="mb-5 text-paper">
        <Link className="text-gold-400 underline" to="/">
          PassPro's
        </Link>{' '}
        question bank is built domain-by-domain from the official outline with Wisconsin's
        actual figures — these seven among them — flagged and drilled until they're reflex, not
        recall.
      </p>
    </>
  )
}
