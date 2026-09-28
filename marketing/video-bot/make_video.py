#!/usr/bin/env python3
"""PassPro promo video bot.

Renders branded vertical (1080x1920) promo videos for TikTok, Instagram Reels,
YouTube Shorts, and Facebook Reels from a JSON script, using the PassPro
"Ledger" look (dark ink, gold accent, serif headlines, mono labels).

Usage:
    python3 make_video.py scripts/p-and-c-launch.json            # one video
    python3 make_video.py scripts/*.json --out out/               # batch
    python3 make_video.py scripts/x.json --size 1080x1080         # square feed post

Requirements: Python 3.9+, Pillow, and ffmpeg on PATH (or `pip install
imageio-ffmpeg`, which ships its own ffmpeg binary). Fonts: put Fraunces,
Inter, and a monospace TTF in ./fonts (see fonts/README.md); DejaVu is used as
a fallback.

Script format (JSON):
{
  "title": "internal name",
  "fps": 30,
  "scenes": [
    {"type": "hook",  "eyebrow": "...", "text": "...", "accent": "...", "seconds": 3},
    {"type": "stat",  "label": "...", "value": "25/50/10", "caption": "...", "seconds": 3},
    {"type": "list",  "title": "...", "items": ["...", "..."], "seconds": 5},
    {"type": "quiz",  "question": "...", "options": ["...", "..."], "answer": 1,
                      "explain": "...", "seconds": 6},
    {"type": "cta",   "text": "...", "url": "passpro.company", "seconds": 3}
  ]
}
Text is never invented by the bot: it renders exactly what the script says,
so every factual claim should come from the PassPro lessons or question bank.
"""
from __future__ import annotations

import argparse
import glob
import json
import math
import os
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent

INK_950 = (23, 20, 16)
INK_900 = (30, 26, 21)
INK_800 = (38, 32, 25)
LINE = (58, 51, 39)
PAPER = (233, 227, 214)
MUTED = (154, 143, 118)
GOLD = (209, 169, 75)
GOLD_LIGHT = (224, 190, 108)

GF = '/usr/share/fonts/truetype/google-fonts/'
FONT_CANDIDATES = {
    'serif': ['fonts/Fraunces.ttf', 'fonts/Fraunces-Medium.ttf', GF + 'Lora-Variable.ttf',
              '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'],
    'serif_italic': ['fonts/Fraunces-Italic.ttf', GF + 'Lora-Italic-Variable.ttf',
                     '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf',
                     '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'],
    'sans': ['fonts/Inter.ttf', 'fonts/Inter-Regular.ttf', GF + 'Poppins-Regular.ttf',
             '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'],
    'mono': ['fonts/JetBrainsMono.ttf', 'fonts/Mono.ttf',
             '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'],
}
_font_cache: dict[tuple[str, int], ImageFont.FreeTypeFont] = {}


def font(kind: str, size: int) -> ImageFont.FreeTypeFont:
    key = (kind, size)
    if key in _font_cache:
        return _font_cache[key]
    for candidate in FONT_CANDIDATES[kind]:
        path = candidate if os.path.isabs(candidate) else HERE / candidate
        if Path(path).exists():
            loaded = ImageFont.truetype(str(path), size)
            # Variable fonts: pick a medium weight when the axis exists.
            try:
                axes = loaded.get_variation_axes()
                values = []
                for axis in axes:
                    name = axis.get('name', b'')
                    name = name.decode() if isinstance(name, bytes) else str(name)
                    if name.lower().startswith('weight'):
                        values.append(500 if kind != 'mono' else 600)
                    elif name.lower().startswith('optical'):
                        values.append(min(max(size / 2, axis['minimum']), axis['maximum']))
                    else:
                        values.append(axis['default'])
                loaded.set_variation_by_axes(values)
            except Exception:
                pass
            _font_cache[key] = loaded
            return loaded
    _font_cache[key] = ImageFont.load_default()
    return _font_cache[key]


def ease_out(t: float) -> float:
    t = max(0.0, min(1.0, t))
    return 1 - (1 - t) ** 3


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt, max_width: int) -> list[str]:
    lines: list[str] = []
    for paragraph in text.split('\n'):
        words, line = paragraph.split(), ''
        for word in words:
            trial = f'{line} {word}'.strip()
            if draw.textlength(trial, font=fnt) <= max_width:
                line = trial
            else:
                if line:
                    lines.append(line)
                line = word
        lines.append(line)
    return lines


class Frame:
    def __init__(self, width: int, height: int):
        self.w, self.h = width, height
        self.img = Image.new('RGB', (width, height), INK_950)
        self.draw = ImageDraw.Draw(self.img, 'RGBA')
        self.pad = int(width * 0.085)

    def fade(self, color, alpha: float):
        return (*color, int(255 * max(0.0, min(1.0, alpha))))

    def text_block(self, text, kind, size, y, color, alpha=1.0, max_width=None,
                   spacing=1.18, offset=0):
        fnt = font(kind, size)
        max_width = max_width or self.w - self.pad * 2
        lines = wrap(self.draw, text, fnt, max_width)
        for line in lines:
            self.draw.text((self.pad + offset, y), line, font=fnt, fill=self.fade(color, alpha))
            y += int(size * spacing)
        return y

    def eyebrow(self, text, y, alpha=1.0, color=GOLD):
        size = int(self.w * 0.03)
        spaced = ' '.join(text.upper())
        # Shrink long eyebrows so they never run off the frame.
        while size > 14 and self.draw.textlength(spaced, font=font('mono', size)) > self.w - 2 * self.pad:
            size -= 2
        fnt = font('mono', size)
        self.draw.text((self.pad, y), spaced, font=fnt, fill=self.fade(color, alpha))
        return y + int(size * 2.2)

    def chrome(self, progress: float, brand_alpha=1.0):
        """Brand bar, rule lines, and the gold progress bar along the bottom."""
        size = int(self.w * 0.042)
        self.draw.text((self.pad, int(self.h * 0.055)), 'PassPro', font=font('serif', size),
                       fill=self.fade(PAPER, brand_alpha))
        tag = ' '.join('WISCONSIN')
        tag_font = font('mono', int(self.w * 0.022))
        tw = self.draw.textlength(tag, font=tag_font)
        self.draw.text((self.w - self.pad - tw, int(self.h * 0.062)), tag, font=tag_font,
                       fill=self.fade(GOLD, brand_alpha))
        self.draw.line([(0, int(self.h * 0.1)), (self.w, int(self.h * 0.1))], fill=LINE, width=2)
        bar_y = self.h - int(self.h * 0.012)
        self.draw.rectangle([0, bar_y, self.w, self.h], fill=INK_800)
        self.draw.rectangle([0, bar_y, int(self.w * progress), self.h], fill=GOLD)


# ---------------------------------------------------------------- scenes

def scene_hook(f: Frame, s: dict, t: float, local: float):
    y = int(f.h * 0.3)
    a1 = ease_out(local / 0.35)
    if s.get('eyebrow'):
        y = f.eyebrow(s['eyebrow'], y, a1)
    size = int(f.w * 0.095)
    a2 = ease_out((local - 0.25) / 0.5)
    y = f.text_block(s['text'], 'serif', size, y + int(20 * (1 - a2)), PAPER, a2)
    if s.get('accent'):
        a3 = ease_out((local - 0.8) / 0.5)
        f.text_block(s['accent'], 'serif_italic', size, y, GOLD_LIGHT, a3)


def scene_stat(f: Frame, s: dict, t: float, local: float):
    y = int(f.h * 0.3)
    y = f.eyebrow(s.get('label', ''), y, ease_out(local / 0.3))
    a = ease_out((local - 0.15) / 0.45)
    size = int(f.w * 0.17)
    value_font = font('mono', size)
    f.draw.text((f.pad, y + int(40 * (1 - a))), s['value'], font=value_font,
                fill=f.fade(GOLD, a))
    y += int(size * 1.35)
    f.draw.line([(f.pad, y), (f.pad + int((f.w - 2 * f.pad) * ease_out((local - 0.3) / 0.6)), y)],
                fill=GOLD, width=4)
    if s.get('caption'):
        f.text_block(s['caption'], 'sans', int(f.w * 0.048), y + 50, PAPER,
                     ease_out((local - 0.6) / 0.5))


def scene_list(f: Frame, s: dict, t: float, local: float):
    y = int(f.h * 0.2)
    y = f.text_block(s.get('title', ''), 'serif', int(f.w * 0.075), y, PAPER,
                     ease_out(local / 0.35)) + 40
    items = s.get('items', [])
    per = max(0.35, min(0.8, (s['seconds'] - 1.2) / max(1, len(items))))
    size = int(f.w * 0.046)
    for i, item in enumerate(items):
        a = ease_out((local - 0.4 - i * per) / 0.35)
        f.draw.line([(f.pad, y), (f.w - f.pad, y)], fill=f.fade(LINE, a), width=2)
        num = f'{i + 1:02d}'
        f.draw.text((f.pad, y + 28), num, font=font('mono', int(size * 0.8)), fill=f.fade(GOLD, a))
        y = f.text_block(item, 'sans', size, y + 22, PAPER, a,
                         max_width=f.w - f.pad * 2 - int(size * 2.2),
                         offset=int(size * 2.2) + int(20 * (1 - a))) + 26


def scene_quiz(f: Frame, s: dict, t: float, local: float):
    y = int(f.h * 0.17)
    y = f.eyebrow('Wisconsin exam question', y, ease_out(local / 0.3))
    y = f.text_block(s['question'], 'serif', int(f.w * 0.062), y, PAPER,
                     ease_out((local - 0.1) / 0.4)) + 30
    reveal_at = s['seconds'] * 0.62
    revealed = local >= reveal_at
    size = int(f.w * 0.043)
    for i, option in enumerate(s['options']):
        a = ease_out((local - 0.6 - i * 0.2) / 0.3)
        correct = i == s['answer']
        box_h = int(size * 2.6) if f.draw.textlength(option, font=font('sans', size)) < f.w - f.pad * 2 - 140 else int(size * 3.8)
        border = GOLD if (revealed and correct) else LINE
        fill = (209, 169, 75, 40) if (revealed and correct) else (30, 26, 21, int(255 * a))
        dim = 0.35 if (revealed and not correct) else 1.0
        f.draw.rectangle([f.pad, y, f.w - f.pad, y + box_h], fill=fill,
                         outline=f.fade(border, a), width=3)
        letter = 'ABCD'[i]
        f.draw.text((f.pad + 30, y + int(size * 0.7)), letter, font=font('mono', size),
                    fill=f.fade(GOLD, a * dim))
        lines = wrap(f.draw, option, font('sans', size), f.w - f.pad * 2 - 140)
        ly = y + int(size * 0.7)
        for line in lines[:2]:
            f.draw.text((f.pad + 100, ly), line, font=font('sans', size), fill=f.fade(PAPER, a * dim))
            ly += int(size * 1.2)
        y += box_h + 22
    if not revealed:
        remaining = math.ceil(reveal_at - local)
        f.text_block(f'Answer in {remaining}…', 'mono', int(f.w * 0.035), y + 20, MUTED, 1.0)
    elif s.get('explain'):
        f.text_block(s['explain'], 'sans', int(f.w * 0.04), y + 20, GOLD_LIGHT,
                     ease_out((local - reveal_at) / 0.4))


def scene_cta(f: Frame, s: dict, t: float, local: float):
    y = int(f.h * 0.34)
    a = ease_out(local / 0.4)
    y = f.text_block(s['text'], 'serif', int(f.w * 0.085), y, PAPER, a) + 40
    a2 = ease_out((local - 0.4) / 0.4)
    bw, bh = f.w - f.pad * 2, int(f.w * 0.14)
    f.draw.rectangle([f.pad, y, f.pad + bw, y + bh], fill=f.fade(GOLD, a2))
    url_font = font('mono', int(f.w * 0.052))
    tw = f.draw.textlength(s.get('url', 'passpro.company'), font=url_font)
    f.draw.text((f.pad + (bw - tw) / 2, y + bh * 0.28), s.get('url', 'passpro.company'),
                font=url_font, fill=(*INK_950, int(255 * a2)))
    if s.get('sub'):
        f.text_block(s['sub'], 'mono', int(f.w * 0.03), y + bh + 40, MUTED, a2)


SCENES = {'hook': scene_hook, 'stat': scene_stat, 'list': scene_list,
          'quiz': scene_quiz, 'cta': scene_cta}


# ---------------------------------------------------------------- render

def find_ffmpeg() -> str:
    if shutil.which('ffmpeg'):
        return 'ffmpeg'
    try:
        import imageio_ffmpeg  # type: ignore
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        sys.exit('ffmpeg not found: install it or `pip install imageio-ffmpeg`.')


def render(script_path: Path, out_dir: Path, size: tuple[int, int]) -> Path:
    script = json.loads(script_path.read_text())
    fps = int(script.get('fps', 30))
    scenes = script['scenes']
    total = sum(s['seconds'] for s in scenes)
    frames = int(total * fps)
    out_dir.mkdir(parents=True, exist_ok=True)
    suffix = '' if size == (1080, 1920) else f'-{size[0]}x{size[1]}'
    out = out_dir / f'{script_path.stem}{suffix}.mp4'

    cmd = [find_ffmpeg(), '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
           '-s', f'{size[0]}x{size[1]}', '-r', str(fps), '-i', '-',
           '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p',
           '-movflags', '+faststart', str(out)]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    boundaries, acc = [], 0.0
    for s in scenes:
        boundaries.append((acc, acc + s['seconds'], s))
        acc += s['seconds']

    for n in range(frames):
        t = n / fps
        start, end, scene = next(b for b in boundaries if b[0] <= t < b[1]) if t < total else boundaries[-1]
        local = t - start
        frame = Frame(*size)
        # Crossfade: fade the whole scene out over its last 0.25s.
        SCENES[scene['type']](frame, scene, t, local)
        frame.chrome(t / total)
        remaining = end - t
        if remaining < 0.25 and end < total:
            overlay = Image.new('RGB', size, INK_950)
            frame.img = Image.blend(frame.img, overlay, 1 - remaining / 0.25)
        proc.stdin.write(frame.img.tobytes())

    proc.stdin.close()
    if proc.wait() != 0:
        sys.exit(f'ffmpeg failed for {script_path}')

    # Poster frame for thumbnails and post previews.
    poster_t = min(total - 0.1, scenes[0]['seconds'] * 0.9)
    frame = Frame(*size)
    SCENES[scenes[0]['type']](frame, scenes[0], poster_t, poster_t)
    frame.chrome(poster_t / total)
    frame.img.save(out.with_suffix('.jpg'), quality=90)
    return out


def main():
    parser = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    parser.add_argument('scripts', nargs='+')
    parser.add_argument('--out', default=str(HERE / 'out'))
    parser.add_argument('--size', default='1080x1920')
    args = parser.parse_args()
    size = tuple(int(v) for v in args.size.lower().split('x'))
    paths = [Path(p) for pattern in args.scripts for p in glob.glob(pattern)]
    for path in paths:
        out = render(path, Path(args.out), size)
        print(f'rendered {out}')


if __name__ == '__main__':
    main()
