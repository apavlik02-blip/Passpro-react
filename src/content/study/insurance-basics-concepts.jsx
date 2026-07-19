import { FactTable } from '../../components/study/FactTable.jsx'

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        Every other module builds on this one. Risk, insurable interest, and contract law aren't
        just background — they're the vocabulary the rest of the exam assumes you already speak,
        and General Insurance is a guaranteed 10% of both the Life and A&amp;H tests.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Risk, peril, hazard, and loss</h2>
      <FactTable
        title="Core risk vocabulary"
        rows={[
          { label: 'Risk', value: 'Uncertainty about whether a loss will occur' },
          { label: 'Exposure', value: 'A unit of risk — a person or thing that could suffer loss' },
          { label: 'Peril', value: 'The cause of a loss (e.g., death, illness, fire)' },
          { label: 'Hazard', value: 'A condition that increases the chance or severity of a loss' },
          { label: 'Loss', value: 'The unintended reduction in value that insurance pays for' },
        ]}
      />
      <p className="mb-5 text-paper">
        Only <strong className="text-gold-400">pure risk</strong> — a chance of loss with no
        chance of gain, like premature death or disability — is insurable.{' '}
        <strong className="text-gold-400">Speculative risk</strong>, where gain is possible
        (gambling, stock investing), is not. Hazards come in three flavors worth distinguishing:{' '}
        <strong className="text-gold-400">physical</strong> (a tangible condition, like poor
        health or a hazardous occupation), <strong className="text-gold-400">moral</strong>{' '}
        (dishonesty that increases loss likelihood, like intent to defraud), and{' '}
        <strong className="text-gold-400">morale</strong> (carelessness because insurance
        exists — "I'm covered anyway").
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Methods of handling risk</h2>
      <FactTable
        title="The five methods (STARR)"
        rows={[
          { label: 'Sharing', value: 'Spread the risk across a group (pooling)' },
          { label: 'Transfer', value: 'Shift the financial consequence to another party — insurance' },
          { label: 'Avoidance', value: 'Eliminate the activity entirely (never fly)' },
          { label: 'Retention', value: 'Accept the risk yourself (deductibles, self-insurance)' },
          { label: 'Reduction', value: 'Lessen frequency or severity (sprinklers, wellness)' },
        ]}
      />
      <p className="mb-5 text-paper">
        Insurance is the <strong className="text-gold-400">transfer</strong> method: it doesn't
        eliminate risk, it moves the financial consequence from the individual to a pool of
        insureds in exchange for a premium. Deductibles are the exam's favorite example of{' '}
        <strong className="text-gold-400">retention</strong> — the insured keeps a slice of every
        loss.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Elements of an insurable risk</h2>
      <p className="mb-5 text-paper">
        Not every pure risk can be insured. The classic requirements: the loss must be{' '}
        <strong className="text-gold-400">due to chance</strong> (accidental, outside the
        insured's control), <strong className="text-gold-400">definite and measurable</strong>{' '}
        (time, place, and amount can be determined),{' '}
        <strong className="text-gold-400">statistically predictable</strong> across a large
        number of similar exposure units, <strong className="text-gold-400">not
        catastrophic</strong> to the insurer (why war is excluded), and the premium must be{' '}
        <strong className="text-gold-400">economically feasible</strong> relative to the
        potential loss. Notice that death qualifies even though it's certain — because the{' '}
        <em>timing</em> of death is uncertain, which is the risk life insurance actually covers.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Law of large numbers and adverse selection</h2>
      <p className="mb-5 text-paper">
        The <strong className="text-gold-400">law of large numbers</strong> is the mathematical
        engine of insurance: the more similar exposure units in a pool, the more accurately
        actual losses will track predicted losses — one death is unpredictable; the death rate
        among a million insureds is not. <strong className="text-gold-400">Adverse
        selection</strong> is the enemy of the pool: the tendency of higher-risk people to seek
        insurance (and lower-risk people to skip it) more than average. Underwriting,
        classification of risks, participation requirements, and waiting periods all exist to
        combat it. <strong className="text-gold-400">Reinsurance</strong> — insurance purchased
        by insurers — spreads risk one level further, protecting a company from a single large
        loss or an accumulation of losses.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Insurable interest</h2>
      <p className="mb-5 text-paper">
        A person must have insurable interest in the insured — a genuine financial or emotional
        stake in that person continuing to live — for a life insurance contract to be valid;
        without it, the policy looks less like protection and more like a wager on someone's
        death. Insurable interest is required to <strong className="text-gold-400">exist at the
        time the policy is applied for</strong>; unlike property insurance, it does not need to
        continue at the time of the claim (a beneficiary can still collect even if the
        relationship — say, a business partnership — has since ended). Everyone has unlimited
        insurable interest in their own life; spouses, dependents, business partners, and
        creditors (to the extent of the debt) are the standard third-party examples.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Elements of a legal contract</h2>
      <p className="mb-5 text-paper">
        Every valid contract, insurance included, needs four elements:
      </p>
      <FactTable
        title="Contract elements"
        rows={[
          { label: 'Offer and acceptance', value: 'Applicant offers; insurer accepts by issuing the policy' },
          { label: 'Consideration', value: "The premium (and the applicant's statements) exchanged for the insurer's promise" },
          { label: 'Competent parties', value: 'Legal capacity to enter a contract' },
          { label: 'Legal purpose', value: 'The contract must not violate law or public policy' },
        ]}
      />
      <p className="mb-5 text-paper">
        The application plus the first premium is the applicant's{' '}
        <strong className="text-gold-400">offer</strong>; the insurer accepts by issuing the
        policy as applied for. If the insurer issues a modified policy instead, that's a{' '}
        <strong className="text-gold-400">counteroffer</strong> the applicant accepts by taking
        delivery and paying. Consideration is deliberately lopsided in insurance — the
        applicant's consideration is the premium and truthful statements; the insurer's is a
        promise to pay a potentially much larger amount.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Contract characteristics unique to insurance</h2>
      <FactTable
        title="Insurance contract characteristics"
        rows={[
          { label: 'Adhesion', value: 'Insurer writes the contract; ambiguity is construed against the insurer' },
          { label: 'Aleatory', value: 'Unequal value exchanged — a small premium can trigger a large payout' },
          { label: 'Personal', value: 'Covers a specific person; not freely transferable' },
          { label: 'Unilateral', value: 'Only the insurer makes an enforceable promise once premium is paid' },
          { label: 'Conditional', value: "The insurer's duty to pay depends on conditions being met" },
        ]}
      />
      <p className="mb-5 text-paper">
        Two doctrines flow directly from adhesion: courts resolve{' '}
        <strong className="text-gold-400">ambiguities against the insurer</strong> (the party
        that drafted the contract), and the{' '}
        <strong className="text-gold-400">reasonable expectations</strong> doctrine holds the
        insurer to the coverage an average buyer would reasonably think they purchased.
        Insurance is also a contract of <strong className="text-gold-400">utmost good
        faith</strong> — both parties rely on the honesty of the other's statements — and, in
        health insurance especially, a contract of{' '}
        <strong className="text-gold-400">indemnity</strong>: it restores the insured toward
        their pre-loss position rather than creating a profit.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Representations, warranties, concealment, and fraud</h2>
      <FactTable
        title="Statements and their legal weight"
        rows={[
          { label: 'Representation', value: 'Statement believed true to the best of one’s knowledge' },
          { label: 'Misrepresentation', value: 'False statement — material if it changed the insurer’s decision' },
          { label: 'Warranty', value: 'Statement guaranteed absolutely true — part of the contract' },
          { label: 'Concealment', value: 'Failure to disclose a known material fact' },
          { label: 'Fraud', value: 'Intentional deception to gain something of value' },
        ]}
      />
      <p className="mb-5 text-paper">
        Application answers in life and health insurance are treated as{' '}
        <strong className="text-gold-400">representations, not warranties</strong> — a critical
        exam distinction, because a representation only voids coverage if it was{' '}
        <strong className="text-gold-400">material</strong> to the insurer's decision, while a
        breached warranty could void the contract regardless of materiality. Materiality is
        judged by whether the truth would have changed the underwriting outcome.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Waiver and estoppel</h2>
      <p className="mb-5 text-paper">
        <strong className="text-gold-400">Waiver</strong> is the voluntary surrender of a known
        right — an insurer that issues a policy knowing of a violation may waive its right to
        deny claims on that basis. <strong className="text-gold-400">Estoppel</strong> is what
        stops the insurer afterward: having led the insured to reasonably rely on the waiver,
        the insurer is legally barred ("estopped") from reasserting the abandoned right later.
        They travel together on the exam: waiver is the giving up; estoppel is the being held to
        it.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        "Adhesion" and "aleatory" are the two contract characteristics the exam tests most —
        adhesion is about who wrote it, aleatory is about the mismatched exchange of value.
      </blockquote>
    </>
  )
}
