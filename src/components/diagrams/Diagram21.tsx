import { diagramGuides, type DiagramGuide } from "../../data/diagramGuides";
import { DiagramFrame, NodeBox } from "./DiagramFrame";

export function Diagram21({ guide }: { guide?: DiagramGuide }) {
  return (
    <DiagramFrame
      id="2.1"
      title="High-Dimensional Representation Vector Mapping & Attention Heads"
      guide={guide ?? diagramGuides["2.1"]}
      legend={[
        { swatch: "#d9e4ee", label: "Tokens / embeddings (EMB)" },
        { swatch: "#f6e3c4", label: "Attention machinery (QKV, HEAD_i, SOFT)" },
        { swatch: "#f4c7c2", label: "Missing executor (GAP)" },
      ]}
    >
      <svg viewBox="0 0 920 540" className="h-auto w-full min-w-[720px]" role="img">
        <title>Tokens become vectors, split across attention heads, then stop at representation with no executor</title>
        <NodeBox x={40} y={40} w={150} h={70} id="TOK" label="Token sequence" fill="#d9e4ee" stroke="#355065" />
        <NodeBox x={230} y={40} w={180} h={70} id="EMB" label="Numbers for each word" tip="EMB: each token becomes a vector x ∈ R^{n×d}" fill="#d9e4ee" stroke="#355065" />
        <NodeBox x={450} y={24} w={120} h={48} id="Q" label="Query" fill="#f6e3c4" stroke="#c9842a" />
        <NodeBox x={450} y={80} w={120} h={48} id="K" label="Key" fill="#f6e3c4" stroke="#c9842a" />
        <NodeBox x={450} y={136} w={120} h={48} id="V" label="Value" fill="#f6e3c4" stroke="#c9842a" />

        <path d="M190 75h40" stroke="#355065" strokeWidth="1.6" />
        <path d="M410 75h40" stroke="#355065" strokeWidth="1.6" />
        <path d="M410 75c20 0 28 20 40 45" fill="none" stroke="#355065" strokeWidth="1.4" />
        <path d="M410 75c20 40 28 70 40 85" fill="none" stroke="#355065" strokeWidth="1.4" />

        <NodeBox x={610} y={40} w={130} h={58} id="HEAD_1" label="Head 1" fill="#f8e1a8" stroke="#c9842a" />
        <NodeBox x={610} y={112} w={130} h={58} id="HEAD_h" label="Head h" fill="#f8e1a8" stroke="#c9842a" />
        <NodeBox x={770} y={76} w={120} h={58} id="SOFT" label="How much to listen" tip="SOFT: softmax(QKᵀ/√d) — attention weights" fill="#f6e3c4" stroke="#8a3a14" />

        <path d="M570 48h40" stroke="#c9842a" strokeWidth="1.5" />
        <path d="M570 160h40v-20" fill="none" stroke="#c9842a" strokeWidth="1.5" />
        <path d="M740 69h30" stroke="#c9842a" strokeWidth="1.5" />
        <path d="M740 141h30v-20" fill="none" stroke="#c9842a" strokeWidth="1.5" />

        <NodeBox x={230} y={230} w={200} h={62} id="CONCAT" label="Stitch the heads back" tip="CONCAT: concat + W_o projection" fill="#d7ecea" stroke="#1f6b68" />
        <NodeBox x={470} y={230} w={220} h={62} id="CTX" label="A map of this prompt" tip="CTX: contextual vectors h ∈ R^{n×d}" fill="#d7ecea" stroke="#1f6b68" />
        <NodeBox x={730} y={230} w={160} h={62} id="LM" label="Guess the next word" tip="LM: next-token logits" fill="#d9e4ee" stroke="#355065" />

        <path d="M830 134v96" stroke="#1f6b68" strokeWidth="1.6" />
        <path d="M430 261h40" stroke="#1f6b68" strokeWidth="1.6" />
        <path d="M690 261h40" stroke="#355065" strokeWidth="1.6" />

        <rect x={40} y={340} width={540} height={160} rx="14" fill="#f7f2ea" stroke="#1f6b68" />
        <text x="58" y="370" className="node-label" fill="#154f4d">
          What the renaissance actually bought
        </text>
        <text x="58" y="396" className="node-id" fill="#4a4036">
          Attention is a soft routing function over vectors, not a program counter.
        </text>
        <text x="58" y="416" className="node-id" fill="#4a4036">
          HEAD_1 .. HEAD_h specialize subspaces; CONCAT mixes them back.
        </text>
        <text x="58" y="436" className="node-id" fill="#4a4036">
          CTX is a high-dimensional map of the prompt, not a store of world facts.
        </text>
        <text x="58" y="468" className="node-id" fill="#1f6b68">
          Intelligence here means better geometry, not a runtime.
        </text>

        <NodeBox x={610} y={360} w={280} h={120} id="GAP" label="No executor, no tools, no world write" fill="#f4c7c2" stroke="#b42318" round={14} />
        <text x="628" y="430" className="node-id" fill="#b42318">
          LM stops at text. Action is still a human's job.
        </text>
      </svg>
    </DiagramFrame>
  );
}
