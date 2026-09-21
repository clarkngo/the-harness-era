import type { ComicPanel, Speaker } from "../components/ComicStrip";
import type { Beat } from "../components/Dialogue";
import type { DiagramGuide } from "../data/diagramGuides";

const SPEAKERS = new Set<Speaker>(["alex", "elena", "narrator", "system"]);

export type ParsedComic = {
  title: string;
  panels: ComicPanel[];
};

export type ParsedDialogue = {
  topic: string;
  beats: Beat[];
  recap?: string;
};

export type ParsedChapter = {
  comic: ParsedComic;
  dialogue: ParsedDialogue;
  diagramGuide?: DiagramGuide;
  deepDive: string;
};

function speakerFromLabel(label: string): Speaker {
  const key = label.trim().toLowerCase() as Speaker;
  if (SPEAKERS.has(key)) return key;
  return "narrator";
}

function splitSections(markdown: string): Record<string, string> {
  const parts = markdown.split(/^## /m).filter(Boolean);
  const sections: Record<string, string> = {};
  for (const part of parts) {
    const newline = part.indexOf("\n");
    const heading = (newline === -1 ? part : part.slice(0, newline)).trim();
    const body = newline === -1 ? "" : part.slice(newline + 1).trim();
    const key = heading.replace(/:.*$/, "").trim().toLowerCase();
    sections[key] = `${heading}\n\n${body}`;
  }
  return sections;
}

function parseComic(section: string): ParsedComic {
  const heading = section.split("\n", 1)[0] ?? "";
  const title = heading.replace(/^Chapter art:\s*/i, "").trim();
  const panels: ComicPanel[] = [];
  const blocks = section.split(/^### /m).slice(1);

  for (const block of blocks) {
    const lines = block.trim().split("\n");
    const header = lines.shift() ?? "";
    const headerMatch = header.match(/^Panel\s+\d+\s+[—–-]\s+(.+)$/i);
    const speaker = speakerFromLabel(headerMatch?.[1] ?? "narrator");
    const rest = lines.join("\n").trim();

    const sceneMatch = rest.match(/\*(.+?)\*/);
    const lineMatch = rest.match(/^>\s*(.+)$/m);
    const afterQuote = rest.split(/^>\s*.+$/m)[1] ?? "";
    const caption = afterQuote.replace(/^\s*\n/, "").trim();

    panels.push({
      speaker,
      scene: sceneMatch?.[1]?.trim() ?? "",
      line: lineMatch?.[1]?.trim(),
      caption: caption || header,
    });
  }

  if (panels.length < 2) {
    throw new Error(`Chapter art "${title}" needs at least 2 panels.`);
  }

  return { title, panels };
}

function stripRecap(text: string): string {
  return text.replace(/\n*\*\*In other words:\*\*[\s\S]*$/i, "").trim();
}

function parseDialogue(section: string): ParsedDialogue {
  const heading = section.split("\n", 1)[0] ?? "";
  const topic = heading.replace(/^Socratic dialogue:\s*/i, "").trim();
  const recapMatch = section.match(/\*\*In other words:\*\*\s*([\s\S]+?)$/i);
  const recap = recapMatch?.[1]?.replace(/^\s+|\s+$/g, "").replace(/\n+/g, " ");
  const beats: Beat[] = [];
  const re = /\*\*(Alex|Elena):\*\*\s*([\s\S]*?)(?=\n\*\*(?:Alex|Elena):\*\*|\n\*\*In other words:\*\*|\s*$)/gi;
  for (const match of section.matchAll(re)) {
    const speaker = match[1].toLowerCase() as "alex" | "elena";
    const line = stripRecap(match[2].trim());
    if (line) beats.push({ speaker, line });
  }
  if (beats.length < 2) {
    throw new Error(`Dialogue "${topic}" needs at least 2 beats.`);
  }
  return { topic, beats, recap };
}

function parseDiagramGuide(section: string): DiagramGuide | undefined {
  const summaryMatch = section.match(/\*\*Read the picture:\*\*\s*(.+)/i);
  const steps = [...section.matchAll(/^\d+\.\s+\*\*([A-Z][A-Z0-9_]*)\*\*\s+[—–-]\s+(.+)$/gm)].map(
    (match) => ({
      node: match[1],
      label: match[2].trim(),
    }),
  );
  if (!summaryMatch && steps.length === 0) return undefined;
  return {
    summary: summaryMatch?.[1]?.trim() ?? "",
    steps,
  };
}

export function parseChapter(markdown: string): ParsedChapter {
  const stripped = markdown.replace(/^#\s+.+\n+/, "");
  const sections = splitSections(stripped);
  const art = sections["chapter art"];
  const dialogue = sections["socratic dialogue"];
  const deep = sections["technical deep-dive"];
  const diagramKey = Object.keys(sections).find((key) => key.startsWith("diagram"));
  if (!art || !dialogue || !deep) {
    throw new Error(
      "Chapter markdown must include ## Chapter art, ## Socratic dialogue, and ## Technical deep-dive.",
    );
  }
  const deepDive = `## Technical deep-dive\n\n${deep.replace(/^Technical deep-dive\s*/i, "").trim()}`;
  return {
    comic: parseComic(art),
    dialogue: parseDialogue(dialogue),
    diagramGuide: diagramKey ? parseDiagramGuide(sections[diagramKey]) : undefined,
    deepDive,
  };
}
