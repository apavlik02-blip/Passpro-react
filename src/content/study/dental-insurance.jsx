import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        Dental insurance is a small module on the exam — 4% — but it's a self-contained one:
        the vocabulary rarely overlaps with medical health plans, so it's worth learning on its
        own terms rather than trying to map it onto major medical concepts.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The seven categories of dental treatment</h2>
      <FactTable
        title="Dental treatment categories"
        rows={[
          { label: 'Diagnostic & preventive', value: 'Exams, cleanings, X-rays — routine upkeep' },
          { label: 'Restorative', value: 'Fillings, crowns — repairing damaged teeth' },
          { label: 'Oral surgery', value: 'Extractions and surgical procedures' },
          { label: 'Endodontics', value: 'Treatment inside the tooth — root canals' },
          { label: 'Periodontics', value: 'Gums and supporting structures' },
          { label: 'Prosthodontics', value: 'Replacing teeth — bridges, dentures' },
          { label: 'Orthodontics', value: 'Alignment — braces; usually its own lifetime max' },
        ]}
      />
      <p className="mb-5 text-paper">
        The exam expects you to place a procedure into its category: a root canal is
        endodontics, gum disease treatment is periodontics, dentures are prosthodontics.
        Orthodontics is the outlier — often excluded, or added as a rider with a separate
        lifetime maximum.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Benefit tiers within indemnity plans</h2>
      <FactTable
        title="How plans pay by service class"
        rows={[
          { label: 'Diagnostic/preventive services', value: 'Covered at or near 100%, often no deductible' },
          { label: 'Basic services', value: 'Fillings, extractions — moderate coinsurance' },
          { label: 'Major services', value: 'Crowns, bridges, dentures — highest cost-sharing' },
        ]}
      />
      <p className="mb-5 text-paper">
        Plans deliberately pay a higher percentage for preventive care than for major work — an
        incentive structure meant to encourage the checkups that catch problems while they're
        cheap. Indemnity dental plans preserve free{' '}
        <strong className="text-gold-400">choice of provider</strong>; managed-care variants
        trade provider choice for lower cost, and{' '}
        <strong className="text-gold-400">combination plans</strong> mix schedule-based payment
        for some services with UCR-based payment for others.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Scheduled vs. nonscheduled plans</h2>
      <FactTable
        title="Dental plan structures"
        rows={[
          { label: 'Scheduled (indemnity)', value: 'Fixed dollar amount per procedure, regardless of cost' },
          { label: 'Nonscheduled', value: "Percentage of the dentist's usual, customary & reasonable (UCR) charge" },
        ]}
      />
      <p className="mb-5 text-paper">
        A scheduled plan's fixed payments often lag actual charges, leaving the patient the
        difference; a nonscheduled (comprehensive) plan tracks real-world fees through UCR
        limits. Deductibles and coinsurance work like medical insurance — with preventive
        services frequently exempted from the deductible entirely.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Predetermination of benefits</h2>
      <p className="mb-5 text-paper">
        For larger, planned procedures, the dentist submits the treatment plan to the insurer{' '}
        <strong className="text-gold-400">before</strong> work begins — the insurer reviews it
        and tells the patient in advance what will be covered and what they'll owe. This
        protects the patient from surprise denials after expensive work is already done, and
        gives the insurer a cost-control checkpoint (it can propose the less expensive adequate
        alternative). It is a courtesy estimate, not a guarantee of payment or a separate
        claim.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Exclusions and limitations</h2>
      <FactTable
        title="Typical dental plan limits"
        rows={[
          { label: 'Annual maximum', value: 'Cap on total benefits per person per year' },
          { label: 'Waiting period', value: 'Delay (often for major/ortho work) before coverage' },
          { label: 'Missing tooth clause', value: 'No replacement of teeth lost before the policy began' },
          { label: 'Alternate benefit provision', value: 'Pays for the least expensive adequate treatment' },
          { label: 'Frequency limits', value: 'E.g., cleanings limited per year' },
          { label: 'Cosmetic exclusion', value: 'Purely cosmetic work is not covered' },
        ]}
      />
      <p className="mb-5 text-paper">
        The missing tooth clause is dental insurance's version of a preexisting-condition
        limitation, and the alternate benefit provision means the plan pays toward the standard
        filling even if the patient chooses the premium material — the patient pays the
        difference, the claim isn't denied.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Employer group dental</h2>
      <p className="mb-5 text-paper">
        Group dental can be a <strong className="text-gold-400">stand-alone</strong> plan with
        its own deductible, or <strong className="text-gold-400">integrated</strong> with the
        medical plan under a shared deductible. Because dental expenses are largely elective
        and postponable, group underwriters worry about{' '}
        <strong className="text-gold-400">adverse selection</strong> more than in medical
        coverage — people join, get the expensive work done, and drop out. The defenses:
        participation requirements, waiting periods for major services, reduced benefits for
        late entrants, and limits on reenrollment after dropping coverage.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        A scheduled plan pays a set dollar figure no matter what the dentist charges; a
        nonscheduled plan pays a percentage of a reasonable charge. That's the single fact most
        dental questions turn on.
      </blockquote>
    </>
  )
}
