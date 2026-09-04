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
Health as Senior Technical Project Manager in October 2026. The career arc is
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
2. **Type that is not the last kit.** Fraunces for titles — optical, a
   little soft. Source Sans 3 for everything else. No mono family.
3. **The country is the mark.** A gold Sol de Mayo lives in the navy cover
   panel and in the colophon; a line from the anthem closes the page at
   nightfall. Celeste for the live dot, drawn underlines, hover and focus.
   Gold is metal, not text.
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
8. **Fill the module.** Bands and cards hold the work. Sparse strips with
   a double rule and an empty right are a design failure, not restraint.
9. **Say what is current, what is exploratory and what is next.** The ledger
   and the labels make the interface unable to overstate depth.

## Visual System

Cool celeste paper and navy ink in OKLCH. Mute is ink you can still read.
Gold is the Sun of May, never a text colour. Focus is celeste, 2px offset.
Primary actions are ink fill, paper type. Corners are slightly eased.
Shadows stay absent except for the header once it floats.

Fraunces for the name, section titles, case titles, and the brief's five
field names — sentence case, tracking slightly tight. Source Sans 3 for
nav, body, labels, dates and figures (`tabular-nums`). No second mono face.

The header wordmark is the name in Fraunces italic at body size; "Santiago"
on small screens. A three-stripe ribbon (celeste / paper / gold) sits on
the header. No boxed SLZ.

The hero is a two-column cover: the statement in Fraunces on paper, and a
navy panel holding the gold Sol, the supporting copy, and two fill buttons.
Systems is a filled board — project cards on the left, wrapping tool chips
on the right — not a sparse strip with a double rule.

## Accessibility & Inclusion

WCAG 2.2 AA, verified with axe in both schemes, at morning / noon / dusk /
night paper, and by hand. Single `h1` with a logical heading hierarchy,
skip link preserved, visible focus in ink with a high-contrast offset, full
keyboard reach in logical order, the brief as a real radio group with roving
focus, no color-only state, 44px touch targets, usable at 320px, and a snap
path for paper temperature under `prefers-reduced-motion`. The clock never
announces itself.
