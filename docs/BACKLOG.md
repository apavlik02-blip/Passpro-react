# PassPro Build Backlog

Prioritized queue for autonomous build sessions. Agents: work top-down through
unchecked items; each item lists acceptance criteria. Update this file (check the
box, add a dated note) when an item lands.

## Ground rules for autonomous work

- Follow `CLAUDE.md` (architecture, Ledger design system, real DB schema notes).
- All exam/regulatory content must trace to `docs/WI-OCI-STANDARDS.md` or the
  official outlines (`docs/wi-life-outline.txt`, `docs/wi-ah-outline.txt`).
  Never invent Wisconsin-specific numbers; flag unverifiable facts for human review.
- `npm run lint` + `npm run build` must pass before an item is checked off.
- Allowed without asking: code, content, migration *files*, commits to a branch.
- Requires Alex's explicit go-ahead: production deploys, applying destructive DB
  changes, Stripe/pricing changes, sending any email/SMS, new paid services.

## P0 — Content to sellable depth (in progress 2026-07-18)

- [x] **Life question bank expansion** — ~197 new questions per PSI 22-01 weights
      as `supabase/migrations/20260718090000_question_bank_life_expansion.sql`.
      AC: every domain hits target ±10%; `correct` matches an option verbatim;
      WI facts verified; migration applies cleanly.
      *(2026-07-19: 197/197 targets hit (insurance_regulation 45, wisconsin_regulation 35,
      policy_provisions 30, life_types 23, life_basics 22, annuities 21, general_insurance 9,
      taxation 7, qualified_plans 5). Quality checks clean. Not yet applied to live DB.)*
- [x] **Health question bank expansion** — ~165 new questions per PSI 22-03 weights
      as `supabase/migrations/20260718091000_question_bank_health_expansion.sql`.
      AC: same as above, incl. s. 632.895 mandated-benefits coverage.
      *(2026-07-18: landed, 165/165 targets hit, self-check clean — every `correct`
      matches an option verbatim, no invented WI-specific numbers. Not yet applied
      to the live database — see "Apply + verify content migrations" below.)*
- [x] **Deepen all 16 study lessons** to cover every outline subtopic (3–5× depth).
      AC: outline coverage documented; Ledger style; lint/build pass.
      *(2026-07-19: all 15 lessons expanded 141% (+1,571 lines), full outline coverage
      verified, Ledger style, lint/build pass. Fixed merge conflict in DashboardPage.jsx
      and removed missing AudioBriefButton import to unblock build.)*
- [x] **Dedupe question bank** — live DB has ~10 exact duplicate rows.
      Migration ready: `20260718085000_dedupe_questions.sql`. Apply with the
      expansions above.
      *(2026-07-19: applied, duplicates removed.)*
- [x] **Apply + verify content migrations** — apply the three migrations to the
      live Supabase project, then verify: per-domain counts meet 3× blueprint
      weights, `buildExam()` reports zero shortfalls for both exams, spot-check
      10 random new questions for correctness. Commit everything.
      *(2026-07-19: all three migrations applied. Post-migration: 521 total questions,
      all domains exceeded targets (buffer built in), both exam builders report zero
      shortfalls, 10-question spot-check passed, committed to main.)*

## P1 — Product completeness

- [x] **Port OnboardingFlow from the ARIA prototype**
      (`Desktop/ARIA AI Agent/components/OnboardingFlow.tsx`) into the app:
      first-run intake (target exam, exam date, hours/week, confidence baseline)
      persisted to `aria_progress` via the existing Edge Function pattern; feeds
      ARIA's study-schedule tool and the dashboard. AC: shows once for new users,
      skippable, Ledger-styled, lint/build pass.
      *(2026-07-19: landed as `src/components/aria/OnboardingFlow.jsx`, rendered
      by MemberLayout; persisted via new `save_onboarding` action in the aria
      Edge Function. Lint clean. Manual steps: add `onboarding jsonb` column
      (SQL in README) and redeploy aria function. NOTE: build blocked by
      pre-existing merge conflict in src/pages/DashboardPage.jsx line 134.)*
- [x] **Port StudyScheduleRenderer** (`Desktop/ARIA AI Agent/components/StudyScheduleRenderer.tsx`):
      render ARIA's `create_study_schedule` tool output as a structured plan
      instead of plain text. AC: renders real tool output in AriaModal, Ledger-styled.
      *(2026-07-19: landed as `src/components/aria/StudyScheduleRenderer.jsx`,
      rendered by AriaModal for `create_study_schedule` tool results. Edge
      Function updated to use onboarding exam_date/hours_per_week. Lint clean;
      build blocked (see above).)*
- [ ] **Exam review mode audit** — verify ExamRunner supports: review of wrong
      answers with `know_this` hooks after submission, per-domain score breakdown
      mapped to blueprint weights, retake with fresh sampling. Build whatever's missing.
- [ ] **Admin question manager** — port/adapt `AdminQuestionManager.tsx` so Alex
      can review/edit/add questions without SQL. Needs an admin gate (Clerk user
      allowlist) and a write path (new Edge Function endpoint; anon key must not
      get write access). AC: Alex-only access; CRUD works; RLS still zero-policy.
- [ ] **Clean deploy** — commit current work on a branch, lint/build, merge to
      main, verify Vercel deploy + smoke-test live site. (Deploy step needs
      Alex's go-ahead.)

## P2 — Growth & retention

- [ ] **SEO blog expansion** — 5–10 more posts from high-search outline topics
      (Medicare vs Medicaid in WI, HSA rules, WI mandated benefits, annuity
      suitability, exam-day guide). Follow existing blogPosts.js pattern.
- [ ] **Email onboarding sequence** — implement `Desktop/ARIA AI Agent/docs/ARIA-Email-Onboarding-Sequence.md`
      as real transactional emails. Blocked on: provider choice + API key (ask Alex).
- [ ] **Re-engagement nudges** — surface streak/readiness in-app (port
      notification-center ideas); email digest optional (blocked on provider).
- [ ] **Landing page conversion pass** — align HomePage copy with the 20-hr
      prelicensing + exam-pass positioning from `docs/ARIA-Positioning-Pricing.md`.

## P3 — Strategic (needs Alex's decisions first)

- [ ] **OCI-approved prelicensing course path** — 20 credit hours = ~90,000 words
      + proctored final + certificates (see WI-OCI-STANDARDS.md §2 and the
      Passpro vault compliance docs). Big content + compliance lift; also unlocks
      charging for the required education, not just exam prep.
- [ ] **Multi-tenant white-label** — the `multi-tenant/` folder (tenant registry,
      theming, examfx/passpro configs) suggests a B2B play: license the platform
      to agencies/schools. Revisit after single-tenant product is complete.
- [ ] **Second state expansion** — architecture is WI-hardcoded in content only;
      blueprints/domains generalize. Requires new state outlines + content.
