# Santiago López Zavaletta — Personal site

Single-page portfolio for a Technical Project Manager running enterprise AI and
software delivery — staffing, P&L, risk, adoption and the client decisions that
follow — and heading into AI in clinical development. The page is alive: a
kinetic name, a ledger of what is true right now, and a brief the reader can
operate.

[![Next.js](https://img.shields.io/badge/Next.js-15-C23B2A?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-C23B2A?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-C23B2A?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-C23B2A?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Playwright](https://img.shields.io/badge/Playwright-axe-C23B2A?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev)
[![Vercel](https://img.shields.io/badge/Vercel-deploy-C23B2A?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

**[slzavaletta.com](https://slzavaletta.com)**

## Highlights

- **Personal Editorial direction.** Paper, ink, field gray and one vermilion
  signal, in OKLCH, with a dark scheme that swaps values but keeps every role.
  Automatic from the system preference, overridable from the header.
- **Kinetic name.** Archivo variable with its width axis alive: each line
  settles from condensed to rest on load, then the name narrows as it scrolls
  under the header and opens toward the pointer. Static under reduced motion.
- **A ledger of what is true now.** Role, next role, what is being built and
  learned, the last public push (fetched on the server, revalidated hourly),
  and availability.
- **Evidence sits next to the claim.** Five figures and three dossiers, every
  number attached to the sentence it supports. Employer figures are ranges.
- **The brief as an instrument.** Five fields as a radio group with roving
  focus; the panel argues the selected field — what fails when it is missing,
  and one example from the work.
- **Motion as structure.** CSS scroll-driven traces on the dossiers and the
  timeline, a scroll hairline on the header, drawn underlines. No Motion
  runtime; the only scripts are the header, the name, the instrument and the
  deep-link handler.

## Accessibility and resilience

- **Nothing is gated on JavaScript.** The hero, the ledger and the brief render
  complete in the server HTML; scripts only add behaviour.
- **WCAG 2.2 AA in both schemes**, verified by axe on every PR (`npm run
  test:a11y`) and by hand: one `h1`, skip link, visible focus, 44px targets,
  usable at 320px.
- **`prefers-reduced-motion` is a path, not a switch.** The name sits at rest,
  entrances land instantly, traces are drawn — but the header hairline keeps
  tracking scroll depth because it conveys state.
- **Security by default.** CSP with no third-party origin, hardening headers,
  `security.txt`, no analytics, `noopener noreferrer`, fragment lookup by id.

## Stack

Next.js 15 (App Router, RSC, ISR) · React 19 · Tailwind v4, CSS-first · Base UI
/ Shadcn · Archivo (variable, `wdth`) + Source Sans 3 + IBM Plex Mono via
`next/font` · Lucide · Playwright + axe · TypeScript 5.

## Run it

> Node 18.18+ (20+ recommended)

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (ISR, revalidates hourly)
npm run verify     # eslint + tsc + prettier --check
npm run test:a11y  # Playwright + axe against `next start`
```

Optional: a `GITHUB_TOKEN` environment variable raises the GitHub API rate
limit for the ledger's "Last push" row. Without it the public limit is ample.

## Where things live

```
app/
├─ page.tsx                 # page structure, reading order, revalidation
├─ layout.tsx               # metadata, fonts, theme boot script, JSON-LD
├─ globals.css              # palette (light/dark), type, layout, motion
├─ lib/content.ts           # copy, facts, ROLE_TRANSITION, NOW, BRIEF
├─ lib/site.ts              # URL, name, email, content date
├─ lib/github.ts            # server-only fetch for the ledger
└─ components/
   ├─ KineticName.tsx       # the name's width axis
   ├─ Ledger.tsx            # what is true now (server)
   ├─ BriefInstrument.tsx   # the five fields as a radio group
   ├─ theme/                # boot script and toggle
   └─ *.tsx                 # editorial sections
components/ui/              # Base UI primitives: button, badge, sheet
tests/                      # Playwright + axe
```

There is no `tailwind.config` — Tailwind v4 is configured entirely from
`app/globals.css`, where the OKLCH palette lives in `:root` and `@theme inline`
re-exports it as utilities. Most content edits are one file:
`app/lib/content.ts`. When the new role starts, swap `current` and `next` in
`ROLE_TRANSITION` and bump `CONTENT_UPDATED_ON` in `app/lib/site.ts`.
