import { Link } from 'react-router-dom'
import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        Policy provisions are the standardized clauses that define what a life insurance contract
        actually promises — and at 14% of the exam, this is the largest product section on the
        Life test. Wisconsin attaches specific numbers to several provisions that generic
        multi-state study guides gloss over.
      </p>

      <FactTable
        title="Wisconsin's timing provisions"
        rows={[
          { label: 'Grace period', value: '31 days' },
          { label: 'Free look — individual life', value: '10 days' },
          { label: 'Free look — replacement policies', value: '20–30 days' },
          { label: 'Incontestability period', value: '2 years from issue' },
        ]}
      />

      <p className="mb-5 text-paper">
        These are covered in depth in the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-life-insurance-grace-period">
          grace period
        </Link>
        ,{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-free-look-period">
          free look period
        </Link>
        , and{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-incontestability-period">
          incontestability period
        </Link>{' '}
        breakdowns — worth reading alongside this lesson.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Ownership, assignment, and the entire contract</h2>
      <p className="mb-5 text-paper">
        The <strong className="text-gold-400">policyowner</strong> — who may or may not be the
        insured — holds every contractual right: naming beneficiaries, taking loans, choosing
        dividend and nonforfeiture options, assigning the policy. Under the{' '}
        <strong className="text-gold-400">assignment</strong> provision, the owner can transfer
        rights without the insurer's permission (though the insurer must be notified): an{' '}
        <strong className="text-gold-400">absolute assignment</strong> transfers all ownership
        rights permanently, while a <strong className="text-gold-400">collateral
        assignment</strong> pledges the policy as loan security — the lender's interest is
        limited to the debt, and the remaining benefit still goes to the beneficiary. The{' '}
        <strong className="text-gold-400">entire contract</strong> provision says the policy plus
        the attached application make up the whole agreement — nothing outside it (including an
        agent's verbal promises) counts, and only an officer of the insurer can modify the
        contract. Producers cannot change or waive policy provisions.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Premiums, grace period, and reinstatement</h2>
      <p className="mb-5 text-paper">
        Premiums are payable in advance, and the 31-day grace period keeps coverage in force
        while a premium is late — if the insured dies during the grace period, the claim is paid
        minus the overdue premium. If a policy does lapse for nonpayment,{' '}
        <strong className="text-gold-400">reinstatement</strong> lets the policyholder bring it
        back without starting over, typically by applying within a set window, providing
        evidence of insurability, and paying all back premiums (often with interest). The
        reinstated policy keeps its original issue date for most purposes, but the contestability
        clause generally restarts from the reinstatement date. Why reinstate rather than buy a
        new policy? The old policy's original age-based premium rate — usually cheaper than
        anything the insured could buy today.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Incontestability, misstatement of age, and exclusions</h2>
      <p className="mb-5 text-paper">
        After the 2-year contestability period, the insurer can no longer void the policy or
        deny a claim based on misstatements in the application. One important exception the exam
        loves: <strong className="text-gold-400">misstatement of age or gender</strong> is never
        "forgiven" — instead, at any time, the insurer simply adjusts the benefit to what the
        premium would have purchased at the correct age or gender. The{' '}
        <strong className="text-gold-400">suicide exclusion</strong> (commonly the policy's
        first two years) limits the insurer's liability to a refund of premiums paid; after the
        exclusion period, suicide is covered. Policies may also exclude war, aviation (other
        than fare-paying passenger), and hazardous occupations or hobbies. Certain provisions
        are prohibited outright — including backdating a policy further than allowed simply to
        manufacture a lower issue age, and any provision less favorable than statute requires.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Beneficiary designations</h2>
      <p className="mb-5 text-paper">
        A <strong className="text-gold-400">primary</strong> beneficiary is first in line for the
        death benefit; a <strong className="text-gold-400">contingent</strong> (secondary)
        beneficiary collects only if no primary survives the insured; if no beneficiary exists,
        the proceeds go to the insured's <strong className="text-gold-400">estate</strong> —
        where they become subject to probate and creditors, which is exactly what naming
        beneficiaries avoids. Designations can name individuals, classes ("all my children" —
        divided <em>per capita</em> equally among survivors, or <em>per stirpes</em> with a
        deceased child's share passing to their descendants), trusts, or minors — though paying a
        minor directly is a problem, which is why proceeds for minors are typically routed
        through a guardian or trust.
      </p>
      <FactTable
        title="Beneficiary-related clauses"
        rows={[
          { label: 'Revocable', value: 'Owner may change at any time, no consent needed' },
          { label: 'Irrevocable', value: 'Consent required to change — or to take loans/surrender' },
          { label: 'Common disaster clause', value: 'Insured deemed to survive the beneficiary' },
          { label: 'Spendthrift clause', value: 'Shields proceeds from beneficiary’s creditors' },
          { label: 'Revocation at divorce', value: 'Divorce can revoke an ex-spouse designation by law' },
        ]}
      />
      <p className="mb-5 text-paper">
        The common disaster (simultaneous death) clause exists for one scenario: the insured and
        primary beneficiary die in the same accident and order of death is unclear. Presuming
        the beneficiary died first sends the proceeds to the contingent beneficiary rather than
        through the primary beneficiary's estate — honoring the owner's likely intent.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Settlement options</h2>
      <p className="mb-5 text-paper">
        Settlement options control <em>how</em> the death benefit is paid out. The owner can
        elect one in advance, or the beneficiary can choose at claim time if none was locked in.
      </p>
      <FactTable
        title="Settlement options"
        rows={[
          { label: 'Cash (lump sum)', value: 'Default — entire benefit at once, income-tax free' },
          { label: 'Interest only', value: 'Insurer holds principal, pays interest (taxable)' },
          { label: 'Fixed-period installments', value: 'Payments for a chosen number of years' },
          { label: 'Fixed-amount installments', value: 'Chosen payment amount until funds run out' },
          { label: 'Life income — single life', value: 'Payments for the beneficiary’s lifetime' },
          { label: 'Life income — joint & survivor', value: 'Continues for two lives' },
        ]}
      />
      <p className="mb-5 text-paper">
        The classic discriminator: fixed-<strong className="text-gold-400">period</strong> fixes
        the time and lets the payment amount vary; fixed-
        <strong className="text-gold-400">amount</strong> fixes the payment and lets the duration
        vary. Life income options guarantee payments for life but risk leaving nothing for heirs
        if the beneficiary dies early — the same trade-offs as annuity payout options.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Nonforfeiture options</h2>
      <p className="mb-5 text-paper">
        Nonforfeiture options protect the cash value a permanent policyholder has built up if
        they stop paying premiums — the value belongs to the owner and can't be forfeited to the
        insurer:
      </p>
      <FactTable
        title="Nonforfeiture options"
        rows={[
          { label: 'Cash surrender', value: 'Take the cash value as a lump sum; coverage ends' },
          { label: 'Reduced paid-up insurance', value: 'Smaller death benefit, no more premiums due' },
          { label: 'Extended term insurance', value: 'Full death benefit for a limited term, no more premiums' },
        ]}
      />
      <p className="mb-5 text-paper">
        Extended term is typically the automatic option if the owner makes no election. Keep the
        contrast straight: reduced paid-up shrinks the{' '}
        <strong className="text-gold-400">amount</strong> but keeps permanent coverage; extended
        term keeps the full <strong className="text-gold-400">face amount</strong> but only for
        a limited time.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Policy loans and withdrawals</h2>
      <p className="mb-5 text-paper">
        Permanent policies let the owner borrow against cash value at a stated interest rate. An
        outstanding loan (plus accrued interest) reduces the death benefit and the cash
        surrender value dollar for dollar if never repaid — it is not "free money," and a large
        enough unpaid loan can cause the policy to lapse. The{' '}
        <strong className="text-gold-400">automatic premium loan</strong> provision, if elected,
        pays an overdue premium from cash value automatically at the end of the grace period —
        preventing unintentional lapse. Universal life policies additionally allow{' '}
        <strong className="text-gold-400">withdrawals (partial surrenders)</strong>, which
        permanently remove cash value and reduce the death benefit rather than creating a loan
        to repay.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Dividend options</h2>
      <p className="mb-5 text-paper">
        Participating policies may pay dividends — a non-guaranteed return of premium when the
        insurer's mortality, interest, and expense experience beats its assumptions. The owner
        chooses what to do with them:
      </p>
      <FactTable
        title="Dividend options"
        rows={[
          { label: 'Cash payment', value: 'Check to the policyowner' },
          { label: 'Premium reduction', value: 'Dividend applied against the next premium' },
          { label: 'Accumulate at interest', value: 'Left with insurer; the interest is taxable' },
          { label: 'Paid-up additions', value: 'Buys small blocks of additional paid-up coverage' },
          { label: 'One-year term', value: 'Buys as much 1-year term coverage as it can' },
        ]}
      />
      <p className="mb-5 text-paper">
        Dividends themselves are a tax-free return of overcharged premium; only the interest
        earned on accumulated dividends is taxable. Paid-up additions and the one-year term
        option are the two that <strong className="text-gold-400">increase total coverage</strong>{' '}
        without new evidence of insurability.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Disability riders</h2>
      <FactTable
        title="Disability riders"
        rows={[
          { label: 'Waiver of premium', value: 'Premiums waived while the insured is totally disabled' },
          { label: 'Waiver of cost of insurance', value: 'UL version — waives the monthly deduction only' },
          { label: 'Disability income rider', value: 'Pays a monthly income if the insured is disabled' },
          { label: 'Payor benefit', value: 'Juvenile policy — waives premium if the paying parent dies or is disabled' },
        ]}
      />
      <p className="mb-5 text-paper">
        Waiver of premium usually requires the disability to last through a waiting period before
        premiums are waived retroactively. The payor benefit is the one attached to{' '}
        <strong className="text-gold-400">juvenile</strong> policies: the child is the insured,
        but the rider covers the premium-paying adult.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Accelerated benefits and the LTC rider</h2>
      <p className="mb-5 text-paper">
        An <strong className="text-gold-400">accelerated (living) benefit</strong> provision
        advances part of the death benefit while the insured is alive after a qualifying event —
        terminal illness, certain chronic or catastrophic conditions, or permanent nursing home
        confinement. The insurer must disclose the effect: whatever is advanced (plus any
        charges) <strong className="text-gold-400">reduces the death benefit</strong> the
        beneficiary ultimately receives. A <strong className="text-gold-400">long-term care
        rider</strong> works similarly, drawing down the death benefit to pay LTC expenses —
        letting one policy do double duty.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Riders covering additional insureds</h2>
      <p className="mb-5 text-paper">
        Term riders can extend coverage to people other than the base insured:{' '}
        <strong className="text-gold-400">spouse/other-insured term riders</strong> add level
        term on a spouse, <strong className="text-gold-400">children's term riders</strong>{' '}
        cover all eligible children for one premium regardless of how many (usually convertible
        to permanent coverage without evidence of insurability when the child ages out), and a{' '}
        <strong className="text-gold-400">family term rider</strong> bundles both onto one
        policy.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Riders affecting the death benefit</h2>
      <FactTable
        title="Death-benefit riders"
        rows={[
          { label: 'Accidental death', value: 'Extra payout for accidental death ("double indemnity")' },
          { label: 'Guaranteed insurability', value: 'Buy more coverage at set dates/events, no new underwriting' },
          { label: 'Cost of living', value: 'Face amount adjusts with inflation (CPI)' },
          { label: 'Return of premium', value: 'Pays death benefit plus premiums paid, via added term coverage' },
        ]}
      />
      <p className="mb-5 text-paper">
        Accidental death riders pay only if death is accidental and occurs within a stated time
        after the accident — they typically expire at an advanced age and add nothing to cash
        value. Guaranteed insurability lets a young insured lock in future purchase options at
        standard rates at specified ages or life events (marriage, birth of a child) — the
        rider the exam pairs with "no new proof of insurability."
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Exam traps usually hide in the details: which nonforfeiture option keeps the full face
        amount (extended term), which dividend option triggers tax (interest on accumulations),
        and which beneficiary type needs consent to change (irrevocable).
      </blockquote>
    </>
  )
}
