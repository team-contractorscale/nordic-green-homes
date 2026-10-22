import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { IMAGES, PILLARS, type RefImage } from "@/lib/home-content";
import { Eyebrow, RefTag, imgProps } from "./shared";

/* ---------- 4. Pillars — "What guides the work" ----------
 * Expanding image panels on a deep-green band. Desktop: four panels in a row; the hovered /
 * focused / tapped one grows (flex-grow) to reveal its principle, the rest collapse to slim
 * columns with a vertical title. Mobile: stacked cards, everything visible.
 * Only 1920px renders are used here — the panels are large, smaller photos would blur.
 * GSAP (useHomeMotion): panels rise in with a staggered clip reveal ([data-pillar]).
 */

const PILLAR_MARK: Record<(typeof PILLARS)[number]["title"], ReactNode> = {
  "Considered design": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z" />
    </svg>
  ),
  "Clear decisions": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  ),
  "Responsible performance": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21a9 9 0 1 1 9-9" />
      <path d="M12 12l4-3" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  "Coordinated planning": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  ),
};

const PILLAR_IMAGE: Record<(typeof PILLARS)[number]["title"], RefImage> = {
  "Considered design": IMAGES.hausGarden,
  "Clear decisions": IMAGES.hausSide,
  "Responsible performance": IMAGES.hausRear,
  "Coordinated planning": IMAGES.farmhouseRear,
};

export function HomePillars() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-brand-dark py-24 text-white sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_10%_0%,rgb(187_137_92/0.16),transparent_60%),radial-gradient(ellipse_50%_60%_at_100%_100%,rgb(18_85_69/0.7),transparent_65%)]"
      />
      <div className="wrap relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow dark>What guides the work</Eyebrow>
            <h2
              data-anim="reveal"
              className="mt-4 font-serif text-[clamp(2rem,2vw+1rem,3rem)] leading-[1.1] tracking-[-0.01em]"
            >
              Four principles behind a considered home
            </h2>
          </div>
          <div data-anim="reveal" className="lg:col-span-5">
            <p className="text-base leading-relaxed text-white/85">
              The values that shape every decision, from the first sketch to the day you move in.
              Hover or tap a principle to open it.
            </p>
            <Link
              to="/about-us"
              className="group mt-4 inline-flex items-center gap-2 text-base font-bold text-white underline underline-offset-4 hover:text-gold"
            >
              More about us
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:flex lg:h-[34rem] lg:gap-3">
          {PILLARS.map((p, i) => {
            const open = i === active;
            const img = PILLAR_IMAGE[p.title];
            return (
              <button
                key={p.title}
                type="button"
                data-pillar
                aria-expanded={open}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ flexGrow: open ? 4 : 1 }}
                className="group relative isolate h-[22rem] min-w-0 basis-0 overflow-hidden rounded-lg text-left outline-none ring-gold/70 transition-[flex-grow] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:ring-2 lg:h-auto"
              >
                <img
                  {...imgProps(img, "(min-width: 1024px) 60vw, 100vw")}
                  loading="lazy"
                  className={`absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1200ms] ${
                    open ? "scale-100" : "scale-110"
                  }`}
                />
                <div
                  aria-hidden
                  className={`absolute inset-0 -z-10 bg-gradient-to-t transition-opacity duration-700 ${
                    open
                      ? "from-black/85 via-brand-dark/40 to-transparent"
                      : "from-brand-dark/95 via-brand-dark/70 to-brand-dark/40 max-lg:from-black/85 max-lg:via-brand-dark/40 max-lg:to-transparent"
                  }`}
                />

                {/* top row: index + mark */}
                <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3">
                  <span className="font-serif text-3xl leading-none text-gold">0{i + 1}</span>
                  <span className="grid size-11 place-items-center rounded-full border border-white/20 bg-white/10 text-gold backdrop-blur-md transition-transform duration-500 group-hover:rotate-12">
                    <span className="size-5">{PILLAR_MARK[p.title]}</span>
                  </span>
                </div>

                {/* collapsed: vertical title (desktop only) */}
                <span
                  aria-hidden
                  className={`absolute bottom-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-serif text-2xl text-white transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 lg:block ${
                    open ? "opacity-0" : "opacity-100 delay-200"
                  }`}
                >
                  {p.title}
                </span>

                {/* open: title + body */}
                <div
                  className={`absolute inset-x-5 bottom-5 transition-all duration-500 lg:inset-x-7 lg:bottom-7 ${
                    open
                      ? "translate-y-0 opacity-100 delay-200"
                      : "lg:pointer-events-none lg:translate-y-6 lg:opacity-0"
                  }`}
                >
                  <span className="mb-4 block h-px w-12 bg-gold" aria-hidden />
                  <h3 className="font-serif text-[clamp(1.75rem,1.5vw+1rem,2.25rem)] leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-white/90">{p.body}</p>
                </div>

                <RefTag
                  image={img}
                  className={`right-5 top-[4.75rem] transition-opacity duration-500 ${
                    open ? "opacity-100" : "lg:opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
