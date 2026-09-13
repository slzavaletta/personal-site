# Design QA — editorial Three.js redesign

Source visual truth: first concept approved on 2026-09-10, preserved in
`docs/qa/source-concept.jpg` (original 1422 × 1106).

The concept establishes art direction. Original biography paragraphs, the Systems
navigation item and responsive line wrapping are intentional differences from
its simplified mockup. The active sculpture is procedural Three.js geometry;
the approved generated artwork is its static fallback.

## Comparison history

1. **Fonts and hierarchy (P1/P2, fixed).** The first preview fell back after a
   Google font request failed. Fonts now load locally from lockfile-pinned
   Fontsource packages. The headline and identity were enlarged. Compare
   `docs/qa/comparison-initial.jpg` with `docs/qa/comparison-refined.jpg`:
   source and implementation sit side by side at the same viewport width/crop.
   `docs/qa/desktop-initial.jpg` is the original browser capture; the corrected
   fallback is preserved in the refined comparison.
2. **Complete HTML (P2, fixed).** All five brief panels now exist before
   hydration. The no-JavaScript browser tests verify their actual visibility.
3. **Scene lifecycle (P2, fixed).** Partial setup and render failures release
   allocated resources. Leaving the viewport, hiding the tab or requesting
   reduced motion disposes the renderer and restores the fallback.
4. **Print (P2, fixed).** The print override lives in the base layer with
   explicit priority so all brief panels print despite Tailwind's hidden rule.
5. **Approach layout (P1, fixed).** The first CI render exposed a concatenated
   compact class. A full-string conditional preserves both class names through
   formatting. The existing interaction test caught this regression.
6. **Actual 3D materials and shadow (P2, fixed).** The first rendered
   scene had washed-out plates and long shadows clipped at the canvas boundary.
   Lower exposure, restrained lighting, small physical bevels and a procedural
   soft contact shadow replace the hard shadow pass and bright outline geometry.
7. **Dark fallback (P2, fixed).** An isolated blend layer lacked a backdrop,
   producing a black rectangle. Each assembly now has an explicit themed
   background. `docs/qa/mobile-dark-final.jpg` records the corrected browser state.
8. **Reflection depth (P2, fixed).** Flat plates under an orthographic
   camera received a constant view direction and uniform reflections. A 32-degree
   perspective camera retains the composition with spatially varying reflections;
   it adds no textures or rendering passes.
9. **Selection scroll (P2, fixed).** Closing the first panel could move
   the fifth selection outside the viewport. A layout effect keeps the selected
   row and its explanation visible after reflow, without scrolling on initial
   hydration. The existing 3D interaction test now asserts viewport visibility.
   Manual browser verification placed the full explanation between y=341 and
   y=515 in a 936px viewport.
10. **Capture timing (evidence, fixed).** Screenshot capture could catch the
    finite cover entrance mid-fade. Browser audits now await full text opacity;
    captures finish finite CSS animations so evidence represents the settled UI.

## Surface review

- Typography: self-hosted Source Sans 3, Fraunces italic accent, strong headline
  hierarchy, readable body text and compact secondary labels.
- Spacing: editorial hero columns, ruled case articles, preserved biography,
  responsive single-column reading and deliberate separation between sections.
- Colors: ivory, graphite and blue, with a navy closing section and a complete
  dark theme. Automated theme/contrast checks complement visual review.
- Imagery: five planes, rails and cube remain the signature. Desktop motion is
  bounded and optional; touch, no-JS, no-WebGL and reduced-motion states use art.
- Copy: the content.ts diff changes navigation and project URLs only. Original
  paragraphs and factual role distinctions remain in HTML and full Markdown.
  The M&A article moves intact into Experience.

## Verification

`npm run verify` passes locally. CI also passes lint, TypeScript, format and the
production build at code commit `41dcbc91521f4d5d404200f7767e106ce3a73142`.
Next reports 143 kB first-load JavaScript
for the homepage; Three.js is in a separate lazy chunk. The 960px WebP fallback
is 33,096 bytes. These are build outputs, not measured Core Web Vitals.

The supervised cloud browser verified fallback typography, navigation, theme
and Approach selection. Its WebGL2 context is unavailable. Production Chromium
in GitHub Actions provides the active 3D and mobile verification.

[CI run 34523456828](https://github.com/slzavaletta/personal-site/actions/runs/34523456828)
passes **31 tests, with one intentional skip** for the mobile-only static-art
policy. This includes axe WCAG 2.2 AA checks, contrast across themes/times,
keyboard/focus, 320px overflow, no-JS content, reduced motion, failed WebGL,
rendered Three.js selection/disposal and selected-panel viewport visibility.
HTTP tests cover Accept quality/ties, HTML/Markdown cache safety, HEAD, public
resources, copy parity, PDF, RSC and prefetch. The 3D scenario has no page errors.
Automated axe results alone are not a WCAG certification.

## Final visual evidence

The comparison was opened and reviewed as one image with source on the left and
implementation on the right. Full-page light/dark and mobile evidence was also
reviewed for hierarchy, spacing, readable content and overflow.

| Evidence | Capture/state |
| --- | --- |
| `docs/qa/comparison-final.jpg` | 2560 × 996 comparison; source normalized to 1280 × 996, beside the matching top crop of the production page. CI #33. |
| `docs/qa/desktop-three-final.jpg` | 1280 × 720 desktop, light, settled live Three.js scene after pointer input. CI #33. |
| `docs/qa/desktop-dark-final.jpg` | 1280 × 950 top crop of the full-page dark capture, viewport 1280 × 720. CI #33. |
| `docs/qa/approach-three-final.jpg` | 1280 × 720, scrolled to field 05; selected explanation and scene index remain visible. CI #33. |
| `docs/qa/mobile-light-final.jpg` | 412 × 1800 top crop, normalized from Pixel 7 at 412 × 839 CSS pixels / DPR 2.625. Static fallback. CI #31; unchanged mobile hero. |
| `docs/qa/mobile-dark-final.jpg` | Same mobile dimensions and state, dark. CI #31; corrected backdrop. |

Full-resolution full-page originals are in the linked CI artifacts (seven-day
retention); selected visual evidence is committed here for lasting review.
The final art direction preserves the large editorial positioning, restrained
blue accent and five-plane signature. The live geometry is intentionally more
schematic than the generated poster. The extra biography, unchanged copy and
responsive headline wrapping explain the layout differences from the mockup.
No actionable P1/P2 visual or interaction issue remains in the reviewed states.

## Release boundary

The existing Vercel project built the feature branch successfully. Its root
preview requires Vercel sign-in, so CDN behavior for negotiated root requests
cannot be certified from the available preview access. The tested Vercel build at
`c913cbc` returned 200 at `/index.md`, the full 9,569-character Markdown document
and the expected Content-Signal/Link headers and cacheable Markdown content type.
Before merge, verify both root representations through an authorized preview
session; after deployment, run the public Content Site scan.

No production merge, DNS change or live agent-readiness score is claimed.
DNS-AID is outside this implementation; no fictitious API, MCP or OAuth endpoints
were added to satisfy the evaluator's unrelated generic checks.

final result: passed
