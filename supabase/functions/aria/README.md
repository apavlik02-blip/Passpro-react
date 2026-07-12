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

## Frontend

No extra frontend env var is required — `VITE_SUPABASE_URL` is reused to
build the function URL (`${VITE_SUPABASE_URL}/functions/v1/aria`). Set
`VITE_ARIA_FUNCTION_URL` only if that default is wrong for your setup.

Until this function is deployed, "Talk to ARIA" still opens but shows a
"not configured" notice instead of erroring.
