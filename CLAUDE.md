# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # production build to dist/
npm run lint      # eslint . — run after every change, this repo has no test suite
npm run preview   # preview a production build
```

There is no test runner configured. Treat `npm run lint` + `npm run build` as the
verification bar for frontend changes.

For the ARIA Edge Function specifically:

```bash
npx supabase link --project-ref <ref>          # link CLI to the Supabase project
npx supabase db push                            # apply supabase/migrations/*.sql
npx supabase secrets set --env-file supabase/.env.local   # ANTHROPIC_API_KEY, CLERK_ISSUER
npx supabase functions deploy aria --no-verify-jwt         # --no-verify-jwt is required —
                                                             # Clerk tokens aren't Supabase-issued JWTs
```

`supabase/.env.local` is gitignored (matches `*.local`) — never commit it.

## Architecture

**Stack**: Vite + React 19 SPA (no server-side rendering, no Next.js). Auth via
Clerk (`@clerk/clerk-react`), content + ARIA persistence via Supabase. Member
access is gated by an access code validated **server-side** by the `access`
Edge Function (`supabase/functions/access/`) against the service-role-only
`public.access_codes` table — codes never ship in the client bundle. A
successful redemption is recorded per Clerk user in `public.user_access`, so
access follows the account across devices; deactivating a code
(`access_codes.active = false`) revokes its users. Frontend:
`src/hooks/useAccess.js` (same shape as the retired `useEntitlement`) +
`src/components/AccessGate.jsx`; `AccessRoute` in `App.jsx` redirects locked
users to `/account`. The function also honors legacy
`user_entitlements.has_paid` rows from the retired Stripe payment-link flow —
the dormant `stripe-webhook`/`entitlement` Edge Functions and payments-ledger
migration are leftovers from it. Deploy the function like `aria`:
`npx supabase functions deploy access --no-verify-jwt`.

### Routing / layout shape

`src/App.jsx` is routing only — no business logic. Two layout branches:
- `/` — `HomePage`, public, top nav.
- Everything else — gated by `ProtectedRoute` (Clerk `SignedIn`/`SignedOut`) then
  `SupabaseRoute` (env-configured check), then rendered inside `MemberLayout`
  (persistent left sidebar, `src/components/layout/Sidebar.jsx` +
  `MemberLayout.jsx`). Page components live in `src/pages/`, receive data as
  props from `App.jsx` (which owns the single `useLearningContent()` call) —
  pages do not fetch their own study/question data.

`MemberLayout` also owns the ARIA chat modal's open/closed state and passes
`openAria` down to routed pages via React Router's `<Outlet context={{ openAria }} />`
— pages that need to open ARIA call `useOutletContext()`, not prop drilling.

### Design system

Tailwind v4 (`@tailwindcss/vite`, no config file — tokens defined in
`@theme` inside `src/index.css`). Look there before hand-rolling colors/fonts.
Current visual direction ("Ledger"): dark ink background (`ink-950/900/800`),
`gold-400/500/600` as the only accent, `font-serif` (Fraunces/Georgia stack)
for headings, `font-mono` for numbers/labels/eyebrows, `font-sans` (Inter) for
body copy. Cards are square (no `rounded-*`), bordered with `border-line`, not
shadowed/glassmorphic. This was an explicit redesign away from an earlier
purple/blue gradient look — don't reintroduce gradients or heavy rounding
without being asked.

### Data layer — real schema differs from `supabase/seed.sql`

`src/lib/supabase.js` is a plain anon-key client (`supabaseConfigured` is
`false` if env vars are missing — most pages branch on this). Content is
fetched once via `src/hooks/useLearningContent.js`.

**`supabase/seed.sql` is stale and does not match the live database.** It
describes `public.questions` with `category`/`prompt`/`correct_option`
columns, but the actual deployed table uses
`domain`/`question`/`correct`/`options` (jsonb)/`know_this`/`state_specific`
instead (confirmed directly against `information_schema` — seed.sql was
apparently never run against the real project). `useLearningContent.js`'s
`mapQuestion()` already queries the *real* column names and translates
`record.domain` → the app-level `category` field, so the rest of the app
(dashboard, study, practice exam) is unaffected — but **any new code that
queries `public.questions` directly must use the real column names**, not
what's in `seed.sql`. `public.study_modules` *does* match seed.sql
(`category`/`title`/`estimated_minutes`/etc.) — only `questions` is wrong.

Real `questions.domain` values (also the taxonomy used by
`src/lib/examBlueprints.js`'s exam weighting and by the ARIA Edge Function's
`DOMAIN_WEIGHTS`): `policy_provisions`, `life_types`, `annuities`, `taxation`,
`wisconsin_regulation`, `general_insurance`, `health_basics`,
`health_plan_types`, `disability_income`, `ltc`, `medicare`, `medicaid`,
`group_health`, `wisconsin_health_regulation`, `qualified_plans`,
`aca_hipaa`, `insurance_regulation`, `life_basics`, `medical_plans`, `dental`.
There is no `riders` or generic `health_insurance` domain — don't reintroduce
those (they came from ARIA's original, unrelated 8-bucket model and don't
exist in the seeded data).

`humanizeSlug()` (`src/lib/format.js`) turns these snake/kebab-case domain
values into display labels app-wide — reuse it rather than hand-formatting.

### ARIA (Claude-powered study coach)

`src/components/aria/`, `src/hooks/useAriaChat.js` + `useAriaProgress.js` on
the frontend; `supabase/functions/aria/` (Deno Edge Function) on the backend.
This is the only server-side code in the project.

- **Why an Edge Function and not a Next.js route**: the app is a pure SPA with
  no server of its own, and the function holds `ANTHROPIC_API_KEY` +
  `SUPABASE_SERVICE_ROLE_KEY`, which must never reach the browser bundle.
- **Auth bridge**: PassPro uses Clerk, not Supabase Auth, so `auth.uid()`-based
  RLS doesn't apply. `supabase/functions/aria/clerk.ts` verifies the caller's
  Clerk session token server-side via Clerk's JWKS (`CLERK_ISSUER` secret —
  the Clerk "Frontend API" URL, derivable by base64-decoding the publishable
  key). The function is deployed with `--no-verify-jwt` so Supabase's own
  platform-level (Supabase-Auth-only) JWT check doesn't reject Clerk tokens
  before they reach this custom verification.
- **`aria_progress` table**: `user_id text primary key` (Clerk id, no FK — a
  `uuid references auth.users` version from unrelated earlier work existed on
  this project and was migrated away from; see
  `supabase/migrations/20260711130000_aria_progress_clerk_compat.sql`). RLS is
  enabled with **zero policies** — the Edge Function's service-role key is the
  only reader/writer, by design, not by oversight.
- **Tool-calling pattern**: `supabase/functions/aria/index.ts` runs cheap
  keyword-based intent detection first (`generate_practice_questions`,
  `analyze_readiness`, `create_study_schedule`, `get_insurance_regulation` —
  the last hardcodes real Wisconsin OCI facts in `tools.ts`'s
  `WI_REGULATIONS`), only falling through to a real Claude call
  (`claude-haiku-4-5-20251001`) for open-ended coaching. `generatePracticeQuestions`
  queries the real `public.questions` table (see schema note above) rather
  than shipping a second, separate question bank.
