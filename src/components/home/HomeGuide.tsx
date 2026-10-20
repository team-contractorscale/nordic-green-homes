import { ArrowRight } from "lucide-react";
import { Eyebrow, H2, Placeholder } from "@/components/home/NordicHome";
import { GUIDE, PLACEHOLDER } from "@/lib/home-content";

/**
 * HomeGuide — the "Future-Proofing Your Home" guide section.
 *
 * Extracted from NordicHome.tsx so the home file stays focused. Adds a
 * scroll-reveal on the cover card (data-guide-card, wired in useHomeMotion),
 * a hover lift + gold corner accent on the cover, and hover highlight on
 * each topic chip. The download stays disabled (internal pilot).
 */
export function HomeGuide() {
  return (
    <section className="bg-secondary/70 py-24 sm:py-28">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12">
        {/* Draft cover built from the supplied logo — a layout stand-in, not the real guide cover. */}
        <div className="mx-auto w-full max-w-sm lg:col-span-4 lg:col-start-2">
          <div
            data-guide-card
            className="group relative flex aspect-[3/4] flex-col items-center justify-between overflow-hidden rounded-lg bg-primary p-8 text-center text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/30"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-16 w-16 origin-top-right scale-0 rounded-bl-[3rem] bg-gold/15 transition-transform duration-500 group-hover:scale-100"
            />
            <img
              src="/brand/nordic-logo-light.png"
              alt=""
              className="mt-4 w-40 opacity-95 transition-transform duration-500 group-hover:scale-105"
            />
            <p className="font-serif text-3xl leading-tight">{GUIDE.title}</p>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/75">
              Draft cover · placeholder
            </span>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow>{GUIDE.eyebrow}</Eyebrow>
          <h2 data-anim="reveal" className={`${H2} mt-4`}>
            {GUIDE.title}
          </h2>
          <p data-anim="reveal" className="mt-6 text-base leading-relaxed text-muted-foreground">
            {GUIDE.body}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {GUIDE.topics.map((t) => (
              <li
                key={t}
                className="group/topic flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-sm transition-colors duration-300 hover:border-gold/40 hover:bg-background"
              >
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-gold transition-transform duration-300 group-hover/topic:scale-150"
                />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-4">
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
    </section>
  );
}
