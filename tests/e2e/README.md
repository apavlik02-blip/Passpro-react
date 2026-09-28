# PassPro test bot

Playwright checks for the whole site. `npm run test:e2e` runs everything against
`PASSPRO_URL` (default https://passpro.company); `node tests/e2e/summarize.mjs`
prints a plain-English summary of the last run.

| File | Covers |
| --- | --- |
| `smoke.spec.mjs` | Every public page loads, shows its heading, no errors, fits phone and desktop; member pages redirect when signed out; robots/sitemap |
| `forms.spec.mjs` | Agency pilot form (validation + success, lead call stubbed unless `QA_REAL_WRITES=1`), savings calculator, bad invite link |
| `member.spec.mjs` | Signed in as the QA user: access gate, dashboard, lesson, flashcards, 10-question drill, license path, agency invite create/cancel |
| `api.spec.mjs` | Edge functions refuse unsigned callers, private tables return nothing to the public key, every license has enough questions for a full exam |

## Settings

| Variable | Purpose |
| --- | --- |
| `PASSPRO_URL` | Site to test (a Vercel preview URL in CI) |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Public values; read from `.env.local` locally |
| `QA_EMAIL` | The QA Clerk user, `qa-bot+clerk_test@passpro.company`. Signs in with code 424242 (development instance only) |
| `QA_ACCESS_CODE` | Only needed the first time, to unlock study access for the QA user |
| `VERCEL_BYPASS_SECRET` | Lets CI past Vercel's preview protection |

The QA user must be created by hand once: Clerk's sign-up captcha blocks bots (as it should).
After changing exam weights, run `node tests/e2e/export-blueprints.mjs`.
