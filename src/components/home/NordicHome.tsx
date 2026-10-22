import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { ASSURANCE, CONSULTATION, FAQS, IMAGES, INTRO, SERVICES, PHOTOS } from "@/lib/home-content";
import { ConsultationButton, Eyebrow, H2, H3, RefImg, RefTag, TEXT_LINK } from "./shared";

/* Nordic Green Homes — home page barrel + inline sections.
 *
 * The big, frequently-edited sections (Hero, Pillars, Process, Guide) live
 * in their own focused modules and are re-exported here so existing imports
 * keep resolving. Shared primitives come from ./shared.
 */

export { HomeHero } from "./HomeHero";
export { HomePillars } from "./HomePillars";
export { HomeProcess } from "./HomeProcess";
export { HomeProjects } from "./HomeProjects";
export {
  Placeholder,
  RefTag,
  RefImg,
  Eyebrow,
  H2,
  H3,
  TEXT_LINK,
  ConsultationButton,
} from "./shared";

/* ---------- 2. Intro / positioning ---------- */

export function HomeIntro() {
  return (
    <section className="py-24 sm:py-28">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow>{INTRO.eyebrow}</Eyebrow>
          <div className="mt-6 space-y-4">
            {INTRO.lead.map((p, i) => (
              <p
                key={p}
                data-reveal
                className={
                  i === 0
                    ? "text-lg leading-relaxed text-foreground/90"
                    : "text-base leading-relaxed text-muted-foreground"
                }
              >
                {p}
              </p>
            ))}
          </div>
          <h2 data-reveal className={`${H2} mt-10`}>
            {INTRO.title}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
            {INTRO.body.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>

          {/* Design and build, considered together */}
          <div data-reveal="left" className="mt-8 border-l-2 border-gold pl-5">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {INTRO.designBuild.label}
            </p>
            <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
              {INTRO.designBuild.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div data-reveal className="mt-8">
            <Link to="/about-us" className={TEXT_LINK}>
              About Nordic Green Homes <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
        <div data-reveal-img className="lg:col-span-5 lg:col-start-8">
          <RefImg
            image={IMAGES.intro}
            className="arch aspect-[4/5] w-full"
            tagClassName="bottom-4 left-1/2 -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Services ---------- */

export function HomeServices() {
  return (
    <section className="bg-secondary/70 py-24 sm:py-28">
      <div className="wrap">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>What we build</Eyebrow>
            <h2 data-reveal className={`${H2} mt-4`}>
              Find the right starting point for your home
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 3).map((s) => (
            <Link key={s.key} to={s.to} data-reveal className="group flex flex-col">
              <RefImg image={s.image} className="aspect-[4/5] rounded-lg" />
              <h3 className={`mt-6 ${H3}`}>{s.title}</h3>
              <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">
                {s.body}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-base font-bold text-primary underline underline-offset-4">
                {s.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Our commitment ---------- */

export function HomeAssurance() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-primary-foreground sm:py-32">
      {/* Background image with green opacity overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          data-parallax
          src={IMAGES.interior.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>
      <div className="wrap grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow dark>{ASSURANCE.eyebrow}</Eyebrow>
          <h2 data-reveal className={`${H2} mt-4`}>
            {ASSURANCE.title}
          </h2>
          <p data-reveal className="mt-6 font-serif text-xl text-white">
            {ASSURANCE.subtitle}
          </p>
          <div className="mt-4 max-w-xl space-y-4 text-base leading-relaxed text-primary-foreground/85">
            {ASSURANCE.body.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>
          <div data-reveal className="mt-8">
            <Link
              to="/about-us"
              className="group inline-flex items-center gap-2 text-base font-bold text-white underline underline-offset-4 hover:text-gold"
            >
              {ASSURANCE.link}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
        <div data-reveal="right" className="lg:col-span-5 lg:col-start-8">
          <RefImg image={IMAGES.interior} className="aspect-[5/4] rounded-lg" />
        </div>
      </div>
    </section>
  );
}

/* ---------- 9. Consultation ----------
 * One CTA card on a photo, straddling the page/footer seam (white above, footer green below),
 * so the page ends in a single consultation moment rather than two stacked green blocks.
 */

export function HomeConsultation() {
  return (
    <section className="consult-band relative z-10 pt-8">
      {/* Offset lives on the wrapper: the reveal animation owns the card's transform. */}
      <div className="wrap translate-y-16 lg:translate-y-24">
        <div
          data-reveal="scale"
          className="relative isolate overflow-hidden rounded-2xl text-white shadow-2xl shadow-black/30"
        >
          <img
            src={PHOTOS.barLounge.src}
            alt=""
            loading="lazy"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(13_61_50/0.95)_0%,rgb(18_85_69/0.85)_45%,rgb(18_85_69/0.55)_100%)]"
          />
          <div className="p-8 sm:p-12 lg:p-14">
            <div>
              <Eyebrow dark>{CONSULTATION.eyebrow}</Eyebrow>
              <h2 data-reveal className={`${H2} mt-4`}>
                {CONSULTATION.title}
              </h2>
              <div className="mt-4 max-w-[34rem] space-y-3 text-base leading-relaxed text-white/90">
                {CONSULTATION.body.map((p) => (
                  <p key={p} data-reveal>
                    {p}
                  </p>
                ))}
              </div>
              <div data-reveal className="mt-8">
                <ConsultationButton tone="gold" />
              </div>
            </div>
          </div>
          <RefTag image={PHOTOS.barLounge} className="bottom-4 right-4" />
        </div>
      </div>
    </section>
  );
}

/* ---------- 10. Frequently asked questions ---------- */

export function HomeFaqs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-secondary/50 py-24 sm:py-28">
      <div className="wrap max-w-4xl">
        <h2 data-reveal className={`${H2} text-center`}>
          Frequently asked questions
        </h2>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                data-reveal
                className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-serif text-lg font-semibold text-foreground transition-colors hover:bg-muted/30"
                >
                  <span>{faq.q}</span>
                  <Plus
                    className={`size-5 shrink-0 text-gold transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-border/60 px-6 pb-6 pt-4 text-base leading-relaxed text-muted-foreground">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
