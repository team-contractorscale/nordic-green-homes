import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PROCESS } from "@/lib/home-content";
import { ConsultationButton, Eyebrow, TEXT_LINK } from "./shared";

/* ---------- 5. Process — "How we work" ----------
 * Horizontal layout: a single row of five stage cards connected by a
 * horizontal gold rail that fills left-to-right as the section scrolls
 * (GSAP, wired in useHomeMotion via [data-rail] / [data-rail-fill]). Each
 * stage is an equal-width card in the row; a numbered node sits on the rail
 * above it and fills gold as its stage is reached. Below md the row wraps to
 * a single column with the rail on the far left. Cards lift, gain a gold
 * border + glow, and the node swells on hover. Reveals are one-shot
 * (play none none none) so a section stays visible once it has entered.
 */

export function HomeProcess() {
  return (
    <section id="process" className="relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgb(18_85_69/0.05),transparent_60%)]"
      />
      <div className="wrap">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
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
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              Five stages, laid out up front, so you know what to expect at each step — and how one
              stage leads into the next.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <ConsultationButton />
            <Link to="/process" className={TEXT_LINK}>
              The full process <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Horizontal stage rail */}
        <div data-rail className="relative mt-14">
          {/* rail track + gold fill (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-border lg:block"
          />
          <div
            aria-hidden
            data-rail-fill
            className="absolute left-0 top-7 hidden h-px origin-left bg-gold lg:block"
            style={{ transform: "scaleX(0)" }}
          />

          <ol className="grid gap-6 lg:grid-cols-5 lg:gap-5">
            {PROCESS.map((step, i) => (
              <li
                key={step.title}
                data-stage
                className="group relative flex flex-col pt-16 lg:pt-0 lg:pl-0"
              >
                {/* mobile rail + node */}
                <span
                  aria-hidden
                  className="absolute left-[1.375rem] top-0 z-10 grid size-3.5 -translate-x-1/2 place-items-center rounded-full bg-primary ring-4 ring-background lg:hidden"
                />

                {/* desktop node on the rail */}
                <span
                  aria-hidden
                  className="absolute left-0 top-7 z-10 hidden size-4 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-border bg-background transition-all duration-500 group-hover:border-gold group-hover:bg-gold lg:grid"
                >
                  <span className="absolute inset-0 rounded-full bg-gold/0 transition-all duration-500 group-hover:scale-150 group-hover:bg-gold/30" />
                </span>

                {/* card */}
                <div className="ml-12 rounded-lg border border-border bg-card p-6 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-gold/40 group-hover:shadow-xl group-hover:shadow-primary/10 lg:ml-0 lg:mt-12 lg:p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-secondary font-serif text-sm font-bold text-muted-foreground transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                      {i + 1}
                    </span>
                    <h3 className="text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
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
