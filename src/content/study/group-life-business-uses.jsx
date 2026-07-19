import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        Group life insurance and life insurance's business uses both show up as scenario-based
        questions — a story about an employee, a business partner, or an investor, and you're
        asked to identify which mechanism applies. This module is part of the Life Insurance
        Basics section (outline 3.0–3.5), and accounts for roughly 10% of the Life exam.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Group life insurance mechanics</h2>
      <p className="mb-5 text-paper">
        Group life covers members of an eligible group — usually employees — under a single
        <strong className="text-gold-400"> master contract</strong> held by the employer; each
        member receives a <strong className="text-gold-400">certificate of coverage</strong>{' '}
        rather than their own policy. Because risk spreads across a group, underwriting
        evaluates the group itself, not the individuals. Benefits are typically set by formula
        — a multiple of salary or a flat amount — to prevent the insured from selecting based
        on knowledge of their own health.
      </p>
      <FactTable
        title="Group life characteristics"
        rows={[
          { label: 'Master contract', value: 'Held by the employer/sponsor' },
          { label: 'Certificates', value: 'Issued to individual members' },
          { label: 'Underwriting', value: 'Evaluates the group; no individual medical exams' },
          { label: 'Benefits', value: 'Determined by formula (salary multiple or flat amount)' },
          { label: 'Cost', value: 'Premium splits between employer and employees or employer only' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Group life conversion rights</h2>
      <p className="mb-5 text-paper">
        When an employee's group life coverage ends — through termination, retirement,
        disability, or the group policy ending — they typically have a{' '}
        <strong className="text-gold-400">conversion right</strong>: a limited window (commonly
        31 days) to convert some or all of that group coverage into an individual permanent
        policy, <strong className="text-gold-400">without evidence of insurability</strong>.
        The trade-off is cost — the converted individual policy is priced at the person's
        then-current age and no longer benefits from group rates. But it's the way to preserve
        coverage when a group plan ends and medical decline has made new insurance impossible
        to obtain.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Buy-sell agreements</h2>
      <p className="mb-5 text-paper">
        A <strong className="text-gold-400">buy-sell agreement</strong> is a contract among
        business owners (or between an owner and the business) specifying what happens to an
        owner's interest if they die, become disabled, or leave the business. Life insurance
        funds the buyout so the surviving owner(s) or the business itself have cash on hand to
        purchase the deceased owner's share without having to liquidate business assets or
        borrow at inopportune moments.
      </p>
      <FactTable
        title="Buy-sell structures"
        rows={[
          { label: 'Cross-purchase', value: 'Each owner buys a policy on each other owner' },
          { label: 'Entity purchase (stock buyback)', value: 'The business owns policies on each owner and buys back the share' },
          { label: 'Disability funding', value: 'Buy-sell triggered by total permanent disability too' },
        ]}
      />
      <p className="mb-5 text-paper">
        The cross-purchase structure works best for 2-owner partnerships; entity purchase works
        for any size. The funded amount is set at the agreement's inception — the policy's face
        amount should equal the ownership stake's expected value. The agreement should address
        what happens if one owner dies before the policy pays — typically the business or the
        other owners fund the buyout from other resources, or the deceased's beneficiary gets a
        note. Buy-sell agreements also often include a{' '}
        <strong className="text-gold-400">change of insured</strong> provision allowing the
        business or owners to substitute a different owner into an existing policy rather than
        buying a new one.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Key person insurance</h2>
      <p className="mb-5 text-paper">
        Key person insurance protects the business itself, not an individual owner. The
        business is both <strong className="text-gold-400">owner</strong> and{' '}
        <strong className="text-gold-400">beneficiary</strong> of a policy on an employee
        whose skills, relationships, or leadership are critical to the company's revenue. The
        payout compensates the business for the financial loss and cost of finding a
        replacement if that key person dies. The business carries the premium as an overhead
        expense, and the death benefit is received income-tax free by the business (not taxed
        as compensation).
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Executive bonus plans (Section 162)</h2>
      <p className="mb-5 text-paper">
        In an <strong className="text-gold-400">executive bonus</strong> arrangement (also
        called a Section 162 bonus plan), the business pays a bonus to an executive
        specifically to fund a life insurance policy that the{' '}
        <strong className="text-gold-400">executive personally owns</strong> — the business
        has no ownership interest in the policy. The bonus is typically deductible to the
        business as compensation, and taxable income to the executive (who uses it to pay
        premiums). This structure lets executives acquire permanent insurance while working,
        with the company's financial help — and when the executive leaves, they own a
        surrender-value asset independent of the business.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Split-dollar plans</h2>
      <p className="mb-5 text-paper">
        Split-dollar arrangements divide policy ownership and premiums between an employer and
        an executive: the employer funds one portion (typically the cash value growth), the
        executive funds the death-benefit protection. Upon death or policy termination, the
        employer recovers its investment and the executive (or beneficiary) receives the
        remaining proceeds. Modern split-dollar plans are structured as either equity or
        collateral assignment types, with specific tax consequences. These arrangements are
        heavily regulated and rarely appear on licensing exams as more than a recognition item.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Deferred compensation funding</h2>
      <p className="mb-5 text-paper">
        A business can use life insurance to fund a{' '}
        <strong className="text-gold-400">deferred compensation</strong> promise to an
        executive — for example, a supplemental executive retirement plan (SERP). The business
        owns a policy on the executive and uses the death benefit (or, if structured as
        non-qualified deferred comp, the policy's growing cash value) to fund the promised
        benefit. This protects the executive's beneficiary if the executive dies before
        retirement, and gives the business a resource to fund the ongoing retirement benefit
        obligation.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Life settlements and STOLI</h2>
      <p className="mb-5 text-paper">
        A <strong className="text-gold-400">life settlement</strong> is the sale of an existing
        life insurance policy by its owner to a third party for a lump sum greater than the
        cash surrender value but less than the death benefit — the buyer takes over premium
        payments and collects the death benefit later. Wisconsin regulates life settlement
        brokers and providers under s. 632.69, requires disclosures to the selling owner, and
        prohibits <strong className="text-gold-400">stranger-originated life insurance
        (STOLI)</strong> — arrangements where a policy is manufactured from the start for the
        benefit of an investor with no insurable interest. The distinction the exam wants: a
        legitimate settlement sells a policy that was originally bought in good faith;
        STOLI is a scheme to evade the insurable interest requirement from day one.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Uses of group life in business</h2>
      <p className="mb-5 text-paper">
        Beyond individual employee coverage, group life serves business purposes:{' '}
        <strong className="text-gold-400">group buy-sell</strong> arrangements (less common
        than individual buy-sells but possible in larger partnerships), and funding{' '}
        <strong className="text-gold-400">business overhead expenses</strong> through a group
        policy rider — though typically this is a disability rather than life insurance
        feature. The group context means coverage continues only while employment lasts; the
        conversion right is the escape clause when that employment ends.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Sizing business insurance</h2>
      <p className="mb-5 text-paper">
        For buy-sell agreements, the face amount should equal the ownership stake's value —
        too little and the survivor can't fully buy out the estate, stranding the deceased's
        beneficiary; too much and the survivor overpays. For key person insurance, the face
        amount should cover the cost of recruiting and training a replacement, plus lost
        earnings during the vacancy — typically 3–5× the key person's salary. The cost of
        life insurance as a business expense is deductible to the business, but the death
        benefit is not taxable to the business — a rare combination that makes life insurance
        an efficient business tool.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Who owns the policy is the fastest way to tell these apart: the business owns key
        person coverage, the executive owns their own bonus-funded policy, and the owners own
        each other under a cross-purchase buy-sell.
      </blockquote>
    </>
  )
}
