import { diagramGuides, type DiagramGuide } from "../../data/diagramGuides";
import { DiagramFrame, NodeBox } from "./DiagramFrame";

export function Diagram61({ guide }: { guide?: DiagramGuide }) {
  return (
    <DiagramFrame
      id="6.1"
      title="Model Context Protocol (MCP) Client-Host-Server Topology"
      guide={guide ?? diagramGuides["6.1"]}
      legend={[
        { swatch: "#f6e3c4", label: "Host / model" },
        { swatch: "#d9e4ee", label: "MCP client" },
        { swatch: "#d7ecea", label: "MCP servers (tool providers)" },
      ]}
    >
      <svg viewBox="0 0 920 520" className="h-auto w-full min-w-[720px]" role="img">
        <title>MCP host wrapping a model, a client, and multiple tool servers</title>
        <rect x="40" y="40" width="840" height="200" rx="20" fill="#fff8ef" stroke="#c45c26" strokeWidth="2" />
        <text x="60" y="70" className="node-label" fill="#8a3a14">
          MCP HOST · the application that owns the session
        </text>
        <NodeBox x={70} y={100} w={220} h={90} id="MODEL" label="Weights / chat runtime" fill="#f6e3c4" stroke="#c9842a" />
        <NodeBox x={350} y={100} w={240} h={90} id="CLIENT" label="MCP client (1:N servers)" fill="#d9e4ee" stroke="#355065" />
        <NodeBox x={640} y={100} w={200} h={90} id="POLICY" label="Consent, scopes, UX" fill="#f8e1a8" stroke="#8a3a14" />
        <path d="M290 145h60" stroke="#c9842a" strokeWidth="1.7" />
        <path d="M590 145h50" stroke="#355065" strokeWidth="1.7" />

        <text x="40" y="280" className="node-label" fill="#154f4d">
          MCP SERVERS · tool providers, reusable across hosts
        </text>
        <NodeBox x={40} y={300} w={250} h={90} id="SERVER_A" label="stdio · filesystem" fill="#d7ecea" stroke="#1f6b68" />
        <NodeBox x={335} y={300} w={250} h={90} id="SERVER_B" label="SSE · SaaS / browser" fill="#d7ecea" stroke="#1f6b68" />
        <NodeBox x={630} y={300} w={250} h={90} id="SERVER_C" label="HTTP · internal APIs" fill="#d7ecea" stroke="#1f6b68" />

        <path d="M470 190v110" stroke="#355065" strokeWidth="1.7" />
        <path d="M165 300v-40h305" fill="none" stroke="#1f6b68" strokeWidth="1.5" />
        <path d="M755 300v-40h-285" fill="none" stroke="#1f6b68" strokeWidth="1.5" />

        <text x="40" y="430" className="node-id" fill="#4a4036">
          Transport is not the product. The product is a shared schema for tools, resources, and prompts.
        </text>
        <text x="40" y="454" className="node-id" fill="#4a4036">
          HOST speaks MODEL. CLIENT speaks SERVER_*. Neither hard-codes the other's vendor dialect.
        </text>
        <text x="40" y="488" className="node-id" fill="#8a3a14">
          Fragmentation moves from adapters in app code to optional servers at the edge.
        </text>
      </svg>
    </DiagramFrame>
  );
}
