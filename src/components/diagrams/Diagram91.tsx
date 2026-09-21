import { diagramGuides, type DiagramGuide } from "../../data/diagramGuides";
import { DiagramFrame, DiagramHit, NodeBox } from "./DiagramFrame";

export function Diagram91({ guide }: { guide?: DiagramGuide }) {
  return (
    <DiagramFrame
      id="9.1"
      title="Enterprise Multi-Agent Microservice Harness Hierarchy"
      guide={guide ?? diagramGuides["9.1"]}
      legend={[
        { swatch: "#f6e3c4", label: "Orchestration" },
        { swatch: "#d7ecea", label: "Specialist harnesses" },
        { swatch: "#d9e4ee", label: "Control / audit" },
        { swatch: "#f4c7c2", label: "Security boundary" },
      ]}
    >
      <svg viewBox="0 0 920 560" className="h-auto w-full min-w-[720px]" role="img">
        <title>Orchestrator harness over specialist agents, a bus, security boundary, and human accountability</title>
        <NodeBox x={40} y={30} w={260} h={70} id="HUMAN" label="Accountability plane" fill="#f4c7c2" stroke="#b42318" />
        <NodeBox x={330} y={30} w={260} h={70} id="ORCH" label="Orchestrator harness" fill="#f6e3c4" stroke="#c9842a" />
        <NodeBox x={620} y={30} w={260} h={70} id="AUDIT" label="Audit / traces / spend" fill="#d9e4ee" stroke="#355065" />

        <path d="M300 65h30" stroke="#b42318" strokeWidth="1.6" />
        <path d="M590 65h30" stroke="#355065" strokeWidth="1.6" />

        <DiagramHit id="BUS" tip="BUS: typed events and contracts, not vibes">
          <rect x="40" y="130" width="840" height="70" rx="14" fill="#d9e4ee" stroke="#355065" className="diagram-node-rect" />
          <text x="58" y="158" className="node-id" fill="#355065">
            BUS
          </text>
          <text x="58" y="180" className="node-label" fill="#1c1612">
            Event / message bus · contracts, not vibes
          </text>
        </DiagramHit>

        <path d="M460 100v30" stroke="#c9842a" strokeWidth="1.6" />

        <NodeBox x={40} y={230} w={250} h={90} id="A1" label="Code harness + sandbox" fill="#d7ecea" stroke="#1f6b68" />
        <NodeBox x={335} y={230} w={250} h={90} id="A2" label="Research harness + RAG" fill="#d7ecea" stroke="#1f6b68" />
        <NodeBox x={630} y={230} w={250} h={90} id="A3" label="Ops harness + runbooks" fill="#d7ecea" stroke="#1f6b68" />

        <path d="M165 200v30" stroke="#1f6b68" strokeWidth="1.5" />
        <path d="M460 200v30" stroke="#1f6b68" strokeWidth="1.5" />
        <path d="M755 200v30" stroke="#1f6b68" strokeWidth="1.5" />

        <DiagramHit id="SEC" tip="SEC: identity, egress, secrets, blast radius per harness">
          <rect x="40" y="350" width="840" height="90" rx="16" fill="#f4c7c2" stroke="#b42318" strokeDasharray="7 5" className="diagram-node-rect" />
          <text x="58" y="384" className="node-id" fill="#b42318">
            SEC
          </text>
          <text x="58" y="410" className="node-label" fill="#1c1612">
            Security boundary · identity, egress, secrets, blast radius per harness
          </text>
        </DiagramHit>

        <text x="40" y="480" className="node-id" fill="#4a4036">
          Swarm-without-SEC is a lateral-movement product. Hierarchy-without-HUMAN is a scapegoat generator.
        </text>
        <text x="40" y="504" className="node-id" fill="#8a3a14">
          Each A_* is a microservice with its own MODEL, STATE, SAND, and BRK — not a prompt with a name.
        </text>
        <text x="40" y="538" className="node-id" fill="#b42318">
          ORCH may delegate work. It may not delegate liability.
        </text>
      </svg>
    </DiagramFrame>
  );
}
