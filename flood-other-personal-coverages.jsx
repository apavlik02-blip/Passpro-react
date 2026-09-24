import { FactTable } from '../../components/study/FactTable.jsx'
import { B, Callout, ExamTip, H2, Lead, List, P } from '../../components/study/LessonKit.jsx'

export function Content() {
  return (
    <>
      <Lead>
        "Other coverages and options" is 10% of the Personal Lines exam and 4% of Property. It
        covers perils the homeowners forms exclude (flood and earthquake) and property they
        don't handle well (boats and manufactured homes), plus Wisconsin's property residual
        market.
      </Lead>

      <H2>National Flood Insurance Program (NFIP)</H2>
      <P>
        Homeowners and dwelling forms exclude flood. The NFIP makes flood insurance available
        in <B>participating communities</B>, which agree to floodplain management rules. It is
        available both inside and outside high-risk zones. Under <B>Write Your Own</B>, private
        insurers sell and service NFIP policies under their own names while the federal program
        carries the risk.
      </P>
      <FactTable
        title="NFIP essentials"
        rows={[
          { label: 'Residential building limit', value: '$250,000' },
          { label: 'Residential contents limit', value: '$100,000' },
          { label: 'Commercial building / contents', value: '$500,000 each' },
          { label: 'Standard waiting period', value: '30 days' },
          { label: 'Waiting period exception', value: 'Tied to a loan transaction' },
        ]}
      />
      <P>
        An NFIP <B>flood</B> is a general and temporary inundation of two or more acres of
        normally dry land, or of two or more properties, or a mudflow. A burst pipe is not a
        flood. Basement coverage is limited to certain building equipment and a short list of
        contents.
      </P>
      <Callout>Flood requires 2 or more acres or 2 or more properties. One flooded basement from a broken pipe is a water damage claim, not a flood.</Callout>

      <H2>Earthquake</H2>
      <P>
        Earth movement is excluded under homeowners and dwelling forms. Coverage comes from the
        earthquake endorsement (<B>HO 04 54</B>) or a separate policy, usually with a{' '}
        <B>percentage deductible</B> based on the dwelling limit.
      </P>

      <H2>Boats</H2>
      <P>
        Homeowners forms give only a <B>$1,500</B> special limit for watercraft property and
        exclude liability for many owned boats above certain size or horsepower thresholds. A{' '}
        <B>boatowners</B> policy (or a watercraft endorsement for smaller boats) covers the
        hull, motor, equipment, and liability.
      </P>

      <H2>Manufactured and mobile homes</H2>
      <P>
        Manufactured homes at a fixed location are insured under homeowners-type forms adapted
        for them. That includes the home, other structures, contents, and liability, plus
        exposures such as transportation or tie-down.
      </P>

      <H2>Personal umbrella</H2>
      <P>
        A personal umbrella adds liability limits over homeowners and auto and may cover some
        claims those policies exclude, after a self-insured retention. The insured must keep
        the required underlying limits. See the Umbrella section of the Worker's Comp module
        for details.
      </P>

      <H2>Other policies on the Property outline</H2>
      <List
        items={[
          <><B>Surplus lines:</B> coverage from nonadmitted insurers for risks the admitted market won't write, placed by a licensed surplus lines agent.</>,
          <><B>Directors and officers:</B> management liability for wrongful acts.</>,
          <><B>Wisconsin Insurance Plan (WIP):</B> basic property coverage for owners rejected in the standard market. It is ACV only, with limits up to $350,000 for dwelling or homeowners and $500,000 for commercial. Vacant, farm, and manufacturing risks are not eligible.</>,
        ]}
      />
      <ExamTip>
        Know which market fills which gap: WIP for property, WAIP for auto, the WC pool (through
        WCRB) for worker's comp, and the NFIP for flood.
      </ExamTip>
    </>
  )
}
