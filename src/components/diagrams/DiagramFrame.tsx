import { createContext, useContext, useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Maximize2, Workflow, X } from "lucide-react";
import type { DiagramGuide } from "../../data/diagramGuides";

const FocusContext = createContext("");

export function DiagramFrame({
  id,
  title,
  children,
  legend,
  guide,
}: {
  id: string;
  title: string;
  children: ReactNode;
  legend?: { swatch: string; label: string }[];
  guide?: DiagramGuide;
}) {
  const [focus, setFocus] = useState(guide?.steps[0]?.node ?? "");
  const [expanded, setExpanded] = useState(false);
  const titleId = useId();

  function focusNode(node: string) {
    setFocus(node);
  }

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  const figure = (
    <figure className={`diagram-guide ${expanded ? "is-expanded my-0" : "my-10"}`} data-focus={focus}>
      <figcaption className={`mb-3 ${expanded ? "flex flex-wrap items-start justify-between gap-3" : ""}`}>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-steel">
            <Workflow className="h-3.5 w-3.5" />
            Diagram {id}
          </p>
          <h3 id={titleId} className="font-display text-2xl text-ink">
            {title}
          </h3>
          {guide ? (
            <p className="mt-2 max-w-3xl font-serif text-[1.05rem] leading-7 text-ink-soft">{guide.summary}</p>
          ) : null}
        </div>
        {!expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-rule bg-white px-3 py-1.5 font-sans text-xs font-semibold text-ink hover:border-copper"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            View large
          </button>
        ) : null}
      </figcaption>
      <FocusContext.Provider value={focus}>
        <div
          className="relative overflow-x-auto rounded-[1.3rem] border border-rule diagram-plate p-3 shadow-[0_12px_40px_rgba(28,22,18,0.08)]"
          onClick={(event) => {
            const raw = event.target as EventTarget | null;
            const el = raw instanceof Element ? raw : raw instanceof Node ? raw.parentElement : null;
            const idAttr = el?.closest("[data-node]")?.getAttribute("data-node");
            if (idAttr) focusNode(idAttr);
          }}
        >
          {children}
          {!expanded ? (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-label="View diagram large"
              className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-rule bg-white/95 px-2.5 py-1 font-sans text-[11px] font-semibold text-ink shadow-sm hover:border-copper"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              Large
            </button>
          ) : null}
        </div>
      </FocusContext.Provider>
      {legend ? (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-sans text-xs text-ink-soft">
          {legend.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: item.swatch }} />
              {item.label}
            </li>
          ))}
        </ul>
      ) : null}
      {guide ? (
        <ol className={`mt-4 grid gap-2 ${expanded ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2"}`}>
          {guide.steps.map((step, index) => {
            const active = focus === step.node;
            return (
              <li key={step.node}>
                <button
                  type="button"
                  onClick={() => focusNode(step.node)}
                  aria-pressed={active}
                  className={`flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                    active
                      ? "border-copper bg-white shadow-[0_6px_16px_rgba(28,22,18,0.08)]"
                      : "border-rule bg-paper-3 hover:border-copper/50"
                  }`}
                >
                  <span className="mt-0.5 font-mono text-xs text-copper-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-mono text-[11px] text-steel">{step.node}</span>
                    <span className="mt-0.5 block font-sans text-sm leading-5 text-ink">{step.label}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      ) : null}
      <p className="mt-3 hidden font-sans text-xs text-ink-soft sm:block">
        {expanded
          ? "Click a step — or a box — to highlight it. Press Esc or Close to return."
          : "Click a step — or a box in the picture — to highlight it. Hover a box for a short tooltip."}
      </p>
    </figure>
  );

  if (expanded && typeof document !== "undefined") {
    return (
      <>
        <div className="my-10 rounded-[1.3rem] border border-dashed border-rule bg-paper-3 px-5 py-6 text-center">
          <p className="font-sans text-sm text-ink-soft">Diagram {id} is open in large view.</p>
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="mt-2 font-sans text-sm font-semibold text-copper-deep underline-offset-2 hover:underline"
          >
            Return to chapter
          </button>
        </div>
        {createPortal(
          <div
            className="diagram-lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={() => setExpanded(false)}
          >
            <div className="diagram-lightbox-panel" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-rule bg-white px-3 py-1.5 font-sans text-xs font-semibold text-ink hover:border-copper"
              >
                <X className="h-3.5 w-3.5" />
                Close
              </button>
              {figure}
            </div>
          </div>,
          document.body,
        )}
      </>
    );
  }

  return figure;
}

function useNodeState(id: string) {
  const focus = useContext(FocusContext);
  const dimmed = Boolean(focus) && focus !== id;
  const active = focus === id;
  return { dimmed, active };
}

export function DiagramHit({
  id,
  tip,
  children,
}: {
  id: string;
  tip?: string;
  children: ReactNode;
}) {
  const { dimmed, active } = useNodeState(id);
  return (
    <g
      data-node={id}
      className={`diagram-node cursor-pointer ${dimmed ? "is-dim" : ""} ${active ? "is-active" : ""}`}
    >
      {tip ? <title>{tip}</title> : null}
      {children}
    </g>
  );
}

export function NodeBox({
  x,
  y,
  w,
  h,
  id,
  label,
  fill,
  stroke,
  round = 10,
  tip,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
  label: string;
  fill: string;
  stroke: string;
  round?: number;
  tip?: string;
}) {
  return (
    <DiagramHit id={id} tip={tip ?? `${id}: ${label}`}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={round}
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
        className="diagram-node-rect"
      />
      <text x={x + 10} y={y + 16} className="node-id" fill={stroke}>
        {id}
      </text>
      <text x={x + 10} y={y + 34} className="node-label" fill="#1c1612">
        {label}
      </text>
    </DiagramHit>
  );
}
