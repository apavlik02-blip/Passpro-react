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
        You've done the coursework and the practice exams — now there's just the unfamiliar
        part: the test center. Wisconsin's insurance exams are administered by PSI, and knowing
        how the day runs removes the last source of avoidable stress. Here's what to bring, what
        happens at check-in, and how the exam itself unfolds.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        The one document you cannot forget
      </h2>
      <p className="mb-5 text-paper">
        Bring your prelicensing{' '}
        <strong className="text-gold-400">Certificate of Course Completion</strong> — paper or
        electronic. This is not a formality: without it, PSI will not let you test, and the $75
        exam fee is non-refundable. Wisconsin requires the certificate because your 20 hours of
        prelicensing education (completed within one year before testing) is a precondition of
        sitting the exam, and the test center is where it gets checked. Put it with your keys
        the night before.
      </p>

      <FactTable
        title="Exam day checklist"
        rows={[
          { label: 'Certificate of Course Completion', value: 'Required to test' },
          { label: 'Valid identification', value: 'Per PSI bulletin' },
          { label: 'Exam fee (paid at registration)', value: '$75, non-refundable' },
          { label: 'Notes, phones, personal items', value: 'Not at your station' },
        ]}
      />

      <p className="mb-5 text-paper">
        On identification: you'll need to prove who you are at check-in, which in practice means
        current government-issued photo identification. The precise ID rules — what counts,
        whether a second form is needed, name-match requirements — are spelled out in the
        OCI/PSI Candidate Information Bulletin, and that document is the authority. Read the
        current version when you schedule, not a forum post from three years ago.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Check-in and the room</h2>
      <p className="mb-5 text-paper">
        Plan to arrive early — arriving with time to spare costs you nothing, while arriving
        late can cost you the appointment and the fee. Check-in at a proctored computer-based
        test center follows a standard pattern: identity verification, certificate check, and
        securing your personal items (phones, notes, bags don't come to the testing station —
        centers provide storage). Then you're seated at a workstation for a computer-delivered,
        multiple-choice exam. No essays, no math beyond arithmetic, and the software is simple:
        read, answer, move on, with the ability to flag questions to revisit.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">
        The exam itself: 100 that count, a few that don't
      </h2>

      <FactTable
        title="What you'll face"
        rows={[
          { label: 'Scored questions', value: '100' },
          { label: 'Experimental (unscored) questions', value: '5–10' },
          { label: 'Time limit', value: '2 hours' },
          { label: 'Passing score', value: '70%' },
        ]}
      />

      <p className="mb-5 text-paper">
        Two structural facts should shape your temperament in the room. First, the{' '}
        <strong className="text-gold-400">5–10 experimental questions</strong> mixed into your
        exam are unscored — PSI is field-testing them for future exams — and they are not
        marked. So when you hit a question that feels like it came from a different course
        entirely, don't panic and don't recalibrate: answer it and move on. It may literally
        not count. Second, 70% means <strong className="text-gold-400">30 wrong answers still
        pass</strong>. No single question deserves your composure.
      </p>
      <p className="mb-5 text-paper">
        Pace math: 2 hours across roughly 105–110 questions is over a minute each, and recall
        questions take far less. Most candidates finish with time to spare — use it for flagged
        questions, and remember the old test-taking truth that your first answer, chosen for a
        reason, usually deserves to survive review.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">Results and what happens next</h2>
      <p className="mb-5 text-paper">
        Computer-based exams score immediately, and PSI provides your result at the test center
        — the exact reporting format and any documentation you take with you are described in
        the current Candidate Information Bulletin. Pass, and your next step is the license
        application through NIPR/OCI, covered in the{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-insurance-license-requirements">
          complete requirements guide
        </Link>
        . The exam result doesn't make you licensed by itself — the application and background
        check finish the job.
      </p>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">If you don't pass</h2>
      <p className="mb-5 text-paper">
        A failed attempt is a $75 lesson, not a career verdict — you can register again through
        PSI and retake, paying the fee each time. Two practical notes. First, check the current
        bulletin for any required wait between attempts and rebooking mechanics. Second, and
        more important: your prelicensing education must still be within its one-year window
        when you retest. A candidate who fails, drifts for months, and retests late can age out
        of their own certificate and owe themselves a new course. Retake promptly while the
        material is warm.
      </p>
      <p className="mb-5 text-paper">
        Diagnose before you rebook, though. The most common failure pattern isn't "not smart
        enough" — it's studying products while the exam is 35% regulation, and studying generic
        national numbers while Wisconsin tests{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-insurance-exam-numbers-to-memorize">
          its own figures
        </Link>
        . See{' '}
        <Link className="text-gold-400 underline" to="/blog/how-hard-is-the-wisconsin-insurance-exam">
          how hard the exam really is
        </Link>{' '}
        for where prepared candidates actually lose points.
      </p>

      <blockquote className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
        Exam day should be the most boring day of your preparation. Certificate, ID, arrive
        early, trust your pacing — every surprise you can have already happened in practice.
      </blockquote>

      <p className="mb-5 text-paper">
        The best exam-day insurance is walking in having already passed, repeatedly.{' '}
        <Link className="text-gold-400 underline" to="/">
          PassPro's
        </Link>{' '}
        practice exams are built domain-by-domain from the official PSI outline with the real
        section weighting and the real 2-hour, 100-question format — so the version of you at
        the PSI workstation has done this before.
      </p>
    </>
  )
}
