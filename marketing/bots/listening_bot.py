"""Listening bot: finds public Reddit posts from people who failed (or are about to
take) an insurance licensing exam, and drafts a helpful reply for your approval.

Usage:
  python3 listening_bot.py                 # search Reddit (needs REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET)
  python3 listening_bot.py --sample        # offline test with built-in example posts

It only READS public posts through Reddit's official API and never posts or DMs.
You reply yourself, from your own account, after approving the draft. Replies
contain no link by default; add one only where the subreddit allows it.
"""

import argparse
import base64
import json
import os
import re
import urllib.parse
import urllib.request

from common import add_drafts, report

SUBREDDITS = ["InsuranceAgent", "Insurance", "InsuranceProfessional", "LifeInsurance"]
QUERIES = ['"failed" exam', '"retake" exam', "Wisconsin license", '"life and health" exam', "PSI exam"]
USER_AGENT = "passpro-listening-bot/1.0 (read-only; contact marketing@passpro.company)"

FAILED = re.compile(r"\b(fail(ed)?|didn'?t pass|did not pass|retak(e|ing)|missed it by)\b", re.I)
EXAM = re.compile(r"\b(exam|test|psi|pearson|prometric)\b", re.I)
WISCONSIN = re.compile(r"\b(wisconsin|milwaukee|madison|green bay)\b", re.I)
LINE = re.compile(r"\b(life|health|l&h|a&h|property|casualty|p&c|personal lines)\b", re.I)

SAMPLE_POSTS = [
    {"id": "s1", "subreddit": "InsuranceAgent", "title": "Failed my life and health exam by 3 points",
     "selftext": "Took the Wisconsin L&H at PSI yesterday, got a 67. So frustrated. What should I do?",
     "permalink": "/r/InsuranceAgent/comments/s1/"},
    {"id": "s2", "subreddit": "Insurance", "title": "Best way to study for P&C?",
     "selftext": "Exam in 2 weeks in Illinois.", "permalink": "/r/Insurance/comments/s2/"},
    {"id": "s3", "subreddit": "InsuranceAgent", "title": "Cat pictures", "selftext": "unrelated",
     "permalink": "/r/InsuranceAgent/comments/s3/"},
]


def app_token():
    cid, secret = os.environ.get("REDDIT_CLIENT_ID"), os.environ.get("REDDIT_CLIENT_SECRET")
    if not (cid and secret):
        raise SystemExit("Set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET (a free 'script' app at reddit.com/prefs/apps), or use --sample.")
    req = urllib.request.Request(
        "https://www.reddit.com/api/v1/access_token",
        data=b"grant_type=client_credentials",
        headers={"Authorization": "Basic " + base64.b64encode(f"{cid}:{secret}".encode()).decode(), "User-Agent": USER_AGENT},
    )
    with urllib.request.urlopen(req, timeout=20) as res:
        return json.load(res)["access_token"]


def search_reddit(limit):
    token = app_token()
    posts = {}
    for sub in SUBREDDITS:
        for q in QUERIES:
            params = urllib.parse.urlencode({"q": q, "restrict_sr": 1, "sort": "new", "t": "week", "limit": limit})
            req = urllib.request.Request(
                f"https://oauth.reddit.com/r/{sub}/search?{params}",
                headers={"Authorization": f"bearer {token}", "User-Agent": USER_AGENT},
            )
            with urllib.request.urlopen(req, timeout=20) as res:
                for child in json.load(res)["data"]["children"]:
                    posts[child["data"]["id"]] = child["data"]
    return list(posts.values())


def classify(post):
    text = f"{post.get('title', '')} {post.get('selftext', '')}"
    if not EXAM.search(text):
        return None
    return {
        "failed": bool(FAILED.search(text)),
        "wisconsin": bool(WISCONSIN.search(text)),
        "line": (LINE.search(text).group(0) if LINE.search(text) else None),
    }


def draft_reply(signals):
    if signals["failed"]:
        parts = [
            "Sorry, that's rough, but it's really common: about 4 in 10 people miss on the first try.",
            "Pull up your score report; it breaks down your weak areas by topic. Spend most of your time there,",
            "then do two full timed practice tests and review state law last.",
        ]
        if signals["wisconsin"]:
            parts.append("In Wisconsin you can retest within a couple of days, and your pre-licensing certificate is good for a year.")
    else:
        parts = [
            "What helped most for people I know: timed full-length practice tests, then going back over",
            "every miss, and leaving state-specific numbers (grace periods, notice periods, auto minimums) for the last few days.",
        ]
    return " ".join(parts)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--sample", action="store_true", help="use built-in example posts (no network)")
    parser.add_argument("--limit", type=int, default=10)
    args = parser.parse_args()

    posts = SAMPLE_POSTS if args.sample else search_reddit(args.limit)
    drafts = []
    for post in posts:
        signals = classify(post)
        if not signals:
            continue
        # Wisconsin or retake posts first; skip generic non-Wisconsin study posts to keep the queue short.
        if not (signals["failed"] or signals["wisconsin"]):
            continue
        drafts.append({
            "kind": "reply",
            "channel": f"Reddit r/{post['subreddit']}",
            "audience": "community",
            "bot": "listening",
            "priority": "high" if signals["wisconsin"] else "normal",
            "context": f"{post['title']}: {post.get('selftext', '')[:280]}",
            "url": f"https://www.reddit.com{post['permalink']}",
            "link_allowed": False,
            "body": draft_reply(signals),
        })
    report("listening_bot", add_drafts(drafts))


if __name__ == "__main__":
    main()
