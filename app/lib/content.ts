export const NAV_LINKS = [
  { label: "Lab", href: "#lab" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export type ProofStat =
  | {
      kind: "count";
      value: number;
      prefix?: string;
      suffix?: string;
      label: string;
    }
  | { kind: "static"; display: string; label: string };

export const PROOF: ProofStat[] = [
  { kind: "count", value: 10, suffix: "+", label: "years in delivery" },
  { kind: "static", display: "$700k-$5M", label: "portfolios under P&L" },
  { kind: "count", value: 8, label: "industries" },
  { kind: "count", value: 5, prefix: "+", suffix: "pp", label: "account margin" },
];

export const LEAD = [
  "Delivery & program management",
  "Scope, risk & stakeholder governance",
  "P&L & margin ownership",
  "Cross-functional AI teams (Data Science, Engineering, DevSecOps)",
];

export const BUILD = [
  "Agentic AI skills & tooling",
  "Self-hosted infrastructure & agents",
  "Workflow automation (n8n, Jira Automations)",
  "Process automation with Claude",
];

export type LabCard = {
  name: string;
  blurb: string;
  stack: string[];
  href?: string;
  demoHref?: string; // in-page anchor to a live demo section
  featured?: boolean;
};

export const LAB: LabCard[] = [
  {
    name: "Scope Sentinel",
    blurb:
      "Agentic Claude skill that protects the delivery baseline. It reads an incoming client request and classifies it in-scope, out-of-scope, or ambiguous against the SOW, with a verified verbatim citation, effort sizing, and a draft change request. Human-in-the-loop throughout.",
    stack: ["Claude skills", "Python"],
    href: "https://github.com/slzavaletta/skills",
    demoHref: "#scope-sentinel",
    featured: true,
  },
  {
    name: "SOW Intake",
    blurb:
      "Turns a Statement of Work into living, cited project memory: a machine-readable baseline plus a human-readable delivery brief, with mandatory citations and risk flags. Fails loud with NOT_FOUND and flags rather than guessing.",
    stack: ["Claude skills", "Python", "JSON Schema"],
    href: "https://github.com/slzavaletta/skills",
    featured: true,
  },
  {
    name: "LifeOS",
    blurb:
      "A personal agentic operating system for planning and decision support, built around Claude, with custom, extensible protocols at its core. In early development.",
    stack: ["Claude", "Python"],
  },
  {
    name: "Self-hosted infra & agents",
    blurb:
      "Personal self-hosted stack (VPS, Docker, Caddy reverse proxy, Tailscale) running workflow automation, self-hosted project tracking, and a personal agent (Hermes). Evidence of operating real infrastructure, not no-code.",
    stack: ["Docker", "Caddy", "Tailscale", "n8n", "Plane", "Hermes"],
  },
  {
    name: "Agentic systems R&D",
    blurb:
      "Hands-on work with agent orchestration and evaluation tooling: building, wiring, and evaluating multi-agent workflows to go deeper on the engineering behind AI delivery. Early and ongoing.",
    stack: ["LangGraph", "Mastra", "Langfuse", "pgvector"],
  },
];

export type Role = {
  company: string;
  period: string;
  title: string;
  impact: string;
};

export const EXPERIENCE: Role[] = [
  {
    company: "Globant",
    period: "2021-Present",
    title: "Senior Project Manager",
    impact:
      "AI/Web3, Digital Twin, Hospitality (hotels & cruise), and M&A delivery across US & LATAM. Currently leading AI delivery on a $5M program (+5pp margin).",
  },
  {
    company: "ExxonMobil",
    period: "2018-2021",
    title: "System Administrator",
    impact:
      "Oil & Gas. Enterprise middleware, infrastructure, and security compliance.",
  },
  {
    company: "gA",
    period: "2014-2018",
    title: "Technical Project Lead",
    impact:
      "Life Sciences. UNIX-to-Windows migrations for Johnson & Johnson MD&D.",
  },
  {
    company: "XOOR",
    period: "2022",
    title: "Project Manager (freelance)",
    impact: "Web and mobile delivery.",
  },
];

export type CaseStudy = {
  title: string;
  meta: string;
  problem: string;
  action: string;
  result: string;
  viz: "margin" | "poc" | "deals";
};

export const CASES: CaseStudy[] = [
  {
    title: "AI Delivery, $5M account",
    meta: "Globant · Oct 2025 - Present",
    problem:
      "A $5M account with a multidisciplinary org (AI Data Scientists & Engineers, Front-end, DevSecOps) under margin pressure and high manual operational overhead.",
    action:
      "Owned staffing, capacity and P&L over a 20-person delivery team (within a 40-person, 2-PM account); ran governance with RACI / RAID / status reporting; served as Scrum Master; built process automation with Claude and Jira Automations to cut manual overhead.",
    result:
      "Margin moved 40% to 45% (+5pp) through staffing optimization and delivery efficiency, with reduced manual operational load and faster workflows.",
    viz: "margin",
  },
  {
    title: "Digital Twin Studio",
    meta: "Globant · Dec 2024 - Oct 2025",
    problem:
      "Globant needed to stand up a Digital Twin capability (real-time 3D / Unreal Engine) from scratch and validate it with client-facing POCs in a new domain.",
    action:
      "Led the POC team; directed a 5-person LATAM POD (2 Digital Twin Designers, 3D Artist, Technical Artist, Game Developer); delivered a factory digital twin as a packaged Windows app (fixed-price, 6 months, $90k); led partnership negotiations and external vendor management; supported presales.",
    result:
      "6 POCs delivered (factory twin for a major US manufacturer, office twin, VR bookshop walkthrough, real-time vehicle configurator for a major US automaker); first POC in roughly 5 weeks; a repeatable studio model.",
    viz: "poc",
  },
  {
    title: "M&A / Corporate Development",
    meta: "Globant · Jun 2022 - Mar 2023",
    problem:
      "Inorganic growth required running due diligence and integration across multiple acquisitions in parallel, across countries.",
    action:
      "Due diligence on 3 LATAM acquisitions (around 640 people combined: digital marketing, digital agency, Salesforce practice) plus post-merger integration of 1 European firm (around 300 people, digital transformation); coordinated legal, marketing and IT; managed change-management risk.",
    result:
      "3 due-diligence targets integrated and the European post-merger integration executed. 4 deals, around 940 people, 4 countries. Operating at corp-dev level, rare for a delivery PM.",
    viz: "deals",
  },
];

// Digital Twin: only the real facts from the case copy.
export const POC = {
  count: 6,
  stats: [
    { value: 90, prefix: "$", suffix: "k", sub: "fixed-price" },
    { value: 6, suffix: " mo", sub: "delivery window" },
    { value: 5, suffix: "", sub: "person LATAM POD" },
    { value: 5, prefix: "~", suffix: " wk", sub: "to first POC" },
  ],
  named: [
    "Factory twin (US manufacturer)",
    "Office twin",
    "VR bookshop walkthrough",
    "Real-time vehicle configurator (US automaker)",
  ],
};

// M&A: deal headcounts (owner-provided), sum ~940 across 4 countries.
export const DEALS = [
  { label: "LATAM acquisition", people: 190, kind: "Due diligence" },
  { label: "LATAM acquisition", people: 275, kind: "Due diligence" },
  { label: "LATAM acquisition", people: 173, kind: "Due diligence" },
  { label: "European firm", people: 300, kind: "Post-merger integration" },
];

export type Metric =
  | {
      kind: "ring";
      value: number;
      prefix?: string;
      suffix?: string;
      label: string;
    }
  | { kind: "band"; display: string; label: string; note: string };

export const METRICS: Metric[] = [
  {
    kind: "ring",
    value: 95,
    prefix: "~",
    suffix: "%",
    label: "On-time milestone delivery",
  },
  {
    kind: "band",
    display: "±5%",
    label: "P&L forecast accuracy",
    note: "forecast vs actual",
  },
  {
    kind: "ring",
    value: 30,
    prefix: "~",
    suffix: "%",
    label: "Manual ops time cut via automation",
  },
  {
    kind: "ring",
    value: 88,
    prefix: "~",
    suffix: "%",
    label: "Billable utilization",
  },
];

// marks = ordered candidate logo URLs. Every logo is vendored under
// /public/logos so nothing depends on a runtime third-party CDN fetch. All are
// normalized to one flat monochrome via CSS mask in the Logo component, so marks
// from different original sources render identically. mono = last-resort letter.
export type StackItem = { name: string; marks: string[]; mono?: string };
export type StackGroup = { group: string; items: StackItem[] };

const logo = (file: string) => `/logos/${file}.svg`;

export const STACK: StackGroup[] = [
  {
    group: "AI & Automation",
    items: [
      { name: "Claude / Claude Code", marks: [logo("claude")], mono: "C" },
      { name: "ChatGPT / Codex", marks: [logo("openai")], mono: "O" },
      { name: "Gemini", marks: [logo("gemini")], mono: "G" },
      { name: "n8n", marks: [logo("n8n")] },
    ],
  },
  {
    group: "Delivery & PM",
    items: [
      { name: "Jira", marks: [logo("jira")] },
      { name: "Azure DevOps", marks: [logo("azuredevops")], mono: "A" },
      { name: "Linear", marks: [logo("linear")] },
      { name: "Figma", marks: [logo("figma")] },
    ],
  },
  {
    group: "Build & Infra",
    items: [
      { name: "Python", marks: [logo("python")] },
      { name: "Shell (Bash/PowerShell)", marks: [logo("gnubash")], mono: "S" },
      { name: "GitHub", marks: [logo("github")] },
      { name: "Docker", marks: [logo("docker")] },
    ],
  },
  {
    group: "AI Engineering",
    items: [
      { name: "Mastra", marks: [logo("mastra")], mono: "M" },
      { name: "LangGraph", marks: [logo("langgraph")] },
      { name: "Langfuse", marks: [logo("langfuse")], mono: "L" },
      { name: "pgvector", marks: [logo("postgresql")] },
    ],
  },
  {
    group: "Data",
    items: [{ name: "Power BI", marks: [logo("powerbi")], mono: "P" }],
  },
];

export const INDUSTRIES = [
  "Life Sciences",
  "Oil & Gas",
  "Consulting",
  "Gaming",
  "Digital Twin",
  "Hospitality (Hotels & Cruise)",
  "M&A",
  "AI",
];

export const CERTS = [
  { name: "Certified ScrumMaster (CSM)", body: "Scrum Alliance" },
  { name: "Certified SAFe 6 Agilist", body: "Scaled Agile" },
  { name: "Claude Certified Architect", body: "in progress" },
];
