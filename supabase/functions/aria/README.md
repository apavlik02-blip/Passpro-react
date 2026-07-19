# ARIA Edge Function — deployment

This function is not deployed automatically. Run these once (requires the
Supabase CLI, `npx supabase` works if it's not installed globally):

```bash
# 1. Log in and link this repo to your Supabase project
npx supabase login
npx supabase link --project-ref <your-project-ref>

# 2. Apply the aria_progress migration
npx supabase db push

# 3. Set secrets (never commit these)
npx supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
npx supabase secrets set CLERK_ISSUER=https://your-app.clerk.accounts.dev
# ^ Clerk dashboard → your app → API Keys → "Frontend API URL"
#   (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are injected automatically —
#   do not set them yourself.)

# 4. Deploy
npx supabase functions deploy aria
```

## Local testing before deploying

```bash
npx supabase start
npx supabase functions serve aria --env-file supabase/.env.local
```

`supabase/.env.local` (gitignored) should contain `ANTHROPIC_API_KEY` and
`CLERK_ISSUER` for local testing.

Then, with a real Clerk session token (copy one from your browser's network
tab while signed into the app locally):

```bash
curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/aria' \
  --header 'Authorization: Bearer <clerk-session-token>' \
  --header 'Content-Type: application/json' \
  --data '{"messages":[{"role":"user","content":"What is the Wisconsin free look period?"}]}'
```

## Onboarding persistence (manual migration required)

The `save_onboarding` action stores first-run intake answers (target exam,
exam date, hours/week, confidence baseline) in an `onboarding jsonb` column on
`aria_progress`. That column is **not** in this repo's migrations yet (the
migrations directory was owned by concurrent content work when this landed).
Apply it once, e.g. via the Supabase SQL editor or a new migration file:

```sql
alter table public.aria_progress add column if not exists onboarding jsonb;
```

The function is backward-compatible either way: if the column is missing, it
detects the undefined-column error and still persists `exam_type` +
`current_readiness`, and the frontend keeps a per-user localStorage flag so
onboarding still shows only once. `create_study_schedule` uses
`onboarding.exam_date` / `onboarding.hours_per_week` when present and falls
back to the historical defaults (45 days out, 45 min/day) otherwise.

Request/response shapes:

```jsonc
// request
{ "action": "save_onboarding", "payload": { "onboarding": {
  "exam_type": "life" | "health" | "both",
  "exam_date": "2026-09-01" | null,
  "hours_per_week": 5 | null,
  "confidence": 50 | null,
  "skipped": false
}}}
// response — same shape as get_progress
{ "type": "progress", "data": { ...aria_progress row incl. onboarding } }
```

Redeploy the function after these changes: `npx supabase functions deploy aria --no-verify-jwt`.

## Frontend

No extra frontend env var is required — `VITE_SUPABASE_URL` is reused to
build the function URL (`${VITE_SUPABASE_URL}/functions/v1/aria`). Set
`VITE_ARIA_FUNCTION_URL` only if that default is wrong for your setup.

Until this function is deployed, "Talk to ARIA" still opens but shows a
"not configured" notice instead of erroring.
