import { useEffect, useRef, type MutableRefObject } from "react";

/**
 * HouseLines — a gabled Nordic-style house drawn line by line in gold (three.js).
 *
 * `progress` (0–1) controls how much of the drawing is visible and how far the camera has
 * orbited. Pass a ref that GSAP writes to (scroll-scrubbed); while it is negative the component
 * animates itself (used on touch / non-pinned layouts). prefers-reduced-motion → one finished,
 * static frame. three is dynamically imported, so it never runs on the server.
 */

type V = [number, number, number];

function houseSegments(): V[] {
  const s: V[] = [];
  const seg = (a: V, b: V) => s.push(a, b);
  const loop = (pts: V[]) => pts.forEach((p, i) => seg(p, pts[(i + 1) % pts.length] as V));

  // main volume: 4 wide (x), 3 deep (z), 2.4 high walls, gable ends on ±x, ridge along x
  const [x0, x1, z0, z1, h, ridge] = [-2, 2, -1.5, 1.5, 2.4, 4.1];
  loop([
    [x0, 0, z0],
    [x1, 0, z0],
    [x1, 0, z1],
    [x0, 0, z1],
  ]);
  [
    [x0, z0],
    [x1, z0],
    [x1, z1],
    [x0, z1],
  ].forEach(([x, z]) => seg([x!, 0, z!], [x!, h, z!]));
  loop([
    [x0, h, z0],
    [x1, h, z0],
    [x1, h, z1],
    [x0, h, z1],
  ]);
  // steep gables + ridge + eaves overhang
  seg([x0, h, z0], [x0, ridge, 0]);
  seg([x0, ridge, 0], [x0, h, z1]);
  seg([x1, h, z0], [x1, ridge, 0]);
  seg([x1, ridge, 0], [x1, h, z1]);
  seg([x0 - 0.2, ridge, 0], [x1 + 0.2, ridge, 0]);
  seg([x0 - 0.2, h - 0.1, z1 + 0.25], [x1 + 0.2, h - 0.1, z1 + 0.25]);
  seg([x0 - 0.2, h - 0.1, z0 - 0.25], [x1 + 0.2, h - 0.1, z0 - 0.25]);
  seg([x0 - 0.2, ridge, 0], [x0 - 0.2, h - 0.1, z1 + 0.25]);
  seg([x1 + 0.2, ridge, 0], [x1 + 0.2, h - 0.1, z1 + 0.25]);
  // big gable window on +x end
  loop([
    [x1, 1.2, -0.6],
    [x1, 1.2, 0.6],
    [x1, 3.1, 0.6],
    [x1, 3.1, -0.6],
  ]);
  seg([x1, 1.2, 0], [x1, 3.1, 0]);
  // front (z1) door + two windows
  loop([
    [-0.4, 0, z1],
    [0.4, 0, z1],
    [0.4, 1.6, z1],
    [-0.4, 1.6, z1],
  ]);
  loop([
    [-1.6, 0.9, z1],
    [-0.9, 0.9, z1],
    [-0.9, 1.9, z1],
    [-1.6, 1.9, z1],
  ]);
  loop([
    [0.9, 0.9, z1],
    [1.6, 0.9, z1],
    [1.6, 1.9, z1],
    [0.9, 1.9, z1],
  ]);
  // chimney
  const c: V[] = [
    [-1.1, 3.2, -0.6],
    [-0.6, 3.2, -0.6],
    [-0.6, 3.2, -0.2],
    [-1.1, 3.2, -0.2],
  ];
  c.forEach(([x, , z]) => seg([x, 3.2, z], [x, 4.5, z]));
  loop(c.map(([x, , z]) => [x, 4.5, z] as V));
  // low flat-roofed side wing on -x
  const [w0, w1, wz0, wz1, wh] = [-4.2, -2, -1.1, 1.3, 1.6];
  loop([
    [w0, 0, wz0],
    [w1, 0, wz0],
    [w1, 0, wz1],
    [w0, 0, wz1],
  ]);
  [
    [w0, wz0],
    [w0, wz1],
  ].forEach(([x, z]) => seg([x!, 0, z!], [x!, wh, z!]));
  loop([
    [w0, wh, wz0],
    [w1, wh, wz0],
    [w1, wh, wz1],
    [w0, wh, wz1],
  ]);
  loop([
    [-3.8, 0.5, wz1],
    [-2.4, 0.5, wz1],
    [-2.4, 1.3, wz1],
    [-3.8, 1.3, wz1],
  ]);
  // terrace line
  seg([x0 - 2.6, 0, z1 + 1.1], [x1 + 1, 0, z1 + 1.1]);
  return s;
}

export function HouseLines({
  progress,
  className = "",
}: {
  progress?: MutableRefObject<number>;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      const canvas = document.createElement("canvas");
      if (!canvas.getContext("webgl2") && !canvas.getContext("webgl")) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      canvas.style.cssText = "width:100%;height:100%;display:block";
      el.appendChild(canvas);

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x0d3d32, 12, 26);
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);

      const pts = houseSegments();
      const arr = new Float32Array(pts.flat());
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      const total = pts.length;
      const mat = new THREE.LineBasicMaterial({
        color: 0xbb895c,
        transparent: true,
        opacity: 0.95,
      });
      const lines = new THREE.LineSegments(geo, mat);
      scene.add(lines);

      // corner "nodes" that pop in as lines reach them
      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      const nodeMat = new THREE.PointsMaterial({ color: 0xf3e2cf, size: 0.07, transparent: true });
      const nodes = new THREE.Points(nodeGeo, nodeMat);
      scene.add(nodes);

      const grid = new THREE.GridHelper(22, 22, 0x2f6b5a, 0x1d5244);
      (grid.material as InstanceType<typeof THREE.Material>).transparent = true;
      (grid.material as InstanceType<typeof THREE.Material>).opacity = 0.55;
      scene.add(grid);

      const resize = () => {
        const w = el.clientWidth || 1;
        const h = el.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const pointer = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        pointer.x = e.clientX / window.innerWidth - 0.5;
        pointer.y = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([e]) => {
        visible = !!e?.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(tick);
      });
      io.observe(el);

      const start = performance.now();
      const look = new THREE.Vector3(-0.8, 2.1, 0);
      const cur = { p: reduce ? 1 : 0, px: 0, py: 0 };
      let raf = 0;

      function frame() {
        const external = progress?.current ?? -1;
        const auto = reduce ? 1 : Math.min(1, (performance.now() - start) / 2600);
        const target = external >= 0 ? external : auto;
        cur.p += (target - cur.p) * (reduce ? 1 : 0.08);
        cur.px += (pointer.x - cur.px) * 0.05;
        cur.py += (pointer.y - cur.py) * 0.05;

        const n = Math.floor((total * cur.p) / 2) * 2;
        geo.setDrawRange(0, n);
        nodeGeo.setDrawRange(0, n);

        const a = -0.95 + cur.p * 0.75 + cur.px * 0.35;
        const r = 15.5 - cur.p * 1.2;
        camera.position.set(Math.sin(a) * r, 3.6 + cur.p * 1.4 - cur.py * 1.4, Math.cos(a) * r);
        camera.lookAt(look);
        renderer.render(scene, camera);
      }
      function tick() {
        raf = 0;
        if (disposed || !visible || document.hidden) return;
        frame();
        if (!reduce) raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onPointer);
        geo.dispose();
        nodeGeo.dispose();
        mat.dispose();
        nodeMat.dispose();
        grid.geometry.dispose();
        renderer.dispose();
        canvas.remove();
      };
    })().catch(() => {});

    return () => {
      disposed = true;
      cleanup();
    };
  }, [progress]);

  return <div ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
