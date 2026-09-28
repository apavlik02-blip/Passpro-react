"""Content bot: drafts one week of "Second Shot, Wisconsin" posts.

Usage:  python3 content_bot.py --week 2

Builds drafts only from facts.json, so every number traces back to a lesson,
blog post, or cited source. Drafts land in the approval queue as "pending".
"""

import argparse

from common import LANDING, add_drafts, load_facts, report

HASHTAGS = "#wisconsin #insuranceexam #insurancelicense #studytok"

WEEK_THEMES = {
    1: "You're not starting over",
    2: "The Wisconsin questions that sink people",
    3: "Your 10-day retake plan",
    4: "Passed on the second try",
}


def quiz_posts(fact):
    letters = "ABCD"
    options = " ".join(f"{letters[i]}) {o}" for i, o in enumerate(fact["options"]))
    answer = f"{letters[fact['answer']]}. {fact['explain']}"
    return [
        {
            "kind": "quiz-video",
            "channel": "TikTok / Reels / Shorts",
            "audience": "student",
            "body": (
                f"VIDEO SCRIPT\nHook: {fact['line']} exam question most people miss.\n"
                f"Question: {fact['question']}\nOptions: {options}\nReveal: {answer}\n\n"
                f"Caption: Comment your answer before the reveal. Free Wisconsin retake plan: {LANDING} {HASHTAGS}"
            ),
        },
        {
            "kind": "quiz-post",
            "channel": "Facebook / Instagram",
            "audience": "student",
            "body": (
                f"Wisconsin {fact['line']} exam question: {fact['question']} {options}\n\n"
                f"Answer in the comments tomorrow. More Wisconsin practice: {LANDING}"
            ),
            "follow_up": f"Answer: {answer} Full explanation: {fact['link']}",
        },
    ]


def week_one(facts):
    r = {f["source"]: f for f in facts["retake_facts"]}
    texts = [f["text"] for f in facts["retake_facts"]]
    return [
        {
            "kind": "hook-video",
            "channel": "TikTok / Reels / Shorts",
            "audience": "student",
            "body": (
                "VIDEO SCRIPT\nHook: Failed the Wisconsin insurance exam? Here's what nobody tells you.\n"
                f"Point: {texts[1]} Screenshot it and study those topics first.\n"
                f"CTA: Free Wisconsin retake plan at {LANDING}\n\nCaption: You're not starting over. {HASHTAGS}"
            ),
        },
        {
            "kind": "post",
            "channel": "Facebook / Instagram",
            "audience": "student",
            "body": (
                f"{texts[0]} If that was you this month: you already finished your 20 hours. "
                f"{texts[3]} {texts[2]} What you need now is focused practice on your weak areas. "
                f"Free 25-question Wisconsin diagnostic: {LANDING}"
            ),
            "sources": sorted(r),
        },
    ]


def week_three(facts):
    plan = "\n".join(facts["retake_plan"])
    return [
        {
            "kind": "carousel",
            "channel": "Instagram / Facebook",
            "audience": "student",
            "body": f"Your 10-day Wisconsin retake plan\n{plan}\n\nSave this. Practice questions for every step: {LANDING}",
        }
    ] + [
        {
            "kind": "daily-tip",
            "channel": "TikTok / Reels / Shorts",
            "audience": "student",
            "body": f"VIDEO SCRIPT\nRetake plan, {step}\nCaption: Follow along for all 10 days. {HASHTAGS}",
        }
        for step in facts["retake_plan"]
    ]


def week_four():
    return [
        {
            "kind": "founder-post",
            "channel": "LinkedIn",
            "audience": "agency",
            "body": (
                "I'm studying for my own Wisconsin Life & Health license, and I built the practice tool "
                "I wished I had. If you run an agency and your new hires stall at the exam, I'd love 15 "
                "minutes. We're offering a free 60-day pilot to three Wisconsin agencies."
            ),
        },
        {
            "kind": "ask",
            "channel": "Facebook / Instagram",
            "audience": "student",
            "body": (
                "Passed your Wisconsin insurance exam on the second (or third) try? Tell us what changed. "
                "We'd love to share your tip, with your permission."
            ),
        },
    ]


def build(week):
    facts = load_facts()
    if week == 1:
        return week_one(facts) + quiz_posts(facts["exam_facts"][0])
    if week == 2:
        return [d for f in facts["exam_facts"][:4] for d in quiz_posts(f)]
    if week == 3:
        return week_three(facts)
    return week_four() + quiz_posts(facts["exam_facts"][6])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--week", type=int, choices=sorted(WEEK_THEMES), required=True)
    args = parser.parse_args()
    drafts = build(args.week)
    for d in drafts:
        d["campaign"] = f"Second Shot, week {args.week}: {WEEK_THEMES[args.week]}"
        d["bot"] = "content"
    report("content_bot", add_drafts(drafts))


if __name__ == "__main__":
    main()
