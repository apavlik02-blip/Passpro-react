-- Subscription tiers: additive to, not a replacement for, the existing
-- access-code and legacy one-time-payment gates in the `access` Edge
-- Function -- all paths are checked, so nobody currently holding access
-- loses it when this ships. Same pattern as user_entitlements / user_access:
-- service-role-only (RLS enabled, zero policies), only the `access` and
-- `stripe-webhook` Edge Functions touch this table.
--
-- Tier definitions (name, price, features) are NOT stored here -- they're
-- business config, not user data. See src/lib/pricingTiers.js (frontend)
-- and supabase/functions/_shared/pricingTiers.ts (Edge Functions). This
-- table only tracks each user's current subscription state.

create table if not exists public.user_subscriptions (
  user_id text primary key,
  tier text not null check (tier in ('free', 'essential', 'professional', 'premium')),
  billing_interval text check (billing_interval in ('monthly', 'annual')),
  status text not null check (status in ('trialing', 'active', 'past_due', 'canceled')),
  stripe_customer_id text,
  stripe_subscription_id text,
  trial_ends_at timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_subscriptions enable row level security;

create index if not exists idx_user_subscriptions_stripe_subscription_id
  on public.user_subscriptions (stripe_subscription_id);

create or replace function public.set_user_subscriptions_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists user_subscriptions_set_updated_at on public.user_subscriptions;
create trigger user_subscriptions_set_updated_at
  before update on public.user_subscriptions
  for each row
  execute function public.set_user_subscriptions_updated_at();
