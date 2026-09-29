import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/layout/PublicHeader.jsx'
import { SiteFooter } from '../components/layout/SiteFooter.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { EXAM_BLUEPRINTS, blueprintDomains, buildExam } from '../lib/examBlueprints.js'
import { humanizeSlug } from '../lib/format.js'
import { supabase, supabaseConfigured } from '../lib/supabase.js'

const DIAGNOSTIC_LENGTH = 25

const DISCLAIMER =
  "PassPro is supplemental exam prep. It does not replace Wisconsin's required 20-hour pre-licensing course from an approved provider."

const primaryButton =
  'inline-flex items-center justify-center rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-55'
const secondaryButton =
  'inline-flex items-center justify-center rounded-sm border border-line px-6 py-3.5 text-sm font-semibold text-paper transition hover:border-gold-500/70'

// Scale a 100-question blueprint down to `total` questions, keeping the
// outline's proportions (largest-remainder rounding so the counts sum exactly).
function scaleBlueprint(blueprint, total) {
  const entries = Object.entries(blueprint.weights)
  const sum = entries.reduce((acc, [, weight]) => acc + weight, 0)
  const raw = entries.map(([domain, weight]) => [domain, (weight / sum) * total])
  const floored = raw.map(([domain, value]) => [domain, Math.floor(value), value - Math.floor(value)])
  let remaining = total - floored.reduce((acc, [, count]) => acc + count, 0)
  ;[...floored]
    .sort((a, b) => b[2] - a[2])
    .forEach((entry) => {
      if (remaining > 0) {
        entry[1] += 1
        remaining -= 1
      }
    })
  return { ...blueprint, weights: Object.fromEntries(floored.map(([domain, count]) => [domain, count])) }
}

function mapQuestion(record) {
  return {
    id: record.id,
    category: record.domain,
    prompt: record.question,
    options: record.options ?? [],
    correctOption: record.correct,
    explanation: record.explanation,
  }
}

function domainResults(questions, answers) {
  const byDomain = {}
  questions.forEach((question) => {
    const entry = (byDomain[question.category] ??= { domain: question.category, correct: 0, total: 0 })
    entry.total += 1
    if (answers[question.id] === question.correctOption) entry.correct += 1
  })
  return Object.values(byDomain).sort((a, b) => a.correct / a.total - b.correct / b.total)
}

function ExamChooser({ onStart, loading, error }) {
  return (
    <section>
      <h2 className="mb-2 font-serif text-2xl font-medium">Which exam are you retaking?</h2>
      <p className="mb-6 text-muted">
        25 questions, weighted like the real PSI outline. About 15 minutes. No signup to start.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {EXAM_BLUEPRINTS.map((blueprint) => (
          <button
            className="border border-line bg-ink-900 p-5 text-left transition hover:border-gold-500/70 disabled:opacity-55"
            disabled={loading}
            key={blueprint.key}
            onClick={() => onStart(blueprint)}
            type="button"
          >
            <span className="block font-serif text-lg">{blueprint.label}</span>
            <span className="font-mono text-[11px] tracking-widest text-gold-500 uppercase">
              Series {blueprint.series}
            </span>
          </button>
        ))}
      </div>
      {loading && <p className="mt-5 font-mono text-[11px] tracking-widest text-muted uppercase">Loading questions…</p>}
      {error && <p className="mt-5 text-red-400">{error}</p>}
    </section>
  )
}

function QuestionStep({ question, index, total, selected, onSelect, onNext }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] tracking-widest text-muted uppercase">
        <span>
          Question {index + 1} of {total}
        </span>
        <span className="text-gold-500">{humanizeSlug(question.category)}</span>
      </div>
      <div className="mb-6 h-1 w-full bg-ink-800">
        <div className="h-1 bg-gold-500" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
      <h2 className="mb-6 font-serif text-xl leading-snug font-medium sm:text-2xl">{question.prompt}</h2>
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            className={`block w-full border p-4 text-left transition ${
              selected === option
                ? 'border-gold-500 bg-ink-800 text-paper'
                : 'border-line bg-ink-900 text-paper hover:border-gold-500/60'
            }`}
            key={option}
            onClick={() => onSelect(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <button className={primaryButton} disabled={!selected} onClick={onNext} type="button">
          {index + 1 === total ? 'See my results' : 'Next question'}
        </button>
      </div>
    </section>
  )
}

function SignupForm({ blueprint, score, weakAreas }) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()
    if (!supabaseConfigured) {
      setStatus('error')
      return
    }
    setStatus('saving')
    const { error } = await supabase.from('student_leads').insert({
      email: email.trim(),
      exam: blueprint.key,
      score,
      weak_areas: weakAreas,
      consent,
      source: 'retake',
    })
    setStatus(error ? 'error' : 'saved')
  }

  if (status === 'saved') {
    return (
      <div className="border border-gold-500/60 bg-ink-900 p-6">
        <p className="font-serif text-lg">You're on the list.</p>
        <p className="mt-2 text-muted">
          Amanda will follow up by email with study help for your weakest areas.
        </p>
      </div>
    )
  }

  return (
    <form className="border border-line bg-ink-900 p-6" onSubmit={handleSubmit}>
      <p className="mb-1 font-serif text-lg">Want help with your weak areas?</p>
      <p className="mb-4 text-muted">
        Leave your email and Amanda will follow up with study help for the topics above, plus
        details on the Founding 25 (free PassPro access until exam day for the first 25 Wisconsin
        test-takers).
      </p>
      <label className="mb-3 block">
        <span className="sr-only">Email</span>
        <input
          autoComplete="email"
          className="w-full border border-line bg-ink-950 px-4 py-3 text-paper placeholder:text-muted focus:border-gold-500 focus:outline-none"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
      </label>
      <label className="mb-4 flex items-start gap-3 text-sm text-muted">
        <input
          checked={consent}
          className="mt-1"
          onChange={(event) => setConsent(event.target.checked)}
          required
          type="checkbox"
        />
        <span>
          Yes, PassPro can email me about my results and exam prep. I can unsubscribe anytime. See
          the{' '}
          <Link className="text-gold-400 underline" to="/privacy">
            privacy policy
          </Link>
          .
        </span>
      </label>
      <button className={primaryButton} disabled={status === 'saving'} type="submit">
        {status === 'saving' ? 'Saving…' : 'Send me study help'}
      </button>
      {status === 'error' && (
        <p className="mt-3 text-red-400">
          That didn't go through. You can email amanda@passpro.company instead.
        </p>
      )}
    </form>
  )
}

function Results({ blueprint, questions, answers, onRestart }) {
  const correct = questions.filter((q) => answers[q.id] === q.correctOption).length
  const score = Math.round((correct / questions.length) * 100)
  const domains = domainResults(questions, answers)
  const weakest = domains.filter((d) => d.correct < d.total).slice(0, 2)
  const wrong = questions.filter((q) => answers[q.id] !== q.correctOption)

  return (
    <section className="space-y-10">
      <div>
        <p className="mb-2 font-mono text-[11px] tracking-widest text-gold-500 uppercase">
          {blueprint.label} · diagnostic
        </p>
        <p className="font-serif text-5xl text-gold-400">
          {correct}/{questions.length}
        </p>
        <p className="mt-2 text-muted">
          {score}% on this 25-question check. The real exam needs 70% on 100 questions. This is a
          short practice check, not a prediction of your exam result.
        </p>
      </div>

      {weakest.length > 0 && (
        <div>
          <h2 className="mb-3 font-serif text-2xl font-medium">Start here</h2>
          <p className="mb-4 text-muted">
            Your two weakest areas on this check. Compare them with the topic breakdown on your PSI
            score report.
          </p>
          <ol className="list-decimal space-y-1 pl-6 text-paper">
            {weakest.map((d) => (
              <li key={d.domain}>{humanizeSlug(d.domain)}</li>
            ))}
          </ol>
        </div>
      )}

      <div>
        <h2 className="mb-3 font-serif text-2xl font-medium">By topic</h2>
        <div className="border border-line">
          {domains.map((d) => (
            <div className="flex justify-between border-b border-line px-4 py-3 last:border-b-0" key={d.domain}>
              <span className="text-paper">{humanizeSlug(d.domain)}</span>
              <span className="font-mono text-sm text-gold-400">
                {d.correct}/{d.total}
              </span>
            </div>
          ))}
        </div>
      </div>

      <SignupForm
        blueprint={blueprint}
        score={score}
        weakAreas={weakest.map((d) => d.domain)}
      />

      {wrong.length > 0 && (
        <div>
          <h2 className="mb-4 font-serif text-2xl font-medium">Review what you missed</h2>
          <div className="space-y-4">
            {wrong.map((q) => (
              <article className="border border-line bg-ink-900 p-5" key={q.id}>
                <p className="mb-2 font-mono text-[11px] tracking-widest text-gold-500 uppercase">
                  {humanizeSlug(q.category)}
                </p>
                <p className="mb-3 font-serif text-lg">{q.prompt}</p>
                <p className="text-sm text-muted">
                  Your answer: <span className="text-red-400">{answers[q.id]}</span>
                </p>
                <p className="text-sm text-muted">
                  Correct: <span className="text-emerald-400">{q.correctOption}</span>
                </p>
                {q.explanation && <p className="mt-3 text-sm text-paper">{q.explanation}</p>}
              </article>
            ))}
          </div>
        </div>
      )}

      <button className={secondaryButton} onClick={onRestart} type="button">
        Try another exam
      </button>
    </section>
  )
}

export function RetakePage() {
  useDocumentMeta({
    title: 'Failed the Wisconsin Insurance Exam? Free Retake Diagnostic | PassPro',
    description:
      'Free 25-question Wisconsin insurance exam diagnostic for Life, Accident & Health, Property, Casualty, and Personal Lines. Find your weakest topics before you rebook. No signup.',
  })

  const [blueprint, setBlueprint] = useState(null)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [index, setIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function start(chosen) {
    setError('')
    if (!supabaseConfigured) {
      setError('The diagnostic is unavailable right now. Please try again later.')
      return
    }
    setLoading(true)
    const { data, error: queryError } = await supabase
      .from('questions')
      .select('id, domain, question, options, correct, explanation')
      .in('domain', [...blueprintDomains(chosen)])
    setLoading(false)
    if (queryError || !data?.length) {
      setError('Could not load questions. Please try again in a minute.')
      return
    }
    const { questions: picked } = buildExam(scaleBlueprint(chosen, DIAGNOSTIC_LENGTH), data.map(mapQuestion))
    setBlueprint(chosen)
    setQuestions(picked)
    setAnswers({})
    setIndex(0)
    setFinished(false)
    window.scrollTo(0, 0)
  }

  function restart() {
    setBlueprint(null)
    setQuestions([])
    setFinished(false)
    window.scrollTo(0, 0)
  }

  const current = questions[index]

  return (
    <main className="flex min-h-screen flex-col bg-ink-950 text-paper">
      <PublicHeader />
      <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 sm:px-10 sm:py-16">
        {!blueprint && (
          <header className="mb-10">
            <p className="mb-4 font-mono text-[11px] font-bold tracking-[0.18em] text-gold-500 uppercase">
              Second shot, Wisconsin
            </p>
            <h1 className="mb-4 font-serif text-4xl leading-[1.15] font-medium text-balance sm:text-5xl">
              Didn't pass? You're not starting over.
            </h1>
            <p className="text-lg text-paper">
              In Wisconsin you can retest as soon as about two days later (seat permitting), with no
              limit on attempts, and your pre-licensing education stays valid for a year. Find your
              weakest topics before you rebook.
            </p>
          </header>
        )}

        {!blueprint && <ExamChooser error={error} loading={loading} onStart={start} />}

        {blueprint && !finished && current && (
          <QuestionStep
            index={index}
            onNext={() => {
              if (index + 1 === questions.length) {
                setFinished(true)
              } else {
                setIndex(index + 1)
              }
              window.scrollTo(0, 0)
            }}
            onSelect={(option) => setAnswers({ ...answers, [current.id]: option })}
            question={current}
            selected={answers[current.id]}
            total={questions.length}
          />
        )}

        {blueprint && finished && (
          <Results answers={answers} blueprint={blueprint} onRestart={restart} questions={questions} />
        )}

        <p className="mt-12 text-sm text-muted">{DISCLAIMER}</p>
      </div>
      <SiteFooter />
    </main>
  )
}
