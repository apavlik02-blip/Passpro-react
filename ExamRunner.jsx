import { useMemo, useState } from 'react'
import { buildExam } from '../../lib/examBlueprints.js'
import { humanizeSlug } from '../../lib/format.js'
import { recordAttempt } from '../../lib/examHistory.js'
import { useAriaProgress } from '../../hooks/useAriaProgress.js'
import { DataStatePanel } from '../DataStatePanel.jsx'

const secondaryButtonClass =
  'inline-flex min-w-[180px] items-center justify-center rounded-sm border border-line px-5 py-3 text-sm font-semibold text-paper transition hover:border-gold-500/70 disabled:cursor-not-allowed disabled:opacity-55'
const primaryButtonClass =
  'inline-flex min-w-[180px] items-center justify-center rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400'

function WrongAnswerReview({ questions, answers }) {
  const wrongAnswers = questions.filter((q) => answers[q.id] !== q.correctOption)

  if (!wrongAnswers.length) {
    return (
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Incorrect answers
        </p>
        <p className="text-muted">Perfect score! No wrong answers to review.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-4 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
        {wrongAnswers.length} incorrect answers
      </p>
      <div className="space-y-4">
        {wrongAnswers.map((question) => {
          const givenAnswer = answers[question.id]
          return (
            <article className="border border-line bg-ink-900 p-6" key={question.id}>
              <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
                {humanizeSlug(question.category)}
              </p>
              <h3 className="mb-3 font-serif text-lg font-medium">{question.prompt}</h3>

              <div className="mb-3 space-y-2 border-t border-line/40 pt-3">
                <p className="text-muted">
                  <span className="font-mono text-[11px] font-bold tracking-widest uppercase">
                    Your answer:{' '}
                  </span>
                  <span className="text-red-400">{givenAnswer ?? 'Not answered'}</span>
                </p>
                <p className="text-muted">
                  <span className="font-mono text-[11px] font-bold tracking-widest uppercase">
                    Correct answer:{' '}
                  </span>
                  <span className="text-emerald-400">{question.correctOption}</span>
                </p>
              </div>

              {question.knowThis && (
                <div className="mb-3 border-l-2 border-gold-500/50 bg-ink-950 px-4 py-3">
                  <p className="font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
                    Key concept
                  </p>
                  <p className="text-paper">{question.knowThis}</p>
                </div>
              )}

              {question.explanation && (
                <p className="text-muted text-sm">{question.explanation}</p>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}

function DomainScoreBreakdown({ questions, answers, blueprint }) {
  const scoresByDomain = {}
  const weights = blueprint.weights

  questions.forEach((q) => {
    const domain = q.category
    if (!scoresByDomain[domain]) {
      scoresByDomain[domain] = { correct: 0, total: 0 }
    }
    scoresByDomain[domain].total += 1
    if (answers[q.id] === q.correctOption) {
      scoresByDomain[domain].correct += 1
    }
  })

  const domainRows = Object.entries(weights)
    .map(([domain, weight]) => {
      const scores = scoresByDomain[domain] || { correct: 0, total: 0 }
      const percentScore = scores.total > 0 ? Math.round((scores.correct / scores.total) * 100) : 0
      const performanceDelta = percentScore - weight
      return {
        domain,
        weight,
        ...scores,
        percentScore,
        performanceDelta,
      }
    })
    .sort((a, b) => b.weight - a.weight)

  return (
    <div>
      <p className="mb-4 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
        Performance by domain
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-line text-sm">
          <thead>
            <tr className="border-b border-line bg-ink-900">
              <th className="border-r border-line px-4 py-3 text-left font-serif text-paper">
                Domain
              </th>
              <th className="border-r border-line px-4 py-3 text-center font-mono text-paper">
                Score
              </th>
              <th className="border-r border-line px-4 py-3 text-center font-mono text-paper">
                Weight
              </th>
              <th className="px-4 py-3 text-left font-mono text-paper">Status</th>
            </tr>
          </thead>
          <tbody>
            {domainRows.map((row) => {
              const isUnderperforming = row.performanceDelta < -10
              const statusColor = isUnderperforming ? 'text-red-400' : 'text-emerald-400'
              const statusLabel = isUnderperforming
                ? `Underperforming (${row.performanceDelta}%)`
                : `On pace (+${row.performanceDelta}%)`

              return (
                <tr key={row.domain} className="border-b border-line/40 hover:bg-ink-900/40">
                  <td className="border-r border-line/40 px-4 py-3 text-paper">
                    <span className="font-serif">{humanizeSlug(row.domain)}</span>
                  </td>
                  <td className="border-r border-line/40 px-4 py-3 text-center font-mono">
                    <span className={row.percentScore >= row.weight ? 'text-emerald-400' : 'text-muted'}>
                      {row.correct}/{row.total} ({row.percentScore}%)
                    </span>
                  </td>
                  <td className="border-r border-line/40 px-4 py-3 text-center font-mono text-muted">
                    {row.weight}%
                  </td>
                  <td className={`px-4 py-3 font-mono text-[11px] font-bold ${statusColor}`}>
                    {statusLabel}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ExamRunner({ blueprint, questionBank, onExit, onRetake }) {
  const exam = useMemo(() => buildExam(blueprint, questionBank), [blueprint, questionBank])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const { submitQuizResult } = useAriaProgress()

  const handleRetake = () => {
    // Parent remounts the runner so a retake draws a freshly sampled exam.
    if (onRetake) {
      onRetake()
      return
    }
    setIndex(0)
    setAnswers({})
    setSubmitted(false)
  }

  const handleSubmit = () => {
    setSubmitted(true)

    const totals = {}
    let correctCount = 0
    exam.questions.forEach((question) => {
      const domain = question.category
      totals[domain] ??= { correct: 0, total: 0 }
      totals[domain].total += 1
      if (answers[question.id] === question.correctOption) {
        totals[domain].correct += 1
        correctCount += 1
      }
    })
    const domainScores = Object.fromEntries(
      Object.entries(totals).map(([domain, { correct, total }]) => [
        domain,
        Math.round((correct / total) * 100),
      ]),
    )

    const overallScore = Math.round((correctCount / exam.questions.length) * 100)

    submitQuizResult({
      overall_score: overallScore,
      domain_scores: domainScores,
    })

    recordAttempt({
      license: blueprint.license ?? blueprint.key,
      kind: blueprint.isDrill ? 'drill' : 'mock',
      label: blueprint.label,
      score: overallScore,
      passed: overallScore >= blueprint.passingScore,
      domainScores,
    })
  }

  const questions = exam.questions
  const currentQuestion = questions[index]

  if (!questions.length) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Not enough questions yet"
          message={`No questions are available for the ${blueprint.label} exam yet.`}
        />
        <button className={secondaryButtonClass} onClick={onExit} type="button">
          Back to exam picker
        </button>
      </section>
    )
  }

  if (submitted) {
    const correctCount = questions.reduce(
      (sum, question) => sum + (answers[question.id] === question.correctOption ? 1 : 0),
      0,
    )
    const scorePercent = Math.round((correctCount / questions.length) * 100)
    const passed = scorePercent >= blueprint.passingScore

    return (
      <section className="flex flex-col gap-6">
        <div>
          <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            {blueprint.label} results
          </p>
          <h2 className="font-serif text-3xl font-medium">
            <span className="font-mono tabular-nums">
              {correctCount} / {questions.length}
            </span>{' '}
            correct - <span className="font-mono tabular-nums">{scorePercent}%</span>{' '}
            {passed ? '(Pass)' : '(Below passing score)'}
          </h2>
        </div>

        {exam.shortfalls.length && !blueprint.isDrill ? (
          <DataStatePanel
            title="Question bank coverage note"
            message={`Some domains have fewer practice questions than the blueprint calls for, so this exam is a little shorter: ${exam.shortfalls
              .map((s) => `${humanizeSlug(s.domain)} (${s.available}/${s.target})`)
              .join(', ')}.`}
          />
        ) : null}

        <div className="border border-line bg-ink-900 p-6">
          <DomainScoreBreakdown questions={questions} answers={answers} blueprint={blueprint} />
        </div>

        <div className="border border-line bg-ink-900 p-6">
          <WrongAnswerReview questions={questions} answers={answers} />
        </div>

        <div className="border border-line bg-ink-900 p-6">
          <p className="mb-4 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            All questions review
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {questions.map((question, questionIndex) => {
              const givenAnswer = answers[question.id]
              const isCorrect = givenAnswer === question.correctOption

              return (
                <article className="border border-line bg-ink-950 p-4" key={question.id}>
                  <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
                    Q{questionIndex + 1} - {humanizeSlug(question.category)}
                  </p>
                  <h3 className="mb-2 font-serif text-sm font-medium">{question.prompt}</h3>
                  <p className={isCorrect ? 'text-emerald-400' : 'text-muted'}>
                    <span className="font-mono text-[10px]">Your answer:</span> {givenAnswer ?? 'Not answered'}{' '}
                    {isCorrect ? '(correct)' : `(correct: ${question.correctOption})`}
                  </p>
                </article>
              )
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className={primaryButtonClass} onClick={handleRetake} type="button">
            Retake exam with fresh questions
          </button>
          <button className={secondaryButtonClass} onClick={onExit} type="button">
            Back to exam picker
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          {blueprint.label} exam
        </p>
        <h2 className="font-serif text-3xl font-medium">
          Question <span className="font-mono tabular-nums">{index + 1}</span> of{' '}
          <span className="font-mono tabular-nums">{questions.length}</span>
        </h2>
      </div>

      <article className="border border-line bg-ink-900 p-6">
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          {humanizeSlug(currentQuestion.category)}
        </p>
        <h3 className="mb-4 font-serif text-lg font-medium">{currentQuestion.prompt}</h3>
        <ol className="space-y-2">
          {currentQuestion.options.map((option) => (
            <li key={option}>
              <label className="flex cursor-pointer items-center gap-3 border border-line bg-ink-950 px-4 py-3 text-paper transition hover:border-gold-500/60">
                <input
                  checked={answers[currentQuestion.id] === option}
                  className="h-4 w-4 accent-gold-500"
                  name={currentQuestion.id}
                  onChange={() =>
                    setAnswers((current) => ({ ...current, [currentQuestion.id]: option }))
                  }
                  type="radio"
                  value={option}
                />
                {option}
              </label>
            </li>
          ))}
        </ol>
      </article>

      <div className="flex flex-wrap items-center gap-3">
        <button
          className={secondaryButtonClass}
          disabled={index === 0}
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
          type="button"
        >
          Previous
        </button>
        {index < questions.length - 1 ? (
          <button
            className={primaryButtonClass}
            onClick={() => setIndex((current) => Math.min(questions.length - 1, current + 1))}
            type="button"
          >
            Next
          </button>
        ) : (
          <button className={primaryButtonClass} onClick={handleSubmit} type="button">
            Submit exam
          </button>
        )}
        <button className={secondaryButtonClass} onClick={onExit} type="button">
          Exit exam
        </button>
      </div>
    </section>
  )
}
