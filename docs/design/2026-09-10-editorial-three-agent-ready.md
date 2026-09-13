# Approved redesign implementation

The owner approved the first visual proposal on 2026-09-10 and clarified that
agent readiness means the public criteria at isitagentready.com. Preserve copy,
make proof easier to find, and use Three.js as a restrained signature.

Implementation: editorial ivory/ink/blue; reordered casework; generated static
fallback; a five-plane procedural Three.js scene; all brief fields in SSR;
source-specific systems links; a readable experience timeline; current activity
later in the document; full Markdown negotiation and discoverable public sources.

Validation gates: existing CI, content parity, HTTP media negotiation including
HEAD/cache order/RSC, keyboard/mobile/themes, no-JS/reduced-motion/no-WebGL, and
visual comparison against the approved concept. Record concrete outcomes in
project-root design-qa.md and the PR. Production and DNS are separate from this
reviewable branch.

Primary references:
- https://isitagentready.com/slzavaletta.com?profile=content
- https://isitagentready.com/.well-known/agent-skills/link-headers/SKILL.md
- https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
- https://contentsignals.org/
- https://www.rfc-editor.org/rfc/rfc9110.html#section-12.5
- https://threejs.org/docs/pages/WebGLRenderer.html
- https://threejs.org/docs/pages/MeshPhysicalMaterial.html

Art: the static sculpture is an original generated asset based on the selected
proposal, optimized to WebP. The active sculpture is Three.js geometry with a
procedural RoomEnvironment, not a video or image pretending to be interactive.
