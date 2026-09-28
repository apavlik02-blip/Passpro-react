import { Link } from 'react-router-dom'
import { FactTable } from '../../components/study/FactTable.jsx'
import { B, Callout, ExamTip, H2, Lead, P } from '../../components/study/LessonKit.jsx'

export function Content() {
  return (
    <>
      <Lead>
        Wisconsin auto law shows up on both the Casualty (22-07) and Personal Lines (22-09)
        exams. The numbers are easy to mix up, so here they are in one place, from OCI's own
        consumer auto guide.
      </Lead>

      <FactTable
        title="Wisconsin auto requirements"
        rows={[
          { label: 'Bodily injury, one person', value: '$25,000' },
          { label: 'Bodily injury, two or more people', value: '$50,000' },
          { label: 'Property damage', value: '$10,000' },
          { label: 'Uninsured motorist (required)', value: '$25,000 / $50,000 BI' },
          { label: 'Underinsured motorist', value: 'Optional; must be offered' },
          { label: 'UIM minimum if purchased', value: '$50,000 / $100,000' },
          { label: 'Medical payments', value: 'Optional; $1,000 minimum' },
        ]}
      />

      <H2>UM vs. UIM</H2>
      <P>
        <B>Uninsured motorist</B> coverage applies when the at-fault driver has no liability
        insurance or is a hit-and-run driver. It is mandatory in Wisconsin and covers bodily
        injury only. <B>Underinsured motorist</B> coverage applies when the at-fault driver has
        insurance, but not enough to cover your damages. It is optional, but the insurer must
        tell you it is available.
      </P>
      <Callout>UM: the other driver has no insurance. UIM: the other driver has too little.</Callout>

      <H2>Financial responsibility and WAIP</H2>
      <P>
        After an accident involving injury, death, or more than $1,000 in property damage, the
        driver must file a <B>Driver's Report of Accident with DMV within 10 days</B>. An
        uninsured at-fault driver who doesn't pay the damages can lose their license and
        registration. Drivers who can't get coverage in the regular market can get it through
        the <B>Wisconsin Automobile Insurance Plan (WAIP)</B>, where rates run somewhat higher.
      </P>

      <H2>Cancellation rules</H2>
      <P>
        An insurer may cancel a new policy within the first 59 days, with at least 10 days'
        notice. After that, midterm cancellation is limited to specific reasons, such as
        nonpayment or a substantial change in the risk, with 10 days' notice. Nonrenewal needs
        at least 60 days' notice.
      </P>

      <ExamTip>
        When a question gives three numbers, it's asking about liability (25/50/10). When it
        gives two and says "required," it's UM (25/50). When it says "if purchased," it's UIM
        (50/100).
      </ExamTip>

      <P>
        Practice these in the{' '}
        <Link className="text-gold-400 underline" to="/licenses/casualty">
          Casualty track
        </Link>
        , which includes a full personal auto lesson and Wisconsin auto flashcards.
      </P>
    </>
  )
}
