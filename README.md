# Santiago López Zavaletta — Personal site

Personal portfolio for enterprise AI delivery. Next.js 15 App Router, React 19,
TypeScript, Tailwind 4, Base UI, Three.js, Instrument Sans and Source Sans 3.
Fonts are self-hosted from lockfile-pinned Fontsource packages.

[slzavaletta.com](https://www.slzavaletta.com)

## Run

Node 22 is used in CI (minimum 20.9). The lockfile is authoritative.

```bash
npm ci
npm run dev         # localhost:3000
npm run verify      # ESLint, TypeScript, Prettier
npm run build       # required before browser tests
npx playwright install chromium
npm run test:a11y   # production-server browser + HTTP regressions
```

`scripts/dev.mjs` preserves the Next CLI and translates supervised preview flags.
Development uses `.next-dev` so it cannot overwrite a production test build.

The site keeps its existing Vercel/GitHub deployment. A feature branch/PR is
reviewable before merge; no DNS or hosting migration is needed.

## Content and architecture

- `app/lib/content.ts`: canonical public wording and facts, including
  ROLE_TRANSITION, work, experience, BRIEF, systems and current activity copy.
- `app/lib/site.ts`: canonical www URL, name, email, authored update date.
- `app/page.tsx`: positioning and Deployment Atlas map.
- `app/work/[slug]/page.tsx`: three static case pages from canonical content.
- `app/{approach,systems,profile,contact}/page.tsx`: complete topic pages.
- `app/components/DeploymentMap.tsx`: accessible node selection and map/list
  views, measured SVG fallback and optional client enhancement.
- `app/lib/map-geometry.ts`: connector geometry outside complete label bounds.
- `app/components/scene/map.ts`: lazy Three.js traces, brief flow motion,
  on-demand frames, theme handling and full resource disposal.
- `app/components/BriefInstrument.tsx`: keyboard radio group; every panel exists
  in initial HTML. Without JavaScript, all panels remain readable.
- `app/globals.css`: typography, responsive editorial layout, light/dark tokens.
- `app/lib/representations.ts`: full Markdown and llms.txt from canonical copy.
- `middleware.ts` and `app/lib/accept.ts`: explicit Markdown content negotiation.
- `tests/`: WCAG checks, keyboard, resilience and public discovery regressions.

See PRODUCT.md for the approved direction and AGENTS.md for maintenance rules.
Historical design plans remain in docs/superpowers; PRODUCT.md supersedes their
visual decisions. When the new role begins, update ROLE_TRANSITION and its
related experience entries; check all rendered dates and metadata. Bump
CONTENT_UPDATED_ON for reader-visible content changes.

## Progressive enhancement

HTML contains the text, metadata, JSON-LD and destinations. An SVG map is
available before scripts. Three.js loads only for visible desktop/pointer-fine
scenes when motion is permitted and data saving is off. Rendering stops after
the movement settles; leaving the viewport or hiding the tab releases the scene.
No external HDR, CDN scripts or analytics are required. The existing CSP stays.

The header provides light/dark switching on every page. The system preference
is the default; an explicit choice takes precedence, persists locally and syncs
across tabs. The inline boot script prevents the wrong scheme at first paint.
With blocked storage, client navigation retains the manual choice; persistence
after a full reload is unavailable. Theme changes update browser chrome and
recolor the map without restarting its animation.

The spatial map remains the default at all widths. JavaScript measures complete
label groups, including captions, to route connections around text. Without
JavaScript, node links go directly to the cases. A list requires an explicit
choice. All five brief panels remain visible without JavaScript on `/approach`.
Old `/#approach`, `/#systems`, `/#experience` and `/#contact` links route to the
new pages. The shared Sol de Mayo and anthem line remain intact.

The clock follows Buenos Aires. The Now section can show public GitHub activity;
GitHub failures omit that optional row. An optional server-only GITHUB_TOKEN
raises the public API limit. No token is required for the site or agent access.

## Public agent discovery

```bash
curl -I https://www.slzavaletta.com/
curl -H 'Accept: text/markdown' https://www.slzavaletta.com/
curl https://www.slzavaletta.com/index.md
curl https://www.slzavaletta.com/llms.txt
curl https://www.slzavaletta.com/robots.txt
```

Markdown and HTML use the same facts. HTML wins quality ties. The negotiated
response uses `Vary: Accept` and `private, no-store`; `/index.md` is the stable,
cacheable alternative. Link headers advertise existing Markdown and llms.txt.
Content-Signal allows search and AI input, and declines training. It expresses a
preference; it does not enforce access control.

Use [Is It Agent Ready's Content Site profile](https://isitagentready.com/slzavaletta.com?profile=content)
for a relevant scan. The generic scan includes API/auth/MCP checks that do not
represent this portfolio. DNS-AID requires a separate DNS decision and remains
outside this change. Verify negotiation on a Vercel preview and scan production
after deployment; do not infer a live score from local tests.

Next.js 15 rewrites the HTML Vary header to its own Flight fields. The root HTTP
response is therefore explicitly `private, no-store` for both representations;
Next retains its internal ISR cache and GitHub its hourly data cache. Markdown
responses include `Vary: Accept`. `/index.md` remains the public cacheable URL.
