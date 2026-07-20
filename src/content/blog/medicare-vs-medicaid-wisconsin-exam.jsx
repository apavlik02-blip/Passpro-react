import { Link } from 'react-router-dom'

function CompareTable({ title, rows }) {
  return (
    <div className="my-6 border border-line bg-ink-900">
      <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-line">
        <p className="px-4 py-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          {title}
        </p>
        <p className="px-4 py-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Medicare
        </p>
        <p className="px-4 py-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Medicaid
        </p>
      </div>
      {rows.map((row) => (
        <div
          className="grid grid-cols-[1fr_1fr_1fr] border-b border-line last:border-b-0"
          key={row.label}
        >
          <p className="px-4 py-3 text-[13.5px] text-muted">{row.label}</p>
          <p className="px-4 py-3 text-[13.5px] text-paper">{row.medicare}</p>
          <p className="px-4 py-3 text-[13.5px] text-paper">{row.medicaid}</p>
        </div>
      ))}
    </div>
  )
}

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
        Medicare and Medicaid sound alike, launched together, and both pay medical bills — which
        is exactly why the Wisconsin Accident &amp; Health exam's Medicare section (8% of the
        test) explicitly includes the Medicaid contrast. The exam isn't testing whether you've
        heard of them. It's testing whether you can keep four specific distinctions straight
        under time pressure.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        The core distinction in one sentence
      </h2>
      <p className="mb-5 text-paper">
        <strong className="text-gold-400">Medicare is an entitlement you age (or qualify)
        into; Medicaid is assistance you need your way into.</strong> Everything else — funding,
        administration, coverage differences — flows from that.
      </p>

      <CompareTable
        title="Dimension"
        rows={[
          {
            label: 'Who runs it',
            medicare: 'Federal program, uniform nationwide',
            medicaid: 'Joint federal–state; each state administers its own program',
          },
          {
            label: 'How you qualify',
            medicare: 'Age 65+, certain disabilities, end-stage renal disease',
            medicaid: 'Financial need — income and asset tests',
          },
          {
            label: 'How it is funded',
            medicare: 'Payroll taxes, premiums, federal revenues',
            medicaid: 'Federal and state tax revenues together',
          },
          {
            label: 'Long-term custodial care',
            medicare: 'Not covered (limited skilled care only)',
            medicaid: 'Covered for those who qualify',
          },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Confusion pair #1 — funding and administration
      </h2>
      <p className="mb-5 text-paper">
        Medicare is a <strong className="text-gold-400">federal</strong> program: eligibility
        and core benefits are the same in Wisconsin as in every other state, and Part A is
        financed primarily through the payroll taxes workers pay during their careers. Medicaid
        is a <strong className="text-gold-400">joint federal–state</strong> program: the federal
        government sets baseline rules and shares the cost, but each state administers its own
        program and sets many of its own eligibility details. When an exam question says
        "administered by the state," it's pointing at Medicaid. "Uniform federal program" points
        at Medicare.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Confusion pair #2 — eligibility
      </h2>
      <p className="mb-5 text-paper">
        Medicare eligibility is about <strong className="text-gold-400">status</strong>: reaching
        age 65, receiving Social Security disability benefits for the required period, or having
        end-stage renal disease. Income is irrelevant — a millionaire qualifies at 65. Medicaid
        eligibility is about <strong className="text-gold-400">need</strong>: income and asset
        tests determine who qualifies, which is why it serves low-income individuals and
        families of any age. The classic distractor gives you a wealthy 70-year-old and asks
        which program covers them: Medicare, regardless of wealth.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Confusion pair #3 — the four parts of Medicare
      </h2>
      <p className="mb-5 text-paper">
        Medicaid has no "parts" — the A/B/C/D structure belongs to Medicare alone, and the exam
        expects you to match each letter to its coverage:
      </p>

      <FactTable
        title="Medicare's four parts"
        rows={[
          { label: 'Part A — Hospital insurance (inpatient)', value: 'Premium-free for most' },
          { label: 'Part B — Medical insurance (outpatient, physician)', value: 'Premium-based' },
          { label: 'Part C — Medicare Advantage (private plans)', value: 'Bundles A + B' },
          { label: 'Part D — Prescription drug coverage', value: 'Private, optional' },
        ]}
      />

      <p className="mb-5 text-paper">
        The details that generate questions: Part A is premium-free for most people because they
        prepaid it through payroll taxes; Part B is voluntary and carries a premium; Part C
        (Medicare Advantage) is Medicare benefits delivered through private plans, usually
        including drug coverage; Part D is standalone prescription drug coverage through private
        insurers. Medicare <em>supplement</em> (Medigap) policies — heavily regulated in
        Wisconsin's outline — pair with Original Medicare (A and B) to fill cost-sharing gaps;
        they are private insurance, not a Medicare part, and not related to Medicaid despite
        the similar name.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Confusion pair #4 — long-term care and dual eligibles
      </h2>
      <p className="mb-5 text-paper">
        The highest-yield distinction on the exam: <strong className="text-gold-400">Medicare
        does not cover long-term custodial care</strong>. It covers limited skilled care in
        defined circumstances, but ongoing help with activities of daily living — the thing most
        people mean by "nursing home care" — is outside Medicare entirely. Medicaid <em>does</em>{' '}
        cover long-term custodial care for people who meet its need-based tests, which is why it
        ends up as the country's default long-term care payer, and why private long-term care
        insurance exists as the planning alternative in between.
      </p>
      <p className="mb-5 text-paper">
        Finally, the two programs aren't mutually exclusive.{' '}
        <strong className="text-gold-400">Dual eligibles</strong> qualify for both: Medicare as
        their primary coverage (by age or disability), with Medicaid helping with premiums,
        cost-sharing, and services Medicare doesn't cover. An exam question describing a
        low-income 68-year-old is describing a potential dual eligible — not a trick.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Mnemonic that survives exam pressure: Medicare = care for the elderly. Medicaid = aid
        for the needy.
      </blockquote>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Where this fits in the exam</h2>
      <p className="mb-5 text-paper">
        Medicare (with the Medicaid contrast) is section 8.0 of the A&amp;H outline — 8 of your
        100 scored questions, alongside Medicare supplement marketing rules and employer-plan
        coordination. See the full{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-accident-health-exam-content-outline">
          Accident &amp; Health exam breakdown
        </Link>{' '}
        for how it sits among the other sections, and the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-mandated-health-benefits">
          mandated benefits cheat sheet
        </Link>{' '}
        for the other big A&amp;H memorization block.
      </p>
      <p className="mb-5 text-paper">
        <Link className="text-gold-400 underline" to="/">
          PassPro
        </Link>{' '}
        gives Medicare and Medicaid each their own question domain — built from the official
        outline — so the four confusion pairs above stop being things you reread and start
        being questions you've already gotten right. Members can also work through the
        dedicated{' '}
        <Link className="text-gold-400 underline" to="/study/medicare-medicaid">
          Medicare &amp; Medicaid lesson
        </Link>{' '}
        in the study library.
      </p>
    </>
  )
}
