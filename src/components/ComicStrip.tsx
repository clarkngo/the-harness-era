import { PanelTop } from "lucide-react";
import {
  AlexBust,
  AlexFigure,
  ElenaFigure,
  MachineFigure,
  SceneProp,
  type PropKind,
} from "./Characters";

export type Speaker = "alex" | "elena" | "narrator" | "system";

export type ComicPanel = {
  scene: string;
  speaker?: Speaker;
  line?: string;
  caption: string;
};

function pickProp(panel: ComicPanel): PropKind | null {
  if (panel.speaker === "system") return null;
  const hay = `${panel.scene} ${panel.line ?? ""}`.toLowerCase();
  if (/whiteboard|draws|marker|dashed|2\^m|copper frame|box around|halt/.test(hay)) return "whiteboard";
  if (/terminal|basement|1987/.test(hay)) return "terminal";
  if (/yaml|wrapper|adapter|filesystem|plugs into/.test(hay)) return "cables";
  if (panel.speaker === "elena") return "whiteboard";
  return "laptop";
}

function machineLabel(line?: string) {
  if (!line) return "SYS";
  const token = line.match(/^[A-Z0-9][A-Z0-9:/_-]*(?:[ _][A-Z0-9:/_-]+){0,3}/);
  return (token?.[0] ?? "SYS").slice(0, 18);
}

function Actor({ panel }: { panel: ComicPanel }) {
  if (panel.speaker === "elena") return <ElenaFigure className="h-[9.5rem] w-auto" />;
  if (panel.speaker === "alex") return <AlexFigure className="h-[9.5rem] w-auto" />;
  if (panel.speaker === "system") {
    return <MachineFigure className="h-[8.4rem] w-auto" screen={machineLabel(panel.line)} />;
  }
  return <AlexBust className="h-16 w-16" />;
}

export function ComicStrip({
  title,
  panels,
}: {
  title: string;
  panels: ComicPanel[];
}) {
  return (
    <figure className="my-10">
      <figcaption className="mb-3 flex items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-copper-deep">
            <PanelTop className="h-3.5 w-3.5" />
            Chapter art
          </p>
          <h3 className="font-display text-2xl text-ink">{title}</h3>
        </div>
        <p className="hidden font-sans text-xs text-ink-soft sm:block">{`${panels.length}-panel strip`}</p>
      </figcaption>
      <div className="comic-page">
        {panels.map((panel, index) => {
          const prop = pickProp(panel);
          const fromRight = panel.speaker !== "system";
          return (
            <article key={`${panel.caption}-${index}`} className="comic-panel">
              <div className="comic-stage">
                <span className="comic-loc">{panel.scene}</span>
                {panel.line ? (
                  <div className={`comic-balloon ${fromRight ? "from-right" : "from-left"}`}>
                    <p>{panel.line}</p>
                  </div>
                ) : null}
                {prop ? (
                  <div className="comic-prop" aria-hidden="true">
                    <SceneProp kind={prop} />
                  </div>
                ) : null}
                <div className={`comic-actor ${fromRight ? "actor-right" : "actor-left"}`}>
                  <Actor panel={panel} />
                </div>
              </div>
              <p className="comic-caption">{panel.caption}</p>
            </article>
          );
        })}
      </div>
    </figure>
  );
}
