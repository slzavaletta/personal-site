/**
 * Copy and facts for the whole page. Everything a reader can verify lives
 * here, typed, so a claim can be traced to one place.
 *
 * Rules that shaped the copy:
 *  - the current title is the one on the résumé; "AI deployment" is the
 *    direction of the work, never the job title;
 *  - figures that belong to an employer's P&L are given as ranges;
 *  - what is current, what is exploratory and what is next are labelled.
 */

import { SITE_EMAIL } from "@/app/lib/site";

/*
 * The role transition. The resignation was communicated on 2026-09-02, so the
 * move is public. When the new role begins, swap `current` and `next` here;
 * the hero, the ledger, the timeline, the metadata and the OG image follow.
 */
export const ROLE_TRANSITION = {
  public: true,
  startsOn: "2026-10",
  startsOnLabel: "October 2026",
  current: {
    company: "Globant",
    title: "Technical Project Manager",
    since: "2021",
  },
  next: {
    company: "Syneos Health",
    title: "Senior Technical Program Manager",
    domain: "AI in clinical development",
  },
} as const;

export const CURRENT_TITLE = ROLE_TRANSITION.current.title;

export type Section = {
  id: string;
  label: string;
  navLabel: string;
};

/** Document order. The header navigation derives from it. */
export const SECTIONS = [
  { id: "work", label: "Selected work", navLabel: "Work" },
  { id: "approach", label: "Approach", navLabel: "Approach" },
  { id: "systems", label: "Systems and tools", navLabel: "Systems" },
  { id: "experience", label: "Experience", navLabel: "Experience" },
  { id: "contact", label: "Contact", navLabel: "Contact" },
] as const satisfies readonly Section[];

export const NAV_LINKS = SECTIONS.filter((s) => s.id !== "systems").map(
  ({ navLabel, id }) => ({ label: navLabel, href: `#${id}` as const }),
);

export const SITE_LINKS = {
  email: `mailto:${SITE_EMAIL}`,
  resume: "/SantiagoLopezZavaletta_CV.pdf",
  linkedin: "https://www.linkedin.com/in/slzavaletta",
  github: "https://github.com/slzavaletta",
  skillsRepository: "https://github.com/slzavaletta/skills",
} as const;

export const LOCATION = {
  city: "Buenos Aires",
  country: "Argentina",
  timeZone: "America/Argentina/Buenos_Aires",
} as const;

const roleLine = ROLE_TRANSITION.public
  ? `${ROLE_TRANSITION.current.title} at ${ROLE_TRANSITION.current.company}. Joining ${ROLE_TRANSITION.next.company} as ${ROLE_TRANSITION.next.title} in ${ROLE_TRANSITION.startsOnLabel}.`
  : `${ROLE_TRANSITION.current.title} at ${ROLE_TRANSITION.current.company}.`;

export const HERO = {
  role: roleLine,
  firstName: "Santiago",
  lastName: "López Zavaletta",
  statement:
    "I spend my days on the part of AI work that is not the model: staffing the team, holding the budget, naming the risks, and getting the client to a decision they can stand behind.",
  supporting:
    "My career started in life-sciences delivery, moved through enterprise infrastructure, and grew into AI and digital delivery at scale for clients across the United States and Latin America.",
  direction:
    "The work I want more of is AI deployment where the constraints are real: regulated industries, enterprise data, and people whose work changes. Next stop, AI in clinical development.",
  primaryAction: { label: "The work", href: "#work" },
  secondaryAction: { label: "Download résumé", href: SITE_LINKS.resume },
} as const;

/** One spoken line of proof, not a stats grid. */
export const PROOF_LINE =
  "Ten years. A multi-million-dollar AI account. Six POCs. Three go-lives. Four deals.";

/**
 * The ledger: what is true right now. Edited by commit; the GitHub row is
 * fetched at request time and revalidated hourly.
 */
export const NOW = {
  label: "Now",
  building:
    "Two tools that read a request against the SOW, cite the clause, and say so when the evidence is missing.",
  learning:
    "Claude Certified Architect (Foundations); orchestration, evaluation, and retrieval for agent workflows.",
  availability: "Open to conversations about AI deployment work.",
} as const;

export type CaseStudy = {
  id: string;
  label: string;
  period: string;
  title: string;
  summary: string;
  context: string;
  constraint: string;
};

export const WORK_INTRO = {
  heading: "Selected work",
  body: "Three examples: what was difficult, what I owned, and what changed.",
} as const;

export const CASE_STUDIES = [
  {
    id: "ai-delivery",
    label: "AI delivery",
    period: "Globant · Oct 2025–present",
    title:
      "Improving margin and reducing overhead on a multi-million-dollar AI account",
    summary:
      "A multidisciplinary AI account had margin pressure and too much recurring delivery work happening by hand. I own staffing, capacity, and P&L for a delivery team of around twenty, run Scrum and governance, and automate recurring work with Claude and Jira. Account margin moved up several points.",
    context:
      "AI delivery across data science, engineering, front-end, and DevSecOps.",
    constraint: "Margin pressure and recurring operational overhead.",
  },
  {
    id: "digital-twin-studio",
    label: "Digital Twin Studio",
    period: "Globant · Dec 2024–Oct 2025",
    title: "Building a new Digital Twin capability through six POCs",
    summary:
      "Globant wanted a Digital Twin capability in a domain that was new to the team. I led a five-person LATAM POD, delivered a six-month fixed-price factory twin, worked with external partners, and supported presales. The first POC took roughly five weeks; the studio went on to deliver six.",
    context: "A new real-time 3D capability with no existing delivery model.",
    constraint:
      "An unfamiliar domain, external partners, and a fixed-price commitment.",
  },
  {
    id: "mergers-and-acquisitions",
    label: "M&A and corporate development",
    period: "Globant · Jun 2022–Mar 2023",
    title: "Coordinating four M&A programs across four countries",
    summary:
      "I coordinated due diligence across three Latin American acquisitions and the post-merger integration of a European firm. The work covered legal, marketing, IT, and change-management risk across four organisations in Latin America and Europe.",
    context: "Simultaneous due diligence and post-merger work.",
    constraint: "Different countries, functions, and decision owners.",
  },
] as const satisfies readonly CaseStudy[];

export type BriefField = {
  id: string;
  number: string;
  title: string;
  prompt: string;
  /** What tends to go wrong when this field is left blank. */
  whenMissing: string;
  /** One example from the work, anonymised. */
  fromTheWork: string;
};

/**
 * The pilot decision brief, set as an instrument the reader can operate. The
 * five fields are the document; the failure modes and examples are what a
 * conversation about them sounds like.
 */
export const BRIEF = {
  label: "Approach",
  heading: "Before a pilot starts, I want five things written down",
  body: "This is the brief I work from: what the delivery team and the client both have to agree on before the first sprint. Pick a field to see what tends to happen when it is missing, and where the habit came from.",
  panelLabels: {
    prompt: "The question",
    whenMissing: "When it is missing",
    fromTheWork: "From the work",
  },
  fields: [
    {
      id: "problem",
      number: "01",
      title: "The business problem",
      prompt: "What is costly, slow, risky, or otherwise worth changing?",
      whenMissing:
        "The pilot optimises for what the demo does well, and afterwards nobody can say what it fixed.",
      fromTheWork:
        "On the AI account, recurring reporting was the cost that could be named and measured. That is where the automation started, not with the most impressive model.",
    },
    {
      id: "users",
      number: "02",
      title: "The users",
      prompt:
        "Whose workflow needs to change, and what support will they need?",
      whenMissing:
        "Adoption gets measured after the fact, once the people who were supposed to change have already found a workaround.",
      fromTheWork:
        "Three enterprise AI implementations went live on time and were adopted because the recruiters using the system were part of the delivery plan, not its audience.",
    },
    {
      id: "constraints",
      number: "03",
      title: "The constraints",
      prompt:
        "What do data access, security, integrations, time, and competing tools allow?",
      whenMissing:
        "The first integration meeting becomes the moment the timeline is rewritten.",
      fromTheWork:
        "The Digital Twin work depended on partner data and a fixed price. Both were written down before the first sprint, and the first POC landed in about five weeks.",
    },
    {
      id: "signal",
      number: "04",
      title: "The success signal",
      prompt: "What evidence would be credible enough to act on?",
      whenMissing:
        "Every stakeholder brings a different chart to the review, and the pilot ends in a second pilot.",
      fromTheWork:
        "Margin and delivery metrics were the shared numbers on the AI account. Tradeoffs were argued from them while the team still had room to act.",
    },
    {
      id: "decision",
      number: "05",
      title: "The decision",
      prompt:
        "What will the evidence allow the customer to stop, fix, expand, or buy?",
      whenMissing:
        "A pilot that cannot be stopped is not a pilot. It is an unbudgeted rollout.",
      fromTheWork:
        "Scope Sentinel is built the same way: when the evidence is missing it says so, instead of drafting a plausible answer for someone to approve.",
    },
  ] satisfies readonly BriefField[],
} as const;

export type DeliverySystem = {
  id: string;
  name: string;
  body: string;
  href: string;
};

export const SYSTEMS = {
  heading: "Systems I build, tools I use",
  body: "These keep scope and evidence visible, so the next delivery decision does not depend on memory.",
  projects: [
    {
      id: "scope-sentinel",
      name: "Scope Sentinel",
      body: "Reads a client request against the SOW, cites the exact clause, sizes the effort, and drafts the next step. When the evidence is missing, it says so.",
      href: SITE_LINKS.skillsRepository,
    },
    {
      id: "sow-intake",
      name: "SOW Intake",
      body: "Turns a contract into a cited delivery baseline that people and agents can use. Missing evidence is marked as missing, not filled with a plausible answer.",
      href: SITE_LINKS.skillsRepository,
    },
  ] satisfies readonly DeliverySystem[],
  infrastructure:
    "I also run the infrastructure behind my own experiments: Docker, Caddy, Tailscale, n8n, project tracking, and personal agents on a self-hosted VPS.",
} as const;

export type Tool = {
  name: string;
  /** Local monochrome mark in `public/logos`. */
  logoSrc: string;
};

export type ToolGroup = {
  id: string;
  label: string;
  note: string;
  tools: readonly Tool[];
};

const logo = (file: string) => `/logos/${file}.svg`;

export const TOOL_GROUPS = [
  {
    id: "run",
    label: "Run the work",
    note: "Scope, backlogs, delivery decisions, and shared context.",
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
    note: "Draft, test, and remove repeatable delivery work.",
    tools: [
      { name: "Claude", logoSrc: logo("claude") },
      { name: "ChatGPT / Codex", logoSrc: logo("openai") },
      { name: "Gemini", logoSrc: logo("gemini") },
      { name: "n8n", logoSrc: logo("n8n") },
    ],
  },
  {
    id: "operate",
    label: "Ship and operate",
    note: "Scripts, source control, containers, and the infrastructure behind the experiments.",
    tools: [
      { name: "Python", logoSrc: logo("python") },
      { name: "Bash / PowerShell", logoSrc: logo("gnubash") },
      { name: "GitHub", logoSrc: logo("github") },
      { name: "Docker", logoSrc: logo("docker") },
    ],
  },
  {
    id: "explore",
    label: "Exploring",
    /*
     * The "active learning" framing is required by the brief so the page does
     * not overstate depth here.
     */
    note: "Active learning, not production expertise: orchestration, evaluation, retrieval.",
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
  /** A role that starts after the page was written. */
  upcoming?: boolean;
  /** A role that ran alongside Globant rather than after it. */
  concurrent?: boolean;
};

export const EXPERIENCE_SECTION = {
  heading: "How I got here",
  note: "Two engagements ran concurrently with my role at Globant, and are marked below.",
} as const;

export const EXPERIENCE = [
  {
    company: ROLE_TRANSITION.next.company,
    period: `From ${ROLE_TRANSITION.startsOnLabel}`,
    title: ROLE_TRANSITION.next.title,
    upcoming: true,
    body: "Technical program management in a fully integrated biopharmaceutical solutions organisation, where AI is being embedded into clinical development under regulatory governance.",
  },
  {
    company: "Globant",
    period: "2021–2026",
    title: "Technical Project Manager",
    body: "End-to-end delivery, forecasting, and P&L for US and LATAM digital transformation portfolios from under $1M to multi-million-dollar accounts, with cross-functional teams of up to 36. Launched Globant's Digital Twin Studio and standardized AI-assisted delivery reporting across the account.",
  },
  {
    company: "ZN Love",
    period: "2026–present",
    title: "Fractional Project Manager",
    concurrent: true,
    body: "Client relationships and delivery health across a three-project portfolio spanning entertainment, workforce technology, and creative production. Building the PMO from the ground up: presales discovery, SOW, governance, and change control.",
  },
  {
    company: "Blue Crab Consulting",
    period: "2025–2026",
    title: "Engagement Manager",
    concurrent: true,
    body: "Led functional and technical consultants across three enterprise Eightfold AI implementations — a global beverage leader, a leading LATAM retailer, and a top US research university — delivering on-time go-lives and full adoption, and scaling one deployment from its Mexico launch across additional LATAM markets.",
  },
  {
    company: "ExxonMobil",
    period: "2018–2021",
    title: "System Administrator",
    body: "Enterprise infrastructure, security, reporting, and service transition.",
  },
  {
    company: "gA",
    period: "2014–2018",
    title: "Technical Project Lead",
    body: "Enterprise migration and performance-testing programs in life sciences.",
  },
] as const satisfies readonly ExperienceItem[];

export type Certification = {
  name: string;
  issuer?: string;
  year?: string;
  status: "Earned" | "In progress";
};

export const CERTIFICATIONS = [
  {
    name: "Certified ScrumMaster",
    issuer: "Scrum Alliance",
    year: "2024",
    status: "Earned",
  },
  {
    name: "Certified SAFe 6 Agilist",
    issuer: "Scaled Agile",
    year: "2024",
    status: "Earned",
  },
  {
    name: "Claude Certified Architect — Foundations",
    status: "In progress",
  },
] as const satisfies readonly Certification[];

export const INDUSTRIES = [
  "Life sciences",
  "Talent technology",
  "Digital Twin",
  "Retail",
  "Higher education",
  "Consumer goods",
  "Hospitality",
  "M&A",
  "Oil & Gas",
] as const;

export const CONTACT = {
  heading: "Contact",
  body: "If you are running AI pilots where the constraints are real—regulated industries, enterprise data, people whose work changes—and need someone to own the delivery around them, I would like to talk.",
} as const;
