-- Add onboarding column to aria_progress table for storing user intake data
alter table public.aria_progress add column if not exists onboarding jsonb;

-- Index on onboarding for queries filtering by exam_type or other fields if needed later
create index if not exists idx_aria_progress_onboarding on public.aria_progress using gin (onboarding);
