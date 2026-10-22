import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import {
  ASSURANCE,
  CONSULTATION,
  FAQS,
  IMAGES,
  INTRO,
  PLACEHOLDER,
  REFERENCE_BASE,
  REFERENCE_SERVICE_AREA,
  SERVICES,
} from "@/lib/home-content";
import {
  ConsultationButton,
  Eyebrow,
  H2,
  H3,
  Placeholder,
  RefImg,
  RefTag,
  TEXT_LINK,
} from "./shared";

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
          <h2 data-reveal className={`${H2} mt-4`}>
            {INTRO.title}
          </h2>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-foreground/90">
            {INTRO.lead}
          </p>
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
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {INTRO.designBuild.body}
            </p>
          </div>

          <p data-reveal className="mt-8 font-serif text-xl text-primary">
            {INTRO.people}
          </p>
          <div data-reveal="left" className="mt-4 border-l-2 border-gold/50 pl-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {INTRO.relationship.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {INTRO.relationship.body}
            </p>
            <div className="mt-3">
              <Placeholder>{PLACEHOLDER.relationship}</Placeholder>
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

const SERVICE_LINKS: Record<(typeof SERVICES)[number]["key"], string> = {
  luxuryCustomHomes: "/services/new-builds",
  gardenSuites: "/services",
  passiveHome: "/services",
  highPerformance: "/services",
  designInteriors: "/services",
};

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
          <div data-reveal="right">
            <Link to="/services" className={TEXT_LINK}>
              All services <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link key={s.key} to={SERVICE_LINKS[s.key]} data-reveal className="group flex flex-col">
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

        <div data-reveal className="mt-12">
          <Placeholder>{PLACEHOLDER.services}</Placeholder>
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
          <p
            data-reveal
            className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85"
          >
            {ASSURANCE.body}
          </p>
          <div data-reveal className="mt-8">
            <Link
              to="/about-us"
              className="group inline-flex items-center gap-2 text-base font-bold text-white underline underline-offset-4 hover:text-gold"
            >
              {ASSURANCE.link}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div data-reveal className="mt-6">
            <Placeholder dark>{PLACEHOLDER.assurance}</Placeholder>
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

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">{label}</dt>
      <dd className="mt-2 text-sm text-white">{children}</dd>
    </div>
  );
}

export function HomeConsultation() {
  return (
    <section className="bg-secondary/50 pt-8">
      <div className="wrap pb-24">
        <div
          data-reveal="scale"
          className="relative isolate -mb-16 overflow-hidden rounded-2xl text-white shadow-2xl shadow-black/30 lg:-mb-24"
        >
          <img
            src={IMAGES.poolRender.src}
            alt=""
            loading="lazy"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(13_61_50/0.95)_0%,rgb(18_85_69/0.85)_45%,rgb(18_85_69/0.55)_100%)]"
          />
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-16 lg:p-14">
            <div>
              <Eyebrow dark>{CONSULTATION.eyebrow}</Eyebrow>
              <h2 data-reveal className={`${H2} mt-4`}>
                {CONSULTATION.title}
              </h2>
              <p data-reveal className="mt-4 max-w-[34rem] text-base leading-relaxed text-white/90">
                {CONSULTATION.body}
              </p>
              <div data-reveal className="mt-8">
                <ConsultationButton tone="gold" />
              </div>
              <p className="mt-4 text-xs text-white/70">
                Internal pilot: enquiry forms and CRM submission are switched off.
              </p>
            </div>

            <dl
              data-reveal="right"
              className="grid gap-6 rounded-lg border border-white/15 p-6 sm:grid-cols-2"
            >
              <Detail label="Phone">
                <Placeholder dark>{PLACEHOLDER.phone}</Placeholder>
              </Detail>
              <Detail label="Email">
                <Placeholder dark>{PLACEHOLDER.email}</Placeholder>
              </Detail>
              <Detail label="Based in">
                {REFERENCE_BASE} <span className="text-white/60">(reference)</span>
              </Detail>
              <Detail label="Service area">
                <span className="text-white/75">{REFERENCE_SERVICE_AREA} (reference)</span>
              </Detail>
              <div className="sm:col-span-2">
                <Placeholder dark>{PLACEHOLDER.serviceArea}</Placeholder>{" "}
                <Placeholder dark>{PLACEHOLDER.bookingOwner}</Placeholder>
              </div>
            </dl>
          </div>
          <RefTag image={IMAGES.poolRender} className="bottom-4 right-4" />
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
        <div className="text-center">
          <Eyebrow>Frequently asked questions</Eyebrow>
          <h2 data-reveal className={`${H2} mt-4`}>
            Questions before you start
          </h2>
        </div>

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

        <div data-reveal className="mt-12 text-center">
          <Link
            to="/faqs"
            className="group inline-flex items-center gap-2 text-base font-bold text-primary underline underline-offset-4 hover:text-gold"
          >
            All questions
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
