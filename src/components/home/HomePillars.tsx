import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { IMAGES, PILLARS } from "@/lib/home-content";
import { Eyebrow, RefTag } from "./shared";

/* ---------- 4. Pillars — "What guides us" ----------
 * Editorial split: a sticky feature image on the left (parallax + clip
 * reveal) beside the four principles on the right as a tight 2×2 card grid.
 * Warm layered sage + gold radial washes on a light ground — alive without
 * being a flat green band. Each card carries a line-art mark in a circular
 * badge, an oversized index number, and a gold top accent that draws in on
 * hover. A floating caption card anchors the image with a brand voice line.
 */

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

export function HomePillars() {
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-20 sm:py-24">
      {/* warm layered radial washes — sage + gold, not a flat green band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_0%_20%,rgb(18_85_69/0.06),transparent_60%),radial-gradient(ellipse_45%_55%_at_100%_90%,rgb(187_137_92/0.07),transparent_58%)]"
      />
      {/* faint serif watermark for editorial warmth */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-6 hidden select-none font-serif text-[12rem] leading-none text-primary/[0.04] lg:block"
      >
        Values
      </span>

      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
        {/* Left: sticky feature image with floating caption */}
        <div className="lg:col-span-5">
          <div className="relative lg:sticky lg:top-28">
            <div
              data-reveal-img
              className="arch relative aspect-[4/5] overflow-hidden rounded-lg bg-muted"
            >
              <img
                data-parallax
                src={IMAGES.office.src}
                alt={IMAGES.office.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <RefTag image={IMAGES.office} className="bottom-4 left-4" />
            </div>
            {/* floating caption card — brand voice line */}
            <div
              data-anim="reveal"
              className="absolute -bottom-5 right-2 hidden max-w-[15rem] rounded-lg border border-border bg-card p-4 shadow-xl shadow-primary/10 lg:block"
            >
              <p className="font-serif text-base leading-snug text-primary">
                A home should feel considered, not contrived.
              </p>
              <p className="mt-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Our approach
              </p>
            </div>
          </div>
        </div>

        {/* Right: principles */}
        <div className="lg:col-span-7">
          <Eyebrow>What guides us</Eyebrow>
          <h2
            data-anim="reveal"
            className="mt-4 font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            Four principles behind every home
          </h2>
          <p
            data-anim="reveal"
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            The values that shape every decision, from the first sketch to the day you move in — not
            a checklist, but the way we think about a home before a single plan is drawn.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <article
                key={p.title}
                data-pillar
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* gold top accent — draws in on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
                />
                {/* hover glow blob */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                />

                <div className="flex items-center justify-between">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-border bg-secondary text-gold/80 transition-all duration-500 group-hover:border-gold/40 group-hover:bg-gold/10 group-hover:text-gold">
                    <span className="size-6">{PILLAR_MARK[p.title]}</span>
                  </span>
                  <span className="font-serif text-3xl leading-none text-primary/15 transition-colors duration-500 group-hover:text-gold/50">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                  {p.body}
                </p>
              </article>
            ))}
          </div>

          <Link
            to="/about-us"
            className="group mt-8 inline-flex items-center gap-2 text-base font-bold text-primary underline underline-offset-4 hover:text-gold"
          >
            More about us
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
