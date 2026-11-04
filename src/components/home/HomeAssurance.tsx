import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMAGES, TIME } from "@/lib/home-content";
import { RefImg } from "./shared";
import { HEADING, Kicker } from "./kit";

gsap.registerPlugin(ScrollTrigger);

// three.js only loads once the section is near the viewport (module + three are both deferred).
const HouseLines = lazy(() =>
  import("@/components/three/HouseLines").then((m) => ({ default: m.HouseLines })),
);

/* ---------- 3. More time for living ----------
 * Highwater's "Lifesize" moment, in Nordic terms: a gold line drawing of a gabled home builds
 * itself in WebGL beside the building-and-design copy. Desktop + motion: the section pins and scroll
 * scrubs the drawing (progress ref → HouseLines). Mobile: it draws itself once in view.
 * Reduced motion: one finished, static frame. No WebGL: the copy stands on its own.
 * Pinned, so the <section> sits inside a plain wrapper <div> (pin-spacer safety).
 */

export function HomeAssurance() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(-1);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "50% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      progress.current = 0;
      ScrollTrigger.create({ trigger: el, start: "top top", end: "+=140%", pin: true });
      // Drawing starts as the section scrolls in and completes as the pin releases.
      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        end: () => `+=${window.innerHeight * 2.1}`,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
      return () => {
        progress.current = -1;
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div>
      <section
        ref={sectionRef}
        data-section="More time for living"
        className="grain relative isolate overflow-hidden bg-brand-dark py-24 text-white sm:py-28 lg:flex lg:h-svh lg:items-center lg:py-0"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_75%_50%,rgb(187_137_92/0.14),transparent_70%)]"
        />
        <div className="wrap grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker dark>{TIME.eyebrow}</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              {TIME.title}
            </h2>
            <p data-reveal className="mt-6 font-serif text-xl text-gold">
              {TIME.subtitle}
            </p>
            <div className="mt-4 max-w-xl space-y-4 text-base leading-relaxed text-white/80">
              {TIME.body.map((p) => (
                <p key={p} data-reveal>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="relative h-[22rem] sm:h-[28rem] lg:col-span-7 lg:h-[72svh]">
            {near && (
              <Suspense fallback={null}>
                <HouseLines progress={progress} className="absolute inset-0" />
              </Suspense>
            )}
            <div
              data-reveal-img
              className="absolute bottom-0 left-0 w-44 border border-white/15 p-1.5 sm:w-60"
            >
              <RefImg
                image={IMAGES.interior}
                className="aspect-[4/3]"
                tagClassName="left-2 top-2"
              />
            </div>
            <p className="absolute bottom-0 right-0 flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-white/60">
              <span aria-hidden className="h-px w-8 bg-gold" />
              Building and design, one conversation
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
