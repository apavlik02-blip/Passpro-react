import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        HMO, PPO, POS, EPO — the letters blur together, but each one answers the same two
        questions differently: can you see any provider, and do you need a referral to see a
        specialist? This module covers the Medical Plans section of the outline — plan
        structures, cost containment, and the eligibility rules states attach to them.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Medical plan concepts</h2>
      <FactTable
        title="The vocabulary pairs the outline tests"
        rows={[
          { label: 'Fee-for-service vs. prepaid', value: 'Pay per service vs. fixed periodic fee (HMO model)' },
          { label: 'Specified vs. comprehensive', value: 'Named coverages vs. broad medical coverage' },
          { label: 'Benefit schedule vs. UCR', value: 'Fixed dollar list vs. usual/reasonable/customary charges' },
          { label: 'Any provider vs. limited choice', value: 'Indemnity freedom vs. network restriction' },
          { label: 'Insureds vs. subscribers', value: 'Insurance contract vs. service-plan participant' },
        ]}
      />
      <p className="mb-5 text-paper">
        Traditional <strong className="text-gold-400">major medical (indemnity)</strong> plans
        reimburse on a fee-for-service basis: the insured can use any provider, pays a
        deductible, then shares costs through coinsurance up to a{' '}
        <strong className="text-gold-400">stop-loss limit</strong> — the point where the plan
        takes over 100% so out-of-pocket exposure is capped. Common limitations and exclusions
        follow a familiar list: elective cosmetic surgery, care payable by workers
        compensation or government programs, and experimental treatment. Plan-design levers —
        deductible size, coinsurance split, stop-loss level — are the "provisions affecting
        cost to insured" the outline names.
      </p>

      <FactTable
        title="Managed care structures compared"
        rows={[
          { label: 'HMO', value: 'Network only; primary care gatekeeper and referrals' },
          { label: 'PPO', value: 'In- or out-of-network (out costs more); no referrals' },
          { label: 'POS', value: 'HMO-style referrals, out-of-network option at higher cost' },
          { label: 'EPO', value: 'Network only, but usually no referral requirement' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The HMO model</h2>
      <p className="mb-5 text-paper">
        In a traditional HMO, members prepay a fixed fee and receive care from the plan's
        network within its service area. Every member selects a{' '}
        <strong className="text-gold-400">primary care physician (PCP)</strong> who coordinates
        care and must issue a referral before the plan covers a specialist visit. Staying
        in-network isn't just cheaper — non-emergency care outside the network typically isn't
        covered at all, though <strong className="text-gold-400">emergency care is covered
        wherever it happens</strong>. HMOs emphasize preventive care (checkups, screenings,
        immunizations) on the theory that catching illness early costs less than treating it
        late — that tight control is what lets HMOs offer the lowest premiums of the managed
        care options.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">PPOs and POS plans</h2>
      <p className="mb-5 text-paper">
        A <strong className="text-gold-400">PPO</strong> negotiates discounted fee-for-service
        rates with a panel of preferred providers — the parties to the provider contract are
        the providers, the PPO sponsor (insurer or employer group), and the members. Members
        can go out-of-network and still receive a reduced benefit, and no referrals are
        required; the trade is a higher premium than an HMO. Panels may be{' '}
        <strong className="text-gold-400">open</strong> (providers can join if they accept the
        terms) or <strong className="text-gold-400">closed</strong>. A{' '}
        <strong className="text-gold-400">POS</strong> plan is the hybrid the exam describes as
        "part HMO, part PPO": gatekeeper and referrals in-network, with the option to go
        out-of-network at the point of service for significantly higher cost-sharing.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Cost containment tools</h2>
      <FactTable
        title="Utilization management"
        rows={[
          { label: 'Preauthorization', value: 'Approval before a service, or benefits are reduced' },
          { label: 'Gatekeeper', value: 'PCP controls access to specialists and services' },
          { label: 'Prospective review', value: 'Evaluating necessity before treatment' },
          { label: 'Concurrent review', value: 'Monitoring care while a hospital stay is underway' },
          { label: 'Outpatient incentives', value: 'Steering care to cheaper settings than hospitals' },
        ]}
      />
      <p className="mb-5 text-paper">
        Managed care's whole toolkit exists to control utilization without denying necessary
        care: preventive services, hospital outpatient benefits, alternatives to
        hospitalization (home health, skilled nursing, ambulatory surgery centers), and review
        programs. One federal floor the exam cites: minimum{' '}
        <strong className="text-gold-400">maternity stays</strong> — a plan cannot force
        discharge of mother and newborn earlier than the federally set minimums following
        delivery.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Who must be covered: state eligibility requirements</h2>
      <FactTable
        title="Dependent eligibility rules"
        rows={[
          { label: 'Newborns', value: 'Covered from the moment of birth (s. 632.895(5))' },
          { label: 'Adopted children', value: 'Covered from placement (s. 632.896)' },
          { label: 'Grandchildren', value: 'Coverage required (s. 632.895(5m))' },
          { label: 'Handicapped children', value: 'Coverage continues past age limit (s. 632.88)' },
          { label: 'Dependent age limit', value: 'Set by s. 632.885; federal law requires to age 26' },
          { label: 'Court-ordered coverage', value: 'Must enroll a child a court orders covered' },
        ]}
      />
      <p className="mb-5 text-paper">
        Wisconsin also bars conditioning a dependent child's eligibility solely on where the
        child lives, and requires insurers to offer substance abuse coverage (s. 632.89). These
        rules overlap with the mandated-benefits list covered in the group health &amp;
        Wisconsin regulation module — expect them tested from either direction.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">HDHPs and HSA eligibility</h2>
      <p className="mb-5 text-paper">
        A <strong className="text-gold-400">high-deductible health plan (HDHP)</strong> pairs a
        higher minimum deductible with lower premiums, and is the only plan type that qualifies
        an individual to open and contribute to a{' '}
        <strong className="text-gold-400">Health Savings Account (HSA)</strong>. To be
        HSA-eligible, a person generally must be covered only by an HDHP (no other
        disqualifying coverage, such as a general-purpose FSA or Medicare enrollment), and
        contribution limits are set annually by the IRS — memorize the concept and the
        eligibility rule rather than a dollar figure, since it changes every year. Employers
        increasingly pair HDHPs with <strong className="text-gold-400">defined
        contribution</strong> arrangements — the employer fixes its dollars and the employee
        shops for coverage.
      </p>

      <FactTable
        title="HSA eligibility, in brief"
        rows={[
          { label: 'Required plan type', value: 'HDHP only — no other non-HDHP coverage' },
          { label: 'Contributions', value: 'Tax-deductible; grow tax-deferred' },
          { label: 'Qualified withdrawals', value: 'Tax-free for qualified medical expenses' },
          { label: 'Ownership', value: 'Owned by the individual — funds are portable' },
        ]}
      />

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        If a scenario mentions a referral requirement and a gatekeeper, think HMO. If it
        mentions an HSA, the underlying plan has to be an HDHP.
      </blockquote>
    </>
  )
}
