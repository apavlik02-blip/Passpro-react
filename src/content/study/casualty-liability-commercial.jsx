import { FactTable } from '../../components/study/FactTable.jsx'
import { B, Callout, ExamTip, H2, Lead, List, P } from '../../components/study/LessonKit.jsx'

export function Content() {
  return (
    <>
      <Lead>
        Casualty basics (13%), the commercial package policy (10%), the BOP (10%), and
        commercial auto make up a large share of the Casualty exam. This module starts with
        negligence and liability limits, then covers the CGL, crime, BOP liability, and
        commercial auto.
      </Lead>

      <H2>Negligence and liability</H2>
      <P>
        Liability insurance pays what the insured becomes <B>legally obligated</B> to pay
        others. Most claims are based on <B>negligence</B>: failing to use the care a
        reasonably prudent person would. To win, a plaintiff must prove four elements:
      </P>
      <Callout>Legal duty, breach of that duty, proximate cause, and actual damages.</Callout>
      <List
        items={[
          <><B>Defenses:</B> comparative or contributory negligence and assumption of risk. Under comparative negligence, recovery is reduced by the plaintiff's share of fault.</>,
          <><B>Strict (absolute) liability:</B> dangerous activities and wild animals, regardless of care.</>,
          <><B>Vicarious liability:</B> responsibility for another's acts, such as an employer for an employee.</>,
          <><B>Damages:</B> special (measurable costs like medical bills), general (pain and suffering), and punitive (punishment).</>,
        ]}
      />
      <FactTable
        title="Limits"
        rows={[
          { label: '100/300/50 split limits', value: 'Per person / per accident / PD' },
          { label: 'One limit for BI and PD', value: 'Combined single limit' },
          { label: 'Total for the policy period', value: 'Aggregate' },
          { label: 'Insured pays and handles first', value: 'Self-insured retention' },
        ]}
      />
      <P>
        Defense is usually paid <B>in addition to limits</B>, and the insurer must defend even
        groundless suits seeking covered damages. The duty ends when the limits are used up by
        judgments or settlements.
      </P>

      <H2>Commercial general liability (CGL)</H2>
      <FactTable
        title="CGL coverages"
        rows={[
          { label: 'Coverage A', value: 'Bodily injury and property damage' },
          { label: 'Coverage B', value: 'Personal and advertising injury' },
          { label: 'Coverage C', value: 'Medical payments (no-fault)' },
        ]}
      />
      <P>
        Coverage B covers offenses such as false arrest, malicious prosecution, wrongful
        eviction, libel, slander, invasion of privacy, and using another's advertising idea.
        Coverage C pays medical expenses regardless of fault, but not for insureds or employees.
      </P>
      <P>
        <B>Exposures:</B> premises and operations, <B>products-completed operations</B> (which
        has its own aggregate), and <B>contractual liability</B> for an insured contract, such
        as a lease or an agreement to assume another party's tort liability. Key exclusions
        include expected or intended injury, employee injury (covered by workers compensation),
        autos, pollution (use a pollution liability form), and liquor liability for businesses
        in the alcohol trade.
      </P>
      <FactTable
        title="Occurrence vs. claims-made"
        rows={[
          { label: 'Occurrence trigger', value: 'Injury during the policy period' },
          { label: 'Claims-made trigger', value: 'Claim first made during the period' },
          { label: 'Retroactive date', value: 'No coverage for injury before it' },
          { label: 'Basic extended reporting period', value: 'Automatic, no charge' },
          { label: 'Supplemental ERP', value: 'Optional endorsement, extra premium' },
        ]}
      />

      <H2>Commercial crime</H2>
      <FactTable
        title="Definitions"
        rows={[
          { label: 'Force or threat against a person', value: 'Robbery' },
          { label: 'Forced entry with visible marks', value: 'Burglary' },
          { label: 'Any unlawful taking', value: 'Theft' },
        ]}
      />
      <P>
        Insuring agreements include <B>employee theft</B>, forgery or alteration, inside the
        premises (theft of money and securities, or robbery and safe burglary of other
        property), outside the premises, computer fraud, funds transfer fraud, and money orders
        and counterfeit money. The <B>discovery</B> form covers loss discovered during the
        policy period. The <B>loss sustained</B> form covers loss that occurs during the period
        and is discovered within a set time after it ends. Government entities use government
        crime forms.
      </P>

      <H2>Farm liability</H2>
      <P>
        Farm liability uses <B>Coverage H</B> (BI and PD), <B>I</B> (personal and advertising
        injury), and <B>J</B> (medical payments), mirroring CGL Coverages A, B, and C.
      </P>

      <H2>BOP Section II: liability</H2>
      <P>
        BOP business liability covers BI, PD, and personal and advertising injury, plus no-fault
        medical expenses, with per-occurrence and aggregate limits. It excludes autos,
        professional services, workers compensation, pollution, and liquor liability for
        businesses in the alcohol trade. <B>BP 04 04</B> adds hired and non-owned auto
        liability. Who is an insured depends on the business form. For a corporation, it
        includes officers, directors, and stockholders in those roles, and employees acting
        within the scope of employment.
      </P>

      <H2>Commercial auto</H2>
      <FactTable
        title="Business auto covered auto symbols"
        rows={[
          { label: '1', value: 'Any auto' },
          { label: '2', value: 'Owned autos only' },
          { label: '7', value: 'Specifically described autos' },
          { label: '8', value: 'Hired autos only' },
          { label: '9', value: 'Non-owned autos only' },
        ]}
      />
      <List
        items={[
          <><B>Garage form / garagekeepers:</B> garagekeepers covers customers' autos in the insured's care.</>,
          <><B>Truckers and motor carrier forms:</B> for-hire trucking, including trailer interchange.</>,
          <><B>Motor Carrier Act of 1980:</B> minimum financial responsibility, evidenced by the MCS-90 endorsement.</>,
          <><B>Endorsements:</B> drive other car, individual named insured, employees as insureds, mobile equipment, lessor as additional insured and loss payee, and auto medical payments.</>,
        ]}
      />
      <ExamTip>
        Employees' personal cars on company errands are symbol 9 (non-owned). Rental cars are
        symbol 8 (hired). A BOP-only business adds both with BP 04 04.
      </ExamTip>
    </>
  )
}
