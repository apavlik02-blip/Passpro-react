import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        Medicare and Medicaid get confused constantly because both are government health
        programs — but they're built on opposite eligibility logic. Medicare is based on{' '}
        <strong className="text-gold-400">age or disability status</strong>; Medicaid is based
        on <strong className="text-gold-400">financial need</strong>. Medicare is 8% of the
        A&amp;H exam, and it rewards precise part-by-part knowledge.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Medicare Parts A through D</h2>
      <FactTable
        title="What each Medicare part covers"
        rows={[
          { label: 'Part A', value: 'Hospital insurance — inpatient, skilled nursing, hospice' },
          { label: 'Part B', value: 'Medical insurance — doctors, outpatient, preventive' },
          { label: 'Part C', value: 'Medicare Advantage — private plans bundling A, B, usually D' },
          { label: 'Part D', value: 'Prescription drugs, through private insurers' },
        ]}
      />
      <p className="mb-5 text-paper">
        Eligibility runs through Social Security: age 65, or earlier for people who have
        received Social Security disability benefits for the required period, and for
        end-stage renal disease (ESRD) or ALS.{' '}
        <strong className="text-gold-400">Part A</strong> is premium-free for those who paid
        Medicare payroll taxes long enough (financing is the payroll tax); it covers inpatient
        hospital care measured in <strong className="text-gold-400">benefit periods</strong>{' '}
        with a deductible per period, skilled nursing facility care only after a qualifying
        inpatient hospital stay, home health, and hospice. It does{' '}
        <strong className="text-gold-400">not</strong> cover long-term custodial care.
      </p>
      <p className="mb-5 text-paper">
        <strong className="text-gold-400">Part B</strong> is voluntary and premium-based
        (higher-income beneficiaries pay more). After an annual deductible, Part B generally
        pays 80% of the <strong className="text-gold-400">approved amount</strong> and the
        beneficiary owes 20% — the claims vocabulary (assignment, approved charges, excess
        charges) is exam material. Exclusions include most dental, hearing aids, eyeglasses,
        and custodial care. Enrollment happens in defined windows: an initial enrollment
        period around turning 65, an annual general enrollment period, and special enrollment
        for people who stayed on employer coverage — late enrollment without an exception means
        a permanent premium penalty.
      </p>
      <p className="mb-5 text-paper">
        <strong className="text-gold-400">Part C (Medicare Advantage)</strong> replaces
        Original Medicare's payment mechanics with a private plan (often HMO/PPO style, often
        with drug coverage bundled) — a beneficiary is in Original Medicare or an Advantage
        plan, not both, and Medigap doesn't pair with Advantage.{' '}
        <strong className="text-gold-400">Part D</strong> adds outpatient prescription drug
        coverage through private plans, with its own late-enrollment penalty for going without
        creditable drug coverage.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Medicare supplement (Medigap)</h2>
      <p className="mb-5 text-paper">
        Original Medicare leaves gaps — deductibles, coinsurance, copays — and Medicare
        supplement policies sold by private insurers fill exactly those gaps. Coverage is{' '}
        <strong className="text-gold-400">standardized</strong> so buyers can compare on price:
        most states use lettered plans, while Wisconsin regulates Medigap under its own rule
        (s. Ins 3.39) structured as a required set of{' '}
        <strong className="text-gold-400">core (basic) benefits</strong> that every policy must
        contain, plus optional <strong className="text-gold-400">additional benefits</strong>{' '}
        sold as riders. Either way, the exam point is the same: benefits are standardized by
        regulation; insurers compete on price and service, not benefit design.
      </p>
      <FactTable
        title="Medigap consumer protections"
        rows={[
          { label: 'Open enrollment', value: '6 months from Part B enrollment at 65+ — guaranteed issue' },
          { label: 'Free look', value: 'Right to return the policy for a full refund' },
          { label: 'Replacement', value: 'Notice required; no gain to the producer from churning' },
          { label: 'Suitability', value: 'No duplicate or excessive coverage may be sold' },
          { label: 'Required guide', value: '"Guide to Health Insurance for People with Medicare"' },
        ]}
      />
      <p className="mb-5 text-paper">
        During the open enrollment window the insurer must issue regardless of health status;
        outside it, underwriting can apply. Marketing rules are strict: producers must assess
        appropriateness, may not sell coverage that duplicates Medicare or an existing Medigap
        policy, and must deliver the required disclosure documents and outline of coverage.
        Under <strong className="text-gold-400">MACRA</strong>, plans that cover the Part B
        deductible can no longer be sold to people who became Medicare-eligible on or after
        January 1, 2020.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Medicare and employer group plans</h2>
      <p className="mb-5 text-paper">
        For an <strong className="text-gold-400">active employee</strong> (or covered spouse)
        with employer group coverage, the group plan generally pays{' '}
        <strong className="text-gold-400">primary</strong> and Medicare pays secondary — the
        Medicare secondary payer rules. The same ordering questions appear for disabled
        employees on large group plans and for ESRD patients, whose group plan stays primary
        for a coordination period before Medicare takes over. Employers can also wrap Medicare
        with carve-out or supplement arrangements for retirees. The takeaway pattern: active
        employment keeps the group plan primary; retirement flips Medicare to primary.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Medicaid</h2>
      <p className="mb-5 text-paper">
        Medicaid is a joint federal-state program providing health coverage to eligible
        low-income individuals and families — each state runs its own program within federal
        guidelines, which is why Medicaid benefits and eligibility thresholds vary by state
        while Medicare is uniform nationwide. Eligibility is{' '}
        <strong className="text-gold-400">means-tested</strong> (income and asset limits);
        benefits include hospital and physician care and, critically,{' '}
        <strong className="text-gold-400">long-term nursing home care</strong> for those who
        qualify financially — the payer of last resort for custodial care that Medicare
        excludes. That's why Medicaid appears in LTC planning questions: people "spend down"
        assets to qualify, and LTC partnership policies (covered in the LTC module) exist
        precisely to let people protect assets from that spend-down.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Medicare: age or disability, federal, uniform nationwide. Medicaid: financial need,
        federal-state partnership, varies by state — and only Medicaid pays for long-term
        custodial care.
      </blockquote>
    </>
  )
}
