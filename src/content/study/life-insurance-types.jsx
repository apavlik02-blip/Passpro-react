import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        Every life insurance product on the exam is either <strong className="text-gold-400">temporary</strong> or{' '}
        <strong className="text-gold-400">permanent</strong>. Get that split right first, and the
        differences between term, whole, universal, and variable life stop feeling like a list to
        memorize and start feeling like variations on two ideas.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Why people buy life insurance</h2>
      <p className="mb-5 text-paper">
        The outline's list of personal uses maps to real planning problems:{' '}
        <strong className="text-gold-400">survivor protection</strong> (replacing a
        breadwinner's income), <strong className="text-gold-400">estate creation</strong>{' '}
        (instantly creating an estate for heirs the moment the first premium is paid),{' '}
        <strong className="text-gold-400">estate conservation</strong> (providing cash to pay
        estate taxes and settlement costs so assets don't have to be sold),{' '}
        <strong className="text-gold-400">cash accumulation</strong>, and{' '}
        <strong className="text-gold-400">liquidity</strong> — the death benefit arrives as
        cash, promptly, outside probate when a beneficiary is named.
      </p>
      <p className="mb-5 text-paper">
        Two methods size the need. The <strong className="text-gold-400">human life value
        approach</strong> measures the income the insured would have earned for the family over
        a working lifetime, discounted to present value. The{' '}
        <strong className="text-gold-400">needs approach</strong> instead adds up what the
        family would actually require: lump-sum needs (final expenses, debt payoff, mortgage,
        education funds, an emergency reserve) plus ongoing income needs for the dependency
        period. The needs approach is the one that involves gathering detailed information
        about the family's situation — that phrasing is how the exam signals it.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Classes of life insurance</h2>
      <FactTable
        title="Classification pairs"
        rows={[
          { label: 'Group vs. individual', value: 'Master contract & certificates vs. personal policy' },
          { label: 'Ordinary vs. industrial', value: 'Standard policies vs. small home-service policies' },
          { label: 'Permanent vs. term', value: 'Lifetime coverage with cash value vs. temporary' },
          { label: 'Participating vs. nonpar', value: 'Dividend-paying vs. no dividends (s. 632.62)' },
          { label: 'Fixed vs. variable', value: 'General account guarantees vs. separate account risk' },
        ]}
      />
      <p className="mb-5 text-paper">
        Variable products deserve one extra note: because the policyowner bears investment risk
        through separate-account subaccounts, variable life and variable annuities are
        regulated as <strong className="text-gold-400">securities as well as insurance</strong> —
        selling them (or recommending termination of one) requires a securities registration on
        top of the state life license.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Term life: temporary, no cash value</h2>
      <p className="mb-5 text-paper">
        Term insurance covers a specific period and pays a death benefit only if the insured
        dies during that term. There's no cash value; every premium dollar pays for pure death
        protection, which is why term is the cheapest way to buy a large amount of coverage.
        The exam expects you to know the shapes:
      </p>
      <FactTable
        title="Term varieties"
        rows={[
          { label: 'Annual renewable term', value: 'Level face amount; premium rises each year' },
          { label: 'Level premium term', value: 'Face amount and premium level for 10/20/30 years' },
          { label: 'Decreasing term', value: 'Face amount falls; classic mortgage protection' },
          { label: 'Increasing term', value: 'Face amount grows; used in return-of-premium riders' },
        ]}
      />
      <p className="mb-5 text-paper">
        Two features make term flexible: <strong className="text-gold-400">renewability</strong>{' '}
        (continue coverage at the end of the term without new proof of insurability, at a higher
        attained-age premium) and <strong className="text-gold-400">convertibility</strong>{' '}
        (exchange the term policy for a permanent one without evidence of insurability). Both
        exist to protect an insured whose health has deteriorated.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Whole life: permanent, guaranteed</h2>
      <p className="mb-5 text-paper">
        Whole life covers the insured for their entire life, endows at the policy's maturity
        age, and builds guaranteed cash value on a fixed schedule at a level premium. The
        insurer bears the investment risk — which is exactly why whole life costs more than term
        for the same face amount. The premium-payment variations:
      </p>
      <FactTable
        title="Whole life varieties"
        rows={[
          { label: 'Continuous premium (straight life)', value: 'Premiums for life; lowest annual outlay' },
          { label: 'Limited payment', value: 'Premiums for a set period (20-pay, paid-up at 65)' },
          { label: 'Single premium', value: 'One lump sum; immediately funded cash value' },
        ]}
      />
      <p className="mb-5 text-paper">
        Same lifetime coverage in each case — only the payment schedule compresses. The shorter
        the paying period, the higher each premium and the faster cash value grows. (A
        single-premium policy is also, by definition, a Modified Endowment Contract for tax
        purposes — see the annuities &amp; taxation module.)
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Flexible-premium policies: adjustable and universal life</h2>
      <p className="mb-5 text-paper">
        <strong className="text-gold-400">Adjustable life</strong> lets the owner change the
        policy itself over time — raise or lower the premium, face amount, or protection period,
        effectively moving between term-like and whole-life-like configurations.{' '}
        <strong className="text-gold-400">Universal life</strong> goes further and unbundles the
        policy into a visible monthly cost-of-insurance charge and a cash value account that
        earns current interest (with a guaranteed minimum). The owner may pay more, less, or
        skip premiums entirely as long as cash value covers the deductions. UL also offers two
        death benefit options: <strong className="text-gold-400">Option A</strong> (level — cash
        value builds inside a level face amount) and{' '}
        <strong className="text-gold-400">Option B</strong> (increasing — death benefit equals
        face amount plus cash value, for a higher cost).
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Variable life: permanent, market-driven</h2>
      <p className="mb-5 text-paper">
        Variable life puts the cash value into separate-account subaccounts the policyholder
        chooses, so cash value — and, above a guaranteed minimum, the death benefit — can rise
        or fall with market performance. The investment risk sits with the policyowner, not the
        insurer, and the separate account is insulated from the insurer's general creditors.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Specialized and joint policies</h2>
      <p className="mb-5 text-paper">
        <strong className="text-gold-400">Joint life (first-to-die)</strong> covers two or more
        people and pays on the <em>first</em> death — useful for business partners or a couple
        who need funds when either dies. <strong className="text-gold-400">Juvenile
        life</strong> insures a minor, with an adult applicant-owner paying the premium; the
        payor benefit rider (covered in the provisions module) waives premiums if that adult
        dies or becomes disabled.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Group life insurance</h2>
      <p className="mb-5 text-paper">
        Group life covers members of an eligible group — usually employees — under a master
        contract, with each member holding a certificate. Underwriting evaluates the{' '}
        <strong className="text-gold-400">group</strong>, not the individuals: no medical exams,
        benefits set by a formula (like a multiple of salary) to prevent selection against the
        insurer, and the group must exist for a purpose other than buying insurance. When
        coverage ends, a member typically has a{' '}
        <strong className="text-gold-400">conversion right</strong> to an individual permanent
        policy without evidence of insurability, priced at their attained age.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Premiums: what sets the price</h2>
      <FactTable
        title="Premium factors"
        rows={[
          { label: 'Mortality', value: 'Expected death rates — the cost of claims' },
          { label: 'Interest', value: 'Investment earnings — credited against the cost' },
          { label: 'Expense', value: 'The insurer’s cost of doing business ("loading")' },
        ]}
      />
      <p className="mb-5 text-paper">
        The <strong className="text-gold-400">net single premium</strong> is the actuarial
        baseline — mortality cost offset by interest, ignoring expenses. Add the expense
        loading and spread it over a payment schedule and you get the{' '}
        <strong className="text-gold-400">gross annual premium</strong> the policyholder
        actually pays. Payment mode matters too: paying more frequently than annually costs
        more in total, because the insurer loses investment earnings and adds billing costs.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Underwriting: from application to risk class</h2>
      <p className="mb-5 text-paper">
        The insurer's underwriters build a picture of the risk from defined sources: the{' '}
        <strong className="text-gold-400">application</strong> (the primary source), the
        producer's report, an <strong className="text-gold-400">attending physician
        statement</strong>, investigative consumer reports (FCRA notice required), medical
        exams and lab tests — HIV testing only with specific informed consent under Wisconsin
        law (s. 631.90) — and the{' '}
        <strong className="text-gold-400">Medical Information Bureau (MIB)</strong>, a
        member-insurer databank of prior underwriting findings that flags discrepancies but
        cannot by itself justify a decline. Selection criteria must be actuarially justified;
        unfair discrimination within a class is prohibited.
      </p>
      <FactTable
        title="Risk classifications"
        rows={[
          { label: 'Preferred', value: 'Better-than-average risk; lowest rates' },
          { label: 'Standard', value: 'Average risk; standard rates' },
          { label: 'Substandard', value: 'Higher risk; rated-up premium or exclusions' },
          { label: 'Declined', value: 'Risk the insurer will not accept at any price' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Delivery and the effective date</h2>
      <p className="mb-5 text-paper">
        If the applicant paid the first premium with the application, coverage generally takes
        effect per the conditional receipt once the applicant is found insurable. If no premium
        accompanied the application, the producer must collect it at delivery and obtain a{' '}
        <strong className="text-gold-400">statement of good health</strong> confirming the
        insured's health hasn't changed since the application — coverage isn't in force until
        then. Delivering the policy promptly and reviewing it with the client are part of the
        producer's duties, and the free look clock starts at delivery.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        If a question describes market risk transferring to the policyholder, it's variable. If
        it describes payment flexibility with a visible cost-of-insurance charge, it's
        universal.
      </blockquote>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Matching products to suitability questions</h2>
      <p className="mb-5 text-paper">
        Exam scenarios usually describe a client's situation and ask which product fits. A young
        family needing maximum coverage on a tight budget points to term. A client wanting
        guaranteed lifetime coverage and predictable cash value points to whole life. A client
        who wants to skip or reduce a payment in a lean year points to universal life. A client
        comfortable with investment risk in exchange for growth potential points to variable
        life. Mortgage protection points to decreasing term; business partners funding a
        buy-sell on the first death point to joint life.
      </p>
    </>
  )
}
