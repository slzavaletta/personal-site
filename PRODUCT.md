# Product

Current direction: Deployment Atlas, the owner's selected proposal A. Development
was authorized on September 11, 2026 while palette and typography options are
reviewed. This supersedes the previous editorial layout and five-plane sculpture.

## Purpose and readers

A personal brand and company-of-one for enterprise AI deployment opportunities.
A hiring manager, deployment leader or recruiter should understand what Santiago
owns, see evidence, and reach his résumé or email. Preserve the distinction
between his current Globant role, upcoming Syneos Health role, concurrent work
and exploratory tools. AI deployment is the direction, not an invented job title.

## Information architecture

- `/`: positioning, spatial project map and a selected case preview.
- `/work/ai-delivery`, `/work/digital-twin-studio` and
  `/work/mergers-and-acquisitions`: complete original case studies.
- `/approach`: the full five-field delivery brief.
- `/systems`: Scope Sentinel, SOW Intake and the tools used in the work.
- `/profile`: career context, six roles, credentials, industries and Now.
- `/contact`: authored invitation, email, résumé and public profiles.

Preserve all authored paragraphs. Navigation and short interface labels may
change; results, employer claims and metrics may not be invented. Legacy section
hashes redirect to their new pages. The footer groups the name, a small Sol de
Mayo and exactly “Sean eternos los laureles que supimos conseguir.” It omits the
location. The favicon and social preview use SLZ; the sun is a cultural
signature rather than a logo. The two home summary lines were revised at the
owner's request on September 13, 2026. The owner subsequently authorized copy
polish: Approach, Systems and Contact introductions were tightened, tool order
updated, and the inaccurate claim of running a self-hosted VPS removed from
both public representations. Do not reintroduce that infrastructure claim.

## Visual and interaction system

Provisional light palette: white #F6F8FB, ink #192334, cobalt #2854D8, map field
#EAF0F8 and gold #886024. Dark mode: navy #0E192B and pale blue #A0C5FF. Alternatives
for owner review include graphite/copper. Central CSS tokens permit a final
palette change without rewriting components. Instrument Sans provides headings
and navigation; Source Sans 3 provides body text. Both are self-hosted.

Light and dark modes are required across all routes. Follow the operating system
until the reader chooses a mode using the labeled header button. Apply a saved
choice before first paint, persist it across navigation and reloads, and sync it
between tabs. If storage is blocked, keep a manual choice during client-side
navigation; a full reload can only follow the system. Invalid stored values
must not prevent system updates. Browser chrome and the map share the active
palette. A theme change recolors the 3D scene without replaying its motion.

The map preserves asymmetric project positions. Connections use measured label
group bounds, including captions. Text remains opaque HTML above SVG and canvas.
Narrow screens retain a spatial map that grows with enlarged text; switching
to a list is an explicit reader action. Selecting a node previews the case;
opening it navigates to its own URL.

Three.js adds dimensional connections and a brief flow toward delivery
governance. It shares the measured paths with SVG, renders only while moving,
loads lazily on visible fine-pointer desktop screens, and releases resources
offscreen or when motion becomes disallowed. Touch, reduced motion, data saving,
no JavaScript and unavailable WebGL retain readable HTML and the SVG map.

The governance hub shares the case title scale. Page links reveal the document
top without a scroll animation. Native view transitions crossfade the content
while the header stays stable; unsupported browsers use an entry animation.
Reduced motion skips both. Hash links and browser history remain native.
The main landmark receives focus after navigation and skip-link activation,
but never a visible page-sized outline. Interactive controls retain their
visible keyboard focus indicators. Do not remove focus transfer or globally
disable outlines to address the page-frame issue.

The header stays pinned at the top throughout scrolling, including on mobile.
It uses CSS sticky positioning to preserve its natural layout space without a
JavaScript spacer. After 24px of scrolling, a translucent blurred surface,
subtle shadow and accent edge separate it from the content. Unsupported blur
and no-JavaScript cases retain an opaque pinned header. Its measured height
sets the anchor offset as text and navigation reflow. Reduced motion removes
the appearance transition; the header never shrinks or hides on scroll.
The compact bar uses 8px vertical padding at standard text size and a 44px
icon button for the theme. Mobile uses two close rows and lets links wrap at
larger text sizes. Approach places its introduction directly below the title,
with a shared left edge, instead of aligning it at the foot of a side column.
The SLZ mark uses the three italic serif initials on one baseline inside a
light circular field. Letter outlines derive from the bundled Fraunces font;
the SVG needs no font request and is shared with the social preview. The
owner's handwritten signature is not a public asset. Its possible use in the
footer is under discussion; do not publish the uploaded original as part of
routine identity edits.

Every brief panel is server-rendered; JavaScript adds radio selection. The clock
follows Buenos Aires. Public GitHub activity is optional, server-only and cached
hourly. No account, external CDN script or analytics is needed.

## Agent access

HTML and `/index.md` share canonical authored content. `/llms.txt` links to the
real pages and sources; sitemap and per-page canonicals include all eight routes.
The root negotiates explicitly preferred `text/markdown`; HTML wins quality
ties. RSC, prefetch and assets retain their normal responses.

Next.js 15 replaces the HTML Vary header with its Flight fields. Root responses
are therefore `private, no-store` for both representations; Markdown additionally
declares `Vary: Accept`. `/index.md` remains a cacheable, stable alternative.
Content-Signal permits search and AI input and declines training; it expresses
a preference, not access control. No absent APIs, MCP, auth or DNS capabilities
are advertised for a score.

## Acceptance

Run lint, types, formatting, production build and browser/HTTP regressions.
Inspect desktop/mobile, both themes, keyboard, 320px, enlarged text, no JS,
reduced motion and unavailable WebGL. Verify actual connector clearance, copy
preservation, canonical URLs, case navigation and every brief panel. Automated
checks do not alone certify WCAG compliance.

The existing Vercel/GitHub hosting remains. Production and the live agent scan
have not changed merely because local development passes. Verify response
negotiation again on a Vercel preview before merging.
