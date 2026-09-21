export type GuideStep = {
  node: string;
  label: string;
};

export type DiagramGuide = {
  summary: string;
  steps: GuideStep[];
};

export const diagramGuides: Record<string, DiagramGuide> = {
  "1.1": {
    summary:
      "Left: a small flowchart you can finish. Right: a pile of rules that explodes as you add facts — and still fails on surprises.",
    steps: [
      { node: "T_ROOT", label: "Start with one question." },
      { node: "T_FEVER", label: "Yes/no branches stay local — add a question, add a branch." },
      { node: "T_LEAF", label: "A matching case reaches an answer." },
      { node: "R_KB", label: "Now the ambitious version: a big book of if-then rules." },
      { node: "R_FACTS", label: "Each extra yes/no fact roughly doubles the situations." },
      { node: "R_COMB", label: "That doubling is the explosion." },
      { node: "R_FAIL", label: "A new mix of facts: nothing matches, or two rules fight." },
    ],
  },
  "2.1": {
    summary:
      "Words become numbers, get mixed together (attention), then become a guess for the next word. There are still no hands.",
    steps: [
      { node: "TOK", label: "Chop the text into tokens (word-pieces)." },
      { node: "EMB", label: "Turn each token into a list of numbers." },
      { node: "Q", label: "Query: what this word is looking for." },
      { node: "K", label: "Key: what this word offers as an address." },
      { node: "V", label: "Value: what it will add if selected." },
      { node: "HEAD_1", label: "Several heads mix those views in parallel." },
      { node: "SOFT", label: "Attention: how much should this word listen to that one?" },
      { node: "CONCAT", label: "Stitch the heads back together." },
      { node: "CTX", label: "A new map of the whole prompt." },
      { node: "LM", label: "Guesses for the next word." },
      { node: "GAP", label: "Still no tools, files, or buttons." },
    ],
  },
  "3.1": {
    summary:
      "You type, it replies, the chat forgets. The world (files, production) sits outside the box with no write-back arrow.",
    steps: [
      { node: "USER", label: "You send a prompt." },
      { node: "CTX", label: "The context window: a whiteboard, not a filing cabinet." },
      { node: "BOX", label: "The model guesses the next word, over and over." },
      { node: "OUT", label: "You get text. That text does not run anything." },
      { node: "WORLD", label: "Real life sits outside the copper box." },
      { node: "MEM", label: "Long-term memory is missing in this era." },
      { node: "GAP", label: "The dashed arrow: no way to save back to the world." },
    ],
  },
  "4.1": {
    summary:
      "Think, then call a real tool, then read the result. Repeat until a stop rule fires.",
    steps: [
      { node: "GOAL", label: "The user asks for something." },
      { node: "THOUGHT", label: "Private scratch — not checked by the world." },
      { node: "ACTION", label: "A structured request a program can actually run." },
      { node: "TOOL", label: "Search, code, an API — physics resumes." },
      { node: "OBS", label: "The result comes back as text in the chat." },
      { node: "LOOP", label: "Save the trace and go around again." },
      { node: "STOP", label: "A real halt: step limit, final answer, or a human." },
    ],
  },
  "5.1": {
    summary:
      "Planner, doer, and critic keep handing work back. With no stop button, the loop burns money.",
    steps: [
      { node: "GOAL", label: "A vague wish: “make it better.”" },
      { node: "PLAN", label: "The planner adds more steps — including planning to plan." },
      { node: "EXEC", label: "The executor tries something, or looks busy." },
      { node: "CRITIC", label: "The critic says “not done.” That is a heater." },
      { node: "REPLAN", label: "Throw away the trace and start over." },
      { node: "SINK", label: "The cycle with no off switch." },
      { node: "COST", label: "Tokens × price × time. Finance notices first." },
      { node: "HALT", label: "The missing box: a budget in code, not in a prompt." },
    ],
  },
  "6.1": {
    summary:
      "The chat app owns the model. Tool servers plug in through one client — like USB-C for AI hands.",
    steps: [
      { node: "MODEL", label: "The chatbot brain, inside the host app." },
      { node: "CLIENT", label: "One adapter that talks to many tool servers." },
      { node: "POLICY", label: "You still approve what the tools may do." },
      { node: "SERVER_A", label: "A local tool (files on your machine)." },
      { node: "SERVER_B", label: "A remote tool (a website or SaaS)." },
      { node: "SERVER_C", label: "An internal company API." },
    ],
  },
  "7.1": {
    summary:
      "The model is one box. The copper frame is the harness: memory, tools, a sandbox, and brakes.",
    steps: [
      { node: "MODEL", label: "The brain. Allowed to be chancy." },
      { node: "LOOP", label: "The scheduler: next step, retry, cancel." },
      { node: "BRK", label: "Brakes: max steps, max spend, max time." },
      { node: "POLICY", label: "Permissions: which tools and secrets." },
      { node: "STATE", label: "Durable notes that survive a crash." },
      { node: "CTX", label: "What we actually show the model (a small whiteboard)." },
      { node: "TOOLS", label: "The plug for hands (ideally MCP)." },
      { node: "SAND", label: "A throwaway room so fires stay boxed." },
      { node: "WORLD", label: "Production, repos, browsers — only through the sandbox." },
    ],
  },
  "8.1": {
    summary:
      "First, checks that never guess (tests, types). Then a model that judges leftovers. Humans last.",
    steps: [
      { node: "PATCH", label: "A proposed change or tool call." },
      { node: "LINT", label: "Compilers, tests, allowlists — same answer tomorrow." },
      { node: "FAIL_D", label: "Hard no. No negotiation." },
      { node: "JUDGE", label: "A second model scores fuzzy leftovers (tone, scope)." },
      { node: "FAIL_N", label: "Retry or escalate — not a compiler error." },
      { node: "MERGE", label: "Accept: apply the change." },
      { node: "HUMAN", label: "Rare: security, production, disagreement." },
    ],
  },
  "9.1": {
    summary:
      "A human owns the blast radius. An orchestrator delegates. Specialists work behind a security wall.",
    steps: [
      { node: "HUMAN", label: "Someone pageable. Work can be delegated; blame cannot." },
      { node: "ORCH", label: "Routes tasks. Should not hold every production credential." },
      { node: "AUDIT", label: "Who did what, which model, how much it cost." },
      { node: "BUS", label: "A typed event bus — contracts, not vibes." },
      { node: "A1", label: "A specialist: code in a sandbox." },
      { node: "A2", label: "A specialist: research / retrieval." },
      { node: "A3", label: "A specialist: ops / runbooks." },
      { node: "SEC", label: "A wall per harness: identity, secrets, blast radius." },
    ],
  },
};
