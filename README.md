# Santiago López Zavaletta — Personal site

Single-page portfolio for a technical delivery leader working in enterprise AI
deployment: choosing the use case, running the pilot, supporting the people
whose work changes, and making the scale-or-stop call on evidence.

[![Next.js](https://img.shields.io/badge/Next.js-15-C23B2A?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-C23B2A?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-C23B2A?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-C23B2A?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Motion](https://img.shields.io/badge/Motion-11-C23B2A?style=flat-square&logo=framer&logoColor=white)](https://motion.dev)
[![Vercel](https://img.shields.io/badge/Vercel-deploy-C23B2A?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

**[slzavaletta.com](https://slzavaletta.com)**

## Highlights

- **Personal Editorial direction.** Paper, ink, field gray and one vermilion
  signal, in OKLCH. The accent carries two values: a brighter one for surfaces
  and rules, a darker one for text, so red type clears AA without dulling the
  identity.
- **Evidence sits next to the claim.** Five roles, five metrics and three cases,
  with every number attached to the sentence it supports rather than pooled in
  a stats band.
- **Motion as instrumentation.** Section entrances, evidence counters, a
  scroll-progress hairline, a section index, and a timeline that draws itself.
  Nothing decorates: each one reveals structure, reflects state, or aids
  navigation.
- **Two practical delivery systems.** Scope Sentinel ships an accessible,
  pre-computed walkthrough — no API call, no fake loader. SOW Intake links to
  its source.

## Accessibility and resilience

The constraints that shaped most of the implementation:

- **Nothing is gated on JavaScript.** Every reveal renders visible in the
  server HTML and is only hidden once the client confirms something can take
  the hiding back off. `IntersectionObserver` is feature-detected, observer
  setup is wrapped, anything already on screen at load is revealed without a
  transition, and a backstop forces visibility if a reveal never fires.
- **13px type floor**, three body sizes, and a separate monospace tier for
  labels.
- **Zero WCAG AA failures**, verified by resolving OKLCH through a canvas and
  walking ancestors for the real backdrop rather than compositing over white.
- **`prefers-reduced-motion` is a path, not a switch.** Content lands at its
  final position with no transition and counters show their final values — but
  the progress hairline and the section index keep working, because they convey
  state rather than decoration.

## Stack

Next.js 15 (App Router, RSC) · React 19 · Tailwind v4, CSS-first · Motion 11 ·
Base UI / Shadcn · Archivo + Source Sans 3 + IBM Plex Mono via `next/font` ·
Lucide · Vercel Analytics + Speed Insights · TypeScript 5.

## Run it

> Node 18.18+ (20+ recommended)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static)
npm run check    # tsc --noEmit
```

## Where things live

```
app/
├─ page.tsx                 # page structure and reading order
├─ layout.tsx               # metadata, fonts, JSON-LD, analytics
├─ globals.css              # palette, type, layout, and motion tokens
├─ lib/content.ts           # copy, portfolio data, section index
└─ components/
   ├─ *.tsx                 # editorial sections and the Scope Sentinel demo
   └─ motion/               # reveals, counters, traces, and their guards
components/ui/              # curated Shadcn / Base UI primitives
public/logos/               # local tool marks
```

There is no `tailwind.config` — Tailwind v4 is configured entirely from
`app/globals.css`, where the OKLCH palette lives in `:root` and `@theme inline`
re-exports it as utilities. Most content edits are one file:
`app/lib/content.ts`. The production build is statically rendered.
