import { Eyebrow } from "./Hero";
import { FOUR_PILLARS } from "@/lib/content-data";
import { INTRO } from "@/lib/home-content";

/**
 * PhilosophySection — the Nordic Green Homes philosophy, as a light 2-column.
 *
 * Left: sticky intro (eyebrow + heading + body + the people line).
 * Right: the four pillars as a refined list with hover lift + gold accent.
 * Kept light (bg-background) to break the dark hero above and the green
 * services moment below.
 */
export function PhilosophySection() {
  return (
    <section
      id="story"
      data-anim="philosophy"
      className="relative overflow-hidden bg-background py-24 text-foreground lg:py-32"
    >
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>What guides us</Eyebrow>
            <h2
              data-anim="reveal"
              className="mt-5 font-serif text-[clamp(2.2rem,3vw+1rem,3.4rem)] leading-[1.04] tracking-[-0.02em]"
            >
              Four principles behind every <span className="text-primary">home we build.</span>
            </h2>
            <p
              data-anim="reveal"
              className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              {INTRO.body[0]}
            </p>
            <p data-anim="reveal" className="mt-4 font-serif text-xl text-primary">
              {INTRO.people}
            </p>
          </div>
        </div>

        <ol className="lg:col-span-7" data-anim="pillars">
          {FOUR_PILLARS.map((p, i) => (
            <li
              key={p.title}
              data-pillar
              className="group border-t border-border py-8 transition-all duration-300 first:border-t-0 hover:pl-2 sm:py-10"
            >
              <div className="flex items-baseline gap-5">
                <span className="font-serif text-4xl text-gold/70 transition-colors duration-300 group-hover:text-gold sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-foreground transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground/70">
                    {p.summary}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
