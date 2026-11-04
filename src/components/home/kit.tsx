import { Link, type LinkProps } from "@tanstack/react-router";
import { animate } from "animejs";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import type { RefImage } from "@/lib/home-content";
import { imgProps } from "./shared";

/* Homepage-only primitives, ported from the Highwater Homes system (square corners, rule
 * eyebrows, sweep CTAs) into Nordic colours: deep green grounds, gold as the single accent.
 * Kept out of ./shared so the other pages (and their bundles) stay untouched.
 */

// Section heading scale (Highwater §7b), set in the Nordic serif.
export const HEADING =
  "font-serif text-[clamp(2.25rem,2.8vw+1rem,4rem)] leading-[1.04] tracking-[-0.02em]";

// Section label: gold rule + tracked uppercase.
export function Kicker({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      data-reveal="left"
      className={`flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] ${
        dark ? "text-white/75" : "text-slate"
      }`}
    >
      <span aria-hidden className="h-px w-10 bg-gold" />
      {children}
    </p>
  );
}

const FINE_POINTER =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// Anime.js micro-interaction: the element leans toward the cursor and springs back on leave.
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(FINE_POINTER).matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      animate(el, {
        x: (e.clientX - r.left - r.width / 2) * strength,
        y: (e.clientY - r.top - r.height / 2) * strength,
        duration: 400,
        ease: "outQuad",
      });
    };
    const onLeave = () => animate(el, { x: 0, y: 0, duration: 900, ease: "outElastic(1, .4)" });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);
  return ref;
}

// Primary CTA: square gold block; a deep-green fill sweeps in from the left on hover.
export function SweepLink({
  to,
  children,
}: {
  to: NonNullable<LinkProps["to"]>;
  children: ReactNode;
}) {
  const ref = useMagnetic<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      to={to}
      className="group relative inline-flex h-12 items-center justify-between gap-4 overflow-hidden bg-gold px-6 text-xs font-bold uppercase tracking-[0.18em] text-black"
    >
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-[101%] bg-brand-dark transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
      />
      <span className="relative transition-colors duration-500 group-hover:text-white">
        {children}
      </span>
      <ArrowUpRight className="relative size-4 transition-all duration-500 group-hover:rotate-45 group-hover:text-white" />
    </Link>
  );
}

// Secondary link: label with an underline that draws in from the left.
export function LineLink({
  to,
  href,
  children,
  dark = false,
}: {
  to?: NonNullable<LinkProps["to"]>;
  href?: string;
  children: ReactNode;
  dark?: boolean;
}) {
  const cls = `group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${
    dark ? "text-white" : "text-primary"
  }`;
  const inner = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
        />
      </span>
      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
    </>
  );
  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

// Gold scroll-progress line pinned to the top of the page (scrubbed by useHomeMotion).
export function ScrollProgress() {
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        data-scroll-bar
        className="h-full w-full origin-left bg-gold motion-reduce:hidden"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

// Section indicator (xl, left gutter): number + name of the [data-section] in view, swapped by
// useHomeMotion. Hidden over the first section.
export function SectionIndicator() {
  return (
    <p
      data-indicator
      aria-hidden
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 rotate-180 items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-white mix-blend-difference [writing-mode:vertical-rl] xl:flex"
      style={{ opacity: 0 }}
    >
      <span data-indicator-num className="font-serif text-sm tracking-normal">
        01
      </span>
      <span className="h-8 w-px bg-current" />
      <span className="overflow-hidden">
        <span data-indicator-label className="block" />
      </span>
    </p>
  );
}

/* ---------- Inner-page hero ----------
 * Dark editorial split used by About, Why Choose Us and Our approach: masked H1 lines (the
 * last in gold, the second stepped in on lg) and the page's copy on the left; a framed image on
 * the right that settles out of a blur and parallaxes (useHomeMotion: data-anim="photo" /
 * data-photo-inner). Optional rail closes the hero, like the homepage services rail.
 * Children are the copy under the H1; give each block data-anim="fade".
 */
export function PageHero({
  section,
  eyebrow,
  lines,
  image,
  frameOverlay,
  rail,
  backdrop,
  children,
}: {
  section: string;
  eyebrow: string;
  lines: readonly string[];
  /** The <img> for the frame (fills it). */
  image: ReactNode;
  /** Name plates, caption tag, etc. drawn over the frame. */
  frameOverlay?: ReactNode;
  rail?: ReactNode;
  /** Full-bleed background photo behind the hero. */
  backdrop?: RefImage;
  children: ReactNode;
}) {
  return (
    <section
      data-section={section}
      className="grain relative isolate overflow-hidden bg-overlay text-white"
    >
      {backdrop && <HeroBackdrop image={backdrop} />}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_78%_45%,rgb(187_137_92/0.16),transparent_70%)]"
      />
      <div className="wrap flex min-h-svh flex-col pt-32 lg:pt-40">
        <div className="grid flex-1 items-center gap-12 pb-12 lg:grid-cols-12">
          <div data-hero-copy className="lg:col-span-7">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              {eyebrow}
            </p>
            <HeroTitle lines={lines} max="4.75rem" indent className="mt-7" />
            {children}
          </div>
          <div className="lg:col-span-5">
            <div
              data-anim="photo"
              className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden border border-white/15 shadow-2xl shadow-black/40"
            >
              <div data-photo-inner className="absolute inset-x-0 -inset-y-[6%]">
                {image}
              </div>
              {frameOverlay}
            </div>
          </div>
        </div>
        {rail && (
          <div className="relative">
            <span
              data-rule
              aria-hidden
              className="absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 origin-left bg-white/20"
            />
            {rail}
          </div>
        )}
      </div>
    </section>
  );
}

// "Explore related pages": a row of large numbered links closing an inner page.
export function RelatedLinks({
  links,
}: {
  links: readonly { label: string; to: NonNullable<LinkProps["to"]> }[];
}) {
  return (
    <section data-section="Related" className="bg-background py-20 sm:py-24">
      <div className="wrap">
        <Kicker>Explore related pages</Kicker>
        <ul
          className={`mt-10 grid border-t border-border sm:grid-cols-2 ${
            links.length === 3
              ? "lg:grid-cols-3"
              : links.length === 5
                ? "lg:grid-cols-5"
                : "lg:grid-cols-4"
          }`}
        >
          {links.map((l, i) => (
            <li
              key={l.label}
              data-reveal
              className="border-b border-border sm:odd:border-r lg:border-r lg:last:border-r-0"
            >
              <Link
                to={l.to}
                className="group flex h-full flex-col justify-between gap-10 p-6 transition-colors duration-500 hover:bg-secondary lg:p-8"
              >
                <span className="text-xs font-bold tracking-[0.2em] text-gold">0{i + 1}</span>
                <span className="flex items-end justify-between gap-4">
                  <span className="font-serif text-2xl leading-tight">{l.label}</span>
                  <ArrowUpRight className="size-5 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Page title: max three lines, never wrapping ----------
 * Each line is set on its own row (nowrap) and the type scales to the column so the longest
 * line always fits: font-size = min(max, column width / (longest line x ~0.5em per glyph)).
 * So a title is exactly its 1-3 authored lines on every screen. The last line is the gold
 * accent; with `indent`, the middle line steps in on lg. Lines carry data-anim="line" for the
 * masked rise in useHomeMotion.
 */
export function HeroTitle({
  lines,
  max = "5.25rem",
  indent = false,
  center = false,
  className = "",
}: {
  lines: readonly string[];
  max?: string;
  indent?: boolean;
  center?: boolean;
  className?: string;
}) {
  const step = indent && lines.length > 2;
  // 2.4 glyphs ≈ the 1.2em indent on the middle line.
  const longest = Math.max(...lines.map((l, i) => l.length + (step && i === 1 ? 2.4 : 0)));
  return (
    <div className={`@container ${center ? "text-center" : ""} ${className}`}>
      <h1
        className="font-serif leading-[0.98] tracking-[-0.03em]"
        style={{ fontSize: `min(${max}, calc(100cqi / ${(longest * 0.5).toFixed(2)}))` }}
      >
        {lines.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.08em]">
            <span
              data-anim="line"
              className={`block whitespace-nowrap ${step && i === 1 ? "lg:pl-[1.2em]" : ""} ${
                i === lines.length - 1 && lines.length > 1 ? "text-gold" : ""
              }`}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>
    </div>
  );
}

// Split a plain title into at most three balanced lines (for headers that pass one string).
export function titleLines(title: string, max = 3): string[] {
  const words = title.split(" ");
  const n = Math.min(max, words.length, Math.ceil(title.length / 18));
  if (n <= 1) return [title];
  const target = title.length / n;
  const out: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (cur && next.length > target && out.length < n - 1) {
      out.push(cur);
      cur = w;
    } else cur = next;
  }
  out.push(cur);
  return out;
}

/* ---------- Hero background image ----------
 * Full-bleed photo behind a page hero, under a deep scrim so the copy stays legible. Settles
 * out of a blur and parallaxes with the other hero photos (data-anim="photo" /
 * data-photo-inner). Decorative: alt="".
 */
export function HeroBackdrop({
  image,
  strength = 80,
}: {
  image: RefImage | string;
  strength?: 70 | 80 | 88;
}) {
  const props = typeof image === "string" ? { src: image } : { ...imgProps(image, "100vw") };
  const scrim = { 70: "bg-overlay/70", 80: "bg-overlay/80", 88: "bg-overlay/[0.88]" }[strength];
  return (
    <div aria-hidden data-anim="photo" className="absolute inset-0 -z-20 overflow-hidden">
      <div data-photo-inner className="absolute inset-x-0 -inset-y-[6%]">
        <img {...props} alt="" fetchPriority="high" className="h-full w-full object-cover" />
      </div>
      <div className={`absolute inset-0 ${scrim}`} />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-overlay/70 to-transparent" />
    </div>
  );
}
