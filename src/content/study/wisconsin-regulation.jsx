import { Link } from 'react-router-dom'
import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        Insurance Regulation is 35% of the exam — by far the largest section — and this is the
        module where "generic" study guides cost candidates points. Wisconsin's exam tests the
        state's actual numbers and rules, not the multi-state defaults most prep material assumes.
      </p>

      <FactTable
        title="The most-tested Wisconsin numbers"
        rows={[
          { label: 'Life insurance grace period', value: '31 days' },
          { label: 'Free look — individual life', value: '10 days' },
          { label: 'Free look — replacement policies', value: '20–30 days' },
          { label: 'Incontestability period', value: '2 years from issue' },
          { label: 'Prelicensing education', value: '20 hours, within 1 year of testing' },
          { label: 'Exam passing score', value: '70%' },
        ]}
      />
      <p className="mb-5 text-paper">
        Full breakdowns of several of these live in the{' '}
        <Link className="text-gold-400 underline" to="/blog">
          study guides
        </Link>{' '}
        section if you want the reasoning behind a number, not just the number itself.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Who must be licensed</h2>
      <p className="mb-5 text-paper">
        Chapter 628 of the Wisconsin statutes exists to ensure that the people selling insurance
        to the public are competent, trustworthy, and financially accountable. Anyone who
        solicits, negotiates, or places insurance in Wisconsin — the statute calls them{' '}
        <strong className="text-gold-400">intermediaries</strong>, the industry calls them
        producers — must hold a license issued by the Office of the Commissioner of Insurance
        (OCI) for the line of authority they sell. That includes agents acting for insurers,
        brokers acting for applicants, and, under s. 632.69, life settlement brokers and
        providers. People performing purely clerical or administrative work who never solicit or
        negotiate coverage generally do not need a license.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Getting and keeping a license</h2>
      <p className="mb-5 text-paper">
        A resident applicant for a life or accident &amp; health license must complete at least{' '}
        <strong className="text-gold-400">20 hours of commissioner-approved prelicensing
        education no more than one year before testing</strong> (Ins 26.04), bring the
        certificate of completion to the test center, and pass the PSI exam — 100 scored
        questions, a 2-hour limit, and a 70% passing score. After licensure, the ongoing duties
        are what the exam actually tests:
      </p>
      <FactTable
        title="Producer maintenance duties"
        rows={[
          { label: 'Renewal', value: 'Periodic renewal with fee; lapse if not renewed' },
          { label: 'Continuing education', value: 'Required to renew (s. Ins 28)' },
          { label: 'Change of address / phone', value: 'Must be reported to OCI promptly' },
          { label: 'Assumed (trade) name', value: 'Must be registered before use' },
          { label: 'Reporting of actions', value: 'Report criminal charges & other-state discipline' },
          { label: 'Reinstatement', value: 'Available for a limited time after lapse' },
        ]}
      />
      <p className="mb-5 text-paper">
        Producers must also keep records of the insurance business they transact and make them
        available to the commissioner on request. A license is not a one-time credential — it is
        a continuing relationship with the regulator, and every one of the duties above can be
        the subject of its own exam question.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Disciplinary actions</h2>
      <p className="mb-5 text-paper">
        Under s. 628.10, the commissioner may <strong className="text-gold-400">suspend,
        revoke, or refuse to renew</strong> a license for incompetence, untrustworthiness,
        material misrepresentation on the application, violating insurance law, or being the
        subject of formal discipline elsewhere. Monetary forfeitures (fines) under s. 601.64 can
        be imposed instead of, or in addition to, action against the license. The exam tests the
        menu of consequences more than specific dollar amounts: restitution, forfeitures,
        license suspension or revocation, and cease-and-desist orders are all tools the
        commissioner can use, and violations of an order can escalate the penalty.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The commissioner's duties and powers</h2>
      <p className="mb-5 text-paper">
        The commissioner heads OCI and administers the insurance code. Sections 601.41–601.42
        give the commissioner the core toolkit: issue rules and orders, conduct{' '}
        <strong className="text-gold-400">examinations and investigations</strong> of insurers
        and licensees, and compel the production of records and information. Enforcement runs
        through <strong className="text-gold-400">hearings under ch. 227</strong>, Wisconsin's
        administrative procedure chapter — a licensee facing suspension, revocation, or a
        forfeiture is generally entitled to notice and a hearing, and penalties are imposed
        under s. 601.64–.65. What the commissioner does <em>not</em> do matters too: the
        commissioner regulates the business of insurance but does not write policies, set every
        premium, or guarantee any insurer's promises.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The Wisconsin Insurance Security Fund (ch. 646)</h2>
      <p className="mb-5 text-paper">
        If a licensed insurer becomes insolvent, the Wisconsin Insurance Security Fund pays
        covered claims up to statutory limits so policyholders aren't left completely
        uncovered. It is funded by assessments on member insurers, and membership is a condition
        of doing business in the state. Two exam angles recur: the fund is a{' '}
        <strong className="text-gold-400">backstop of last resort</strong>, not a substitute for
        choosing a financially sound insurer, and producers may{' '}
        <strong className="text-gold-400">not use the fund's existence as a sales tool</strong> —
        advertising that a policy is "protected by the Security Fund" is prohibited.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Company regulation</h2>
      <p className="mb-5 text-paper">
        Insurers themselves are regulated for solvency and fair dealing. The recurring pieces:
      </p>
      <FactTable
        title="How Wisconsin regulates insurers"
        rows={[
          { label: 'Solvency', value: 'Financial examinations; reserves; the reason the code exists' },
          { label: 'Policy forms', value: 'Filed with the commissioner before use (s. 631.20)' },
          { label: 'Readability', value: 'Forms must be understandable to an average reader' },
          { label: 'Rates', value: 'May not be inadequate, excessive, or unfairly discriminatory' },
          { label: 'Appointments', value: 'Insurers appoint producers and must report terminations (s. 628.11)' },
          { label: 'Complaint notice', value: 'Insureds must be told of their right to file an OCI complaint' },
        ]}
      />
      <p className="mb-5 text-paper">
        Insurers are also accountable for the conduct of the producers acting on their behalf.
        Under s. 628.40, the <strong className="text-gold-400">knowledge and acts of the agent
        are imputed to the insurer</strong> — if the applicant told the agent something, the
        insurer is treated as knowing it. Unfair claim settlement practices — misrepresenting
        policy provisions, failing to acknowledge or act on claims promptly, forcing insureds to
        sue to recover amounts plainly due — are prohibited, and s. 628.46 requires timely
        payment of claims once liability is clear, with interest owed on overdue payments.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Producer regulation: fiduciary duties and money handling</h2>
      <p className="mb-5 text-paper">
        Premiums a producer collects are not the producer's money. Producers hold client funds
        in a <strong className="text-gold-400">fiduciary capacity</strong>: they must not
        commingle premiums with personal funds, must remit premiums to the insurer promptly, and
        must maintain records at their place of business. Three related statutes make reliable
        exam fodder:
      </p>
      <FactTable
        title="Producer conduct statutes"
        rows={[
          { label: 'Controlled business (s. 628.51)', value: 'A license may not exist mainly to insure yourself/family' },
          { label: 'Shared commissions (s. 628.61)', value: 'Only with persons licensed for that line' },
          { label: 'Exchange of business (s. 628.32)', value: 'Compensation disclosure duties to the customer' },
        ]}
      />
      <p className="mb-5 text-paper">
        The controlled business rule exists because a license is a public credential meant to
        serve the buying public — not a discount mechanism for a producer's own coverage. And
        commission-splitting with an unlicensed person is a violation for{' '}
        <strong className="text-gold-400">both</strong> parties, no matter how the payment is
        labeled.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Unfair marketing practices (s. 628.34)</h2>
      <p className="mb-5 text-paper">
        Wisconsin prohibits a specific set of marketing misconduct, and the exam likes to test
        whether you can tell closely related violations apart:
      </p>
      <FactTable
        title="Unfair marketing practices"
        rows={[
          { label: 'Misrepresentation', value: 'False or misleading statement about a policy or insurer' },
          { label: 'False advertising', value: 'Untrue or deceptive statements in ads or sales material' },
          { label: 'Twisting', value: 'Misrepresentation to induce a policy replacement' },
          { label: 'Churning', value: 'Repeated replacements primarily to generate commissions' },
          { label: 'Rebating', value: 'Offering an unlawful inducement (cash, gifts) to buy' },
          { label: 'Unfair discrimination', value: 'Different rates/terms for insureds of the same class' },
          { label: 'Boycott, coercion, intimidation', value: 'Restraining trade or forcing insurance purchases' },
          { label: 'Defamation', value: 'False statements meant to injure a competing insurer or producer' },
        ]}
      />
      <p className="mb-5 text-paper">
        Note the structure: misrepresentation and false advertising apply to any sale;
        twisting and churning are specifically about replacements; rebating is about
        inducements. Classifying risks differently based on sound actuarial data is{' '}
        <em>not</em> unfair discrimination — charging two members of the{' '}
        <strong className="text-gold-400">same class</strong> different rates is. See the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-twisting-churning-rebating">
          twisting vs. churning vs. rebating
        </Link>{' '}
        breakdown for the detail behind the three most-confused terms.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Replacement rules</h2>
      <p className="mb-5 text-paper">
        When a producer knows or should know a sale will replace an existing life policy or
        annuity, Wisconsin requires specific disclosure to the applicant and notice to the
        existing insurer, giving both the client and the original insurer a chance to evaluate
        whether the replacement actually benefits the policyholder. Replacement isn't illegal —
        undisclosed or misrepresented replacement is. This is the regulatory backdrop for why
        replacement policies get the longer{' '}
        <strong className="text-gold-400">20–30 day free look</strong> window instead of the
        standard 10 days (see the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-free-look-period">
          free look breakdown
        </Link>
        ).
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Disclosure documents: proposal, policy summary, illustrations</h2>
      <p className="mb-5 text-paper">
        Wisconsin's disclosure rules (s. Ins 2.14–2.17 and related provisions) are all aimed at
        one thing: the buyer should understand what they're purchasing before and at delivery.
      </p>
      <FactTable
        title="Life sales disclosure documents"
        rows={[
          { label: 'Buyer’s guide', value: 'Generic education about life insurance types' },
          { label: 'Policy summary / proposal', value: 'The specific policy’s premiums, values, and benefits' },
          { label: 'Illustration', value: 'Projected values — must distinguish guaranteed from non-guaranteed' },
        ]}
      />
      <p className="mb-5 text-paper">
        The illustration rules (s. Ins 2.14, 2.17) are the most heavily tested: an illustration
        must clearly separate <strong className="text-gold-400">guaranteed elements</strong>{' '}
        from non-guaranteed projections, and a producer may not present projected dividends or
        interest as if they were promises.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Annuity suitability (s. 628.347)</h2>
      <p className="mb-5 text-paper">
        Before recommending an annuity, a producer must have{' '}
        <strong className="text-gold-400">reasonable grounds to believe the recommendation is
        suitable</strong> based on the consumer's disclosed financial situation, tax status,
        investment objectives, existing assets, liquidity needs, and time horizon. The insurer
        must maintain a system to supervise recommendations, and producers must complete annuity
        training before selling. Suitability obligations apply with special force to seniors —
        a suitable product for a 35-year-old accumulator can be an unsuitable one for an
        80-year-old who needs liquid funds.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Life settlements and STOLI (s. 632.69)</h2>
      <p className="mb-5 text-paper">
        A life settlement is the sale of an existing policy to a third party for more than its
        cash surrender value but less than its death benefit. Wisconsin licenses life settlement
        brokers and providers, requires disclosures to the selling owner, and prohibits{' '}
        <strong className="text-gold-400">stranger-originated life insurance (STOLI)</strong> —
        arrangements where a policy is manufactured from the start for the benefit of an
        investor with no insurable interest. The distinction the exam wants: a legitimate
        settlement sells a policy that was originally bought in good faith; STOLI is a scheme to
        evade the insurable interest requirement from day one.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Contract clauses the state regulates directly</h2>
      <FactTable
        title="Regulated contract mechanics"
        rows={[
          { label: 'Cancellation / nonrenewal (s. 631.36)', value: 'Requires notice and valid grounds' },
          { label: 'Proof of loss (s. 631.81)', value: 'Late proof doesn’t bar a claim absent prejudice' },
          { label: 'Payment of claims (s. 628.46)', value: 'Prompt payment; interest on overdue claims' },
          { label: 'Privacy (s. 610.70)', value: 'Limits use/disclosure of personal medical information' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Federal regulation: FCRA and 18 USC 1033</h2>
      <p className="mb-5 text-paper">
        Two federal laws appear in the regulation section of both Wisconsin exams. The{' '}
        <strong className="text-gold-400">Fair Credit Reporting Act (FCRA)</strong> governs
        consumer reports and investigative consumer reports used in underwriting: the applicant
        must be notified that a report may be obtained, may request the nature and scope of an
        investigative report, and has the right to know why coverage was declined based on a
        report and to dispute inaccurate information. Under{' '}
        <strong className="text-gold-400">18 USC 1033 and 1034</strong> (the federal fraud and
        false statements act), it is a federal crime for anyone convicted of a felony involving
        dishonesty or breach of trust to work in the business of insurance without written
        consent from the state regulator — and a federal crime to make false statements or
        embezzle in connection with insurance transactions affecting interstate commerce.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Interstate insurance product regulation compact (s. 601.58)</h2>
      <p className="mb-5 text-paper">
        Wisconsin participates in the interstate compact, a multi-state agreement that creates a
        single point of filing and uniform national standards for life insurance, annuity,
        disability income, and long-term care products. An insurer can file a product once with
        the compact commission and, on approval, sell it in member states — instead of filing
        separately in every state. The exam tests the concept: uniform standards, central
        review, member states retain their market conduct enforcement.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Whenever a question says "in Wisconsin," assume the generic multi-state number is the
        wrong answer choice on purpose.
      </blockquote>
    </>
  )
}
