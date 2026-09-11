# OG image fonts

Static Latin subsets for `app/opengraph-image.tsx`. The site loads local variable
Instrument Sans and Source Sans 3 through `next/font`.

- **Instrument Sans** (SIL OFL 1.1) — Rodrigo Fuenzalida, Jordan Egstad.
  Regular (400) and SemiBold (600), instantiated with fontTools 4.61.1 from
  `@fontsource-variable/instrument-sans@5.3.0`'s Latin wght WOFF2. TTF format is
  used because Satori cannot read WOFF2 variable fonts. License included.

- Historical **Fraunces** (SIL OFL 1.1) — Undercase Type. Static instances (SemiBold
  144pt, Italic 144pt) because satori cannot read the variable file.
