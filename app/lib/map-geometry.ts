export type Rect = { x: number; y: number; width: number; height: number };
export type Point = { x: number; y: number };
export type MapRoute = { d: string; points: Point[] };
export type MapGeometry = { width: number; height: number; routes: MapRoute[] };

/** Ports sit outside complete label groups, including their captions. */
export function mapGeometry(
  width: number,
  height: number,
  nodes: Rect[],
  hub: Rect,
): MapGeometry {
  const hx = hub.x,
    hy = hub.y,
    hm = hy + hub.height / 2,
    hc = hx + hub.width / 2,
    hr = hx + hub.width;
  const routes = nodes.map((node, i) => {
    let x = node.x + node.width / 2,
      y = node.y + node.height + 7;
    let d = `M ${x} ${y}`;
    const points = [{ x, y }];
    const line = (tx: number, ty: number) => {
      d += ` L ${tx} ${ty}`;
      for (let j = 1; j <= 12; j++) {
        const t = j / 12;
        points.push({ x: x + (tx - x) * t, y: y + (ty - y) * t });
      }
      x = tx;
      y = ty;
    };
    const curve = (
      a: number,
      b: number,
      c: number,
      e: number,
      tx: number,
      ty: number,
    ) => {
      d += ` C ${a} ${b} ${c} ${e} ${tx} ${ty}`;
      for (let j = 1; j <= 40; j++) {
        const t = j / 40,
          u = 1 - t;
        points.push({
          x: u ** 3 * x + 3 * u ** 2 * t * a + 3 * u * t ** 2 * c + t ** 3 * tx,
          y: u ** 3 * y + 3 * u ** 2 * t * b + 3 * u * t ** 2 * e + t ** 3 * ty,
        });
      }
      x = tx;
      y = ty;
    };
    if (width <= 480) {
      if (i === 0) {
        line(x, y + 18);
        line(8, y);
        line(8, hm);
        line(hx - 8, hm);
      }
      if (i === 1) {
        line(width - 8, y);
        line(width - 8, hm);
        line(hr + 5, hm);
      }
      if (i === 2) {
        line(x, hy - 20);
        line(hc, hy - 20);
        line(hc, hy - 7);
      }
    } else {
      if (i === 0) curve(x, hm - 55, hx - 64, hm, hx - 8, hm);
      if (i === 1) {
        const lane = width * 0.5;
        curve(x, y + 32, lane, y + 32, lane, y + 78);
        line(lane, hy - 40);
        curve(lane, hy - 18, hc, hy - 36, hc, hy - 8);
      }
      if (i === 2) curve(width - 13, y + 12, width - 13, hm, hr + 8, hm);
    }
    return { d, points };
  });
  return { width, height, routes };
}
