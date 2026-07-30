# Personal Editorial + Deployment Fieldbook — Implementation Plan

## Outcome

Replace the current dark developer-portfolio presentation with a light, editorial portfolio that:

- presents Santiago López Zavaletta accurately as a Technical Project Manager and Scrum Master;
- proves current AI and software delivery experience without claiming an AI Deployment Manager title;
- makes the move toward AI deployment legible through present work, systems, learning, and a practical pilot decision brief;
- feels human, warm, professional, and visually specific rather than template-driven;
- preserves the approved facts and removes generic AI-flavored slogans.

## Guardrails

- Keep the existing Next.js 15 / React 19 / Tailwind 4 stack.
- Preserve the user-owned `README.md` edit and untracked `.claude/` directory.
- Keep the CV download, LinkedIn, GitHub, and email paths working.
- Do not publish or push without a separate request.
- Do not imply that exploratory AI engineering tools are production expertise.
- Do not use animated counters, scramble text, cycling words, ambient canvases, glows, marquees, command palettes, or scroll hijacking.
- Keep essential content available without client-side animation.

## Design system foundation

### Files

- `components.json`
- `app/globals.css`
- `app/layout.tsx`
- `components/ui/*`
- `lib/utils.ts`

### Work

1. Initialize Shadcn for this existing Tailwind v4 project using CSS variables.
2. Add only the primitives that materially improve semantics and accessibility:
   `Button`, `Sheet`, `Separator`, and `Badge`.
3. Replace Shadcn's default visual tokens with the approved editorial palette:
   paper, ink, signal, field, graphite, and inverse.
4. Define typography, grid, spacing, focus, selection, and motion tokens.
5. Use Archivo for display, Source Sans 3 for reading, and IBM Plex Mono for utility text.
6. Keep Shadcn styling semantic; use layout classes around components rather than one-off color overrides.

## Content model

### File

- `app/lib/content.ts`

### Work

1. Replace the old “lead/build/lab” taxonomy with the approved narrative:
   hero, proof, current work, next move, case studies, pilot brief, systems, tools, experience, certifications, contact.
2. Keep facts bounded to the CV, current JD, and owner-approved portfolio facts.
3. Label Claude Certified Architect as “in progress.”
4. Label Mastra, LangGraph, Langfuse, and pgvector as tools being explored.
5. Write concise US business English with direct nouns, verbs, and evidence.

## Page composition

### Files

- `app/page.tsx`
- `app/components/SiteHeader.tsx`
- `app/components/EditorialHero.tsx`
- `app/components/ProofBand.tsx`
- `app/components/CurrentAndNext.tsx`
- `app/components/CaseStudies.tsx`
- `app/components/PilotDecisionBrief.tsx`
- `app/components/SystemsAndTools.tsx`
- `app/components/ExperienceAndCredentials.tsx`
- `app/components/ContactFooter.tsx`

### Work

1. Build a calm desktop header and an accessible Shadcn `Sheet` for mobile navigation.
2. Compose the asymmetric hero with a large name, grounded role copy, and useful contact actions.
3. Follow claims with a compact proof band.
4. Put current TPM/Scrum Master responsibility next to the AI deployment direction, without inventing a title.
5. Render three full case-study articles with restrained Fieldbook marginalia.
6. Add a one-page pilot decision brief framed as a working decision tool.
7. Present built systems and the curated tool matrix in an inverse section.
8. Close with a scannable career timeline, certifications, and a direct hiring invitation.

## Motion

### Files

- `app/components/motion/Reveal.tsx`
- `app/components/motion/HeroReveal.tsx`
- `app/components/motion/DecisionTrace.tsx`
- `app/components/SystemsAndTools.tsx`
- `app/globals.css`

### Work

1. Use 150 ms quick interactions, 250 ms ordinary transitions, and 500 ms only for the hero/trace reveal.
2. Keep movement to 12 px or less and use `cubic-bezier(.22,1,.36,1)`.
3. Animate hero lines once, draw the decision trace once, and make the tool matrix respond only to user interaction.
4. Preserve layout and content when JavaScript is unavailable.
5. Disable non-essential motion under `prefers-reduced-motion`.

## Metadata and generated imagery

### Files

- `app/layout.tsx`
- `app/opengraph-image.tsx`
- `app/twitter-image.tsx`
- `app/icon.svg`
- `app/robots.ts`
- `app/sitemap.ts`

### Work

1. Set the public title to “Technical Project Manager.”
2. Describe current AI/software delivery and future AI deployment direction honestly.
3. Match Open Graph, Twitter, favicon, browser theme, JSON-LD, robots, and sitemap to the new identity.

## Cleanup

### Files

- old components under `app/components/`
- old motion components under `app/components/motion/`

### Work

1. Remove unused terminal, canvas, count-up, chart, command-menu, and old card components after the replacement builds.
2. Remove dependencies only when they are no longer used.
3. Keep vendored tool logos and the CV asset.

## Verification

1. Install the lockfile dependencies.
2. Run TypeScript checking and a production build.
3. Run a local production-like server and inspect:
   1440 px, 768 px, 390 px, and 320 px.
4. Check:
   no horizontal overflow, no console errors, mobile navigation, keyboard order, focus visibility, target sizes, reduced motion, 200% zoom, link targets, CV download, and semantic heading order.
5. Search the final source for:
   the old role title, banned slogans, AI-slop phrases, mojibake, stale dark-theme metadata, and unsupported metrics.
6. Capture final desktop and mobile screenshots and compare them with the approved direction.
7. Run a final transitions-polish pass and re-verify.
