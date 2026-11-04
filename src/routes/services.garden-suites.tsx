import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BedDouble, Briefcase, Check, House, Users } from "lucide-react";
import { CTA, IMAGES } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { RefTag, imgProps } from "@/components/home/shared";
import {
  HEADING,
  Kicker,
  LineLink,
  RelatedLinks,
  ScrollProgress,
  SectionIndicator,
  SweepLink,
  HeroTitle,
  HeroBackdrop,
} from "@/components/home/kit";
import { HomeFaqs } from "@/components/home/HomeSections";

/* Garden Suites — homepage design language and motion, laid out as a property-first planning
 * guide. Copy is the client-supplied Garden Suites content (2026-11-04); SEO from the
 * 4 November manifest append.
 * Order: hero (dark, render framed) → different names, different rules → intended use →
 * two checklists (gather early / what changes scope and cost) → start with the property
 * (4 steps, dark) → FAQs → related.
 */

const TITLE = "Garden Suites, Coach Houses and Laneway Homes | Nordic Green Homes";
const DESCRIPTION =
  "Explore the site, design and planning questions behind a garden suite, coach house or laneway home in BC.";
const HERO_IMAGE = IMAGES.hausGarden;

const NAMES = ["Garden suite", "Coach house", "Laneway home", "Accessory dwelling unit"];

const USES = [
  { icon: Users, label: "Housing for family" },
  { icon: BedDouble, label: "A flexible guest space" },
  { icon: Briefcase, label: "A dedicated work area" },
  { icon: House, label: "Another use allowed by the local authority" },
];

const CHECKLISTS = [
  {
    title: "Information worth gathering early",
    items: [
      "property address and municipality;",
      "lot dimensions, survey or site plan, if available;",
      "existing buildings and known easements or constraints;",
      "access for construction and emergency requirements;",
      "known water, sewer, electrical and other service information;",
      "intended use and approximate spatial needs;",
      "existing concepts, drawings or inspiration; and",
      "budget context and timing.",
    ],
    outro:
      "This information helps identify what needs professional, municipal or site-specific review.",
  },
  {
    title: "What can change the scope and cost",
    items: [
      "size, configuration and design complexity;",
      "demolition or work to an existing structure;",
      "site access and staging;",
      "ground conditions and foundations;",
      "utility connections and upgrades;",
      "parking, access or landscape requirements;",
      "materials, fixtures and performance goals; and",
      "permits, consultant input and documentation.",
    ],
    outro:
      "A website estimate may organize some of these variables once its assumptions have been reviewed with you. It cannot confirm feasibility or final cost.",
  },
];

const STEPS = [
  "Share the property and intended use.",
  "Identify the local rules that need checking.",
  "Review site, access and service constraints.",
  "Discuss open questions through the project consultation.",
];

const FAQS = [
  {
    q: "What is the difference between a garden suite and a laneway home?",
    a: "The terms can overlap in everyday use, but the applicable definition comes from the local authority and project context. Use only current sources for the relevant jurisdiction and service area discussed for your project.",
  },
  {
    q: "Can every property support a secondary dwelling?",
    a: "No general website answer can confirm that. Zoning, lot conditions, access, servicing, existing buildings and other requirements may all matter.",
  },
  {
    q: "What affects the cost?",
    a: "Size, structure, site access, services, design, materials, approvals and performance goals can affect the project. Any published range needs current assumptions and clear exclusions.",
  },
  {
    q: "Can the suite be used as a rental?",
    a: "That depends on the current rules, approvals and owner circumstances. Check the local requirements and obtain written confirmation before relying on rental use or income.",
  },
  {
    q: "When should I speak with a builder or designer?",
    a: "Once you can share the property, intended use and any existing information. The first useful outcome is a list of what needs confirmation: not a promise of approval.",
  },
];

export const Route = createFileRoute("/services/garden-suites")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: HERO_IMAGE.src },
      { name: "twitter:image", content: HERO_IMAGE.src },
    ],
  }),
  component: GardenSuitesPage,
});

const pad = (n: number) => String(n).padStart(2, "0");

function GardenSuitesPage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />

      {/* ---------- Hero ---------- */}
      <section
        data-section="Garden Suites"
        className="grain relative isolate overflow-hidden bg-overlay text-white"
      >
        <HeroBackdrop image={IMAGES.hausPatio} />
        <div className="wrap grid min-h-svh items-center gap-12 pb-20 pt-36 lg:grid-cols-12 lg:pt-40">
          <div data-hero-copy className="lg:col-span-7">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              Garden Suites
            </p>
            <HeroTitle
              lines={["A secondary home", "starts with", "the property."]}
              max="5rem"
              indent
              className="mt-7"
            />
            <div className="mt-8 max-w-[36rem] space-y-4 text-base leading-relaxed text-white/85">
              <p data-anim="fade" className="text-lg">
                A garden suite, coach house or laneway home can add flexible space, but the label
                alone does not tell you whether a project is allowed, practical or within budget.
                The property, municipality, access, existing services and intended use all shape the
                next step.
              </p>
              <p data-anim="fade">
                If you are comparing a laneway house builder in Vancouver, start with the address
                and intended use rather than a standard plan. The laneway house cost in Vancouver
                can vary with the site, servicing, access, approvals, size and construction scope.
              </p>
            </div>
            <p
              data-anim="fade"
              className="mt-6 max-w-[36rem] border-l-2 border-gold pl-5 text-sm leading-relaxed text-white/70"
            >
              Eligibility, delivery model and coverage depend on the property and written project
              scope. This page does not promise approval, rental use, income, cost, timing or
              service availability.
            </p>
            <div data-anim="fade" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
              <LineLink to={CTA.call.to} dark>
                {CTA.call.label}
              </LineLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div
              data-anim="photo"
              className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden border border-white/15 shadow-2xl shadow-black/40"
            >
              <div data-photo-inner className="absolute inset-x-0 -inset-y-[6%]">
                <img
                  {...imgProps(HERO_IMAGE, "(min-width: 1024px) 30vw, 100vw")}
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                />
              </div>
              <RefTag image={HERO_IMAGE} className="bottom-4 left-4" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Different names, different rules ---------- */}
      <section data-section="Names and rules" className="bg-background py-24 sm:py-28">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Kicker>Terminology</Kicker>
              <h2 data-split className={`${HEADING} mt-6`}>
                Different names can point to different rules
              </h2>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground lg:col-span-5 lg:col-start-8">
              <p data-reveal>
                People often use &ldquo;garden suite,&rdquo; &ldquo;coach house,&rdquo;
                &ldquo;laneway home&rdquo; and &ldquo;accessory dwelling unit&rdquo; as if they mean
                the same thing. Local governments may define and regulate them differently.
              </p>
            </div>
          </div>
          <ul className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {NAMES.map((n, i) => (
              <li
                key={n}
                data-reveal
                className="group flex min-h-[12rem] flex-col justify-between bg-background p-6 transition-colors duration-500 hover:bg-secondary/60 lg:p-8"
              >
                <span className="text-xs font-bold tracking-[0.2em] text-gold">{pad(i + 1)}</span>
                <span className="font-serif text-[clamp(1.75rem,1.4vw+1rem,2.5rem)] leading-tight">
                  &ldquo;{n}&rdquo;
                </span>
              </li>
            ))}
          </ul>
          <p
            data-reveal="left"
            className="mt-10 max-w-3xl border-l-2 border-gold pl-6 font-serif text-xl leading-snug"
          >
            Use the language your local authority uses, then check the property-specific rules for
            the relevant jurisdiction. One municipality&rsquo;s terminology must not be copied to
            another.
          </p>
        </div>
      </section>

      {/* ---------- Start with the intended use ---------- */}
      <section data-section="Intended use" className="bg-secondary py-24 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker>The brief</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              Start with the intended use
            </h2>
            <p
              data-reveal
              className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              A useful brief explains what the space needs to do. Examples may include:
            </p>
            <p data-reveal className="mt-8 text-sm leading-relaxed text-muted-foreground">
              The intended use is a planning input, not proof that the use is permitted, financially
              suitable or deliverable on the property.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {USES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                data-reveal
                className="group flex min-h-[11rem] flex-col justify-between bg-background p-6 lg:p-8"
              >
                <span className="grid size-12 place-items-center border border-gold/60 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-black">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="mt-8 font-serif text-2xl leading-tight">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Two checklists ---------- */}
      <section data-section="Checklists" className="bg-background py-24 sm:py-28">
        <div className="wrap">
          <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
            {CHECKLISTS.map((list, i) => (
              <article key={list.title} data-reveal className="bg-background p-8 sm:p-10 lg:p-14">
                <span className="text-xs font-bold tracking-[0.2em] text-gold">{pad(i + 1)}</span>
                <h2
                  data-split
                  className="mt-4 font-serif text-[clamp(2rem,2vw+1rem,3rem)] leading-[1.05] tracking-[-0.02em]"
                >
                  {list.title}
                </h2>
                <ul className="mt-8 divide-y divide-border border-y border-border">
                  {list.items.map((item) => (
                    <li key={item} className="flex items-start gap-4 py-3 text-base">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center border border-gold text-gold">
                        <Check className="size-3" aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-l-2 border-gold pl-5 text-base leading-relaxed text-muted-foreground">
                  {list.outro}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Start with the property (dark, 4 steps) ---------- */}
      <section
        data-section="Start with the property"
        className="grain relative bg-overlay py-24 text-white sm:py-32"
      >
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Kicker dark>From your brief to the next decision</Kicker>
              <h2 data-split className={`${HEADING} mt-6`}>
                Start with the property
              </h2>
            </div>
            <p
              data-reveal
              className="text-base leading-relaxed text-white/80 lg:col-span-5 lg:col-start-8"
            >
              Bring the property and intended use into the first conversation so the site, local
              rules, scope and responsibilities can be considered together.
            </p>
          </div>
          <ol className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step} data-reveal className="relative bg-overlay p-6 lg:p-8">
                <span className="flex items-center justify-between">
                  <span className="font-serif text-5xl leading-none text-transparent [-webkit-text-stroke:1px_var(--gold)]">
                    {pad(i + 1)}
                  </span>
                  {i < STEPS.length - 1 && (
                    <ArrowRight className="hidden size-4 text-gold lg:block" aria-hidden />
                  )}
                </span>
                <span className="mt-8 block font-serif text-xl leading-snug">{step}</span>
              </li>
            ))}
          </ol>
          <div data-reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
            <LineLink to={CTA.call.to} dark>
              {CTA.call.label}
            </LineLink>
          </div>
        </div>
      </section>

      <HomeFaqs items={FAQS} />

      <RelatedLinks
        links={[
          { label: "Services", to: "/services" },
          { label: "Design and Interiors", to: "/services/design-and-interiors" },
          { label: "Process", to: "/process" },
          { label: "Service Areas", to: "/service-areas" },
          { label: "Resources", to: "/resources" },
        ]}
      />
    </div>
  );
}
