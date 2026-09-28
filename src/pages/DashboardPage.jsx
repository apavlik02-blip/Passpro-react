import { Link, useOutletContext } from 'react-router-dom'
import { DataStatePanel } from '../components/DataStatePanel.jsx'
import { AriaReadinessWidget } from '../components/aria/AriaReadinessWidget.jsx'
import { useLicense } from '../hooks/useLicense.jsx'
import { humanizeSlug } from '../lib/format.js'
import { attemptsForLicense, weakestDomain } from '../lib/examHistory.js'
import { LICENSES, modulesForLicense, questionsForLicense } from '../lib/licenses.js'

function StatCard({ label, value, hint }) {
  return (
    <article className="flex flex-col gap-2 bg-ink-900 p-6">
      <p className="font-mono text-[11px] tracking-wide text-muted uppercase">{label}</p>
      <strong className="font-mono text-3xl font-semibold text-gold-500 tabular-nums">
        {value}
      </strong>
      <span className="text-sm text-muted">{hint}</span>
    </article>
  )
}

function ActionTile({ to, onClick, eyebrow, title, body }) {
  const className =
    'group flex flex-col border border-line bg-ink-900 p-5 text-left transition hover:border-gold-500/60'
  const content = (
    <>
      <span className="mb-2 font-mono text-[10.5px] font-bold tracking-widest text-gold-500 uppercase">
        {eyebrow}
      </span>
      <span className="mb-1 font-serif text-lg text-paper">{title}</span>
      <span className="text-sm text-muted">{body}</span>
      <span className="mt-3 font-mono text-[11px] text-paper transition group-hover:text-gold-400">
        Go →
      </span>
    </>
  )
  return to ? (
    <Link className={className} to={to}>
      {content}
    </Link>
  ) : (
    <button className={className} onClick={onClick} type="button">
      {content}
    </button>
  )
}

export function DashboardPage({ studyModules, questionBank, loading, error }) {
  const { openAria } = useOutletContext()
  const { license, setLicenseKey } = useLicense()
  const exam = license.exam

  if (loading) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Loading dashboard content"
          message="Fetching study modules and questions."
        />
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel title="Unable to load dashboard content" message={error} />
      </section>
    )
  }

  const modules = modulesForLicense(studyModules, license)
  const questions = questionsForLicense(questionBank, license)
  const minutes = modules.reduce((sum, module) => sum + module.estimatedMinutes, 0)

  const countsByDomain = questions.reduce((counts, question) => {
    const domain = exam.domainAliases?.[question.category] ?? question.category
    counts[domain] = (counts[domain] ?? 0) + 1
    return counts
  }, {})

  const blueprintRows = Object.entries(exam.weights)
    .map(([domain, weight]) => ({ domain, weight, count: countsByDomain[domain] ?? 0 }))
    .sort((a, b) => b.weight - a.weight)
  const maxWeight = Math.max(...blueprintRows.map((row) => row.weight))
  const otherLicenses = LICENSES.filter((item) => item.key !== license.key)
  const mocks = attemptsForLicense(license.key).filter((attempt) => attempt.kind === 'mock')
  const lastMock = mocks[0] ?? null
  const bestMock = mocks.reduce((best, attempt) => Math.max(best, attempt.score), 0)
  const weakDomain = weakestDomain(lastMock)

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            Dashboard · PSI Series {license.series}
          </p>
          <h2 className="font-serif text-3xl font-medium sm:text-4xl">
            Wisconsin {license.name} exam
          </h2>
          <p className="mt-2 max-w-[60ch] text-muted">{license.tagline}</p>
        </div>
        <Link
          className="font-mono text-[11px] tracking-widest text-muted uppercase transition hover:text-gold-400"
          to={`/licenses/${license.key}`}
        >
          Exam details →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          hint={`${minutes} guided minutes`}
          label="Study modules"
          value={modules.length}
        />
        <StatCard
          hint={`${license.name} practice questions`}
          label="Question bank"
          value={questions.length}
        />
        <StatCard
          hint={`${exam.timeLimitMinutes} minute limit`}
          label="Mock exam"
          value={exam.totalQuestions}
        />
        <StatCard hint="Needed to pass the PSI exam" label="Passing score" value={`${exam.passingScore}%`} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ActionTile
          body={modules[0] ? modules[0].title : 'Browse every lesson for this license.'}
          eyebrow="Study"
          title="Start a lesson"
          to={modules[0] ? `/study/${modules[0].id}` : '/study'}
        />
        <ActionTile
          body="100 questions, weighted like the real exam."
          eyebrow="Practice exam"
          title="Take a mock exam"
          to="/practice-exam"
        />
        <ActionTile
          body="Spaced repetition on the whole bank."
          eyebrow="Flashcards"
          title="Review cards"
          to="/flashcards"
        />
        <ActionTile
          body="Ask a question or get a study plan."
          eyebrow="ARIA"
          onClick={openAria}
          title="Talk to your coach"
        />
      </div>

      <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-[1fr_1.4fr]">
        <div className="bg-ink-900 p-6">
          <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            Mock exam record
          </p>
          {lastMock ? (
            <>
              <p className="font-mono text-4xl font-semibold text-paper tabular-nums">
                {lastMock.score}%{' '}
                <span
                  className={`align-middle font-mono text-xs tracking-widest uppercase ${
                    lastMock.passed ? 'text-gold-400' : 'text-muted'
                  }`}
                >
                  {lastMock.passed ? 'Passing' : 'Below 70%'}
                </span>
              </p>
              <p className="mt-2 text-sm text-muted">
                Last attempt {new Date(lastMock.at).toLocaleDateString()} · {mocks.length} taken ·
                best {bestMock}%
              </p>
            </>
          ) : (
            <>
              <p className="font-serif text-xl text-paper">No mock exam yet.</p>
              <p className="mt-2 text-sm text-muted">
                Take one early as a diagnostic. Your weakest domains show up here.
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col justify-between gap-4 bg-ink-900 p-6">
          <div>
            <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
              Recommended next
            </p>
            <p className="text-paper">
              {weakDomain
                ? `Your lowest domain last time was ${humanizeSlug(weakDomain)}. A 10-question drill targets it directly.`
                : `Start with a full ${license.name} mock exam to find your weak spots.`}
            </p>
          </div>
          <div>
            <Link
              className="inline-flex rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
              to={weakDomain ? `/practice-exam?drill=${weakDomain}` : '/practice-exam'}
            >
              {weakDomain ? `Drill ${humanizeSlug(weakDomain)}` : 'Take a mock exam'}
            </Link>
          </div>
        </div>
      </div>

      <AriaReadinessWidget onOpenAria={openAria} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            Exam blueprint
          </p>
          <p className="mb-4 text-sm text-muted">
            Questions per domain on a 100-question mock exam, and how many practice questions
            PassPro has for each.
          </p>
          <div className="border-t border-line">
            {blueprintRows.map((row) => (
              <div className="border-b border-line py-3" key={row.domain}>
                <div className="mb-1.5 flex items-baseline justify-between gap-4">
                  <span className="text-paper">{humanizeSlug(row.domain)}</span>
                  <span className="shrink-0 font-mono text-[12px] text-muted tabular-nums">
                    <span className="font-semibold text-gold-500">{row.weight}</span> on exam ·{' '}
                    {row.count} in bank
                  </span>
                </div>
                <div className="h-1 bg-ink-800">
                  <div
                    className="h-full bg-gold-500/80"
                    style={{ width: `${(row.weight / maxWeight) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            Study plan
          </p>
          <p className="mb-4 text-sm text-muted">Work top to bottom. Regulation comes first because it's 35%.</p>
          {modules.length ? (
            <div className="border-t border-line">
              {modules.map((module, index) => (
                <Link
                  className="flex items-center justify-between gap-4 border-b border-line py-3.5 transition hover:text-gold-400"
                  key={module.id}
                  to={`/study/${module.id}`}
                >
                  <span className="flex min-w-0 items-baseline gap-4">
                    <span className="shrink-0 font-mono text-[11px] text-muted tabular-nums">
                      M-{String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{module.title}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[12px] text-gold-500 tabular-nums">
                    {module.estimatedMinutes} min
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted">Lessons for this license are being loaded.</p>
          )}
        </div>
      </div>

      <div className="border border-line bg-ink-900 p-5">
        <p className="mb-3 font-mono text-[11px] tracking-widest text-muted uppercase">
          Going for another Wisconsin license too?
        </p>
        <div className="flex flex-wrap gap-2">
          {otherLicenses.map((item) => (
            <button
              className="border border-line px-3 py-2 text-sm text-paper transition hover:border-gold-500/60 hover:text-gold-400"
              key={item.key}
              onClick={() => setLicenseKey(item.key)}
              type="button"
            >
              {item.name} <span className="font-mono text-[11px] text-muted">{item.series}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
