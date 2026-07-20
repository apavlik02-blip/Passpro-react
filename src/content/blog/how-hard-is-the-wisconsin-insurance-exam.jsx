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
        "How hard is it, really?" is the first question almost every Wisconsin licensing
        candidate asks. The honest answer: the exam is very passable for people who study the
        right material, and surprisingly failable for people who study the wrong material. This
        post breaks down what the exam actually demands — and where prepared candidates still
        lose points.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The raw mechanics</h2>
      <p className="mb-5 text-paper">
        Wisconsin's life and accident &amp; health licensing exams are administered by PSI on
        behalf of the Office of the Commissioner of Insurance (OCI). Both lines use the same
        structure:
      </p>

      <FactTable
        title="Exam format"
        rows={[
          { label: 'Scored questions', value: '100' },
          { label: 'Unscored experimental questions', value: '5–10' },
          { label: 'Time limit', value: '2 hours' },
          { label: 'Passing score', value: '70%' },
          { label: 'Exam vendor', value: 'PSI' },
          { label: 'Exam fee', value: '$75, non-refundable' },
        ]}
      />

      <p className="mb-5 text-paper">
        Two things in that table should immediately reframe "hard." First, 70% means you can
        miss 30 scored questions and still pass — this is not an exam that demands perfection.
        Second, 2 hours for roughly 105–110 questions works out to more than a minute per
        question. Time pressure is real but mild; almost nobody fails the Wisconsin exam because
        they ran out of clock. People fail because of <em>what</em> they studied.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        What about the pass rate?
      </h2>
      <p className="mb-5 text-paper">
        You'll see prep companies quote precise national pass-rate percentages. We're not going
        to do that, because Wisconsin doesn't publish an official, current pass-rate statistic
        we can verify — and unverifiable numbers are exactly the kind of thing a study resource
        shouldn't traffic in. What can be said with confidence, from the structure of the exam
        itself: it is a knowledge-recall exam over a published content outline, with no essay
        component, no math beyond basic arithmetic, and a passing bar that tolerates dozens of
        wrong answers. Candidates who cover the actual outline pass. Candidates who skim a
        generic national guide and wing the Wisconsin-specific material are the ones who retest.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        The single biggest difficulty driver: regulation is 35%
      </h2>
      <p className="mb-5 text-paper">
        Here's the trap. Most candidates spend their study hours on products — term versus whole
        life, annuity payout options, HMOs versus PPOs — because products feel like the point of
        the job. But on both Wisconsin exams, <strong className="text-gold-400">Insurance
        Regulation is 35% of the scored questions</strong>, the largest single section by a wide
        margin. That's licensing rules, the Commissioner's powers, unfair marketing practices,
        producer conduct, and a block of Wisconsin-specific statutes.
      </p>
      <p className="mb-5 text-paper">
        Thirty-five questions is more than the entire margin for error. A candidate who knows
        products cold but treats regulation as an afterthought can be underwater before the
        product questions even start. See the full section-by-section breakdowns for the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-life-insurance-exam-content-outline">
          Life exam
        </Link>{' '}
        and the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-accident-health-exam-content-outline">
          Accident &amp; Health exam
        </Link>
        .
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        The exam isn't hard because the concepts are hard. It's hard because the heaviest-weighted
        section is the one most people study least.
      </blockquote>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        The second trap: Wisconsin's numbers aren't the generic numbers
      </h2>
      <p className="mb-5 text-paper">
        National study guides are written to be roughly true in all 50 states, which means they
        hedge or default on exactly the figures Wisconsin tests directly. The grace period is{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-life-insurance-grace-period">
          31 days
        </Link>
        , not the 30 most guides assume. The free look is{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-free-look-period">
          10 days — but 20–30 days for replacement policies
        </Link>
        , a distinction generic material often skips entirely. There's a short list of these
        state-specific figures, and the exam returns to them again and again — we've collected
        them in{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-insurance-exam-numbers-to-memorize">
          the 7 numbers to memorize before exam day
        </Link>
        .
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        The experimental questions (don't let them rattle you)
      </h2>
      <p className="mb-5 text-paper">
        Your exam will include 5–10 unscored experimental questions that PSI is field-testing
        for future exams. They aren't marked, and they don't count for or against you. This
        matters psychologically: if you hit a question that seems to come from nowhere — oddly
        worded, on a topic you've never seen — there's a decent chance it's experimental. Answer
        it, forget it, move on. Candidates who spiral over one strange question burn confidence
        they need for the 100 that count.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        So how much study time does it take?
      </h2>
      <p className="mb-5 text-paper">
        Wisconsin requires 20 hours of approved prelicensing education per line before you can
        even sit the exam (completed within one year before testing), so the state has
        effectively set your minimum. Realistically, most candidates need meaningful practice
        time on top of coursework — not because the material is intellectually deep, but because
        the exam rewards recall of a large number of discrete facts, and recall is built through
        repetition. The full path from zero to licensed is laid out in the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-insurance-license-requirements">
          Wisconsin license requirements guide
        </Link>
        , and what the testing experience itself is like is covered in{' '}
        <Link className="text-gold-400 underline" to="/blog/psi-exam-day-wisconsin-insurance">
          Exam Day at PSI
        </Link>
        .
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The bottom line</h2>
      <p className="mb-5 text-paper">
        Hard? For a prepared candidate, no — a 70% bar with 30 allowed misses and ample time is
        a fair exam. Unforgiving of the wrong preparation? Absolutely. Weight your study time
        the way the exam weights its questions: regulation first, Wisconsin-specific rules
        second, products third.
      </p>
      <p className="mb-5 text-paper">
        That's exactly how{' '}
        <Link className="text-gold-400 underline" to="/">
          PassPro
        </Link>{' '}
        is built: the question bank is organized domain-by-domain from the official PSI content
        outline, the practice exam mirrors the real weighting — regulation-heavy, just like the
        actual test — and ARIA, the built-in AI study coach, drills you on the Wisconsin-specific
        rules generic guides gloss over.
      </p>
    </>
  )
}
