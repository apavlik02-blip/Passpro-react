import { Link } from 'react-router-dom'
import { FactTable } from '../../components/study/FactTable.jsx'
import { B, Callout, H2, Lead, List, P } from '../../components/study/LessonKit.jsx'

export function Content() {
  return (
    <>
      <Lead>
        Wisconsin offers two ways to sell property and casualty insurance: the{' '}
        <B>Personal Lines</B> license (one exam, Series 22-09), or separate{' '}
        <B>Property</B> (22-05) and <B>Casualty</B> (22-07) licenses. The right choice depends
        on one question: will you ever insure a business?
      </Lead>

      <FactTable
        title="Side by side"
        rows={[
          { label: 'PSI exams to pass', value: 'PL: 1 · P&C: 2' },
          { label: 'Homeowners, dwelling, personal auto', value: 'Both' },
          { label: 'Flood, personal umbrella, boats', value: 'Both' },
          { label: 'BOP, CGL, commercial property', value: 'P&C only' },
          { label: 'Commercial auto, crime, workers comp', value: 'P&C only' },
        ]}
      />

      <H2>What the Personal Lines exam covers</H2>
      <P>
        The 22-09 outline puts 35% on regulation, 20% on property basics, 10% each on dwelling,
        homeowners, personal auto, and other coverages (umbrella, flood, boats, mobile homes,
        earthquake), and 5% on general insurance. There is no commercial content.
      </P>

      <H2>Who should choose Personal Lines</H2>
      <List
        items={[
          'Customer service reps at personal lines agencies',
          'Captive-agency producers who quote only home and auto',
          'Call-center roles focused on individual policies',
        ]}
      />

      <H2>Who should take Property and Casualty</H2>
      <List
        items={[
          'Independent agency producers who will quote a small business',
          'Anyone aiming for commercial lines: BOPs, general liability, workers comp',
          'Producers who want the most career flexibility',
        ]}
      />

      <Callout>
        If there's a real chance you'll be asked to quote a BOP or workers comp policy in your
        first year, take Property and Casualty. Adding it later means another round of
        prelicensing and exams.
      </Callout>

      <P>
        Compare all five Wisconsin licenses on the{' '}
        <Link className="text-gold-400 underline" to="/licenses">
          licenses page
        </Link>
        , including the outline weights for each exam.
      </P>
    </>
  )
}
