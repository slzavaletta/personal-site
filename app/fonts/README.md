# Site fonts

## Neue Montreal

The owner selected PP Neue Montreal. Typography uses the original v3.0
files delivered through Pangram Pangram's official Free-to-Try email:

- `neue-montreal/PPNeueMontreal-Regular.otf`: display text, weight 400.
- `neue-montreal/PPNeueMontreal-Semibold.otf`: emphasis, weight 600.
- `neue-montreal/PPNeueMontrealText-Book.otf`: body copy, weight 350 in the
  supplied file's OS/2 table. The product page labels Book differently; the
  application follows the downloaded file's actual metadata.

`next/font/local` serves the files locally. The Open Graph image reads the same
Regular and Semibold files. Visitors request fonts from this site, with no
third-party font request,
conversion or outline change. `npm ci` and `npm run build` run
`scripts/prepare-fonts.mjs`: it retrieves the official archive from the foundry's
Shopify CDN, verifies the archive and each selected file by SHA-256, then writes
only the three fonts and license to the ignored directory. Verified local files
are reused without a network request. An unavailable or changed source fails
the build explicitly. Do not replace the pinned source without reviewing it.

Source: <https://pangrampangram.com/products/neue-montreal>. Downloaded on
2026-09-13. Official archive SHA-256:
`a3993ef72dce43aebb1d72b712f2126551c237099df011a15187a2ccdf8e0f10`.

The bundled license is retained as `neue-montreal/EULA.pdf`. Consult the
foundry's current usage terms below when reusing the fonts outside this site.
Keep font binaries out of this public repository; the build obtains the
original files from their official source.

- FAQ: <https://pangrampangram.com/pages/faq>
- Current EULA: <https://pangrampangram.com/pages/eula>

## Historical open fonts

The following assets are retained from the published version before Neue
Montreal. Instrument Sans and Source Sans 3 remain available in the lockfile.

- **Instrument Sans** (SIL OFL 1.1) — Rodrigo Fuenzalida, Jordan Egstad.
  Regular (400) and SemiBold (600), instantiated with fontTools 4.61.1 from
  `@fontsource-variable/instrument-sans@5.3.0`'s Latin wght WOFF2. TTF format is
  used because Satori cannot read WOFF2 variable fonts. License included.

- Historical **Fraunces** (SIL OFL 1.1) — Undercase Type. Static instances (SemiBold
  144pt, Italic 144pt) because satori cannot read the variable file.
