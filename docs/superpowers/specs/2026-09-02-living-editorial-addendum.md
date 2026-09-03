# Living Editorial — addendum to the 2026-07-30 design specification

Date: 2026-09-02

Status: Approved. Supersedes sections 4 (working copy, where changed), 6
(signature element), 7 (motion), 10 (technical structure) and 11 (metadata) of
`2026-07-30-personal-editorial-deployment-portfolio-design.md`. Everything not
mentioned here stands.

Rationale and decisions live in
`docs/superpowers/plans/2026-09-02-living-editorial-redesign-plan.md`.

## Facts

- Current title: Technical Project Manager, Globant (2021–2026).
- Next: Senior Technical Program Manager, Syneos Health, from October 2026.
  Public since 2026-09-02; encoded in `ROLE_TRANSITION` in `app/lib/content.ts`.
- Career arc: life-sciences delivery (gA) → enterprise infrastructure
  (ExxonMobil) → AI and digital delivery at scale (Globant; Eightfold AI
  implementations) → AI in clinical development (Syneos Health).
- Employer figures are ranges: "multi-million-dollar AI account", "margin up
  several points", "fixed-price factory twin", "four deals across Latin America
  and Europe", "portfolios from under $1M to multi-million-dollar accounts".

## Page

Header (mark, live Buenos Aires clock, Work · Approach · Experience · Contact,
theme toggle, Email) → Hero (kinetic name, role line, statement, arc,
direction) → Ledger (Role, Next, Building, Learning, Last push,
Availability) → Evidence (five static figures) → Selected work (three dossiers
at equal weight) → Approach (the brief as an instrument, on the inverse band)
→ Systems and tools (two systems with source links; tools as a typographic
set) → Experience (timeline with the upcoming role first, credentials,
industries) → Contact → Footer.

Removed: count-up metrics, universal reveals, left section index, card lifts,
logo wall, the fictional Scope Sentinel walkthrough, "v0.1" and "SLZ / 2026"
stamps, the red full-bleed panel.

## Signature elements

1. **Kinetic name.** Archivo variable with the `wdth` axis. Each line settles
   from condensed (72) to rest (100) on load, staggered 90ms. Afterwards the
   name narrows toward 86 as it scrolls under the header, and on pointer
   devices the line nearest the cursor opens toward 110. Eased with a lerp;
   the loop stops when settled. Static under reduced motion and without
   JavaScript.
2. **Ledger.** What is true now. The GitHub row is fetched on the server and
   revalidated hourly; the page is ISR (1h). No client fetch, no key in the
   browser, no error state — the row is omitted when unavailable.
3. **Brief instrument.** Five fields as a radio group with roving focus; the
   panel argues the selected field: what fails when it is missing, and one
   anonymised example from the work.

## Motion grammar

- Tier A, identity (once): hero choreography above.
- Tier B, structure (scroll-linked, CSS `animation-timeline: view()`): the
  vermilion trace on each dossier, the timeline rule, marginalia rise. Static
  where unsupported or under reduced motion. The header hairline tracks scroll
  depth and is kept under reduced motion because it is state.
- Tier C, response (150–200ms): drawn underlines, vermilion marginalia,
  instrument selection, theme toggle.

## Colour

Light and dark schemes share roles. Dark is automatic from
`prefers-color-scheme` and overridable with the header toggle; the choice is
stored in `localStorage` and applied by an inline boot script before first
paint. `--on-signal` gives text on vermilion in both schemes.

## Technical structure

Next.js 15 App Router, React 19, Tailwind v4 (CSS-first), Base UI (Sheet,
Button, Badge), Lucide, `next/font`. No Motion runtime. Client components:
`SiteHeader` (menu, clock, theme toggle), `KineticName`, `BriefInstrument`,
`HashTarget`. Everything else is a Server Component.

Security: CSP without third-party origins, hardening headers, `security.txt`,
no analytics, `noopener noreferrer` on external links, fragment lookup by id.

Quality gates: ESLint, Prettier, `tsc`, Playwright + axe (WCAG 2.2 AA in both
schemes, structure, overflow, instrument keyboard behaviour, ledger, theme
persistence) on every PR.
