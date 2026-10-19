import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "./Hero";
import { PROCESS } from "@/lib/home-content";

/**
 * JourneySection — the five-stage journey, light.
 *
 * Sticky intro on the left, a vertical timeline on the right with a
 * GSAP-scrubbed gold progress rail. Each stage is a framed card that
 * lifts on hover and turns its number gold.
 */
export function JourneySection() {
  return (
    <section
      data-anim="journey"
      className="relative overflow-hidden bg-background py-24 text-foreground lg:py-32"
    >
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>The journey</Eyebrow>
            <h2
              data-anim="reveal"
              className="mt-5 font-serif text-[clamp(2.2rem,3vw+1rem,3.4rem)] leading-[1.04] tracking-[-0.02em]"
            >
              From first conversation to handover —{" "}
              <span className="text-primary">a clear path, five stages.</span>
            </h2>
            <p
              data-anim="reveal"
              className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground"
            >
              Five stages, laid out up front, so you know what to expect at each step.
            </p>
            <Link
              to="/process"
              className="group mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-primary py-1 pl-6 pr-1.5 text-base font-bold text-white transition-all duration-300 hover:scale-[1.03]"
            >
              The full process
              <span className="flex size-9 items-center justify-center rounded-full bg-gold text-black transition-transform duration-300 group-hover:rotate-45">
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </div>
        </div>

        <ol className="relative lg:col-span-7 lg:col-start-6" data-journey>
          <span
            aria-hidden
            className="absolute left-[1.4rem] top-3 bottom-3 hidden w-px bg-border sm:block"
          />
          <span
            aria-hidden
            data-journey-fill
            className="absolute left-[1.4rem] top-3 hidden w-0.5 origin-top bg-gold sm:block"
            style={{ height: "0%" }}
          />
          {PROCESS.map((step, i) => (
            <li
              key={step.title}
              data-stage
              className="group relative grid gap-4 pb-10 last:pb-0 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
            >
              <span className="relative z-10 grid size-11 place-items-center rounded-full border border-gold bg-background font-serif text-lg text-primary transition-all duration-300 group-hover:bg-gold group-hover:text-black">
                {i + 1}
              </span>
              <div className="rounded-md border border-border bg-secondary/40 p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-gold/40 group-hover:shadow-md">
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {step.includes.join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
