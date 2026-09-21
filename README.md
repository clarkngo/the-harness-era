# The Harness Era

An interactive ebook for people who have used a chatbot and want to understand agents.

**Thesis:** Agent = Model + Harness. You do not need a machine-learning background.

The manuscript in `manuscript/` is the source of truth. The Astro site is a renderer. PDF/EPUB are exports.

## Read the text

Open `manuscript/chapters/*.md`. Comics, dialogue, diagrams, and the deep-dive are all in those files.

## Web

```bash
npm install
npm run dev
```

Typically `http://localhost:4321`.

## PDF / EPUB

Requires [pandoc](https://pandoc.org/). PDF also needs an engine on `PATH` (`typst`, `weasyprint`, `xelatex`, `lualatex`, `pdflatex`, or `wkhtmltopdf`).

```bash
npm run export          # EPUB + PDF into exports/
npm run export:epub     # EPUB only
npm run export:pdf      # PDF only
```

Output is written to `exports/` and never back into `manuscript/`.

## Stack

Astro, React, Tailwind CSS, Lucide icons, and static SVG diagrams. Chapters are Markdown; the site hydrates comics, dialogue, and diagrams from that Markdown.
