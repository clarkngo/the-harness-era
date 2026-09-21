import { diagramGuides, type DiagramGuide } from "../../data/diagramGuides";
import { DiagramFrame, NodeBox } from "./DiagramFrame";

export function Diagram81({ guide }: { guide?: DiagramGuide }) {
  return (
    <DiagramFrame
      id="8.1"
      title="Dual-Layer Verification Flow"
      guide={guide ?? diagramGuides["8.1"]}
      legend={[
        { swatch: "#d9e4ee", label: "Deterministic gate (LINT)" },
        { swatch: "#f6e3c4", label: "Non-deterministic sensor (JUDGE)" },
        { swatch: "#cfe3c8", label: "Accept" },
        { swatch: "#f4c7c2", label: "Reject / escalate" },
      ]}
    >
      <svg viewBox="0 0 920 520" className="h-auto w-full min-w-[720px]" role="img">
        <title>A patch passing a deterministic linter gate then a non-deterministic LLM judge</title>
        <NodeBox x={40} y={40} w={200} h={70} id="PATCH" label="Proposed change" fill="#eee7dc" stroke="#4a4036" />
        <NodeBox x={300} y={40} w={280} h={70} id="LINT" label="Types, tests, static analysis" fill="#d9e4ee" stroke="#355065" />
        <NodeBox x={640} y={20} w={240} h={50} id="FAIL_D" label="Deterministic reject" fill="#f4c7c2" stroke="#b42318" />
        <NodeBox x={300} y={180} w={280} h={80} id="JUDGE" label="LLM-as-judge / rubric" fill="#f6e3c4" stroke="#c9842a" />
        <NodeBox x={640} y={160} w={240} h={50} id="FAIL_N" label="Sensor reject / retry" fill="#f8e1a8" stroke="#8a3a14" />
        <NodeBox x={300} y={330} w={280} h={70} id="MERGE" label="Accept into runtime" fill="#cfe3c8" stroke="#2f6f3e" />
        <NodeBox x={640} y={320} w={240} h={80} id="HUMAN" label="Escalation plane" fill="#f4c7c2" stroke="#b42318" />

        <path d="M240 75h60" stroke="#355065" strokeWidth="1.7" />
        <path d="M580 55h60" stroke="#b42318" strokeWidth="1.7" />
        <path d="M440 110v70" stroke="#c9842a" strokeWidth="1.7" />
        <path d="M580 210h60" stroke="#c9842a" strokeWidth="1.7" />
        <path d="M440 260v70" stroke="#2f6f3e" strokeWidth="1.7" />
        <path d="M760 210v110" stroke="#b42318" strokeWidth="1.6" />
        <path d="M760 70v90" stroke="#b42318" strokeWidth="1.4" strokeDasharray="5 5" />

        <text x="40" y="150" className="node-id" fill="#355065">
          Layer A · cheap, repeatable, no vibes
        </text>
        <text x="40" y="290" className="node-id" fill="#c9842a">
          Layer B · expensive, fuzzy, catches what types cannot
        </text>
        <text x="40" y="440" className="node-id" fill="#4a4036">
          Prompt-only safety skips LINT and pretends JUDGE is a compiler.
        </text>
        <text x="40" y="464" className="node-id" fill="#8a3a14">
          Harness engineering is the order: LINT first, JUDGE second, HUMAN last.
        </text>
        <text x="40" y="498" className="node-id" fill="#b42318">
          Never invert the layers. A kind model cannot un-delete production.
        </text>
      </svg>
    </DiagramFrame>
  );
}
