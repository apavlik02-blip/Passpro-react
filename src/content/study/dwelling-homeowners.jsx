import { FactTable } from '../../components/study/FactTable.jsx'
import { B, Callout, ExamTip, H2, Lead, List, P } from '../../components/study/LessonKit.jsx'

export function Content() {
  return (
    <>
      <Lead>
        Homeowners is 18% of the Property exam, and dwelling plus homeowners together are 20%
        of Personal Lines. Most questions ask you to identify the right form, the right coverage
        letter, or the right endorsement for a situation.
      </Lead>

      <H2>Dwelling policy (DP) program</H2>
      <P>
        Dwelling forms insure one- to four-family residences, including <B>rentals</B> and
        homes that don't qualify for homeowners coverage. They are <B>property-only</B>.
        Liability comes from the <B>personal liability supplement</B>.
      </P>
      <FactTable
        title="Dwelling forms"
        rows={[
          { label: 'DP-1 Basic', value: 'Fire, lightning, internal explosion (ACV)' },
          { label: 'DP-2 Broad', value: 'Broad named perils (RC on building)' },
          { label: 'DP-3 Special', value: 'Open perils A & B; broad named C' },
        ]}
      />
      <FactTable
        title="Dwelling coverages"
        rows={[
          { label: 'Coverage A', value: 'Dwelling' },
          { label: 'Coverage B', value: 'Other structures (10% of A)' },
          { label: 'Coverage C', value: 'Personal property' },
          { label: 'Coverage D', value: 'Fair rental value' },
          { label: 'Coverage E', value: 'Additional living expense (not DP-1)' },
        ]}
      />
      <List
        items={[
          <><B>DP 04 72 Broad theft:</B> adds theft of personal property.</>,
          <><B>DP 04 11 Automatic increase:</B> raises Coverage A each year to keep up with building costs.</>,
          <><B>DP 11 43 Dwelling under construction:</B> for a home being built.</>,
          <><B>DP 01 43 Special provisions:</B> state-specific amendments.</>,
        ]}
      />
      <P>
        General exclusions include flood and surface water, earth movement, ordinance or law,
        war, nuclear hazard, neglect, and intentional loss. Once the dwelling has been{' '}
        <B>vacant more than 60 consecutive days</B>, vandalism and glass breakage are excluded.
      </P>

      <H2>Homeowners forms</H2>
      <FactTable
        title="Which form?"
        rows={[
          { label: 'HO-2 Broad', value: 'Owner-occupied; broad named perils' },
          { label: 'HO-3 Special', value: 'Open perils A & B; named perils C' },
          { label: 'HO-4 Contents Broad', value: 'Renters' },
          { label: 'HO-6 Unit-Owners', value: 'Condominium owners' },
          { label: 'HO-8 Modified', value: 'Older homes; RC far above market value' },
        ]}
      />

      <H2>Section I: property</H2>
      <FactTable
        title="HO-3 limits (Coverage A = $300,000)"
        rows={[
          { label: 'A – Dwelling', value: '$300,000' },
          { label: 'B – Other structures (10% of A)', value: '$30,000' },
          { label: 'C – Personal property (50% of A)', value: '$150,000' },
          { label: 'D – Loss of use (30% of A)', value: '$90,000' },
        ]}
      />
      <P>
        Coverage D combines <B>additional living expense</B> and <B>fair rental value</B>. On
        the HO-3, the dwelling is settled at <B>replacement cost</B> if Coverage A is at least{' '}
        <B>80%</B> of the home's replacement cost at the time of loss. If not, the insurer pays
        the greater of ACV or a proportion of replacement cost. Personal property is settled at
        ACV unless the <B>HO 04 90</B> endorsement is added.
      </P>
      <P>
        Broad named perils add falling objects; weight of ice, snow, or sleet; accidental
        discharge of water or steam; sudden tearing apart of heating or plumbing systems;
        freezing; and artificially generated electrical current to the basic list.
      </P>
      <FactTable
        title="Special limits of liability (theft-sensitive property)"
        rows={[
          { label: 'Money, bank notes', value: '$200' },
          { label: 'Securities, valuable papers', value: '$1,500' },
          { label: 'Watercraft', value: '$1,500' },
          { label: 'Theft of jewelry, watches, furs', value: '$1,500' },
          { label: 'Theft of firearms', value: '$2,500' },
          { label: 'Theft of silverware', value: '$2,500' },
        ]}
      />
      <Callout>
        Special limits are why agents recommend scheduling. A $12,000 ring on an unendorsed
        HO-3 has only $1,500 of theft coverage.
      </Callout>
      <P>
        Additional coverages include debris removal, reasonable repairs, trees, shrubs and
        plants (named perils, <B>not windstorm</B>), fire department service charges, credit
        card and forgery, loss assessment, and ordinance or law. The Section I deductible
        applies <B>per occurrence</B>.
      </P>

      <H2>Section II: liability</H2>
      <P>
        <B>Coverage E – Personal liability</B> starts at <B>$100,000</B> per occurrence and
        pays damages plus defense. <B>Coverage F – Medical payments to others</B> pays
        regardless of fault, but not for the insured or regular household residents. Section
        II excludes expected or intended injury, business pursuits, professional services,
        most motor vehicles, larger watercraft, and injury to insureds.
      </P>

      <H2>Endorsements that show up on the exam</H2>
      <FactTable
        title="Match the need to the form"
        rows={[
          { label: 'Schedule a ring, art, or collection', value: 'HO 04 61' },
          { label: 'Replacement cost on contents', value: 'HO 04 90' },
          { label: 'Earthquake', value: 'HO 04 54' },
          { label: 'Sewer or drain back-up, sump overflow', value: 'HO 04 95' },
          { label: 'Mold (limited)', value: 'HO 04 26 / 04 27' },
          { label: 'Home day care', value: 'HO 04 97' },
          { label: 'Incidental office or studio at home', value: 'HO 04 42' },
          { label: 'State amendments', value: 'HO 01 43' },
        ]}
      />
      <ExamTip>
        If the question says "HO-3" and asks about contents, the answer is almost always
        "named perils." Open perils applies to the dwelling and other structures only.
      </ExamTip>
    </>
  )
}
