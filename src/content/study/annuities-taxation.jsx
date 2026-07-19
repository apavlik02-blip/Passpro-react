import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        An annuity is the mirror image of life insurance: life insurance protects against dying
        too soon, an annuity protects against{' '}
        <strong className="text-gold-400">outliving your money</strong>. That framing answers
        most exam questions about why annuities exist — and this module also carries the federal
        tax section for both life insurance and annuities.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The three parties and two phases</h2>
      <p className="mb-5 text-paper">
        Every annuity has an <strong className="text-gold-400">owner</strong> (holds all
        contract rights and pays premiums), an{' '}
        <strong className="text-gold-400">annuitant</strong> (the measuring life whose age and
        longevity determine payments), and a{' '}
        <strong className="text-gold-400">beneficiary</strong> (receives any death benefit).
        Often one person fills the first two roles, but they can be split. During the{' '}
        <strong className="text-gold-400">accumulation phase</strong>, the owner pays premiums
        (single or flexible) and value grows tax-deferred; during the{' '}
        <strong className="text-gold-400">annuitization (payout) phase</strong>, the value
        converts into an income stream. Annuitization is optional — and generally irrevocable
        once elected.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Immediate vs. deferred</h2>
      <p className="mb-5 text-paper">
        A <strong className="text-gold-400">single premium immediate annuity (SPIA)</strong> is
        bought with one lump sum and begins paying within about a year — it skips accumulation
        almost entirely. A <strong className="text-gold-400">deferred annuity</strong>{' '}
        accumulates for years before payout. Deferred contracts carry the features the exam
        tests: flexible or single premium funding,{' '}
        <strong className="text-gold-400">surrender charges</strong> that decline over a set
        schedule (with most contracts allowing a modest annual free-withdrawal percentage),
        nonforfeiture value the owner keeps if the contract is surrendered, and a{' '}
        <strong className="text-gold-400">death benefit</strong> during accumulation — if the
        owner dies before annuitizing, the beneficiary receives at least the premiums paid or
        the current value, bypassing probate.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Fixed, indexed, and variable products</h2>
      <FactTable
        title="Annuity product spectrum"
        rows={[
          { label: 'Fixed', value: 'General account; guaranteed minimum + current interest rate' },
          { label: 'Indexed', value: 'Return linked to an index, with a guaranteed floor' },
          { label: 'Market value adjusted', value: 'Early surrender value adjusts with interest rates' },
          { label: 'Variable', value: 'Separate account subaccounts; owner bears market risk' },
        ]}
      />
      <p className="mb-5 text-paper">
        A fixed annuity credits the <strong className="text-gold-400">current rate</strong> the
        insurer declares, never less than the contract's{' '}
        <strong className="text-gold-400">guaranteed minimum</strong>, and pays a level benefit
        from the insurer's general account. Variable annuities shift investment risk to the
        owner and are securities — selling them requires a securities license on top of the
        insurance license. <strong className="text-gold-400">Guaranteed living benefit
        riders</strong> graft guarantees back onto variable contracts for a fee: guaranteed
        minimum income, withdrawal, or accumulation benefits that hold up even if the
        subaccounts underperform.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Payout options</h2>
      <FactTable
        title="Annuity payment options"
        rows={[
          { label: 'Pure life (life only)', value: 'Highest payment; stops at death, nothing to heirs' },
          { label: 'Life with period certain', value: 'Life income, minimum years guaranteed to beneficiary' },
          { label: 'Life with refund', value: 'Guarantees at least the purchase amount comes back' },
          { label: 'Joint and survivor', value: 'Continues (often reduced) for a second annuitant' },
          { label: 'Annuities certain', value: 'Fixed period or fixed amount — no life contingency' },
        ]}
      />
      <p className="mb-5 text-paper">
        The pattern to internalize: every guarantee added to a life-contingent option lowers the
        periodic payment, because the insurer's expected payout window gets longer. Pure life
        pays the most per month precisely because the insurer keeps everything if the annuitant
        dies early; annuities certain drop the life contingency entirely and simply liquidate a
        sum over a period or amount.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Uses of annuities</h2>
      <p className="mb-5 text-paper">
        Beyond retirement income, the outline's list: structuring{' '}
        <strong className="text-gold-400">lump-sum settlements</strong> (lawsuit awards,
        inheritances, life insurance proceeds) into income; funding qualified retirement plans
        with group or individual annuities; individual retirement annuities (the annuity form
        of an IRA); tax-deferred growth for savers who've maxed other vehicles; education
        funding; and long-term care riders that let annuity value pay LTC expenses. When an
        annuity funds a qualified plan, remember the tax deferral comes from the{' '}
        <strong className="text-gold-400">plan</strong>, not the annuity — the annuity is chosen
        there for its guarantees, not a second layer of deferral.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Taxation of life insurance</h2>
      <FactTable
        title="Life insurance tax treatment"
        rows={[
          { label: 'Premiums', value: 'Not deductible (personal expense)' },
          { label: 'Cash value growth', value: 'Tax-deferred while inside the policy' },
          { label: 'Dividends', value: 'Tax-free return of premium; interest on them is taxable' },
          { label: 'Policy loans', value: 'Not taxable while the policy stays in force' },
          { label: 'Surrender', value: 'Gain above cost basis taxed as ordinary income' },
          { label: 'Death benefit', value: 'Income-tax free to the beneficiary (lump sum)' },
        ]}
      />
      <p className="mb-5 text-paper">
        Two nuances the exam loves: under a settlement option, the{' '}
        <strong className="text-gold-400">interest portion</strong> of installment payments is
        taxable even though the underlying death benefit is not; and the death benefit is
        included in the insured's <strong className="text-gold-400">estate</strong> for estate
        tax purposes if the insured held any incidents of ownership at death (or payable to the
        estate) — income-tax free and estate-tax free are different questions.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Modified endowment contracts (MECs)</h2>
      <p className="mb-5 text-paper">
        A life policy that fails the <strong className="text-gold-400">seven-pay test</strong> —
        funded faster than seven level annual premiums would fund it — becomes a MEC
        permanently. A MEC is still life insurance (death benefit stays income-tax free), but
        lifetime distributions are taxed like an annuity:{' '}
        <strong className="text-gold-400">LIFO</strong>, gains out first, plus a 10% penalty on
        the taxable portion before age 59½. Once a MEC, always a MEC — including for contracts
        received in exchange for a MEC.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Taxation of nonqualified annuities</h2>
      <p className="mb-5 text-paper">
        Nonqualified annuities are funded with after-tax dollars, so only growth is taxable.
        During accumulation, <strong className="text-gold-400">withdrawals are LIFO</strong> —
        gains come out first as ordinary income, with a 10% penalty on the taxable portion
        before age 59½ (exceptions for death and disability). Once annuitized, the{' '}
        <strong className="text-gold-400">exclusion ratio</strong> splits each payment: the
        investment in the contract divided by expected total payout is the tax-free fraction;
        the rest is taxable. At death, remaining value goes to the beneficiary — taxable to the
        extent of untaxed gain, and included in the deceased owner's estate. Note there is no
        step-up in basis for annuities, unlike many inherited investments.{' '}
        <strong className="text-gold-400">Corporate-owned</strong> annuities generally lose
        tax deferral entirely — deferral is a benefit reserved for natural persons.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Section 1035 exchanges</h2>
      <FactTable
        title="Tax-free 1035 exchange directions"
        rows={[
          { label: 'Life → life', value: 'Allowed' },
          { label: 'Life → annuity', value: 'Allowed' },
          { label: 'Annuity → annuity', value: 'Allowed' },
          { label: 'Annuity → life', value: 'NOT allowed — gain would escape tax' },
        ]}
      />
      <p className="mb-5 text-paper">
        A 1035 exchange moves value between contracts without recognizing gain, carrying the
        old cost basis into the new contract. The one-way-door logic: you can move{' '}
        <em>toward</em> the product with less favorable tax treatment (annuity), never back
        toward the death-benefit tax shelter of life insurance.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Annuities defer taxes, they don't eliminate them — the exclusion ratio just decides when
        the growth gets taxed.
      </blockquote>
    </>
  )
}
