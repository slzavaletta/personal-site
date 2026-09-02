# Living Editorial — redesign plan

Date: 2026-09-02

Status: Proposal for owner review. Nothing in this document is implemented yet.

Supersedes the motion and structure sections of
`docs/superpowers/specs/2026-07-30-personal-editorial-deployment-portfolio-design.md`
once approved. `PRODUCT.md` is rewritten as part of phase 2.

## 1. What changed since the July brief

- The owner wants the site to feel **alive**, not fully static. The July brief
  read "restrained" as "nearly still"; the built result read as generic.
- In October 2026 the owner leaves Globant and joins **Syneos Health** as a
  **Senior Technical Program Manager**. The career story now has a second
  life-sciences chapter and a clear line toward AI deployment in regulated
  industries.
- The audit of 2026-09-01 found: eight competing motion devices, copy that
  states the target role as the current one, employer-confidential figures in
  public, missing security headers, analytics without notice, and tooling debt.

## 2. Reframe: alive is not noisy

The built site felt generated because it stacked many small, borrowed devices
(count-ups, universal fade-ups, section index, scroll hairline, card lifts,
rotating logos, a toy demo) and owned none of them.

"Alive" is delivered three ways, each with one strong instance:

1. **Motion with intention** — one signature identity moment, structure that
   draws itself as you read, and precise response on hover and focus.
2. **Live data** — content that changes without a deploy: local time, latest
   public work, what is being built and learned, availability.
3. **Interactivity that demonstrates judgment** — the pilot decision brief as
   an instrument the reader can operate, replacing the fictional demo.

Everything else is still. Stillness is what makes the three read as chosen.

## 3. Positioning

### The arc

Life-sciences delivery (gA) → enterprise infrastructure (ExxonMobil) → AI and
digital delivery at scale (Globant; Eightfold AI implementations) → AI in
clinical development (Syneos Health).

The current hero says "My career started in infrastructure". It started in
life-sciences delivery; infrastructure came second. The copy is corrected in
phase 2.

### The line

> AI deployment where the constraints are real: regulated industries,
> enterprise data, and people whose work changes.

Syneos publicly frames its AI program as governed, human-in-the-loop agentic
workflows embedded in clinical decision points. The owner's "five things
written down" brief is the delivery-side counterpart of exactly that. The site
should speak that language — evidence, governance, adoption, the
scale-or-stop decision — without claiming a title he does not hold.

### Title truth

- Until the move is public: `Technical Project Manager, Globant`.
- After: `Senior Technical Program Manager, Syneos Health`.
- "AI deployment" is the direction, never the job title.

### Role transition switch

`content.ts` gains a `ROLE_TRANSITION` block:

```ts
export const ROLE_TRANSITION = {
  public: true,              // the resignation was communicated on 2026-09-02
  startsOn: "2026-10",       // month shown in the ledger and the timeline
  next: { company: "Syneos Health", title: "Senior Technical Program Manager" },
};
```

Hero role line, ledger "Next" row, experience timeline, JSON-LD `worksFor`,
metadata title and the OG image all derive from it. The switch stays so the
same content model can later turn "next" into "current" with one edit.

## 4. Page structure

Target: six to seven screens, a skeptical reader finds title, proof, brief and
email in one pass.

| # | Block | What it is | Client JS |
| --- | --- | --- | --- |
| 1 | Header | SLZ mark, nav (Work · Approach · Experience · Contact), Email. A status pill: Buenos Aires time + availability. | menu, clock |
| 2 | Hero | Kinetic name (Archivo width axis), real role line, statement, direction. | kinetic name |
| 3 | Ledger | "Now" strip: role, next (when public), latest public commit, building, learning, last site update. | none (ISR) |
| 4 | Proof | Five figures, static, softened, each attached to its sentence. | none |
| 5 | Work | Three cases at equal weight, dossier layout, marginalia, trace drawn on scroll. | none (CSS scroll timeline) |
| 6 | Approach | The brief as instrument: five fields; selecting one shows what fails when it is missing and one anonymised example. Replaces Current/Next, Pilot brief and the Scope Sentinel demo. | instrument |
| 7 | Systems and tools | Scope Sentinel and SOW Intake as two lines with source links. Tools as a typographic set grouped by use; no logo wall. | none |
| 8 | Experience | Timeline with trace, credentials, industries ("AI" removed as an industry). | none |
| 9 | Contact + footer | One sentence, email, LinkedIn, GitHub. Footer carries "last updated". | none |

Removed: count-up, universal reveals, left section index, card lifts, logo
rotation, the fictional walkthrough, "v0.1" and "SLZ / 2026" stamps, the red
full-bleed panel, the duplicated résumé button.

## 5. Visual system

Keep: paper / ink / vermilion in OKLCH, Archivo + Source Sans 3, the
twelve-column editorial grid, 1px rules as structure only.

Change:

- **Archivo variable with the `wdth` axis (62–125)** loaded through
  `next/font`. The name uses width, not just weight, which is what makes it
  kinetic without gimmicks. Section numerals reuse the axis.
- **Mono discipline.** IBM Plex Mono only where it encodes evidence: dates,
  figures, the ledger. Navigation and kickers move to Source Sans.
- **Vermilion as signal.** Focus, marginalia, the trace, one accent per case.
  No red panels.
- **Surfaces.** Paper → field → one inverse band, not two.
- **Dark scheme** driven by `prefers-color-scheme` (tokens invert; vermilion
  swaps to `--signal-on-dark`). Optional small toggle in the header. Owner
  decision.
- **One primary button.** Everything else is a text link with a drawn
  underline.
- **OG / Twitter image** regenerated in the new system with the real title.

## 6. Motion grammar

Tier A — Identity, once per visit

- Name lines land with the width axis settling from condensed to normal,
  editorial ease, 500–650ms, staggered per line; role and statement follow.
- After load, the name responds to scroll (compresses slightly as the header
  takes over) and, on pointer devices, to pointer proximity (width/weight
  interpolation, clamped, lerped). Touch: scroll only.
- Reduced motion: final values, no interpolation.

Tier B — Structure, scroll-linked, CSS first

- `animation-timeline: view()` for the case trace, the timeline rule and the
  marginalia rise. `@supports` fallback: visible and static. No observers.
- Header hairline progress stays: it is state, not decoration.

Tier C — Response, 150–200ms

- Underlines draw, marginalia turns vermilion, ledger rows highlight, brief
  fields select.

Every tier has a static `prefers-reduced-motion` path and a no-JS render.

## 7. Living layer

- **Clock.** Server renders the current time; client ticks with
  `Intl.DateTimeFormat`, `aria-live="off"`.
- **GitHub.** Server component fetch to the public API with
  `next: { revalidate: 3600 }`. Optional `GITHUB_TOKEN` (Vercel env) raises the
  rate limit. On failure the row is omitted; the page never shows an error.
- **Now.** `app/lib/now.ts` (building, learning, reading) edited by commit.
  Cheap and honest.
- **Availability.** Derived from `ROLE_TRANSITION`.
- The route becomes ISR (one hour) instead of fully static. `sitemap`
  `lastModified` comes from the content date, not the build time.

No live call exposes a key to the client. No third-party script on the page.

## 8. Security (agreed 2026-09-02)

1. **Soften employer figures.** Proposed replacements, owner to confirm:
   - `$5M` → "a multi-million-dollar AI account"
   - `40% → 45%` → "margin up several points" (or "+5 pts" if cleared)
   - `20-person team within a 40-person account` → "a ~20-person multidisciplinary delivery team"
   - `$90k fixed-price` → "a fixed-price factory twin delivered in six months"
   - `≈940 people, four countries` → "four deals across Latin America and Europe"
   - `$700k to $5M` → "portfolios from under $1M to multi-million"
2. **Headers** in `next.config.mjs`: Content-Security-Policy
   (`default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'
   'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';
   object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors
   'none'`), `X-Content-Type-Options: nosniff`, `Referrer-Policy:
   strict-origin-when-cross-origin`, `Permissions-Policy` (camera, microphone,
   geolocation off), `X-Frame-Options: DENY`, `Cross-Origin-Opener-Policy:
   same-origin`. A nonce-based CSP would force dynamic rendering; deferred
   unless the owner prefers it over CDN caching.
3. **Remove analytics.** `@vercel/analytics` and `@vercel/speed-insights` out
   of `layout.tsx` and `package.json`.
4. **HashTarget.** `getElementById` on a whitelisted id
   (`/^[A-Za-z][\w-]*$/`); release only on wheel, touch and scroll keys, not
   on Tab.
5. **External links.** `rel="noopener noreferrer"` everywhere.
6. **Title, OG, JSON-LD** use the real title via `ROLE_TRANSITION`.
7. `public/.well-known/security.txt` with the contact address.

## 9. Engineering

- **Tooling.** ESLint 9 flat config with `eslint-config-next`, Prettier,
  `npm run lint`, `npm run test:a11y` (Playwright + axe-core against
  `next start`), Lighthouse CI budgets (performance ≥ 95, accessibility 100,
  best practices 100, SEO 100). GitHub Actions runs lint, typecheck, build and
  a11y on every PR.
- **Leftovers.** Delete `components/ui/separator.tsx`,
  `public/logos/azuredevops.svg`, dark/sidebar/chart tokens, unused button and
  badge variants.
- **Single source.** `app/lib/site.ts` for URL, name, links.
- **Client boundaries.** `SiteHeader` (menu, clock), `KineticName`,
  `BriefInstrument`, `HashTarget`. Everything else is a Server Component.
  Target first-load JS under 110 kB (currently 170 kB). Evaluate dropping
  `motion` entirely in favour of CSS plus a small rAF loop for the name.
- **CSS.** Split `globals.css` into tokens / base / components. Measure
  `experimental.inlineCss` on a Vercel preview and keep it only if it wins.
- **Fonts.** Archivo with `axes: ["wdth"]`, latin subset; check the size delta.
- **Content.** `content.ts` gains `ROLE_TRANSITION`, `NOW`, `BRIEF_INSTRUMENT`
  (per-field failure mode and example). Copy audited against the banned-language
  list and the "current vs. direction" rule.
- **Docs.** Rewrite `PRODUCT.md`; add a spec addendum; update `README.md`.

## 10. Accessibility acceptance

WCAG 2.2 AA, verified with axe and by hand:

- Single `h1`, logical hierarchy; the proof legend is a label, not an `h2`.
- Keyboard reaches everything in reading order; focus visible in vermilion
  with offset; 44px targets including the status pill.
- Brief instrument uses `radiogroup` (or `tablist`) semantics with roving
  focus; selection announced once.
- Numerals are decorative or the list is native — never both read aloud.
- Clock is `aria-live="off"`.
- Every motion tier has a `prefers-reduced-motion` path; the kinetic name
  renders static.
- Contrast recomputed for light and dark; body on any accent ≥ 4.5:1 with
  margin.
- Usable at 320px, no horizontal overflow; iOS Safari checked for variable
  fonts and scroll-timeline fallbacks.

## 11. Phases (one PR each, Vercel preview per PR)

1. **Security and hygiene.** Agreed items in section 8, lint/CI, leftovers.
   No visual change.
2. **Content and structure.** New content model, `ROLE_TRANSITION`, page
   reorder, merged sections, removals, `PRODUCT.md` and spec addendum.
3. **Visual system and motion.** Kinetic hero, motion grammar, scroll-driven
   traces, button/link language, mono discipline, dark scheme (if approved),
   OG image.
4. **Living layer.** Ledger with GitHub + clock + `now.ts`, brief instrument,
   ISR.
5. **Quality gate.** a11y audit fixes, Lighthouse budgets, cross-browser,
   screenshots at 320 / 390 / 768 / 1440 / 2560, walkthrough recording.

## 12. Decisions (owner, 2026-09-02)

1. **Publish the Syneos move now.** The resignation has been communicated;
   `ROLE_TRANSITION.public` ships as `true`.
2. **Positioning line adopted:** AI deployment in regulated industries.
3. **Softened figures approved** as listed in section 8.1.
4. **Dark scheme: automatic plus toggle.**
5. **Live sources approved:** local time, public GitHub, `now.ts`,
   availability.
6. **Brief instrument replaces the walkthrough.** Scope Sentinel and SOW
   Intake stay as links.
7. **Contact copy:** "open to conversations about AI deployment work".
8. **CSP without nonce**, keeping CDN caching. Revisit if the page ever gains
   third-party scripts.
9. **Add `.cursor/environment.json`** and validate it with an environment
   build.

## 12a. Delivery shape

Phase 1 ships as its own PR against `main`: it is independent, has no visual
change and can be merged immediately. Phases 2–5 rework the same files
(`content.ts`, `globals.css`, `page.tsx`, the components) and are delivered as
one PR stacked on phase 1, with one commit per phase so the review can follow
the plan's order.

## 13. Non-goals

- A blog, CMS or contact form.
- A live model call in the browser.
- Multiple routes.
- Claiming the target role before it is held.
- Decorative motion on every block.
