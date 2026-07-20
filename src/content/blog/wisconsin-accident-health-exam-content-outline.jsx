import { Link } from 'react-router-dom'

function DomainGrid({ rows }) {
  return (
    <div className="my-6 grid grid-cols-1 gap-px border border-line bg-line">
      {rows.map((row) => (
        <div className="flex items-center justify-between bg-ink-900 px-4 py-2.5" key={row.label}>
          <span className="text-sm text-paper">{row.label}</span>
          <span className="font-mono text-sm font-bold text-gold-400 tabular-nums">
            {row.pct}
          </span>
        </div>
      ))}
    </div>
  )
}

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        The Wisconsin Accident &amp; Health exam (PSI Series 22-03) covers more distinct product
        categories than the Life exam — disability income, medical plans, group coverage,
        dental, Medicare, long-term care — but the weighting tells a clearer story than the
        topic list does. Here's the official outline, section by section, with study priorities.
      </p>

      <DomainGrid
        rows={[
          { label: '1.0 Insurance Regulation (incl. Wisconsin statutes)', pct: '35%' },
          { label: '2.0 General Insurance', pct: '10%' },
          { label: '3.0 A&H Insurance Basics', pct: '8%' },
          { label: '4.0 Disability Income', pct: '8%' },
          { label: '5.0 Medical Plans', pct: '8%' },
          { label: '6.0 Group A&H', pct: '8%' },
          { label: '8.0 Medicare (incl. Medicaid contrast)', pct: '8%' },
          { label: '9.0 Long-Term Care', pct: '8%' },
          { label: '7.0 Dental', pct: '4%' },
          { label: '10.0 Federal Tax Considerations', pct: '3%' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        1.0 Insurance Regulation — 35 questions
      </h2>
      <p className="mb-5 text-paper">
        Same story as the Life exam: over a third of the test is regulation, split between
        licensing rules (ch. 628), the Commissioner's powers and penalties, company and producer
        regulation, unfair marketing practices (s. 628.34), a short federal block (FCRA, federal
        fraud statutes, HIPAA), and then the section that decides most passes and fails —{' '}
        <strong className="text-gold-400">Wisconsin statutes specific to A&amp;H insurance</strong>.
        That Wisconsin block covers the right to return a policy (s. 632.73), the insurer's
        right to contest, preexisting conditions (s. 632.746), the grace period (s. 632.78),
        continuation privileges (s. 632.897), independent review and grievance procedures
        (s. 632.835), and the crown jewel of testable material: the{' '}
        <strong className="text-gold-400">s. 632.895 mandated benefits list</strong> — the
        coverages every applicable Wisconsin health policy must include.
      </p>
      <p className="mb-5 text-paper">
        The mandate list is long, specific, and heavily tested — newborns, adopted children and
        grandchildren, handicapped children, mammograms, colorectal and lead screening,
        diabetes, kidney disease, TMJ, autism spectrum disorders, breast reconstruction, child
        immunizations and hearing aids, and more. We've organized the whole list for
        memorization in{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-mandated-health-benefits">
          the mandated benefits cheat sheet
        </Link>
        . <strong className="text-gold-400">Study priority: highest, by a wide margin.</strong>
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        2.0 General Insurance — 10 questions
      </h2>
      <p className="mb-5 text-paper">
        Identical territory to the Life exam's section 2: risk concepts, insurer types, agency
        law, and contract characteristics (adhesion, aleatory, unilateral, conditional). If
        you're sitting both exams, this section and the regulation core are your shared
        material — study once, use twice.{' '}
        <strong className="text-gold-400">Study priority: medium.</strong>
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        3.0 A&amp;H Basics — 8 questions
      </h2>
      <p className="mb-5 text-paper">
        Definitions of perils (accidental injury vs. sickness), the principal loss types
        (income, medical expense, dental, LTC), classes of policies (individual vs. group,
        limited vs. comprehensive), limited policies (accident-only, dread disease, hospital
        indemnity), common exclusions, and the standard policy provisions — incontestability,
        grace period, reinstatement, claim procedures, coordination of benefits, and the
        renewability ladder from noncancelable down to nonrenewable. Renewability clauses are a
        reliable question generator: know that <strong className="text-gold-400">noncancelable</strong>{' '}
        locks both the policy and the premium, while{' '}
        <strong className="text-gold-400">guaranteed renewable</strong> locks the policy but
        lets premiums rise by class. <strong className="text-gold-400">Study priority: high</strong>{' '}
        — small section, but its vocabulary underpins everything after it.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        4.0 Disability Income — 8 questions
      </h2>
      <p className="mb-5 text-paper">
        Definitions of total disability (own occupation vs. any occupation), presumptive
        disability, elimination and benefit periods, partial and residual benefits, COLA and
        future increase riders, group STD/LTD, and Social Security disability's strict
        qualification rules. The own-occ/any-occ distinction and the elimination period (a
        time deductible, not a dollar one) are perennial favorites.{' '}
        <strong className="text-gold-400">Study priority: high.</strong>
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        5.0 Medical Plans and 6.0 Group A&amp;H — 8 questions each
      </h2>
      <p className="mb-5 text-paper">
        Medical plans covers indemnity vs. managed care (HMOs, PPOs), deductibles, coinsurance
        and stop-loss, cost containment (gatekeepers, preauthorization, utilization review),
        HIPAA requirements, HSAs/HRAs, and the ACA's market reforms (guaranteed issue, essential
        health benefits, metal tiers). Note that Wisconsin's dependent-coverage eligibility
        rules — newborns, adopted children, grandchildren, handicapped children — surface here
        too, tying back to the s. 632.895 mandates. Group A&amp;H covers group contract
        mechanics (master contract, certificates, experience vs. community rating), eligible
        groups, COBRA and Wisconsin state continuation (s. 632.897), small employer plans, and
        ERISA. <strong className="text-gold-400">Study priority: high</strong> for both — 16
        combined questions of fairly mechanical, learnable material.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        8.0 Medicare and 9.0 Long-Term Care — 8 questions each
      </h2>
      <p className="mb-5 text-paper">
        Medicare gets a dedicated section: Parts A through D, Medicare supplement
        (Medigap) standardization and marketing rules, employer plan coordination, and — the
        classic trap — the contrast with Medicaid, which the outline tests explicitly. The
        funding/eligibility/coverage differences are broken down in{' '}
        <Link className="text-gold-400 underline" to="/blog/medicare-vs-medicaid-wisconsin-exam">
          Medicare vs. Medicaid: The Differences the Wisconsin Exam Tests
        </Link>
        . Long-term care covers levels of care (skilled, intermediate, custodial, home health,
        adult day, respite), benefit triggers and periods, inflation protection, the LTC
        partnership program, and Wisconsin's marketing and suitability rules for LTC policies
        (s. Ins 3.46). <strong className="text-gold-400">Study priority: high</strong> — these
        two sections are where A&amp;H candidates who skimmed "the senior products" lose their
        margin.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        7.0 Dental and 10.0 Taxation — 7 questions combined
      </h2>
      <p className="mb-5 text-paper">
        Dental is four questions on treatment categories (diagnostic/preventive through
        orthodontics) and plan design (scheduled vs. nonscheduled, predetermination of
        benefits). Taxation is three questions: employer-paid premiums and benefit taxation for
        disability and medical coverage, FSAs, HDHPs, and HSAs.{' '}
        <strong className="text-gold-400">Study priority: targeted</strong> — learn the
        high-frequency rules, don't over-invest.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Six product sections at 8% each feels balanced — until you notice regulation alone
        outweighs any four of them combined.
      </blockquote>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">How to use this outline</h2>
      <p className="mb-5 text-paper">
        Budget your hours by weight: regulation first (with the s. 632.895 mandates treated as
        their own mini-subject), then the 8% product sections as a rotation, then dental and tax
        as a final sweep. If you're also taking the Life exam, read the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-life-insurance-exam-content-outline">
          Life exam breakdown
        </Link>{' '}
        and study the shared regulation core once for both.
      </p>
      <p className="mb-5 text-paper">
        <Link className="text-gold-400 underline" to="/">
          PassPro's
        </Link>{' '}
        question bank is built domain-by-domain from this exact outline — disability income,
        medical plans, group health, Medicare/Medicaid, LTC, dental, and the Wisconsin health
        regulation block each get their own drills, and the practice exam reproduces the real
        weighting so your score means what it says.
      </p>
    </>
  )
}
