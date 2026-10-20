import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { HERO, IMAGES } from "@/lib/home-content";
import { RefTag } from "./shared";

/* ---------- 1. Hero ----------
 * Full-bleed photo slideshow in Nordic colours. Readability comes from a
 * brand-green gradient behind the copy, not from the photo.
 *
 * Slide navigation: enlarged image thumbnails with NO background styling and
 * NON-rounded (square) corners. Each thumb indicates the active slide (gold
 * ring + full opacity + gold edge) and controls it on click. The nav is
 * absolutely positioned inside the section, so it always stays within the hero
 * bounds on every viewport.
 */

const HERO_LINKS = [
  { label: "New builds", to: "/services/new-builds" },
  { label: "Custom homes", to: "/services/new-builds" },
  { label: "Renovations", to: "/services/home-renovations" },
] as const;

const SLIDE_MS = 7000;

export function HomeHero() {
  const slides = HERO.slides;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // No autoplay for reduced-motion users; thumbnails still work.
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
          data-parallax
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

      <div className="wrap flex flex-1 items-center pb-44 pt-36 sm:pb-44 lg:pt-40">
        <div className="max-w-2xl">
          <p
            data-anim="hero-eyebrow"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md"
          >
            <Leaf className="size-4 text-gold" aria-hidden />
            {HERO.eyebrow}
          </p>
          <h1
            data-anim="hero-title"
            className="mt-6 font-serif text-[clamp(2.5rem,4vw+1rem,4.25rem)] leading-[1.04] tracking-[-0.03em]"
          >
            {HERO.titleLead}
            <br />
            <span className="text-gold">{HERO.titleAccent}</span>
          </h1>
          <p
            data-anim="hero-body"
            className="mt-6 max-w-[34rem] text-base leading-relaxed text-white/90"
          >
            {HERO.body}
          </p>

          <div data-anim="hero-cta" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
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

          <ul data-anim="hero-links" className="mt-10 flex flex-wrap gap-2">
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

      {/* slide controls: large rounded image thumbnails — pinned inside the hero, always visible */}
      <div
        data-anim="hero-nav"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-4 lg:bottom-auto lg:left-auto lg:right-12 lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2"
        role="group"
        aria-label="Hero images"
      >
        <div className="flex items-center gap-4 lg:flex-col">
          {slides.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${slides.length}: ${img.alt}`}
              aria-current={i === active}
              className={`group relative block h-20 w-28 overflow-hidden rounded-xl outline-none ring-1 ring-white/20 transition-all duration-500 hover:ring-2 hover:ring-white/70 lg:h-28 lg:w-44 ${
                i === active ? "ring-2 ring-gold ring-offset-2 ring-offset-primary" : ""
              }`}
            >
              <img
                src={img.src}
                alt=""
                aria-hidden
                loading={i === 0 ? "eager" : "lazy"}
                className={`h-full w-full object-cover transition-all duration-700 ${
                  i === active ? "opacity-100" : "opacity-50 group-hover:opacity-95"
                }`}
              />
              {i === active && (
                <span aria-hidden className="absolute inset-0 rounded-xl ring-4 ring-gold/20" />
              )}
            </button>
          ))}
        </div>
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
