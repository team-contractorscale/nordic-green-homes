import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  CTA,
  CONSULTATION,
  HERO,
  IMAGES,
  PILLARS,
  SERVICES,
  TIME,
  type RefImage,
} from "@/lib/home-content";
import { ArchitecturalCanvas } from "./ArchitecturalCanvas";

/* /home-2 — cinematic editorial homepage. Distinct layout from /, same brand tokens
 * and content. GSAP scroll reveals + a restrained Three.js wireframe in the hero.
 * One H1, semantic sections, reduced-motion safe, no horizontal overflow. */

const JOURNEY = [
  {
    n: "01",
    title: "Consultation",
    body: "Start with your site, ideas, timing and budget. Bring the questions you have now, whether you have detailed drawings or are still working out what the home needs to be.",
  },
  {
    n: "02",
    title: "Design and planning",
    body: "Turn your priorities into a clearer brief. Consider layout, light, materials and performance goals alongside the site and budget. If you have an architect or designer, establish who is responsible for each part of the work.",
  },
  {
    n: "03",
    title: "Materials and approvals",
    body: "Bring finishes, fixtures and key specifications together with the documents your project needs. The approval path depends on your location, property and design.",
  },
  {
    n: "04",
    title: "Construction",
    body: "Before site work starts, understand what is included, how changes will be handled and how you will receive updates. Keep the agreed scope and key decisions close throughout the build.",
  },
  {
    n: "05",
    title: "Handover and ongoing care",
    body: "Get to know your finished home, its systems and the care they need. Handover documents, product information and written warranty terms help you understand what comes next.",
  },
] as const;

const REFERENCE_IMAGES: RefImage[] = [
  IMAGES.hero,
  IMAGES.nordicHaus,
  IMAGES.hausPatio,
  IMAGES.hausRear,
  IMAGES.customHomes,
  IMAGES.hausGarden,
];

function RefBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 border border-gold/60 bg-overlay/70 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
      Reference only
    </span>
  );
}

function useCinematicMotion() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let killed = false;
    let ctx: { revert: () => void } | null = null;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (killed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 48,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });
        gsap.from("[data-hero-line]", {
          yPercent: 115,
          opacity: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.25,
        });
        gsap.utils.toArray<HTMLElement>("[data-pin-card]").forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            x: i % 2 ? 60 : -60,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          });
        });
      }, root.current);
    })();
    return () => {
      killed = true;
      ctx?.revert();
    };
  }, []);
  return root;
}

export function CinematicHome() {
  const root = useCinematicMotion();
  return (
    <div ref={root} className="bg-background text-foreground">
      {/* 1. Emotional promise — full-screen cinematic hero */}
      <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-overlay text-white">
        <ArchitecturalCanvas className="absolute inset-0 -z-10 opacity-70" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-overlay/80 via-overlay/70 to-overlay"
        />
        <div className="wrap w-full pt-32 pb-20">
          <p
            data-reveal
            className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
          >
            <span aria-hidden className="h-px w-10 bg-gold" />
            {HERO.eyebrow}
          </p>
          <h1 className="mt-8 font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.03em]">
            {HERO.titleLines.map((line) => (
              <span key={line} className="block overflow-hidden py-1">
                <span data-hero-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p data-reveal className="mt-8 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {HERO.body}
          </p>
          <div data-reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center bg-gold px-7 text-base font-bold text-black transition-transform duration-300 hover:scale-[1.04]"
            >
              {CTA.call.label}
            </Link>
            <Link
              to="/process"
              className="inline-flex h-12 items-center border-b border-white/40 px-1 text-base font-medium text-white transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              See the process
            </Link>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
        />
      </section>

      {/* 2. Philosophy — four principles, asymmetric */}
      <section className="bg-background py-24 sm:py-32">
        <div className="wrap">
          <div className="max-w-2xl">
            <p data-reveal className="text-xs font-bold uppercase tracking-[0.24em] text-slate">
              What guides the work
            </p>
            <h2
              data-reveal
              className="mt-6 font-serif text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
            >
              Four principles behind a considered home
            </h2>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.items.map((p, i) => (
              <div
                key={p.title}
                data-reveal
                className="group relative bg-background p-8 transition-colors duration-500 hover:bg-secondary/40 sm:p-10"
              >
                <span className="font-serif text-5xl text-gold/30 transition-colors duration-500 group-hover:text-gold">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-serif text-2xl">{p.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Complete-home approach — layered imagery + sticky text */}
      <section className="bg-secondary/40 py-24 sm:py-32">
        <div className="wrap grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p data-reveal className="text-xs font-bold uppercase tracking-[0.24em] text-slate">
                {TIME.eyebrow}
              </p>
              <h2
                data-reveal
                className="mt-6 font-serif text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.05] tracking-[-0.02em]"
              >
                {TIME.title}
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
                {TIME.body.map((p) => (
                  <p key={p} data-reveal>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-6 lg:col-span-7">
            <div data-pin-card className="overflow-hidden border border-border">
              <img
                src={IMAGES.hausPatio.src}
                alt={IMAGES.hausPatio.alt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div data-pin-card className="overflow-hidden border border-border">
                <img
                  src={IMAGES.interior.src}
                  alt={IMAGES.interior.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div data-pin-card className="overflow-hidden border border-border">
                <img
                  src={IMAGES.hausSide.src}
                  alt={IMAGES.hausSide.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core services — three staggered panels */}
      <section className="bg-overlay py-24 text-white sm:py-32">
        <div className="wrap">
          <div className="max-w-2xl">
            <p data-reveal className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
              What we build
            </p>
            <h2
              data-reveal
              className="mt-6 font-serif text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
            >
              Find the right starting point for your home
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {SERVICES.slice(0, 3).map((s, i) => (
              <Link
                key={s.key}
                to={s.to}
                data-reveal
                className="group relative flex flex-col overflow-hidden border border-white/15 bg-overlay p-7 transition-colors duration-500 hover:border-gold"
              >
                <span className="font-serif text-5xl text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.4)] transition-colors duration-500 group-hover:text-gold group-hover:[-webkit-text-stroke:1px_var(--gold)]">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-serif text-2xl leading-tight">{s.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/75">{s.body}</p>
                <span className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                  {s.cta.replace("Explore ", "")}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Five-stage journey — vertical timeline */}
      <section className="bg-background py-24 sm:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p data-reveal className="text-xs font-bold uppercase tracking-[0.24em] text-slate">
                How we work
              </p>
              <h2
                data-reveal
                className="mt-6 font-serif text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.05] tracking-[-0.02em]"
              >
                From your first questions to moving in
              </h2>
              <p data-reveal className="mt-6 text-base leading-relaxed text-muted-foreground">
                There is a lot to decide before a home takes shape. These five stages bring the key
                questions into view.
              </p>
              <Link
                to="/process"
                data-reveal
                className="mt-8 inline-flex h-11 items-center border-b-2 border-gold px-1 text-sm font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-gold"
              >
                See the process
              </Link>
            </div>
          </div>
          <ol className="relative lg:col-span-7 lg:col-start-6 lg:border-l lg:border-border">
            {JOURNEY.map((stage) => (
              <li key={stage.n} data-reveal className="relative pb-12 pl-10 lg:pl-12">
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 grid size-8 -translate-x-1/2 place-items-center border border-gold bg-background font-serif text-xs text-gold lg:left-0"
                >
                  {stage.n}
                </span>
                <h3 className="font-serif text-2xl">{stage.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Reference work — clearly labelled */}
      <section className="bg-secondary/40 py-24 sm:py-32">
        <div className="wrap">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p data-reveal className="text-xs font-bold uppercase tracking-[0.24em] text-slate">
                Selected work
              </p>
              <h2
                data-reveal
                className="mt-6 font-serif text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.05] tracking-[-0.02em]"
              >
                Design and build, in detail
              </h2>
            </div>
            <Link
              to="/projects"
              data-reveal
              className="inline-flex h-11 items-center border-b-2 border-gold px-1 text-sm font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-gold"
            >
              View projects
            </Link>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REFERENCE_IMAGES.map((img) => (
              <figure
                key={img.src}
                data-reveal
                className="group relative overflow-hidden border border-border"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute right-3 top-3">
                  <RefBadge />
                </figcaption>
              </figure>
            ))}
          </div>
          <p data-reveal className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Images are shown for inspiration only and are not confirmed Nordic Green Homes completed
            projects. Attribution and permissions are pending.
          </p>
        </div>
      </section>

      {/* 7. Final consultation CTA */}
      <section className="relative isolate overflow-hidden bg-overlay py-24 text-white sm:py-32">
        <img
          src={IMAGES.hausRear.src}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-overlay/80" />
        <div className="wrap text-center">
          <p data-reveal className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
            {CONSULTATION.eyebrow}
          </p>
          <h2
            data-reveal
            className="mx-auto mt-6 max-w-3xl font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em]"
          >
            {CONSULTATION.title}
          </h2>
          <p data-reveal className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/85">
            {CONSULTATION.body[0]}
          </p>
          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-5">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center bg-gold px-7 text-base font-bold text-black transition-transform duration-300 hover:scale-[1.04]"
            >
              {CONSULTATION.cta}
            </Link>
            <Link
              to="/estimate"
              className="inline-flex h-12 items-center border-b border-white/40 px-1 text-base font-medium text-white transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              {CTA.estimate.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
