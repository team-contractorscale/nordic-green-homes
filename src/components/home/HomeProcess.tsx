import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PROCESS } from "@/lib/home-content";
import { ConsultationButton, Eyebrow, TEXT_LINK } from "./shared";

/* ---------- 5. Process — "How we work" ----------
 * Horizontal layout: a single row of five equal stage cards connected by a
 * gold rail that scrubs left-to-right as the section scrolls (GSAP, wired in
 * useHomeMotion via [data-rail] / [data-rail-fill]). Each card has a numbered
 * badge, a large ghost index, title, body and selection tags. Cards lift,
 * gain a gold border + glow, and the badge fills gold on hover. Below lg the
 * row collapses to a single left-rail column. Reveals are one-shot
 * (play none none none) so a stage stays visible once it has entered.
 */

export function HomeProcess() {
  return (
    <section id="process" className="relative overflow-hidden bg-background py-20 sm:py-24">
      {/* subtle radial wash for depth without a solid band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgb(18_85_69/0.04),transparent_60%)]"
      />
      <div className="wrap">
        {/* Tighter header row */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>How we work</Eyebrow>
            <h2
              data-anim="reveal"
              className="mt-4 font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.02em]"
            >
              A clear path from first conversation to handover
            </h2>
            <p
              data-anim="reveal"
              className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              Five stages, laid out up front, so you know what to expect at each step — and how one
              stage leads into the next.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ConsultationButton />
            <Link to="/process" className={TEXT_LINK}>
              The full process <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Horizontal stage rail */}
        <div data-rail className="relative mt-12">
          {/* rail track + gold fill (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-8 hidden h-px bg-border lg:block"
          />
          <div
            aria-hidden
            data-rail-fill
            className="absolute left-0 top-8 hidden h-px origin-left bg-gold lg:block"
            style={{ transform: "scaleX(0)" }}
          />

          <ol className="grid gap-4 lg:grid-cols-5 lg:gap-4">
            {PROCESS.map((step, i) => (
              <li key={step.title} data-stage className="group relative flex flex-col lg:pt-14">
                {/* mobile vertical rail + node */}
                <span
                  aria-hidden
                  className="absolute left-[1.375rem] top-0 z-10 grid size-3.5 -translate-x-1/2 place-items-center rounded-full bg-primary ring-4 ring-background lg:hidden"
                />
                <span
                  aria-hidden
                  className="absolute left-[1.375rem] top-4 bottom-0 w-px -translate-x-1/2 bg-border lg:hidden"
                />

                {/* desktop node on the rail */}
                <span
                  aria-hidden
                  className="absolute left-0 top-8 z-10 hidden size-4 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-border bg-background transition-all duration-500 group-hover:border-gold group-hover:bg-gold lg:grid"
                >
                  <span className="absolute inset-0 rounded-full bg-gold/0 transition-all duration-500 group-hover:scale-150 group-hover:bg-gold/30" />
                </span>

                {/* card */}
                <div className="ml-12 rounded-lg border border-border bg-card p-5 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-gold/40 group-hover:shadow-xl group-hover:shadow-primary/10 lg:ml-0">
                  <div className="flex items-center justify-between">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary font-serif text-sm font-bold text-muted-foreground transition-all duration-500 group-hover:bg-gold group-hover:text-black">
                      {i + 1}
                    </span>
                    <span
                      aria-hidden
                      className="font-serif text-4xl leading-none text-primary/10 transition-colors duration-500 group-hover:text-gold/25"
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {step.includes.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary transition-colors duration-300 group-hover:bg-gold/15 group-hover:text-gold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
