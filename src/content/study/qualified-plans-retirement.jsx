import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        "Qualified" is a tax law label, not a description of quality — a qualified plan simply
        meets IRS requirements that unlock specific tax advantages. That distinction is the key
        to almost every retirement-plan question on the exam.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">General requirements of a qualified plan</h2>
      <p className="mb-5 text-paper">
        To earn its tax treatment, a plan must be formally written and communicated to
        employees, exist for the <strong className="text-gold-400">exclusive benefit</strong> of
        employees and beneficiaries, be <strong className="text-gold-400">permanent</strong>{' '}
        rather than a temporary tax dodge, satisfy IRS{' '}
        <strong className="text-gold-400">nondiscrimination</strong> rules (it can't favor
        highly compensated employees), and follow approved{' '}
        <strong className="text-gold-400">vesting</strong> schedules so employees actually own
        their accrued benefits over time. Employee salary deferrals are always 100% vested
        immediately — vesting schedules apply to employer contributions.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Qualified vs. nonqualified</h2>
      <FactTable
        title="Qualified vs. nonqualified plans"
        rows={[
          { label: 'Qualified', value: 'Meets IRS rules; contributions tax-deductible' },
          { label: 'Nonqualified', value: 'No deduction on contributions; design freedom' },
          { label: 'Qualified — discrimination', value: 'Must not favor highly compensated employees' },
          { label: 'Nonqualified — discrimination', value: 'Can be offered selectively (executives only)' },
          { label: 'Growth (both)', value: 'Tax-deferred until distributed' },
        ]}
      />
      <p className="mb-5 text-paper">
        Nonqualified plans (like many executive deferred-compensation arrangements) trade away
        the upfront deduction for the freedom to cover only a select group — qualified plans get
        the tax break specifically because they're required to be broadly and fairly available
        to the workforce. The employer's tax advantage in a qualified plan is an immediate
        deduction for contributions; the employee's is that contributions and growth aren't
        taxed until distribution.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Traditional vs. Roth IRA</h2>
      <FactTable
        title="IRA comparison"
        rows={[
          { label: 'Traditional contributions', value: 'May be tax-deductible now' },
          { label: 'Traditional withdrawals', value: 'Taxed as ordinary income' },
          { label: 'Traditional RMDs', value: 'Required starting at an IRS-set age' },
          { label: 'Roth contributions', value: 'After-tax — no deduction now' },
          { label: 'Roth qualified withdrawals', value: 'Tax-free, including growth' },
          { label: 'Roth RMDs (owner)', value: 'None during the owner’s lifetime' },
        ]}
      />
      <p className="mb-5 text-paper">
        Anyone with earned income can contribute to a traditional IRA — but the{' '}
        <strong className="text-gold-400">deduction</strong> may phase out if the person (or
        spouse) is covered by an employer plan and income is high enough. Roth eligibility
        itself phases out at higher incomes, and a Roth qualified withdrawal requires both the
        five-year holding rule and a qualifying event (age 59½, death, disability, or a
        first-home purchase). Contribution limits are set annually by the IRS and change often,
        so learn the mechanics, not a dollar figure.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The employer plan lineup</h2>
      <FactTable
        title="Plan types and who they fit"
        rows={[
          { label: 'SEP', value: 'Simplified employee pension — employer funds IRAs; small business' },
          { label: 'Keogh (HR-10)', value: 'Self-employed individuals and their employees' },
          { label: 'Profit-sharing', value: 'Discretionary employer contributions from profits' },
          { label: '401(k)', value: 'Employee salary deferrals, often with employer match' },
          { label: 'SIMPLE', value: 'Small employers (100 or fewer); mandatory employer money' },
          { label: '403(b) TSA', value: 'Public schools & 501(c)(3) nonprofits' },
        ]}
      />
      <p className="mb-5 text-paper">
        The identifying details the exam keys on: a{' '}
        <strong className="text-gold-400">SEP</strong> is employer-funded (employees don't
        defer); a <strong className="text-gold-400">SIMPLE</strong> requires the employer to
        either match deferrals or contribute for everyone, in exchange for easy administration;
        a <strong className="text-gold-400">Keogh</strong> is the qualified plan for the
        self-employed; profit-sharing contributions can vary year to year with profits; and a{' '}
        <strong className="text-gold-400">403(b)</strong> — the tax-sheltered annuity — belongs
        to teachers and nonprofit employees. A 401(k) can be traditional (pre-tax deferrals,
        taxed later) or Roth (after-tax deferrals, tax-free qualified withdrawals).
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Distributions: age is everything</h2>
      <p className="mb-5 text-paper">
        Distribution taxation is age-driven. Withdrawing from a traditional IRA or qualified
        plan before <strong className="text-gold-400">age 59½</strong> (absent an exception —
        death, disability, and certain other IRS-listed events) triggers ordinary income tax{' '}
        <strong className="text-gold-400">plus a 10% early-withdrawal penalty</strong> —
        remember the "plus," since it's a common answer-choice trap. At the other end,{' '}
        <strong className="text-gold-400">required minimum distributions (RMDs)</strong> force
        traditional accounts to start paying out at an IRS-specified age; missing an RMD incurs
        its own penalty. Between those ages, distributions are simply ordinary income (no
        capital-gains treatment on pre-tax money).
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Rollovers and transfers</h2>
      <FactTable
        title="Moving retirement money"
        rows={[
          { label: 'Direct transfer', value: 'Trustee-to-trustee; no tax, no withholding' },
          { label: 'Indirect rollover', value: 'Paid to you first; 60 days to redeposit' },
          { label: 'Plan withholding on indirect', value: '20% withheld from employer-plan payouts' },
        ]}
      />
      <p className="mb-5 text-paper">
        An indirect rollover must be completed within{' '}
        <strong className="text-gold-400">60 days</strong> or it becomes a taxable distribution
        (plus penalty if early). Worse, an employer plan paying you directly must withhold 20% —
        which you must replace from other funds to roll over the full amount, then recover at
        tax time. The exam's preferred answer is almost always the{' '}
        <strong className="text-gold-400">direct trustee-to-trustee transfer</strong>: nothing
        withheld, nothing to miss, no 60-day clock.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Traditional: tax break now, taxed later. Roth: no break now, tax-free later.
        Nonqualified: no break either way, but total design flexibility.
      </blockquote>
    </>
  )
}
