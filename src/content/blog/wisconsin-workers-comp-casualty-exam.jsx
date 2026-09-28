import { Link } from 'react-router-dom'
import { FactTable } from '../../components/study/FactTable.jsx'
import { B, ExamTip, H2, Lead, P } from '../../components/study/LessonKit.jsx'

export function Content() {
  return (
    <>
      <Lead>
        Worker's compensation is only 5% of the Casualty exam's policy questions, but
        Wisconsin's WC law also appears in the regulation section. These are the rules to know,
        from the Department of Workforce Development's employer guidance.
      </Lead>

      <FactTable
        title="Who must carry WC in Wisconsin"
        rows={[
          { label: 'Employers with', value: '3+ full- or part-time workers' },
          { label: 'Or paying wages of', value: '$500+ in any calendar quarter' },
          { label: 'Coverage deadline after that quarter', value: '10th of next quarter’s 1st month' },
          { label: 'Farm employers', value: '6+ workers on any 20 days a year' },
        ]}
      />

      <H2>A competitive state</H2>
      <P>
        Wisconsin employers buy coverage from licensed insurers or, with approval from the
        Worker's Compensation Division, self-insure. There is no monopolistic state fund.
        Employers rejected by insurers get an assignment through the{' '}
        <B>Wisconsin Compensation Rating Bureau (WCRB)</B>, which runs the Wisconsin Worker's
        Compensation Insurance Pool.
      </P>

      <H2>The Uninsured Employers Fund</H2>
      <P>
        If an employee is hurt while working for an illegally uninsured employer, the{' '}
        <B>Uninsured Employers Fund</B> pays valid claims, and the employer must reimburse the
        fund.
      </P>

      <H2>The policy itself</H2>
      <P>
        Part One pays the statutory benefits. Part Two, employers liability, covers lawsuits
        the exclusive remedy doesn't bar, such as a spouse's claim for loss of consortium. Part
        Three is other states coverage. Premium is a rate per $100 of payroll by class, adjusted
        by the experience modification and trued up at audit.
      </P>

      <ExamTip>
        An experience mod below 1.00 lowers premium. Above 1.00 raises it.
      </ExamTip>

      <P>
        The{' '}
        <Link className="text-gold-400 underline" to="/licenses/casualty">
          Casualty track
        </Link>{' '}
        includes a full lesson on workers comp, umbrella, and surety.
      </P>
    </>
  )
}
