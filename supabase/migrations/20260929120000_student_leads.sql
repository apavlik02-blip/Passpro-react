-- Email signups from the public /retake diagnostic page.
--
-- Visitors are anonymous (no Clerk session), so the page inserts with the
-- anon key. RLS allows INSERT only; there is no SELECT/UPDATE/DELETE policy,
-- so rows are readable only with the service role (Supabase dashboard / SQL).
-- Check constraints keep the table from being used as free-form storage.

create table if not exists public.student_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null
    check (length(email) <= 254 and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  exam text
    check (exam in ('life', 'health', 'property', 'casualty', 'personal_lines')),
  score integer check (score between 0 and 100),
  weak_areas text[] check (weak_areas is null or cardinality(weak_areas) <= 5),
  consent boolean not null check (consent),
  source text not null default 'retake' check (length(source) <= 40)
);

alter table public.student_leads enable row level security;

drop policy if exists "Anyone can sign up from the retake page" on public.student_leads;
create policy "Anyone can sign up from the retake page"
  on public.student_leads
  for insert
  to anon, authenticated
  with check (consent);

revoke select, update, delete on public.student_leads from anon, authenticated;
grant insert on public.student_leads to anon, authenticated;
