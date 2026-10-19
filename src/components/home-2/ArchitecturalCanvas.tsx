import { useEffect, useRef } from "react";

/**
 * ArchitecturalCanvas — a lightweight Three.js wireframe of a gabled house.
 *
 * Intent: a restrained, elegant material/form study behind the hero — not a
 * game scene, not particles, not a heavy model. A few dozen line segments,
 * slow rotation, subtle mouse parallax, fog for depth. Degrades silently:
 * if WebGL or the three chunk fails to load, the canvas stays empty and the
 * hero still renders fully (green gradient + image + copy).
 *
 * SSR-safe: `three` is dynamically imported inside useEffect, so it never
 * runs on the server and never ships in the critical bundle.
 * `prefers-reduced-motion` renders a single static frame (no rAF).
 */
export function ArchitecturalCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mounted = true;
    let rafId = 0;
    let renderer: import("three").WebGLRenderer | null = null;
    let scene: import("three").Scene | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let group: import("three").Group | null = null;
    const disposables: Array<() => void> = [];

    const target = { rx: 0, ry: 0 };
    const cur = { rx: 0.12, ry: -0.5 };

    const onResize = () => {
      if (!el || !renderer || !camera) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const onPointer = (e: PointerEvent) => {
      if (!el) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.ry = -0.5 + nx * 0.35;
      target.rx = 0.12 + ny * 0.18;
    };

    (async () => {
      try {
        const THREE = await import("three");
        if (!mounted || !el) return;

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x0d3d32, 9, 24);

        const w = el.clientWidth || 1280;
        const h = el.clientHeight || 720;
        camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
        camera.position.set(6.4, 4.3, 8.6);
        camera.lookAt(0, 1.5, 0);

        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl", {
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        if (!gl) return; // no WebGL — hero keeps its gradient/image
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        el.appendChild(renderer.domElement);

        group = new THREE.Group();
        scene.add(group);

        // Brand-aligned line materials (sage + gold accent), from src/styles.css tokens.
        const sage = new THREE.LineBasicMaterial({
          color: 0x8fb3a0,
          transparent: true,
          opacity: 0.9,
        });
        const dim = new THREE.LineBasicMaterial({
          color: 0x4f6f60,
          transparent: true,
          opacity: 0.55,
        });
        const gold = new THREE.LineBasicMaterial({
          color: 0xbb895c,
          transparent: true,
          opacity: 0.95,
        });

        // Gabled house: floor, eave/wall lines, ridge, roof slopes.
        const Wd = 3.4,
          Dd = 4.6,
          Hh = 2.1,
          Pk = 3.4;
        const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
        const fBL = v(-Wd / 2, 0, -Dd / 2),
          fBR = v(Wd / 2, 0, -Dd / 2),
          bBL = v(-Wd / 2, 0, Dd / 2),
          bBR = v(Wd / 2, 0, Dd / 2);
        const eBL = v(-Wd / 2, Hh, -Dd / 2),
          eBR = v(Wd / 2, Hh, -Dd / 2),
          bEL = v(-Wd / 2, Hh, Dd / 2),
          bER = v(Wd / 2, Hh, Dd / 2);
        const rF = v(0, Pk, -Dd / 2),
          rB = v(0, Pk, Dd / 2);

        const segs: Array<
          [import("three").Vector3, import("three").Vector3, import("three").Material]
        > = [
          [fBL, fBR, dim],
          [fBR, bBR, dim],
          [bBR, bBL, dim],
          [bBL, fBL, dim],
          [fBL, eBL, sage],
          [fBR, eBR, sage],
          [bBR, bER, sage],
          [bBL, bEL, sage],
          [eBL, eBR, sage],
          [eBR, bER, sage],
          [bER, bEL, sage],
          [bEL, eBL, sage],
          [eBR, rF, gold],
          [eBL, rF, gold],
          [bER, rB, gold],
          [bEL, rB, gold],
          [rF, rB, gold],
        ];

        for (const [a, b, mat] of segs) {
          const g = new THREE.BufferGeometry().setFromPoints([a, b]);
          group.add(new THREE.Line(g, mat));
          disposables.push(() => g.dispose());
        }

        // Faint reference grid on the ground for an architectural-drawing feel.
        const grid = new THREE.GridHelper(
          22,
          22,
          0x2f5247,
          0x1c453b,
        ) as unknown as import("three").Object3D & {
          material: import("three").Material;
          geometry: import("three").BufferGeometry;
        };
        (grid as unknown as import("three").Object3D).position.y = -0.01;
        (grid.material as import("three").Material).transparent = true;
        (grid.material as import("three").Material).opacity = 0.22;
        group.add(grid);
        disposables.push(() => {
          (grid as unknown as { geometry?: import("three").BufferGeometry }).geometry?.dispose?.();
          (grid.material as import("three").Material)?.dispose?.();
        });

        [sage, dim, gold].forEach((m) => disposables.push(() => m.dispose()));

        let visible = true;
        const io = new IntersectionObserver(
          ([entry]) => {
            if (!entry) return;
            visible = entry.isIntersecting;
          },
          { threshold: 0 },
        );
        io.observe(el);
        disposables.push(() => io.disconnect());

        window.addEventListener("resize", onResize, { passive: true });
        disposables.push(() => window.removeEventListener("resize", onResize));

        if (!reduce) {
          window.addEventListener("pointermove", onPointer, { passive: true });
          disposables.push(() => window.removeEventListener("pointermove", onPointer));
        }

        const render = () => {
          rafId = requestAnimationFrame(render);
          if (!visible || !renderer || !scene || !camera) return;
          if (!reduce) {
            cur.ry += (target.ry - cur.ry) * 0.055;
            cur.rx += (target.rx - cur.rx) * 0.055;
            group!.rotation.y = cur.ry + Math.sin(performance.now() * 0.00009) * 0.06;
            group!.rotation.x = cur.rx;
          }
          renderer.render(scene, camera);
        };
        render();
        if (reduce) renderer.render(scene, camera); // one static frame
      } catch {
        // graceful — no canvas, hero still works
      }
    })();

    return () => {
      mounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      disposables.forEach((fn) => fn());
      if (renderer) {
        renderer.dispose();
        const dom = renderer.domElement;
        if (dom?.parentNode) dom.parentNode.removeChild(dom);
      }
    };
  }, []);

  return <div ref={ref} className={className} aria-hidden="true" />;
}
