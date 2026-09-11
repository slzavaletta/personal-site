# Deployment Atlas — implementation review

The former single-page layout and repeated sculpture did not express the
owner's selected design. This implementation replaces them with proposal A:
an asymmetric map of real work, distinct pages and a consistent personal identity.
Palette and typography are provisional while the owner compares the options.

## What is implemented

- Eight real routes: home, three cases, Approach, Systems, Profile and Contact.
- A spatial map with measured connections outside complete label groups,
  explicit map/list selection and links to full cases.
- Optional Three.js traces and a short flow toward delivery governance.
  Geometry is shared with SVG; motion settles and resources are released.
- Self-hosted Instrument Sans / Source Sans 3, white/cobalt and navy/pale-blue
  themes, an engraved Sol de Mayo and the original anthem line.
- Updated social image, canonical URLs, sitemap and Markdown discovery links.
- Complete authored copy in server HTML and Markdown, including every brief
  field and the distinction between current, upcoming and concurrent roles.
- Maintenance instructions in AGENTS.md, PRODUCT.md and README.md.

## Visual choices for review

| Option | Background | Text | Accent | Character |
| --- | --- | --- | --- | --- |
| White / cobalt (provisional) | #F6F8FB | #192334 | #2854D8 | Clear, direct |
| Graphite / copper | #141719 | #F3EFE7 | #D6A77A | Warm, personal |
| Navy / pale blue | #0E192B | #EEF4FE | #A0C5FF | Quiet, technical |

Heading alternatives: Instrument Sans (provisional), IBM Plex Sans and Source
Sans 3. These controls belong to the design comparison, not the public site.

## Verification on September 11, 2026

- Node 22: production build, TypeScript, ESLint and Prettier pass.
- All 43 original paragraphs longer than 60 characters match the saved content
  baseline in server-rendered HTML and the complete Markdown representation.
- Ten HTTP test executions passed: media negotiation, HEAD, discovery, RSC,
  prefetch, per-page canonicals, sitemap and a missing-case 404.
- Live development review: desktop layout, light/dark switching, page navigation,
  map selection, keyboard brief selection and the unavailable-WebGL SVG fallback.
- Static rendering review: exact built HTML/CSS for all eight pages at 320 px,
  both themes, with no axe WCAG-tagged violations or horizontal overflow.
  This review excludes React hydration and is not the complete browser suite.
- The actual geometry function was used with measured production markup at
  320, 390, 540, 768, 1024 and 1440 px. No connector crossed a label group.
  At 320 px and 200% text, an intrinsic grid-width issue was found and fixed;
  the corrected map and case previews reflow without horizontal scrolling.
- The generated social image was inspected at 1200 × 630.

## Remaining verification

`npm run test:a11y` was attempted. Its HTTP tests passed; the 48 browser test
executions could not launch because Chromium was absent. The installation was
blocked by the environment's network allowlist (403). The existing CI workflow
installs Chromium and should run the updated suite before merge.

The available review browser also disables WebGL. The SVG fallback was verified,
but the real GPU animation, interactive production suite, reduced-motion changes
and resource lifecycle still need the full browser run. Do not treat the static
axe review as a WCAG certification or claim an improved live agent-readiness score.

This is local feature-branch development. No GitHub publication, merge, Vercel
deployment or DNS change is included. Recheck root HTTP negotiation on the
existing Vercel preview before production.

## Resumed development: required light/dark modes

The owner resumed development and explicitly required both modes. The shared
header now uses a labeled Light/Dark button with a 44 px minimum target and
keyboard activation. The page follows the system until a reader makes a choice.
Saved choices apply before first paint, persist across reloads and navigation,
and synchronize between tabs. A blocked storage read no longer skips system
detection; a manual choice remains active during client-side navigation when
storage writes fail. Persistence across a full reload still requires storage.
Invalid saved values no longer block live system changes.

Browser theme-color metadata follows the resolved palette, including route
navigation. The Three.js scene changes material colors in place; changing the
theme no longer rebuilds geometry or restarts the delivery flow. Authored copy,
the Sol de Mayo, the anthem and the eight-page architecture are unchanged.

Verification of this follow-up:

- Node 22 lint, TypeScript, formatting and production build pass.
- Ten production HTTP regression executions pass.
- Six isolated checks of the actual theme module pass: both system defaults,
  both explicit overrides, invalid saved values and blocked storage.
- Live development browser: light/dark switching, keyboard activation,
  client navigation, full reload, browser theme-color metadata and cross-tab
  synchronization pass. Both home appearances were inspected visually.
- Exact built home HTML/CSS at 320 px and 200% text, in both themes: no
  horizontal overflow, measured label crossings or axe WCAG-tagged violations.
  This last check excludes React hydration and does not certify WCAG compliance.
- The expanded suite contains 64 executions. It was attempted with fail-fast;
  the first browser test could not launch because Chromium is still absent.
  The remaining browser suite and actual GPU motion are still unverified here.
  Existing CI must run these checks before merge; no alternate download route
  was used to bypass the earlier network restriction.

The work remains on the local feature branch. No external publication is part
of this follow-up.
