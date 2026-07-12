-- ARIA study coach progress tracking.
--
-- PassPro uses Clerk for auth, not Supabase Auth, so this table cannot
-- reference auth.users(id) or rely on auth.uid() in RLS policies the way
-- the upstream ARIA schema does. Instead:
--   - user_id is the Clerk user id (text, e.g. "user_2abc...").
--   - RLS is enabled with NO policies, so the anon/publishable key can
--     never read or write this table directly.
--   - The only writer is the "aria" Supabase Edge Function, which runs
--     with the service role key after verifying the caller's Clerk
--     session token server-side.

create table if not exists public.aria_progress (
  user_id text primary key,
  exam_type text default 'life',
  current_readiness integer not null default 45,
  weak_domains text[] not null default array['riders', 'health_insurance'],
  last_quiz_score integer,
  quiz_history jsonb not null default '[]'::jsonb,
  study_streak integer not null default 0,
  last_study_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.aria_progress enable row level security;

-- Intentionally no policies: only the service-role key (used exclusively
-- by the "aria" Edge Function) can read or write this table.

create index if not exists idx_aria_progress_readiness
  on public.aria_progress (current_readiness);

create or replace function public.set_aria_progress_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists aria_progress_set_updated_at on public.aria_progress;
create trigger aria_progress_set_updated_at
  before update on public.aria_progress
  for each row
  execute function public.set_aria_progress_updated_at();
