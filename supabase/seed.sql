-- STALE: the live project's public.questions table does NOT match the
-- shape below (category/prompt/correct_option). The actual deployed
-- table uses domain/question/correct/options(jsonb)/know_this/state_specific
-- instead (confirmed via `supabase db query` against information_schema on
-- 2026-07-11 — see src/hooks/useLearningContent.js, which already queries
-- the real column names). This file was apparently never run against the
-- live database. Treat public.study_modules below as accurate (verified
-- matching), but do NOT use the public.questions definition here as a
-- reference for the real schema.

create table if not exists public.study_modules (
  id text primary key,
  sort_order integer not null unique,
  category text not null,
  title text not null,
  summary text not null,
  estimated_minutes integer not null check (estimated_minutes > 0),
  objectives text[] not null default '{}'
);

create table if not exists public.questions (
  id text primary key,
  sort_order integer not null unique,
  category text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  prompt text not null,
  options text[] not null default '{}',
  correct_option text not null,
  explanation text not null
);

alter table public.study_modules enable row level security;
alter table public.questions enable row level security;

drop policy if exists "Public read study modules" on public.study_modules;
create policy "Public read study modules"
on public.study_modules
for select
using (true);

drop policy if exists "Public read questions" on public.questions;
create policy "Public read questions"
on public.questions
for select
using (true);

insert into public.study_modules (
  id,
  sort_order,
  category,
  title,
  summary,
  estimated_minutes,
  objectives
)
values
  (
    'insurance-basics',
    1,
    'Foundations',
    'Insurance fundamentals',
    'Learn risk pooling, indemnity, insurable interest, and the purpose of life insurance contracts.',
    25,
    array[
      'Define risk, peril, hazard, and loss exposure.',
      'Explain the principle of indemnity and why life insurance is an exception.',
      'Identify parties to an insurance contract and their responsibilities.'
    ]
  ),
  (
    'life-policy-types',
    2,
    'Policy Types',
    'Life policy structures',
    'Compare term, whole life, universal life, and variable contracts for common customer needs.',
    30,
    array[
      'Match policy types to temporary and permanent coverage goals.',
      'Distinguish guaranteed and non-guaranteed policy elements.',
      'Explain cash value growth, loans, and surrender behavior.'
    ]
  ),
  (
    'wisconsin-regulation',
    3,
    'Regulation',
    'Wisconsin licensing and regulation',
    'Cover producer responsibilities, unfair trade practices, replacement rules, and compliance basics.',
    20,
    array[
      'Recognize producer duties during solicitation and policy delivery.',
      'Identify unfair claims and settlement practices.',
      'Summarize replacement and disclosure expectations.'
    ]
  )
on conflict (id) do update
set
  sort_order = excluded.sort_order,
  category = excluded.category,
  title = excluded.title,
  summary = excluded.summary,
  estimated_minutes = excluded.estimated_minutes,
  objectives = excluded.objectives;

insert into public.questions (
  id,
  sort_order,
  category,
  difficulty,
  prompt,
  options,
  correct_option,
  explanation
)
values
  (
    'q-foundations-1',
    1,
    'Foundations',
    'easy',
    'Which term describes the cause of a loss, such as a fire or illness?',
    array['Hazard', 'Peril', 'Risk retention', 'Indemnity'],
    'Peril',
    'A peril is the direct cause of loss. Hazards increase the chance or severity of a loss.'
  ),
  (
    'q-foundations-2',
    2,
    'Foundations',
    'medium',
    'What makes life insurance different from property insurance under the principle of indemnity?',
    array[
      'Life insurance always pays benefits monthly.',
      'Life insurance benefits are limited to cash value only.',
      'Life insurance uses a stated benefit rather than reimbursement of exact loss.',
      'Life insurance cannot name beneficiaries.'
    ],
    'Life insurance uses a stated benefit rather than reimbursement of exact loss.',
    'Life insurance pays a predetermined death benefit because the exact economic value of a life cannot be measured the same way as property damage.'
  ),
  (
    'q-policy-1',
    3,
    'Policy Types',
    'easy',
    'Which policy is generally designed to provide coverage for a specific temporary period?',
    array['Whole life', 'Variable life', 'Term life', 'Universal life'],
    'Term life',
    'Term life is designed for a fixed coverage period, such as 10, 20, or 30 years.'
  ),
  (
    'q-policy-2',
    4,
    'Policy Types',
    'medium',
    'Which feature is most associated with universal life insurance?',
    array[
      'Fixed level premium with no flexibility',
      'Flexible premiums and adjustable death benefit options',
      'No cash value accumulation',
      'Benefits paid only at policy maturity'
    ],
    'Flexible premiums and adjustable death benefit options',
    'Universal life typically offers flexible premium funding and adjustable death benefit structures.'
  ),
  (
    'q-regulation-1',
    5,
    'Regulation',
    'medium',
    'Which action is most likely considered an unfair trade practice?',
    array[
      'Explaining policy exclusions clearly',
      'Providing a buyer''s guide during solicitation',
      'Making misleading statements about a competitor to induce a sale',
      'Documenting replacement disclosures'
    ],
    'Making misleading statements about a competitor to induce a sale',
    'Defamation and misrepresentation used to steer business are classic unfair trade practices.'
  ),
  (
    'q-regulation-2',
    6,
    'Regulation',
    'hard',
    'A producer replacing an existing life policy should primarily focus on what compliance concern?',
    array[
      'Whether the beneficiary lives in the same state',
      'Whether required replacement disclosures and comparisons were delivered',
      'Whether the new policy is the same premium amount',
      'Whether the insurer uses electronic signatures'
    ],
    'Whether required replacement disclosures and comparisons were delivered',
    'Replacement rules center on proper disclosure, documentation, and making sure the client understands the consequences of replacing coverage.'
  )
on conflict (id) do update
set
  sort_order = excluded.sort_order,
  category = excluded.category,
  difficulty = excluded.difficulty,
  prompt = excluded.prompt,
  options = excluded.options,
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;
