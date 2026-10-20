import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Placeholder, RefTag, imgProps } from "@/components/home/shared";
import {
  ASSURANCE,
  CONSULTATION,
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
import { useStoryMotion } from "./use-story-motion";

/* /home-2 — "A home in five chapters".
 * A scroll-told story: photo-led hero → manifesto → five pinned chapters →
 * values → what we build → assurance → glimpses → your chapter. Copy is the approved home copy
 * re-sequenced; nothing new is claimed. All motion lives in use-story-motion.ts (GSAP);
 * desktop-only pins fall back to plain stacked layouts on mobile and reduced motion.
 */

const CHAPTER_IMAGES: RefImage[] = [
  IMAGES.interior,
  IMAGES.customHomes,
  IMAGES.hausSide,
  IMAGES.newBuilds,
  IMAGES.hero,
];
const CHAPTER_NAMES = ["The conversation", "The design", "The materials", "The build", "The home"];

const VALUE_IMAGES: RefImage[] = [
  IMAGES.hausGarden,
  IMAGES.hausPatio,
  IMAGES.poolRender,
  IMAGES.farmhouseRear,
];

const SERVICE_LINKS = [
  "/services/new-builds",
  "/services/new-builds",
  "/services/home-renovations",
];

const GLIMPSE_A: RefImage[] = [
  IMAGES.nordicHaus,
  IMAGES.poolRender,
  IMAGES.hausRear,
  IMAGES.farmhouseRear,
  IMAGES.hausGarden,
];
const GLIMPSE_B: RefImage[] = [
  IMAGES.entry,
  IMAGES.interior,
  IMAGES.intro,
  IMAGES.renovations,
  IMAGES.office,
];

// Rendered word-by-word so GSAP can light each one up without touching React-owned text.
const MANIFESTO = `${INTRO.body[0]} ${INTRO.body[1]}`.split(" ");

const DISPLAY = "font-serif leading-[1.08] tracking-[-0.02em]";

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] ${
        dark ? "text-white/85" : "text-primary"
      }`}
    >
      <span className="h-px w-8 bg-gold" aria-hidden />
      {children}
    </p>
  );
}

export function StoryHome() {
  const root = useStoryMotion<HTMLDivElement>();

  return (
    <div ref={root} className="overflow-x-clip bg-background">
      {/* ============ 0 · Prologue (hero): copy left, their homes right ============ */}
      <section
        data-story-hero
        className="relative isolate overflow-hidden bg-brand-dark text-white"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_80%_40%,rgb(18_85_69/0.9),transparent_70%),radial-gradient(ellipse_40%_40%_at_10%_90%,rgb(187_137_92/0.16),transparent_70%)]"
        />
        <div className="wrap grid items-center gap-12 pb-20 pt-32 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-10 lg:pb-16 lg:pt-28">
          <div data-hero-copy className="lg:col-span-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-gold" />A home in five chapters
            </p>
            <h1 className={`${DISPLAY} mt-6 text-[clamp(2.25rem,2.4vw+1.25rem,3.75rem)]`}>
              <span data-split className="block">
                Every forever home
              </span>
              <span data-split className="block">
                begins with a <span className="text-gold">conversation.</span>
              </span>
            </h1>
            <p data-fade className="mt-6 max-w-md text-[15px] leading-relaxed text-white/80">
              {HERO.body}
            </p>
            <div data-fade className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#story"
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-gold py-1 pl-6 pr-1 text-sm font-bold text-black transition-transform duration-300 hover:scale-[1.04]"
              >
                Begin the story
                <span className="grid size-10 place-items-center rounded-full bg-brand-dark text-white transition-transform duration-500 group-hover:translate-y-0.5">
                  <ArrowDown className="size-4" />
                </span>
              </a>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4 hover:text-gold"
              >
                {CONSULTATION.cta}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </div>
            <p data-fade className="mt-10 flex items-center gap-3 text-sm text-white/70">
              <span className="h-px w-8 bg-gold" aria-hidden />
              {INTRO.people}
            </p>
          </div>

          {/* photo collage: one tall hero shot, two details overlapping its edge */}
          <div data-fade className="relative lg:col-span-7 lg:col-start-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl shadow-black/40 lg:aspect-[5/4]">
              <img
                data-hero-img
                {...imgProps(IMAGES.hero, "(min-width: 1024px) 55vw, 100vw")}
                fetchPriority="high"
                className="h-full w-full scale-105 object-cover"
              />
              <RefTag image={IMAGES.hero} className="bottom-4 right-4" />
            </div>
            <div className="absolute -bottom-8 -left-6 hidden w-[38%] overflow-hidden rounded-lg border-4 border-brand-dark shadow-xl shadow-black/40 sm:block lg:-left-10">
              <div className="aspect-[4/5]">
                <img {...imgProps(IMAGES.entry, "20vw")} className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="absolute -right-4 -top-6 hidden w-[28%] overflow-hidden rounded-lg border-4 border-brand-dark shadow-xl shadow-black/40 md:block lg:-right-6">
              <div className="aspect-square">
                <img
                  {...imgProps(IMAGES.interior, "16vw")}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 1 · Manifesto ============ */}
      <section id="story" className="relative py-28 sm:py-36">
        <div className="wrap max-w-5xl text-center">
          <Kicker>
            <span className="mx-auto">Our story</span>
          </Kicker>
          <p
            data-words
            className="mt-8 font-serif text-[clamp(1.5rem,1.6vw+1rem,2.5rem)] leading-[1.3] text-foreground"
          >
            {MANIFESTO.map((w, i) => (
              <span key={i} data-word className="inline-block">
                {w}&nbsp;
              </span>
            ))}
          </p>
          <p className="mt-10 inline-flex items-center gap-3 text-base font-bold text-primary">
            <span className="h-px w-10 bg-gold" aria-hidden />
            {INTRO.people}
            <span className="h-px w-10 bg-gold" aria-hidden />
          </p>
        </div>
      </section>

      {/* ============ 2 · Five chapters (pinned on desktop) ============ */}
      <section className="relative bg-primary text-white">
        {/* pinned desktop version */}
        <div
          data-ch-pin
          className="relative hidden h-[100svh] overflow-hidden motion-safe:lg:block"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_40%,rgb(13_61_50/0.9),transparent_70%)]"
          />
          <div className="wrap relative grid h-full grid-cols-12 items-center gap-12 pt-20">
            <div className="col-span-5">
              <div className="flex gap-2">
                {PROCESS.map((p, i) => (
                  <span
                    key={p.title}
                    className="h-1 flex-1 overflow-hidden rounded-full bg-white/15"
                  >
                    <span
                      data-ch-seg
                      className="block h-full origin-left bg-gold"
                      style={{ transform: `scaleX(${i === 0 ? 1 : 0})` }}
                    />
                  </span>
                ))}
              </div>
              <div className="relative mt-10 min-h-[25rem]">
                {PROCESS.map((p, i) => (
                  <div
                    key={p.title}
                    data-ch-text
                    className="absolute inset-0"
                    style={i ? { opacity: 0, visibility: "hidden" } : undefined}
                  >
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
                      Chapter 0{i + 1} · {CHAPTER_NAMES[i]}
                    </p>
                    <h2 className={`${DISPLAY} mt-5 text-[clamp(2rem,2vw+1rem,3rem)]`}>
                      {p.title}
                    </h2>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-white/85">
                      {p.body}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.includes.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-bold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative col-span-7 col-start-6">
              <span
                data-ch-num
                aria-hidden
                className="absolute -left-10 -top-24 z-10 font-serif text-[8rem] leading-none text-transparent [-webkit-text-stroke:1px_rgb(187_137_92/0.7)]"
              >
                01
              </span>
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg shadow-2xl shadow-black/40">
                {CHAPTER_IMAGES.map((img, i) => (
                  <div
                    key={img.src}
                    data-ch-img
                    className="absolute inset-0"
                    style={i ? { clipPath: "inset(100% 0% 0% 0%)" } : undefined}
                  >
                    <img
                      {...imgProps(img, "55vw")}
                      loading={i ? "lazy" : "eager"}
                      className="h-full w-full object-cover"
                    />
                    <RefTag image={img} className="bottom-4 left-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* stacked version: mobile, tablet and reduced motion */}
        <div className="wrap py-24 motion-safe:lg:hidden">
          <Kicker dark>Five chapters</Kicker>
          <h2 className={`${DISPLAY} mt-4 text-[clamp(1.75rem,1.5vw+1rem,2.5rem)]`}>
            From first conversation to handover
          </h2>
          <ol className="mt-10 space-y-12">
            {PROCESS.map((p, i) => {
              const img = CHAPTER_IMAGES[i] ?? IMAGES.hero;
              return (
                <li key={p.title} data-rise className="grid gap-6 md:grid-cols-2 md:items-center">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                    <img
                      {...imgProps(img, "(min-width: 768px) 45vw, 100vw")}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <RefTag image={img} className="bottom-3 left-3" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
                      Chapter 0{i + 1} · {CHAPTER_NAMES[i]}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl">{p.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-white/85">{p.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ============ 3 · Values — typographic list with cursor-follow image ============ */}
      <section data-values className="relative py-24 sm:py-32">
        <div
          data-value-follow
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[4/3] w-[22rem] -translate-x-1/2 -translate-y-1/2 scale-0 overflow-hidden rounded-lg shadow-2xl shadow-black/30 [@media(hover:hover)]:lg:block"
        >
          {VALUE_IMAGES.map((img, i) => (
            <img
              key={img.src}
              data-value-img
              {...imgProps(img, "22rem")}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0"
              style={i === 0 ? { opacity: 1 } : undefined}
            />
          ))}
        </div>

        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Kicker>What guides us</Kicker>
              <h2 data-rise className={`${DISPLAY} mt-4 text-[clamp(1.75rem,1.5vw+1rem,2.5rem)]`}>
                Four principles behind every home
              </h2>
            </div>
            <p data-rise className="text-base leading-relaxed text-muted-foreground lg:col-span-5">
              The values that shape every decision, from the first sketch to the day you move in.
            </p>
          </div>

          <ul className="mt-14 border-t border-border">
            {PILLARS.map((p, i) => (
              <li
                key={p.title}
                data-value-row={i}
                data-rise
                className="group relative grid cursor-default gap-3 border-b border-border py-7 md:grid-cols-12 md:items-center"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100"
                />
                <span className="font-serif text-xl text-gold md:col-span-1">0{i + 1}</span>
                <h3
                  className={`${DISPLAY} text-[clamp(1.75rem,2vw+0.75rem,3rem)] text-foreground transition-all duration-500 group-hover:translate-x-3 group-hover:text-primary md:col-span-6`}
                >
                  {p.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground md:col-span-4 md:col-start-9">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 4 · What we build ============ */}
      <section className="relative bg-secondary/60 pb-24 sm:pb-32">
        {/* velocity marquee band */}
        <div className="overflow-hidden border-y border-primary/10 bg-primary py-5 text-white">
          <div data-velo className="flex w-max whitespace-nowrap">
            {[0, 1].map((k) => (
              <span
                key={k}
                className="flex shrink-0 items-center gap-8 pr-8 font-serif text-3xl sm:text-4xl"
              >
                {[...SERVICES.map((s) => s.title), "Where sustainability meets style"].map((t) => (
                  <span key={t} className="flex items-center gap-8">
                    {t}
                    <span className="text-2xl text-gold">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="wrap pt-24 sm:pt-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <Kicker>What we build</Kicker>
              <h2 data-rise className={`${DISPLAY} mt-4 text-[clamp(1.75rem,1.5vw+1rem,2.5rem)]`}>
                New builds, custom homes and renovations
              </h2>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-base font-bold text-primary underline underline-offset-4 hover:text-gold"
            >
              All services
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3" style={{ perspective: "1200px" }}>
            {SERVICES.map((s, i) => (
              <Link
                key={s.key}
                to={SERVICE_LINKS[i] ?? "/services"}
                data-tilt
                data-rise
                className="group relative block overflow-hidden rounded-lg bg-brand-dark text-white shadow-xl shadow-primary/10 [transform-style:preserve-3d]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    {...imgProps(s.image, "(min-width: 768px) 30vw, 100vw")}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
                  {/* glare that follows the pointer (CSS vars set by GSAP) */}
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at var(--gx,50%) var(--gy,30%), rgb(255 255 255 / 0.22), transparent 45%)",
                    }}
                  />
                  <RefTag image={s.image} className="left-4 top-4" />
                </div>
                <div className="absolute inset-x-6 bottom-6 [transform:translateZ(40px)]">
                  <span className="font-serif text-lg text-gold">0{i + 1}</span>
                  <h3 className="mt-1 font-serif text-2xl">{s.title}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-base leading-relaxed text-white/85 opacity-0 transition-all duration-700 group-hover:max-h-40 group-hover:opacity-100 max-md:max-h-40 max-md:opacity-100">
                    {s.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                    Explore
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Placeholder>{PLACEHOLDER.services}</Placeholder>
          </div>
        </div>
      </section>

      {/* ============ 5 · Assurance — image opens to full bleed ============ */}
      <section data-assure className="relative h-[100svh] overflow-hidden bg-background">
        <div data-assure-frame className="absolute inset-0">
          <img
            {...imgProps(IMAGES.poolRender, "100vw")}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(13_61_50/0.92)_0%,rgb(18_85_69/0.75)_45%,rgb(18_85_69/0.2)_100%)]" />
          <RefTag image={IMAGES.poolRender} className="bottom-6 right-6" />
        </div>
        <div className="wrap relative flex h-full items-center">
          <div data-assure-copy className="max-w-xl text-white">
            <Kicker dark>{ASSURANCE.eyebrow}</Kicker>
            <h2 className={`${DISPLAY} mt-4 text-[clamp(2rem,2vw+1rem,3rem)]`}>
              {ASSURANCE.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/90">{ASSURANCE.body}</p>
            <div className="mt-6">
              <Placeholder dark>{PLACEHOLDER.assurance}</Placeholder>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6 · Glimpses — two drifting rows ============ */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-28">
        <div className="wrap mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Kicker>Glimpses</Kicker>
            <h2 data-rise className={`${DISPLAY} mt-4 text-[clamp(1.75rem,1.5vw+1rem,2.5rem)]`}>
              Design and build, in detail
            </h2>
          </div>
          <Placeholder>{PLACEHOLDER.projects}</Placeholder>
        </div>
        {[GLIMPSE_A, GLIMPSE_B].map((row, r) => (
          <div key={r} className="group/row mt-5 flex overflow-hidden">
            <div
              className="marquee-track flex w-max gap-5 pr-5 group-hover/row:[animation-play-state:paused]"
              style={{ animationDuration: "70s", animationDirection: r ? "reverse" : "normal" }}
            >
              {[...row, ...row].map((img, i) => (
                <figure
                  key={`${img.src}-${i}`}
                  className={`group relative shrink-0 overflow-hidden rounded-lg ${
                    img.w >= 1900
                      ? "h-64 w-[26rem] sm:h-72 sm:w-[28rem]"
                      : "h-56 w-80 sm:h-64 sm:w-96"
                  }`}
                >
                  <img
                    {...imgProps(img, img.w >= 1900 ? "28rem" : "24rem")}
                    alt={i < row.length ? img.alt : ""}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale-[35%] transition-all duration-700 group-hover:grayscale-0"
                  />
                  <RefTag image={img} className="bottom-3 left-3" />
                </figure>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ============ 7 · Your chapter ============ */}
      <section className="relative isolate overflow-hidden bg-brand-dark py-28 text-white sm:py-36">
        <div aria-hidden className="absolute inset-0 -z-10">
          <img
            {...imgProps(IMAGES.hausRear, "100vw")}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/80 to-brand-dark" />
        </div>
        <div className="wrap text-center">
          <Kicker dark>
            <span className="mx-auto">{CONSULTATION.eyebrow}</span>
          </Kicker>
          <h2 className={`${DISPLAY} mx-auto mt-6 max-w-4xl text-[clamp(2.25rem,3vw+1rem,4rem)]`}>
            Your chapter <span className="text-gold">starts here.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85">
            {CONSULTATION.body}
          </p>
          <div data-magnet className="mt-10 inline-block p-6">
            <Link
              to="/contact"
              data-magnet-btn
              className="inline-flex h-16 items-center gap-4 rounded-full bg-gold py-2 pl-8 pr-2 text-lg font-bold text-black shadow-2xl shadow-gold/20"
            >
              {CONSULTATION.cta}
              <span className="grid size-12 place-items-center rounded-full bg-brand-dark text-white">
                <ArrowUpRight className="size-5" />
              </span>
            </Link>
          </div>
          <p className="text-xs text-white/60">
            Internal pilot: enquiry forms and CRM submission are switched off.
          </p>
          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3 border-t border-white/15 pt-8 text-sm">
            <span className="text-white/75">
              {REFERENCE_BASE} · {REFERENCE_SERVICE_AREA}{" "}
              <span className="text-white/50">(reference)</span>
            </span>
            <Placeholder dark>{PLACEHOLDER.phone}</Placeholder>
            <Placeholder dark>{PLACEHOLDER.email}</Placeholder>
          </div>
        </div>
      </section>
    </div>
  );
}
