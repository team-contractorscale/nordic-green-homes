import { Link } from "@tanstack/react-router";
import { animate, type JSAnimation } from "animejs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CTA, HERO, HOME_SERVICES } from "@/lib/home-content";
import { RefTag, imgProps } from "./shared";
import { LineLink, SweepLink, HeroTitle } from "./kit";

/* ---------- 1. Hero ----------
 * Highwater-style single cinematic hero (no slides). The supplied photo is bright (white render,
 * blue sky), so legibility comes from layered deep-green scrims: a left gradient on lg (flat on
 * small screens), plus top fade for the header and bottom fade for the services rail. The house
 * is a wide 2.5:1 frame, so the crop is set per breakpoint: on lg the tree sits under the copy
 * (extra contrast) and the balcony + timber cladding stay clear on the right; mobile centres the balcony.
 *
 * H1 runs as three masked lines ("Sustainable luxury. / Built around / your life.") so no word is
 * ever left alone on a line; the middle line steps in on lg for an editorial stagger.
 *
 * Motion (useHomeMotion): photo settles out of a blur + zoom, headline lines rise out of masks,
 * then copy, rule and rail. `[data-anim]` is hidden by CSS only for motion-OK + JS visitors;
 * everyone else gets the finished hero at once. Scroll: photo parallax, copy lifts and fades.
 */

const SLIDE_MS = 6000;
const HIDDEN = "inset(0% 0% 0% 100%)";

/* Square slider (lg+), bottom right above service 05. Anime.js drives it: the incoming slide
 * wipes in from the right while its image settles from a zoom, and a gold progress line times
 * autoplay (paused on hover / focus, off for reduced motion; the arrows always work). */
function HeroSlider() {
  const slides = HERO.slides;
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const prev = useRef(0);
  const timer = useRef<JSAnimation | null>(null);
  const hold = useRef(false);

  const go = (step: number) => setActive((i) => (i + step + slides.length) % slides.length);

  useEffect(() => {
    const items = root.current?.querySelectorAll<HTMLElement>("[data-slide]");
    const from = prev.current;
    const cur = items?.[active];
    if (!items || !cur || from === active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    items.forEach((el, i) => {
      el.style.zIndex = i === active ? "2" : i === from ? "1" : "0";
    });
    animate(cur, {
      clipPath: [HIDDEN, "inset(0% 0% 0% 0%)"],
      duration: reduce ? 0 : 1100,
      ease: "inOutExpo",
    });
    const img = cur.querySelector("img");
    if (img) animate(img, { scale: [1.25, 1], duration: reduce ? 0 : 1600, ease: "outExpo" });
    prev.current = active;
  }, [active]);

  useEffect(() => {
    const b = bar.current;
    if (!b || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = animate(b, {
      scaleX: [0, 1],
      duration: SLIDE_MS,
      ease: "linear",
      onComplete: () => go(1),
    });
    if (hold.current) timer.current.pause();
    return () => {
      timer.current?.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restart the timer per slide only
  }, [active]);

  const pause = () => {
    hold.current = true;
    timer.current?.pause();
  };
  const resume = () => {
    hold.current = false;
    timer.current?.resume();
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured designs"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div
        ref={root}
        className="relative aspect-square overflow-hidden bg-brand-dark shadow-2xl shadow-black/40"
      >
        {slides.map((s, i) => (
          <div
            key={s.src}
            data-slide
            aria-hidden={i !== active}
            className="absolute inset-0 overflow-hidden"
            style={i === 0 ? undefined : { clipPath: HIDDEN }}
          >
            <img
              {...imgProps(s, "20vw")}
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        <RefTag image={slides[active] ?? HERO.image} className="left-3 top-3 z-10" />
      </div>
      <div className="relative h-px bg-white/20">
        <span ref={bar} aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-gold" />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/80">
          <span className="text-gold">0{active + 1}</span> / 0{slides.length} ·{" "}
          {slides[active]?.source.split(" · ")[1]}
        </p>
        <div className="flex shrink-0 gap-1.5">
          {[-1, 1].map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => go(step)}
              aria-label={step < 0 ? "Previous image" : "Next image"}
              className="grid size-8 place-items-center border border-white/25 text-white transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-black"
            >
              {step < 0 ? <ArrowLeft className="size-3.5" /> : <ArrowRight className="size-3.5" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomeHero() {
  const img = HERO.image;
  return (
    <section
      data-section="Home"
      className="grain relative isolate overflow-hidden bg-overlay text-white"
    >
      <div data-anim="photo" className="absolute inset-0 -z-10 overflow-hidden">
        <div data-photo-inner className="absolute inset-x-0 -inset-y-[6%]">
          <img
            src={img.src}
            srcSet="/home/hero-1024.jpg 1024w, /home/hero-1920.jpg 1920w"
            sizes="100vw"
            alt={img.alt}
            fetchPriority="high"
            className="h-full w-full object-cover object-[36%_center] lg:object-[20%_center]"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-overlay/65 lg:bg-transparent lg:bg-gradient-to-r lg:from-overlay/90 lg:via-overlay/60 lg:to-overlay/5"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-overlay/70 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-overlay via-overlay/70 to-transparent"
        />
      </div>

      <div className="wrap flex min-h-svh flex-col pt-32 lg:pt-36">
        <div className="grid flex-1 items-center gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
          <div data-hero-copy className="py-6 lg:py-14">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              {HERO.eyebrow}
            </p>

            <HeroTitle lines={HERO.titleLines} max="5.25rem" indent className="mt-7" />

            <p
              data-anim="fade"
              className="mt-8 max-w-[32rem] text-base leading-relaxed text-white/85 sm:text-lg"
            >
              {HERO.body}
            </p>
            <figure data-anim="fade" className="mt-6 max-w-[32rem] border-l-2 border-gold pl-5">
              <blockquote className="font-serif text-xl leading-snug text-white sm:text-2xl">
                &ldquo;{HERO.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                &mdash; {HERO.quote.by}
              </figcaption>
            </figure>

            <div data-anim="fade" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
              <LineLink to={CTA.call.to} dark>
                {CTA.call.label}
              </LineLink>
            </div>
          </div>

          <div className="relative hidden h-[min(64svh,620px)] lg:block">
            <p
              data-anim="fade"
              className="absolute right-0 top-4 flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-white/80"
            >
              <span aria-hidden className="h-px w-8 bg-gold" />
              Vancouver &amp; Vancouver Island
            </p>
          </div>
        </div>

        {/* services rail — Highwater's stats band, carrying real links instead of figures */}
        <nav aria-label="Services" className="relative mt-6">
          {/* square slider: sits directly above rail item 05 (lg) */}
          <div data-anim="fade" className="absolute bottom-full right-0 mb-8 hidden w-1/5 lg:block">
            <HeroSlider />
          </div>
          <span
            data-rule
            aria-hidden
            className="absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 origin-left bg-white/20"
          />
          <ul className="grid grid-cols-2 pt-2 sm:grid-cols-3 lg:grid-cols-5 lg:pt-0">
            {HOME_SERVICES.items.map((s, i) => (
              <li key={s.key} data-anim="stat" className="border-l border-white/15 pl-4 lg:pl-5">
                <Link to={s.to} className="group block py-5 pr-3 lg:py-7">
                  <span className="text-xs font-bold tracking-[0.2em] text-gold">0{i + 1}</span>
                  <span className="mt-2 block font-serif text-lg leading-tight text-white transition-colors duration-300 group-hover:text-gold sm:text-xl">
                    {s.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
