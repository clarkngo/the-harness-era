import { diagramGuides, type DiagramGuide } from "../../data/diagramGuides";
import { DiagramFrame, NodeBox } from "./DiagramFrame";

export function Diagram51({ guide }: { guide?: DiagramGuide }) {
  return (
    <DiagramFrame
      id="5.1"
      title="The Unconstrained Recursion Sink (Infinite Loop Token Burn)"
      guide={guide ?? diagramGuides["5.1"]}
      legend={[
        { swatch: "#f6e3c4", label: "Agent roles" },
        { swatch: "#f4c7c2", label: "Sink / cost" },
        { swatch: "#cfe3c8", label: "Missing halt (would live here)" },
      ]}
    >
      <svg viewBox="0 0 920 520" className="h-auto w-full min-w-[720px]" role="img">
        <title>Planner, executor, and critic cycle with no halt into a token-burn sink</title>
        <NodeBox x={360} y={20} w={200} h={60} id="GOAL" label="User goal (vague)" fill="#d9e4ee" stroke="#355065" />
        <NodeBox x={80} y={140} w={200} h={70} id="PLAN" label="Planner: more steps" fill="#f6e3c4" stroke="#c9842a" />
        <NodeBox x={360} y={140} w={200} h={70} id="EXEC" label="Executor: try something" fill="#f6e3c4" stroke="#c9842a" />
        <NodeBox x={640} y={140} w={200} h={70} id="CRITIC" label="Critic: not done yet" fill="#f6e3c4" stroke="#c9842a" />
        <NodeBox x={360} y={280} w={200} h={70} id="REPLAN" label="Replan from scratch" fill="#f8e1a8" stroke="#8a3a14" />
        <NodeBox x={80} y={390} w={280} h={80} id="SINK" label="Unconstrained recursion" fill="#f4c7c2" stroke="#b42318" />
        <NodeBox x={400} y={390} w={200} h={80} id="COST" label="Tokens × price × time" fill="#f4c7c2" stroke="#b42318" />
        <NodeBox x={640} y={390} w={200} h={80} id="HALT" label="Halt / budget (missing)" fill="#eee7dc" stroke="#4a4036" />

        <path d="M460 80v60" stroke="#355065" strokeWidth="1.6" />
        <path d="M280 175h80" stroke="#c9842a" strokeWidth="1.6" />
        <path d="M560 175h80" stroke="#c9842a" strokeWidth="1.6" />
        <path d="M740 210v90c0 20-80 40-180 40" fill="none" stroke="#8a3a14" strokeWidth="1.6" />
        <path d="M180 210v90c0 20 80 40 180 40" fill="none" stroke="#8a3a14" strokeWidth="1.6" />
        <path d="M460 350v40" stroke="#b42318" strokeWidth="1.8" />
        <path d="M220 350v40" stroke="#b42318" strokeWidth="1.8" />
        <path d="M740 210v180" stroke="#4a4036" strokeWidth="1.4" strokeDasharray="6 6" />

        <text x="80" y="40" className="node-label" fill="#b42318">
          No circuit breaker on LOOP
        </text>
        <text x="80" y="62" className="node-id" fill="#4a4036">
          Each hop is locally reasonable. The cycle is globally bankrupt.
        </text>
        <text x="80" y="500" className="node-id" fill="#b42318">
          SINK wins whenever HALT is a prompt instead of a counter.
        </text>
      </svg>
    </DiagramFrame>
  );
}
