import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export type AssemblyController = {
  select: (index: number) => void;
  dispose: () => void;
};

/** No perpetual animation loop. Invalidate only for entrance, input, theme or size. */
export function createAssembly(
  host: HTMLElement,
  initialField: number,
  onFailure: () => void,
): AssemblyController {
  let frame = 0;
  let disposed = false;
  const cleanups: (() => void)[] = [];
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    for (const cleanup of cleanups.reverse()) {
      try {
        cleanup();
      } catch {
        /* Continue releasing the remaining resources. */
      }
    }
  };
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    if (!context) throw new Error("WebGL2 is unavailable");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      context,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    cleanups.push(() => {
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    cleanups.push(() => {
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.LineSegments
        ) {
          object.geometry.dispose();
          for (const material of Array.isArray(object.material)
            ? object.material
            : [object.material])
            materials.add(material);
        }
      });
      materials.forEach((material) => material.dispose());
    });
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(7, 4.8, 8);
    camera.lookAt(0, 0.1, 0);
    const pmrem = new THREE.PMREMGenerator(renderer);
    cleanups.push(() => pmrem.dispose());
    const room = new RoomEnvironment();
    cleanups.push(() => room.dispose());
    const environment = pmrem.fromScene(room, 0.04);
    cleanups.push(() => environment.dispose());
    scene.environment = environment.texture;

    scene.add(new THREE.HemisphereLight(0xe6efff, 0xaaa49a, 0.65));
    const light = new THREE.DirectionalLight(0xffffff, 2.4);
    light.position.set(-3, 7, 5);
    scene.add(light);
    const rim = new THREE.DirectionalLight(0x9dbbff, 0.6);
    rim.position.set(5, 1, -4);
    scene.add(rim);

    const assembly = new THREE.Group();
    scene.add(assembly);
    const configs = [
      { x: -1.75, z: 0.45, h: 3.65, c: 0x0646c7 },
      { x: -0.95, z: -0.85, h: 4.4, c: 0x242d33 },
      { x: 0.05, z: -1.25, h: 3.9, c: 0xa8b5c1 },
      { x: 0.95, z: 0.45, h: 3.45, c: 0x2a333a },
      { x: 1.85, z: -0.35, h: 3.15, c: 0x0646c7 },
    ];
    const plates = configs.map((config, i) => {
      const material = new THREE.MeshPhysicalMaterial({
        color: config.c,
        metalness: i === 0 || i === 4 ? 0.4 : 0.72,
        roughness: i === 0 || i === 4 ? 0.2 : 0.28,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        envMapIntensity: 1,
      });
      const plate = new THREE.Mesh(
        new RoundedBoxGeometry(0.12, config.h, 1.8, 3, 0.035),
        material,
      );
      plate.position.set(config.x, config.h / 2 - 1.75, config.z);
      assembly.add(plate);
      return plate;
    });
    const steel = new THREE.MeshStandardMaterial({
      color: 0xc9cfd4,
      metalness: 0.93,
      roughness: 0.24,
    });
    for (const z of [-0.55, 0.55]) {
      const rail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.055, 4.5, 20),
        steel,
      );
      rail.rotation.z = Math.PI / 2;
      rail.position.set(0, -0.2, z);
      assembly.add(rail);
    }
    const cube = new THREE.Mesh(
      new RoundedBoxGeometry(0.68, 0.68, 0.68, 3, 0.04),
      steel,
    );
    cube.position.set(0, -0.2, 0.55);
    assembly.add(cube);
    // A soft contact shadow stays inside the composition without a shadow-map
    // pass. Its texture is generated locally; no remote image or shader assets.
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 128;
    const shadowContext = shadowCanvas.getContext("2d");
    if (!shadowContext) throw new Error("Canvas2D is unavailable");
    const gradient = shadowContext.createRadialGradient(64, 64, 4, 64, 64, 64);
    gradient.addColorStop(0, "rgba(20, 28, 36, 0.3)");
    gradient.addColorStop(0.45, "rgba(20, 28, 36, 0.12)");
    gradient.addColorStop(1, "rgba(20, 28, 36, 0)");
    shadowContext.fillStyle = gradient;
    shadowContext.fillRect(0, 0, 128, 128);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;
    cleanups.push(() => shadowTexture.dispose());
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 5),
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.78;
    scene.add(floor);

    let selected = initialField;
    let targetX = 0;
    let targetY = 0;
    const started = performance.now();
    const draw = (now: number) => {
      frame = 0;
      if (disposed) return;
      let moving = now - started < 1400;
      assembly.rotation.y += (targetY - assembly.rotation.y) * 0.08;
      assembly.rotation.x += (targetX - assembly.rotation.x) * 0.08;
      moving ||=
        Math.abs(targetY - assembly.rotation.y) +
          Math.abs(targetX - assembly.rotation.x) >
        0.0005;
      plates.forEach((plate, i) => {
        const entrance = Math.max(0, 1 - (now - started - i * 75) / 900);
        const target = configs[i].h / 2 - 1.75 + (selected === i ? 0.18 : 0);
        plate.position.y += (target - plate.position.y) * 0.1;
        plate.position.z = configs[i].z + entrance ** 3 * (i % 2 ? -0.8 : 0.8);
        plate.material.emissive.setHex(selected === i ? 0x0b2e60 : 0x000000);
        moving ||= Math.abs(target - plate.position.y) > 0.001;
      });
      try {
        renderer.render(scene, camera);
      } catch {
        dispose();
        onFailure();
        return;
      }
      if (moving) invalidate();
    };
    const invalidate = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      invalidate();
    };
    const pointer = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      targetY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.16;
      targetX = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.07;
      invalidate();
    };
    const leave = () => {
      targetX = targetY = 0;
      invalidate();
    };
    const theme = () => {
      const dark = document.documentElement.dataset.theme === "dark";
      renderer.toneMappingExposure = dark ? 1.3 : 1;
      floor.material.opacity = dark ? 0.5 : 1;
      invalidate();
    };
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    const sizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(theme);
    cleanups.push(() => {
      sizeObserver.disconnect();
      themeObserver.disconnect();
      host.removeEventListener("pointermove", pointer);
      host.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
    });
    sizeObserver.observe(host);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    host.addEventListener("pointermove", pointer);
    host.addEventListener("pointerleave", leave);
    renderer.domElement.addEventListener("webglcontextlost", lost);
    resize();
    theme();
    renderer.render(scene, camera);

    return {
      select(index) {
        selected = index;
        invalidate();
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
