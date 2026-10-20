import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PROCESS } from "@/lib/home-content";
import { ConsultationButton, Eyebrow, TEXT_LINK } from "./shared";

/* ---------- 5. Process — "How we work" ----------
 * Complete redesign: a horizontal five-stage stepper on desktop (vertical on
 * mobile). A gold progress line scrubs across as the section scrolls in
 * (GSAP, wired in useHomeMotion via [data-rail] / [data-rail-fill]). Each
 * stage is a card that lifts on hover, gains a gold border + glow on its
 * number, and swaps its tags to gold.
 */

export function HomeProcess() {
  return (
    <section id="process" className="py-24 sm:py-32">
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
              Five stages, laid out up front, so you know what to expect at each step.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <ConsultationButton />
            <Link to="/process" className={TEXT_LINK}>
              The full process <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Horizontal stepper on desktop, vertical on mobile, with a gold scrub line */}
        <div data-rail className="relative mt-16">
          {/* desktop horizontal track */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-0.5 bg-border lg:block"
          />
          {/* desktop gold fill — scrubbed by useHomeMotion */}
          <div
            aria-hidden
            data-rail-fill
            className="absolute left-0 top-7 hidden h-0.5 origin-left bg-gold lg:block"
            style={{ transform: "scaleX(0)" }}
          />
          {/* mobile vertical track */}
          <div aria-hidden className="absolute bottom-0 left-7 top-0 w-0.5 bg-border lg:hidden" />

          <ol className="grid gap-6 lg:grid-cols-5 lg:gap-4">
            {PROCESS.map((step, i) => (
              <li key={step.title} data-stage className="group relative">
                {/* number circle */}
                <div className="relative z-10 mb-6 flex items-center gap-4 lg:block">
                  <span className="relative grid size-14 shrink-0 place-items-center rounded-full border-2 border-border bg-background font-serif text-xl text-muted-foreground transition-all duration-500 group-hover:border-gold group-hover:text-gold lg:mx-auto">
                    {i + 1}
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-gold/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </span>
                </div>
                {/* card */}
                <div className="rounded-lg border border-border bg-secondary/40 p-5 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-gold/40 group-hover:bg-background group-hover:shadow-xl group-hover:shadow-primary/5 lg:p-6">
                  <h3 className="text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
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
