import { useMemo, useState } from 'react'
import { buildExam } from '../../lib/examBlueprints.js'
import { humanizeSlug } from '../../lib/format.js'
import { DataStatePanel } from '../DataStatePanel.jsx'

const secondaryButtonClass =
  'inline-flex min-w-[180px] items-center justify-center rounded-sm border border-line px-5 py-3 text-sm font-semibold text-paper transition hover:border-gold-500/70 disabled:cursor-not-allowed disabled:opacity-55'
const primaryButtonClass =
  'inline-flex min-w-[180px] items-center justify-center rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400'

export function ExamRunner({ blueprint, questionBank, onExit }) {
  const exam = useMemo(() => buildExam(blueprint, questionBank), [blueprint, questionBank])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

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

        {exam.shortfalls.length ? (
          <DataStatePanel
            title="Question bank coverage note"
            message={`Some domains reused questions to reach the target count: ${exam.shortfalls
              .map((s) => `${s.domain} (${s.available}/${s.target})`)
              .join(', ')}.`}
          />
        ) : null}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {questions.map((question, questionIndex) => {
            const givenAnswer = answers[question.id]
            const isCorrect = givenAnswer === question.correctOption

            return (
              <article className="border border-line bg-ink-900 p-6" key={question.id}>
                <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
                  Question {questionIndex + 1} - {humanizeSlug(question.category)}
                </p>
                <h3 className="mb-2 font-serif text-lg font-medium">{question.prompt}</h3>
                <p className={isCorrect ? 'mb-2 text-emerald-400' : 'mb-2 text-muted'}>
                  Your answer: {givenAnswer ?? 'Not answered'}{' '}
                  {isCorrect ? '(correct)' : `(correct answer: ${question.correctOption})`}
                </p>
                <p className="text-muted">{question.explanation}</p>
              </article>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
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
          <button className={primaryButtonClass} onClick={() => setSubmitted(true)} type="button">
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
