# Product

Derived from `docs/superpowers/plans/2026-09-02-living-editorial-redesign-plan.md`
and the original brief in
`docs/superpowers/specs/2026-07-30-personal-editorial-deployment-portfolio-design.md`.
The plan wins where the two disagree. This file is the short strategic summary
that design tooling reads first.

## Register

brand

Single-route personal portfolio that is alive: it moves with intention, shows
data that changes without a deploy, and lets the reader operate one instrument.
The design _is_ the product: a visitor's impression is the deliverable.

## Users

Hiring managers, deployment leaders, technical executives, recruiters and peers
in customer-facing AI delivery — increasingly in regulated industries. They
arrive skeptical, skim on a laptop between meetings, and are deciding one
thing: is this person worth a conversation?

The job to be done: verify that a Technical Project Manager with ten years of
delivery, financial and operational ownership, and hands-on AI tooling is a
credible owner of AI deployment work — without being asked to take a title
claim on faith.

## Product Purpose

Make a qualified visitor want to talk to Santiago about AI deployment work.

Present him truthfully: Technical Project Manager at Globant, joining Syneos
Health as Senior Technical Program Manager in October 2026. The career arc is
life-sciences delivery → enterprise infrastructure → AI and digital delivery at
scale → AI in clinical development. The positioning line: AI deployment where
the constraints are real — regulated industries, enterprise data, and people
whose work changes.

Success: the visitor can name what he owns, what he has proven, what he is
preparing for and what is true right now, and can find the résumé and the
email in one pass.

## Brand Personality

Direct, observant, self-aware.

First person. Short concrete sentences. The unglamorous parts of delivery named
out loud — budgets, staffing, dependencies, risk, hard conversations. Numbers
only when they are proof, and never an employer's confidential figures.
Confidence comes from specificity, never from adjectives. Sentence-case
headings. Links are destinations or actions.

Emotional goal: the calm of someone explaining their actual work, on a page
that is visibly awake.

## Anti-references

- The generic "developer portfolio": terminal chrome, scramble text, count-up
  numbers, cycling verbs, ambient canvas, command palette, hover glow, card
  lifts, logo walls.
- Purple/blue "AI brand" palettes, gradients, glassmorphism.
- Consultant-speak: "bridging the gap", "at the intersection of", "seamless",
  "transformative", "unlock", "elevate".
- Framework theater: circular diagrams, five-step process graphics, dashboards,
  fictional demos with toy data.
- Desired-role language written as if it were current experience.
- Reveal-on-every-section motion.

## Design Principles

1. **Alive is not noisy.** Three kinds of life, one strong instance each:
   motion with intention (the name), data that changes (the ledger), and
   interactivity that demonstrates judgment (the brief instrument). Everything
   else is still.
2. **Proof is attached to the claim.** Evidence sits next to the sentence it
   supports, never in a free-floating stats band.
3. **Show the artifact, not the framework.** The brief renders as a document
   the reader can operate, not as a methodology chart.
4. **Whitespace groups; rules are structural.** 1px hard rules are reserved
   for navigation, indexes and real structural breaks.
5. **The name is the identity device.** Oversized Archivo with its width axis
   alive carries recall; nothing else competes at that scale.
6. **Motion follows reading order.** One choreographed hero moment, structure
   that draws itself as the reader arrives, precise response on hover and
   focus. CSS first; script only where CSS cannot reach.
7. **Say what is current, what is exploratory and what is next.** The ledger
   and the labels make the interface unable to overstate depth.

## Visual System

Paper, ink, field gray and one vermilion signal in OKLCH, with a dark scheme
that swaps values but keeps every role. Archivo (display, variable with
`wdth`), Source Sans 3 (reading), IBM Plex Mono only for dates and figures.
Twelve-column editorial grid, one inverse band (Approach), square corners.

## Accessibility & Inclusion

WCAG 2.2 AA, verified with axe in both schemes and by hand. Single `h1` with a
logical heading hierarchy, skip link preserved, visible focus in the signal
color with a high-contrast offset, full keyboard reach in logical order, the
brief instrument as a real radio group with roving focus, no color-only state,
decorative rules and numerals hidden from assistive tech, 44px touch targets,
usable at 320px, and a static path for every animation under
`prefers-reduced-motion`. The clock never announces itself.
