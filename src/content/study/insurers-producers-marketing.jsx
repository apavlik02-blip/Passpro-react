import { Link } from 'react-router-dom'
import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        This module covers who insurers are structurally, how insurance actually gets
        distributed, and what a producer is and isn't allowed to promise on an insurer's
        behalf — the agency-law half of the General Insurance section on both exams.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Types of insurers</h2>
      <FactTable
        title="Insurer structures"
        rows={[
          { label: 'Stock insurer', value: 'Owned by shareholders; dividends go to shareholders' },
          { label: 'Mutual insurer', value: 'Owned by policyholders; may pay policyholder dividends' },
          { label: 'Fraternal benefit society', value: 'Nonprofit, membership-based (lodge/religious)' },
          { label: 'Reciprocal', value: 'Members insure each other, run by an attorney-in-fact' },
          { label: "Lloyd's association", value: 'Individual underwriters, each liable for their share' },
          { label: 'Risk retention group', value: 'Member-owned liability insurer for similar businesses' },
        ]}
      />
      <p className="mb-5 text-paper">
        The stock/mutual split drives the participating/nonparticipating vocabulary: mutual
        insurers typically issue <strong className="text-gold-400">participating</strong>{' '}
        policies whose owners may receive dividends, while stock insurers typically issue{' '}
        <strong className="text-gold-400">nonparticipating</strong> policies. The exam's usual
        trap: a "dividend" from a mutual insurer's participating policy is a return of
        overcharged premium, not taxable investment income the way a stock dividend is.
        Fraternals sell only to their members; reciprocals are unincorporated groups whose
        members exchange insurance through a manager called an attorney-in-fact.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Classifying insurers by location and authority</h2>
      <FactTable
        title="Insurer classifications"
        rows={[
          { label: 'Domestic', value: 'Incorporated in this state (Wisconsin)' },
          { label: 'Foreign', value: 'Incorporated in another U.S. state' },
          { label: 'Alien', value: 'Incorporated outside the United States' },
          { label: 'Admitted (authorized)', value: 'Holds a certificate of authority to do business here' },
          { label: 'Nonadmitted', value: 'Not authorized to transact ordinary business in the state' },
        ]}
      />
      <p className="mb-5 text-paper">
        "Foreign" on the insurance exam means <em>another state</em>, not another country — an
        insurer chartered in Illinois is a foreign insurer in Wisconsin; one chartered in Canada
        is alien. Private insurers also sit alongside{' '}
        <strong className="text-gold-400">government insurers</strong> — Social Security,
        Medicare, Medicaid — which cover risks the private market can't or won't. Independent
        rating services (A.M. Best, Standard &amp; Poor's, Moody's, Fitch) grade insurers'{' '}
        <strong className="text-gold-400">financial strength</strong> — that's claims-paying
        ability, not customer service quality, and checking a rating is part of responsible
        producer due diligence.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Marketing (distribution) systems</h2>
      <FactTable
        title="How insurance is distributed"
        rows={[
          { label: 'Independent agency', value: 'Represents multiple insurers; agent owns the accounts' },
          { label: 'Exclusive / captive agency', value: 'Represents a single insurer or insurer group' },
          { label: 'Direct writer', value: 'Producers are employees of the insurer' },
          { label: 'Direct response', value: 'No producer — mail, phone, and internet sales' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">The law of agency</h2>
      <p className="mb-5 text-paper">
        Agency law is the framework that makes a producer's actions bind a company. The insurer
        is the <strong className="text-gold-400">principal</strong>; the producer is its agent;
        and acts of the agent within the scope of authority are legally acts of the insurer.
        That includes knowledge: information the applicant discloses to the agent is imputed to
        the insurer, even if the agent never passes it along. A{' '}
        <strong className="text-gold-400">broker</strong>, by contrast, legally represents the
        applicant, not the insurer — though Wisconsin licenses both as intermediaries under
        ch. 628.
      </p>
      <FactTable
        title="Types of producer authority"
        rows={[
          { label: 'Express authority', value: 'Explicitly granted in the agency contract' },
          { label: 'Implied authority', value: 'Not written, but reasonably necessary to do the job' },
          { label: 'Apparent authority', value: "What a reasonable client would believe, based on the insurer's conduct" },
        ]}
      />
      <p className="mb-5 text-paper">
        Apparent authority is the one the exam tests most: even if an insurer never explicitly
        authorized something, the insurer can still be bound by a producer's actions if the
        insurer's own conduct — supplying business cards, applications, rate books — made it
        reasonable for the client to believe the producer had that authority. Implied authority
        covers the everyday unstated powers, like collecting the initial premium with an
        application.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Responsibilities to the applicant</h2>
      <p className="mb-5 text-paper">
        A producer owes the applicant honest, complete field underwriting: recording application
        answers accurately, explaining what the policy does and doesn't cover, delivering the
        policy promptly, handling premiums as a fiduciary, and disclosing compensation when the
        law requires it. Failures here are where{' '}
        <strong className="text-gold-400">errors-and-omissions</strong> liability comes from — a
        producer who fails to obtain requested coverage, or misstates what a policy covers, can
        be personally liable for the client's uncovered loss.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Prohibited marketing practices</h2>
      <FactTable
        title="Marketing violations"
        rows={[
          { label: 'Misrepresentation', value: 'False or misleading statement about a policy or insurer' },
          { label: 'False advertising', value: 'Untrue statements in advertising materials' },
          { label: 'Rebating', value: 'Unlawful inducement — cash, gifts, commission-sharing — to buy' },
          { label: 'Unfair discrimination', value: 'Different treatment within the same risk class' },
          { label: 'Controlled business', value: "License used mainly to insure the producer's own interests" },
        ]}
      />
      <p className="mb-5 text-paper">
        Controlled business is worth a closer look — Wisconsin (s. 628.51) restricts how much of
        a producer's book can come from their own or immediate family's insurable interests,
        precisely because a license is meant to serve the public, not just the producer's own
        coverage needs. And commissions may be shared only with people licensed for the same
        line (s. 628.61) — splitting with an unlicensed person is a violation for both parties.
      </p>

      <p className="mb-5 text-paper">
        These same unfair-practice concepts overlap heavily with the twisting, churning, and
        rebating rules covered in the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-twisting-churning-rebating">
          Wisconsin regulation module
        </Link>{' '}
        — the difference is that those three are specifically about replacement and inducement,
        while misrepresentation and false advertising apply more broadly to any sale.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        If a question hinges on what a client reasonably believed rather than what was formally
        granted, it's testing apparent authority.
      </blockquote>
    </>
  )
}
