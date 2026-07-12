-- The previous migration set weak_domains' default to ['riders',
-- 'health_insurance'] — copied from ARIA's original 8-bucket domain model,
-- which doesn't match PassPro's real public.questions.domain values.
-- Correct default uses domains that actually exist in the seeded question
-- bank (matches the original pre-Clerk table's default, which had this right).

alter table public.aria_progress
  alter column weak_domains set default array['policy_provisions', 'annuities'];
