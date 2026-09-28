import { FactTable } from '../../components/study/FactTable.jsx'
import { B, Callout, ExamTip, H2, Lead, List, P } from '../../components/study/LessonKit.jsx'

export function Content() {
  return (
    <>
      <Lead>
        The commercial package policy (9%) and businessowners policy (9%) make up almost a fifth
        of the Property exam. This module covers commercial property, inland marine, equipment
        breakdown, farm property, and BOP Section I.
      </Lead>

      <H2>How a commercial package is built</H2>
      <P>
        A <B>commercial package policy (CPP)</B> combines common policy declarations, common
        policy conditions, interline endorsements, and <B>two or more coverage parts</B>, such
        as commercial property plus general liability. A single coverage part issued alone is a
        monoline policy.
      </P>

      <H2>Commercial property</H2>
      <P>
        The <B>building and personal property</B> form covers the building, the insured's
        business personal property, and personal property of others in the insured's care. The
        commercial property conditions form adds conditions such as concealment and fraud,
        control of property, and the insurance-to-value (coinsurance) rules.
      </P>
      <FactTable
        title="Causes of loss forms"
        rows={[
          { label: 'Basic', value: 'Named perils' },
          { label: 'Broad', value: 'Basic + falling objects, weight of snow, water damage' },
          { label: 'Special', value: 'Open perils, subject to exclusions' },
        ]}
      />
      <P>
        When a building has been <B>vacant more than 60 consecutive days</B>, there is no
        coverage for vandalism, sprinkler leakage, building glass breakage, water damage, theft,
        or attempted theft. Other covered losses are <B>reduced by 15%</B>.
      </P>
      <FactTable
        title="Other coverage forms and endorsements"
        rows={[
          { label: 'Building under construction', value: 'Builders risk' },
          { label: 'Condo association or unit owner', value: 'Condominium forms' },
          { label: 'Lost net income + continuing expenses', value: 'Business income' },
          { label: 'Extra costs to keep operating', value: 'Extra expense' },
          { label: 'Code-required demolition and upgrades', value: 'Ordinance or law (CP 04 05)' },
          { label: 'Perishables spoiled by outage', value: 'Spoilage (CP 04 40)' },
          { label: 'Seasonal inventory peaks', value: 'Peak season (CP 12 30)' },
          { label: 'Values reported periodically', value: 'Value reporting (CP 13 10)' },
        ]}
      />
      <Callout>
        Business income pays what you would have earned. Extra expense pays what it costs to
        keep going. Many policies combine them.
      </Callout>

      <H2>Commercial inland marine</H2>
      <P>
        The <B>Nationwide Marine Definition</B> treats property that moves, is in transit, or is
        an instrumentality of transportation or communication as marine. Commercial inland
        marine forms include:
      </P>
      <List
        items={[
          <><B>Accounts receivable:</B> amounts the insured can't collect because records were destroyed.</>,
          <><B>Bailee's customer:</B> customers' property in the insured's care, regardless of fault.</>,
          <><B>Commercial articles:</B> cameras and musical instruments used commercially.</>,
          <><B>Contractors equipment floater:</B> mobile construction equipment.</>,
          <><B>Electronic data processing:</B> computer equipment and data.</>,
          <><B>Installation floater:</B> materials being installed by a contractor.</>,
          <><B>Signs:</B> neon and other signs.</>,
          <><B>Valuable papers and records:</B> the cost to research and replace them.</>,
          <><B>Transportation:</B> motor truck cargo and transit forms.</>,
        ]}
      />

      <H2>Equipment breakdown</H2>
      <P>
        Commercial property forms exclude mechanical and electrical breakdown.{' '}
        <B>Equipment breakdown protection (EB 00 20)</B> covers sudden breakdown of boilers,
        HVAC, electrical, and production equipment, often including resulting business income.
        The ACV endorsement (EB 99 59) changes settlement from replacement cost to ACV.
      </P>

      <H2>Farm property</H2>
      <FactTable
        title="Farm property coverages"
        rows={[
          { label: 'A', value: 'Dwellings' },
          { label: 'B', value: 'Other private structures' },
          { label: 'C', value: 'Household personal property' },
          { label: 'D', value: 'Loss of use' },
          { label: 'E', value: 'Scheduled farm personal property' },
          { label: 'F', value: 'Unscheduled farm personal property' },
          { label: 'G', value: 'Other farm structures' },
        ]}
      />
      <P>
        Separate forms cover <B>mobile agricultural machinery and equipment</B> and{' '}
        <B>livestock</B>. Farm liability uses Coverages H, I, and J.
      </P>

      <H2>Businessowners policy: Section I property</H2>
      <P>
        The BOP packages property and liability for eligible <B>small to mid-sized</B>{' '}
        businesses. Section I covers buildings and business personal property at{' '}
        <B>replacement cost</B> with <B>no coinsurance clause</B>. It includes business income
        and extra expense on an <B>actual loss sustained</B> basis for up to{' '}
        <B>12 months</B>. Business income begins after a <B>72-hour</B> waiting period. The
        business personal property limit increases <B>25%</B> for seasonal peaks if it equals
        at least 100% of average monthly values.
      </P>
      <FactTable
        title="BOP Section I endorsements"
        rows={[
          { label: 'Must maintain sprinklers or alarms', value: 'Protective safeguards (BP 04 30)' },
          { label: 'Off-site utility outage, physical damage', value: 'Utility services – direct (BP 04 56)' },
          { label: 'Off-site utility outage, lost income', value: 'Utility services – time element (BP 04 57)' },
        ]}
      />
      <P>
        Optional coverages include outdoor signs, money and securities, employee dishonesty, and
        equipment breakdown. Section III common policy conditions (cancellation, inspections,
        premiums, transfer of rights) apply to the whole BOP.
      </P>
      <ExamTip>
        "No coinsurance" plus "12 months of business income, no dollar limit" are the BOP
        features the exam asks about most.
      </ExamTip>
    </>
  )
}
