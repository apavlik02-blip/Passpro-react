import { Link } from 'react-router-dom'
import { FactTable } from '../../components/study/FactTable.jsx'

const PDF_URL = '/downloads/passpro-wisconsin-exam-study-guide.pdf'

function DownloadButton() {
  return (
    <a
      className="inline-block rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
      download
      href={PDF_URL}
    >
      Download the free study guide (PDF)
    </a>
  )
}

export function Content() {
  return (
    <>
      <p className="mb-5 text-lg leading-relaxed text-paper">
        A free, two-page cheat sheet with the Wisconsin numbers and rules that show up on the PSI
        insurance exams. No signup, no email. Print it, save it to your phone, or share it with
        someone else who's studying.
      </p>

      <div className="my-8 border border-line bg-ink-900 p-7 text-center">
        <p className="mb-4 text-paper">Wisconsin Insurance Exam Study Guide · 2 pages · PDF</p>
        <DownloadButton />
      </div>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">What's inside</h2>
      <ul className="mb-5 list-disc space-y-2 pl-6 text-paper">
        <li>The path to your license: pre-licensing hours, the PSI exam, retakes, fingerprints, and CE</li>
        <li>Life numbers: grace period, free look, incontestability</li>
        <li>Property and casualty numbers: auto minimums, UM/UIM, cancellation notice, WIP, workers comp</li>
        <li>Coinsurance, worked out step by step</li>
        <li>How Wisconsin first-time test-takers did on each exam in 2024</li>
        <li>A simple daily study routine</li>
      </ul>

      <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">A preview of the numbers</h2>

      <FactTable
        title="The PSI exam"
        rows={[
          { label: 'Questions and time', value: '100 in 2 hours' },
          { label: 'Passing score', value: '70%' },
          { label: 'Fee per attempt', value: '$75' },
          { label: 'Pre-licensing per major line', value: '20 hours (8 + 12)' },
        ]}
      />

      <FactTable
        title="Life"
        rows={[
          { label: 'Grace period', value: '31 days' },
          { label: 'Free look', value: '10 days (20–30 for replacements)' },
          { label: 'Incontestability', value: '2 years' },
        ]}
      />

      <FactTable
        title="Property and casualty"
        rows={[
          { label: 'Auto liability minimums', value: '25/50/10' },
          { label: 'Uninsured motorist (UM)', value: 'Required, 25/50 BI' },
          { label: 'Midterm cancellation notice', value: '10 days' },
          { label: 'Nonrenewal notice', value: '60 days' },
        ]}
      />

      <p className="mb-5 text-paper">
        Want the full explanations? Start with{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-insurance-exam-numbers-to-memorize">
          the Wisconsin exam numbers to memorize
        </Link>{' '}
        or{' '}
        <Link className="text-gold-400 underline" to="/blog/coinsurance-formula-property-exam">
          the coinsurance formula, explained
        </Link>
        .
      </p>

      <div className="my-8 border border-line bg-ink-900 p-7 text-center">
        <DownloadButton />
      </div>

      <p className="mb-5 text-sm text-muted">
        PassPro is supplemental exam prep. It does not replace Wisconsin's required 20-hour
        pre-licensing course from an approved provider. Always check current rules with OCI and
        PSI before your exam. Pass rates: TSI National, 2024 Wisconsin first-time takers.
      </p>
    </>
  )
}
