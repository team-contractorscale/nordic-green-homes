import { Link, type LinkProps } from "@tanstack/react-router";
import { animate } from "animejs";
import { ArrowUpRight, Plus } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import {
  BUDGET,
  CTA,
  FAQS,
  HOME_SERVICES,
  IMAGES,
  PILLARS,
  PLACEHOLDER,
  START,
  TEAM,
} from "@/lib/home-content";
import { RefImg, RefTag, imgProps } from "./shared";
import { HEADING, Kicker, LineLink, SweepLink } from "./kit";

/* Homepage-only inline sections (Highwater Homes layout + motion language; see ./kit).
 * Larger sections live in their own modules next to this one.
 */

/* ---------- 2. Design and budget ----------
 * Highwater "About" manifesto: the scenario paragraph lights up word by word as you scroll
 * ([data-manifesto], pinned on lg) under the section heading. Below: the cause, Lane's story
 * with his line set as a large pull quote, and the estimate CTA.
 */

export function HomeIntro() {
  return (
    <div>
      <section
        data-manifesto
        data-section="Design and budget"
        className="bg-background py-24 sm:py-28 lg:flex lg:min-h-svh lg:items-center"
      >
        <div className="wrap grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Kicker>{BUDGET.eyebrow}</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              {BUDGET.title}
            </h2>
            <p
              data-manifesto-text
              className="mt-10 font-serif text-[clamp(1.5rem,1.6vw+1rem,2.5rem)] leading-[1.25] tracking-[-0.01em] text-foreground"
            >
              {BUDGET.manifesto}
            </p>
          </div>
          <div data-reveal-img className="lg:col-span-4">
            <RefImg
              image={IMAGES.intro}
              className="arch aspect-[4/5] w-full max-w-sm lg:ml-auto"
              tagClassName="bottom-4 left-1/2 -translate-x-1/2"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background pb-24 pt-16 sm:pb-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <p data-reveal className="text-lg leading-relaxed text-foreground/85 lg:col-span-4">
            {BUDGET.cause}
          </p>
          <div className="lg:col-span-7 lg:col-start-6">
            <p data-reveal className="text-base leading-relaxed text-muted-foreground">
              {BUDGET.story}
            </p>
            <figure data-reveal="left" className="mt-8 border-l-2 border-gold pl-6 sm:pl-8">
              <blockquote className="font-serif text-[clamp(1.75rem,2vw+1rem,3rem)] leading-[1.1] tracking-[-0.015em]">
                &ldquo;{BUDGET.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-xs font-bold uppercase tracking-[0.24em] text-slate">
                &mdash; Lane
              </figcaption>
            </figure>
            <p data-reveal className="mt-10 text-base leading-relaxed text-muted-foreground">
              {BUDGET.close}
            </p>
            <div data-reveal className="mt-8">
              <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- 4. Meet Lane and Kylie ----------
 * Builder + designer pairing: their photo with name plates along the bottom (ordered to match
 * who stands where), story and CTA on the right.
 */

export function HomeTeam() {
  return (
    <section data-section="Lane and Kylie" className="bg-secondary py-24 sm:py-28">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] max-w-md overflow-hidden border border-slate/20 bg-background/60">
            <div data-reveal-img className="absolute inset-0">
              <img
                src={TEAM.photo.src}
                alt={TEAM.photo.alt}
                width={580}
                height={645}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <ul className="absolute inset-x-0 bottom-0 grid grid-cols-2 border-t border-slate/20 bg-background/90 backdrop-blur-sm">
              {TEAM.people.map((p, i) => (
                <li
                  key={p.name}
                  data-reveal
                  className={`p-5 sm:p-6 ${i ? "border-l border-slate/20" : ""}`}
                >
                  <span className="block font-serif text-3xl leading-none">{p.name}</span>
                  <span className="mt-2 block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-slate">
                    {p.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Kicker>{TEAM.eyebrow}</Kicker>
          <h2 data-split className={`${HEADING} mt-6`}>
            {TEAM.title}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
            {TEAM.body.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>
          <div data-reveal className="mt-10">
            <LineLink to="/about-us">{TEAM.cta}</LineLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Services ----------
 * Highwater "doors": photo panels meeting at 1px seams on a dark ground. The first two open
 * outward from their shared seam, the rest wipe up ([data-door], scrubbed). Hover: photo comes
 * up to full brightness, gold corner brackets frame it, title underline draws, the outlined
 * number fills gold, the arrow square fills, and the other panels dim. Text never moves.
 */

// Aspect ratios only from sm up: on phones a min-height alone keeps panels within the viewport.
const DOOR_LAYOUT = [
  "sm:aspect-[4/3] lg:col-span-3 lg:aspect-[16/11]",
  "sm:aspect-[4/3] lg:col-span-3 lg:aspect-[16/11]",
  "sm:aspect-[4/3] lg:col-span-2 lg:aspect-[4/5]",
  "sm:aspect-[4/3] lg:col-span-2 lg:aspect-[4/5]",
  "sm:col-span-2 sm:aspect-[16/9] lg:col-span-2 lg:aspect-[4/5]",
];
const DOOR_FROM = ["left", "right", "up", "up", "up"];
const BRACKET =
  "absolute size-6 border-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100";

export function HomeServices() {
  return (
    <section
      data-section="What we build"
      className="grain relative bg-overlay py-24 text-white sm:py-28"
    >
      <div className="wrap">
        <div className="max-w-3xl">
          <Kicker dark>What we build</Kicker>
          <h2 data-split className={`${HEADING} mt-6`}>
            {HOME_SERVICES.title}
          </h2>
          <p data-reveal className="mt-6 max-w-xl text-base leading-relaxed text-white/80">
            {HOME_SERVICES.areas}
          </p>
        </div>

        <div className="group/doors mt-14 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-6">
          {HOME_SERVICES.items.map((s, i) => (
            <Link
              key={s.key}
              to={s.to}
              data-door={DOOR_FROM[i]}
              className={`group relative isolate flex min-h-[26rem] min-w-0 flex-col justify-end overflow-hidden bg-overlay p-6 transition-opacity duration-500 group-has-[a:hover]/doors:opacity-45 hover:!opacity-100 sm:p-8 ${DOOR_LAYOUT[i]}`}
            >
              <img
                data-door-img
                {...imgProps(s.image, "(min-width: 1024px) 50vw, 100vw")}
                loading="lazy"
                className="absolute inset-0 -z-20 h-full w-full object-cover brightness-[0.7] saturate-[0.8] transition-[filter,scale] duration-700 group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-overlay via-overlay/75 to-overlay/10"
              />
              <span aria-hidden className={`${BRACKET} left-4 top-4 border-l border-t`} />
              <span aria-hidden className={`${BRACKET} right-4 top-4 border-r border-t`} />
              <span aria-hidden className={`${BRACKET} bottom-4 left-4 border-b border-l`} />
              <span aria-hidden className={`${BRACKET} bottom-4 right-4 border-b border-r`} />
              <RefTag image={s.image} className="right-4 top-4" />

              <span
                aria-hidden
                className="font-serif text-6xl leading-none text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_rgb(255_255_255/0.55)] group-hover:text-gold group-hover:[-webkit-text-stroke:1px_var(--gold)]"
              >
                0{i + 1}
              </span>
              <h3 className="mt-5 font-serif text-2xl leading-tight sm:text-3xl">
                <span className="relative">
                  {s.title}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
                  />
                </span>
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">{s.body}</p>
              <span className="mt-6 flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.18em]">
                {s.cta}
                <span className="grid size-10 shrink-0 place-items-center border border-white/30 transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. Start here (homepage closing CTA) ----------
 * Highwater "Talk to …" band: huge masked headline, a ghosted outline wordmark drifting with
 * scroll ([data-drift]), the photo un-clipping beside it, the two primary CTAs (magnetic sweep
 * via Anime.js) and the process link.
 */

type ClosingProps = {
  title?: string;
  /** Paragraph under the heading; null hides it. */
  body?: string | null;
  /** Gold-rule note under the body; null hides it. */
  note?: string | null;
  /** Secondary link under the CTAs (default "See our process"); null hides it. */
  link?: { label: string; to: NonNullable<LinkProps["to"]> } | null;
  /** Show the email + phone lines (About page). */
  contact?: boolean;
};

export function HomeClosing({
  title = START.title,
  body = START.body,
  note = START.note,
  link = { label: START.process, to: "/process" },
  contact = false,
}: ClosingProps = {}) {
  return (
    <section
      data-section="Start here"
      className="grain relative isolate overflow-hidden bg-overlay py-24 text-white sm:py-32"
    >
      <p
        data-drift
        aria-hidden
        className="pointer-events-none absolute -bottom-[0.18em] left-0 -z-10 select-none whitespace-nowrap font-serif text-[22vw] leading-none text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.08)]"
      >
        Nordic Green Homes
      </p>
      <div className="wrap grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Kicker dark>{START.eyebrow}</Kicker>
          <h2
            data-split
            className="mt-6 font-serif text-[clamp(2.75rem,4.5vw+1rem,5.5rem)] leading-[1] tracking-[-0.03em]"
          >
            {title}
          </h2>
          {body && (
            <p data-reveal className="mt-8 max-w-[34rem] text-base leading-relaxed text-white/80">
              {body}
            </p>
          )}
          {note && (
            <p
              data-reveal="left"
              className="mt-6 max-w-[34rem] border-l-2 border-gold pl-5 font-serif text-xl leading-snug text-white"
            >
              {note}
            </p>
          )}
          <div data-reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
            <LineLink to={CTA.call.to} dark>
              {CTA.call.label}
            </LineLink>
          </div>
          {link && (
            <div data-reveal className="mt-8">
              <LineLink to={link.to} dark>
                {link.label}
              </LineLink>
            </div>
          )}
          {contact && (
            <ul data-reveal className="mt-10 space-y-2 border-t border-white/15 pt-6 text-sm">
              <li>
                <a href={`mailto:${PLACEHOLDER.email}`} className="text-white/85 hover:text-gold">
                  {PLACEHOLDER.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PLACEHOLDER.phone.replace(/[^\d+]/g, "")}`}
                  className="text-white/85 hover:text-gold"
                >
                  Phone: {PLACEHOLDER.phone}
                </a>
              </li>
            </ul>
          )}
        </div>
        <div data-reveal-img className="relative lg:col-span-5">
          <img
            {...imgProps(IMAGES.hausRear, "(min-width: 1024px) 40vw, 100vw")}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <RefTag image={IMAGES.hausRear} className="bottom-4 right-4" />
        </div>
      </div>
    </section>
  );
}

/* ---------- 10. Frequently asked questions ----------
 * Sticky heading beside a numbered accordion. Anime.js tweens each panel's height; closed
 * answers stay in the DOM (inert) so they remain crawlable and the open one renders without JS.
 */

function FaqItem({
  faq,
  index,
  open,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  const panel = useRef<HTMLDivElement>(null);
  // Inline height is set once from the first render; Anime.js owns it after that.
  const [initialHeight] = useState(open ? "auto" : "0px");
  const mounted = useRef(false);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const anim = animate(el, {
      height: [el.offsetHeight, open ? el.scrollHeight : 0],
      duration: reduce ? 0 : 650,
      ease: "outExpo",
      onComplete: () => {
        if (open) el.style.height = "auto";
      },
    });
    return () => {
      anim.pause();
    };
  }, [open]);

  return (
    <li data-reveal className="group/faq border-b border-border">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full items-start gap-5 py-6 text-left sm:gap-8"
        >
          <span className="pt-1.5 text-xs font-bold tracking-[0.2em] text-gold">0{index + 1}</span>
          <span className="relative flex-1 font-serif text-xl leading-snug text-foreground sm:text-2xl">
            {faq.q}
          </span>
          <span
            aria-hidden
            className={`grid size-10 shrink-0 place-items-center border transition-colors duration-500 ${
              open
                ? "border-gold bg-gold text-black"
                : "border-border text-primary group-hover/faq:border-gold"
            }`}
          >
            <Plus
              className={`size-4 transition-transform duration-500 ${open ? "rotate-45" : ""}`}
            />
          </span>
        </button>
      </h3>
      <div
        ref={panel}
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        inert={!open}
        style={{ height: initialHeight }}
        className="overflow-hidden"
      >
        <p className="pb-7 pl-10 pr-14 text-base leading-relaxed text-muted-foreground sm:pl-14">
          {faq.a}
        </p>
      </div>
    </li>
  );
}

export function HomeFaqs({ items = FAQS }: { items?: { q: string; a: string }[] } = {}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section data-section="FAQs" className="bg-background py-24 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Kicker>FAQs</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              Frequently asked questions
            </h2>
          </div>
        </div>
        <ol className="border-t border-border lg:col-span-8">
          {items.map((faq, i) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              index={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Marquee band (between hero and intro) ----------
 * Slow serif word loop in alternating solid / gold-outline type. GSAP (useHomeMotion) runs the
 * loop and couples it to scroll velocity: scrolling speeds it up, skews it and flips direction
 * with the scroll. Decorative (the words repeat the four pillars), so hidden from AT.
 * Reduced motion: a static line.
 */

const MARQUEE_WORDS = PILLARS.items.map((p) => p.title);

export function HomeMarquee() {
  const row = (
    <div className="flex shrink-0 items-center">
      {MARQUEE_WORDS.map((w, i) => (
        <span key={w} className="flex items-center">
          <span
            className={`whitespace-nowrap px-8 font-serif text-[clamp(2.75rem,6vw,6rem)] leading-none ${
              i % 2 ? "text-transparent [-webkit-text-stroke:1px_var(--gold)]" : "text-white"
            }`}
          >
            {w}
          </span>
          <span className="size-2.5 rotate-45 bg-gold" />
        </span>
      ))}
    </div>
  );
  return (
    <div
      aria-hidden
      className="grain relative overflow-hidden border-y border-white/10 bg-overlay py-10 sm:py-14"
    >
      <div data-marquee className="flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
