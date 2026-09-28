import { Link } from 'react-router-dom'
import { FactTable } from '../../components/study/FactTable.jsx'
import { B, Callout, ExamTip, H2, Lead, P } from '../../components/study/LessonKit.jsx'

export function Content() {
  return (
    <>
      <Lead>
        Coinsurance is the math question almost every Property and Personal Lines candidate
        sees. It takes one formula and three steps.
      </Lead>

      <Callout>(Amount carried ÷ Amount required) × Loss − Deductible = Payment, never more than the limit.</Callout>

      <H2>Step 1: Find the amount required</H2>
      <P>
        Multiply the property's value <B>at the time of loss</B> by the coinsurance
        percentage. For a $500,000 building with an 80% clause, the required amount is
        $400,000.
      </P>

      <H2>Step 2: Compare it with what was carried</H2>
      <P>
        If the insured carried at least the required amount, there's no penalty: the insurer
        pays the loss minus the deductible, up to the limit. If they carried less, divide what
        they carried by what was required.
      </P>

      <H2>Step 3: Apply the ratio to the loss</H2>
      <FactTable
        title="Example 1: penalty applies"
        rows={[
          { label: 'Value × 80%', value: '$500,000 → $400,000 required' },
          { label: 'Carried', value: '$300,000' },
          { label: 'Ratio', value: '300 ÷ 400 = 0.75' },
          { label: '$100,000 loss × 0.75', value: 'Pays $75,000' },
        ]}
      />
      <FactTable
        title="Example 2: requirement met"
        rows={[
          { label: 'Value × 80%', value: '$200,000 → $160,000 required' },
          { label: 'Carried', value: '$160,000' },
          { label: '$50,000 loss − $1,000 deductible', value: 'Pays $49,000' },
        ]}
      />

      <ExamTip>
        Coinsurance penalties matter on partial losses. On a total loss, payment is capped at
        the policy limit anyway. And remember that the homeowners replacement cost condition
        (80% of replacement cost) is a close cousin, not the commercial coinsurance clause.
      </ExamTip>

      <P>
        Drill coinsurance, ACV, and other-insurance splits in PassPro's{' '}
        <Link className="text-gold-400 underline" to="/licenses/property">
          Property track
        </Link>
        .
      </P>
    </>
  )
}
