import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        Disability income and long-term care insurance both step in when someone can't work or
        can't function independently — but they're triggered by very different definitions, and
        together they account for 16% of the A&amp;H exam. The exam tests those definitions
        precisely.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Qualifying for disability benefits</h2>
      <FactTable
        title="Disability definitions"
        rows={[
          { label: 'Own-occupation', value: "Can't perform the duties of their own occupation" },
          { label: 'Any-occupation', value: "Can't perform any occupation suited by training/experience" },
          { label: 'Presumptive disability', value: 'Sight, hearing, speech, or two limbs — automatic total' },
          { label: 'Recurrent disability', value: 'Relapse within a set window — no new elimination period' },
          { label: 'Residual disability', value: 'Pays the percentage of income actually lost' },
        ]}
      />
      <p className="mb-5 text-paper">
        A surgeon who loses fine motor control could be totally disabled under an{' '}
        <strong className="text-gold-400">own-occupation</strong> definition (can't operate)
        while still employable elsewhere — an any-occupation policy might not pay in the same
        scenario, which is why own-occ costs more.{' '}
        <strong className="text-gold-400">Presumptive disability</strong> provisions pay total
        benefits automatically for catastrophic losses (sight, speech, hearing, use of two
        limbs) even if the person can still work. Policies also generally require the insured
        to be under a physician's regular care, and{' '}
        <strong className="text-gold-400">income replacement contracts</strong> define the loss
        by lost earnings rather than by occupational duties.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The individual policy's moving parts</h2>
      <p className="mb-5 text-paper">
        A basic plan pays a flat <strong className="text-gold-400">monthly indemnity</strong>{' '}
        while the insured is totally disabled. Three time periods control when and how long:
        the <strong className="text-gold-400">probationary period</strong> (a one-time window
        after issue during which sickness isn't covered — weeds out preexisting illness), the{' '}
        <strong className="text-gold-400">elimination period</strong> (a deductible measured in
        time — the wait between disability onset and benefit start, not paid retroactively),
        and the <strong className="text-gold-400">benefit period</strong> (how long payments
        continue — 2 years, 5 years, or to a stated retirement age). Longer elimination periods
        and shorter benefit periods both lower the premium; the exam likes to test that
        trade-off directly. Most individual policies include a{' '}
        <strong className="text-gold-400">waiver of premium</strong> once disability lasts long
        enough.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Riders and at-work benefits</h2>
      <FactTable
        title="Disability income riders and features"
        rows={[
          { label: 'Partial disability', value: 'Flat reduced benefit while working part-time' },
          { label: 'Residual disability', value: 'Benefit proportional to earnings actually lost' },
          { label: 'COLA rider', value: 'Benefits rise with inflation during a claim' },
          { label: 'Future increase option (FIO)', value: 'Buy more coverage later, no new medical underwriting' },
          { label: 'Social insurance supplement (SIS)', value: 'Pays while Social Security is pending/denied' },
          { label: 'Additional monthly benefit (AMB)', value: 'Extra early-claim benefit before social insurance starts' },
          { label: 'Return of premium', value: 'Refunds premiums if claims stay low — costly extra' },
        ]}
      />
      <p className="mb-5 text-paper">
        The SIS and AMB riders exist because Social Security disability is slow and hard to
        qualify for — they bridge the gap, then reduce or stop if government benefits begin.
        Policies may be written on an <strong className="text-gold-400">occupational</strong>{' '}
        or <strong className="text-gold-400">nonoccupational</strong> basis; nonoccupational
        policies exclude work injuries because workers compensation already covers them. Other
        cash benefits can include accidental death &amp; dismemberment, rehabilitation
        benefits, and medical reimbursement for nondisabling injuries. The{' '}
        <strong className="text-gold-400">relation of earnings to insurance</strong> provision
        scales benefits down if total coverage exceeds actual earnings — you can't profit from
        disability.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Underwriting and issuance alternatives</h2>
      <p className="mb-5 text-paper">
        Disability underwriting is occupation-driven: class, duties, and income set both the
        rate and the <strong className="text-gold-400">benefit limit</strong> — insurers cap
        benefits at a percentage of earned income so working always pays more than claiming.
        When a risk isn't standard, the insurer's options mirror life underwriting: issue rated
        up, issue with an exclusion rider (for a known condition), or decline.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Group disability and social insurance</h2>
      <FactTable
        title="Group vs. social coverage"
        rows={[
          { label: 'Short-term disability (STD)', value: 'Weeks to months; short elimination period' },
          { label: 'Long-term disability (LTD)', value: 'Extended benefit periods, after STD ends' },
          { label: 'Group benefit basis', value: 'Percentage of earnings, capped' },
          { label: 'Social Security definition', value: 'Unable to engage in any substantial gainful activity' },
          { label: 'Social Security duration test', value: 'Expected to last 12 months or result in death' },
          { label: 'Social Security waiting period', value: '5 months' },
        ]}
      />
      <p className="mb-5 text-paper">
        Group plans coordinate with workers compensation and social insurance — group LTD
        benefits are typically reduced by what those programs pay, preventing stacked recovery.
        Social Security disability is the hardest definition to meet on the exam:{' '}
        <strong className="text-gold-400">any</strong> substantial gainful activity, expected to
        last at least 12 months or end in death, plus a 5-month waiting period and work-credit
        requirements.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Long-term care: levels of care</h2>
      <FactTable
        title="LTC levels of care"
        rows={[
          { label: 'Skilled care', value: 'Daily nursing/rehab, physician-ordered, licensed staff' },
          { label: 'Intermediate care', value: 'Occasional nursing care, not daily' },
          { label: 'Custodial care', value: 'Help with ADLs — no medical training required' },
          { label: 'Home health care', value: 'Skilled or personal care delivered at home' },
          { label: 'Adult day care', value: 'Daytime program while caregivers work' },
          { label: 'Respite care', value: 'Temporary relief for a family caregiver' },
        ]}
      />
      <p className="mb-5 text-paper">
        Wisconsin regulates LTC policies under s. Ins 3.46. Benefits are defined by a daily or
        monthly <strong className="text-gold-400">benefit amount</strong> and a{' '}
        <strong className="text-gold-400">benefit period</strong> (years of coverage or a total
        benefit pool), with optional benefits such as{' '}
        <strong className="text-gold-400">guarantee of insurability</strong> and{' '}
        <strong className="text-gold-400">return of premium</strong>. Typical exclusions:
        pre-existing conditions beyond the allowed window, self-inflicted injury, war, and care
        already payable by government programs.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">LTC benefit triggers and tax-qualified plans</h2>
      <FactTable
        title="LTC benefit triggers"
        rows={[
          { label: 'ADL trigger', value: 'Unable to perform 2 of 6 ADLs (bathing, dressing, eating, toileting, transferring, continence)' },
          { label: 'Cognitive impairment', value: 'Dementia or similar — qualifies regardless of ADLs' },
        ]}
      />
      <p className="mb-5 text-paper">
        Either trigger is sufficient on its own. A{' '}
        <strong className="text-gold-400">tax-qualified</strong> LTC policy (per federal HIPAA
        standards, recognized in s. Ins 3.46(18)) uses these triggers with a chronically-ill
        certification — in exchange, premiums are deductible within limits and benefits are
        generally received tax-free.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Wisconsin LTC consumer protections</h2>
      <FactTable
        title="LTC regulation highlights (s. Ins 3.46)"
        rows={[
          { label: 'Renewability', value: 'Individual LTC must be at least guaranteed renewable' },
          { label: 'Inflation protection', value: 'Must be offered to every buyer' },
          { label: 'Unintentional lapse', value: 'Third-party notice designee before cancellation' },
          { label: 'Shopper’s guide & outline', value: 'Required disclosures before sale' },
          { label: 'Suitability', value: 'Appropriateness of the purchase must be assessed' },
          { label: 'Agent training', value: 'Required before selling LTC (s. 632.825)' },
        ]}
      />
      <p className="mb-5 text-paper">
        The <strong className="text-gold-400">unintentional lapse</strong> protection exists
        because the people most likely to forget a premium are the cognitively impaired
        policyholders who most need the coverage — the insured can designate a third party to
        receive lapse notices. Wisconsin also participates in the{' '}
        <strong className="text-gold-400">LTC partnership program</strong>: benefits paid by a
        partnership-qualified policy let the insured protect an equivalent amount of assets
        from Medicaid spend-down rules — the bridge between private LTC insurance and the
        Medicaid safety net.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Disability income replaces a paycheck; long-term care pays for the help someone needs to
        function. Don't let a question's mention of "benefits" blur which one is being tested.
      </blockquote>
    </>
  )
}
