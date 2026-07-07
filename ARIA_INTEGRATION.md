# ARIA Integration into PassPro

This branch adds the foundational ARIA files.

**Full production backend + API route lives in the separate repo:**
https://github.com/apavlik02-blip/passpro-aria

## Quick Integration Steps
1. Copy `src/components/ARIA/ReadinessWidget.tsx` into your project.
2. Add Supabase progress loading in your dashboard.
3. Call the API from passpro-aria repo (deploy it separately on Vercel as /api/aria or use the Railway proxy temporarily).
4. Merge this branch when ready.

The widget is self-contained and uses inline styles matching your amber theme.

Next: I can add the full QuizRenderer and modal chat component if you approve this structure.