# Santiago López Zavaletta — Personal site

Single-page portfolio for a Technical Project Manager and Scrum Master working
across AI and software delivery, with a clear direction toward AI deployment.

[Next.js](https://nextjs.org)
[React](https://react.dev)
[Tailwind CSS](https://tailwindcss.com)
[TypeScript](https://www.typescriptlang.org)
[Vercel](https://vercel.com)

**[slzavaletta.com](https://slzavaletta.com)**

## Highlights

- **Personal Editorial direction.** Warm paper, ink, field gray, and one red
  signal color, with a restrained Deployment Fieldbook layer.
- **Evidence-led positioning.** Current TPM and Scrum Master experience stays
  distinct from the AI deployment work Santiago is preparing to lead next.
- **Motion with restraint.** A short authored hero sequence, limited section
  reveals, and a decision trace; all respect `prefers-reduced-motion`.
- **Two practical delivery systems.** Scope Sentinel includes an accessible,
  pre-computed walkthrough. SOW Intake links to its source.

## Stack

Next.js 15 (App Router / RSC) · React 19 · Tailwind v4 · Motion · Base UI /
Shadcn · Archivo + Source Sans 3 + IBM Plex Mono · Lucide · Vercel Analytics +
Speed Insights · TypeScript.

## Run it

> Node 18.18+ (20+ recommended)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static)
```

## Where things live

```
app/
├─ page.tsx                 # page structure and reading order
├─ layout.tsx               # metadata, fonts, JSON-LD, analytics
├─ globals.css              # palette, type, layout, and motion tokens
├─ lib/content.ts           # copy and portfolio data
└─ components/              # editorial sections, motion, and demos
components/ui/              # curated Shadcn / Base UI primitives
public/logos/               # local tool marks
```

Most content edits live in `app/lib/content.ts`. The production build is
statically rendered.
