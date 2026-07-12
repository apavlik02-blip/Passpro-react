import { useState } from 'react'

function scoreQuiz(questions, answers) {
  const domainTotals = {}

  questions.forEach((q) => {
    const bucket = domainTotals[q.domain] ?? { correct: 0, total: 0 }
    bucket.total += 1
    if (answers[q.id] === q.correct) bucket.correct += 1
    domainTotals[q.domain] = bucket
  })

  const domain_scores = Object.fromEntries(
    Object.entries(domainTotals).map(([domain, { correct, total }]) => [
      domain,
      Math.round((correct / total) * 100),
    ]),
  )

  const correctCount = questions.reduce((sum, q) => sum + (answers[q.id] === q.correct ? 1 : 0), 0)
  const overall_score = Math.round((correctCount / questions.length) * 100)

  return { overall_score, correct_count: correctCount, total_questions: questions.length, domain_scores }
}

export function AriaQuiz({ questions, onComplete }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)

  const current = questions[index]

  if (results) {
    return (
      <div className="border border-line bg-ink-950 p-5">
        <p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Quiz complete
        </p>
        <p className="mb-4 font-mono text-3xl font-semibold text-gold-500 tabular-nums">
          {results.overall_score}%
        </p>
        <p className="mb-4 text-sm text-muted">
          {results.correct_count} of {results.total_questions} correct.
        </p>
        <button
          className="rounded-sm bg-gold-500 px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
          onClick={() => onComplete(results)}
          type="button"
        >
          Continue
        </button>
      </div>
    )
  }

  return (
    <div className="border border-line bg-ink-950 p-5">
      <p className="mb-3 font-mono text-[11px] text-muted">
        Question {index + 1} of {questions.length}
      </p>
      <p className="mb-4 text-paper">{current.question}</p>
      <div className="mb-4 space-y-2">
        {current.options.map((option) => (
          <button
            className={`block w-full border px-4 py-2.5 text-left text-sm transition ${
              answers[current.id] === option
                ? 'border-gold-500/70 bg-gold-500/10 text-paper'
                : 'border-line text-muted hover:border-gold-500/40'
            }`}
            key={option}
            onClick={() => setAnswers((prev) => ({ ...prev, [current.id]: option }))}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="w-full rounded-sm bg-gold-500 px-4 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!answers[current.id]}
        onClick={() => {
          if (index < questions.length - 1) {
            setIndex((i) => i + 1)
          } else {
            setResults(scoreQuiz(questions, answers))
          }
        }}
        type="button"
      >
        {index === questions.length - 1 ? 'Finish quiz' : 'Next question'}
      </button>
    </div>
  )
}
