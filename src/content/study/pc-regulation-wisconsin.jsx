import { FactTable } from '../../components/study/FactTable.jsx'
import { B, Callout, ExamTip, H2, Lead, List, P } from '../../components/study/LessonKit.jsx'

export function Content() {
  return (
    <>
      <Lead>
        Insurance regulation is 35 of the 100 scored questions on the Property, Casualty, and
        Personal Lines exams. It is the largest section on all three, and it's the one where
        Wisconsin's own rules count most. This module covers licensing, the commissioner's
        powers, marketing practices, cancellation and nonrenewal, and the Wisconsin statutes the
        PSI outlines name for property and casualty.
      </Lead>

      <FactTable
        title="Wisconsin numbers to know cold"
        rows={[
          { label: 'Prelicensing education', value: '20 hrs (8 general + 12 line)' },
          { label: 'Prelicensing valid for', value: '1 year from completion' },
          { label: 'Exam passing score', value: '70%' },
          { label: 'Midterm cancellation notice', value: '10 days' },
          { label: 'Cancellation limits begin', value: 'After 60 days in force' },
          { label: 'Nonrenewal notice', value: '60 days before expiration' },
          { label: 'Worse renewal terms, personal lines', value: '45 days before renewal' },
        ]}
      />

      <H2>Who needs a license</H2>
      <P>
        Chapter 628 requires anyone who <B>solicits, negotiates, or places</B> insurance for
        others in Wisconsin to hold an intermediary (producer) license for that line of
        authority. The purpose is <B>consumer protection</B>: making sure the people selling
        insurance are competent and trustworthy. Clerical staff who never solicit or negotiate
        coverage do not need a license.
      </P>
      <P>
        Resident applicants for property, casualty, or personal lines must complete{' '}
        <B>20 hours of approved prelicensing education</B>. That is 8 hours on principles,
        general Wisconsin law, and ethics, plus 12 hours specific to the line. It is valid for
        one year. Self-study courses end with a proctored exam. Limited lines such as title and
        credit do not require prelicensing education.
      </P>

      <H2>Keeping the license</H2>
      <List
        items={[
          <>
            <B>Renewal and continuing education.</B> Licenses must be renewed, and CE is
            required to renew.
          </>,
          <>
            <B>Address and phone changes</B> are reported to OCI. A move doesn't require a new
            license.
          </>,
          <>
            <B>Assumed names</B> must be registered with OCI before use.
          </>,
          <>
            <B>Reporting actions:</B> administrative actions in other states, and certain
            criminal matters, must be reported to OCI.
          </>,
          <>
            <B>Discipline:</B> after notice and hearing, the commissioner may suspend, revoke,
            or limit a license and impose monetary forfeitures (fines).
          </>,
        ]}
      />

      <H2>The commissioner and company regulation</H2>
      <P>
        The Office of the Commissioner of Insurance (OCI) regulates insurers and producers.
        That includes examining insurers' books, monitoring solvency, reviewing rates and policy
        forms, and enforcing unfair practices laws. When an insurer becomes insolvent, the{' '}
        <B>Wisconsin Insurance Security Fund</B> (ch. 646) pays covered claims as the backstop
        of last resort. Policies must include a notice explaining how to <B>file a complaint</B>{' '}
        with OCI.
      </P>

      <H2>Producer conduct: fiduciary duty and marketing practices</H2>
      <P>
        Premiums a producer collects are <B>trust funds</B>. They must be held in a fiduciary
        capacity, never commingled with personal money, and remitted promptly. Commissions may
        be shared only with other appropriately licensed producers. An agency writing mostly
        on its owners' or relatives' property is doing <B>controlled business</B>, which the
        licensing law restricts.
      </P>
      <FactTable
        title="Unfair marketing practices (s. 628.34)"
        rows={[
          { label: 'Misstating policy terms or benefits', value: 'Misrepresentation' },
          { label: 'Misleading ads', value: 'False advertising' },
          { label: 'Anything of value not in the policy as an inducement', value: 'Rebating' },
          { label: 'False statements about another insurer', value: 'Defamation' },
          { label: 'Concerted refusal to deal', value: 'Boycott' },
          { label: 'Threats to force a purchase', value: 'Coercion / intimidation' },
          { label: 'Different rates for the same risk class', value: 'Unfair discrimination' },
        ]}
      />
      <Callout>
        Rebating is judged by what the customer gets, not what it's called. A gift card, a
        split commission, or a free service not in the policy, offered to close the sale, is
        rebating.
      </Callout>

      <H2>Contract law the exam tests</H2>
      <P>
        Under Wisconsin's rule (s. 631.11), a misrepresentation or breach of warranty in an
        application does not defeat coverage unless it was <B>material</B> or made with{' '}
        <B>intent to deceive</B>, or it contributed to the loss. Knowledge an agent gains while
        acting within the scope of the agency is <B>imputed to the insurer</B>. Certificates of
        insurance only <B>evidence</B> coverage. They cannot add insureds or change terms.
        Notices and documents may be delivered <B>electronically</B> when the customer has
        consented.
      </P>

      <H2>Cancellation, nonrenewal, and renewal changes (s. 631.36)</H2>
      <P>
        During a policy's <B>first 60 days</B>, the midterm cancellation limits don't apply.
        After that, an insurer may cancel midterm only for specific reasons: nonpayment,
        material misrepresentation, a substantial change in the risk, a substantial breach of
        contractual duties, or reaching a terminal age. Cancellation isn't effective until at
        least <B>10 days</B> after the notice is mailed or delivered.
      </P>
      <P>
        Nonrenewal requires notice at least <B>60 days</B> before expiration. Renewing on less
        favorable terms generally requires 60 days' notice, but for{' '}
        <B>personal lines property and casualty</B> it is <B>45 days</B>.
      </P>
      <ExamTip>
        Match the number to the action: 10 days for cancellation, 60 days for nonrenewal, 45
        days for worse renewal terms on personal lines. The "first 60 days" is the free window
        for new policies.
      </ExamTip>

      <H2>Federal rules</H2>
      <P>
        The <B>Fair Credit Reporting Act</B> governs consumer and investigative reports. If a
        credit-based insurance score contributes to an adverse action, the consumer must get
        notice. OCI's position is that credit may be one factor, but should not be the{' '}
        <B>sole</B> reason to refuse, cancel a new policy in its first 60 days, or nonrenew.
        Under <B>18 USC 1033</B>, a person convicted of a felony involving dishonesty or breach
        of trust needs the regulator's <B>written consent</B> to work in insurance.
        Embezzlement and false statements to regulators are federal crimes.
      </P>

      <H2>Wisconsin statutes common to property and casualty</H2>
      <List
        items={[
          <>
            <B>Rate standards:</B> rates may not be excessive, inadequate, or unfairly
            discriminatory.
          </>,
          <>
            <B>Prohibited classifications:</B> no risk classification based on race, color,
            creed, or national origin.
          </>,
          <>
            <B>Surplus lines:</B> coverage from nonadmitted insurers, placed through a licensed
            surplus lines agent when the admitted market won't write it. There is generally no
            guaranty fund protection.
          </>,
          <>
            <B>Oral contracts and binders:</B> a producer with authority can bind coverage
            orally. Binders give temporary coverage until the policy is issued, so confirm them
            in writing.
          </>,
        ]}
      />

      <H2>Property-specific Wisconsin rules</H2>
      <P>
        The <B>Wisconsin Insurance Plan (WIP)</B> is the state-mandated property residual
        market, sometimes called a FAIR plan. It offers dwelling, homeowners, and commercial
        policies, <B>all at actual cash value</B>, with maximum limits of $350,000 for
        dwelling or homeowners and $500,000 for commercial. Vacant, farm, and manufacturing
        properties are ineligible. Applicants work through any licensed Wisconsin agent.
      </P>
      <P>
        Wisconsin also limits the use and disclosure of information about{' '}
        <B>domestic abuse</B>. Insurers may not refuse, cancel, or surcharge coverage because
        someone is a victim. Lenders may require adequate coverage and to be named as
        mortgagee, but they cannot force a borrower to buy from a particular insurer or agent.
      </P>

      <H2>Casualty-specific Wisconsin rules</H2>
      <P>
        Auto liability minimums, mandatory uninsured motorist coverage, the financial
        responsibility law, WAIP, and responsibility for minors are covered in the Personal
        Auto module. Worker's compensation rules (who must insure, WCRB, the pool, and the
        Uninsured Employers Fund) are in the Worker's Compensation module.
      </P>
    </>
  )
}
