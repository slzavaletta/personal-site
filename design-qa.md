# Design QA — editorial Three.js redesign

Source visual truth: first concept approved on 2026-09-10, recorded as
`docs/qa/source-concept.jpg` (original 1422 × 1106).

Initial browser evidence: `docs/qa/desktop-initial.png` (JPEG bytes, 1348 × 926).
Full-view comparison: `docs/qa/comparison-initial.jpg`, source normalized to
1348px width and cropped to 926px, beside the implementation. The concept is an
art-direction target; preserved biography paragraphs and Systems navigation
are intentional additions to its simplified mockup.

State: desktop, light, initial hero, fallback artwork. The cloud browser cannot
create a WebGL2 context, so it verifies the fallback but not active 3D rendering.
Production browser tests and desktop/mobile screenshots run in GitHub Actions.

## Comparison history

1. [P1, fixed in source] Preview used fallback fonts after Google's font fetch
   failed. Replaced build-time Google requests with lockfile-pinned Fontsource
   files and next/font/local. A reload confirmed the `sourceSans` family.
2. [P2, fixed in source] The headline and identity were too small relative to
   the selected concept. Increased hero size/weight and header identity size.
3. [P2, fixed in source] Original brief rendered only the first panel in SSR.
   All panels now render; selection hides panels only after hydration.
4. [P2, fixed in source] A failed scene setup could retain resources. Cleanup
   now covers partial initialization and render failures.
5. [P2, fixed in source] Tailwind's important hidden rule defeated print CSS.
   The print override now lives in the base layer with explicit priority.

## Required surfaces

- Typography: Source Sans 3 hierarchy with Fraunces italic accent. Self-hosted
  fonts remove the observed preview drift. Final screenshot pending capture.
- Spacing: two-column hero, left editorial hierarchy, right sculpture; original
  biography retained below. Case rows prioritize reading and evidence.
- Colors: ivory, graphite and deep blue; high-contrast navy closing section.
- Imagery: original generated fallback matches five planes, rails and cube.
  Actual Three.js geometry is explicitly requested; it is not a rasterized UI.
- Copy: git diff of content.ts changes navigation and project URLs only. Every
  existing paragraph remains in HTML and full Markdown, including relocated M&A.

## Interactions and console

Manually opened Approach, selected The decision and read its matching panel.
Theme, navigation, keyboard and fallbacks are additionally covered by Playwright.
The cloud console reported WebGL context unavailable and an unrelated extension
metadata error. WebGL initialization now probes availability before creating the
renderer; no user-facing error replaces the fallback.

## Outstanding validation

Final normalized visual comparison, responsive/theme screenshots, successful
production accessibility tests and active Three.js render verification. Local
Chromium download timed out; GitHub Actions will provide the browser gate.

final result: blocked
