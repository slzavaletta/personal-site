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
- Use an outlined SLZ lettermark as the favicon and social identity mark.
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
