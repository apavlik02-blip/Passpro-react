import { Link } from 'react-router-dom'
import { FactTable } from '../../components/study/FactTable.jsx'
import { B, ExamTip, H2, Lead, List, P } from '../../components/study/LessonKit.jsx'

export function Content() {
  return (
    <>
      <Lead>
        Wisconsin doesn't issue a single "P&amp;C license." Property and Casualty are separate
        lines of authority, each with its own PSI exam: <B>Series 22-05 (Property)</B> and{' '}
        <B>Series 22-07 (Casualty)</B>. Most agency producers hold both. Here is the path from
        zero to licensed, in order.
      </Lead>

      <FactTable
        title="Wisconsin P&C licensing at a glance"
        rows={[
          { label: 'Prelicensing education', value: '20 hrs per line (8 general + 12 line)' },
          { label: 'General 8 hours for a second line', value: 'Once per 12 months' },
          { label: 'Prelicensing valid for', value: '1 year' },
          { label: 'Exam vendor / fee', value: 'PSI / $75 per exam' },
          { label: 'Questions / time / pass', value: '100 / 2 hours / 70%' },
        ]}
      />

      <H2>Step 1: Complete prelicensing education</H2>
      <P>
        OCI requires at least <B>20 hours</B> of approved prelicensing education for each
        major line: 8 hours of insurance principles, general Wisconsin law, and ethics, plus 12
        hours on the specific line. The 8 general hours only need to be completed once in a
        12-month period, so a candidate taking both Property and Casualty within a year
        completes 8 + 12 + 12 hours. Self-study courses end with a proctored exam, and the
        education is valid for one year.
      </P>

      <H2>Step 2: Schedule and pass each PSI exam</H2>
      <P>
        Each exam has 100 scored questions and a 2-hour limit, and you need 70% to pass. Both
        exams spend <B>35%</B> of their questions on insurance regulation, including Wisconsin
        statutes on rates, surplus lines, cancellation, and the state residual markets.
      </P>
      <List
        items={[
          <><B>Property (22-05):</B> homeowners 18%, property basics 13%, commercial package 9%, BOP 9%, general insurance 8%, dwelling 4%, other 4%.</>,
          <><B>Casualty (22-07):</B> auto 14%, casualty basics 13%, commercial package 10%, BOP 10%, general insurance 8%, workers comp 5%, other 5%.</>,
        ]}
      />

      <H2>Step 3: Apply for the license</H2>
      <P>
        After passing, apply to OCI for the lines you passed. Keep your license current with
        renewals and continuing education, and report address changes and any administrative
        actions promptly.
      </P>

      <ExamTip>
        Only writing homes and cars for families? The{' '}
        <Link className="text-gold-400 underline" to="/blog/wisconsin-personal-lines-vs-property-casualty">
          Personal Lines license (22-09)
        </Link>{' '}
        is one exam instead of two, but it doesn't cover commercial insurance.
      </ExamTip>

      <P>
        PassPro has separate study tracks for{' '}
        <Link className="text-gold-400 underline" to="/licenses/property">
          Property
        </Link>{' '}
        and{' '}
        <Link className="text-gold-400 underline" to="/licenses/casualty">
          Casualty
        </Link>
        , each with lessons, flashcards, and full-length mock exams weighted to the official
        outline.
      </P>
    </>
  )
}
