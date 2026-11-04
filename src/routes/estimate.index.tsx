import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Home, Trees } from "lucide-react";
import { IMAGES } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { imgProps } from "@/components/home/shared";
import {
  HEADING,
  HeroBackdrop,
  HeroTitle,
  Kicker,
  ScrollProgress,
  SectionIndicator,
} from "@/components/home/kit";
import { HomeFaqs } from "@/components/home/HomeSections";
import { EstimateSidebar } from "@/components/estimate/estimate-sidebar";
import { typeToPath } from "@/lib/estimate/surveys";

/* Instant Estimate (step 1 of the estimate funnel) — homepage design language and motion.
 * Copy is the existing estimate copy. Order: hero with the three steps as its rail (dark) →
 * choose a project (two photo panels + the shared sidebar) → FAQs.
 * Survey routes (typeToPath) and EstimateSidebar behaviour are unchanged.
 */

const TITLE = "Instant Estimate | Nordic Green Homes";
const DESCRIPTION =
  "Answer a few questions about your custom home or garden suite and see an indicative price range on the spot. No obligation, no waiting on a callback.";

const PROJECTS = [
  {
    to: typeToPath.customHome,
    label: "Luxury Custom Home",
    blurb: "A new home, designed around your site",
    image: IMAGES.customHomes,
    icon: Home,
  },
  {
    to: typeToPath.gardenSuite,
    label: "Garden Suite",
    blurb: "Garden suite, coach house or laneway home",
    image: IMAGES.hausGarden,
    icon: Trees,
  },
] as const;

const STEPS = [
  {
    title: "Answer a few questions",
    body: "Size, finish level, performance goal and timeline. It takes a few minutes.",
  },
  {
    title: "See an indicative range",
    body: "The range is calculated on the spot from the size and finish you choose.",
  },
  {
    title: "Talk it through with Lane",
    body: "Book a complimentary 15-minute call to test the range against your property and brief.",
  },
];

const FAQS = [
  {
    q: "Is this a quote?",
    a: "No. It is an indicative range based on the size and finish you choose. It is not a quote, approval, contract or promise of final cost.",
  },
  {
    q: "What can change the number?",
    a: "Site conditions, access, servicing, structure, design complexity, materials, approvals and performance targets can all change the cost of a project.",
  },
  {
    q: "Will someone contact me?",
    a: "Only to follow up on your estimate, and you can say no at any time. Booking the 15-minute call is your choice.",
  },
  {
    q: "What happens after the call?",
    a: "If the project looks like a fit, the next step is a preliminary feasibility review. What it covers is explained on the call, before you commit to anything.",
  },
];

export const Route = createFileRoute("/estimate/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: IMAGES.hero.src },
      { name: "twitter:image", content: IMAGES.hero.src },
    ],
  }),
  component: EstimatePage,
});

function EstimatePage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />

      {/* ---------- Hero: heading + the three steps as its rail ---------- */}
      <section
        data-section="Instant estimate"
        className="grain relative isolate overflow-hidden bg-overlay text-white"
      >
        <HeroBackdrop image={IMAGES.hero} />
        <div className="wrap pt-36 lg:pt-44">
          <div data-hero-copy className="grid gap-10 pb-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p
                data-anim="fade"
                className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
              >
                <span aria-hidden className="h-px w-10 bg-gold" />
                Instant estimate
              </p>
              <HeroTitle
                lines={["See an indicative", "range in minutes."]}
                max="5.25rem"
                className="mt-7"
              />
            </div>
            <p
              data-anim="fade"
              className="text-base leading-relaxed text-white/85 sm:text-lg lg:col-span-5"
            >
              {DESCRIPTION}
            </p>
          </div>
          <div className="relative">
            <span
              data-rule
              aria-hidden
              className="absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 origin-left bg-white/20"
            />
            <ol className="grid md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  data-anim="stat"
                  className="border-l border-white/15 py-6 pl-5 pr-4 lg:py-8"
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-gold">
                    Step 0{i + 1}
                  </span>
                  <span className="mt-2 block font-serif text-xl leading-tight sm:text-2xl">
                    {s.title}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-white/70">{s.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- Step 1: choose a project ---------- */}
      <section data-section="Choose a project" className="bg-secondary py-20 sm:py-24">
        <div className="wrap flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <Kicker>Step 1 of 3</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              What are you planning to build?
            </h2>
            <p data-reveal className="mt-4 text-base text-muted-foreground sm:text-lg">
              Choose a project to get started.
            </p>

            <div className="mt-10 grid gap-px bg-slate/15 sm:grid-cols-2">
              {PROJECTS.map(({ to, label, blurb, image, icon: Icon }, i) => (
                <Link
                  key={to}
                  to={to}
                  data-door={i === 0 ? "left" : "right"}
                  className="group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden p-6 text-white sm:min-h-[28rem] sm:p-8"
                >
                  <img
                    data-door-img
                    {...imgProps(image, "(min-width: 640px) 35vw, 100vw")}
                    alt={label}
                    className="absolute inset-0 -z-20 h-full w-full object-cover brightness-[0.8] transition-[filter,scale] duration-700 group-hover:scale-[1.04] group-hover:brightness-100"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-overlay via-overlay/40 to-transparent"
                  />
                  <span className="absolute right-5 top-5 grid size-11 place-items-center border border-white/30 text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-xs font-bold tracking-[0.2em] text-gold">0{i + 1}</span>
                  <span className="mt-2 font-serif text-[clamp(1.75rem,1.4vw+1rem,2.5rem)] leading-tight">
                    {label}
                  </span>
                  <span className="mt-2 text-sm text-white/80">{blurb}</span>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                    <span className="relative">
                      Start estimate
                      <span
                        aria-hidden
                        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
                      />
                    </span>
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <EstimateSidebar />
        </div>
      </section>

      <HomeFaqs items={FAQS} />
    </div>
  );
}
