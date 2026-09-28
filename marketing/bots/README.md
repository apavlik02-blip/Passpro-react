# PassPro marketing bots (draft-only)

Every bot writes drafts to an approval queue. Nothing posts, sends, or replies on its own.

| Bot | What it drafts | Run |
| --- | --- | --- |
| `content_bot.py` | "Second Shot, Wisconsin" posts and video scripts for one campaign week, built only from `facts.json` | `python3 content_bot.py --week 1` |
| `listening_bot.py` | Helpful replies to public Reddit posts about failing or retaking the exam (read-only official API) | `python3 listening_bot.py` (needs `REDDIT_CLIENT_ID`/`REDDIT_CLIENT_SECRET`), or `--sample` to test offline |
| `seo_link_bot.py` | Internal links between PassPro blog posts that mention each other's topics | `python3 seo_link_bot.py` |
| `outreach_bot.py` | First messages to the course providers, investors, grants and support orgs in `targets.csv` | `python3 outreach_bot.py [--type provider]` |
| `review.py` | List, approve, reject, edit, and export approved drafts | `python3 review.py list --status pending` |

Drafts go to `queue/drafts.jsonl` (gitignored). The same drafts can be loaded into the online
Approval Queue page (claude.ai artifact, collection `drafts`), which the weekly content agent
also fills every Monday.

## Rules the bots enforce

- Every student-facing draft ends with: *PassPro is supplemental exam prep. It does not replace
  Wisconsin's required 20-hour pre-licensing course from an approved provider.*
- Drafts containing banned phrases ("pre-licensing course", "certificate of completion", pass
  guarantees) are marked `needs_fix` and can't be approved until edited.
- Numbers come from `facts.json`, which cites its sources. Add a fact there before a bot may use it.
- Community replies carry no link by default. When Amanda later mentions PassPro in a community,
  she says she founded it.
- Outreach goes to organizations through their public contact routes. No scraping of personal emails.
