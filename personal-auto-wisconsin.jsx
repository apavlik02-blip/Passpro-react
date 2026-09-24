import { FactTable } from '../../components/study/FactTable.jsx'
import { B, Callout, ExamTip, H2, Lead, List, P } from '../../components/study/LessonKit.jsx'

export function Content() {
  return (
    <>
      <Lead>
        Auto is 14% of the Casualty exam and 10% of Personal Lines, and the Wisconsin auto
        statutes show up again in the regulation section. This module covers the personal auto
        policy (PAP) part by part, then Wisconsin's requirements.
      </Lead>

      <FactTable
        title="Wisconsin auto requirements (OCI)"
        rows={[
          { label: 'Liability minimum', value: '$25,000 / $50,000 / $10,000' },
          { label: 'Uninsured motorist', value: 'Required, $25,000 / $50,000 BI' },
          { label: 'Underinsured motorist', value: 'Optional, must be offered' },
          { label: 'UIM minimum if purchased', value: '$50,000 / $100,000' },
          { label: 'Medical payments', value: 'Optional, $1,000 minimum' },
          { label: 'Accident report to DMV', value: 'Within 10 days' },
          { label: 'Report threshold', value: 'Injury, death, or PD over $1,000' },
        ]}
      />

      <H2>PAP structure</H2>
      <FactTable
        title="Six parts"
        rows={[
          { label: 'Part A', value: 'Liability' },
          { label: 'Part B', value: 'Medical payments' },
          { label: 'Part C', value: 'Uninsured motorists' },
          { label: 'Part D', value: 'Coverage for damage to your auto' },
          { label: 'Part E', value: 'Duties after an accident or loss' },
          { label: 'Part F', value: 'General provisions' },
        ]}
      />
      <P>
        The PAP insures an individual or a married couple in the same household. "You" includes
        a resident spouse. "Family member" means a resident relative by blood, marriage, or
        adoption. The <B>policy territory</B> is the United States, its territories and
        possessions, Puerto Rico, and <B>Canada</B>. Mexico is not included.
      </P>

      <H2>Part A: liability</H2>
      <P>
        Part A pays bodily injury and property damage the insured is legally liable for, plus
        defense. <B>Supplementary payments</B> are paid in addition to the limit: up to{' '}
        <B>$250 for bail bonds</B>, premiums on appeal bonds, interest on judgments, up to{' '}
        <B>$200 a day</B> for lost earnings when attending hearings or trials at the insurer's
        request, and other reasonable expenses the insurer requests.
      </P>
      <List
        items={[
          'Intentional injury or damage',
          'Property owned by, rented to, or in the care of the insured (with exceptions for residences and private garages)',
          'Using a vehicle as a public or livery conveyance (share-the-expense car pools are OK)',
          'Owned vehicles with fewer than four wheels, such as motorcycles',
          'Vehicles furnished or available for the insured’s regular use (fixed by PP 03 06)',
          'Vehicles used in the auto business, such as repair shops or dealerships',
        ]}
      />
      <P>
        A <B>newly acquired</B> replacement auto gets the broadest coverage on any vehicle for
        the rest of the policy period. An additional auto gets liability coverage if the insured
        asks for it within <B>14 days</B>.
      </P>

      <H2>Parts B and C</H2>
      <P>
        <B>Medical payments</B> covers reasonable medical and funeral expenses for insureds and
        occupants of a covered auto, regardless of fault. <B>Uninsured motorists</B> covers
        bodily injury caused by an uninsured or hit-and-run driver. Wisconsin requires UM at{' '}
        <B>$25,000/$50,000</B>, bodily injury only. <B>Underinsured motorist</B> coverage
        applies when the at-fault driver has insurance, but not enough. It is optional in
        Wisconsin, but the insurer must tell the policyholder it is available.
      </P>
      <Callout>UM: the other driver has no insurance. UIM: the other driver has too little.</Callout>

      <H2>Part D: damage to your auto</H2>
      <FactTable
        title="Collision vs. other than collision"
        rows={[
          { label: 'Hitting another car or object', value: 'Collision' },
          { label: 'Upset or overturn', value: 'Collision' },
          { label: 'Contact with a bird or animal', value: 'Other than collision' },
          { label: 'Fire, theft, windstorm, hail, flood', value: 'Other than collision' },
          { label: 'Glass breakage', value: 'Other than collision*' },
          { label: 'Falling objects, vandalism, riot', value: 'Other than collision' },
        ]}
      />
      <P>
        *If glass breaks in a collision, the insured may choose to have it paid under collision,
        so only one deductible applies. <B>Transportation expenses</B> pay <B>$20 a day, up to
        $600</B>. For theft, payment starts 48 hours after the theft. For other losses, it
        starts 24 hours after the auto is withdrawn from use. If no vehicle on the policy has
        physical damage coverage, a newly acquired auto has only <B>4 days</B> to be added.
        Otherwise the window is 14 days.
      </P>

      <H2>Part E: duties after an accident</H2>
      <P>
        Notify the insurer promptly, cooperate, send legal papers, submit to medical exams and
        examinations under oath when required, report hit-and-runs to the police within the
        required time for UM claims, and protect the auto from further loss.
      </P>

      <H2>PAP endorsements</H2>
      <FactTable
        title="Match the need"
        rows={[
          { label: 'Towing and labor at breakdown', value: 'PP 03 03' },
          { label: 'Company car for regular use', value: 'PP 03 06' },
          { label: 'Motorcycle, motor home, golf cart', value: 'PP 03 23' },
          { label: 'Unmarried joint owners', value: 'PP 03 34' },
          { label: 'State amendments', value: 'PP 01 93' },
        ]}
      />
      <P>
        Insurers may use <B>credit-based insurance scores</B> as one underwriting factor. OCI's
        position is that credit shouldn't be the only reason to refuse, cancel a new policy in
        its first 60 days, or nonrenew.
      </P>

      <H2>Wisconsin auto law</H2>
      <P>
        The <B>financial responsibility law</B> requires a Driver's Report of Accident within
        10 days after an accident with injury, death, or property damage over $1,000. An
        uninsured at-fault driver who doesn't pay can lose their license and registration.
        Drivers who can't get coverage in the voluntary market can get it through the{' '}
        <B>Wisconsin Automobile Insurance Plan (WAIP)</B>, where assigned insurers charge
        somewhat higher rates.
      </P>
      <P>
        <B>Cancellation:</B> a new auto policy may be canceled for any lawful reason within the
        first 59 days with at least 10 days' notice. After that, midterm cancellation is limited
        to reasons such as nonpayment or a substantial change in the risk, again with 10 days'
        notice. Nonrenewal needs 60 days' notice. For <B>minors</B>, Wisconsin can hold the
        adult who sponsored (signed) the minor's license application liable for the minor's
        negligent driving.
      </P>
      <ExamTip>
        25/50/10 is liability. UM is 25/50 and required. UIM, if bought, starts at 50/100. Don't
        mix them up.
      </ExamTip>
    </>
  )
}
