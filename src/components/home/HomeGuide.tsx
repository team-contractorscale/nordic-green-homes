import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { GUIDE } from "@/lib/home-content";
import { Eyebrow, H2 } from "./shared";

/* ---------- 8. Guide — "Future-proofing your home" ----------
 * A 3D book (CSS 3D, so the title stays crisp) on a glowing stage. GSAP in useHomeMotion:
 * the book turns toward the reader as the section scrolls in ([data-book-scroll], scrub),
 * tilts with the pointer ([data-book-stage] → [data-book], quickTo) and floats gently.
 * Topic rows get a gold sweep on hover and stagger in on scroll ([data-guide-topic]).
 * The cover is a draft stand-in built from the supplied logo, not the real guide cover.
 */

const W = 272; // px — book face
const H = 360;
const D = 34; // thickness

const face: CSSProperties = { position: "absolute", backfaceVisibility: "hidden" };

export function HomeGuide() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-28">
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* book stage */}
        <div data-reveal="scale" className="lg:col-span-5">
          <div
            data-book-stage
            className="relative mx-auto grid aspect-square w-full max-w-[28rem] place-items-center"
            style={{ perspective: "1400px" }}
          >
            <span
              aria-hidden
              className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(187_137_92/0.28),transparent_65%)]"
            />
            <span aria-hidden className="absolute inset-[14%] rounded-full border border-gold/30" />
            <span
              aria-hidden
              className="absolute inset-[24%] rounded-full border border-dashed border-primary/15"
            />
            <span
              aria-hidden
              className="absolute bottom-[9%] h-6 w-1/2 rounded-full bg-black/25 blur-xl"
            />

            <div data-book-scroll style={{ transformStyle: "preserve-3d" }}>
              <div
                data-book
                className="relative"
                style={{
                  width: W,
                  height: H,
                  transformStyle: "preserve-3d",
                  transform: "rotateY(-24deg) rotateX(6deg)",
                }}
              >
                {/* front cover */}
                <div
                  className="flex flex-col items-center justify-between overflow-hidden rounded-r-md bg-primary p-7 text-center text-white shadow-2xl"
                  style={{ ...face, inset: 0, transform: `translateZ(${D / 2}px)` }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-3 w-px bg-gradient-to-b from-white/0 via-white/25 to-white/0"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/25 to-transparent"
                  />
                  <img src="/brand/nordic-logo-light.png" alt="" className="relative mt-2 w-32" />
                  <div className="relative">
                    <span aria-hidden className="mx-auto mb-4 block h-px w-10 bg-gold" />
                    <p className="font-serif text-2xl leading-tight">{GUIDE.title}</p>
                  </div>
                </div>
                {/* back */}
                <div
                  className="rounded-l-md bg-brand-dark"
                  style={{
                    ...face,
                    inset: 0,
                    transform: `translateZ(${-D / 2}px) rotateY(180deg)`,
                  }}
                />
                {/* spine */}
                <div
                  className="bg-gradient-to-r from-brand-dark to-primary"
                  style={{
                    ...face,
                    top: 0,
                    left: -D / 2,
                    width: D,
                    height: H,
                    transform: "rotateY(-90deg)",
                  }}
                />
                {/* page block */}
                <div
                  className="bg-[repeating-linear-gradient(90deg,#f4f4f2_0_2px,#e2e5e4_2px_3px)]"
                  style={{
                    ...face,
                    top: 4,
                    left: W - D / 2 - 3,
                    width: D - 2,
                    height: H - 8,
                    transform: "rotateY(90deg)",
                  }}
                />
                {/* top edge */}
                <div
                  className="bg-[repeating-linear-gradient(0deg,#f4f4f2_0_2px,#e2e5e4_2px_3px)]"
                  style={{
                    ...face,
                    left: 0,
                    top: -D / 2,
                    width: W - 3,
                    height: D,
                    transform: "rotateX(90deg)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow>{GUIDE.eyebrow}</Eyebrow>
          <h2 data-anim="reveal" className={`${H2} mt-4`}>
            {GUIDE.title}
          </h2>
          <p
            data-anim="reveal"
            className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            {GUIDE.body}
          </p>

          <ul className="mt-8 border-t border-border">
            {GUIDE.topics.map((t, i) => (
              <li key={t.title} data-guide-topic>
                <div className="group/topic relative flex items-start gap-5 overflow-hidden border-b border-border px-2 py-5">
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-gold/15 to-transparent transition-transform duration-500 ease-out group-hover/topic:scale-x-100"
                  />
                  <span className="relative font-serif text-lg text-gold">0{i + 1}</span>
                  <div className="relative flex-1">
                    <p className="text-base font-bold text-foreground transition-transform duration-500 group-hover/topic:translate-x-2">
                      {t.title}
                    </p>
                    <p className="mt-1 text-base leading-relaxed text-muted-foreground">{t.body}</p>
                  </div>
                  <ArrowUpRight
                    aria-hidden
                    className="relative mt-1 size-5 shrink-0 text-primary/40 transition-all duration-500 group-hover/topic:rotate-45 group-hover/topic:text-gold"
                  />
                </div>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/resources"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-primary px-6 text-base font-bold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              {GUIDE.cta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
