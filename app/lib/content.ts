export type NavLink = {
  label: string;
  href: `#${string}`;
};

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Tools", href: "#tools" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const satisfies readonly NavLink[];

export const SITE_LINKS = {
  email: "mailto:santiago@slzavaletta.com",
  resume: "/SantiagoLopezZavaletta_CV.pdf",
  linkedin: "https://www.linkedin.com/in/slzavaletta",
  github: "https://github.com/slzavaletta",
  skillsRepository: "https://github.com/slzavaletta/skills",
} as const;

export const HERO = {
  role: "Technical Project Manager and Scrum Master at Globant.",
  firstName: "Santiago",
  lastName: "López Zavaletta",
  statement:
    "I run AI and software delivery—from staffing and P&L to Scrum, risk, and client decisions.",
  supporting:
    "My career started in infrastructure. Today I work between clients, executives, and technical teams across the United States and Latin America.",
  direction:
    "I’m preparing for a move into AI deployment: choosing the use case, running the pilot, supporting adoption, and helping the client make a scale-or-stop decision.",
  primaryAction: { label: "Read the work", href: "#work" },
  secondaryAction: {
    label: "Download résumé",
    href: SITE_LINKS.resume,
  },
} as const;

export type ProofPoint = {
  value: string;
  label: string;
  trend?: { from: string; to: string };
};

export const PROOF: readonly ProofPoint[] = [
  {
    value: "10+ years",
    label: "across infrastructure and technical delivery",
  },
  {
    value: "$5M",
    label: "current AI delivery account",
  },
  {
    value: "45%",
    label: "account margin after staffing and delivery changes",
    trend: { from: "40%", to: "45%" },
  },
  {
    value: "6 POCs",
    label: "delivered while building a Digital Twin capability",
  },
];

export const CURRENT_AND_NEXT = {
  heading: "What I do now. What I’m preparing to do next.",
  current: {
    label: "Current practice",
    title: "I manage the scope, budget, people, risk, and the work itself.",
    body:
      "At Globant, I own scope, budget, staffing, timelines, dependencies, risk, client communication, and the Scrum cadence for distributed software teams. My portfolio work has ranged from $700k to $5M, with cross-functional teams of up to 36 people. I use financial and delivery metrics to make tradeoffs while the team still has room to act.",
  },
  next: {
    label: "Next direction",
    title: "The AI deployment work I want to lead next.",
    body:
      "AI can produce a persuasive demo before a company knows how—or whether—to adopt it. The harder work is choosing the right use case, handling data and security constraints, supporting the people whose work will change, and deciding whether the evidence is strong enough to continue. That is the work I want to lead next.",
  },
  credential:
    "I’m pursuing the Claude Certified Architect certification and building hands-on depth through delivery tooling, automation, self-hosted infrastructure, and experiments with agent workflows.",
} as const;

export type CaseMarginalia = {
  context: string;
  constraint: string;
  work: string;
  signal: string;
};

export type CaseStudy = {
  id: string;
  number: string;
  label: string;
  period: string;
  title: string;
  summary: string;
  marginalia: CaseMarginalia;
};

export const WORK_INTRO = {
  heading: "Selected work.",
  body: "Three examples: what was difficult, what I owned, and what changed.",
} as const;

export const CASE_STUDIES = [
  {
    id: "ai-delivery",
    number: "01",
    label: "AI delivery",
    period: "Globant · Oct 2025–present",
    title: "Improving margin and reducing overhead on a $5M AI account.",
    summary:
      "A multidisciplinary AI account had margin pressure and too much recurring delivery work happening by hand. I own staffing, capacity, and P&L for a 20-person delivery team within a 40-person account, run Scrum and governance, and automate recurring work with Claude and Jira. Account margin moved from 40% to 45%.",
    marginalia: {
      context:
        "AI delivery across data science, engineering, front-end, and DevSecOps.",
      constraint:
        "Margin pressure and recurring operational overhead.",
      work:
        "Staffing mix, capacity planning, RAID governance, Scrum, and workflow automation.",
      signal: "Five percentage points of margin improvement.",
    },
  },
  {
    id: "digital-twin-studio",
    number: "02",
    label: "Digital Twin Studio",
    period: "Globant · Dec 2024–Oct 2025",
    title: "Building a new Digital Twin capability through six POCs.",
    summary:
      "Globant wanted a Digital Twin capability in a domain that was new to the team. I led a five-person LATAM POD, delivered a six-month, $90k fixed-price factory twin, worked with external partners, and supported presales. The first POC took roughly five weeks; the studio went on to deliver six.",
    marginalia: {
      context:
        "A new real-time 3D capability with no existing delivery model.",
      constraint:
        "An unfamiliar domain, external partners, and a fixed-price commitment.",
      work:
        "Team design, vendor coordination, POC delivery, and a repeatable studio model.",
      signal:
        "Six POCs, roughly five weeks to the first, and a $90k fixed-price delivery.",
    },
  },
  {
    id: "mergers-and-acquisitions",
    number: "03",
    label: "M&A and corporate development",
    period: "Globant · Jun 2022–Mar 2023",
    title: "Coordinating four M&A programs across four countries.",
    summary:
      "I coordinated due diligence across three Latin American acquisitions and the post-merger integration of a European firm. The work covered legal, marketing, IT, and change-management risk across approximately 940 people.",
    marginalia: {
      context: "Simultaneous due diligence and post-merger work.",
      constraint:
        "Different countries, functions, and decision owners.",
      work:
        "Cross-functional coordination, risk tracking, stakeholder communication, and integration planning.",
      signal: "Four deals covering approximately 940 people.",
    },
  },
] as const satisfies readonly CaseStudy[];

export type DecisionBriefField = {
  number: string;
  title: string;
  prompt: string;
};

export const PILOT_DECISION_BRIEF = {
  label: "Preparing for AI deployment",
  heading: "Before a pilot starts, I want five things written down.",
  body:
    "I’m developing this brief from my current TPM work as I prepare for AI deployment roles; it isn’t presented as a formal practice I already run.",
  fields: [
    {
      number: "01",
      title: "The business problem",
      prompt: "What is costly, slow, risky, or otherwise worth changing?",
    },
    {
      number: "02",
      title: "The users",
      prompt:
        "Whose workflow needs to change, and what support will they need?",
    },
    {
      number: "03",
      title: "The constraints",
      prompt:
        "What do data access, security, integrations, time, and competing tools allow?",
    },
    {
      number: "04",
      title: "The success signal",
      prompt: "What evidence would be credible enough to act on?",
    },
    {
      number: "05",
      title: "The decision",
      prompt:
        "What will the evidence allow the customer to stop, fix, expand, or buy?",
    },
  ] satisfies readonly DecisionBriefField[],
} as const;

export type SystemAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type DeliverySystem = {
  id: string;
  name: string;
  body: string;
  actions: readonly SystemAction[];
};

export const SYSTEMS = {
  heading: "Delivery systems I build.",
  projects: [
    {
      id: "scope-sentinel",
      name: "Scope Sentinel",
      body:
        "Client requests rarely arrive with a clean label. Scope Sentinel reads the request against the SOW, cites the exact clause, estimates the effort, and drafts the next step. When the evidence is missing, it says so.",
      actions: [
        { label: "Try the walkthrough", href: "#scope-sentinel" },
        {
          label: "View the source on GitHub",
          href: SITE_LINKS.skillsRepository,
          external: true,
        },
      ],
    },
    {
      id: "sow-intake",
      name: "SOW Intake",
      body:
        "SOW Intake turns a contract into a cited delivery baseline that people and agents can use. Missing evidence is marked as missing instead of being filled with a plausible answer.",
      actions: [
        {
          label: "View the source on GitHub",
          href: SITE_LINKS.skillsRepository,
          external: true,
        },
      ],
    },
  ] satisfies readonly DeliverySystem[],
  infrastructure: {
    label: "Behind the experiments",
    body:
      "I also run the infrastructure behind my own experiments: Docker, Caddy, Tailscale, n8n, project tracking, and personal agents on a self-hosted VPS.",
  },
} as const;

export type Tool = {
  name: string;
  logoSrc: string;
};

export type ToolGroup = {
  id: string;
  label: string;
  note: string;
  tools: readonly Tool[];
};

const logo = (file: string) => `/logos/${file}.svg`;

export const TOOL_SECTION = {
  heading: "Tools, grouped by how I use them.",
  body:
    "Tools matter when they shorten a feedback loop, make a decision easier to trace, or remove work a team should not be doing by hand.",
} as const;

export const TOOL_GROUPS = [
  {
    id: "run",
    label: "Run the work",
    note:
      "I use these for scope, backlogs, delivery decisions, and shared context.",
    tools: [
      { name: "Jira", logoSrc: logo("jira") },
      { name: "Power BI", logoSrc: logo("powerbi") },
      { name: "Linear", logoSrc: logo("linear") },
      { name: "Figma", logoSrc: logo("figma") },
    ],
  },
  {
    id: "build",
    label: "Build and automate",
    note:
      "The tools I use to draft, test, and remove repeatable delivery work.",
    tools: [
      { name: "Claude", logoSrc: logo("claude") },
      {
        name: "ChatGPT / Codex",
        logoSrc: logo("openai"),
      },
      { name: "Gemini", logoSrc: logo("gemini") },
      { name: "n8n", logoSrc: logo("n8n") },
    ],
  },
  {
    id: "operate",
    label: "Ship and operate",
    note:
      "A practical stack for scripts, source control, containers, and the infrastructure behind my experiments.",
    tools: [
      { name: "Python", logoSrc: logo("python") },
      {
        name: "Bash / PowerShell",
        logoSrc: logo("gnubash"),
      },
      { name: "GitHub", logoSrc: logo("github") },
      { name: "Docker", logoSrc: logo("docker") },
    ],
  },
  {
    id: "explore",
    label: "Explore AI systems",
    /*
     * The "active learning" framing is required by the design spec so the page
     * does not overstate depth here. It now lives only in this note, which is
     * where it was already being said.
     */
    note:
      "Active learning: I use these to understand orchestration, observability, evaluation, and retrieval more deeply.",
    tools: [
      { name: "Mastra", logoSrc: logo("mastra") },
      { name: "LangGraph", logoSrc: logo("langgraph") },
      { name: "Langfuse", logoSrc: logo("langfuse") },
      { name: "pgvector", logoSrc: logo("postgresql") },
    ],
  },
] as const satisfies readonly ToolGroup[];

export type ExperienceItem = {
  company: string;
  period: string;
  title: string;
  body: string;
};

export const EXPERIENCE_SECTION = {
  heading: "How I got here.",
} as const;

export const EXPERIENCE = [
  {
    company: "Globant",
    period: "2021–present",
    title: "Technical Project Manager and Scrum Master",
    body:
      "AI delivery, Digital Twin, hospitality, and M&A work across the United States and Latin America. I manage scope, P&L, staffing, risk, delivery cadence, and client communication.",
  },
  {
    company: "XOOR",
    period: "2022",
    title: "Freelance Project Manager",
    body: "Web and mobile delivery.",
  },
  {
    company: "ExxonMobil",
    period: "2018–2021",
    title: "System Administrator",
    body:
      "Enterprise infrastructure, security, reporting, and service transition.",
  },
  {
    company: "gA",
    period: "2014–2018",
    title: "Technical Project Lead",
    body:
      "Enterprise migration and performance-testing programs in life sciences.",
  },
] as const satisfies readonly ExperienceItem[];

export type Certification = {
  name: string;
  issuer?: string;
  status: "Earned" | "In progress";
};

export const CERTIFICATIONS = [
  {
    name: "Certified ScrumMaster",
    issuer: "Scrum Alliance",
    status: "Earned",
  },
  {
    name: "Certified SAFe 6 Agilist",
    issuer: "Scaled Agile",
    status: "Earned",
  },
  {
    name: "Claude Certified Architect",
    status: "In progress",
  },
] as const satisfies readonly Certification[];

export const INDUSTRIES = [
  "AI",
  "Digital Twin",
  "Hospitality",
  "M&A",
  "Life Sciences",
  "Oil & Gas",
  "Consulting",
] as const;

export const CONTACT = {
  heading: "I’m looking for my next role in AI deployment.",
  body:
    "If you need a Technical Project Manager who can own the delivery around an AI pilot—scope, people, risk, budget, and client decisions—I’d like to talk.",
} as const;
