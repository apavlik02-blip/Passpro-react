"""SEO internal-linking bot: finds places where one PassPro blog post mentions a
topic another post covers, but doesn't link to it yet, and drafts the link.

Usage:  python3 seo_link_bot.py [--max-per-post 3]

It reads src/content/blog/*.jsx and only drafts suggestions; you approve them,
then add the <Link> by hand (or ask Claude to apply the approved ones).
"""

import argparse
import re

from common import REPO_ROOT, add_drafts, report

BLOG_DIR = REPO_ROOT / "src" / "content" / "blog"

# Phrases that signal a topic -> the post that owns that topic.
TOPIC_PHRASES = {
    "wisconsin-grace-period": ["grace period"],
    "wisconsin-free-look-period": ["free look", "free-look"],
    "wisconsin-incontestability-period": ["incontestab"],
    "wisconsin-twisting-churning-rebating": ["twisting", "churning", "rebating"],
    "wisconsin-auto-insurance-minimums-exam": ["25/50/10", "uninsured motorist", "auto minimum"],
    "coinsurance-formula-property-exam": ["coinsurance"],
    "wisconsin-workers-comp-casualty-exam": ["workers comp", "worker's comp", "workers' comp", "worker’s comp"],
    "medicare-vs-medicaid-wisconsin-exam": ["medicaid", "medicare"],
    "wisconsin-mandated-health-benefits": ["mandated benefit"],
    "psi-exam-day-wisconsin-insurance": ["exam day", "testing center", "test center"],
    "wisconsin-insurance-license-requirements": ["fingerprint", "license application"],
    "wisconsin-personal-lines-vs-property-casualty": ["personal lines"],
    "how-hard-is-the-wisconsin-insurance-exam": ["pass rate", "how hard"],
}

# Posts where a phrase means something else (health coinsurance is not the property formula).
SKIP = {
    "wisconsin-grace-period": {"wisconsin-accident-health-exam-content-outline"},
    "wisconsin-incontestability-period": {"wisconsin-accident-health-exam-content-outline"},
    "coinsurance-formula-property-exam": {"wisconsin-accident-health-exam-content-outline", "medicare-vs-medicaid-wisconsin-exam", "wisconsin-mandated-health-benefits"},
}

TEXT_NODE = re.compile(r">([^<>{}]{20,})<")


def existing_links(source):
    return set(re.findall(r'to=["\'`]/blog/([a-z0-9-]+)', source))


def suggestions_for(path, max_per_post):
    slug = path.stem
    source = path.read_text()
    linked = existing_links(source)
    found = []
    for target, phrases in TOPIC_PHRASES.items():
        if target == slug or target in linked or slug in SKIP.get(target, set()):
            continue
        for match in TEXT_NODE.finditer(source):
            sentence = " ".join(match.group(1).split())
            stem = next((p for p in phrases if p in sentence.lower()), None)
            if stem:
                start = sentence.lower().index(stem)
                end = start + len(stem)
                while end < len(sentence) and sentence[end].isalpha():
                    end += 1
                hit = sentence[start:end]
                found.append({
                    "kind": "internal-link",
                    "channel": f"passpro.company/blog/{slug}",
                    "audience": "site",
                    "bot": "seo-links",
                    "context": sentence[:240],
                    "body": f'Link the words "{hit}" in /blog/{slug} to /blog/{target}.',
                    "file": str(path.relative_to(REPO_ROOT)),
                    "target": f"/blog/{target}",
                })
                break
        if len(found) >= max_per_post:
            break
    return found


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--max-per-post", type=int, default=3)
    args = parser.parse_args()
    drafts = [s for p in sorted(BLOG_DIR.glob("*.jsx")) for s in suggestions_for(p, args.max_per_post)]
    report("seo_link_bot", add_drafts(drafts))


if __name__ == "__main__":
    main()
