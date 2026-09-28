"""Outreach bot: drafts a first message for each partner, investor, grant, or
support target in targets.csv. You approve, personalize, and send it yourself.

Usage:  python3 outreach_bot.py [--type provider|investor|accelerator|grant|support]

Targets are organizations, reached through their public contact route. The bot
never scrapes personal emails and never sends anything.
"""

import argparse
import csv

from common import BOTS_DIR, SITE, add_drafts, report

SIGNATURE = "Amanda Pavlik\nFounder, PassPro (Hartford, WI)\n" + SITE

TEMPLATES = {
    "provider": (
        "Retake support for your Wisconsin students",
        "Hi {name} team,\n\nAbout 4 in 10 first-time Wisconsin insurance exam takers don't pass. Your students "
        "who miss already have a valid certificate for a year; what they need is targeted retake practice.\n\n"
        "PassPro is Wisconsin-only exam prep (Life, A&H, Property, Casualty, Personal Lines) weighted to the PSI "
        "outlines. It supplements approved courses like yours; it doesn't replace them. Would you be open to "
        "offering it as a retake add-on or referral? Happy to set up free access for your team to review.\n\n{sig}",
    ),
    "investor": (
        "PassPro: Wisconsin licensing prep and agency recruit tracking",
        "Hi {name} team,\n\nPassPro helps new insurance agents pass the Wisconsin licensing exam, and helps "
        "agencies see which recruits are on track (\"Licensed in 30 Days\"). Roughly 3,000 Wisconsin candidates "
        "fail a first attempt each year, and agencies pay for every stalled recruit.\n\n"
        "[ADD TRACTION BEFORE SENDING: users, pilots signed, retention.]\n\nCould I share a short deck?\n\n{sig}",
    ),
    "accelerator": (
        "Application: PassPro",
        "Draft application notes for {name}:\n- Problem: about 3,000 Wisconsin exam fails a year; agencies lose "
        "months per stalled recruit.\n- Product: Wisconsin exam prep plus an agency dashboard, live at {site}.\n"
        "- Founder: Amanda Pavlik, healthcare administration and BI background, earning her own WI L&H license.\n"
        "- Ask: mentorship on B2B sales to agencies and a first investor intro.\n\n{sig}",
    ),
    "grant": (
        "Grant application: PassPro",
        "Draft answers for {name}:\n- What the business does: Wisconsin insurance licensing exam prep, including "
        "retake plans for candidates who didn't pass, and an agency program that tracks recruits to licensure.\n"
        "- Who it helps: career changers entering insurance; about 4 in 10 first attempts fail.\n"
        "- How funds are used: [FILL IN, e.g. first ad budget, question-bank expansion].\n\n{sig}",
    ),
    "support": (
        "Consulting request: PassPro",
        "Hi {name} team,\n\nI'm a Hartford, WI founder building PassPro, an exam-prep and agency training "
        "platform for Wisconsin insurance licensing. I'd like help with grant applications and investor "
        "readiness. Could we set up a consultation?\n\n{sig}",
    ),
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--type", choices=sorted(TEMPLATES))
    args = parser.parse_args()
    drafts = []
    with open(BOTS_DIR / "targets.csv", newline="") as fh:
        for row in csv.DictReader(fh):
            if args.type and row["type"] != args.type:
                continue
            subject, body = TEMPLATES[row["type"]]
            drafts.append({
                "kind": "outreach",
                "channel": f"{row['type']}: {row['route']}",
                "audience": row["type"],
                "bot": "outreach",
                "context": f"{row['name']}: {row['why']}",
                "subject": subject,
                "body": body.format(name=row["name"], sig=SIGNATURE, site=SITE),
            })
    report("outreach_bot", add_drafts(drafts))


if __name__ == "__main__":
    main()
