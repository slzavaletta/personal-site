# Daylight — redesign plan

Date: 2026-09-03

Status: Implemented as the Daylight redesign (type-only hero; portrait
deferred until one is supplied).

Supersedes the visual system, motion grammar, page structure and signature
elements of `docs/superpowers/plans/2026-09-02-living-editorial-redesign-plan.md`
and of `PRODUCT.md`. Facts, `ROLE_TRANSITION`, security, accessibility floors
and the living layer (clock, last push, ISR) stand unless this file says
otherwise.

## 1. The actual problem

The site is no longer noisy. It is still generic.

The July brief reacted to the dark terminal portfolio. The September brief
reacted to "too still". Both landed inside the same dialect, because that
dialect is what a current model produces when asked for a professional
personal site:

- warm gray-green paper, near-black ink, one vermilion signal;
- a stacked, ultra-tight, all-caps display name as the identity device;
- small tracked uppercase labels (NOW, ROLE, EVIDENCE, RESULT SIGNAL);
- 1px rules as the entire composition method;
- numbered cases 01 / 02 / 03 with a four-part taxonomy
  (context / constraint / work / signal);
- one inverse band that is "the serious artefact";
- Archivo + Source Sans + IBM Plex Mono;
- a boxed three-letter mark.

That set used to look considered. In 2026 it reads as *the* Claude portfolio.
Hiring managers who have opened three of these in a week will file this one
with the other two, before they read a word of the copy.

Tweaking the ledger labels or the tool icons will not get us out. The system
has to be replaced, not refined.

## 2. What this site is for (unchanged)

A skeptical reader, between meetings, deciding whether Santiago is worth a
conversation about AI deployment work. The facts they must be able to take
away:

- Technical Project Manager at Globant, joining Syneos Health as Senior
  Technical Program Manager in October 2026.
- The arc: life-sciences delivery → infrastructure → AI and digital at
  scale → AI in clinical development.
- What he has owned, with numbers that survive an NDA.
- How he thinks before a pilot starts.
- How to email him.

The next site still has to do that job. It has to do it as a person in a
room, not as a designed system exhibiting itself.

## 3. Direction: Daylight

A well-lit office in Buenos Aires at whatever hour it actually is there.
You can read. You can tell someone specific sits here. Nothing is trying to
be a brand.

Three moves, and only three:

1. **A face, or the absence of a billboard.** The identity device is a
   portrait if one exists, and quiet sentence-case type if it does not. The
   stacked all-caps name is retired either way.
2. **Type from a place, not from a kit.** Headings in Andada Pro (Carolina
   Giovagnoli, Huerta Tipográfica, Argentina — designed for Spanish in
   bilingual print). Body in Atkinson Hyperlegible (Braille Institute —
   designed so characters cannot be mistaken for each other). No mono
   family. No vermilion.
3. **The city as the living thing.** The clock stays and starts to earn its
   keep: the paper's colour temperature tracks Buenos Aires time, within a
   contrast-safe band. Dawn is cooler, late afternoon warmer, night is the
   dark scheme unless the reader has pinned a theme. This replaces the
   kinetic width-axis name as the signature motion.

Rejected on purpose, so they are not reintroduced in review:

- **Clinical-protocol costume.** CRF chrome, binder clips, "CONFIDENTIAL"
  stamps. Framework theater. The work is regulated; the site should not
  dress up as a filing system.
- **More motion, WebGL, 3D, magnetic type.** The other default. Louder is
  not more personal.
- **Dark luxury / navy consultancy.** The other brochure.

## 4. What stays

- `ROLE_TRANSITION`, softened figures, first-person copy, the five brief
  questions, the three cases, the two systems, the tool list with marks, the
  concurrent-role honesty, certifications labelled earned / in progress.
- Security headers, CSP, no analytics, `HashTarget` by id, `noopener
  noreferrer`.
- WCAG 2.2 AA in both schemes, skip link, 44px targets, reduced-motion path,
  no-JS render of every fact.
- Dark scheme with a header toggle and a boot script.
- ISR ledger: last push (every repo), building, learning, availability.
- Single route.

## 5. Visual system

### Colour

No mascot colour. Identity comes from type, photograph and time of day.

| Role | Light (noon) | Dark |
| --- | --- | --- |
| Paper | warm plaster, slightly more yellow than today's gray-green | deep warm charcoal, not green-black |
| Ink | near-black, a touch of umber | plaster |
| Mute | ink at ~55% | plaster at ~62% |
| Rule | ink at 12% | plaster at 14% |
| Focus | ink itself, 2px offset on paper | plaster on charcoal |

The time-of-day shift only moves paper's hue and a little of its lightness,
clamped so body text never drops below 4.7:1. It does not introduce a
second accent. Links are ink, underlined. The primary button is ink fill,
paper type — the inverse of a vermilion pill.

### Type

- **Andada Pro** for the name (when it appears), section titles, case
  titles, the brief's five field names. Sentence case. Tracking near zero.
  Line-height that lets the slab serifs breathe; no 0.76 line-height
  collisions.
- **Atkinson Hyperlegible** for everything else: nav, body, labels, dates,
  figures. Labels are a weight and a colour, not a tracked uppercase costume.
- Figures stay `tabular-nums`. No second mono face.

The boxed "SLZ" mark goes. The header wordmark is the name in Andada at
body size, or "Santiago" on small screens.

### Surface

Corners remain sharp. Shadows remain absent except for the header once it
floats. Rules become rare: under the header, above contact, between cases.
Whitespace does the grouping. The inverse band is deleted; Approach lives on
paper like everything else.

### Photograph

Highest leverage available. A single portrait, shot in daylight, not a
LinkedIn crop, not a studio backdrop. Placed in the hero at a human scale
(not a full-bleed cover, not a tiny circle). The type sits beside it on
wide screens and below it on small ones.

If no portrait is supplied, the hero is type-only: the statement in Andada
at a reading size (not a poster size), the name already in the header. Do
not compensate by making the name large again.

## 6. Page

Target: five to six screens. A recruiter finds title, proof, one case and
email without scrolling past a second poster.

| # | Block | What it is |
| --- | --- | --- |
| 1 | Header | Name in Andada, Work / Approach / Experience / Contact, clock, theme, Email as a text link. No boxed mark, no fill button in the header. |
| 2 | Hero | Portrait (if any) + the role line + the statement in Andada + two short paragraphs (arc, direction). One text link ("the work") and the résumé. |
| 3 | Now | A compact definition list, two columns on desktop, no section kicker repeating the first key. Rows: Role, Next, Building, Learning, Last push, Availability. The clock in the header is the time; this list is the state. |
| 4 | Work | A one-sentence proof line ("Ten years. A multi-million-dollar AI account. Six POCs. Three go-lives. Four deals.") then three articles. No 01/02/03. No "Result signal" label — the outcome is the last sentence of the article. Context and constraint can stay as two quiet lines under the body, not a taxonomy strip. |
| 5 | Approach | The five questions as a single document on paper. Selecting a field still reveals "when it is missing" and "from the work", but as an expansion of that row, not as a dark console with a radio group styled like a product. Semantics stay a radio group for accessibility. |
| 6 | Systems | Two systems as consecutive short entries with the GitHub link. Tools as one compact strip with marks, grouped by a sentence, not four marketing columns. "Exploring" remains labelled as learning. |
| 7 | Experience | A table: period, company, title, one-line body. Upcoming and concurrent as text in the period cell, not a diamond on a drawn trace. Credentials as a short list; industries as a sentence, not a ten-cell grid. |
| 8 | Contact | The existing sentence, email, LinkedIn, GitHub, on the same paper. No second giant heading. Footer is the name, the role, the city, back to top. |

The five-column evidence index, the diamond timeline, the inverse band, the
kinetic name, the scroll-drawn vermilion traces and the four-column tool
marketing grid do not come across.

## 7. Motion

- **Atmosphere.** Paper temperature eases over minutes with Buenos Aires
  time. Reduced motion: the temperature snaps to the current hour, no
  transition. Forced light/dark from the toggle pins the temperature and
  stops the shift.
- **Header.** The existing hairline of scroll depth can stay if it is drawn
  in ink, not vermilion. Or it can go — it is optional.
- **Hover.** Underlines, nothing lifts, nothing rotates, logos do not slide.
- **No** width-axis interpolation, no scroll-driven scaleY traces, no
  staggered fade-up of every block.

The page should feel awake because the light is the light of a city, not
because type is performing.

## 8. Copy that currently reads as generated

Visual reset without a copy pass will still sound like the same site.

- Headings lose the trailing period: "Selected work", not "Selected work."
- "Result signal" is not a phrase a person says. The sentence that used to
  sit under it becomes the close of the paragraph.
- "I run enterprise AI and software delivery—staffing, P&L, risk, adoption,
  and the client decisions that follow." is a list pretending to be a
  sentence. Rewrite as something he would say out loud.
- Building currently names "Claude skills". Accurate, and it also plants
  the vendor in the first screen. Prefer what they do ("two tools that read
  a request against the SOW") and let the Systems block name Claude.
- Contact heading repeating the availability row is redundant. One of
  them goes; the contact block can start at the paragraph.

## 9. Engineering notes

- Swap `next/font` to Andada Pro + Atkinson Hyperlegible. Subset latin.
  Measure the file-size delta against Archivo variable; Andada is static
  weights, which may *save* weight once `wdth` is gone.
- Delete `KineticName.tsx` and the `--name-wdth` machinery.
- The clock script already ticks; it also writes a `data-hour` (0–23, Buenos
  Aires) on `html`. CSS maps hour ranges to paper. Contrast is tested at
  hours 7, 12, 17, 21 in both pinned themes.
- Portrait via `next/image`, explicit width/height, no remote loader.
  `alt` is the name and the role, not empty.
- OG image rebuilt in the new type, no vermilion bar, no stacked ultra-name
  if the portrait exists — then the portrait is the image.
- Playwright + axe remain the gate. Add contrast samples at four hours.

## 10. Phases

One PR per phase, preview on Vercel.

1. **Strip the dialect.** New type, new colour (static noon paper), name
   treatment, kill the boxed mark, kill vermilion, kill inverse band, kill
   kinetic name. Same information architecture. The site should already stop
   looking like the current one.
2. **Rebuild the page.** Hero (with or without portrait), compressed Now,
   prose proof, articles instead of dossiers, brief as a document, tools as
   a strip, experience as a table, quiet contact. Copy pass from section 8.
3. **Atmosphere.** `data-hour`, paper temperature, OG, any remaining motion.
4. **Quality gate.** a11y at both themes and four hours, Lighthouse, 320 /
   390 / 768 / 1440, reduced-motion, no-JS.

## 11. What I need from you

1. **A portrait, or a decision not to have one.** This is the only thing I
   cannot invent well. Daylight, indoors or street, looking at the camera or
   not — not a conference badge crop. If it will take time, we ship phase 1
   without it and leave a hole the image drops into.
2. **A yes on Daylight** as the direction: Argentine serif, hyperlegible
   sans, no mascot colour, city light as the living device, person in a room
   rather than a designed system.
3. **Anything in section 4 you want removed anyway** (last push, clock,
   dark toggle, the brief's interactivity). I will keep them unless you say
   otherwise.

## 12. Non-goals

- A blog, a CMS, a contact form, extra routes.
- Claiming the Syneos title as current before October.
- Recreating a consultancy, a lab, or a developer toy.
- Preserving Archivo, vermilion, or the stacked name out of sunk cost.
