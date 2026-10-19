import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Leaf } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import {
  ASSURANCE,
  CONSULTATION,
  GUIDE,
  HERO,
  IMAGES,
  INTRO,
  PILLARS,
  PLACEHOLDER,
  PROCESS,
  REFERENCE_BASE,
  REFERENCE_SERVICE_AREA,
  SERVICES,
  type RefImage,
} from "@/lib/home-content";

/* ---------- shared bits ----------
 * Type scale and CTA treatment copied from the CS Web Template (DESIGN.md §3, §5):
 *   H1  clamp(2.5rem,4vw+1rem,4.25rem) · H2 clamp(2rem,2vw+1rem,3rem) · H3 text-lg
 *   Body text-base (one lead paragraph per section) · Small text-sm (cards/lists) · Micro text-xs
 *   Eyebrow text-sm uppercase 0.2em + dot · Buttons rounded-full, text-base semibold, icon chip
 * Headings H1/H2 use Alice (brand); H3 + UI use Almarai, mirroring the template's sans H3.
 */

// Visible marker for anything the client hasn't confirmed. Never style this as real copy.
export function Placeholder({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-dashed px-3.5 py-1.5 text-xs font-bold ${
        dark ? "border-gold bg-white/10 text-white" : "border-gold bg-gold/10 text-slate"
      }`}
    >
      {children}
    </span>
  );
}

function RefTag({ image, className = "" }: { image: RefImage; className?: string }) {
  return (
    <span
      title={`Source: ${image.source}. Not approved for public use.`}
      className={`absolute z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm ${className}`}
    >
      {image.kind} · Reference only
    </span>
  );
}

function RefImg({
  image,
  className = "",
  tagClassName = "left-3 top-3",
}: {
  image: RefImage;
  className?: string;
  tagClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <RefTag image={image} className={tagClassName} />
    </div>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] ${
        dark ? "text-white" : "text-primary"
      }`}
    >
      <span className="size-1.5 rounded-full bg-gold" aria-hidden />
      {children}
    </p>
  );
}

export const H2 = "font-serif text-[clamp(2rem,2vw+1rem,3rem)] leading-[1.1] tracking-[-0.01em]";
const H3 = "text-lg font-bold";
const TEXT_LINK =
  "group inline-flex items-center gap-2 text-base font-bold text-primary underline underline-offset-4 hover:text-slate";

export function ConsultationButton({ tone = "green" }: { tone?: "green" | "gold" }) {
  return (
    <Link
      to="/contact"
      className={`group inline-flex h-12 items-center gap-3 rounded-full py-1 pl-6 pr-1.5 text-base font-bold shadow-md shadow-black/0 transition-all duration-300 hover:scale-[1.04] hover:shadow-lg ${
        tone === "gold"
          ? "bg-gold text-black hover:shadow-gold/40"
          : "bg-primary text-primary-foreground hover:shadow-primary/30"
      }`}
    >
      {CONSULTATION.cta}
      <span
        className={`flex size-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-45 ${
          tone === "gold" ? "bg-primary text-white" : "bg-gold text-black"
        }`}
      >
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}

/* ---------- 1. Hero ---------- */

const HERO_LINKS = [
  { label: "New builds", to: "/services/new-builds" },
  { label: "Custom homes", to: "/services/new-builds" },
  { label: "Renovations", to: "/services/home-renovations" },
] as const;

const SLIDE_MS = 7000;

// Full-bleed photo slideshow (layout direction: econest.pixcelsthemes.com) in Nordic colours.
// Readability comes from a brand-green gradient behind the copy, not from the photo.
export function HomeHero() {
  const slides = HERO.slides;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // No autoplay for reduced-motion users; dots still work.
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [active, paused, slides.length]);

  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-primary text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((img, i) => (
        <div
          key={img.src}
          aria-hidden={i !== active}
          className={`absolute inset-0 -z-20 transition-opacity duration-[1200ms] ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img.src}
            alt={i === 0 ? img.alt : ""}
            className={`h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${
              i === active ? "scale-105" : "scale-100"
            }`}
            fetchPriority={i === 0 ? "high" : "low"}
          />
        </div>
      ))}
      {/* brand-green gradient: solid behind the copy, clear over the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(13_61_50/0.95)_0%,rgb(18_85_69/0.85)_32%,rgb(18_85_69/0.35)_62%,rgb(18_85_69/0.05)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(13_61_50/0.75)_0%,rgb(18_85_69/0.7)_45%,rgb(13_61_50/0.92)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/35 to-transparent"
      />

      <div className="wrap flex flex-1 items-center pb-36 pt-36 sm:pb-44 lg:pt-40">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
            <Leaf className="size-4 text-gold" aria-hidden />
            {HERO.eyebrow}
          </p>
          <h1 className="mt-6 font-serif text-[clamp(2.5rem,4vw+1rem,4.25rem)] leading-[1.04] tracking-[-0.03em]">
            {HERO.titleLead}
            <br />
            <span className="text-gold">{HERO.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-white/90">{HERO.body}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              to="/contact"
              className="group inline-flex h-14 items-center gap-4 rounded-full border border-white/40 bg-white/10 py-1.5 pl-6 pr-1.5 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:bg-white/20"
            >
              {HERO.cta}
              <span className="flex size-11 items-center justify-center rounded-full bg-gold text-black transition-transform duration-300 group-hover:rotate-45">
                <ArrowRight className="size-4" />
              </span>
            </Link>
            <a
              href="#process"
              className="group inline-flex items-center gap-2 text-base font-bold text-white underline underline-offset-4 hover:text-white/85"
            >
              {HERO.secondary}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2">
            {HERO_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/15 px-3.5 py-1.5 text-sm font-bold text-white backdrop-blur-md transition-colors hover:border-gold hover:bg-gold hover:text-black"
                >
                  {l.label}
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* slide controls: vertical on desktop, glass pill on mobile */}
      <div
        className="absolute bottom-28 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-black/30 px-4 py-2.5 backdrop-blur-md sm:bottom-32 lg:bottom-auto lg:left-auto lg:right-8 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:flex-col lg:px-2.5 lg:py-4"
        role="group"
        aria-label="Hero images"
      >
        {slides.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1} of ${slides.length}`}
            aria-current={i === active}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? "size-3 bg-gold ring-4 ring-gold/30"
                : "size-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>

      <RefTag
        image={slides[active] ?? IMAGES.hero}
        className="bottom-[4.5rem] right-4 sm:bottom-24 sm:right-6"
      />

      {/* curved bottom edge into the white section below */}
      <svg
        aria-hidden
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-14 w-full fill-background sm:h-20"
      >
        <path d="M0 70C180 115 360 120 540 96S900 20 1080 30s300 50 360 62V120H0Z" />
      </svg>
    </section>
  );
}

/* ---------- 2. Intro / positioning ---------- */

export function HomeIntro() {
  return (
    <section className="py-24 sm:py-28">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow>{INTRO.eyebrow}</Eyebrow>
          <h2 className={`${H2} mt-4`}>{INTRO.title}</h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            {INTRO.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-8 font-serif text-xl text-primary">{INTRO.people}</p>
          <div className="mt-8 border-l-2 border-gold pl-5">
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
          <Link to="/about-us" className={`mt-8 ${TEXT_LINK}`}>
            About Nordic Green Homes <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
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

const SERVICE_LINKS = {
  newBuilds: "/services/new-builds",
  customHomes: "/services/new-builds",
  renovations: "/services/home-renovations",
} as const;

export function HomeServices() {
  return (
    <section className="bg-secondary/70 py-24 sm:py-28">
      <div className="wrap">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>What we build</Eyebrow>
            <h2 className={`${H2} mt-4`}>New builds, custom homes and renovations</h2>
          </div>
          <Link to="/services" className={TEXT_LINK}>
            All services <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {SERVICES.map((s) => (
            <Link key={s.key} to={SERVICE_LINKS[s.key]} className="group block">
              <RefImg image={s.image} className="aspect-[4/5] rounded-lg" />
              <h3 className={`mt-6 ${H3}`}>{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary underline underline-offset-4">
                Learn more{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Placeholder>{PLACEHOLDER.services}</Placeholder>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. Pillars ---------- */

export function HomePillars() {
  return (
    <section className="py-24 sm:py-28">
      <div className="wrap">
        <div className="max-w-2xl">
          <Eyebrow>What guides us</Eyebrow>
          <h2 className={`${H2} mt-4`}>Four principles behind every home</h2>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <div key={p.title} className="border-t border-border pt-6">
              <span className="font-serif text-3xl text-gold">0{i + 1}</span>
              <h3 className={`mt-4 ${H3}`}>{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Process ---------- */

export function HomeProcess() {
  return (
    <section id="process" className="bg-secondary/70 py-24 sm:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>How we work</Eyebrow>
            <h2 className={`${H2} mt-4`}>A clear path from first conversation to handover</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Five stages, laid out up front, so you know what to expect at each step.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <ConsultationButton />
              <Link to="/process" className={TEXT_LINK}>
                The full process
              </Link>
            </div>
          </div>
        </div>

        <ol className="relative lg:col-span-6 lg:col-start-7">
          <span className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-gold/50" aria-hidden />
          {PROCESS.map((step, i) => (
            <li key={step.title} className="relative flex gap-6 pb-12 last:pb-0">
              <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border border-gold bg-background font-serif text-lg text-primary">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className={H3}>{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-primary">
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

/* ---------- 6. Green Mastery Assurance ---------- */

export function HomeAssurance() {
  return (
    <section className="bg-primary py-24 text-primary-foreground sm:py-32">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow dark>{ASSURANCE.eyebrow}</Eyebrow>
          <h2 className={`${H2} mt-4`}>{ASSURANCE.title}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85">
            {ASSURANCE.body}
          </p>
          <div className="mt-8">
            <Placeholder dark>{PLACEHOLDER.assurance}</Placeholder>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <RefImg image={IMAGES.interior} className="aspect-[5/4] rounded-lg" />
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Projects + reviews slot ---------- */

export function HomeProjects() {
  return (
    <section className="py-24 sm:py-28">
      <div className="wrap">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Selected work</Eyebrow>
            <h2 className={`${H2} mt-4`}>Design and build, in detail</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Every image is labelled as a photo or a concept render.
            </p>
          </div>
          <Link to="/projects" className={TEXT_LINK}>
            View projects <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-12 md:grid-rows-2">
          <RefImg
            image={IMAGES.entry}
            className="aspect-[4/3] rounded-lg md:col-span-7 md:row-span-2 md:aspect-auto"
          />
          <RefImg image={IMAGES.obrienReno} className="aspect-[4/3] rounded-lg md:col-span-5" />
          <RefImg image={IMAGES.obrienPoolBar} className="aspect-[4/3] rounded-lg md:col-span-5" />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Placeholder>{PLACEHOLDER.projects}</Placeholder>
          <Placeholder>{PLACEHOLDER.testimonials}</Placeholder>
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. Guide ---------- */

export function HomeGuide() {
  return (
    <section className="bg-secondary/70 py-24 sm:py-28">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12">
        {/* Draft cover built from the supplied logo — a layout stand-in, not the real guide cover. */}
        <div className="mx-auto w-full max-w-sm lg:col-span-4 lg:col-start-2">
          <div className="relative flex aspect-[3/4] flex-col items-center justify-between rounded-lg bg-primary p-8 text-center text-primary-foreground shadow-xl shadow-primary/20">
            <img src="/brand/nordic-logo-light.png" alt="" className="mt-4 w-40 opacity-95" />
            <p className="font-serif text-3xl leading-tight">{GUIDE.title}</p>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/75">
              Draft cover · placeholder
            </span>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow>{GUIDE.eyebrow}</Eyebrow>
          <h2 className={`${H2} mt-4`}>{GUIDE.title}</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{GUIDE.body}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {GUIDE.topics.map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm">
                <span className="size-1.5 rounded-full bg-gold" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <span
              aria-disabled
              className="inline-flex h-12 cursor-not-allowed items-center rounded-full border border-primary/30 px-6 text-base font-bold text-primary/60"
            >
              Guide coming soon
            </span>
            <Placeholder>{PLACEHOLDER.guide}</Placeholder>
          </div>
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
    <section className="bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--secondary)_70%,white)_55%,var(--primary)_55%)] pt-8">
      <div className="wrap">
        <div className="relative isolate overflow-hidden rounded-xl text-white shadow-2xl shadow-black/20">
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
              <h2 className={`${H2} mt-4`}>{CONSULTATION.title}</h2>
              <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-white/90">
                {CONSULTATION.body}
              </p>
              <div className="mt-8">
                <ConsultationButton tone="gold" />
              </div>
              <p className="mt-4 text-xs text-white/70">
                Internal pilot: enquiry forms and CRM submission are switched off.
              </p>
            </div>

            <dl className="grid gap-6 rounded-lg border border-white/15 bg-black/20 p-6 backdrop-blur-md sm:grid-cols-2">
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
