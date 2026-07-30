# Personal Editorial × Deployment Fieldbook

Design specification for the Santiago López Zavaletta portfolio redesign.

Date: 2026-07-30

Status: Approved direction; written specification pending final user review

Audience: Hiring managers, deployment leaders, technical executives, recruiters, and peers hiring for customer-facing AI delivery roles

## 1. Outcome

The site should make a qualified visitor want to interview Santiago.

It will present him truthfully as a Technical Project Manager and Scrum Master with more than ten years of technical delivery experience, strong financial and operational ownership, and growing hands-on depth in AI tooling. It will make the move toward AI Deployment Manager feel like a credible continuation of his career rather than a title claim.

The redesign keeps the strongest evidence from the current site while replacing its generic “developer portfolio” language. The base direction is Personal Editorial: large typography, a recognizable voice, hard editorial rules, asymmetry, and high recall. It borrows three elements from Deployment Fieldbook:

1. proof attached to every major claim;
2. case studies organized around constraints, decisions, and signals;
3. a pilot decision brief that shows what Santiago wants made explicit before an AI pilot begins.

## 2. Sources of truth

Copy and metadata must use these sources in this order:

1. direct statements from Santiago in this thread;
2. `D:\OneDrive\Downloads\TPM Job Description.pdf` for current responsibilities;
3. `public/SantiagoLopezZavaletta_CV.pdf` for career history and credentials;
4. existing owner-approved facts in `app/lib/content.ts`;
5. the official OpenAI AI Deployment Manager - Pilots job description for the target capability model, paraphrased rather than copied.

### Claims that are safe to use

- Current role: Technical Project Manager.
- Current practice includes Scrum Master responsibilities.
- More than ten years across technical delivery, systems, and program work.
- Project portfolios from USD 700k to USD 5M.
- P&L and financial forecasting ownership.
- Account margin improvement from 40% to 45%.
- Cross-functional teams of up to 36 people.
- Delivery across the United States and Latin America.
- Digital Twin Studio leadership, six POCs, approximately five weeks to the first POC, and a USD 90k fixed-price delivery.
- M&A work covering four deals, approximately 940 people, and four countries.
- Enterprise infrastructure and security experience at ExxonMobil.
- Certified ScrumMaster and SAFe 6 Agilist.
- Claude Certified Architect is in progress, not completed.
- Scope Sentinel, SOW Intake, self-hosted infrastructure, and the tools already listed in the site are personal or professional practice as described in the current content.

### Claims to avoid

- Do not call Santiago an AI Deployment Manager today.
- Do not change the current title to Senior AI Project Manager.
- Do not imply that the Claude Certified Architect credential is complete.
- Do not claim direct ownership of ChatGPT Enterprise or Codex enterprise pilots unless Santiago later supplies that evidence.
- Do not present exploratory AI engineering tools as production-level expertise.
- Do not reveal client names where the existing content intentionally anonymizes them.

## 3. Voice

The voice is direct, observant, warm, and professionally self-aware. It should sound like a capable person explaining his work, not a brand campaign explaining a persona.

### Voice rules

- Use first person.
- Prefer short, concrete sentences.
- Name the unglamorous parts of delivery: budgets, staffing, dependencies, risk, reporting, and hard conversations.
- Use numbers only when they add proof.
- Let confidence come from specificity.
- Explain the move toward AI deployment as an informed next step.
- Keep headings in sentence case.
- Write links as destinations or actions.

### Language to remove

The following phrases and patterns are excluded:

- “The manager an engineer respects and a VP understands.”
- “I turn complex technology into adopted, measurable outcomes.”
- “I lead complicated work without pretending it’s simple.”
- “My edge is translation, judgment, and momentum.”
- “Bridging the gap.”
- “At the intersection of…”
- “Seamless,” “transformative,” “next-generation,” “game-changing,” “unlock,” “elevate,” or “revolutionize.”
- Generic clusters such as “strategy, innovation, and impact” without a concrete example.
- Desired-role language written as if it were current experience.

## 4. Working copy

This is the baseline copy for implementation. It may be tightened for line breaks, but its meaning and voice should remain intact.

### Navigation

- Work
- Approach
- Tools
- Experience
- Contact

Primary navigation action: `Email Santiago`

### Hero

Role line:

> Technical Project Manager and Scrum Master at Globant.

Display name:

> Santiago<br />
> López Zavaletta

Primary statement:

> I run AI and software delivery—from staffing and P&L to Scrum, risk, and client decisions.

Supporting copy:

> My career started in infrastructure. Today I work between clients, executives, and technical teams across the United States and Latin America.

Career direction:

> I’m preparing for the next step: helping companies choose, pilot, and scale AI that people actually use.

Primary action: `Read the work`

Secondary action: `Download résumé`

### Proof index

- `10+ years` — across infrastructure and technical delivery
- `$5M` — current AI delivery account
- `40% → 45%` — account margin after staffing and delivery improvements
- `6 POCs` — delivered while building a Digital Twin capability from scratch

### Current work and next work

Heading:

> What I do now. What I’m preparing to do next.

Current practice:

> At Globant, I own scope, budget, staffing, timelines, dependencies, risk, client communication, and the Scrum cadence for distributed software teams. I use financial and delivery metrics to make tradeoffs early, while the team still has room to act.

AI deployment direction:

> AI can produce a persuasive demo long before a company knows how to adopt it. The harder work is choosing the right use case, handling data and security constraints, helping people change how they work, and deciding whether the signal is strong enough to scale. That is the work I want to lead next.

Credential note:

> I’m pursuing the Claude Certified Architect certification and building hands-on depth through delivery tooling, automation, self-hosted infrastructure, and experiments with agent workflows.

### Selected work

Section heading:

> Selected work.

Intro:

> Three examples, with the constraints and operating decisions left in.

#### Case 01: AI delivery

Title:

> Improving margin and reducing overhead on a $5M AI account.

Summary:

> A multidisciplinary AI account had margin pressure and too much manual delivery work. I owned staffing, capacity, and P&L for a 20-person delivery team within a 40-person account, ran Scrum and governance, and automated recurring work with Claude and Jira. Account margin moved from 40% to 45%.

Fieldbook annotations:

- Context: AI delivery across data science, engineering, front-end, and DevSecOps.
- Constraint: margin pressure and recurring operational overhead.
- Work: staffing mix, capacity planning, RAID governance, Scrum, and workflow automation.
- Signal: five percentage points of margin improvement.

#### Case 02: Digital Twin Studio

Title:

> Building a Digital Twin capability before there was a playbook.

Summary:

> Globant wanted a Digital Twin capability in a domain that was new to the team. I led a five-person LATAM POD, delivered a six-month fixed-price factory twin, worked with external partners, and supported presales. The first POC took roughly five weeks; the studio went on to deliver six.

Fieldbook annotations:

- Context: a new real-time 3D capability with no existing delivery model.
- Constraint: unfamiliar domain, external partners, and a fixed-price commitment.
- Work: team design, vendor coordination, POC delivery, and a repeatable studio model.
- Signal: six POCs, approximately five weeks to the first, and a USD 90k fixed-price delivery.

#### Case 03: M&A and corporate development

Title:

> Coordinating four M&A programs across four countries.

Summary:

> I coordinated due diligence across three Latin American acquisitions and the post-merger integration of a European firm. The work covered legal, marketing, IT, and change-management risk across approximately 940 people.

Fieldbook annotations:

- Context: simultaneous due diligence and post-merger work.
- Constraint: different countries, functions, and decision owners.
- Work: cross-functional coordination, risk tracking, stakeholder communication, and integration planning.
- Signal: four deals covering approximately 940 people.

### Pilot decision brief

Section label:

> Preparing for AI deployment

Heading:

> Before a pilot starts, I want five things written down.

Supporting copy:

> This is a working brief for the practice I’m building toward, informed by my current TPM work. It is not a claim that I already run a formal AI deployment practice.

Five fields:

1. **The business problem**

   What is costly, slow, risky, or otherwise worth changing?
2. **The users**

   Whose workflow needs to change, and what support will they need?
3. **The constraints**

   What do data access, security, integrations, time, and competing tools allow?
4. **The success signal**

   What evidence would be credible enough to act on?
5. **The decision**

   What will the evidence allow the customer to stop, fix, expand, or buy?

The artifact is shown as a one-page annotated brief, not a circular framework or a five-step process diagram.

### Selected systems

Section heading:

> Delivery systems I build.

#### Scope Sentinel

> Client requests rarely arrive with a clean label. Scope Sentinel reads the request against the SOW, cites the exact clause, estimates the effort, and drafts the next step. It refuses to guess when the evidence is missing.

Actions:

- `Try the walkthrough`
- `View the source on GitHub`

#### SOW Intake

> SOW Intake turns a contract into a cited delivery baseline that people and agents can use. Missing evidence is marked as missing instead of being filled in with a plausible answer.

Action: `View the source on GitHub`

Self-hosted infrastructure appears as a compact supporting note, not a third equal card:

> I also run the infrastructure behind my own experiments: Docker, Caddy, Tailscale, n8n, project tracking, and personal agents on a self-hosted VPS.

### Tools

Section heading:

> Tools, grouped by how I use them.

Intro:

> Tools matter when they shorten a feedback loop, make a decision easier to trace, or remove work a team should not be doing by hand.

Groups:

- **Run the work:** Jira, Azure DevOps, Linear, Figma.
- **Build and automate:** Claude, ChatGPT / Codex, Gemini, n8n.
- **Ship and operate:** Python, Bash / PowerShell, GitHub, Docker.
- **Explore AI systems:** Mastra, LangGraph, Langfuse, pgvector.
- **Read the signal:** Power BI.

The “Explore AI systems” label is mandatory. It prevents the interface from overstating depth with tools that are part of active learning.

### Experience

Section heading:

> How I got here.

Timeline:

- **Globant · 2021–present**

  Technical Project Manager and Scrum Master. AI delivery, Digital Twin, hospitality, and M&A work across the United States and Latin America.
- **XOOR · 2022**

  Freelance Project Manager for web and mobile delivery.
- **ExxonMobil · 2018–2021**

  System Administrator working on enterprise infrastructure, security, reporting, and service transition.
- **gA · 2014–2018**

  Technical Project Lead for enterprise migration and performance-testing programs in life sciences.

Credentials:

- Certified ScrumMaster, Scrum Alliance.
- Certified SAFe 6 Agilist, Scaled Agile.
- Claude Certified Architect, in progress.

### Contact

Heading:

> I want my next chapter to be in AI deployment.

Supporting copy:

> If you’re hiring someone to run pilots, work through client constraints, and turn early evidence into a clear decision, email me.

Actions:

- `Email Santiago`
- `Connect on LinkedIn`
- `View GitHub`

## 5. Visual system

### Palette

The page is light and predominantly neutral. Vermilion is a signal color, not a decorative wash.

| Token | Hex | Use |
| --- | --- | --- |
| Paper | `#F6F7F5` | Primary background |
| Ink | `#111411` | Primary text and hard rules |
| Signal on light | `#C23B2A` | Marginalia, active states, and decision traces on light surfaces |
| Signal on dark | `#F26B50` | Signal text and controls on dark surfaces |
| Field | `#E6EBE8` | Dossier panels and secondary surfaces |
| Graphite | `#59625D` | Secondary text |
| Inverse | `#151715` | Tools and closing sections |

No gradients. No purple or blue AI palette. No glow. Shadows are limited to temporary elevation during interaction and use a green-black tint.

### Typography

- **Display:** Archivo variable, used for the name, case titles, and major statements.
- **Body:** Source Sans 3, used for paragraphs, navigation, and controls.
- **Utility:** IBM Plex Mono, used for dates, metrics, fieldbook annotations, and labels.

The name is the largest visual element. Utility type encodes evidence and metadata; it is not sprinkled across the page for a developer aesthetic.

Type behaviors:

- Display text uses tight tracking and line height.
- Body text is limited to approximately 62 characters per line.
- Headings use sentence case.
- Large text uses `text-wrap: balance`; paragraphs use `text-wrap: pretty`.
- Metrics use tabular figures.

### Layout

- Maximum canvas: 1440px.
- Twelve-column editorial grid on desktop.
- One-pixel hard rules are reserved for navigation, the proof index, and major structural changes. Whitespace does most of the grouping.
- Corners are square or very slightly rounded; the design does not use a universal card radius.
- The hero uses the full name as a two- or three-line composition with an asymmetric supporting column.
- Sections alternate between full-width indexes and narrower reading columns.
- Case studies are full editorial articles rather than equal cards or hidden disclosures.
- Fieldbook annotations sit in the margin on wide screens and move inline on smaller screens.

High-level desktop sequence:

```text
┌──────────────────────────────────────────────────────────────┐
│ SLZ / BUENOS AIRES            WORK APPROACH TOOLS CONTACT   │
├──────────────────────────────────────────────────────────────┤
│ SANTIAGO                                                     │
│      LÓPEZ ZAVALETTA            current role + statement    │
│ ───────────────────────────────────────────────────────────  │
│ AI + SOFTWARE DELIVERY: P&L, SCRUM, RISK, CLIENT DECISIONS   │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│ 10+ YEARS    │ $5M AI       │ 40→45%      │ 6 POCs          │
├──────────────┴──────────────┬──────────────┴─────────────────┤
│ WHAT I DO NOW               │ WHAT I’M PREPARING FOR         │
├─────────────────────────────┴────────────────────────────────┤
│ SELECTED WORK INDEX → THREE FULL EDITORIAL CASES             │
│   context │ constraint │ work │ signal                       │
├──────────────────────────────────────────────────────────────┤
│ ONE-PAGE PILOT DECISION BRIEF                                │
├──────────────────────────────┬───────────────────────────────┤
│ SCOPE SENTINEL               │ SOW INTAKE                    │
├──────────────────────────────┴───────────────────────────────┤
│ TOOL INDEX / CAREER THREAD                                   │
├──────────────────────────────────────────────────────────────┤
│ CONTACT                                                      │
└──────────────────────────────────────────────────────────────┘
```

## 6. Signature element

The signature element is **editorial marginalia connected by a decision trace**.

Small vermilion annotations mark the constraint, decision, and signal within each case. A thin red line draws between those related facts as the case enters the viewport. The pilot decision brief uses the same annotation language without connecting unrelated sections.

The line represents a true relationship in the content. It is not a decorative timeline and does not run through unrelated sections.

The oversized name from Personal Editorial remains the primary identity device. A rotating “TPM now / AI deployment next” stamp from the mockup is removed; it reads as a trend device and makes the career transition feel like a slogan.

## 7. Motion

Motion is restrained and tied to reading order.

### Motion tokens

- Fast interaction: 150ms.
- Standard transition: 250ms.
- Editorial reveal: 500ms.
- Maximum entrance distance: 12px.
- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)`.

### Orchestrated moments

1. **Hero load**

   The name reveals line by line through a clip mask. The role and statement enter after it with a short stagger.
2. **Decision trace**

   The red rule draws only when its related case enters the viewport.
3. **Case index**

   The index links to three complete articles already visible in the document. Hover or focus moves the active rule; no content is hidden behind JavaScript.
4. **Tool matrix**

   Selecting a category shifts its tools into emphasis and reveals one line explaining how that category is used. There is no autoplay marquee.
5. **Links and controls**

   Underlines draw from left to right; pressed states move by one pixel.

### Motion removed from the current site

- Ambient canvas.
- Scramble text.
- Cycling verbs.
- Count-up numbers.
- Continuous status-dot breathing.
- Command palette.
- Generic reveal animation on every section.
- Hover glow.
- Scroll hijacking or inertia libraries.

Every motion behavior has a static `prefers-reduced-motion` path.

Essential content renders visible without JavaScript. The implementation does not animate `height`; disclosures use native layout on mobile and visual emphasis relies on transforms and opacity.

## 8. Responsive behavior

### Desktop, 1200px and above

- Full twelve-column composition.
- Marginalia sits outside the main reading column.
- The case index navigates to three full articles in normal document flow.

### Tablet, 768px–1199px

- Eight-column composition.
- Case metadata moves beside or immediately below the title.
- Tool groups remain interactive but use fewer simultaneous columns.

### Mobile, below 768px

- Four-column grid.
- Name wraps intentionally without horizontal overflow.
- A real menu exposes every navigation destination.
- Touch targets are at least 44px.
- Marginalia becomes inline labels.
- Cases remain fully readable in sequence; no sticky split view or disclosure is required.
- Tool categories become accessible disclosure rows.
- Hero fits the content rather than forcing `100dvh`.

The site must remain usable at 320px.

## 9. Accessibility

- Preserve the skip link.
- Use one `h1`; sections follow a logical heading hierarchy.
- Provide visible keyboard focus with the signal color and a high-contrast offset.
- Navigation, case controls, tool categories, and mobile disclosures work by keyboard.
- Do not use color alone to identify the active case or tool category.
- Decorative arrows and rules are hidden from assistive technology.
- Meaningful diagrams receive concise accessible descriptions.
- Announce disclosure state with native semantics or `aria-expanded`.
- External links are identified consistently.
- Respect `prefers-reduced-motion`.
- Maintain WCAG AA contrast for body text and controls.

## 10. Technical structure

Keep the current stack:

- Next.js App Router.
- React.
- TypeScript.
- Tailwind CSS v4 and the existing global CSS layer.
- Motion for the small number of interactions that require it.
- Phosphor icons only where a symbol improves comprehension.

The page remains a single route. Server Components are the default; client boundaries are limited to navigation, case interaction, the tool index, and motion observers.

Recommended component boundaries:

- `SiteHeader`
- `EditorialHero`
- `ProofIndex`
- `NowNext`
- `WorkIndex`
- `CaseDossier`
- `PilotDecisionBrief`
- `SelectedSystems`
- `ToolIndex`
- `CareerThread`
- `ContactSection`
- `LineReveal`

`app/lib/content.ts` remains the source for typed copy and facts. Decorative structure belongs in components, not in the content file.

Old components that no longer serve the direction should be deleted rather than left dormant.

## 11. Metadata and sharing

- Title uses the real current role: `Santiago López Zavaletta — Technical Project Manager`.
- Description names technical delivery, Scrum leadership, P&L ownership, and the move toward AI deployment without changing the current title.
- JSON-LD uses `Technical Project Manager`.
- Open Graph and Twitter images adopt the oversized-name editorial system.
- Canonical URL, sitemap, robots, LinkedIn, GitHub, email, and résumé links remain functional.

## 12. Performance

- Remove the full-screen animated canvas.
- Avoid runtime logo probing; use vendored assets directly.
- Keep the initial page mostly server-rendered.
- Animate transforms, opacity, and clip paths rather than layout properties where possible.
- Do not add a smooth-scroll dependency.
- Fonts load through `next/font` and are subset appropriately.
- No interaction requires an external API.

## 13. Validation

The redesign is complete only when all of the following pass:

1. `npm run build` succeeds.
2. TypeScript reports no errors.
3. The page renders without console errors.
4. All internal, résumé, email, LinkedIn, and GitHub links work.
5. Desktop screenshots at 1440px show no accidental overflow or orphaned text.
6. Tablet screenshots at 768px retain hierarchy and readable case content.
7. Mobile screenshots at 390px and 320px show no horizontal overflow.
8. Keyboard navigation reaches every interactive element in a logical order.
9. Focus is visible.
10. Reduced-motion mode removes nonessential movement.
11. Body copy and controls meet WCAG AA contrast.
12. Current title, certification status, and exploratory tool labels are factually correct.
13. The banned language in section 3 does not appear.
14. The new site is visually and structurally distinct from the backed-up dark terminal design.

## 14. Non-goals

- A blog or CMS.
- A contact form or backend.
- Multiple case-study routes.
- A live AI API call.
- Claiming the target role before it is earned.
- Recreating Tomás Holtz’s site.
- Adding decorative motion to every section.
- Preserving old components solely because they already exist.

## 15. Design self-review

- No placeholder, TODO, or unresolved design decision remains.
- The copy distinguishes current work, active learning, and target role.
- The visual system has one primary risk: oversized identity typography.
- The Fieldbook contribution is limited to evidence structure and decision traces; it does not turn the site into a dashboard.
- The tools section separates regular use from exploration.
- The motion system has one orchestrated hero moment and one repeated evidence behavior.
- The implementation scope fits one single-page portfolio redesign.
