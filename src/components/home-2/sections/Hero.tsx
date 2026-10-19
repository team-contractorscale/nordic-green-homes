import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Leaf } from "lucide-react";
import { ArchitecturalCanvas } from "../ArchitecturalCanvas";
import { HERO, IMAGES, type RefImage } from "@/lib/home-content";
import { BRAND } from "@/lib/content-data";

export function Eyebrow({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: "gold" | "light" | "dark";
}) {
  const color = tone === "gold" ? "text-gold" : tone === "light" ? "text-white/80" : "text-primary";
  return (
    <p
      data-anim="reveal"
      className={`flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] ${color}`}
    >
      <span className="size-1.5 rounded-full bg-gold" aria-hidden />
      {children}
    </p>
  );
}

export function RefTag({ image, className = "" }: { image: RefImage; className?: string }) {
  return (
    <span
      title={`Source: ${image.source}. Not approved for public use.`}
      className={`absolute z-10 rounded-full bg-black/65 px-3 py-1 text-[0.7rem] font-bold text-white backdrop-blur-sm ${className}`}
    >
      {image.kind} · Reference only
    </span>
  );
}

export function CinematicHero() {
  return (
    <section
      data-anim="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-brand-dark text-white"
    >
      <ArchitecturalCanvas className="absolute inset-0 -z-20 h-full w-full opacity-70" />
      <img
        src={IMAGES.interior.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-30 h-full w-full object-cover opacity-25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(13_61_50/0.96)_0%,rgb(18_85_69/0.82)_40%,rgb(18_85_69/0.4)_72%,rgb(13_61_50/0.6)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-black/40 to-transparent"
      />

      <div className="wrap flex flex-1 items-center pb-40 pt-44 lg:pt-40">
        <div className="max-w-[44rem]">
          <p
            data-anim="hero-eyebrow"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-gold"
          >
            <Leaf className="size-4" aria-hidden />
            {HERO.eyebrow}
          </p>
          <h1
            data-anim="hero-title"
            className="mt-7 font-serif text-[clamp(2.9rem,6.5vw,6.5rem)] leading-[0.98] tracking-[-0.03em]"
          >
            Where sustainability
            <br />
            <span className="text-gold">meets style.</span>
          </h1>
          <p
            data-anim="hero-body"
            className="mt-8 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {HERO.body}
          </p>

          <div data-anim="hero-cta" className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/30 bg-white/10 py-1.5 pl-7 pr-1.5 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:bg-white/15"
            >
              {BRAND.primaryCtaText}
              <span className="flex size-11 items-center justify-center rounded-full bg-gold text-black transition-transform duration-300 group-hover:rotate-45">
                <ArrowRight className="size-4" />
              </span>
            </Link>
            <a
              href="#story"
              className="group inline-flex items-center gap-2 text-base font-bold text-white/90 underline underline-offset-4 hover:text-white"
            >
              Begin the story
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div
        data-anim="hero-cue"
        className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-2 text-white/55"
      >
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" aria-hidden />
      </div>
    </section>
  );
}
