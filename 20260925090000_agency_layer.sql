-- Licensed in 30 Days: the B2B agency layer.
--
-- Agencies invite recruits; recruits work through a license journey (a fixed
-- list of steps, see supabase/functions/_shared/journeySteps.ts); owners see
-- each recruit's steps plus study signals from aria_progress /
-- flashcard_reviews. All tables are service-role-only (RLS enabled, zero
-- policies), like aria_progress and user_access: only the `agency` Edge
-- Function reads or writes them, after verifying the caller's Clerk token.
--
-- Access: each agency gets its own row in public.access_codes
-- (agency_access_code). Accepting an invite writes public.user_access with
-- that code, so recruits unlock the study platform through the existing
-- `access` function with no change to it. Deactivating the agency's code
-- revokes every recruit it sponsored.

create table if not exists public.agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  owner_user_id text not null unique,
  contact_email text,
  plan text not null default 'pilot'
    check (plan in ('pilot', 'starter', 'growth', 'imo', 'payg')),
  seat_limit integer not null default 25 check (seat_limit > 0),
  pilot_ends_at timestamptz,
  agency_access_code text references public.access_codes (code),
  created_at timestamptz not null default now()
);
alter table public.agencies enable row level security;

create table if not exists public.agency_members (
  agency_id uuid not null references public.agencies (id) on delete cascade,
  user_id text not null,
  role text not null check (role in ('owner', 'manager', 'recruit')),
  display_name text,
  email text,
  license_key text,
  joined_at timestamptz not null default now(),
  primary key (agency_id, user_id)
);
alter table public.agency_members enable row level security;
-- A recruit belongs to at most one agency at a time.
create unique index if not exists agency_members_one_agency_per_recruit
  on public.agency_members (user_id) where role = 'recruit';

create table if not exists public.agency_invites (
  code text primary key,
  agency_id uuid not null references public.agencies (id) on delete cascade,
  license_key text not null,
  invitee_name text,
  invitee_email text,
  created_by text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '14 days',
  accepted_by text,
  accepted_at timestamptz,
  revoked_at timestamptz
);
alter table public.agency_invites enable row level security;
create index if not exists agency_invites_agency_idx on public.agency_invites (agency_id);

-- One journey per user (agency-sponsored or self-serve).
create table if not exists public.recruit_journeys (
  user_id text primary key,
  agency_id uuid references public.agencies (id) on delete set null,
  license_key text not null,
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.recruit_journeys enable row level security;

create table if not exists public.recruit_steps (
  user_id text not null,
  step_key text not null,
  status text not null default 'done' check (status in ('done')),
  completed_at timestamptz not null default now(),
  updated_by text not null,
  primary key (user_id, step_key)
);
alter table public.recruit_steps enable row level security;

-- Pilot requests from the public /agencies page.
create table if not exists public.agency_leads (
  id uuid primary key default gen_random_uuid(),
  contact_name text not null check (char_length(contact_name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  agency_name text not null check (char_length(agency_name) between 1 and 160),
  phone text check (char_length(phone) <= 40),
  recruits_per_year text check (char_length(recruits_per_year) <= 40),
  message text check (char_length(message) <= 2000),
  created_at timestamptz not null default now()
);
alter table public.agency_leads enable row level security;
