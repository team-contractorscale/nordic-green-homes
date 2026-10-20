import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { PILLARS } from "@/lib/home-content";
import { Eyebrow } from "./shared";

/* ---------- 4. Pillars — "What guides us" ----------
 * A warm, light editorial section with balanced rhythm. Four principles in a
 * 2×2 grid of equal cards — intentionally uniform so the section reads as one
 * calm, designed block rather than uneven columns. Each card carries a
 * line-art mark in a circular badge, an oversized faint index number, and a
 * gold top accent that draws in on hover. The section ground uses layered
 * warm/brand radial washes (sage + gold) so it feels alive without being a
 * flat green band. Hover lifts the card, tints the border gold, swaps the mark
 * to gold, and blooms a soft glow.
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

export function HomePillars() {
  return (
    <section className="relative overflow-hidden bg-secondary/60 py-20 text-foreground sm:py-24">
      {/* warm layered radial washes (sage + gold) — alive, not a flat green band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_70%_at_8%_0%,rgb(18_85_69/0.07),transparent_62%),radial-gradient(ellipse_45%_60%_at_100%_100%,rgb(187_137_92/0.08),transparent_60%)]"
      />
      {/* faint serif watermark for editorial warmth */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 right-0 hidden select-none font-serif text-[14rem] leading-none text-primary/[0.04] lg:block"
      >
        Values
      </span>

      <div className="wrap">
        {/* Tighter header: eyebrow + title left, supporting copy + link right */}
        <div className="grid items-end gap-5 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <Eyebrow>What guides us</Eyebrow>
            <h2
              data-anim="reveal"
              className="mt-3 font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-foreground"
            >
              Four principles behind every home
            </h2>
          </div>
          <div className="sm:col-span-5">
            <p data-anim="reveal" className="text-base leading-relaxed text-muted-foreground">
              The values that shape every decision, from the first sketch to the day you move in —
              not a checklist, but the way we think about a home before a single plan is drawn.
            </p>
            <Link
              to="/about-us"
              className="group mt-4 inline-flex shrink-0 items-center gap-2 text-base font-bold text-primary underline underline-offset-4 hover:text-gold"
            >
              More about us
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Balanced 2×2 grid of equal cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <article
              key={p.title}
              data-pillar
              className="group relative flex items-start gap-6 overflow-hidden rounded-lg border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-xl hover:shadow-primary/10 sm:p-8"
            >
              {/* gold top accent bar — draws in on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
              />
              {/* hover glow blob */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />

              {/* circular mark badge */}
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-border bg-secondary text-gold/80 transition-all duration-500 group-hover:border-gold/40 group-hover:bg-gold/10 group-hover:text-gold">
                <span className="size-7">{PILLAR_MARK[p.title]}</span>
              </span>

              <div className="min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl">
                    {p.title}
                  </h3>
                  <span className="font-serif text-4xl leading-none text-primary/15 transition-all duration-500 group-hover:text-gold/45 sm:text-5xl">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
