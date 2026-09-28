"""Review the approval queue.

  python3 review.py list [--status pending]      show drafts
  python3 review.py approve <id> [<id> ...]      mark approved
  python3 review.py reject <id> [--note "why"]   mark rejected
  python3 review.py edit <id>                    open the body in $EDITOR, then approve
  python3 review.py export                       write approved drafts to queue/approved.md

Approving never publishes anything. Post or send approved drafts yourself.
"""

import argparse
import os
import subprocess
import tempfile

from common import BOTS_DIR, read_queue, write_queue


def find(queue, draft_id):
    for d in queue:
        if d["id"].startswith(draft_id):
            return d
    raise SystemExit(f"No draft {draft_id}")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="cmd", required=True)
    ls = sub.add_parser("list")
    ls.add_argument("--status")
    ap = sub.add_parser("approve")
    ap.add_argument("ids", nargs="+")
    rj = sub.add_parser("reject")
    rj.add_argument("id")
    rj.add_argument("--note", default="")
    ed = sub.add_parser("edit")
    ed.add_argument("id")
    sub.add_parser("export")
    args = parser.parse_args()

    queue = read_queue()
    if args.cmd == "list":
        for d in queue:
            if args.status and d["status"] != args.status:
                continue
            print(f"[{d['id']}] {d['status']:9} {d['bot']:10} {d['channel']}")
            print("   " + d["body"].replace("\n", "\n   ")[:600])
            if d.get("problems"):
                print("   PROBLEMS: " + "; ".join(d["problems"]))
            print()
        return
    if args.cmd == "approve":
        for i in args.ids:
            d = find(queue, i)
            if d.get("problems"):
                raise SystemExit(f"{d['id']} has problems ({'; '.join(d['problems'])}); edit it first.")
            d["status"] = "approved"
    elif args.cmd == "reject":
        d = find(queue, args.id)
        d["status"], d["note"] = "rejected", args.note
    elif args.cmd == "edit":
        d = find(queue, args.id)
        with tempfile.NamedTemporaryFile("w+", suffix=".txt", delete=False) as fh:
            fh.write(d["body"])
        subprocess.call([os.environ.get("EDITOR", "nano"), fh.name])
        d["body"] = open(fh.name).read().strip()
        d["status"], d["problems"] = "approved", []
    elif args.cmd == "export":
        out = BOTS_DIR / "queue" / "approved.md"
        lines = ["# Approved drafts, ready to post\n"]
        for d in queue:
            if d["status"] == "approved":
                lines.append(f"## {d['channel']} ({d['kind']})\n")
                if d.get("url"):
                    lines.append(f"Reply to: {d['url']}\n")
                lines.append(d["body"] + "\n")
        out.write_text("\n".join(lines))
        print(f"Wrote {out}")
        return
    write_queue(queue)
    print("Saved.")


if __name__ == "__main__":
    main()
