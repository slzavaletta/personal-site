# Santiago López Zavaletta — Personal site

Single-page site for a Technical Project Manager running enterprise AI and
software delivery — staffing, P&L, risk, adoption and the client decisions
that follow — and heading into AI in clinical development. The page is alive
because the paper follows Buenos Aires time, the ledger is what is true
right now, and the brief is a document the reader can operate.

[![Next.js](https://img.shields.io/badge/Next.js-15-10243A?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-10243A?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-10243A?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-10243A?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Playwright](https://img.shields.io/badge/Playwright-axe-10243A?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev)
[![Vercel](https://img.shields.io/badge/Vercel-deploy-10243A?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

**[slzavaletta.com](https://slzavaletta.com)**

## Highlights

- **Río de la Plata direction.** Cool celeste paper and navy ink, with gold
  reserved for the Sun of May. Paper still follows the Buenos Aires hour,
  but it stays in the celeste family — not plaster. Headings in Fraunces.
  Body in Source Sans 3. Dark is a scheme the reader can pin.
- **The Sun of May.** A gold Sol de Mayo — computed rays, faced disc — sits
  in the navy cover panel, closes the night band as a colophon («Sean
  eternos los laureles…»), and marks the favicon and the share card.
- **A page in bands, not one cream column.** Ledger, approach and systems
  sit on filled fields. Systems is a two-column board of project cards and
  wrapping tool chips — no double rule, no empty right. Cases are gold-ruled
  cards. Experience opens with a navy table header.
- **Motion with intent.** The cover headline enters word by word through
  masks; sections rise on scroll via CSS `view()` timelines; hovers draw
  celeste underlines, wash rows, and return brand colour to tool marks. All
  of it snaps to static under `prefers-reduced-motion`.
- **A ledger of what is true now.** Role, next role, what is being built and
  learned, the last public push (fetched on the server, revalidated hourly),
  and availability with a live pulse.
- **Proof in prose.** One spoken line, then three articles. The outcome is
  the last sentence, not a labelled "result signal".
- **The brief as a document.** Five fields as a radio group with roving
  focus; the selected field expands in place — what fails when it is
  missing, and one example from the work.
- **Experience as a table.** Period, company, title, what he did. Upcoming
  and concurrent called in the period cell, in words.

## Accessibility and resilience

- **Nothing is gated on JavaScript.** The hero, the ledger and the brief
  render complete in the server HTML; scripts only add behaviour.
- **WCAG 2.2 AA in both schemes**, verified by axe on every PR (`npm run
  test:a11y`) and by hand: one `h1`, skip link, visible focus, 44px targets,
  usable at 320px. Contrast is sampled at hours 7, 12, 17 and 21.
- **`prefers-reduced-motion` is a path, not a switch.** Paper temperature
  snaps; the header hairline keeps tracking scroll depth because it conveys
  state.
- **Security by default.** CSP with no third-party origin, hardening
  headers, `security.txt`, no analytics, `noopener noreferrer`, fragment
  lookup by id.

## Stack

Next.js 15 (App Router, RSC, ISR) · React 19 · Tailwind v4, CSS-first · Base
UI / Shadcn · Fraunces + Source Sans 3 via `next/font` · Lucide ·
Playwright + axe · TypeScript 5.

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
├─ globals.css              # paper temperature, type, layout
├─ lib/content.ts           # copy, facts, ROLE_TRANSITION, NOW, BRIEF
├─ lib/site.ts              # URL, name, email, content date
├─ lib/github.ts            # server-only fetch for the ledger
├─ lib/time.ts              # Buenos Aires clock and hour
└─ components/
   ├─ Ledger.tsx            # what is true now (server)
   ├─ BriefInstrument.tsx   # the five fields as a radio group
   ├─ theme/                # boot script and toggle
   └─ *.tsx                 # sections
components/ui/              # Base UI primitives: button, badge, sheet
tests/                      # Playwright + axe
```

There is no `tailwind.config` — Tailwind v4 is configured entirely from
`app/globals.css`. Most content edits are one file: `app/lib/content.ts`.
When the new role starts, swap `current` and `next` in `ROLE_TRANSITION` and
bump `CONTENT_UPDATED_ON` in `app/lib/site.ts`.
