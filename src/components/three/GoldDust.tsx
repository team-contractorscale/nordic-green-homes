import { useEffect, useRef } from "react";

/**
 * GoldDust — a soft field of drifting gold "pollen" points (three.js).
 *
 * - `three` is imported dynamically inside the effect: never runs on the server, never in the
 *   critical bundle. No WebGL → renders nothing, the section underneath is unaffected.
 * - Pauses its render loop while off-screen (IntersectionObserver) and on hidden tabs.
 * - prefers-reduced-motion → not mounted at all (decorative only).
 * - Pointer parallax: the whole field eases toward the cursor.
 */
export function GoldDust({
  className = "",
  count = 520,
  color = 0xbb895c,
  opacity = 0.85,
}: {
  className?: string;
  count?: number;
  color?: number;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let raf = 0;
    let visible = true;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const canvas = document.createElement("canvas");
      if (!canvas.getContext("webgl2") && !canvas.getContext("webgl")) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setClearColor(0x000000, 0);
      canvas.style.cssText = "width:100%;height:100%;display:block";
      el.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.z = 14;

      // Positions spread through a slab in front of the camera; per-point drift speed + phase.
      const pos = new Float32Array(count * 3);
      const speed = new Float32Array(count);
      const phase = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 34;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
        speed[i] = 0.12 + Math.random() * 0.35;
        phase[i] = Math.random() * Math.PI * 2;
      }
      const geo = new THREE.BufferGeometry();
      const posAttr = new THREE.BufferAttribute(pos, 3);
      geo.setAttribute("position", posAttr);

      // Soft round sprite drawn once to a canvas — no external texture request.
      const dot = document.createElement("canvas");
      dot.width = dot.height = 64;
      const g = dot.getContext("2d");
      if (g) {
        const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        grd.addColorStop(0, "rgba(255,255,255,1)");
        grd.addColorStop(0.35, "rgba(255,255,255,0.55)");
        grd.addColorStop(1, "rgba(255,255,255,0)");
        g.fillStyle = grd;
        g.fillRect(0, 0, 64, 64);
      }
      const tex = new THREE.CanvasTexture(dot);

      const mat = new THREE.PointsMaterial({
        color,
        size: 0.22,
        map: tex,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

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

      const target = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const io = new IntersectionObserver(([entry]) => {
        visible = !!entry?.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(tick);
      });
      io.observe(el);

      const clock = new THREE.Clock();
      function tick() {
        raf = 0;
        if (disposed || !visible || document.hidden) return;
        // getDelta() also advances elapsedTime; calling getElapsedTime() first would zero dt.
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;
        for (let i = 0; i < count; i++) {
          let y = (pos[i * 3 + 1] ?? 0) + (speed[i] ?? 0) * dt * 1.4;
          if (y > 10) y = -10;
          pos[i * 3 + 1] = y;
          pos[i * 3] = (pos[i * 3] ?? 0) + Math.sin(t * 0.4 + (phase[i] ?? 0)) * 0.004;
        }
        posAttr.needsUpdate = true;
        points.rotation.y += (target.x * 0.12 - points.rotation.y) * 0.03;
        points.rotation.x += (target.y * 0.08 - points.rotation.x) * 0.03;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      }
      const onVis = () => {
        if (!document.hidden && visible && !raf) raf = requestAnimationFrame(tick);
      };
      document.addEventListener("visibilitychange", onVis);
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onPointer);
        document.removeEventListener("visibilitychange", onVis);
        geo.dispose();
        mat.dispose();
        tex.dispose();
        renderer.dispose();
        canvas.remove();
      };
    })().catch(() => {});

    return () => {
      disposed = true;
      cleanup();
    };
  }, [count, color, opacity]);

  return <div ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
