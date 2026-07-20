import { Link } from 'react-router-dom'

function FactTable({ title, rows }) {
  return (
    <div className="my-6 border border-line bg-ink-900">
      <p className="border-b border-line px-5 py-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
        {title}
      </p>
      {rows.map((row) => (
        <div
          className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3.5 last:border-b-0"
          key={row.label}
        >
          <span className="max-w-[42ch] text-[14.5px] text-paper">{row.label}</span>
          <span className="font-mono text-[13px] font-bold whitespace-nowrap text-gold-400">
            {row.value}
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
        Getting licensed to sell life or accident &amp; health insurance in Wisconsin is a
        four-step process: complete state-approved prelicensing education, pass the state exam
        with PSI, submit your license application, and clear the background check. Here's each
        step in order, with the requirements that actually have teeth.
      </p>

      <FactTable
        title="The path at a glance"
        rows={[
          { label: '1. Prelicensing education', value: '20 hours per line' },
          { label: '2. State exam (via PSI)', value: '$75 per attempt' },
          { label: '3. License application', value: 'NIPR / OCI' },
          { label: '4. Background check', value: 'Part of application' },
        ]}
      />

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Step 1 — 20 hours of prelicensing education (ch. Ins 26)
      </h2>
      <p className="mb-5 text-paper">
        Every resident applicant for a life or accident &amp; health license must complete at
        least <strong className="text-gold-400">20 hours</strong> of
        commissioner-approved prelicensing education, and it must be completed{' '}
        <strong className="text-gold-400">no more than one year before you test</strong> (Wis.
        Admin. Code s. Ins 26.04). The hours aren't free-form — Wisconsin prescribes exactly how
        they break down:
      </p>

      <FactTable
        title="Required hour allocation (Ins 26)"
        rows={[
          { label: 'Principles of insurance', value: '1 hr' },
          { label: 'General Wisconsin insurance laws', value: '4 hrs' },
          { label: 'Ethics', value: '3 hrs' },
          { label: 'Line-specific content (life OR A&H)', value: '9 hrs' },
          { label: 'Wisconsin law specific to the line', value: '3 hrs' },
          { label: 'Total', value: '20 hrs' },
        ]}
      />

      <p className="mb-5 text-paper">
        A few practical wrinkles worth knowing:
      </p>
      <ul className="mb-5 list-disc space-y-2 pl-6 text-paper">
        <li>
          <strong className="text-gold-400">Getting both licenses?</strong> The first 8 hours
          (principles, general Wisconsin law, ethics) don't have to be repeated for a second
          line if you complete it within 12 months — you only add the line-specific 12 hours.
        </li>
        <li>
          <strong className="text-gold-400">Self-study courses</strong> require a proctored
          final exam administered by an impartial third party (remote proctoring is allowed)
          before you can sit the state exam.
        </li>
        <li>
          <strong className="text-gold-400">Exemptions exist</strong> for certain designations —
          CLU/ChFC for life, CPCU, and some insurance degrees — if that's you, check with OCI
          before paying for a course.
        </li>
        <li>
          Your provider issues a <strong className="text-gold-400">Certificate of Course
          Completion</strong>. Do not lose it — you must bring it (paper or electronic) to the
          test center, or PSI will not let you test.
        </li>
      </ul>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Step 2 — Register and pass the state exam with PSI
      </h2>
      <p className="mb-5 text-paper">
        Wisconsin's exams are administered by PSI (not Pearson VUE — a common point of confusion
        for people following generic advice). You register through PSI's Wisconsin insurance
        portal and pay <strong className="text-gold-400">$75 per exam</strong>; the fee is
        non-refundable, including if you fail and retake. The exam itself is 100 scored
        questions plus 5–10 unscored experimental ones, with a 2-hour limit and a 70% passing
        score. For a realistic read on difficulty, see{' '}
        <Link className="text-gold-400 underline" to="/blog/how-hard-is-the-wisconsin-insurance-exam">
          How Hard Is the Wisconsin Insurance License Exam?
        </Link>
        , and for the test-center experience itself,{' '}
        <Link className="text-gold-400 underline" to="/blog/psi-exam-day-wisconsin-insurance">
          Exam Day at PSI
        </Link>
        .
      </p>
      <p className="mb-5 text-paper">
        Remember the one-year rule cuts both ways: your 20 prelicensing hours must have been
        completed within the year before you test. If you stall too long between coursework and
        exam, you can age out of your own education and have to redo it.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Step 3 — Apply for the license (NIPR / OCI)
      </h2>
      <p className="mb-5 text-paper">
        Passing the exam doesn't make you licensed — it makes you eligible to apply. The license
        application itself goes to Wisconsin OCI, typically submitted electronically through
        NIPR (the National Insurance Producer Registry). The application collects your personal
        and background information and carries its own state fee. Because application fees and
        processing details change, treat OCI's current licensing instructions as the source of
        truth for the exact amounts and forms at the time you apply.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Step 4 — Background check
      </h2>
      <p className="mb-5 text-paper">
        Wisconsin screens applicants' backgrounds as part of licensing, which for resident
        producer applicants includes identity and criminal-history verification. The mechanics —
        where you go, how it's captured, what it costs — are specified in OCI's current
        application instructions, and you should follow those rather than any third-party
        summary, because the process details are updated from time to time. The practical
        takeaway: build a little buffer into your timeline for this step, and answer every
        background question on the application honestly. Nondisclosure sinks more applications
        than the underlying history does.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        Realistic timeline from zero to licensed
      </h2>
      <ul className="mb-5 list-disc space-y-2 pl-6 text-paper">
        <li>
          <strong className="text-gold-400">Prelicensing (the long pole):</strong> 20 hours of
          coursework, at whatever pace your schedule allows — focused candidates compress this
          into a week or two; part-timers spread it over a month or more.
        </li>
        <li>
          <strong className="text-gold-400">Exam prep:</strong> practice questions until you're
          consistently clearing 70% on outline-weighted practice exams — not just on the product
          topics you enjoy.
        </li>
        <li>
          <strong className="text-gold-400">Scheduling and testing:</strong> PSI exam
          availability varies by location and season; scheduling promptly after finishing
          coursework keeps you inside the one-year education window with room to spare.
        </li>
        <li>
          <strong className="text-gold-400">Application and background check:</strong> submitted
          after passing; processing time is in the state's hands, so file promptly and
          accurately.
        </li>
      </ul>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        The sequence matters more than the speed: education, then exam within one year, then
        application. Candidates who plan around those constraints rarely hit surprises.
      </blockquote>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        One license or two?
      </h2>
      <p className="mb-5 text-paper">
        Life and accident &amp; health are separate lines with separate exams. Because the
        8-hour general portion of prelicensing carries over between lines (within 12 months),
        the incremental cost of the second license is 12 hours of coursework plus a second $75
        exam. Many candidates sit both exams in the same period while the shared regulatory
        material — which is <em>35% of each exam</em> — is fresh. The content differences are
        broken down in the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-life-insurance-exam-content-outline">
          Life exam outline
        </Link>{' '}
        and the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-accident-health-exam-content-outline">
          Accident &amp; Health exam outline
        </Link>
        .
      </p>

      <p className="mb-5 text-paper">
        When you're ready to start studying,{' '}
        <Link className="text-gold-400 underline" to="/">
          PassPro
        </Link>{' '}
        covers the exam side of this checklist: a question bank built domain-by-domain from the
        official PSI content outline, practice exams weighted like the real thing, and ARIA — an
        AI study coach that knows Wisconsin's actual rules — so the $75 you hand PSI only gets
        handed over once.
      </p>
    </>
  )
}
