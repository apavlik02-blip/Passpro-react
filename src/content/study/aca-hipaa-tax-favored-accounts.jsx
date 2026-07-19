import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        ACA and HIPAA are both federal laws that reshaped health insurance, but they solve
        different problems — the ACA governs what plans must cover and who they must accept;
        HIPAA governs what happens to your coverage when you change jobs. This module also
        carries the federal tax section of the A&amp;H outline.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">ACA market reforms</h2>
      <p className="mb-5 text-paper">
        The Affordable Care Act's major provisions are market-wide rules:{' '}
        <strong className="text-gold-400">guaranteed issue</strong> (no denial for health
        status), no exclusions or higher rates for{' '}
        <strong className="text-gold-400">pre-existing conditions</strong>, a required set of{' '}
        <strong className="text-gold-400">essential health benefits</strong> — categories like
        emergency services, hospitalization, maternity care, mental health and substance use
        treatment, and prescription drugs — and{' '}
        <strong className="text-gold-400">no annual or lifetime dollar limits</strong> on those
        essential benefits. Marketplace plans are organized into metal tiers that describe
        cost-sharing, not quality of care:
      </p>
      <FactTable
        title="ACA metal tiers (approximate plan-paid share)"
        rows={[
          { label: 'Bronze', value: '~60%' },
          { label: 'Silver', value: '~70%' },
          { label: 'Gold', value: '~80%' },
          { label: 'Platinum', value: '~90%' },
          { label: 'Catastrophic', value: 'Young/hardship-exempt buyers; high deductible' },
        ]}
      />
      <p className="mb-5 text-paper">
        Higher metal tiers mean higher premiums and lower out-of-pocket costs when care is
        used — the same coverage "richness," just paid for differently.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The health insurance exchange</h2>
      <p className="mb-5 text-paper">
        The individual exchange (marketplace) sells{' '}
        <strong className="text-gold-400">qualified health plans</strong> — plans certified as
        meeting ACA standards. Its consumer machinery is exam material:{' '}
        <strong className="text-gold-400">premium tax credits</strong> that can be taken in
        advance to lower the monthly premium,{' '}
        <strong className="text-gold-400">reduced cost sharing</strong> available only when an
        eligible buyer purchases a <strong className="text-gold-400">silver</strong> plan, a
        single streamlined application, comparison shopping tools, and enrollment through the
        federal call center, online, or by mail.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">HIPAA portability protections</h2>
      <p className="mb-5 text-paper">
        HIPAA's insurance provisions predate the ACA and focus on{' '}
        <strong className="text-gold-400">portability</strong> — protecting people moving
        between group health plans. Its core exam concepts:
      </p>
      <FactTable
        title="HIPAA protections"
        rows={[
          { label: 'Eligibility', value: 'Can’t be singled out based on health status factors' },
          { label: 'Guaranteed issue', value: 'Qualifying groups/individuals must be accepted' },
          { label: 'Creditable coverage', value: 'Prior coverage counts toward waiting-period credit' },
          { label: 'Renewability', value: 'Group coverage must generally be renewed' },
          { label: 'Privacy', value: 'Protected health information — use and disclosure limits' },
        ]}
      />
      <p className="mb-5 text-paper">
        HIPAA's privacy rule is the piece producers touch daily: client health information
        gathered for underwriting or claims may only be used and disclosed within the
        permitted purposes, and the client has rights to access their own records.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">HSA, HRA, and FSA compared</h2>
      <FactTable
        title="Tax-favored health accounts"
        rows={[
          { label: 'HSA', value: 'Individual-owned; requires HDHP; rolls over; portable' },
          { label: 'HRA', value: 'Employer-owned/funded; stays behind at job change' },
          { label: 'FSA', value: 'Employee-funded pre-tax; largely use-it-or-lose-it' },
        ]}
      />
      <p className="mb-5 text-paper">
        The fastest way to tell these apart on the exam: ask who owns the account and whether
        the money follows the person. HSAs require HDHP coverage and no disqualifying other
        coverage; contributions are deductible, growth is tax-deferred, and withdrawals for
        qualified medical expenses are tax-free — with limits set annually by the IRS.
        High-deductible health plans themselves trade a bigger deductible for lower premiums,
        which is exactly the population an HSA is designed to backstop.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Taxation of personally-owned health coverage</h2>
      <FactTable
        title="Individual tax treatment"
        rows={[
          { label: 'Disability income premiums', value: 'Not deductible' },
          { label: 'Disability income benefits', value: 'Received income-tax free' },
          { label: 'Medical expense premiums', value: 'Deductible only above the AGI threshold, if itemizing' },
          { label: 'Qualified LTC premiums', value: 'Deductible within age-based limits' },
          { label: 'LTC benefits', value: 'Generally tax-free' },
        ]}
      />
      <p className="mb-5 text-paper">
        The pattern to memorize: when premiums are paid with{' '}
        <strong className="text-gold-400">after-tax</strong> dollars and not deducted, the
        benefits come back tax-free. That single rule generates most of the individual-side
        answers.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Taxation of employer group coverage</h2>
      <FactTable
        title="Employer-plan tax treatment"
        rows={[
          { label: 'Employer-paid premiums', value: 'Deductible business expense; not income to employees' },
          { label: 'Medical/dental benefits', value: 'Tax-free to the employee' },
          { label: 'Employer-paid STD/LTD benefits', value: 'Taxable income to the employee when received' },
          { label: 'Employee-paid (after-tax) DI benefits', value: 'Tax-free' },
          { label: 'Sole proprietors & partners', value: 'Deduct their own medical premiums as self-employed' },
        ]}
      />
      <p className="mb-5 text-paper">
        Disability benefits are where the exam probes: whoever paid the premium determines
        taxation. Employer-paid premiums produce{' '}
        <strong className="text-gold-400">taxable</strong> benefits (and short-term disability
        benefits attributable to employer contributions can also be subject to FICA);
        employee-paid after-tax premiums produce tax-free benefits; a split plan produces
        proportionally split taxation. AD&amp;D and group LTC follow the medical-expense
        pattern — premiums deductible to the employer, benefits generally tax-free.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Business disability insurance</h2>
      <FactTable
        title="Business uses of disability coverage"
        rows={[
          { label: 'Key person DI', value: 'Business owns policy on a critical employee; benefits replace lost revenue' },
          { label: 'Disability buy-sell', value: 'Funds the buyout of a totally disabled owner’s interest' },
          { label: 'Business overhead expense (BOE)', value: 'Pays rent, utilities, staff while the owner is disabled' },
        ]}
      />
      <p className="mb-5 text-paper">
        BOE is the odd one out for taxes: its premiums are deductible as a business expense,
        but the benefits are taxable when received (they replace deductible expenses). Key
        person and buy-sell disability premiums are not deductible, and their benefits arrive
        tax-free — the same paid-with-after-tax-dollars logic as the individual side. BOE also
        reimburses <em>overhead</em>, not the owner's lost salary — a distinction the exam
        tests directly.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        ACA: what a plan must cover and who it must accept. HIPAA: what happens to your coverage
        when you switch jobs. Taxes: whoever deducted the premium pays tax on the benefit.
      </blockquote>
    </>
  )
}
