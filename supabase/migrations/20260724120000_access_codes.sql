-- Access-code gating: codes live server-side only (never in the client
-- bundle) and unlocks are recorded per Clerk user, so access follows the
-- account across devices. Both tables are service-role-only (RLS enabled,
-- zero policies) — same pattern as aria_progress and the payments tables.
-- Only the `access` Edge Function touches them.
--
-- Manage codes with SQL:
--   insert into public.access_codes (code, note) values ('some-code', 'for beta cohort');
--   update public.access_codes set active = false where code = 'some-code';  -- revokes its users too

create table if not exists public.access_codes (
  code text primary key,
  active boolean not null default true,
  note text,
  created_at timestamptz not null default now()
);

alter table public.access_codes enable row level security;

create table if not exists public.user_access (
  user_id text primary key,
  code text not null references public.access_codes (code),
  granted_at timestamptz not null default now()
);

alter table public.user_access enable row level security;
