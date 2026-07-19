import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        This module covers two of the highest-yield areas of the A&amp;H exam: Wisconsin's own
        health insurance statutes — including the s. 632.895 mandated benefits list, which the
        state tests in detail — and the mechanics of group health insurance.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Wisconsin A&amp;H policy provisions</h2>
      <p className="mb-5 text-paper">
        Wisconsin layers its own consumer protections on top of the standard health policy
        provisions. These are the state-specific rules the exam draws from outline section 1.4:
      </p>
      <FactTable
        title="Wisconsin A&H protections"
        rows={[
          { label: 'Right to return (s. 632.73)', value: 'Free look — full refund if returned in time' },
          { label: 'Right to contest', value: 'Limited after 2 years, absent fraud' },
          { label: 'Preexisting conditions (s. 632.746)', value: 'Exclusions limited by statute' },
          { label: 'Grace period (s. 632.78)', value: 'Coverage continues while premium is late' },
          { label: 'Continuation (s. 632.897)', value: 'Keep group coverage after eligibility ends' },
          { label: 'Independent review (s. 632.835)', value: 'External appeal of adverse determinations' },
          { label: 'Step therapy (s. 632.866)', value: 'Fail-first drug protocols must allow exceptions' },
        ]}
      />
      <p className="mb-5 text-paper">
        A few of these deserve unpacking. The <strong className="text-gold-400">right to
        return</strong> lets a new policyholder cancel within the statutory window for a full
        premium refund, no questions asked. The insurer's{' '}
        <strong className="text-gold-400">right to contest</strong> a policy based on
        application misstatements follows the same two-year structure as life insurance — after
        the contestability window closes, only fraud keeps the door open. And the{' '}
        <strong className="text-gold-400">preexisting condition</strong> rules limit how far
        back an insurer can look and how long it can exclude a condition that existed before the
        effective date — with the ACA eliminating preexisting condition exclusions entirely for
        major medical coverage.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Grievances and independent review</h2>
      <p className="mb-5 text-paper">
        When a Wisconsin insurer denies a claim or an authorization, the insured has a layered
        appeal path. First, the insurer's own{' '}
        <strong className="text-gold-400">internal grievance procedure</strong> — every health
        insurer must maintain one, acknowledge grievances, and resolve them within regulatory
        timeframes, with an expedited track when a delay threatens the patient's health. If the
        dispute involves medical necessity or an experimental-treatment determination, the
        insured can then escalate to an{' '}
        <strong className="text-gold-400">independent review organization (IRO)</strong> under
        s. 632.835 — an outside clinical reviewer whose decision binds the insurer. The exam's
        angle: internal grievance first, independent external review second, and the insurer
        must tell insureds these rights exist.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The s. 632.895 mandated benefits list</h2>
      <p className="mb-5 text-paper">
        Wisconsin requires health policies (generally fully-insured plans issued in the state —
        self-funded employer plans are typically exempt under federal ERISA preemption) to cover
        a specific list of benefits. This list is heavily tested; you don't need dollar amounts,
        you need to recognize <strong className="text-gold-400">what is mandated and roughly
        why</strong>. Grouped for memorization:
      </p>
      <FactTable
        title="Mandates — children and family"
        rows={[
          { label: 'Newborn children', value: 's. 632.895(5) — covered from the moment of birth' },
          { label: 'Grandchildren', value: 's. 632.895(5m)' },
          { label: 'Adopted children', value: 's. 632.896 — treated like newborns from placement' },
          { label: 'Handicapped children', value: 's. 632.88 — coverage continues past the age limit' },
          { label: 'Maternity for dependent children', value: 's. 632.895(7)' },
          { label: 'Child immunizations', value: 's. 632.895(14)' },
          { label: 'Hearing aids & cochlear implants (children)', value: 's. 632.895(16)' },
          { label: 'Student on medical leave', value: 's. 632.895(15) — coverage continues' },
        ]}
      />
      <FactTable
        title="Mandates — screening and disease"
        rows={[
          { label: 'Mammograms', value: 's. 632.895(8)' },
          { label: 'Colorectal cancer screening', value: 's. 632.895(16m)' },
          { label: 'Lead poisoning screening', value: 's. 632.895(10)' },
          { label: 'Diabetes equipment & supplies', value: 's. 632.895(6)' },
          { label: 'Kidney disease treatment', value: 's. 632.895(4)' },
          { label: 'TMJ disorders', value: 's. 632.895(11)' },
          { label: 'Autism spectrum disorders', value: 's. 632.895(12m)' },
          { label: 'Breast reconstruction after mastectomy', value: 's. 632.895(13)' },
          { label: 'HIV-related requirements', value: 's. 632.895(9), s. 631.90' },
        ]}
      />
      <FactTable
        title="Mandates — services and providers"
        rows={[
          { label: 'Home care', value: 's. 632.895(2)' },
          { label: 'Skilled nursing facility care', value: 's. 632.895(3)' },
          { label: 'Alcohol, drug, mental & nervous disorders', value: 's. 632.89' },
          { label: 'Chiropractic services', value: 's. 632.87(3)' },
          { label: 'Nurse practitioners', value: 's. 632.87(5)' },
          { label: 'Optometrists', value: 's. 632.87(2)' },
          { label: 'Emergency medical services', value: 's. 632.85' },
          { label: 'Cancer clinical trials', value: 'Routine care costs in qualifying trials' },
          { label: 'Oral & injected chemotherapy parity', value: 's. 632.867' },
          { label: 'Contraceptives and services', value: 's. 632.895(17)' },
          { label: 'Anesthesia/hospital charges for dental care', value: 's. 632.895(12)' },
          { label: 'Prescription eye drop refills', value: 's. 632.895(16t)' },
        ]}
      />
      <p className="mb-5 text-paper">
        Recurring exam patterns: newborns are covered{' '}
        <strong className="text-gold-400">from the moment of birth</strong> (notification may be
        required to continue coverage, but birth itself triggers it); adopted children get
        newborn-equivalent treatment from placement; handicapped children keep coverage past the
        normal dependent age limit if they remain dependent and incapable of self-support; and
        oral chemotherapy must be treated comparably to injected chemotherapy rather than being
        shunted to a worse drug tier.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        You will not be asked for a mandate's dollar limit. You will be asked whether Wisconsin
        mandates the benefit at all — so learn the list, not the amounts.
      </blockquote>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Group health insurance: how the machine works</h2>
      <p className="mb-5 text-paper">
        Group health plans cover eligible employees (and often dependents) under a single{' '}
        <strong className="text-gold-400">master contract</strong> held by the employer;
        individual employees receive a <strong className="text-gold-400">certificate of
        coverage</strong> rather than their own policy. Because risk is spread across a group,
        underwriting evaluates the group as a whole, not each member.
      </p>
      <FactTable
        title="Group insurance vocabulary"
        rows={[
          { label: 'Master contract', value: 'Held by the sponsor (employer, trust, association)' },
          { label: 'Certificate of coverage', value: 'Evidence of coverage given to each member' },
          { label: 'Experience rating', value: 'Premium based on this group’s own claims history' },
          { label: 'Community rating', value: 'Premium based on the whole covered community' },
          { label: 'Contributory plan', value: 'Employees pay part; requires high participation' },
          { label: 'Noncontributory plan', value: 'Employer pays all; typically 100% participation' },
        ]}
      />
      <p className="mb-5 text-paper">
        Participation requirements exist to fight adverse selection: if joining were optional
        and free of participation minimums, mostly sick employees would enroll. That same logic
        explains probationary periods for new hires and annual open enrollment windows rather
        than enroll-anytime rules.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Eligible groups</h2>
      <p className="mb-5 text-paper">
        Group insurance may only be sold to groups that exist for a purpose{' '}
        <strong className="text-gold-400">other than buying insurance</strong>. The exam's
        standard list: individual employer groups; multiple-employer trusts (METs) and
        multiple-employer welfare arrangements (MEWAs), which pool small employers;
        associations (alumni, professional); and customer groups such as creditor-debtor groups,
        where a lender insures its borrowers. Underwriters evaluate the group's characteristics —
        size, industry, age mix, turnover (persistency), plan design, and the sponsor's
        administrative capability.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">COBRA vs. Wisconsin continuation (s. 632.897)</h2>
      <p className="mb-5 text-paper">
        When someone loses group coverage — through job loss, reduced hours, divorce, or a
        dependent aging off the plan — continuation rights let them keep the same group coverage
        temporarily, at their own expense.
      </p>
      <FactTable
        title="Continuation coverage"
        rows={[
          { label: 'COBRA (federal)', value: 'Employers with 20+ employees' },
          { label: 'COBRA duration', value: '18 months (job loss); up to 36 for other events' },
          { label: 'Wisconsin continuation (s. 632.897)', value: 'Reaches smaller groups COBRA doesn’t' },
          { label: 'Spouse rights (s. 632.897(4))', value: 'Continuation after divorce or death of employee' },
          { label: 'Cost to the individual', value: 'Full premium, plus a small admin fee under COBRA' },
        ]}
      />
      <p className="mb-5 text-paper">
        The exam's point is usually simple: COBRA doesn't cover every employer, and Wisconsin's
        own continuation law extends similar protection to employees of smaller groups — and
        specifically protects a <strong className="text-gold-400">divorced or surviving
        spouse's</strong> right to continue coverage. Continuation is a bridge, not permanent
        coverage; the person pays the full cost the employer used to subsidize.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Changing insurers: no-loss no-gain</h2>
      <p className="mb-5 text-paper">
        When an employer switches group carriers, employees shouldn't be punished for the paper
        transition. <strong className="text-gold-400">No-loss no-gain</strong> provisions carry
        ongoing claims over to the new carrier, and{' '}
        <strong className="text-gold-400">deductible carryover</strong> credits amounts already
        satisfied under the old plan toward the new plan's deductible. Coordination of benefits
        (s. Ins 3.40) handles the parallel problem of a person covered by two plans at once: one
        plan is primary, the other secondary, and combined payments can't exceed the actual
        expense.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Small employer plans (ch. 635)</h2>
      <p className="mb-5 text-paper">
        Wisconsin's small employer law (the definition lives in s. 635.02(7)) guarantees small
        groups access to coverage: insurers in the small-group market must accept qualifying
        small employers, renew their coverage, and rate them within statutory bands rather than
        pricing a single bad claim year out of the market. Participation requirements and open
        enrollment rules still apply — availability is guaranteed, adverse selection is still
        managed.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Federal laws that shape group plans</h2>
      <FactTable
        title="Federal overlay on employer plans"
        rows={[
          { label: 'ERISA', value: 'Fiduciary duties, reporting & disclosure for employee benefit plans' },
          { label: 'ADEA', value: 'Older workers keep benefits; limited cost-based reductions allowed' },
          { label: 'Pregnancy Discrimination Act', value: 'Pregnancy treated like any other condition' },
          { label: 'Medicare secondary rules', value: 'Active-employee group plans pay before Medicare' },
          { label: 'Nondiscrimination rules', value: 'Plans can’t favor highly compensated employees' },
        ]}
      />
      <p className="mb-5 text-paper">
        Funding is the last distinction: a{' '}
        <strong className="text-gold-400">conventional fully-insured plan</strong> transfers
        risk to an insurer for a premium, while a{' '}
        <strong className="text-gold-400">self-funded plan</strong> keeps the risk on the
        employer, which pays claims from its own assets (often with stop-loss insurance and an
        administrator handling paperwork). Self-funding suits large, financially stable
        employers with predictable claims — and, because of ERISA preemption, self-funded plans
        largely escape state benefit mandates like s. 632.895.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        If a scenario involves a small employer and COBRA doesn't apply, Wisconsin continuation
        is almost always the intended answer.
      </blockquote>
    </>
  )
}
