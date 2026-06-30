<div align="center">

# Santiago López Zavaletta — personal site

_Project Manager who builds._ Single-page, dark-editorial portfolio for a Senior AI Project Manager.

[![Next.js](https://img.shields.io/badge/Next.js-15-3FB950?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-3FB950?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-3FB950?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3FB950?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Vercel-deploy-3FB950?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

**[slzavaletta.com](https://slzavaletta.com)**

![Hero](docs/hero.png)

</div>

## Highlights

- **One accent, locked.** Signal green `#3FB950` across the page; the `#3FB950 → #A7F3D0` gradient lives in exactly three spots.
- **Motion with intent.** Entrance / scroll / cursor-driven only, no idle loops, fully `prefers-reduced-motion` safe.
- **Cursor-reactive hero** (Motion values, never React state), **`Cmd`/`Ctrl` + `K`** command palette, and a live **Scope Sentinel** demo - a faithful, pre-computed walkthrough of an agentic Claude skill (no API, no fake loader).

## Stack

Next.js 15 (App Router / RSC) · React 19 · Tailwind v4 · Motion · Geist + Geist Mono · Phosphor · Vercel (Analytics + Speed Insights) · TypeScript.

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
├─ page.tsx          # the single page, section by section
├─ layout.tsx        # metadata, fonts, JSON-LD, analytics
├─ globals.css       # Tailwind v4 tokens + design locks
├─ lib/content.ts    # all copy + data (edit the site here)
└─ components/       # sections + components/motion/* (canvas, reveals, demos)
public/logos/        # vendored, mono-normalized tech logos
```

Most edits are just `app/lib/content.ts`. Deployed on Vercel; pushes to `main` ship automatically.

---

<div align="center"><sub>The manager an engineer respects and a VP understands.</sub></div>
