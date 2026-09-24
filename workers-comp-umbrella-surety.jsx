import { FactTable } from '../../components/study/FactTable.jsx'
import { B, Callout, ExamTip, H2, Lead, List, P } from '../../components/study/LessonKit.jsx'

export function Content() {
  return (
    <>
      <Lead>
        Worker's compensation is 5% of the Casualty exam, and Wisconsin's WC rules are also
        tested in the regulation section. Umbrella, specialty liability, and surety make up the
        "other coverages" section. Personal Lines candidates need the umbrella material.
      </Lead>

      <FactTable
        title="Wisconsin worker's comp: who must insure (DWD)"
        rows={[
          { label: 'Employees (full or part time)', value: '3 or more' },
          { label: 'Or wages in any calendar quarter', value: '$500 or more' },
          { label: 'Deadline after the $500 quarter', value: '10th of next quarter’s 1st month' },
          { label: 'Farm employers', value: '6+ workers on any 20 days a year' },
          { label: 'Market type', value: 'Competitive; self-insurance with approval' },
          { label: 'Rating and assignment organization', value: 'WCRB' },
        ]}
      />

      <H2>How worker's compensation works</H2>
      <P>
        Worker's comp is a <B>no-fault</B> system. Employees receive statutory benefits for
        work-related injury and occupational disease: medical care, disability income,
        rehabilitation, and death benefits. In exchange, the <B>exclusive remedy</B> doctrine
        generally bars them from suing the employer. Some states are <B>monopolistic</B> and
        require coverage through a state fund. Wisconsin is <B>competitive</B>: employers insure
        with private carriers or, with the Worker's Compensation Division's approval,
        self-insure.
      </P>
      <P>
        Employers rejected in the voluntary market get coverage through assignment by the{' '}
        <B>Wisconsin Compensation Rating Bureau</B>, which runs the Wisconsin Worker's
        Compensation Insurance Pool. The <B>Uninsured Employers Fund</B> pays valid claims for
        employees of illegally uninsured employers, and the employer must reimburse it.
      </P>

      <H2>The WC and employers liability policy</H2>
      <FactTable
        title="Policy parts"
        rows={[
          { label: 'Part One', value: 'Worker’s compensation (statutory benefits)' },
          { label: 'Part Two', value: 'Employers liability' },
          { label: 'Part Three', value: 'Other states insurance' },
          { label: 'Part Four', value: 'Your duties if injury occurs' },
          { label: 'Part Five', value: 'Premium' },
          { label: 'Part Six', value: 'Conditions' },
        ]}
      />
      <P>
        <B>Employers liability</B> covers suits the exclusive remedy doesn't block, such as
        third-party-over actions, consequential injury claims like a spouse's loss of
        consortium, and dual-capacity claims. Endorsements include voluntary compensation, other
        states coverage, anniversary rating date, and coverage for sole proprietors, partners,
        and officers.
      </P>
      <Callout>Premium = rate per $100 of payroll × payroll ÷ 100, by class, × experience mod.</Callout>
      <P>
        A final <B>audit</B> adjusts premium to actual payroll. An <B>experience mod</B> below
        1.00 is a credit, and above 1.00 is a debit. Premium discounts apply to larger
        premiums.
      </P>

      <H2>Umbrella and excess liability</H2>
      <P>
        An <B>umbrella</B> adds limits above scheduled underlying policies and may{' '}
        <B>drop down</B> to cover claims the underlying policies exclude, after a{' '}
        <B>self-insured retention</B>. A true <B>excess</B> policy only follows the underlying
        form. Personal umbrellas sit over homeowners and auto. Commercial umbrellas typically sit
        over CGL, business auto, and employers liability.
      </P>
      <List
        items={[
          'The insured must maintain the required underlying limits. If they lapse, the umbrella pays as if they were in force, and the insured pays the gap.',
          'Once underlying limits are exhausted, the umbrella generally takes over the defense.',
        ]}
      />

      <H2>Specialty liability</H2>
      <FactTable
        title="Match the exposure"
        rows={[
          { label: 'Professional mistakes', value: 'E&O / professional liability' },
          { label: 'Board decisions', value: 'Directors & officers' },
          { label: 'Benefit plan administration', value: 'Fiduciary liability' },
          { label: 'Serving alcohol', value: 'Liquor liability' },
          { label: 'Firing, discrimination, harassment', value: 'EPLI' },
          { label: 'Errors administering benefits', value: 'Employee benefits liability' },
          { label: 'Data breach, network failure', value: 'Cyber liability' },
        ]}
      />

      <H2>Surety bonds</H2>
      <P>
        A surety bond has three parties: the <B>principal</B> promises to perform, the{' '}
        <B>obligee</B> is protected, and the <B>surety</B> guarantees performance. Unlike
        insurance, the surety <B>expects no losses</B>. If it pays the obligee, the principal
        must <B>indemnify</B> the surety.
      </P>
      <FactTable
        title="Bond types"
        rows={[
          { label: 'Contract bonds', value: 'Bid, performance, payment' },
          { label: 'License and permit', value: 'Compliance with licensing laws' },
          { label: 'Public official', value: 'Faithful performance of office' },
          { label: 'Judicial (court) bonds', value: 'Appeal, injunction, bail' },
          { label: 'Fiduciary bonds', value: 'Executors, guardians, trustees' },
        ]}
      />
      <ExamTip>
        "Who pays when the surety pays?" The principal, through indemnity. That is the single
        biggest difference between surety and insurance.
      </ExamTip>
    </>
  )
}
