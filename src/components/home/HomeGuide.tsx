import { ArrowRight } from "lucide-react";
import { Eyebrow, H2, Placeholder } from "@/components/home/NordicHome";
import { GUIDE, PLACEHOLDER } from "@/lib/home-content";

/**
 * HomeGuide — the "Future-Proofing Your Home" guide section.
 *
 * Complete redesign: dark cover card with a corner accent that sweeps in on
 * hover, a bottom gradient for depth and a logo zoom; a numbered topic list
 * where each item lifts, tints its border gold and flips its number to gold on
 * hover; the download stays disabled with a pending-recovery note. The cover
 * card lifts in on scroll (data-guide-card) and each topic chip staggers in
 * (data-guide-topic) — both wired in useHomeMotion.
 */
export function HomeGuide() {
  return (
    <section className="relative overflow-hidden bg-secondary/70 py-24 sm:py-32">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Draft cover built from the supplied logo — a layout stand-in, not the real guide cover. */}
          <div className="lg:col-span-5">
            <div
              data-guide-card
              className="group relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-lg bg-primary p-8 shadow-2xl shadow-primary/20 transition-all duration-700 hover:-translate-y-2 hover:shadow-primary/40"
            >
              {/* corner accent that sweeps in on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-24 w-24 origin-top-right scale-0 rounded-bl-[3rem] bg-gold/20 transition-transform duration-700 group-hover:scale-100"
              />
              {/* bottom gradient for depth */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/25 to-transparent"
              />
              {/* hover glow */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-gold/[0.08] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="relative flex h-full flex-col items-center justify-between text-center text-primary-foreground">
                <img
                  src="/brand/nordic-logo-light.png"
                  alt=""
                  className="mt-6 w-40 transition-transform duration-700 group-hover:scale-110"
                />
                <div>
                  <p className="font-serif text-3xl leading-tight">{GUIDE.title}</p>
                  <span className="mt-4 block text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                    Draft cover · placeholder
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>{GUIDE.eyebrow}</Eyebrow>
            <h2 data-anim="reveal" className={`${H2} mt-4`}>
              {GUIDE.title}
            </h2>
            <p data-anim="reveal" className="mt-6 text-base leading-relaxed text-muted-foreground">
              {GUIDE.body}
            </p>

            {/* numbered topic list with hover states */}
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {GUIDE.topics.map((t, i) => (
                <li
                  key={t}
                  data-guide-topic
                  className="group/topic flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3.5 text-sm font-bold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-gold/5 hover:text-primary"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary font-serif text-xs text-primary transition-all duration-300 group-hover/topic:bg-gold group-hover/topic:text-black">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span
                aria-disabled
                className="inline-flex h-12 cursor-not-allowed items-center rounded-full border border-primary/30 px-6 text-base font-bold text-primary/60 transition-colors duration-300 hover:border-primary/50 hover:text-primary/80"
              >
                Guide coming soon
              </span>
              <Placeholder>{PLACEHOLDER.guide}</Placeholder>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <ArrowRight className="size-3.5 text-gold" aria-hidden />
              The guide file is being recovered, checked and rebranded before release.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
