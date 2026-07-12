-- Payment gating: append-only ledger + idempotent webhook processing +
-- a fast-read entitlement snapshot. All three are service-role-only
-- (RLS enabled, zero policies) — same pattern as aria_progress. Only the
-- stripe-webhook and entitlement Edge Functions touch these tables.

create table if not exists public.ledger (
  id uuid primary key default gen_random_uuid(),
  account_id text not null,
  entry_type text not null check (entry_type in ('debit', 'credit')),
  amount integer not null check (amount >= 0),
  currency text not null default 'usd',
  reference_type text not null,
  reference_id text not null,
  idempotency_key text not null,
  description text,
  created_at timestamptz not null default now()
);

-- Append-only: no UPDATE/DELETE policy is ever granted to any non-service
-- role. Enforced by convention (no code path in this repo issues them),
-- same as documented in the ledger's own comment above.
alter table public.ledger enable row level security;

create index if not exists idx_ledger_account_id on public.ledger (account_id);
create index if not exists idx_ledger_reference on public.ledger (reference_type, reference_id);

create table if not exists public.idempotency_keys (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  resource_type text not null,
  resource_id text,
  response_body jsonb,
  created_at timestamptz not null default now()
);

alter table public.idempotency_keys enable row level security;

create table if not exists public.user_entitlements (
  user_id text primary key,
  has_paid boolean not null default false,
  paid_at timestamptz,
  stripe_customer_id text,
  stripe_checkout_session_id text,
  updated_at timestamptz not null default now()
);

alter table public.user_entitlements enable row level security;

create or replace function public.set_user_entitlements_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists user_entitlements_set_updated_at on public.user_entitlements;
create trigger user_entitlements_set_updated_at
  before update on public.user_entitlements
  for each row
  execute function public.set_user_entitlements_updated_at();
