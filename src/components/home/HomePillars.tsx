import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { PILLARS } from "@/lib/home-content";
import { Eyebrow } from "./shared";

/* ---------- 4. Pillars — "What guides us" ----------
 * Redesign intent: NOT a flat green band. A warm, light, editorial section with
 * an oversized faint serif watermark, a Three.js wireframe architectural motif
 * drifting behind the intro, and four principles in an asymmetric grid where
 * each card carries a soft photo panel that washes in on hover. The first card
 * is tall (feature), the next three are stacked — a magazine rhythm — so the
 * section reads as designed rather than a uniform box grid. Hover lifts, swaps
 * the mark to gold, blooms a glow, and parallax-shifts the photo.
 */

// Small line-art marks so each principle reads as its own idea without an icon library.
const PILLAR_MARK: Record<(typeof PILLARS)[number]["title"], ReactNode> = {
  Sustainability: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21c5-3 7-7 7-12 0-2-1-4-3-5-1 3-3 4-4 5-2 2-3 4-3 7 0 2 1 4 3 5Z" />
      <path d="M12 21V11" />
    </svg>
  ),
  Family: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="8" cy="7" r="2.4" />
      <circle cx="16" cy="7" r="2.4" />
      <path d="M4 20c0-3 2-5 4-5s4 2 4 5" />
      <path d="M12 20c0-3 2-5 4-5s4 2 4 5" />
    </svg>
  ),
  "Bespoke luxury": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3l2.4 5 5.6.6-4 3.8 1.2 5.6L12 15.8 6.8 18l1.2-5.6-4-3.8 5.6-.6L12 3Z" />
    </svg>
  ),
  "Faith & integrity": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3l7 3v5c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6l7-3Z" />
      <path d="M9.5 11.5l2 2 3.5-3.5" />
    </svg>
  ),
};

/**
 * A very light, SSR-safe Three.js wireframe motif behind the section intro:
 * a slow drifting grid + a faint gabled outline. Degrades silently if WebGL /
 * the three chunk fails — the section still renders fully. Respects
 * reduced-motion (one static frame).
 */
function WireMotif({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mounted = true;
    let raf = 0;
    let renderer: import("three").WebGLRenderer | null = null;
    let scene: import("three").Scene | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let grid: import("three").LineSegments | null = null;
    let gable: import("three").Group | null = null;
    const disposables: Array<() => void> = [];

    (async () => {
      try {
        const THREE = await import("three");
        if (!mounted || !el) return;
        const w = el.clientWidth || 600;
        const h = el.clientHeight || 360;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        camera.position.set(0, 3, 12);
        camera.lookAt(0, 0, 0);

        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl", { antialias: true, alpha: true });
        if (!gl) return;
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        el.appendChild(renderer.domElement);

        const sageMat = new THREE.LineBasicMaterial({
          color: 0x6f8a7a,
          transparent: true,
          opacity: 0.5,
        });
        const goldMat = new THREE.LineBasicMaterial({
          color: 0xbb895c,
          transparent: true,
          opacity: 0.45,
        });

        grid = new THREE.GridHelper(
          40,
          40,
          0xb7c2bb,
          0xd6ddd8,
        ) as unknown as import("three").LineSegments;
        grid.position.y = -2;
        (grid.material as import("three").Material).transparent = true;
        (grid.material as import("three").Material).opacity = 0.4;
        scene.add(grid);
        disposables.push(() => {
          (grid as unknown as { geometry?: import("three").BufferGeometry }).geometry?.dispose?.();
          (grid as unknown as { material?: import("three").Material }).material?.dispose?.();
        });

        // faint gabled house outline
        gable = new THREE.Group();
        const Wd = 3,
          Dd = 4,
          Hh = 1.6,
          Pk = 2.7;
        const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
        const pts: Array<[import("three").Vector3, import("three").Vector3]> = [
          [v(-Wd / 2, 0, -Dd / 2), v(Wd / 2, 0, -Dd / 2)],
          [v(Wd / 2, 0, -Dd / 2), v(Wd / 2, Hh, -Dd / 2)],
          [v(Wd / 2, Hh, -Dd / 2), v(-Wd / 2, Hh, -Dd / 2)],
          [v(-Wd / 2, Hh, -Dd / 2), v(-Wd / 2, 0, -Dd / 2)],
          [v(-Wd / 2, Hh, -Dd / 2), v(0, Pk, -Dd / 2)],
          [v(Wd / 2, Hh, -Dd / 2), v(0, Pk, -Dd / 2)],
        ];
        for (const [a, b] of pts) {
          const g = new THREE.BufferGeometry().setFromPoints([a, b]);
          gable.add(new THREE.Line(g, sageMat));
          disposables.push(() => g.dispose());
        }
        gable.position.set(2.5, -1.4, 0);
        scene.add(gable);
        [sageMat, goldMat].forEach((m) => disposables.push(() => m.dispose()));

        const onResize = () => {
          if (!el || !renderer || !camera) return;
          const ww = el.clientWidth;
          const hh = el.clientHeight;
          if (!ww || !hh) return;
          renderer.setSize(ww, hh);
          camera.aspect = ww / hh;
          camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", onResize, { passive: true });
        disposables.push(() => window.removeEventListener("resize", onResize));

        let visible = true;
        const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting), {
          threshold: 0,
        });
        io.observe(el);
        disposables.push(() => io.disconnect());

        const render = () => {
          raf = requestAnimationFrame(render);
          if (!visible || !renderer || !scene || !camera) return;
          if (!reduce && gable && grid) {
            const t = performance.now() * 0.00006;
            gable.rotation.y = t;
            gable.position.x = 2.5 + Math.sin(t * 1.6) * 0.4;
            grid.rotation.y = t * 0.5;
          }
          renderer.render(scene, camera);
        };
        render();
        if (reduce) renderer.render(scene, camera);
      } catch {
        // graceful — section keeps its copy + photo panels
      }
    })();

    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
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

export function HomePillars() {
  return (
    <section className="relative overflow-hidden bg-secondary/60 py-24 text-foreground sm:py-32">
      {/* warm paper texture + faint serif watermark for editorial warmth, not flat green */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_15%_0%,rgb(187_137_92/0.07),transparent_60%),radial-gradient(ellipse_55%_50%_at_100%_100%,rgb(18_85_69/0.06),transparent_60%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-0 hidden select-none font-serif text-[16rem] leading-none text-primary/[0.05] lg:block"
      >
        Values
      </span>

      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            {/* Three.js wireframe motif drifting behind the intro */}
            <div className="relative">
              <WireMotif className="pointer-events-none absolute -top-6 right-0 hidden h-48 w-72 opacity-70 lg:block" />
              <Eyebrow>What guides us</Eyebrow>
              <h2
                data-anim="reveal"
                className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-foreground"
              >
                Four principles behind every home
              </h2>
            </div>
          </div>
          <div className="lg:col-span-5">
            <p data-anim="reveal" className="text-base leading-relaxed text-muted-foreground">
              The values that shape every decision, from the first sketch to the day you move in.
              Not a checklist — the way we think about a home before a single plan is drawn.
            </p>
            <Link
              to="/about-us"
              className="group mt-5 inline-flex shrink-0 items-center gap-2 text-base font-bold text-primary underline underline-offset-4 hover:text-gold"
            >
              More about us
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Asymmetric magazine grid: one tall feature card + three stacked cards */}
        <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
          {PILLARS.map((p, i) => {
            const feature = i === 0;
            return (
              <article
                key={p.title}
                data-pillar
                className={`group relative flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-xl hover:shadow-primary/10 sm:p-8 ${
                  feature ? "lg:col-span-5 lg:row-span-2 min-h-[22rem]" : "lg:col-span-7"
                }`}
              >
                {/* gold top accent bar — draws in on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
                />
                {/* hover glow blob */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                />

                <div className="flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-full border border-border bg-secondary text-gold/80 transition-all duration-500 group-hover:border-gold/40 group-hover:bg-gold/10 group-hover:text-gold">
                    <span className="size-7">{PILLAR_MARK[p.title]}</span>
                  </span>
                  <span className="font-serif text-5xl leading-none text-primary/15 transition-all duration-500 group-hover:text-gold/45 sm:text-6xl">
                    0{i + 1}
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                    {p.body}
                  </p>
                </div>

                {feature && (
                  <span
                    aria-hidden
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 group-hover:text-gold"
                  >
                    The foundation
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
