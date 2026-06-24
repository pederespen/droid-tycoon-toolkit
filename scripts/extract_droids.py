#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "pillow>=10",
#     "numpy>=1.26",
# ]
# ///
"""Extract individual droid portraits from in-game Droidex screenshots.

Each Droidex page is a 5x4 grid of 20 droids. For every cell this:
  - crops to a SQUARE portrait (only the thin gray cell border is trimmed, so
    the droid art is never cut off),
  - paints over the rarity label strip at the bottom (Common / Rare / ...) with
    the cell's background colour instead of cropping it away,
  - paints over the flawless "sparkle" marker in the top-left the same way.

The result is a clean, square image that keeps the whole droid; the two HUD
artifacts are replaced with background colour so nothing important is lost.

------------------------------------------------------------------------------
Quick start (uv manages the virtual environment for you)
------------------------------------------------------------------------------
The dependencies are declared inline above (PEP 723), so uv creates and caches
an isolated environment automatically -- nothing to install or activate:

1. Calibrate visually on one screenshot:

    uv run scripts/extract_droids.py shot.png --debug

   This writes shot.debug.png with the boxes drawn on top:
     red   = full cell
     green = square portrait crop (what gets saved)
     blue  = regions painted with background colour (label + sparkle)
   Tweak the GRID constants below (or the CLI flags) until green is a square
   that frames each droid and the blue boxes cover the label and sparkle.

2. Extract for real:

    uv run scripts/extract_droids.py page1.png page2.png -o out/

3. Name the outputs by passing a names file (one droid per line, in reading
   order: left-to-right, top-to-bottom). Names are slugified to match the
   existing public/droids convention ("B1 Battle" -> b1-battle.webp):

    uv run scripts/extract_droids.py page1.png -o out/ --names page1.txt

   Without --names, files are written as <screenshot>-01.png ... -20.png.

(You can also run it with a plain `python` after `pip install pillow numpy`.)
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

Box = tuple[int, int, int, int]
Color = tuple[int, int, int]


# ---------------------------------------------------------------------------
# Grid layout. Defaults assume a tight crop where the grid fills the image
# (like the sample screenshot). All values are fractions (0..1) so they work at
# any resolution. The most-tuned ones are also exposed as CLI flags.
# ---------------------------------------------------------------------------
COLS = 5
ROWS = 4

# Outer margin around the whole grid, as a fraction of image width/height.
# Set these if you feed a full-window screenshot with UI around the grid.
MARGIN_LEFT = 0.0
MARGIN_RIGHT = 0.0
MARGIN_TOP = 0.0
MARGIN_BOTTOM = 0.0

# Gap between adjacent cells, as a fraction of the cell pitch.
GAP_X = 0.0
GAP_Y = 0.0

# The cell's gray border is detected automatically and cropped away. A pixel is
# treated as "border/bright" above this luma; a row/column counts as a border
# line when at least BORDER_LINE_FRAC of it is bright. Detection only looks
# within BORDER_SCAN of each edge so a bright droid can't be mistaken for it.
BORDER_THRESHOLD = 80
BORDER_LINE_FRAC = 0.5
BORDER_SCAN = 0.30

# Fallback inset (fraction of the cell) used only if the border can't be found.
BORDER_INSET = 0.06

# Bottom strip to paint over (the rarity label), as a fraction of the square
# portrait height.
LABEL_STRIP = 0.16

# Top-left region to paint over (the flawless sparkle), as a fraction of the
# square portrait size. The sparkle is a 4-tip star, so the region is a pentagon
# that covers the top, left, right and bottom tips but cuts the bottom-right
# corner diagonally (between the bottom and right tips) to keep more of the
# droid. MARKER_DROP / MARKER_RIGHT extend the region a few extra pixels down
# and to the right.
MARKER = 0.25
MARKER_DROP = 2
MARKER_RIGHT = 1

# Optional fixed output edge length in pixels. None keeps the native crop size.
OUTPUT_SIZE: int | None = None

# Background removal: a pixel is treated as background when every channel is
# within this distance of the sampled/declared background colour. Only pixels
# connected to the image edge are removed, so dark parts of the droid survive.
BG_TOLERANCE = 36


def slugify(name: str) -> str:
    """Match the existing public/droids naming: lowercase, non-alphanumerics
    collapse to single hyphens. e.g. "B1 Battle" -> "b1-battle"."""
    return re.sub(r"[^a-z0-9]+", "-", name.strip().lower()).strip("-")


def parse_color(value: str) -> Color:
    text = value.strip().lstrip("#")
    if len(text) != 6:
        raise SystemExit("--bg expects a hex colour like #0a0a0a")
    return (int(text[0:2], 16), int(text[2:4], 16), int(text[4:6], 16))


def cell_boxes(width: int, height: int) -> list[Box]:
    """Full-cell boxes (left, top, right, bottom) in reading order."""
    grid_left = MARGIN_LEFT * width
    grid_top = MARGIN_TOP * height
    grid_w = width - (MARGIN_LEFT + MARGIN_RIGHT) * width
    grid_h = height - (MARGIN_TOP + MARGIN_BOTTOM) * height

    pitch_x = grid_w / COLS
    pitch_y = grid_h / ROWS
    gap_x = pitch_x * GAP_X / 2
    gap_y = pitch_y * GAP_Y / 2

    boxes: list[Box] = []
    for row in range(ROWS):
        for col in range(COLS):
            x0 = grid_left + col * pitch_x + gap_x
            y0 = grid_top + row * pitch_y + gap_y
            x1 = grid_left + (col + 1) * pitch_x - gap_x
            y1 = grid_top + (row + 1) * pitch_y - gap_y
            boxes.append((round(x0), round(y0), round(x1), round(y1)))
    return boxes


def _inner_edge(frac: np.ndarray, fallback: int) -> int:
    """Scan inward from index 0: skip the dark inter-cell gap, pass through the
    bright border line, and return the index where the interior begins."""
    n = len(frac)
    limit = max(1, int(n * BORDER_SCAN))
    i = 0
    while i < limit and frac[i] < BORDER_LINE_FRAC:  # skip dark gap
        i += 1
    if i >= limit:  # no border line found near this edge
        return fallback
    while i < n and frac[i] >= BORDER_LINE_FRAC:  # pass through border thickness
        i += 1
    return i


def interior_box(image: Image.Image, cell: Box) -> Box:
    """Detect the area inside the cell's gray border and return it in absolute
    image coordinates. Falls back to a fixed inset if no border is found."""
    x0, y0, x1, y1 = cell
    gray = np.asarray(image.crop(cell).convert("L"))
    bright = gray > BORDER_THRESHOLD
    row_frac = bright.mean(axis=1)
    col_frac = bright.mean(axis=0)
    h, w = gray.shape

    left = _inner_edge(col_frac, round(w * BORDER_INSET))
    top = _inner_edge(row_frac, round(h * BORDER_INSET))
    right = w - _inner_edge(col_frac[::-1], round(w * BORDER_INSET))
    bottom = h - _inner_edge(row_frac[::-1], round(h * BORDER_INSET))
    return (x0 + left, y0 + top, x0 + right, y0 + bottom)


def square_box(image: Image.Image, cell: Box) -> Box:
    """Crop to inside the border, then take a square aligned to the top of that
    interior (the droid art sits above the rarity label), so the result is
    square without distorting or cutting the droid."""
    ix0, iy0, ix1, iy1 = interior_box(image, cell)
    side = min(ix1 - ix0, iy1 - iy0)
    cx = (ix0 + ix1) / 2
    return (round(cx - side / 2), iy0, round(cx + side / 2), iy0 + side)


def marker_poly(size: int) -> list[tuple[int, int]]:
    """Pentagon covering the top-left sparkle. The bottom-right corner is cut
    diagonally between the star's bottom tip (bottom-middle) and right tip
    (right-middle) so the droid is preserved there."""
    m = max(1, round(size * MARKER))
    d = MARKER_DROP
    r = MARKER_RIGHT
    half = m // 2
    return [
        (0, 0),
        (m + r, 0),
        (m + r, half),
        (half, m + d),
        (0, m + d),
    ]


def label_rect(size: int) -> Box:
    h = max(1, round(size * LABEL_STRIP))
    return (0, size - h, size, size)


def sample_bg(arr: np.ndarray) -> Color:
    """Estimate the cell background from the outer border ring, which is almost
    entirely background since the droid is centred. Median over the ring is
    robust even when a droid pokes into the corners (where corner-only sampling
    would mistake the droid for the background)."""
    h, w = arr.shape[:2]
    b = max(2, round(min(h, w) * 0.06))
    mask = np.zeros((h, w), dtype=bool)
    mask[:b] = True
    mask[-b:] = True
    mask[:, :b] = True
    mask[:, -b:] = True
    ring = arr[mask].reshape(-1, 3)
    return tuple(int(c) for c in np.median(ring, axis=0))  # type: ignore[return-value]


def clean_portrait(
    portrait: Image.Image,
    bg: Color | None,
    keep_marker: bool,
    keep_label: bool,
    crop_label: bool,
) -> Image.Image:
    arr = np.asarray(portrait.convert("RGB"))
    fill = bg if bg is not None else sample_bg(arr)
    size = portrait.size[0]  # square

    out = portrait.convert("RGB").copy()
    draw = ImageDraw.Draw(out)
    if not keep_marker:
        draw.polygon(marker_poly(size), fill=fill)
    if not keep_label and not crop_label:
        draw.rectangle(label_rect(size), fill=fill)
    if not keep_label and crop_label:
        # Crop the bottom label strip away, then trim the width by the same
        # amount (evenly from both sides) so the result stays square.
        label_h = max(1, round(size * LABEL_STRIP))
        new_side = size - label_h
        x0 = (size - new_side) // 2
        out = out.crop((x0, 0, x0 + new_side, new_side))
    return out


def remove_background(portrait: Image.Image, bg: Color | None, tol: int) -> Image.Image:
    """Make the flat cell background transparent. Flood-fills inward from every
    edge pixel, removing only pixels within `tol` of the background colour that
    are connected to the border, so dark regions inside the droid are kept."""
    rgba = np.asarray(portrait.convert("RGBA")).copy()
    rgb = rgba[..., :3].astype(np.int16)
    base = np.array(bg if bg is not None else sample_bg(rgba[..., :3]), dtype=np.int16)
    close = np.abs(rgb - base).max(axis=2) <= tol

    h, w = close.shape
    visited = np.zeros((h, w), dtype=bool)
    queue: deque[tuple[int, int]] = deque()
    for y in range(h):
        for x in (0, w - 1):
            if close[y, x] and not visited[y, x]:
                visited[y, x] = True
                queue.append((y, x))
    for x in range(w):
        for y in (0, h - 1):
            if close[y, x] and not visited[y, x]:
                visited[y, x] = True
                queue.append((y, x))

    while queue:
        y, x = queue.popleft()
        for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
            if 0 <= ny < h and 0 <= nx < w and close[ny, nx] and not visited[ny, nx]:
                visited[ny, nx] = True
                queue.append((ny, nx))

    rgba[visited, 3] = 0
    return Image.fromarray(rgba, "RGBA")


def write_debug(
    image: Image.Image, cells: list[Box], path: Path, crop_label: bool
) -> None:
    overlay = image.convert("RGB").copy()
    draw = ImageDraw.Draw(overlay)
    for cell in cells:
        sq = square_box(image, cell)
        size = sq[2] - sq[0]
        lx0, ly0, lx1, ly1 = label_rect(size)
        draw.rectangle(cell, outline=(255, 60, 60), width=2)
        draw.rectangle(sq, outline=(60, 220, 90), width=2)
        draw.polygon(
            [(sq[0] + px, sq[1] + py) for px, py in marker_poly(size)],
            outline=(70, 140, 255),
            width=2,
        )
        draw.rectangle(
            (sq[0] + lx0, sq[1] + ly0, sq[0] + lx1, sq[1] + ly1),
            outline=(70, 140, 255),
            width=2,
        )
        if crop_label:
            # Yellow = the square that is actually saved in crop mode.
            label_h = max(1, round(size * LABEL_STRIP))
            inset = label_h // 2
            draw.rectangle(
                (sq[0] + inset, sq[1], sq[2] - inset, sq[1] + size - label_h),
                outline=(255, 210, 50),
                width=2,
            )
    overlay.save(path)
    print(f"  wrote {path}")


def load_names(path: Path | None, max_count: int) -> list[str] | None:
    if path is None:
        return None
    lines = [
        line.strip()
        for line in path.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]
    if not lines:
        return None
    if len(lines) > max_count:
        print(
            f"  warning: {path.name} has {len(lines)} names but the grid only "
            f"holds {max_count} cells; using the first {max_count}.",
            file=sys.stderr,
        )
        lines = lines[:max_count]
    return [slugify(name) for name in lines]


def process(
    src: Path,
    out_dir: Path,
    names: list[str] | None,
    fmt: str,
    bg: Color | None,
    keep_marker: bool,
    keep_label: bool,
    crop_label: bool,
    remove_bg: bool,
    bg_tol: int,
    rarity: str | None,
    per_droid: bool,
    debug: bool,
) -> None:
    image = Image.open(src).convert("RGB")
    cells = cell_boxes(*image.size)
    resolved = load_names(names, len(cells))
    # A partial page (e.g. the last Droidex page) has fewer droids than the
    # full 5x4 grid; only extract as many cells as there are names.
    if resolved is not None:
        cells = cells[: len(resolved)]
    print(f"{src.name}: {image.size[0]}x{image.size[1]}, {len(cells)} cells")

    if debug:
        write_debug(image, cells, src.with_suffix(".debug.png"), crop_label)
        return

    out_dir.mkdir(parents=True, exist_ok=True)

    for i, cell in enumerate(cells):
        portrait = image.crop(square_box(image, cell))
        portrait = clean_portrait(portrait, bg, keep_marker, keep_label, crop_label)
        if remove_bg:
            portrait = remove_background(portrait, bg, bg_tol)
        if OUTPUT_SIZE is not None:
            portrait = portrait.resize((OUTPUT_SIZE, OUTPUT_SIZE), Image.LANCZOS)

        stem = resolved[i] if resolved is not None else f"{src.stem}-{i + 1:02d}"
        if per_droid:
            # One folder per droid, file named by rarity tier.
            droid_dir = out_dir / stem
            droid_dir.mkdir(parents=True, exist_ok=True)
            dest = droid_dir / f"{rarity or 'basic'}.{fmt}"
        else:
            suffix = f"-{rarity}" if rarity and rarity != "basic" else ""
            dest = out_dir / f"{stem}{suffix}.{fmt}"
        save_kwargs = {"quality": 92, "method": 6} if fmt == "webp" else {}
        portrait.save(dest, **save_kwargs)
        print(f"  {dest.relative_to(out_dir)}")


def apply_margins(value: str | None) -> None:
    if value is None:
        return
    global MARGIN_LEFT, MARGIN_RIGHT, MARGIN_TOP, MARGIN_BOTTOM
    parts = [float(p) for p in value.split(",")]
    if len(parts) == 1:
        MARGIN_LEFT = MARGIN_RIGHT = MARGIN_TOP = MARGIN_BOTTOM = parts[0]
    elif len(parts) == 4:
        MARGIN_LEFT, MARGIN_RIGHT, MARGIN_TOP, MARGIN_BOTTOM = parts
    else:
        raise SystemExit("--margin expects 1 or 4 comma-separated values")


def main() -> None:
    global BORDER_INSET, LABEL_STRIP, MARKER, OUTPUT_SIZE, COLS, ROWS

    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("inputs", nargs="+", type=Path, help="screenshot image(s)")
    parser.add_argument(
        "-o", "--out", type=Path, default=Path("extracted"), help="output directory"
    )
    parser.add_argument(
        "--names",
        type=Path,
        help="text file of droid names, one per line, reading order",
    )
    parser.add_argument(
        "--format", choices=["png", "webp"], default="png", help="output image format"
    )
    parser.add_argument(
        "--debug",
        action="store_true",
        help="write a *.debug.png overlay instead of extracting",
    )
    parser.add_argument(
        "--bg",
        help="background fill colour as hex (#0a0a0a); default samples each cell",
    )
    parser.add_argument(
        "--keep-marker",
        action="store_true",
        help="do not paint over the flawless sparkle",
    )
    parser.add_argument(
        "--keep-label", action="store_true", help="do not paint over the rarity label"
    )
    parser.add_argument(
        "--crop-label",
        action="store_true",
        help="crop the rarity label off (and trim width to stay square) instead of painting it",
    )
    parser.add_argument(
        "--remove-bg",
        action="store_true",
        help="make the flat cell background transparent (outputs RGBA PNG)",
    )
    parser.add_argument(
        "--bg-tol",
        type=int,
        help=f"background-removal colour tolerance, default {BG_TOLERANCE}",
    )
    parser.add_argument(
        "--rarity",
        help="rarity tier of this page (basic, gold, diamond, rainbow, beskar, flawless); names the output",
    )
    parser.add_argument(
        "--per-droid",
        action="store_true",
        help="write one folder per droid: <out>/<droid>/<rarity>.<fmt> (needs --names and --rarity)",
    )
    parser.add_argument(
        "--margin", help="grid outer margin fraction: 'all' or 'L,R,T,B'"
    )
    parser.add_argument("--cols", type=int, help=f"grid columns, default {COLS}")
    parser.add_argument("--rows", type=int, help=f"grid rows, default {ROWS}")
    parser.add_argument(
        "--border",
        type=float,
        help=f"cell border inset fraction, default {BORDER_INSET}",
    )
    parser.add_argument(
        "--label",
        type=float,
        help=f"bottom label strip fraction, default {LABEL_STRIP}",
    )
    parser.add_argument(
        "--marker",
        type=float,
        help=f"top-left sparkle square fraction, default {MARKER}",
    )
    parser.add_argument(
        "--size", type=int, help="resize output to this square edge length (px)"
    )
    args = parser.parse_args()

    apply_margins(args.margin)
    if args.cols is not None:
        COLS = args.cols
    if args.rows is not None:
        ROWS = args.rows
    if args.border is not None:
        BORDER_INSET = args.border
    if args.label is not None:
        LABEL_STRIP = args.label
    if args.marker is not None:
        MARKER = args.marker
    if args.size is not None:
        OUTPUT_SIZE = args.size

    bg = parse_color(args.bg) if args.bg else None

    if args.per_droid and args.names is None:
        raise SystemExit(
            "--per-droid needs --names so each droid's folder can be named"
        )
    rarity = slugify(args.rarity) if args.rarity else None

    for src in args.inputs:
        if not src.exists():
            print(f"skip: {src} not found", file=sys.stderr)
            continue
        process(
            src,
            args.out,
            args.names,
            args.format,
            bg,
            args.keep_marker,
            args.keep_label,
            args.crop_label,
            args.remove_bg,
            args.bg_tol if args.bg_tol is not None else BG_TOLERANCE,
            rarity,
            args.per_droid,
            args.debug,
        )


if __name__ == "__main__":
    main()
