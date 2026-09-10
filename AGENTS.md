# Working on this site

Read PRODUCT.md for the current design and README.md for commands. Historical
plans in docs/superpowers describe superseded visual directions; the September
10 redesign was explicitly approved by the owner, including Three.js.

- Keep public copy and facts in app/lib/content.ts. Preserve the owner's wording
  unless the task requests a copy change. Do not invent results or expertise.
- Current, upcoming, concurrent and exploratory labels are factual distinctions.
  ROLE_TRANSITION is the source of truth for the present and announced next role.
- Update CONTENT_UPDATED_ON only for reader-visible content changes.
- Render essential content, links and all five brief panels in server HTML.
  Canvas is decorative. Touch, reduced motion, no JavaScript and no WebGL must
  retain a useful page. Lazy-load Three.js and release offscreen resources.
- app/lib/representations.ts generates Markdown from the same content. Test
  negotiation at / whenever changing middleware, headers or caching. Keep RSC,
  assets and normal HTML navigation intact. Never advertise absent APIs/MCP/auth.
- Keep the local-asset CSP and credentials server-only. No analytics by default.
- Use Node 22 and npm ci. Run npm run verify and npm run build. For changes to
  markup, navigation, motion or discovery run npm run test:a11y (also includes
  content/discovery regressions). A build is required before these tests.
- Review desktop/mobile, both themes, keyboard, reduced motion and fallback
  states when changing the visual experience. Tests do not certify WCAG alone.

Keep changes on a feature branch. Production deployment remains the existing
Vercel/GitHub flow; do not replace hosting or change DNS as incidental setup.
