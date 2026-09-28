import { useMemo, useState } from 'react'
import { DataStatePanel } from '../components/DataStatePanel.jsx'
import { humanizeSlug } from '../lib/format.js'
import { useFlashcards } from '../hooks/useFlashcards.js'
import { useLicense } from '../hooks/useLicense.jsx'
import { questionsForLicense } from '../lib/licenses.js'

const secondaryButtonClass =
  'inline-flex items-center justify-center rounded-sm border border-line px-5 py-3 text-sm font-semibold text-paper transition hover:border-gold-500/70'

function dueTime(review) {
  return new Date(review.next_review).getTime()
}

function StatChip({ label, value }) {
  return (
    <span className="border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
      {label}: <span className="font-semibold text-gold-500 tabular-nums">{value}</span>
    </span>
  )
}

function RatingButton({ label, hint, className, onClick }) {
  return (
    <button
      className={`flex min-w-[110px] flex-1 flex-col items-center gap-1 rounded-sm border px-4 py-3 text-sm font-semibold transition sm:flex-none ${className}`}
      onClick={onClick}
      type="button"
    >
      {label}
      <span className="font-mono text-[10px] font-normal tracking-wide uppercase opacity-70">
        {hint}
      </span>
    </button>
  )
}

// Session model (all state changes happen in event handlers — render is pure):
// - The base queue is derived from live review state: cards due at fetch time
//   (oldest first), then unseen cards in bank order.
// - `dismissed` holds every card rated this session, so rating always advances
//   even if a save fails; `repeats` re-queues "Again" cards at the end.
export function FlashcardsPage({ questionBank, loading, error }) {
  const { reviews, loadedAt, loading: reviewsLoading, configured, rate } = useFlashcards()
  const [domainFilter, setDomainFilter] = useState('all')
  const [dismissed, setDismissed] = useState(() => new Set())
  const [repeats, setRepeats] = useState([])
  const [aheadIds, setAheadIds] = useState(null) // non-null = reviewing ahead of schedule
  const [showBack, setShowBack] = useState(false)
  const [reviewedCount, setReviewedCount] = useState(0)

  const cardsById = useMemo(
    () => new Map(questionBank.map((question) => [question.id, question])),
    [questionBank],
  )

  const { license } = useLicense()
  const licenseBank = useMemo(
    () => questionsForLicense(questionBank, license),
    [questionBank, license],
  )

  const domains = useMemo(
    () => [...new Set(licenseBank.map((question) => question.category))].sort(),
    [licenseBank],
  )

  // A filter left over from another license track falls back to "all".
  const activeFilter = domains.includes(domainFilter) ? domainFilter : 'all'

  const deck = useMemo(
    () =>
      activeFilter === 'all'
        ? licenseBank
        : licenseBank.filter((question) => question.category === activeFilter),
    [licenseBank, activeFilter],
  )

  const reviewMap = reviews ?? new Map()

  const baseQueue = useMemo(() => {
    if (!loadedAt) return []
    const map = reviews ?? new Map()
    const due = deck
      .filter((question) => {
        const review = map.get(question.id)
        return review && dueTime(review) <= loadedAt
      })
      .sort((a, b) => dueTime(map.get(a.id)) - dueTime(map.get(b.id)))
    const fresh = deck.filter((question) => !map.has(question.id))
    return [...due, ...fresh].map((question) => question.id)
  }, [deck, reviews, loadedAt])

  const resetSession = () => {
    setDismissed(new Set())
    setRepeats([])
    setAheadIds(null)
    setShowBack(false)
    setReviewedCount(0)
  }

  const handleFilterChange = (event) => {
    setDomainFilter(event.target.value)
    resetSession()
  }

  const handleReviewAhead = () => {
    const scheduled = deck
      .filter((question) => reviewMap.has(question.id))
      .sort((a, b) => dueTime(reviewMap.get(a.id)) - dueTime(reviewMap.get(b.id)))
      .slice(0, 20)
      .map((question) => question.id)
    setDismissed(new Set())
    setRepeats([])
    setShowBack(false)
    setReviewedCount(0)
    setAheadIds(scheduled)
  }

  const handleRate = (cardId, rating) => {
    rate(cardId, rating) // fire-and-forget; a failed save just means no persistence
    setDismissed((prev) => new Set(prev).add(cardId))
    setRepeats((prev) => {
      const rest = prev.filter((id) => id !== cardId)
      return rating === 'again' ? [...rest, cardId] : rest
    })
    setShowBack(false)
    setReviewedCount((prev) => prev + 1)
  }

  if (!configured) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Flashcards are not configured"
          message="Connect Supabase to load the deck and track your reviews."
        />
      </section>
    )
  }

  if (loading || reviewsLoading) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel
          title="Loading flashcards"
          message="Building your deck from the question bank."
        />
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col gap-6">
        <DataStatePanel title="Unable to load flashcards" message={error} />
      </section>
    )
  }

  const sessionQueue = aheadIds ?? baseQueue
  const queue = [...sessionQueue.filter((id) => !dismissed.has(id)), ...repeats]
  const currentCard = queue.length ? cardsById.get(queue[0]) : null

  const dueCount = deck.filter((question) => {
    const review = reviewMap.get(question.id)
    return review && dueTime(review) <= loadedAt
  }).length
  const newCount = deck.filter((question) => !reviewMap.has(question.id)).length
  const learningCount = deck.length - newCount

  const header = (
    <>
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Flashcards · {license.name} ({license.series})
        </p>
        <h2 className="font-serif text-3xl font-medium">Key concepts on spaced repetition.</h2>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-muted uppercase">
          Domain
          <select
            className="border border-line bg-ink-900 px-3 py-2 font-sans text-sm normal-case text-paper focus:border-gold-500/70 focus:outline-none"
            onChange={handleFilterChange}
            value={activeFilter}
          >
            <option value="all">All {license.name} domains</option>
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {humanizeSlug(domain)}
              </option>
            ))}
          </select>
        </label>
        <StatChip label="Due" value={dueCount} />
        <StatChip label="New" value={newCount} />
        <StatChip label="Learning" value={learningCount} />
      </div>
    </>
  )

  if (!currentCard) {
    const nextDue = deck
      .map((question) => reviewMap.get(question.id))
      .filter(Boolean)
      .map(dueTime)
      .filter((time) => time > loadedAt)
      .sort((a, b) => a - b)[0]

    return (
      <section className="flex flex-col gap-6">
        {header}
        <article className="border border-line bg-ink-900 p-8 text-center">
          <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            {reviewedCount ? 'Session complete' : 'All caught up'}
          </p>
          <p className="mb-1 font-serif text-2xl font-medium">
            {reviewedCount
              ? `You reviewed ${reviewedCount} card${reviewedCount === 1 ? '' : 's'}.`
              : 'Nothing is due right now.'}
          </p>
          <p className="mb-6 text-muted">
            {nextDue
              ? `Your next card comes due ${new Date(nextDue).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })}.`
              : 'Rate cards with Again, Good, or Easy and they will come back on a schedule.'}
          </p>
          {!aheadIds && learningCount > 0 ? (
            <button className={secondaryButtonClass} onClick={handleReviewAhead} type="button">
              Review ahead
            </button>
          ) : null}
        </article>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-6">
      {header}

      <p className="font-mono text-[11px] tracking-wide text-muted uppercase">
        Card <span className="text-gold-500 tabular-nums">{reviewedCount + 1}</span> of{' '}
        <span className="tabular-nums">{reviewedCount + queue.length}</span>
        {aheadIds ? ' · reviewing ahead of schedule' : ''}
      </p>

      <article className="border border-line bg-ink-900 p-8">
        <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          {humanizeSlug(currentCard.category)}
        </p>
        <h3 className="font-serif text-xl font-medium">{currentCard.prompt}</h3>

        {showBack ? (
          <div className="mt-6 border-t border-line pt-6">
            <p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-muted uppercase">
              Answer
            </p>
            <p className="mb-4 font-serif text-lg text-gold-400">{currentCard.correctOption}</p>

            {currentCard.knowThis ? (
              <div className="mb-4 border-l-2 border-gold-500/50 bg-ink-950 px-4 py-3">
                <p className="font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
                  Know this
                </p>
                <p className="text-paper">{currentCard.knowThis}</p>
              </div>
            ) : null}

            {currentCard.explanation ? (
              <p className="text-sm text-muted">{currentCard.explanation}</p>
            ) : null}
          </div>
        ) : null}
      </article>

      {showBack ? (
        <div className="flex flex-wrap gap-3">
          <RatingButton
            className="border-red-400/40 text-red-400 hover:border-red-400"
            hint="under 10 min"
            label="Again"
            onClick={() => handleRate(currentCard.id, 'again')}
          />
          <RatingButton
            className="border-gold-500/50 text-gold-400 hover:border-gold-500"
            hint="days out"
            label="Good"
            onClick={() => handleRate(currentCard.id, 'good')}
          />
          <RatingButton
            className="border-emerald-400/40 text-emerald-400 hover:border-emerald-400"
            hint="longer"
            label="Easy"
            onClick={() => handleRate(currentCard.id, 'easy')}
          />
        </div>
      ) : (
        <div>
          <button
            className="inline-flex min-w-[180px] items-center justify-center rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
            onClick={() => setShowBack(true)}
            type="button"
          >
            Show answer
          </button>
        </div>
      )}
    </section>
  )
}
