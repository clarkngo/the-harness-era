import { diagramGuides, type DiagramGuide } from "../../data/diagramGuides";
import { DiagramFrame, NodeBox } from "./DiagramFrame";

export function Diagram11({ guide }: { guide?: DiagramGuide }) {
  return (
    <DiagramFrame
      id="1.1"
      title="Decision Tree vs. Rule Engine State Explosion"
      guide={guide ?? diagramGuides["1.1"]}
      legend={[
        { swatch: "#d7ecea", label: "Bounded tree (T_*)" },
        { swatch: "#f6d6c8", label: "Working memory / rules (R_*)" },
        { swatch: "#f4c7c2", label: "Unmodeled case (R_FAIL)" },
      ]}
    >
      <svg viewBox="0 0 920 520" className="h-auto w-full min-w-[720px]" role="img">
        <title>A shallow decision tree on the left versus an exploding rule-engine state space on the right</title>
        <text x="40" y="28" className="node-label" fill="#154f4d">
          Bounded decision tree
        </text>
        <text x="500" y="28" className="node-label" fill="#8a3a14">
          Rule engine with M predicates
        </text>

        <NodeBox x={160} y={50} w={150} h={52} id="T_ROOT" label="Symptom present?" fill="#d7ecea" stroke="#1f6b68" />
        <NodeBox x={70} y={150} w={140} h={52} id="T_FEVER" label="Fever > 38°C?" fill="#d7ecea" stroke="#1f6b68" />
        <NodeBox x={260} y={150} w={150} h={52} id="T_BIRD" label="Bird exposure?" fill="#d7ecea" stroke="#1f6b68" />
        <NodeBox x={150} y={260} w={170} h={52} id="T_LEAF" label="Emit treatment" fill="#cfe3c8" stroke="#2f6f3e" />

        <path d="M235 102v48" stroke="#1f6b68" strokeWidth="1.6" markerEnd="url(#arrow)" />
        <path d="M200 102c-50 18-70 30-70 48" fill="none" stroke="#1f6b68" strokeWidth="1.6" />
        <path d="M270 102c50 18 70 30 70 48" fill="none" stroke="#1f6b68" strokeWidth="1.6" />
        <path d="M140 202v58h50" fill="none" stroke="#1f6b68" strokeWidth="1.6" />
        <path d="M335 202v28c0 30-20 30-40 30" fill="none" stroke="#1f6b68" strokeWidth="1.6" />

        <NodeBox x={500} y={50} w={170} h={52} id="R_KB" label="Knowledge base, N rules" fill="#f6d6c8" stroke="#8a3a14" />
        <NodeBox x={720} y={50} w={170} h={52} id="R_FACTS" label="Fact vector, M bits" fill="#f6d6c8" stroke="#8a3a14" />
        <NodeBox x={610} y={150} w={180} h={52} id="R_WM" label="Working memory match" fill="#f6d6c8" stroke="#8a3a14" />
        <NodeBox x={500} y={260} w={190} h={58} id="R_COMB" label="|States| ≈ 2^M" fill="#f8e1a8" stroke="#c9842a" />
        <NodeBox x={720} y={260} w={170} h={58} id="R_FAIL" label="No rule fires / clash" fill="#f4c7c2" stroke="#b42318" />

        <path d="M585 102v48h40" fill="none" stroke="#8a3a14" strokeWidth="1.6" />
        <path d="M805 102v48h-40" fill="none" stroke="#8a3a14" strokeWidth="1.6" />
        <path d="M700 202v58" stroke="#c9842a" strokeWidth="1.6" />
        <path d="M790 202v58" stroke="#b42318" strokeWidth="1.6" />

        <rect x={40} y={360} width={400} height={130} rx="14" fill="#f7f2ea" stroke="#1f6b68" />
        <text x="58" y="388" className="node-label" fill="#154f4d">
          Tree growth is local
        </text>
        <text x="58" y="412" className="node-id" fill="#4a4036">
          Adding a predicate adds a branch, not a universe.
        </text>
        <text x="58" y="432" className="node-id" fill="#4a4036">
          Unseen combinations fall off the leaf set.
        </text>
        <text x="58" y="462" className="node-id" fill="#1f6b68">
          Adaptability: zero. Coverage: whatever you drew.
        </text>

        <rect x={470} y={360} width={420} height={130} rx="14" fill="#fbf1ea" stroke="#8a3a14" />
        <text x="488" y="388" className="node-label" fill="#8a3a14">
          Rule growth is combinatorial
        </text>
        <text x="488" y="412" className="node-id" fill="#4a4036">
          Each new predicate doubles the reachable working-memory states.
        </text>
        <text x="488" y="432" className="node-id" fill="#4a4036">
          Overlapping rules create contradictions instead of learning.
        </text>
        <text x="488" y="462" className="node-id" fill="#b42318">
          R_FAIL is not an exception. It is the default for novelty.
        </text>

        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="#1f6b68" />
          </marker>
        </defs>
      </svg>
    </DiagramFrame>
  );
}
