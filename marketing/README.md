# PassPro marketing system

> **Direction update (Sept 24, 2026):** marketing is now agency-first for
> *Licensed in 30 Days*, a recruit-to-producer platform sold to agencies and IMOs.
> The live source of truth for the scheduled agents is the Claude project doc
> `claude/marketing-plan.md`; this file keeps the original consumer plan and
> the video bot docs.

Everything here is draft-first: agents and bots produce content, and a human
approves before anything is posted publicly. That keeps every claim accurate
(Wisconsin facts only from the lessons and question bank) and keeps the brand
clear of platform spam rules.

## Positioning

**PassPro is the Wisconsin-only exam prep for all five major insurance licenses.**
National courses teach multistate defaults; 35% of every Wisconsin PSI exam is
regulation, and PassPro teaches the Wisconsin version first.

Proof points we can say (all verified in `docs/WI-OCI-STANDARDS.md`):

- Five tracks: Life 22-01, Accident & Health 22-03, Property 22-05, Casualty 22-07, Personal Lines 22-09
- Practice exams weighted to the official PSI outlines (100 questions, 2 hours, 70% to pass)
- 10-question weak-spot drills, spaced-repetition flashcards, ARIA study coach
- Wisconsin specifics: 25/50/10 auto minimums, mandatory UM 25/50, WIP pays ACV, 31-day life grace period

Don't say: pass rates, "guaranteed pass" (the terms say PassPro doesn't guarantee
passing; use "pass or study free" only once that policy is live on the Terms page), or anything about competitors' accuracy.

## Audiences, in priority order

1. **Agency owners and hiring managers** (B2B): they pay for new producers' licensing. Pitch: seat licenses or white-label, faster time-to-licensed.
2. **Career changers** getting licensed on their own: TikTok, Reels, Facebook, Google search.
3. **Schools and workforce programs**: Wisconsin technical colleges, job centers, DWD programs.

## Channels

| Channel | Format | Cadence | Owner |
|---|---|---|---|
| Blog / SEO | Study guides at passpro.company/blog | 1 per week | Content agent drafts |
| TikTok / Reels / Shorts | 15–30s quiz and explainer videos from the video bot | 3 per week | Video bot renders |
| Facebook page + groups | Quiz posts, study tips | 3 per week | Social agent drafts |
| LinkedIn | B2B posts for agency owners | 2 per week | Social agent drafts |
| Email (Kit) | Weekly "Wisconsin exam question" | 1 per week | Content agent drafts |
| Direct outreach | Agencies hiring producers in Wisconsin | 10 per week | Outreach agent drafts |

## How the agents work

Scheduled Claude tasks (see the scheduled tasks list in the Claude app):

- **Weekly marketing agent** (Mondays): drafts the week's posts for every channel,
  1 new blog post, and 2 new video scripts in `video-bot/scripts/` format. It saves
  them to the PassPro Claude project for review.
- **Agency outreach agent** (Wednesdays): finds Wisconsin agencies hiring
  producers and drafts personalized emails. It doesn't send them.

To let an agent post automatically, connect the account first (for example
through Zapier: Facebook Pages, LinkedIn, Instagram for Business, Buffer) and
approve the first few weeks by hand.

## Video bot

`video-bot/make_video.py` renders branded 9:16 MP4s from JSON scripts:

```bash
pip install pillow imageio-ffmpeg
python3 marketing/video-bot/make_video.py marketing/video-bot/scripts/*.json
python3 marketing/video-bot/make_video.py marketing/video-bot/scripts/quiz-coinsurance.json --size 1080x1080
```

Scene types: `hook`, `stat`, `list`, `quiz` (with a timed answer reveal), `cta`.
Videos are silent on purpose; add a trending sound in the TikTok/Instagram app
(platform library audio is licensed for use there).
