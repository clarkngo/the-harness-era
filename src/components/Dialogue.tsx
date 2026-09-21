import type { ReactNode } from "react";
import { MessagesSquare } from "lucide-react";
import { AlexBust, ElenaBust } from "./Characters";

export type Beat = {
  speaker: "alex" | "elena";
  line: string;
};

function renderLine(line: string): ReactNode {
  const parts = line.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return <span key={index}>{part}</span>;
  });
}

export function Dialogue({
  topic,
  beats,
  recap,
}: {
  topic: string;
  beats: Beat[];
  recap?: string;
}) {
  return (
    <section className="my-10 overflow-hidden rounded-[1.4rem] border border-rule bg-paper-3">
      <header className="flex items-center justify-between gap-3 border-b border-rule px-5 py-3">
        <div>
          <p className="flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-patina">
            <MessagesSquare className="h-3.5 w-3.5" />
            Socratic dialogue
          </p>
          <h3 className="font-display text-xl text-ink">{topic}</h3>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="rounded-full bg-alex/15 px-2 py-1 font-sans text-[11px] font-semibold text-copper-deep">
            Alex · junior
          </span>
          <span className="rounded-full bg-elena/15 px-2 py-1 font-sans text-[11px] font-semibold text-patina-2">
            Elena · architect
          </span>
        </div>
      </header>
      <ol className="divide-y divide-rule">
        {beats.map((beat, index) => {
          const isAlex = beat.speaker === "alex";
          return (
            <li
              key={`${beat.speaker}-${index}`}
              className={`flex gap-4 px-5 py-4 ${isAlex ? "bg-transparent" : "bg-elena/5"}`}
            >
              <div className="shrink-0">
                {isAlex ? <AlexBust className="h-12 w-12" /> : <ElenaBust className="h-12 w-12" />}
              </div>
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                  {isAlex ? "Alex" : "Elena"}
                </p>
                <p className="mt-1 font-serif text-[1.05rem] leading-7 text-ink">
                  {renderLine(beat.line)}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      {recap ? (
        <footer className="border-t border-rule bg-white px-5 py-4">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-copper-deep">
            In other words
          </p>
          <p className="mt-1 font-serif text-[1.05rem] leading-7 text-ink">{recap}</p>
        </footer>
      ) : null}
    </section>
  );
}
