import { acceptedMetadata } from "@/lib/accepted-metadata";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CTA, IMAGES, type RefImage } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { RefTag, imgProps } from "@/components/home/shared";
import {
  HEADING,
  Kicker,
  RelatedLinks,
  ScrollProgress,
  SectionIndicator,
  HeroTitle,
  HeroBackdrop,
} from "@/components/home/kit";
import { PILLAR_IMAGE, PILLAR_MARK, type Pillar } from "@/components/home/HomePillars";

/* Our approach (formerly Our Guarantee) — homepage design language and motion, laid out around
 * this page's own story: building and design in one conversation.
 * Copy is the client-supplied Our approach content (2026-11-04).
 * Order: split hero (building | statement | design) → four pillars as a typographic index →
 * two-step start (estimate, then the call) (dark) → related pages.
 */

const TITLE = "Our Approach | Nordic Green Homes";
const LEAD = "Sustainable luxury starts with the way you want to live";
const BODY =
  "Nordic Green Homes brings building and design perspectives into the same conversation. Lane is the builder. Kylie brings her design perspective through Nordic Green Design. Together, they focus on how a home looks, feels and works for the people living in it.";

// The two perspectives the page is about, one panel each side of the statement.
const SIDES: { label: string; who: string; image: RefImage }[] = [
  { label: "Building", who: "Lane · Builder", image: IMAGES.customHomes },
  { label: "Design", who: "Kylie · Nordic Green Design", image: IMAGES.interior },
];

const PILLARS: Pillar[] = ["Sustainable", "Family", "Luxury", "Faith"];

const STEPS = [
  { label: CTA.estimate.label, to: CTA.estimate.to, hint: "An early planning range" },
  { label: CTA.call.label, to: CTA.call.to, hint: "Your property, priorities and plans" },
] as const;

export const Route = createFileRoute("/about-us/our-approach")({
  head: () => ({
    meta: [
      ...acceptedMetadata("/about-us/our-approach"),
      { property: "og:image", content: IMAGES.customHomes.src },
      { name: "twitter:image", content: IMAGES.customHomes.src },
    ],
  }),
  component: OurApproachPage,
});

function OurApproachPage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />
      <ApproachHero />
      <PillarIndex />
      <Steps />
      <RelatedLinks
        links={[
          { label: "About Nordic Green Homes", to: "/about-us" },
          { label: "Why Choose Us", to: "/about-us/why-choose-us" },
          { label: "Discuss your project", to: "/contact" },
        ]}
      />
    </div>
  );
}

/* ---------- Hero ----------
 * Split in three, like the conversation it describes: a building panel (exterior render) and a
 * design panel (interior) on either side of the statement. On lg the panels run full height;
 * below lg the statement comes first and the two panels sit side by side under it.
 * Panels settle out of a blur and parallax (data-anim="photo" / data-photo-inner).
 */
function ApproachHero() {
  const panel = (side: (typeof SIDES)[number], align: "left" | "right") => (
    <div
      data-anim="photo"
      className="relative aspect-[3/4] overflow-hidden lg:aspect-auto lg:min-h-svh"
    >
      <div data-photo-inner className="absolute inset-x-0 -inset-y-[6%]">
        <img
          {...imgProps(side.image, "(min-width: 1024px) 30vw, 50vw")}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-overlay via-overlay/30 to-overlay/40"
      />
      <RefTag
        image={side.image}
        className={`top-4 lg:top-32 ${align === "left" ? "left-4" : "right-4"}`}
      />
      <div
        className={`absolute inset-x-5 bottom-6 lg:bottom-10 ${align === "right" ? "text-right" : ""}`}
      >
        <p className="font-serif text-[clamp(2rem,3vw+0.5rem,3.5rem)] leading-none">{side.label}</p>
        <p className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold">
          {side.who}
        </p>
      </div>
    </div>
  );
  const [building, design] = SIDES as [(typeof SIDES)[number], (typeof SIDES)[number]];

  return (
    <section
      data-section="Our approach"
      className="grain relative isolate overflow-hidden bg-overlay text-white"
    >
      <HeroBackdrop image={IMAGES.hausPatio} />
      <div className="grid lg:min-h-svh lg:grid-cols-[1fr_minmax(0,1.35fr)_1fr]">
        <div className="hidden lg:block">{panel(building, "left")}</div>

        <div
          data-hero-copy
          className="flex flex-col items-center justify-center px-6 pb-14 pt-36 text-center sm:px-10 lg:py-36"
        >
          <p
            data-anim="fade"
            className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
          >
            <span aria-hidden className="h-px w-8 bg-gold" />
            Our approach
            <span aria-hidden className="h-px w-8 bg-gold" />
          </p>
          <HeroTitle
            lines={["Our approach", "to your home."]}
            max="5rem"
            center
            className="mt-7 w-full"
          />
          <span data-rule aria-hidden className="mt-8 block h-px w-24 origin-center bg-gold" />
          <p
            data-anim="fade"
            className="mt-8 max-w-xl font-serif text-[clamp(1.375rem,1vw+1rem,2rem)] leading-snug"
          >
            {LEAD}
          </p>
          <p data-anim="fade" className="mt-6 max-w-xl text-base leading-relaxed text-white/80">
            {BODY}
          </p>
          {/* the meeting point: builder + designer */}
          <p
            data-anim="fade"
            className="mt-10 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.22em] text-white/70"
          >
            Lane{" "}
            <span className="font-serif text-xl normal-case tracking-normal text-gold">&amp;</span>{" "}
            Kylie
          </p>
        </div>

        <div className="hidden lg:block">{panel(design, "right")}</div>

        {/* below lg: both perspectives side by side under the statement */}
        <div className="grid grid-cols-2 gap-px bg-white/10 lg:hidden">
          {panel(building, "left")}
          {panel(design, "right")}
        </div>
      </div>
    </section>
  );
}

/* ---------- Four pillars ----------
 * Typographic index rather than tiles: the intro sits sticky on the left; the four pillar names
 * run large down the right. Hover (fine pointer): the word steps in and turns gold, its icon
 * fills, and the pillar's photo wipes open beside it (CSS clip-path). Touch: icons only.
 */
function PillarIndex() {
  return (
    <section id="pillars" data-section="Four pillars" className="bg-secondary py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Kicker>What guides the work</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              Four pillars behind our approach
            </h2>
            <p
              data-reveal
              className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              Our four pillars are Sustainable, Family, Luxury and Faith.
            </p>
            <p
              data-reveal="left"
              className="mt-6 max-w-md border-l-2 border-gold pl-5 font-serif text-2xl leading-snug"
            >
              Care, honesty and respect guide how we work and how we treat people.
            </p>
          </div>
        </div>
        <ol className="border-t border-slate/20 lg:col-span-7">
          {PILLARS.map((title, i) => {
            const Mark = PILLAR_MARK[title];
            const img = PILLAR_IMAGE[title];
            return (
              <li
                key={title}
                data-reveal
                className="group relative flex items-center gap-6 overflow-hidden border-b border-slate/20 py-8 sm:py-10"
              >
                <span className="text-xs font-bold tracking-[0.2em] text-gold">0{i + 1}</span>
                <span className="flex-1 font-serif text-[clamp(3rem,6vw+0.5rem,6.5rem)] leading-[0.9] tracking-[-0.03em] transition-[translate,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 group-hover:text-gold">
                  {title}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-y-4 right-20 hidden aspect-[4/3] overflow-hidden [clip-path:inset(0_0_0_100%)] transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[clip-path:inset(0_0_0_0)] pointer-fine:sm:block"
                >
                  <img
                    {...imgProps(img, "16rem")}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="grid size-12 shrink-0 place-items-center border border-slate/25 text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                  <Mark aria-hidden className="size-5" strokeWidth={1.4} />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Start with your property and priorities ----------
 * Two numbered steps in the order the copy gives them: the estimate, then the call with Lane.
 * The project-scope line closes the section as a gold-rule note.
 */
function Steps() {
  return (
    <section
      data-section="Start here"
      className="grain relative bg-brand-dark py-24 text-white sm:py-32"
    >
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker dark>Start here</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              Start with your property and priorities
            </h2>
          </div>
          <p data-reveal className="text-base leading-relaxed text-white/80 lg:col-span-5">
            Start with a ballpark estimate, then talk with Lane about your property, priorities and
            any plans you already have. We work alongside your architect or designer. Bring your
            plans to the call.
          </p>
        </div>

        <ol className="mt-14 grid gap-px bg-white/10 md:grid-cols-2">
          {STEPS.map((step, i) => (
            <li key={step.to} data-reveal>
              <Link
                to={step.to}
                className={`group relative flex min-h-[16rem] flex-col justify-between overflow-hidden p-8 lg:min-h-[20rem] lg:p-12 ${
                  i === 0 ? "bg-gold text-black" : "bg-overlay text-white"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 -translate-x-[101%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 ${
                    i === 0 ? "bg-white" : "bg-gold"
                  }`}
                />
                <span className="relative flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.22em]">
                    Step 0{i + 1}
                  </span>
                  <ArrowUpRight className="size-6 transition-transform duration-500 group-hover:rotate-45" />
                </span>
                <span className="relative">
                  <span className="block font-serif text-[clamp(1.75rem,1.6vw+1rem,2.75rem)] leading-tight transition-colors duration-500 group-hover:text-black">
                    {step.label}
                  </span>
                  <span
                    className={`mt-3 block text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-black/70 ${
                      i === 0 ? "text-black/70" : "text-white/60"
                    }`}
                  >
                    {step.hint}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <p
          data-reveal="left"
          className="mt-12 max-w-2xl border-l-2 border-gold pl-5 font-serif text-xl leading-snug"
        >
          Your project scope will confirm design, coordination and approval responsibilities.
        </p>
      </div>
    </section>
  );
}
