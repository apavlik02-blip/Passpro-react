// SM-2-lite scheduling for flashcard_reviews. Cards are questions from
// public.questions (fronted by their prompt, backed by correct answer +
// know_this), so there is no card table — card_id is a questions.id.
//
// Ratings:
//   again — forgot it: reps reset, ease drops, card comes back in ~10 minutes
//   good  — knew it: 1 day, then 3 days, then interval × ease
//   easy  — trivial: ease grows and the interval stretches ~30% further

export type FlashcardRating = 'again' | 'good' | 'easy'

export const FLASHCARD_RATINGS: FlashcardRating[] = ['again', 'good', 'easy']

export interface ReviewState {
  interval_days: number
  ease: number
  reps: number
  next_review: string
}

const TEN_MINUTES_MS = 10 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000
const MIN_EASE = 1.3

export function scheduleNextReview(
  previous: Pick<ReviewState, 'interval_days' | 'ease' | 'reps'> | null,
  rating: FlashcardRating,
): ReviewState {
  const ease = previous?.ease ?? 2.5
  const reps = previous?.reps ?? 0
  const interval = previous?.interval_days ?? 0
  const now = Date.now()

  if (rating === 'again') {
    return {
      interval_days: 0,
      ease: Math.max(MIN_EASE, ease - 0.2),
      reps: 0,
      next_review: new Date(now + TEN_MINUTES_MS).toISOString(),
    }
  }

  const newReps = reps + 1
  const newEase = rating === 'easy' ? ease + 0.15 : ease
  const growth = rating === 'easy' ? newEase * 1.3 : newEase

  let intervalDays: number
  if (newReps === 1) intervalDays = rating === 'easy' ? 2 : 1
  else if (newReps === 2) intervalDays = rating === 'easy' ? 4 : 3
  else intervalDays = Math.max(1, Math.round(interval * growth))

  return {
    interval_days: intervalDays,
    ease: newEase,
    reps: newReps,
    next_review: new Date(now + intervalDays * DAY_MS).toISOString(),
  }
}
