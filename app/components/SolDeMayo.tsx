/*
 * The Sun of May: a faced disc with alternating straight and wavy rays,
 * computed once at module scope. Painted in gold with a navy cut, so it
 * reads as the flag — not as ink engraved on the same paper as the type.
 */

const CX = 64;
const CY = 64;
const FACE_R = 26;
const RAY_IN = 30;
const RAY_OUT = 57;
const RAY_COUNT = 32;

export const SOL_GOLD = "#D4A017";
export const SOL_NAVY = "#10243A";

function polar(radius: number, angleDeg: number): [number, number] {
  const angle = (angleDeg * Math.PI) / 180;
  return [CX + radius * Math.cos(angle), CY + radius * Math.sin(angle)];
}

function pt([x, y]: [number, number]): string {
  return `${x.toFixed(2)} ${y.toFixed(2)}`;
}

function straightRay(angle: number): string {
  const base1 = polar(RAY_IN, angle - 2.6);
  const base2 = polar(RAY_IN, angle + 2.6);
  const tip = polar(RAY_OUT, angle);
  return `M ${pt(base1)} L ${pt(tip)} L ${pt(base2)} Z`;
}

function wavyRay(angle: number): string {
  const base1 = polar(RAY_IN, angle - 2.6);
  const base2 = polar(RAY_IN, angle + 2.6);
  const c1 = polar(40, angle - 7.5);
  const c2 = polar(51, angle - 5);
  const tip = polar(RAY_OUT + 2, angle);
  const c3 = polar(51, angle + 5);
  const c4 = polar(40, angle + 7.5);
  return `M ${pt(base1)} C ${pt(c1)}, ${pt(c2)}, ${pt(tip)} C ${pt(c3)}, ${pt(c4)}, ${pt(base2)} Z`;
}

const RAYS = Array.from({ length: RAY_COUNT }, (_, index) => {
  const angle = (360 / RAY_COUNT) * index;
  return index % 2 === 0 ? straightRay(angle) : wavyRay(angle);
});

const FACE = [
  "M 51 53 Q 55 50.5 59 53",
  "M 69 53 Q 73 50.5 77 53",
  "M 51 59 Q 55 55.5 59 59 Q 55 62.5 51 59 Z",
  "M 69 59 Q 73 55.5 77 59 Q 73 62.5 69 59 Z",
  "M 64 62 L 63 70 Q 64 72 66 70.5",
  "M 56 78 Q 64 83 72 78",
] as const;

/** Standalone SVG string (OG image, favicon). */
export function buildSolDeMayoSvg(
  ray: string = SOL_GOLD,
  feature: string = SOL_NAVY,
): string {
  const rays = RAYS.map((d) => `<path d="${d}" fill="${ray}"/>`).join("");
  const face = FACE.map(
    (d) =>
      `<path d="${d}" fill="none" stroke="${feature}" stroke-width="2" stroke-linecap="round"/>`,
  ).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">${rays}<circle cx="64" cy="64" r="${FACE_R}" fill="${ray}" stroke="${feature}" stroke-width="2"/>${face}<circle cx="55" cy="59" r="1.4" fill="${feature}"/><circle cx="73" cy="59" r="1.4" fill="${feature}"/></svg>`;
}

export function SolDeMayo({ className }: { className?: string }) {
  return (
    <svg
      className={["sol", className].filter(Boolean).join(" ")}
      viewBox="0 0 128 128"
      aria-hidden="true"
      focusable="false"
    >
      <g className="sol__rays">
        {RAYS.map((d, index) => (
          <path key={index} d={d} />
        ))}
      </g>
      <circle className="sol__disc" cx="64" cy="64" r={FACE_R} />
      <g className="sol__face">
        {FACE.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <circle className="sol__pupil" cx="55" cy="59" r="1.4" />
      <circle className="sol__pupil" cx="73" cy="59" r="1.4" />
    </svg>
  );
}
