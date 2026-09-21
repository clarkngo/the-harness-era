export type PhaseId = 1 | 2 | 3 | 4;

export type Chapter = {
  id: string;
  order: number;
  slug: string;
  title: string;
  subtitle: string;
  era: string;
  phase: PhaseId;
  focus: string;
  problem: string;
  diagramId: string;
  diagramTitle: string;
  diagramDone: boolean;
};

export const phases: Record<
  PhaseId,
  { title: string; kicker: string; span: string }
> = {
  1: {
    title: "Rules, then pattern-learning",
    kicker: "Phase 1",
    span: "1950s–2017",
  },
  2: {
    title: "The chatbot era",
    kicker: "Phase 2",
    span: "2020–2023",
  },
  3: {
    title: "Homemade agents",
    kicker: "Phase 3",
    span: "2023–2025",
  },
  4: {
    title: "The harness",
    kicker: "Phase 4",
    span: "Now",
  },
};

export const chapters: Chapter[] = [
  {
    id: "ch-01",
    order: 1,
    slug: "the-pattern-matchers",
    title: "The Pattern Matchers",
    subtitle: "When “AI” meant a checklist a computer could not improvise",
    era: "1950s–2010s",
    phase: 1,
    focus: "If-then rules and expert systems — the first attempt at encoding know-how",
    problem: "You cannot write a rule for every surprise the world will throw",
    diagramId: "1.1",
    diagramTitle: "Decision Tree vs. Rule Engine State Explosion",
    diagramDone: true,
  },
  {
    id: "ch-02",
    order: 2,
    slug: "the-deep-learning-renaissance",
    title: "The Deep Learning Renaissance",
    subtitle: "Computers get good at seeing patterns — still no hands",
    era: "2012–2017",
    phase: 1,
    focus: "Neural nets, AlexNet, and the transformer (the idea behind today's chatbots)",
    problem: "A great map of language is not the same as the ability to act",
    diagramId: "2.1",
    diagramTitle: "High-Dimensional Representation Vector Mapping & Attention Heads",
    diagramDone: true,
  },
  {
    id: "ch-03",
    order: 3,
    slug: "the-completion-box",
    title: "The Completion Box",
    subtitle: "You type. It replies. Then it forgets.",
    era: "2020–2022",
    phase: 2,
    focus: "GPT-3 and the chat box as a product",
    problem: "It can make things up, it has no long-term memory, and it cannot actually do anything",
    diagramId: "3.1",
    diagramTitle: 'The "Completion Box" Topology (Stateless Boundary vs. World State)',
    diagramDone: true,
  },
  {
    id: "ch-04",
    order: 4,
    slug: "the-emergence-of-tool-use",
    title: "The Emergence of Tool-Use",
    subtitle: "The model learns to ask for a tool instead of pretending it already used one",
    era: "2023",
    phase: 2,
    focus: "ReAct and function calling — thought, then action, then looking at the result",
    problem: "Turning a text generator into something that can request real work",
    diagramId: "4.1",
    diagramTitle: "ReAct Execution Loop (Thought → Action → Observation)",
    diagramDone: true,
  },
  {
    id: "ch-05",
    order: 5,
    slug: "early-agentic-frameworks",
    title: "Early Agentic Frameworks",
    subtitle: "Early “AI agents” that looped — sometimes until the bill arrived",
    era: "2023–2024",
    phase: 3,
    focus: "AutoGPT, LangChain, CrewAI, and other DIY loops",
    problem: "No stop button, exploding cost, and memory that was just a pile of chat messages",
    diagramId: "5.1",
    diagramTitle: "The Unconstrained Recursion Sink (Infinite Loop Token Burn)",
    diagramDone: true,
  },
  {
    id: "ch-06",
    order: 6,
    slug: "standardizing-the-interop-layer",
    title: "Standardizing the Interop Layer",
    subtitle: "A shared plug so every chatbot app does not invent its own tools",
    era: "2024–2025",
    phase: 3,
    focus: "Model Context Protocol (MCP) — a USB-C for AI tools",
    problem: "Tools were locked to one chat app; switching hosts meant rewriting everything",
    diagramId: "6.1",
    diagramTitle: "Model Context Protocol (MCP) Client-Host-Server Topology",
    diagramDone: true,
  },
  {
    id: "ch-07",
    order: 7,
    slug: "what-is-an-agent-harness",
    title: "What is an Agent Harness?",
    subtitle: "The missing piece: software around the model, not a longer prompt",
    era: "Now",
    phase: 4,
    focus: "Memory, a sandbox, tools, and a stop button — the harness",
    problem: "A model is not an agent until something around it can remember, act, and halt",
    diagramId: "7.1",
    diagramTitle:
      "Agent Harness Runtime Architecture (Model + State Engine + Sandbox + Circuit Breakers)",
    diagramDone: true,
  },
  {
    id: "ch-08",
    order: 8,
    slug: "harness-engineering",
    title: "Harness Engineering",
    subtitle: "Some checks never guess. Some checks do. You need both, in that order.",
    era: "Now",
    phase: 4,
    focus: "From “please be careful” in a prompt to tests, linters, and a second-opinion model",
    problem: "A polite instruction is not a compiler, and a judging model is not a type checker",
    diagramId: "8.1",
    diagramTitle:
      "Dual-Layer Verification Flow (Deterministic Linter Gate + Non-Deterministic LLM Sensor)",
    diagramDone: true,
  },
  {
    id: "ch-09",
    order: 9,
    slug: "the-future-of-autonomous-systems",
    title: "The Future of Autonomous Systems",
    subtitle: "Many AIs at work — and a human who can still be paged",
    era: "Next",
    phase: 4,
    focus: "Teams of specialist agents, security walls, and who is accountable",
    problem: "A swarm with no owner is an incident with no name",
    diagramId: "9.1",
    diagramTitle: "Enterprise Multi-Agent Microservice Harness Hierarchy",
    diagramDone: true,
  },
];

export function chapterBySlug(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug);
}

export function neighbors(slug: string) {
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  return {
    prev: index > 0 ? chapters[index - 1] : undefined,
    next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : undefined,
  };
}
