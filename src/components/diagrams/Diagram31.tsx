import { diagramGuides, type DiagramGuide } from "../../data/diagramGuides";
import { DiagramFrame, NodeBox } from "./DiagramFrame";

export function Diagram31({ guide }: { guide?: DiagramGuide }) {
  return (
    <DiagramFrame
      id="3.1"
      title='The "Completion Box" Topology (Stateless Boundary vs. World State)'
      guide={guide ?? diagramGuides["3.1"]}
      legend={[
        { swatch: "#f6e3c4", label: "Inside the box (ephemeral)" },
        { swatch: "#d7ecea", label: "World state (outside)" },
        { swatch: "#f4c7c2", label: "Missing write-back (GAP)" },
      ]}
    >
      <svg viewBox="0 0 920 540" className="h-auto w-full min-w-[720px]" role="img">
        <title>A prompt enters a stateless completion box that cannot write back to the world</title>
        <NodeBox x={40} y={220} w={140} h={70} id="USER" label="Prompt in" fill="#d9e4ee" stroke="#355065" />

        <rect x="210" y="70" width="430" height="380" rx="22" fill="#fff8ef" stroke="#c45c26" strokeWidth="2.4" />
        <text x="230" y="100" className="node-label" fill="#8a3a14">
          COMPLETION BOX · stateless product boundary
        </text>

        <NodeBox x={250} y={130} w={350} h={70} id="CTX" label="Whiteboard, not a filing cabinet" tip="CTX: context window = volatile RAM" fill="#f6e3c4" stroke="#c9842a" />
        <NodeBox x={250} y={230} w={350} h={70} id="BOX" label="Guess the next word, over and over" tip="BOX: p(next token | prefix)" fill="#f8e1a8" stroke="#8a3a14" />
        <NodeBox x={250} y={330} w={350} h={70} id="OUT" label="Completion text out" fill="#f6e3c4" stroke="#c9842a" />

        <path d="M180 255h70" stroke="#355065" strokeWidth="1.8" />
        <path d="M425 200v30" stroke="#c9842a" strokeWidth="1.6" />
        <path d="M425 300v30" stroke="#c9842a" strokeWidth="1.6" />

        <NodeBox x={690} y={90} w={200} h={80} id="WORLD" label="Files, APIs, calendars, prod" fill="#d7ecea" stroke="#1f6b68" />
        <NodeBox x={690} y={210} w={200} h={80} id="MEM" label="Persistent memory (absent)" fill="#eee7dc" stroke="#4a4036" />
        <NodeBox x={690} y={340} w={200} h={90} id="GAP" label="No write-back arrow" fill="#f4c7c2" stroke="#b42318" />

        <path d="M640 365h50" stroke="#b42318" strokeWidth="2" strokeDasharray="6 6" />
        <text x="640" y="400" className="node-id" fill="#b42318">
          dashed = missing edge
        </text>
        <path d="M640 170h50" stroke="#1f6b68" strokeWidth="1.5" strokeDasharray="5 5" />
        <text x="640" y="160" className="node-id" fill="#1f6b68">
          world is readable only if pasted
        </text>

        <text x="230" y="430" className="node-id" fill="#8a3a14">
          Session ends → CTX evaporates. BOX cannot keep a promise.
        </text>
      </svg>
    </DiagramFrame>
  );
}
