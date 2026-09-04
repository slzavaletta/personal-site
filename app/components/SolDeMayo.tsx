/*
 * Geometry of the Sol de Mayo as it sits on the Argentine flag
 * (Wikimedia Commons, public-domain national emblem). Gold disc, copper
 * face, 16 straight rays and 16 flaming ones. Not a doodle with navy cuts.
 */

export const SOL_GOLD = "#FCBF49";
export const SOL_CUT = "#843511";
export const SOL_NAVY = "#10243A";

function SunGraphic({
  prefix,
  gold = SOL_GOLD,
  cut = SOL_CUT,
}: {
  prefix: string;
  gold?: string;
  cut?: string;
}) {
  const r2 = `${prefix}-r2`;
  const r4 = `${prefix}-r4`;
  const r8 = `${prefix}-r8`;
  const r16 = `${prefix}-r16`;
  const face = `${prefix}-face`;

  return (
    <g fill={gold} stroke={cut} strokeWidth="1.5">
      <g id={r16}>
        <g id={r8}>
          <g id={r4}>
            <g id={r2}>
              <path d="M -8,0 L -2,159.5 c 0,0 0,3 2,3 s 2,-3 2,-3 L 8,0" />
              <path d="M -4,0 L 0,109.5 L 4,0" fill={cut} stroke="none" />
              <g transform="rotate(11.5)">
                <path d="M -4.5,53.5 C -9.5,75 1.5,89.5 -4,108.5 S -1,140.5 0,148.5 -5,160 -3,161.5 5,158 5.5,147 -1.5,131.25 5,108 1,77 8,56" />
                <path
                  d="M -1,58 C -4,79 6,90.5 0,109 C 8,95 -2,81 3,59"
                  fill={cut}
                  stroke="none"
                />
              </g>
            </g>
            <use href={`#${r2}`} transform="rotate(180)" />
          </g>
          <use href={`#${r4}`} transform="rotate(90)" />
        </g>
        <use href={`#${r8}`} transform="rotate(45)" />
      </g>
      <use href={`#${r16}`} transform="rotate(22.5)" />
      <circle r="65" strokeWidth="1" />
      <g id={face} fill={cut} stroke="none">
        <path d="M 41,-14 C 29.5,-24 15,-25.5 7,-18 A 140,50 10 0,0 8.5,8.5 C 8,8.5 7,9 6.5,9.5 A 80,50 10 0,1 4,-19 C 15,-28 30,-29 41,-14" />
        <path d="M 23,-17 C 16.5,-17 15,-15.5 12,-13 S 7.5,-11 7,-10.5 S 7,-8.5 8,-9 S 11,-10.5 14,-13 S 20,-15.5 23,-15.5 C 32,-15.5 37,-8 38,-8.5 S 33,-17 23,-17" />
        <path d="M 34.5,-8.5 C 28,-15.5 16,-16 11,-8 H 13 C 18,-16 30,-12.5 31,-9 v 1" />
        <circle cx="22" cy="-9" r="4.5" />
        <path d="M 11,-8 C 16,-3.5 27,-3 34.5,-8.5 L 31,-9 C 26,-3.5 18,-4 13,-8 v -1" />
        <path d="M 35,-6 C 26.5,0.5 18,0 13,-3 S 8,-7 9,-7 S 11,-6 15,-4 S 25,-2 35,-6" />
        <path d="M 10.5,9 A 3,3 0 1,1 6.5,12 C 6,13 4,16 0,16 h -1 l 1,1.5 C 1,17.5 4,17.5 6,16 A 4.5,4.5 0 1,0 10.5,9" />
        <path d="M 16.5,30 C 12,27 10,22.5 5,22.5 C 4,22.5 2,23 0,24 h -1 L 0,25.5 C 2,25.5 5,23 8.5,25 S 14,29 16.5,30" />
        <path d="M 15,30 C 5,27 3,29 0,29 h -1 l 1,2 C 4,31 6,28 15,30" />
        <path d="M 16.5,30 C 5.5,29 9,35.5 0,35.5 h -1 L 0,37 C 11,37 6,31 16.5,30" />
        <path d="M 9,46 a 9,9 0 0,0 -18,0 a 9.25,9.25 0 0,1 18,0" />
      </g>
      <use href={`#${face}`} transform="scale(-1,1)" />
    </g>
  );
}

/** Standalone SVG string (OG image). */
export function buildSolDeMayoSvg(
  gold: string = SOL_GOLD,
  cut: string = SOL_CUT,
): string {
  const prefix = "og";
  const r2 = `${prefix}-r2`;
  const r4 = `${prefix}-r4`;
  const r8 = `${prefix}-r8`;
  const r16 = `${prefix}-r16`;
  const face = `${prefix}-face`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-165 -165 330 330"><g fill="${gold}" stroke="${cut}" stroke-width="1.5"><g id="${r16}"><g id="${r8}"><g id="${r4}"><g id="${r2}"><path d="M -8,0 L -2,159.5 c 0,0 0,3 2,3 s 2,-3 2,-3 L 8,0"/><path d="M -4,0 L 0,109.5 L 4,0" fill="${cut}" stroke="none"/><g transform="rotate(11.5)"><path d="M -4.5,53.5 C -9.5,75 1.5,89.5 -4,108.5 S -1,140.5 0,148.5 -5,160 -3,161.5 5,158 5.5,147 -1.5,131.25 5,108 1,77 8,56"/><path d="M -1,58 C -4,79 6,90.5 0,109 C 8,95 -2,81 3,59" fill="${cut}" stroke="none"/></g></g><use href="#${r2}" transform="rotate(180)"/></g><use href="#${r4}" transform="rotate(90)"/></g><use href="#${r8}" transform="rotate(45)"/></g><use href="#${r16}" transform="rotate(22.5)"/><circle r="65" stroke-width="1"/><g id="${face}" fill="${cut}" stroke="none"><path d="M 41,-14 C 29.5,-24 15,-25.5 7,-18 A 140,50 10 0,0 8.5,8.5 C 8,8.5 7,9 6.5,9.5 A 80,50 10 0,1 4,-19 C 15,-28 30,-29 41,-14"/><path d="M 23,-17 C 16.5,-17 15,-15.5 12,-13 S 7.5,-11 7,-10.5 S 7,-8.5 8,-9 S 11,-10.5 14,-13 S 20,-15.5 23,-15.5 C 32,-15.5 37,-8 38,-8.5 S 33,-17 23,-17"/><path d="M 34.5,-8.5 C 28,-15.5 16,-16 11,-8 H 13 C 18,-16 30,-12.5 31,-9 v 1"/><circle cx="22" cy="-9" r="4.5"/><path d="M 11,-8 C 16,-3.5 27,-3 34.5,-8.5 L 31,-9 C 26,-3.5 18,-4 13,-8 v -1"/><path d="M 35,-6 C 26.5,0.5 18,0 13,-3 S 8,-7 9,-7 S 11,-6 15,-4 S 25,-2 35,-6"/><path d="M 10.5,9 A 3,3 0 1,1 6.5,12 C 6,13 4,16 0,16 h -1 l 1,1.5 C 1,17.5 4,17.5 6,16 A 4.5,4.5 0 1,0 10.5,9"/><path d="M 16.5,30 C 12,27 10,22.5 5,22.5 C 4,22.5 2,23 0,24 h -1 L 0,25.5 C 2,25.5 5,23 8.5,25 S 14,29 16.5,30"/><path d="M 15,30 C 5,27 3,29 0,29 h -1 l 1,2 C 4,31 6,28 15,30"/><path d="M 16.5,30 C 5.5,29 9,35.5 0,35.5 h -1 L 0,37 C 11,37 6,31 16.5,30"/><path d="M 9,46 a 9,9 0 0,0 -18,0 a 9.25,9.25 0 0,1 18,0"/></g><use href="#${face}" transform="scale(-1,1)"/></g></svg>`;
}

export function SolDeMayo({
  className,
  id = "sol",
}: {
  className?: string;
  id?: string;
}) {
  const prefix = id;

  return (
    <svg
      className={["sol", className].filter(Boolean).join(" ")}
      viewBox="-165 -165 330 330"
      aria-hidden="true"
      focusable="false"
    >
      <SunGraphic prefix={prefix} />
    </svg>
  );
}
