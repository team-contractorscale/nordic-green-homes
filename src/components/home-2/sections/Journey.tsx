import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "./Hero";
import { PROCESS } from "@/lib/home-content";

export function JourneySection() {
  return (
    <section data-anim="journey" className="relative overflow-hidden bg-[#f4efe8] text-slate">
      <div className="wrap py-24 lg:py-32">
        <div className="max-w-3xl">
          <Eyebrow>The journey</Eyebrow>
          <h2
            data-anim="reveal"
            className="mt-5 font-serif text-[clamp(2.2rem,3vw+1rem,3.6rem)] leading-[1.04] tracking-[-0.02em] text-foreground"
          >
            From first conversation
            <span className="text-primary"> to handover —</span>
            <br />a clear path, five stages.
          </h2>
        </div>

        <ol className="relative mt-16" data-journey>
          <span
            aria-hidden
            className="absolute left-[1.4rem] top-2 bottom-2 hidden w-px bg-border sm:block"
          />
          <span
            aria-hidden
            data-journey-fill
            className="absolute left-[1.4rem] top-2 hidden w-0.5 origin-top bg-gold sm:block"
            style={{ height: "0%" }}
          />
          {PROCESS.map((step, i) => (
            <li
              key={step.title}
              data-stage
              className="relative grid gap-4 pb-14 sm:grid-cols-[3.5rem_1fr] sm:gap-8 sm:pl-2"
            >
              <span className="relative z-10 grid size-11 place-items-center rounded-full border border-gold bg-white font-serif text-lg text-primary">
                {i + 1}
              </span>
              <div className="pt-1">
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {step.includes.join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Link
            to="/process"
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-primary py-1 pl-6 pr-1.5 text-base font-bold text-white transition-all duration-300 hover:scale-[1.03]"
          >
            The full process
            <span className="flex size-9 items-center justify-center rounded-full bg-gold text-black transition-transform duration-300 group-hover:rotate-45">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
