#!/usr/bin/env python3
"""Compile manuscript markdown into EPUB and PDF via pandoc.

Reads from /manuscript only. Never writes into that directory.

Walk order:
  1. manuscript/title.md, if present
  2. manuscript/chapters/*.md, numeric filename order

Diagram SVGs referenced as ../diagrams/{id}.svg are copied into a staging
tree so pandoc can embed them. The manuscript on disk is not edited.

Usage:
  python3 tools/export-manuscript.py
  python3 tools/export-manuscript.py --format epub
  python3 tools/export-manuscript.py --outdir dist/ebook
"""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANUSCRIPT = ROOT / "manuscript"
CHAPTERS = MANUSCRIPT / "chapters"
DIAGRAMS = MANUSCRIPT / "diagrams"
TITLE_PAGE = MANUSCRIPT / "title.md"
DEFAULT_OUTDIR = ROOT / "exports"
TITLE = "The Harness Era"

SPLIT_DIGITS = re.compile(r"(\d+)")
FRONTMATTER = re.compile(r"^---\n.*?\n---\n*", re.S)

PDF_ENGINES = ("typst", "weasyprint", "xelatex", "lualatex", "pdflatex", "wkhtmltopdf")


def natural_key(name: str) -> list:
    parts = SPLIT_DIGITS.split(name)
    key = []
    for part in parts:
        if part.isdigit():
            key.append(int(part))
        else:
            key.append(part.lower())
    return key


def require_pandoc() -> str:
    path = shutil.which("pandoc")
    if not path:
        sys.stderr.write(
            "error: pandoc is not installed or on PATH.\n"
            "Install pandoc (https://pandoc.org/installing.html) and retry.\n"
        )
        sys.exit(1)
    return path


def chapter_files() -> list[Path]:
    if not CHAPTERS.is_dir():
        sys.stderr.write(f"error: chapter directory not found: {CHAPTERS}\n")
        sys.exit(1)
    files = sorted(
        (path for path in CHAPTERS.glob("*.md") if path.is_file()),
        key=lambda path: natural_key(path.name),
    )
    if not files:
        sys.stderr.write(f"error: no markdown chapters in {CHAPTERS}\n")
        sys.exit(1)
    return files


def collect_sources() -> list[Path]:
    files: list[Path] = []
    if TITLE_PAGE.is_file():
        files.append(TITLE_PAGE)
    files.extend(chapter_files())
    return files


def strip_frontmatter(markdown: str) -> str:
    return FRONTMATTER.sub("", markdown, count=1).lstrip()


def stage_sources(sources: list[Path], staging: Path) -> list[Path]:
    staged: list[Path] = []
    diagrams_dest = staging / "diagrams"
    if DIAGRAMS.is_dir():
        shutil.copytree(DIAGRAMS, diagrams_dest)

    for source in sources:
        if source == TITLE_PAGE:
            dest = staging / "title.md"
        else:
            dest = staging / "chapters" / source.name
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(
            strip_frontmatter(source.read_text(encoding="utf-8")).replace(
                "](../diagrams/", "](diagrams/"
            ),
            encoding="utf-8",
        )
        staged.append(dest)
    return staged


def find_pdf_engine() -> str | None:
    for engine in PDF_ENGINES:
        if shutil.which(engine):
            return engine
    return None


def run_pandoc(pandoc: str, args: list[str]) -> None:
    result = subprocess.run([pandoc, *args], check=False)
    if result.returncode != 0:
        sys.stderr.write(f"error: pandoc exited {result.returncode}: {' '.join(args)}\n")
        sys.exit(result.returncode)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--outdir",
        type=Path,
        default=DEFAULT_OUTDIR,
        help=f"directory for EPUB/PDF output (default: {DEFAULT_OUTDIR})",
    )
    parser.add_argument(
        "--format",
        choices=("all", "epub", "pdf"),
        default="all",
        help="which artifacts to build (default: all)",
    )
    args = parser.parse_args()

    if args.outdir.resolve().is_relative_to(MANUSCRIPT.resolve()):
        sys.stderr.write("error: refusing to write output inside /manuscript.\n")
        sys.exit(1)

    pandoc = require_pandoc()
    sources = collect_sources()
    args.outdir.mkdir(parents=True, exist_ok=True)

    print("Sources, in order:")
    for source in sources:
        print(f"  {source.relative_to(ROOT)}")

    metadata = ["--metadata", f"title={TITLE}", "--toc", "--toc-depth=2"]

    with tempfile.TemporaryDirectory(prefix="harness-export-") as tmp:
        staging = Path(tmp)
        staged = stage_sources(sources, staging)
        source_args = [str(path) for path in staged]
        resource_path = str(staging)

        if args.format in ("all", "epub"):
            epub_path = args.outdir / "the-harness-era.epub"
            print(f"\nWriting {epub_path}")
            run_pandoc(
                pandoc,
                [
                    *metadata,
                    f"--resource-path={resource_path}",
                    "-o",
                    str(epub_path),
                    *source_args,
                ],
            )

        if args.format in ("all", "pdf"):
            engine = find_pdf_engine()
            if not engine:
                sys.stderr.write(
                    "error: pandoc is installed, but no PDF engine was found on PATH.\n"
                    f"Install one of: {', '.join(PDF_ENGINES)}.\n"
                    "EPUB export can still be run with: python3 tools/export-manuscript.py --format epub\n"
                )
                sys.exit(1)
            pdf_path = args.outdir / "the-harness-era.pdf"
            print(f"\nWriting {pdf_path} (engine: {engine})")
            run_pandoc(
                pandoc,
                [
                    *metadata,
                    f"--pdf-engine={engine}",
                    f"--resource-path={resource_path}",
                    "-o",
                    str(pdf_path),
                    *source_args,
                ],
            )

    print("\nDone.")


if __name__ == "__main__":
    main()
