import { diagramGuides, type DiagramGuide } from "../../data/diagramGuides";
import { DiagramFrame, NodeBox } from "./DiagramFrame";

export function Diagram71({ guide }: { guide?: DiagramGuide }) {
  return (
    <DiagramFrame
      id="7.1"
      title="Agent Harness Runtime Architecture"
      guide={guide ?? diagramGuides["7.1"]}
      legend={[
        { swatch: "#f6e3c4", label: "Model" },
        { swatch: "#d9e4ee", label: "Control plane" },
        { swatch: "#d7ecea", label: "Execution / world" },
        { swatch: "#f4c7c2", label: "Safety" },
      ]}
    >
      <svg viewBox="0 0 920 560" className="h-auto w-full min-w-[720px]" role="img">
        <title>Harness wrapping a model with state, compression, sandbox, tools, and circuit breakers</title>
        <rect x="30" y="30" width="860" height="500" rx="24" fill="#fff8ef" stroke="#c45c26" strokeWidth="2.4" />
        <text x="52" y="62" className="node-label" fill="#8a3a14">
          HARNESS · runtime OS around the neural network
        </text>

        <NodeBox x={60} y={90} w={200} h={80} id="MODEL" label="Weights + sampler" fill="#f6e3c4" stroke="#c9842a" />
        <NodeBox x={300} y={90} w={200} h={80} id="LOOP" label="Loop controller" fill="#d9e4ee" stroke="#355065" />
        <NodeBox x={540} y={90} w={150} h={80} id="BRK" label="Circuit breakers" fill="#f4c7c2" stroke="#b42318" />
        <NodeBox x={720} y={90} w={140} h={80} id="POLICY" label="Permissions" fill="#f4c7c2" stroke="#b42318" />

        <NodeBox x={60} y={220} w={240} h={90} id="STATE" label="State engine / traces" fill="#d9e4ee" stroke="#355065" />
        <NodeBox x={340} y={220} w={240} h={90} id="CTX" label="Context compression" fill="#d9e4ee" stroke="#355065" />
        <NodeBox x={620} y={220} w={240} h={90} id="TOOLS" label="Tool bus / MCP" fill="#d7ecea" stroke="#1f6b68" />

        <NodeBox x={60} y={360} w={380} h={90} id="SAND" label="Ephemeral container sandbox" fill="#d7ecea" stroke="#1f6b68" />
        <NodeBox x={480} y={360} w={380} h={90} id="WORLD" label="Repos, tickets, browsers, prod*" fill="#cfe3c8" stroke="#2f6f3e" />

        <path d="M260 130h40" stroke="#355065" strokeWidth="1.6" />
        <path d="M500 130h40" stroke="#b42318" strokeWidth="1.6" />
        <path d="M690 130h30" stroke="#b42318" strokeWidth="1.6" />
        <path d="M160 170v50" stroke="#355065" strokeWidth="1.6" />
        <path d="M400 170v50" stroke="#355065" strokeWidth="1.6" />
        <path d="M740 170v50" stroke="#1f6b68" strokeWidth="1.6" />
        <path d="M250 310v50" stroke="#1f6b68" strokeWidth="1.6" />
        <path d="M740 310v50" stroke="#1f6b68" strokeWidth="1.6" />
        <path d="M440 405h40" stroke="#2f6f3e" strokeWidth="1.6" />

        <text x="60" y="490" className="node-id" fill="#4a4036">
          Agent = MODEL + (STATE + CTX + SAND + TOOLS + LOOP + BRK + POLICY)
        </text>
        <text x="60" y="512" className="node-id" fill="#8a3a14">
          * WORLD is reachable only through SAND and POLICY. That is the whole plot.
        </text>
      </svg>
    </DiagramFrame>
  );
}
