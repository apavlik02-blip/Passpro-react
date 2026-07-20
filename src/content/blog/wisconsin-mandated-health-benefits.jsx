import { Link } from 'react-router-dom'

function MandateGroup({ title, items }) {
  return (
    <div className="my-6 border border-line bg-ink-900">
      <p className="border-b border-line px-5 py-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
        {title}
      </p>
      {items.map((item) => (
        <div
          className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3.5 last:border-b-0"
          key={item.label}
        >
          <span className="max-w-[42ch] text-[14.5px] text-paper">{item.label}</span>
          <span className="font-mono text-[13px] font-bold whitespace-nowrap text-gold-400">
            {item.ref}
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
        Wisconsin law requires applicable health insurance policies to cover a specific list of
        benefits — most of them collected under s. 632.895 of the Wisconsin statutes — and the
        Accident &amp; Health licensing exam tests that list heavily. It's long, it's specific,
        and it's exactly the kind of material that rewards organized memorization over
        re-reading. Here's the list, grouped the way your memory actually works.
      </p>

      <p className="mb-5 text-paper">
        One framing note before the list: these are <em>mandated benefits</em> — coverages an
        insurer must include — which the exam likes to contrast with optional benefits and with
        <em> benefit offers</em> the insurer must merely make available. When a question asks
        whether a Wisconsin policy "must cover" something, this is the list it's drawing from.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Group 1 — Children and family
      </h2>
      <p className="mb-5 text-paper">
        The biggest cluster. Wisconsin is aggressive about dependent coverage, and the exam
        knows it:
      </p>
      <MandateGroup
        title="Family and dependent mandates"
        items={[
          { label: 'Newborn children', ref: 's. 632.895(5)' },
          { label: 'Grandchildren', ref: 's. 632.895(5m)' },
          { label: 'Adopted children', ref: 's. 632.896' },
          { label: 'Handicapped children (coverage extension)', ref: 's. 632.88' },
          { label: 'Maternity benefits for dependent children', ref: 's. 632.895(7)' },
          { label: 'Immunizations for children', ref: 's. 632.895(14)' },
          {
            label: 'Hearing aids & cochlear implants (infants and children)',
            ref: 's. 632.895(16)',
          },
          { label: 'Student on medical leave (continued coverage)', ref: 's. 632.895(15)' },
        ]}
      />
      <p className="mb-5 text-paper">
        Memory hook: <strong className="text-gold-400">Wisconsin protects kids from before
        birth onward</strong> — newborns, adopted children, grandchildren, disabled children,
        their immunizations, their hearing, even their coverage if illness pulls them out of
        school. If the question involves a minor dependent, lean toward "covered."
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Group 2 — Screenings and preventive care
      </h2>
      <MandateGroup
        title="Screening mandates"
        items={[
          { label: 'Mammograms', ref: 's. 632.895(8)' },
          { label: 'Colorectal cancer screening', ref: 's. 632.895(16m)' },
          { label: 'Lead poisoning screening', ref: 's. 632.895(10)' },
        ]}
      />
      <p className="mb-5 text-paper">
        Three screenings, easy to chunk: breast, colon, lead. Lead screening is the
        distinctively "Wisconsin" one that generic national guides omit — which makes it a
        tempting exam question.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Group 3 — Specific conditions and treatments
      </h2>
      <MandateGroup
        title="Condition-specific mandates"
        items={[
          { label: 'Diabetes (equipment, supplies, education)', ref: 's. 632.895(6)' },
          { label: 'Kidney disease', ref: 's. 632.895(4)' },
          { label: 'Temporomandibular joint (TMJ) disorders', ref: 's. 632.895(11)' },
          { label: 'Autism spectrum disorders', ref: 's. 632.895(12m)' },
          { label: 'Breast reconstruction (post-mastectomy)', ref: 's. 632.895(13)' },
          { label: 'Alcohol, drug abuse, mental & nervous disorders', ref: 's. 632.89' },
          { label: 'Cancer clinical trials (routine care costs)', ref: 'outline §1.4' },
          { label: 'Oral & injected chemotherapy parity', ref: 's. 632.867' },
          { label: 'Prescription eye drop refills', ref: 's. 632.895(16t)' },
          {
            label: 'Hospital/ambulatory surgery charges & anesthesia for dental care',
            ref: 's. 632.895(12)',
          },
        ]}
      />
      <p className="mb-5 text-paper">
        Two details here punch above their weight on the exam: substance abuse and mental
        health coverage lives in its own statute (<strong className="text-gold-400">s. 632.89</strong>,
        not 632.895), and chemotherapy parity means oral chemo can't be treated worse than
        injected chemo. The eye-drop mandate — early refills for prescription drops — is
        obscure enough that when it appears, it separates candidates who studied Wisconsin's
        list from candidates who studied a national one.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Group 4 — Providers and care settings
      </h2>
      <MandateGroup
        title="Provider and setting mandates"
        items={[
          { label: 'Chiropractic services', ref: 's. 632.87(3)' },
          { label: 'Nurse practitioners', ref: 's. 632.87(5)' },
          { label: 'Optometrists', ref: 's. 632.87(2)' },
          { label: 'Home care', ref: 's. 632.895(2)' },
          { label: 'Skilled nursing facility care', ref: 's. 632.895(3)' },
          { label: 'Emergency medical services', ref: 's. 632.85' },
          { label: 'Contraceptives and related services', ref: 's. 632.895(17)' },
        ]}
      />
      <p className="mb-5 text-paper">
        The provider mandates share one idea: if a policy covers a service, Wisconsin restricts
        the insurer's ability to refuse payment just because of <em>who</em> licensed provider
        performed it — chiropractors, nurse practitioners, and optometrists being the tested
        examples. The setting mandates (home care, skilled nursing) extend coverage beyond the
        hospital walls.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        How this gets tested
      </h2>
      <ul className="mb-5 list-disc space-y-2 pl-6 text-paper">
        <li>
          <strong className="text-gold-400">"Which of the following is a mandated
          benefit?"</strong> — straight recall. Three plausible-sounding distractors, one item
          from this list.
        </li>
        <li>
          <strong className="text-gold-400">"Which statute requires…?"</strong> — s. 632.895
          for most of the list, s. 632.89 for substance abuse/mental health, s. 632.87 for the
          provider mandates. Knowing those three statute numbers covers nearly every citation
          question.
        </li>
        <li>
          <strong className="text-gold-400">Scenario questions</strong> — a newborn, a
          grandchild, an autistic child, a mastectomy patient — asking whether the policy must
          respond. If the fact pattern matches a group above, it must.
        </li>
      </ul>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Don't memorize 25 items. Memorize 4 groups — family, screenings, conditions, providers —
        and let each group carry its members.
      </blockquote>

      <p className="mb-5 text-paper">
        The mandates are the heart of the Wisconsin-specific block that makes regulation 35% of
        the A&amp;H exam — see the full{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-accident-health-exam-content-outline">
          Accident &amp; Health exam breakdown
        </Link>{' '}
        for how they fit into the rest of the outline, and{' '}
        <Link className="text-gold-400 underline" to="/blog/medicare-vs-medicaid-wisconsin-exam">
          Medicare vs. Medicaid
        </Link>{' '}
        for the other memorization-heavy A&amp;H topic.
      </p>
      <p className="mb-5 text-paper">
        <Link className="text-gold-400 underline" to="/">
          PassPro's
        </Link>{' '}
        question bank drills the s. 632.895 list as its own domain — built straight from the
        official outline's Wisconsin health regulation section — so by exam day these aren't 25
        facts you cram, they're questions you've already answered a dozen times. Members can
        pair this cheat sheet with the{' '}
        <Link className="text-gold-400 underline" to="/study/group-health-wisconsin-regulation">
          Group Health &amp; Wisconsin Regulation lesson
        </Link>{' '}
        in the study library.
      </p>
    </>
  )
}
