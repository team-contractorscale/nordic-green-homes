import { Eyebrow } from "./Hero";
import { FOUR_PILLARS } from "@/lib/content-data";
import { INTRO } from "@/lib/home-content";

const PillarIcon: Record<string, string> = {
  leaf: "01",
  home: "02",
  sparkles: "03",
  "shield-check": "04",
};

export function PhilosophySection() {
  return (
    <section
      id="story"
      data-anim="philosophy"
      className="relative overflow-hidden bg-brand-dark text-white"
    >
      <div className="wrap relative z-10 grid gap-12 py-28 lg:grid-cols-12 lg:py-36">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow tone="gold">What guides us</Eyebrow>
            <h2
              data-anim="reveal"
              className="mt-5 font-serif text-[clamp(2.2rem,3vw+1rem,3.6rem)] leading-[1.04] tracking-[-0.02em]"
            >
              Four principles
              <br />
              behind every
              <br />
              <span className="text-gold">home we build.</span>
            </h2>
            <p data-anim="reveal" className="mt-7 max-w-sm text-base leading-relaxed text-white/75">
              {INTRO.body[0]}
            </p>
            <p data-anim="reveal" className="mt-5 max-w-sm text-base leading-relaxed text-white/70">
              {INTRO.people}
            </p>
          </div>
        </div>

        <ol className="lg:col-span-8 lg:pl-6" data-anim="pillars">
          {FOUR_PILLARS.map((p, i) => (
            <li
              key={p.title}
              data-pillar
              className="grid grid-cols-[auto_1fr] gap-6 border-t border-white/12 py-10 first:border-t-0 sm:gap-10"
            >
              <span className="font-serif text-5xl text-white/30 sm:text-7xl">
                {PillarIcon[p.icon] ?? String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl">{p.title}</h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">{p.body}</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">{p.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div aria-hidden className="h-px w-full bg-white/10" />
    </section>
  );
}
