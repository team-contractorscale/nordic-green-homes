import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { PILLARS } from "@/lib/home-content";
import { Eyebrow } from "./shared";

/* ---------- 4. Pillars — "What guides us" ----------
 * Complete redesign: a dark brand-green band with a 2×2 editorial grid.
 * Each principle is a tall card with a line-art mark in a circular badge, an
 * oversized faint index number, and a gold top accent that draws in on hover.
 * Hover lifts the card, tints the border gold, swaps the mark to gold and the
 * number to a brighter gold, and blooms a soft glow.
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
    <section className="relative overflow-hidden bg-primary py-24 text-white sm:py-32">
      {/* soft radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,rgb(255_255_255/0.07),transparent_70%)]"
      />
      <div className="wrap">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow dark>What guides us</Eyebrow>
            <h2
              data-anim="reveal"
              className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
            >
              Four principles behind every home
            </h2>
            <p data-anim="reveal" className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
              The values that shape every decision, from the first sketch to the day you move in.
            </p>
          </div>
          <Link
            to="/about-us"
            className="group inline-flex shrink-0 items-center gap-2 text-base font-bold text-gold underline underline-offset-4 hover:text-white"
          >
            More about us
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-2">
          {PILLARS.map((p, i) => (
            <article
              key={p.title}
              data-pillar
              className="group relative flex min-h-[17rem] flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:bg-white/[0.06] sm:p-8"
            >
              {/* gold top accent bar — draws in on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
              />
              {/* hover glow blob */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-gold/[0.06] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="flex items-start justify-between">
                <span className="grid size-14 place-items-center rounded-full border border-white/15 bg-white/5 text-gold/70 transition-all duration-500 group-hover:border-gold/40 group-hover:bg-gold/10 group-hover:text-gold">
                  <span className="size-7">{PILLAR_MARK[p.title]}</span>
                </span>
                <span className="font-serif text-5xl leading-none text-white/15 transition-all duration-500 group-hover:text-gold/50 sm:text-6xl">
                  0{i + 1}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-gold sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/90">
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
