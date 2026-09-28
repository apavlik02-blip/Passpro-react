"""Shared helpers for the PassPro marketing bots.

Every bot writes DRAFTS to one approval queue (queue/drafts.jsonl). Nothing
here posts, sends, or replies on its own: a person approves each draft with
review.py (or on the Approval Queue page) and then publishes it by hand.
"""

import hashlib
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

BOTS_DIR = Path(__file__).resolve().parent
REPO_ROOT = BOTS_DIR.parent.parent
QUEUE_FILE = BOTS_DIR / "queue" / "drafts.jsonl"
SITE = "passpro.company"
LANDING = f"{SITE}/retake"

# Required on every student-facing draft (see the growth plan's compliance section).
COMPLIANCE_LINE = (
    "PassPro is supplemental exam prep. It does not replace Wisconsin's required "
    "20-hour pre-licensing course from an approved provider."
)

# Words that must never appear in a student-facing draft.
BANNED_PHRASES = [
    "pre-licensing course",
    "prelicensing course",
    "meets the 20-hour",
    "satisfies the 20-hour",
    "guaranteed to pass",
    "guarantee you pass",
    "certificate of completion",
]


def load_facts():
    return json.loads((BOTS_DIR / "facts.json").read_text())


def check_compliance(text):
    """Return a list of problems; empty means the draft may go to review."""
    lowered = text.lower()
    problems = [f'uses banned phrase "{p}"' for p in BANNED_PHRASES if p in lowered]
    return problems


def _draft_id(kind, channel, body):
    digest = hashlib.sha1(f"{kind}|{channel}|{body}".encode()).hexdigest()
    return digest[:12]


def read_queue():
    if not QUEUE_FILE.exists():
        return []
    return [json.loads(line) for line in QUEUE_FILE.read_text().splitlines() if line.strip()]


def write_queue(drafts):
    QUEUE_FILE.parent.mkdir(parents=True, exist_ok=True)
    QUEUE_FILE.write_text("".join(json.dumps(d) + "\n" for d in drafts))


def add_drafts(new_drafts):
    """Append drafts to the queue, skipping duplicates. Returns how many were added."""
    queue = read_queue()
    seen = {d["id"] for d in queue}
    added = 0
    for draft in new_drafts:
        body = draft["body"]
        if draft.get("audience") == "student" and COMPLIANCE_LINE not in body:
            body = f"{body}\n\n{COMPLIANCE_LINE}"
        problems = check_compliance(body.replace(COMPLIANCE_LINE, ""))
        record = {
            "id": _draft_id(draft["kind"], draft["channel"], body),
            "created": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "status": "needs_fix" if problems else "pending",
            "problems": problems,
            **draft,
            "body": body,
        }
        if record["id"] in seen:
            continue
        queue.append(record)
        seen.add(record["id"])
        added += 1
    write_queue(queue)
    return added


def report(bot_name, added):
    print(f"{bot_name}: added {added} draft(s) to {QUEUE_FILE.relative_to(REPO_ROOT)}", file=sys.stderr)
