import { FactTable } from '../../components/study/FactTable.jsx'
import { B, Callout, ExamTip, H2, Lead, List, P } from '../../components/study/LessonKit.jsx'

export function Content() {
  return (
    <>
      <Lead>
        Property insurance basics is 13% of the Property exam and 20% of the Personal Lines
        exam. It's where the math lives: valuation, coinsurance, and other-insurance splits. Get
        comfortable with the formulas here and a lot of the scenario questions become easy.
      </Lead>

      <H2>Core principles</H2>
      <P>
        In property insurance, <B>insurable interest must exist at the time of loss</B>. Life
        insurance is the opposite: interest is needed at application. The principle of{' '}
        <B>indemnity</B> restores the insured to their pre-loss position without profit.
        Underwriting selects and classifies risks to control <B>adverse selection</B>. The{' '}
        <B>loss ratio</B> (losses ÷ premium) tells the insurer whether rates are adequate.
      </P>
      <FactTable
        title="Hazards and perils"
        rows={[
          { label: 'Cause of loss (fire, wind, theft)', value: 'Peril' },
          { label: 'Tangible condition (oily rags, bad wiring)', value: 'Physical hazard' },
          { label: 'Dishonesty (arson for profit, padding a claim)', value: 'Moral hazard' },
          { label: 'Carelessness because insured', value: 'Morale hazard' },
        ]}
      />
      <P>
        <B>Named perils</B> policies cover only listed causes of loss, and the insured must
        prove a listed peril caused it. <B>Special (open perils)</B> policies cover any direct
        physical loss unless it is excluded, and the insurer must prove the exclusion applies.
        A <B>direct loss</B> is physical damage. A <B>consequential (indirect) loss</B>, such as
        lost income or extra expense, results from it. <B>Blanket</B> coverage puts one limit
        over several items or locations. <B>Specific</B> coverage gives each its own limit.
      </P>

      <H2>Loss valuation</H2>
      <FactTable
        title="Valuation methods"
        rows={[
          { label: 'Replacement cost − depreciation', value: 'Actual cash value' },
          { label: 'Like kind and quality, no depreciation', value: 'Replacement cost' },
          { label: 'Modern equivalent materials', value: 'Functional replacement' },
          { label: 'What a buyer would pay', value: 'Market value' },
          { label: 'Value fixed in advance, paid in full on total loss', value: 'Agreed value' },
          { label: 'Lesser of stated amount, ACV, or repair', value: 'Stated amount' },
        ]}
      />
      <P>
        <B>ACV example:</B> a roof with a 20-year life is 10 years old. Replacement cost is
        $12,000. Depreciation is 50%, so ACV is <B>$6,000</B>.
      </P>
      <ExamTip>
        "Agreed value" and "stated amount" sound alike but are opposites. Agreed value pays the
        agreed number in a total loss. Stated amount is only a ceiling, and the insurer pays the
        lesser of it, ACV, or repair cost.
      </ExamTip>

      <H2>Coinsurance</H2>
      <P>
        Coinsurance rewards insuring to value. The required amount is{' '}
        <B>value at time of loss × coinsurance %</B>. If the insured carries less, partial
        losses are paid proportionally:
      </P>
      <Callout>(Amount carried ÷ Amount required) × Loss − Deductible = Payment, never more than the limit.</Callout>
      <FactTable
        title="Worked example"
        rows={[
          { label: 'Building value', value: '$500,000' },
          { label: 'Coinsurance', value: '80%' },
          { label: 'Required insurance', value: '$400,000' },
          { label: 'Insurance carried', value: '$300,000' },
          { label: 'Loss', value: '$100,000' },
          { label: '300 ÷ 400 = 0.75 × $100,000', value: 'Pays $75,000' },
        ]}
      />
      <P>
        If the insured meets the requirement, the insurer pays the loss minus the deductible, up
        to the limit. Coinsurance is measured <B>at the time of loss</B>, not when the policy
        was bought.
      </P>

      <H2>Policy structure</H2>
      <List
        items={[
          <><B>Declarations:</B> who, what, where, when, how much.</>,
          <><B>Definitions:</B> the policy's own dictionary.</>,
          <><B>Insuring agreement:</B> the promise to pay.</>,
          <><B>Additional coverages:</B> extras such as debris removal.</>,
          <><B>Conditions:</B> duties and rules for both parties.</>,
          <><B>Exclusions:</B> what's taken away.</>,
          <><B>Endorsements:</B> changes that modify the policy.</>,
        ]}
      />

      <H2>Common provisions</H2>
      <P>
        The <B>first named insured</B> pays the premium, receives return premium, and can
        request cancellation. <B>Other insurance</B> clauses split losses among policies. Under{' '}
        <B>pro rata</B> sharing, each insurer pays its share of total limits. Under{' '}
        <B>contribution by equal shares</B>, each pays equally until the smaller limit is used
        up. Under <B>primary and excess</B>, one pays first and the other pays above it.{' '}
        <B>Nonconcurrency</B> happens when overlapping policies don't match, which complicates
        these splits.
      </P>
      <FactTable
        title="Other insurance examples"
        rows={[
          { label: 'Pro rata: $60K + $40K limits, $20K loss', value: 'A pays $12K, B $8K' },
          { label: 'Equal shares: $50K + $200K limits, $150K loss', value: '$50K / $100K' },
        ]}
      />
      <List
        items={[
          <><B>Subrogation:</B> after paying, the insurer takes over the insured's rights against the responsible party.</>,
          <><B>Salvage:</B> the insurer may take damaged or recovered property after paying.</>,
          <><B>Abandonment:</B> the insured can't abandon property to the insurer.</>,
          <><B>Liberalization:</B> free broadening of a form applies automatically to existing policies.</>,
          <><B>Vacancy/unoccupancy:</B> coverage for some perils is restricted after a vacancy period, commonly 60 consecutive days.</>,
          <><B>Duties after loss:</B> prompt notice, protect the property, keep records, and give a sworn proof of loss if asked.</>,
          <><B>Standard mortgage clause:</B> protects the real estate lender even if the insured's own coverage is voided.</>,
          <><B>Loss payable clause:</B> protects a lender on personal property, such as a car or equipment.</>,
          <><B>No benefit to bailee:</B> a repair shop or cleaner can't rely on the owner's policy.</>,
        ]}
      />

      <H2>Construction</H2>
      <P>
        From most to least fire-resistant: <B>fire-resistive</B>, modified fire-resistive,
        masonry non-combustible, non-combustible (unprotected steel), joisted masonry, and{' '}
        <B>frame</B>. Construction type, occupancy, protection, and exposure (COPE) drive
        property underwriting.
      </P>
    </>
  )
}
