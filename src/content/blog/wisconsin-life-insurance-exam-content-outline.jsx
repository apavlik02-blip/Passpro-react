import { Link } from 'react-router-dom'

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
        The Wisconsin Life insurance exam (PSI Series 22-01) is built from a published content
        outline that tells you, section by section, exactly how many of the 100 scored questions
        come from each topic. Most candidates never read it. This post walks the actual outline,
        weight by weight, with a study priority attached to each section.
      </p>

      <DomainGrid
        rows={[
          { label: '1.0 Insurance Regulation (incl. Wisconsin statutes)', pct: '35%' },
          { label: '5.0 Policy Provisions, Options and Riders', pct: '14%' },
          { label: '4.0 Life Insurance Policies', pct: '12%' },
          { label: '2.0 General Insurance', pct: '10%' },
          { label: '3.0 Life Insurance Basics', pct: '10%' },
          { label: '6.0 Annuities', pct: '10%' },
          { label: '7.0 Federal Tax Considerations', pct: '5%' },
          { label: '8.0 Qualified Plans', pct: '4%' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        1.0 Insurance Regulation — 35 questions
      </h2>
      <p className="mb-5 text-paper">
        The monster. More than a third of the exam, and the section most under-studied relative
        to its weight. It splits into four parts: licensing (who needs a license, how licenses
        are maintained, renewed, and revoked — ch. 628), state regulation (the Commissioner's
        duties and powers, hearings and penalties, the Wisconsin Insurance Security Fund under
        ch. 646, company and producer regulation, unfair marketing practices under s. 628.34),
        a short federal block (Fair Credit Reporting Act, federal fraud statutes), and — the
        part generic guides handle worst — <strong className="text-gold-400">Wisconsin statutes
        specific to life insurance and annuities</strong>: required policy provisions,
        contestability, beneficiary designation, replacement rules and disclosure, policy
        summaries and illustrations, annuity suitability, and life settlements/STOLI under
        s. 632.69.
      </p>
      <p className="mb-5 text-paper">
        Expect the unfair-practices trio —{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-twisting-churning-rebating">
          twisting, churning, and rebating
        </Link>{' '}
        — to show up, along with misrepresentation, unfair discrimination, and illegal
        inducement. <strong className="text-gold-400">Study priority: highest.</strong> Thirty-five
        questions is more than the entire margin of error at a 70% passing bar.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        5.0 Policy Provisions, Options and Riders — 14 questions
      </h2>
      <p className="mb-5 text-paper">
        The second-biggest section, and dense with testable specifics: standard provisions
        (ownership, entire contract, free look, grace period, reinstatement, incontestability,
        misstatement of age, suicide exclusion), beneficiary designations (primary vs.
        contingent, revocable vs. irrevocable, per-class designations, common disaster and
        spendthrift clauses), settlement options, nonforfeiture options (cash surrender,
        extended term, reduced paid-up), dividend options, and the rider families — disability
        riders, accelerated benefits, accidental death, guaranteed insurability.
      </p>
      <p className="mb-5 text-paper">
        This is where Wisconsin's timing rules live on the exam: the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-life-insurance-grace-period">
          31-day grace period
        </Link>
        , the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-free-look-period">
          10-day free look (20–30 for replacements)
        </Link>
        , and the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-incontestability-period">
          2-year incontestability period
        </Link>
        . <strong className="text-gold-400">Study priority: high</strong> — high weight and
        highly memorizable.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        4.0 Life Insurance Policies — 12 questions
      </h2>
      <p className="mb-5 text-paper">
        The product taxonomy: term (level, decreasing, increasing, annual renewable), whole life
        (straight, limited pay, single premium), flexible-premium designs (adjustable and
        universal life), specialized policies (joint life, juvenile), and group life —
        including conversion rights to an individual policy. Questions here are mostly
        "which policy fits this fact pattern," so drill the distinguishing feature of each
        design rather than re-reading definitions.{' '}
        <strong className="text-gold-400">Study priority: high.</strong>
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        2.0 General Insurance and 3.0 Life Basics — 10 questions each
      </h2>
      <p className="mb-5 text-paper">
        General Insurance covers risk concepts (risk, peril, hazard, adverse selection, law of
        large numbers), insurer types (stock, mutual, fraternal, domestic/foreign/alien,
        admitted/nonadmitted), agency law (express, implied, and apparent authority), and
        contract law (the elements of a valid contract; adhesion, aleatory, unilateral,
        conditional). Life Basics covers insurable interest, personal and business uses of life
        insurance (buy-sell, key person, split dollar), needs analysis vs. human life value,
        premium factors (mortality, interest, expense), field underwriting, and — a
        Wisconsin-flagged item — life settlements and stranger-originated life insurance under
        s. 632.69. <strong className="text-gold-400">Study priority: medium</strong> — the
        concepts are intuitive, so a focused pass plus practice questions usually holds.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        6.0 Annuities — 10 questions
      </h2>
      <p className="mb-5 text-paper">
        Accumulation vs. annuity periods, the owner/annuitant/beneficiary triangle, immediate
        vs. deferred annuities, payout options (pure life vs. life with guaranteed minimum,
        single vs. joint), and product types — fixed, indexed, market value adjusted, variable.
        Wisconsin also folds annuity <em>suitability</em> into the regulation section, so
        annuities effectively get tested from two directions.{' '}
        <strong className="text-gold-400">Study priority: medium-high.</strong>
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        7.0 Taxation and 8.0 Qualified Plans — 9 questions combined
      </h2>
      <p className="mb-5 text-paper">
        Small sections, predictable questions: tax treatment of cash value growth, dividends,
        policy loans, and death benefits; modified endowment contracts and the seven-pay test;
        the exclusion ratio for annuity payouts; Section 1035 exchanges; traditional vs. Roth
        IRAs; and the qualified plan zoo (SEP, Keogh, 401(k), SIMPLE, 403(b)).{' '}
        <strong className="text-gold-400">Study priority: targeted</strong> — memorize the
        handful of rules that generate nearly all the questions, and don't sink whole evenings
        here at the expense of regulation.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Read the weights like a budget: if regulation is 35% of the exam, it should be something
        like 35% of your study hours. Almost nobody allocates it that way — which is exactly why
        prepared-feeling candidates still fail.
      </blockquote>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">How to use this outline</h2>
      <p className="mb-5 text-paper">
        Start with regulation and policy provisions — nearly half the exam between them — then
        work outward by weight. If you're also sitting the A&amp;H exam, note that the entire
        35% regulation section and the 10% general insurance section overlap heavily between the
        two exams; see the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-accident-health-exam-content-outline">
          Accident &amp; Health exam breakdown
        </Link>{' '}
        for the other side. And before test day, make sure the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-insurance-exam-numbers-to-memorize">
          seven Wisconsin numbers
        </Link>{' '}
        are cold.
      </p>
      <p className="mb-5 text-paper">
        <Link className="text-gold-400 underline" to="/">
          PassPro's
        </Link>{' '}
        question bank is built domain-by-domain from this exact outline — lessons for every
        section, practice exams weighted to match the real 35/14/12/10/10/10/5/4 split, and
        ARIA to drill whichever domain your practice scores say is weakest. Members can start
        with the{' '}
        <Link className="text-gold-400 underline" to="/study/policy-provisions-riders">
          Policy Provisions &amp; Riders
        </Link>{' '}
        and{' '}
        <Link className="text-gold-400 underline" to="/study/wisconsin-regulation">
          Wisconsin Regulation
        </Link>{' '}
        lessons — the two highest-weight sections above.
      </p>
    </>
  )
}
