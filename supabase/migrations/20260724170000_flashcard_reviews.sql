-- Spaced-repetition state for flashcards derived from public.questions.
--
-- Follows the aria_progress / user_access pattern: user_id is the Clerk user
-- id (text, no FK — PassPro uses Clerk, not Supabase Auth), RLS is enabled
-- with NO policies, and the only reader/writer is the aria Edge Function via
-- the service-role key (get_flashcards / rate_flashcard actions).
--
-- Note: an earlier, unused scaffold created public.flashcards /
-- public.flashcard_progress keyed to auth.users — those are empty leftovers
-- and are NOT used. Cards come from questions.know_this, so there is no
-- separate card table; card_id points straight at public.questions.

create table if not exists public.flashcard_reviews (
  user_id text not null,
  card_id uuid not null references public.questions(id) on delete cascade,
  interval_days real not null default 0,
  ease real not null default 2.5,
  reps integer not null default 0,
  next_review timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

alter table public.flashcard_reviews enable row level security;

-- Intentionally no policies: service-role access only, via the aria function.

create index if not exists idx_flashcard_reviews_due
  on public.flashcard_reviews (user_id, next_review);
