import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PROCESS } from "@/lib/home-content";
import { ConsultationButton, Eyebrow, TEXT_LINK } from "./shared";

/* ---------- 5. Process — "How we work" ----------
 * Redesign intent: a vertical alternating timeline that reads top-to-bottom
 * on every viewport (no fragile horizontal stepper). Each stage sits on one
 * side of a central rail; a gold node marks it; the card lifts on hover,
 * gains a gold border + glow, and a small gold "tick" connector draws in.
 * A scrubbed gold rail fills down the centre as the section scrolls (GSAP,
 * wired in useHomeMotion via [data-rail] / [data-rail-fill]). On mobile the
 * rail moves to the far left and the cards sit to its right — one tidy
 * column, still clearly a journey.
 */

export function HomeProcess() {
  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32">
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
              className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
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

        {/* Alternating timeline with a central scrubbed gold rail */}
        <div data-rail className="relative mt-16 lg:mt-20">
          {/* desktop centre track */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block"
          />
          {/* desktop gold fill — scrubbed by useHomeMotion */}
          <div
            aria-hidden
            data-rail-fill
            className="absolute left-1/2 top-0 hidden h-full w-px origin-top -translate-x-1/2 bg-gold lg:block"
            style={{ transform: "translateX(-50%) scaleY(0)" }}
          />
          {/* mobile rail on the far left */}
          <div aria-hidden className="absolute left-7 top-0 h-full w-px bg-border lg:hidden" />

          <ol className="space-y-8 lg:space-y-0">
            {PROCESS.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={step.title}
                  data-stage
                  className="group relative lg:grid lg:grid-cols-2 lg:gap-12"
                >
                  {/* mobile node */}
                  <span
                    aria-hidden
                    className="absolute left-7 top-6 z-10 grid size-3.5 -translate-x-1/2 place-items-center rounded-full bg-primary ring-4 ring-background lg:hidden"
                  />

                  {/* desktop node — alternating sides */}
                  <span
                    aria-hidden
                    className={`absolute top-7 z-10 hidden size-4 place-items-center rounded-full border-2 border-border bg-background transition-all duration-500 group-hover:border-gold group-hover:bg-gold lg:grid ${
                      right ? "left-1/2 -translate-x-1/2" : "left-1/2 -translate-x-1/2"
                    }`}
                  >
                    <span className="absolute inset-0 rounded-full bg-gold/0 transition-all duration-500 group-hover:bg-gold/25 group-hover:scale-150" />
                  </span>

                  {/* card — alternating left/right with a tick connector */}
                  <div
                    className={`pl-16 lg:pl-0 ${
                      right ? "lg:col-start-2 lg:pl-12" : "lg:col-start-1 lg:pr-12 lg:text-right"
                    }`}
                  >
                    <div
                      className={`relative inline-block w-full rounded-lg border border-border bg-card p-6 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-gold/40 group-hover:shadow-xl group-hover:shadow-primary/10 lg:p-7 ${
                        right ? "lg:ml-0" : ""
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute top-7 hidden h-px w-8 origin-right scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100 lg:block ${
                          right ? "right-full mr-1" : "left-full ml-1 origin-left"
                        }`}
                      />
                      <div className={`flex items-center gap-3 ${right ? "" : "lg:justify-end"}`}>
                        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-secondary font-serif text-sm font-bold text-muted-foreground transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                          {i + 1}
                        </span>
                        <h3 className="text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                      <div
                        className={`mt-4 flex flex-wrap gap-1.5 ${right ? "" : "lg:justify-end"}`}
                      >
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
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
