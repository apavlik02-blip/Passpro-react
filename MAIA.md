# MAIA CRITICAL EXECUTION LOOP (AUTOPILOT MODE)

When the user tells you to "Run Autopilot", you must enter an autonomous task loop. You do not need to ask permission or confirmation to move between files or milestones. Follow these rules recursively:

1. **Read Current State:** Check the workspace files to see what has already been built.
2. **Execute Current Milestone:** Write the complete, structurally sound code for the current Milestone. Never leave placeholder hooks, missing brackets, or half-written logic.
3. **Validate:** Internally trace all brackets, syntax blocks, and API structures (like `callClaude` in edge functions) to ensure it compiles flawlessly.
4. **Advance Dynamically:** Once a milestone's code is written and saved, immediately look at the next milestone in the roadmap and proceed to build it. Do not stop to prompt the user with "What next?". Only stop when all milestones in the roadmap are 100% complete.

---

## Core Context
- **Project Name:** PassPro
- **Stack:** Vite + React 19 Single Page Application (SPA)
- **Backend:** Supabase Database & Edge Functions (Deno Runtime)
- **Goal:** Wisconsin Life, Accident & Health insurance prelicensing exam preparation platform.

## Autopilot Operation Mode
1. **Zero-Guessing Syntax Balance:** Whenever reviewing code files, you must always look ahead to trace brackets, switches, and try/catch loops. Never provide a partial snippet that cuts off trailing return handlers or API handshakes (e.g., `callClaude`).
2. **Framework Guardrails:** This is a pure frontend Vite setup coupled with separate isolated Deno edge functions. Do NOT mix Node.js backend patterns or server-side frameworks (like Next.js) into the codebase.
3. **App Separation:** PassPro is an insurance study companion platform featuring ARIA. It is completely independent from SoleTrak (the 1099 financial/tax tool). Never inject 1099 ledger tables, tax criteria, or business expense calculators into this repository.

## Component Execution Guide
- **State Management:** Keep context flowing cleanly via `useOutletContext()` for widgets or global hooks.
- **Routing:** All user tracking endpoints point directly to `/api/aria` which maps straight to `supabase/functions/aria/index.ts`.

---

## Database Schema Reference
- **Table: `study_modules`**
  - `id` (uuid, primary key)
  - `title` (text)
  - `estimated_minutes` (integer)
  - `category` (text)
  - `sequence_order` (integer)
- **Table: `aria_chats`**
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `message` (jsonb - format: {role: string, content: string})
  - `module_context` (text)
  - `created_at` (timestamp)

## Complete Autopilot Execution Roadmap
When instructed to run on complete autopilot, execute these remaining milestones in strict sequence without stopping for confirmation:

### Milestone 1: Live Streaming Refactor
- Refactor `src/components/AriaChat.jsx` to process readable stream tokens (`response.body.getReader()`) instead of waiting for a single static JSON response.

### Milestone 2: Seed the 20 Wisconsin Study Modules
- Create a Supabase SQL migration file (`supabase/migrations/seed_modules.sql`) to inject the official Wisconsin Life, Accident & Health exam blueprint topics into the `study_modules` table.

### Milestone 3: Stripe Agency Tier Paywall Middleware
- Implement a route guard or checkout wrapper targeting premium modules or restricting Aria chat token quotas for unpaid tier user sessions.

### Milestone 4: Outbound Automated Re-engagement Flows
- Build a separate Supabase Edge Function (`supabase/functions/send-reminders`) that reads user `study_streak` data and fires automated re-engagement emails when a streak is approaching its expiration limit.
