# Product

Derived from `docs/superpowers/plans/2026-09-03-daylight-redesign-plan.md`.
That plan supersedes the visual system, motion grammar and signature elements
of the September living-editorial work. Facts, `ROLE_TRANSITION`, security
and the accessibility floor stand.

## Register

brand

Single-route personal site for a skeptical reader deciding whether Santiago
is worth a conversation about AI deployment work. The page should read as a
person in a room in Buenos Aires, not as a designed system exhibiting itself.

## Users

Hiring managers, deployment leaders, technical executives, recruiters and
peers in customer-facing AI delivery — increasingly in regulated industries.
They arrive skeptical, skim on a laptop between meetings, and are deciding
one thing: is this person worth a conversation?

## Product Purpose

Make a qualified visitor want to talk to Santiago about AI deployment work.

Present him truthfully: Technical Project Manager at Globant, joining Syneos
Health as Senior Technical Program Manager in October 2026. The career arc is
life-sciences delivery → enterprise infrastructure → AI and digital delivery
at scale → AI in clinical development. The positioning line: AI deployment
where the constraints are real — regulated industries, enterprise data, and
people whose work changes.

Success: the visitor can name what he owns, what he has proven, what he is
preparing for and what is true right now, and can find the résumé and the
email in one pass.

## Brand Personality

Direct, observant, self-aware.

First person. Short concrete sentences. The unglamorous parts of delivery
named out loud — budgets, staffing, dependencies, risk, hard conversations.
Numbers only when they are proof, and never an employer's confidential
figures. Confidence comes from specificity, never from adjectives.
Sentence-case headings. Links are destinations or actions.

Emotional goal: the calm of someone explaining their actual work, on a page
whose light is the light of a city.

## Anti-references

- The 2026 Claude portfolio dialect: gray-green paper, vermilion signal,
  stacked ultra-tight display name, tracked uppercase labels, 01/02/03
  dossiers, one inverse band, boxed three-letter mark, Archivo + Source Sans
  + Plex Mono.
- The generic developer portfolio: terminal chrome, scramble text, count-up
  numbers, cycling verbs, ambient canvas, command palette, hover glow, card
  lifts, logo walls.
- Purple/blue "AI brand" palettes, gradients, glassmorphism.
- Consultant-speak: "bridging the gap", "at the intersection of", "seamless",
  "transformative", "unlock", "elevate".
- Framework theater: circular diagrams, five-step process graphics,
  dashboards, fictional demos with toy data, clinical-protocol costume.
- Desired-role language written as if it were current experience.
- Reveal-on-every-section motion, WebGL, magnetic type.

## Design Principles

1. **A face, or the absence of a billboard.** Identity is a portrait if one
   exists, and quiet sentence-case type if it does not. No stacked all-caps
   name.
2. **Type from a place, not from a kit.** Andada Pro (Huerta Tipográfica,
   Argentina) for titles. Atkinson Hyperlegible for everything else. No mono
   family.
3. **The country is the mark.** An engraved Sol de Mayo stamps the cover and
   the colophon; the anthem closes the page at nightfall. One celeste accent
   — the flag over plaster — for the live dot, drawn underlines, hover and
   focus.
4. **The city is the living thing.** Paper temperature and a pool of light
   track Buenos Aires time. Dark is a scheme the reader can pin, not a
   second brand.
5. **Motion with intent.** The cover enters word by word; sections rise as
   they enter; hovers respond. Everything snaps to static under reduced
   motion.
6. **Proof is attached to the claim.** Evidence sits in the sentence it
   supports, never in a free-floating stats band.
7. **Show the artifact, not the framework.** The brief is a document the
   reader can operate, on the same paper as everything else.
8. **Whitespace groups; rules are rare.** Reserved for the header, contact,
   and breaks between cases.
9. **Say what is current, what is exploratory and what is next.** The ledger
   and the labels make the interface unable to overstate depth.

## Visual System

Warm plaster paper and umber ink in OKLCH. Mute is ink you can still read.
Focus is ink itself, 2px offset. Primary actions are ink fill, paper type.
Links are ink, underlined. Corners stay sharp. Shadows stay absent except
for the header once it floats.

Andada Pro for the name, section titles, case titles, and the brief's five
field names — sentence case, tracking near zero. Atkinson Hyperlegible for
nav, body, labels, dates and figures (`tabular-nums`). No second mono face.

The header wordmark is the name in Andada at body size; "Santiago" on small
screens. No boxed SLZ.

If a portrait is supplied later it sits in the hero at human scale. Until
then the hero is type-only: a modest name, the statement in Andada italic at
a reading size, two short paragraphs, two text links.

## Accessibility & Inclusion

WCAG 2.2 AA, verified with axe in both schemes, at morning / noon / dusk /
night paper, and by hand. Single `h1` with a logical heading hierarchy,
skip link preserved, visible focus in ink with a high-contrast offset, full
keyboard reach in logical order, the brief as a real radio group with roving
focus, no color-only state, 44px touch targets, usable at 320px, and a snap
path for paper temperature under `prefers-reduced-motion`. The clock never
announces itself.
