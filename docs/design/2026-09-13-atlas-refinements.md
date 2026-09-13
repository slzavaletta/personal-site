# Atlas refinements

The owner requested these refinements to the approved Deployment Atlas on
September 13, 2026. The existing branch, draft PR and preview remain the review
surface. Production is outside this change.

- Give Delivery governance the same title scale and weight as the case nodes.
  Preserve its noninteractive role and measure its enlarged bounds for paths.
- Revise only the two requested home-page lines. Preserve all figures and job
  facts. Shorten the case introduction and let it use the available row width.
  It stays on one line at desktop sizes and reflows on narrow/enlarged screens.
- Group the name, small Sol de Mayo and exact anthem in a compact footer.
  Remove the footer location. The sun remains a cultural signature, not a logo.
- Use SLZ as the favicon and social identity mark. Following two rejected
  geometric treatments, the latest version uses the three italic serif
  initials on one baseline inside a light circular field.
- Route links retain real destinations, prefetch, modified clicks and history.
  Explicit page navigation starts at the document top, with a short native
  crossfade and a small content reveal. Keep the header out of the page motion.
  Honor reduced motion, and retain an entry animation when native transitions
  are unavailable. Intentional hash links keep their existing behavior.

Implementation: update canonical copy, footer and map styles; add the shared
route-link enhancement and monogram; run the required build and browser suite.
Check desktop/mobile, both themes, focus, route scroll, history, fallback,
enlarged-text geometry and the favicon at small sizes.

References for the navigation enhancement:
- https://nextjs.org/docs/app/api-reference/components/link#onnavigate
- https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition

The next/link onNavigate hook is present in the installed Next.js 15.5.21.
No framework upgrade or motion dependency is needed.

The owner's subsequent review asked for a thinner pinned menu, a new favicon,
a clearer Approach introduction, updated tools, removal of the VPS claim and
a mobile/accessibility review. The bar now uses 8px vertical padding at normal
text size, preserves 44px controls, and wraps navigation when text is enlarged.
The theme icon retains an accessible destination label and system-first behavior.
Approach reads vertically from title to introduction before the brief. Its
fields collapse according to available space and text size.

ChatGPT, Grok and Claude lead the AI tools in that order; Linear leads Run the
work and GitHub leads Ship and operate. Approach, Systems and Contact copy was
tightened with the owner's authorization. HTML, Markdown and the discovery
description no longer claim ownership or operation of a self-hosted VPS.
The Grok mark comes from LobeHub's icon set; its source and MIT notice are
preserved with the local asset. Mobile reflow checks cover all eight pages at
320px and 200% text in both themes, in addition to the existing browser suite.

The next review identified full-height side lines after page navigation. They
were the global focus-visible outline applied to the programmatically focused
main landmark. A selector limited to that noninteractive focus target removes
the frame while preserving focus transfer, skip navigation and visible focus
on links and buttons. Existing browser cases now check both sides of that
requirement after navigation and keyboard skip-link activation.

The handwritten signature supplied by the owner remains unpublished. A
separate mark made for public branding is recommended for a possible footer
addition; the new favicon is typography, not a tracing of that signature.
