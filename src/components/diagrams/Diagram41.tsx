import { diagramGuides, type DiagramGuide } from "../../data/diagramGuides";
import { DiagramFrame, NodeBox } from "./DiagramFrame";

export function Diagram41({ guide }: { guide?: DiagramGuide }) {
  return (
    <DiagramFrame
      id="4.1"
      title="ReAct Execution Loop (Thought → Action → Observation)"
      guide={guide ?? diagramGuides["4.1"]}
      legend={[
        { swatch: "#f6e3c4", label: "Model-side (THOUGHT, STOP)" },
        { swatch: "#d9e4ee", label: "Interface (ACTION)" },
        { swatch: "#d7ecea", label: "World / tool (TOOL, OBS)" },
      ]}
    >
      <svg viewBox="0 0 920 500" className="h-auto w-full min-w-[720px]" role="img">
        <title>ReAct loop cycling thought, action, tool, and observation until stop</title>
        <NodeBox x={80} y={40} w={200} h={70} id="GOAL" label="User task" fill="#d9e4ee" stroke="#355065" />
        <NodeBox x={360} y={40} w={220} h={70} id="THOUGHT" label="Reason about next step" fill="#f6e3c4" stroke="#c9842a" />
        <NodeBox x={660} y={40} w={200} h={70} id="ACTION" label="Structured tool call" fill="#d9e4ee" stroke="#355065" />
        <NodeBox x={660} y={200} w={200} h={80} id="TOOL" label="Search / code / API" fill="#d7ecea" stroke="#1f6b68" />
        <NodeBox x={360} y={200} w={220} h={80} id="OBS" label="Observation text in CTX" fill="#d7ecea" stroke="#1f6b68" />
        <NodeBox x={360} y={360} w={220} h={70} id="STOP" label="Final answer" fill="#cfe3c8" stroke="#2f6f3e" />
        <NodeBox x={80} y={200} w={200} h={80} id="LOOP" label="Trace appends; repeat" fill="#f8e1a8" stroke="#8a3a14" />

        <path d="M280 75h80" stroke="#355065" strokeWidth="1.7" />
        <path d="M580 75h80" stroke="#c9842a" strokeWidth="1.7" />
        <path d="M760 110v90" stroke="#355065" strokeWidth="1.7" />
        <path d="M660 240h-80" stroke="#1f6b68" strokeWidth="1.7" />
        <path d="M360 240h-80" stroke="#1f6b68" strokeWidth="1.7" />
        <path d="M180 200v-90" stroke="#8a3a14" strokeWidth="1.7" />
        <path d="M470 280v80" stroke="#2f6f3e" strokeWidth="1.7" strokeDasharray="6 5" />
        <text x="490" y="330" className="node-id" fill="#2f6f3e">
          halt predicate
        </text>
        <text x="80" y="430" className="node-id" fill="#4a4036">
          Thought is private scratch. Action is the only thing the world can hear.
        </text>
        <text x="80" y="450" className="node-id" fill="#4a4036">
          Without a halt predicate, LOOP is a furnace. Chapter 5 lights it.
        </text>
      </svg>
    </DiagramFrame>
  );
}
