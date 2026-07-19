import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        Almost every health insurance question on the exam assumes you're fluent in a handful of
        cost-sharing terms, the standard policy provisions, and the renewability spectrum. Get
        these exactly right and the harder plan-design questions get much easier.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Perils and types of losses</h2>
      <p className="mb-5 text-paper">
        Accident and health insurance covers two perils:{' '}
        <strong className="text-gold-400">accidental injury</strong> (unforeseen, unintended)
        and <strong className="text-gold-400">sickness</strong>. Policies pay only for care
        that is <strong className="text-gold-400">medically necessary</strong>, with emergency
        care judged by what a prudent layperson would consider an emergency. The four principal
        loss types map directly onto the product lineup: loss of income from disability
        (disability income insurance), medical expense, dental expense, and long-term care
        expense — each covered in its own module.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Classes of health policies</h2>
      <FactTable
        title="How health coverage is classified"
        rows={[
          { label: 'Individual vs. group', value: 'Own policy vs. certificate under a master contract' },
          { label: 'Private vs. government', value: 'Insurers vs. Medicare/Medicaid/Social Security' },
          { label: 'Self-funded vs. fully insured', value: 'Employer keeps risk vs. transfers it to insurer' },
          { label: 'Limited vs. comprehensive', value: 'Narrow named coverage vs. broad medical' },
          { label: 'Employer vs. association group', value: 'Worksite group vs. membership-organization group' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Limited policies</h2>
      <p className="mb-5 text-paper">
        Limited policies cover only the specific peril or expense named on the cover — and must
        conspicuously say so. The insured has to be told this is{' '}
        <strong className="text-gold-400">not comprehensive coverage</strong>. The exam's
        standard list: <strong className="text-gold-400">accident-only</strong>,{' '}
        <strong className="text-gold-400">specified (dread) disease</strong> (cancer policies),{' '}
        <strong className="text-gold-400">hospital indemnity</strong> (a flat dollar amount per
        day of hospitalization, paid regardless of actual expenses),{' '}
        <strong className="text-gold-400">credit disability</strong> (pays the loan payment
        while disabled — the creditor is beneficiary),{' '}
        <strong className="text-gold-400">blanket insurance</strong> (covers a changing group —
        a team, passengers — without naming individuals), plus prescription drug, vision,
        hearing, and dental coverages. Common exclusions across health policies: intentionally
        self-inflicted injury, war, illegal occupation, elective cosmetic surgery, and losses
        covered by workers compensation or government programs.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Cost-sharing mechanics</h2>
      <FactTable
        title="Cost-sharing terms"
        rows={[
          { label: 'Deductible', value: 'Paid out-of-pocket before the plan starts paying' },
          { label: 'Copay', value: 'Fixed dollar amount per visit or service' },
          { label: 'Coinsurance', value: 'Percentage split after the deductible (e.g. 80/20)' },
          { label: 'Out-of-pocket maximum', value: 'Cap after which the plan pays 100%' },
        ]}
      />
      <p className="mb-5 text-paper">
        A common exam trap: a copay is a flat dollar amount, coinsurance is a percentage.
        Another: the deductible, copays, and coinsurance all typically count toward the
        out-of-pocket maximum, but premiums do not.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The uniform policy provisions</h2>
      <p className="mb-5 text-paper">
        Health policies are built from standardized provisions. The ones the outline names,
        with what each does:
      </p>
      <FactTable
        title="Core contract provisions"
        rows={[
          { label: 'Insuring clause', value: "The insurer's basic promise — who, what perils, how much" },
          { label: 'Consideration clause', value: 'Premium + application statements for the promise' },
          { label: 'Entire contract; changes', value: 'Policy + application only; officers alone may modify' },
          { label: 'Grace period (s. 632.78)', value: 'Coverage continues while a premium is late' },
          { label: 'Reinstatement', value: 'Restores a lapsed policy; sickness may wait briefly' },
          { label: 'Incontestability', value: 'Misstatements can’t void coverage after the period ends' },
        ]}
      />
      <FactTable
        title="Claim provisions"
        rows={[
          { label: 'Notice of claim', value: 'Insured tells the insurer a loss occurred (s. 631.81)' },
          { label: 'Claim forms', value: 'Insurer must supply them promptly' },
          { label: 'Proof of loss', value: 'Late proof doesn’t bar the claim absent prejudice' },
          { label: 'Time of payment (s. 628.46)', value: 'Claims paid promptly; interest if overdue' },
          { label: 'Physical exam & autopsy', value: 'Insurer may examine at its own expense' },
          { label: 'Legal actions', value: 'Waiting period before suing; outer time limit' },
        ]}
      />
      <p className="mb-5 text-paper">
        A cluster of adjustment provisions rounds out the list.{' '}
        <strong className="text-gold-400">Change of occupation</strong> (s. 632.77): moving to a
        more hazardous job scales benefits down to what the premium would buy at the new risk;
        a safer job earns a premium reduction.{' '}
        <strong className="text-gold-400">Misstatement of age</strong> (s. 632.77): benefits
        adjust to what the premium would have purchased at the true age — the claim isn't
        denied. <strong className="text-gold-400">Unpaid premium</strong> lets the insurer
        deduct overdue premium from a claim payment;{' '}
        <strong className="text-gold-400">conformity with state statutes</strong> automatically
        amends any provision that conflicts with state law; and{' '}
        <strong className="text-gold-400">illegal occupation</strong> excludes losses sustained
        while committing a felony.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Probationary vs. elimination period</h2>
      <p className="mb-5 text-paper">
        Two waiting periods the exam contrasts constantly: the{' '}
        <strong className="text-gold-400">probationary period</strong> runs once, at the start
        of the policy, before sickness coverage begins (it screens out preexisting illness);
        the <strong className="text-gold-400">elimination period</strong> runs at{' '}
        <em>every disability claim</em>, between onset and the first benefit payment. One is
        per-policy, the other per-claim.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The renewability spectrum</h2>
      <FactTable
        title="From most to least favorable to the insured"
        rows={[
          { label: 'Noncancelable', value: 'Insurer can’t cancel, change terms, or raise the premium' },
          { label: 'Guaranteed renewable', value: 'Must renew; premiums can rise by class (s. 632.7495)' },
          { label: 'Conditionally renewable', value: 'Nonrenewal only for stated conditions' },
          { label: 'Optionally renewable', value: 'Insurer chooses at each renewal date' },
          { label: 'Cancelable / nonrenewable', value: 'Weakest — term coverage the insurer can drop' },
        ]}
      />
      <p className="mb-5 text-paper">
        The two at the top get confused: both noncancelable and guaranteed renewable policies{' '}
        <strong className="text-gold-400">must</strong> be renewed — the difference is that only
        noncancelable also locks the premium. That's why noncancelable is the gold standard in
        disability income contracts.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Coordination of benefits (COB)</h2>
      <p className="mb-5 text-paper">
        When a person is covered by more than one health plan (commonly a spouse's employer
        plan and their own), coordination of benefits (s. Ins 3.40) prevents paying more than
        100% of the actual expense. One plan is{' '}
        <strong className="text-gold-400">primary</strong> and pays first; the other is{' '}
        <strong className="text-gold-400">secondary</strong> and pays only what the primary
        didn't, up to the allowed charge. For dependent children covered under both parents'
        plans, the standard tiebreaker is the{' '}
        <strong className="text-gold-400">birthday rule</strong>: whichever parent's birthday
        (month and day, not year) falls earlier in the calendar year is primary.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Underwriting and replacement</h2>
      <p className="mb-5 text-paper">
        Individual health underwriting draws on the application, the producer's report,
        attending physician statements, investigative consumer reports (FCRA rules apply), the
        MIB, and medical exams — HIV testing only with informed consent. The{' '}
        <strong className="text-gold-400">Genetic Information Nondiscrimination Act
        (GINA)</strong> bars using genetic information as a basis for health underwriting.
        Risks classify as preferred, standard, or substandard. When{' '}
        <strong className="text-gold-400">replacing</strong> a health policy, the producer must
        weigh what the client gives up — fresh preexisting-condition limitations and
        probationary periods restart under the new policy, and benefits or exclusions may
        differ — and errors here are classic grounds for an E&amp;O claim. Under the ACA, major
        medical plans can no longer exclude or deny based on preexisting conditions, but the
        replacement-analysis habit still applies to other health products.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Deductible first, then coinsurance splits the remainder, then the out-of-pocket max caps
        the total — that order is the skeleton of almost every plan-design question.
      </blockquote>
    </>
  )
}
