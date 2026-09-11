import * as THREE from "three";
import type { MapGeometry } from "@/app/lib/map-geometry";

export type MapController = {
  update: (geometry: MapGeometry, selected: number) => void;
  dispose: () => void;
};

/** The optional 3D layer follows the same measured paths as the readable SVG. */
export function createMapScene(
  host: HTMLElement,
  initial: MapGeometry,
  initialSelected: number,
  onLost: () => void,
): MapController {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", {
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  if (!context) throw new Error("WebGL2 unavailable; keep the SVG map");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    context,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    0,
    initial.width,
    initial.height,
    0,
    0.1,
    100,
  );
  camera.position.z = 30;
  const ambient = new THREE.AmbientLight(0xffffff, 2);
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(40, 100, 50);
  scene.add(ambient, light);
  const trails = new THREE.Group();
  scene.add(trails);
  const beadGeometry = new THREE.SphereGeometry(2.8, 12, 8);
  const beadMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.35,
    roughness: 0.35,
  });
  const bead = new THREE.Mesh(beadGeometry, beadMaterial);
  scene.add(bead);
  let selected = initialSelected,
    frame = 0,
    disposed = false,
    start = 0;
  let activePoints: THREE.Vector3[] = [];
  const releaseTrails = () => {
    for (const child of [...trails.children]) {
      const mesh = child as THREE.Mesh<THREE.BufferGeometry, THREE.Material>;
      mesh.geometry.dispose();
      mesh.material.dispose();
      trails.remove(mesh);
    }
  };
  const draw = (now: number) => {
    if (disposed) return;
    const t = Math.min((now - start) / 1600, 1);
    bead.visible = t < 1 && activePoints.length > 1;
    if (bead.visible) {
      const index = t * (activePoints.length - 1),
        lo = Math.floor(index);
      bead.position
        .copy(activePoints[lo])
        .lerp(
          activePoints[Math.min(lo + 1, activePoints.length - 1)],
          index - lo,
        );
      bead.position.z = 3;
    }
    renderer.render(scene, camera);
    if (t < 1) frame = requestAnimationFrame(draw);
    else {
      frame = 0;
      host.dataset.motion = "settled";
    }
  };
  const paintTheme = () => {
    const css = getComputedStyle(host),
      accent = css.getPropertyValue("--celeste").trim(),
      edge = css.getPropertyValue("--edge").trim();
    beadMaterial.color.set(accent);
    trails.children.forEach((child, index) => {
      const mesh = child as THREE.Mesh<
        THREE.BufferGeometry,
        THREE.MeshStandardMaterial
      >;
      mesh.material.color.set(index === selected ? accent : edge);
    });
  };
  const update = (geometry: MapGeometry, index: number) => {
    if (disposed) return;
    selected = index;
    cancelAnimationFrame(frame);
    releaseTrails();
    camera.right = geometry.width;
    camera.top = geometry.height;
    camera.updateProjectionMatrix();
    renderer.setSize(geometry.width, geometry.height, false);
    geometry.routes.forEach((route, i) => {
      const points = route.points.map(
        (p) => new THREE.Vector3(p.x, geometry.height - p.y, 0),
      );
      const path = new THREE.CurvePath<THREE.Vector3>();
      // Piecewise curves retain the clearance guaranteed by the SVG geometry.
      for (let j = 1; j < points.length; j++)
        path.add(new THREE.LineCurve3(points[j - 1], points[j]));
      const mesh = new THREE.Mesh(
        new THREE.TubeGeometry(
          path,
          Math.max(points.length, 80),
          i === index ? 1.3 : 0.65,
          8,
          false,
        ),
        new THREE.MeshStandardMaterial({
          metalness: 0.25,
          roughness: 0.48,
        }),
      );
      trails.add(mesh);
      if (i === index) activePoints = points;
    });
    paintTheme();
    start = performance.now();
    host.dataset.motion = "running";
    frame = requestAnimationFrame(draw);
  };
  const lost = (event: Event) => {
    event.preventDefault();
    onLost();
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  // A color change recolors existing meshes; it does not replay delivery flow.
  const theme = new MutationObserver(() => {
    if (disposed) return;
    paintTheme();
    renderer.render(scene, camera);
  });
  theme.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  update(initial, initialSelected);
  return {
    update,
    dispose: () => {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      theme.disconnect();
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      releaseTrails();
      beadGeometry.dispose();
      beadMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
      delete host.dataset.motion;
    },
  };
}
