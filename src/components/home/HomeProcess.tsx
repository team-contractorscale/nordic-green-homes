import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { IMAGES, PROCESS, type RefImage } from "@/lib/home-content";
import { ConsultationButton, Eyebrow, RefTag, TEXT_LINK, imgProps } from "./shared";

/* ---------- 5. Process — "How we work" ----------
 * Sticky stacking cards. Desktop: a sticky intro column on the left with a stage index and a
 * gold progress line; on the right each stage card is `position: sticky` with a slightly
 * deeper top offset, so cards slide up and stack. As the next card covers the previous one,
 * GSAP scrubs the covered card down in scale and dims it ([data-stack-card] / [data-stack-dim]).
 * The stage index highlights the stage in view ([data-stage-nav]). Mobile: plain card list.
 */

const STAGE_IMAGE: RefImage[] = [
  IMAGES.interior,
  IMAGES.office,
  IMAGES.newBuilds,
  IMAGES.hausSide,
  IMAGES.hausPatio,
];

export function HomeProcess() {
  return (
    <section id="process" className="relative bg-secondary/50 py-24 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* sticky intro + stage index */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>How we work</Eyebrow>
            <h2
              data-anim="reveal"
              className="mt-4 font-serif text-[clamp(2rem,2vw+1rem,3rem)] leading-[1.1] tracking-[-0.01em]"
            >
              From your first questions to moving in
            </h2>
            <p data-anim="reveal" className="mt-4 text-base leading-relaxed text-muted-foreground">
              There is a lot to decide before a home takes shape. These five stages bring the key
              questions into view.
            </p>

            <ol data-stack-nav data-reveal className="relative mt-8 hidden space-y-1 pl-6 lg:block">
              <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-border" />
              <span
                aria-hidden
                data-stack-fill
                className="absolute bottom-2 left-0 top-2 w-px origin-top bg-gold"
                style={{ transform: "scaleY(0)" }}
              />
              {PROCESS.map((step, i) => (
                <li
                  key={step.title}
                  data-stage-nav
                  data-active={i === 0}
                  className="group/nav flex items-center gap-3 py-1.5 text-base text-muted-foreground transition-colors duration-300 data-[active=true]:font-bold data-[active=true]:text-primary"
                >
                  <span className="font-serif text-sm text-gold/60 transition-colors group-data-[active=true]/nav:text-gold">
                    0{i + 1}
                  </span>
                  {step.title}
                </li>
              ))}
            </ol>

            <div data-reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ConsultationButton />
              <Link to="/process" className={TEXT_LINK}>
                See the process <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* stacking cards */}
        <ol data-stack className="space-y-6 lg:col-span-8 lg:space-y-10">
          {PROCESS.map((step, i) => {
            const img = STAGE_IMAGE[i] ?? IMAGES.hausPatio;
            return (
              <li
                key={step.title}
                data-stack-card
                className="lg:sticky"
                style={{ top: `calc(7.5rem + ${i * 1.25}rem)` }}
              >
                <article className="group relative grid overflow-hidden rounded-lg border border-border bg-card shadow-xl shadow-primary/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/15 md:min-h-[22rem] md:grid-cols-[1.1fr_1fr]">
                  <div className="relative flex flex-col p-7 sm:p-9">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-serif text-6xl leading-none text-gold transition-transform duration-500 group-hover:-translate-y-1">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-serif text-[clamp(1.5rem,1vw+1rem,2rem)] leading-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                  <div className="relative min-h-[14rem] overflow-hidden md:min-h-0">
                    <img
                      {...imgProps(img, "(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw")}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <RefTag image={img} className="bottom-3 left-3" />
                  </div>
                  {/* dimmed by GSAP as the next card stacks over this one */}
                  <span
                    aria-hidden
                    data-stack-dim
                    className="pointer-events-none absolute inset-0 bg-brand-dark opacity-0"
                  />
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
