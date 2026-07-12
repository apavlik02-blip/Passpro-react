-- aria_progress already existed on this project from earlier, unrelated work,
-- built against Supabase Auth (user_id uuid references auth.users, RLS via
-- auth.uid()). PassPro uses Clerk, not Supabase Auth, so that shape is
-- incompatible with the "aria" Edge Function. Table was confirmed empty
-- (0 rows) before this migration — safe to change in place.

drop policy if exists "Users can view own progress" on public.aria_progress;
drop policy if exists "Users can insert own progress" on public.aria_progress;
drop policy if exists "Users can update own progress" on public.aria_progress;

alter table public.aria_progress drop constraint if exists aria_progress_user_id_fkey;

alter table public.aria_progress alter column user_id type text using user_id::text;
alter table public.aria_progress alter column weak_domains set default array['riders', 'health_insurance'];

-- RLS stays enabled with no policies: only the "aria" Edge Function's
-- service-role key may read/write this table.
