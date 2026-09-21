import { Diagram11 } from "./Diagram11";
import { Diagram21 } from "./Diagram21";
import { Diagram31 } from "./Diagram31";
import { Diagram41 } from "./Diagram41";
import { Diagram51 } from "./Diagram51";
import { Diagram61 } from "./Diagram61";
import { Diagram71 } from "./Diagram71";
import { Diagram81 } from "./Diagram81";
import { Diagram91 } from "./Diagram91";
import type { DiagramGuide } from "../../data/diagramGuides";

const diagrams: Record<string, typeof Diagram11> = {
  "1.1": Diagram11,
  "2.1": Diagram21,
  "3.1": Diagram31,
  "4.1": Diagram41,
  "5.1": Diagram51,
  "6.1": Diagram61,
  "7.1": Diagram71,
  "8.1": Diagram81,
  "9.1": Diagram91,
};

export function DiagramIsland({
  id,
  guide,
}: {
  id: string;
  guide?: DiagramGuide;
}) {
  const Diagram = diagrams[id] ?? Diagram11;
  return <Diagram guide={guide} />;
}
