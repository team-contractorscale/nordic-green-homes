import { acceptedMetadata } from "@/lib/accepted-metadata";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
} from "@/components/home/kit";
import { HomeClosing, HomeFaqs } from "@/components/home/HomeSections";

/* High-Performance Homes — homepage design language and motion, laid out around the brief.
 * Copy is the client-supplied content (2026-11-04); SEO from the 4 November manifest append.
 * Order: full-bleed hero → target / method / evidence → start with the outcome (questions) →
 * connected parts of the brief (linked row) → how it differs (definitions, dark) → cost and
 * scope → FAQs → define your performance brief (dark) → related.
 */

const TITLE = "High-Performance Home Planning | Nordic Green Homes";
const DESCRIPTION =
  "Explore comfort, energy, envelope and ventilation goals for a home, and the project evidence needed to assess them.";
const HERO_IMAGE = IMAGES.hausRear;

// "a defined target, a suitable method of assessment and project-specific evidence"
const CLAIM_PARTS = [
  "A defined target",
  "A suitable method of assessment",
  "Project-specific evidence",
];

const QUESTIONS = [
  "Which comfort, energy, durability or indoor-environment priorities matter most?",
  "What does the site and climate context make easier or harder?",
  "Which design work already exists?",
  "What standard, code requirement or voluntary target is being considered?",
  "Who will model, specify, inspect or test the relevant work?",
  "What evidence will be available at completion?",
];

const PARTS = [
  {
    title: "Site, form and orientation",
    body: "The site and building form can influence solar exposure, glazing decisions, shading and the amount of envelope relative to floor area. The implications remain project-specific.",
  },
  {
    title: "Envelope continuity",
    body: "Insulation, airtightness and thermal-bridge details need to work as a system. Products alone do not prove the completed result.",
  },
  {
    title: "Windows and solar control",
    body: "Window size, performance, placement, installation and shading can affect heat flow, daylight and overheating risk.",
  },
  {
    title: "Ventilation and moisture",
    body: "Ventilation and moisture control require coordinated design. Health outcomes and mould-prevention claims need qualified sources and defined conditions.",
  },
  {
    title: "Modelling, testing and documentation",
    body: "Where the brief or code pathway requires modelling or testing, the responsible professional and acceptance criteria need to be named for the project.",
  },
];

const TERMS = [
  {
    term: "High-performance",
    def: "is a broad description that must be defined in the brief.",
  },
  {
    term: "Passive House",
    def: "is a building standard with published criteria and a certification pathway.",
  },
  {
    term: "Net-zero",
    def: "is an outcome claim that needs a stated energy or carbon boundary, calculation method and evidence.",
  },
  {
    term: "BC Energy Step Code compliance",
    def: "is a code requirement determined by the applicable rules, permit date and location.",
  },
];

const COST_FACTORS = [
  "Design",
  "Modelling",
  "Materials",
  "Windows",
  "Mechanical systems",
  "Detailing",
  "Site quality control",
  "Verification",
];

const FAQS = [
  {
    q: "What makes a home high performance?",
    a: "A defined set of project goals and evidence. The phrase alone does not establish a standard or result.",
  },
  {
    q: "Is high-performance construction the same as Passive House?",
    a: "No. Passive House has published criteria; high-performance is broader and needs a project definition.",
  },
  {
    q: "Is an energy-efficient home automatically net zero?",
    a: "No. Net-zero is a separate outcome claim with its own boundary, calculation and proof.",
  },
  {
    q: "Can an existing design be adapted?",
    a: "Possibly, but the opportunity and consequences depend on how far the design has progressed and which goals are being introduced.",
  },
  {
    q: "What can be measured or tested?",
    a: "That depends on the target and applicable requirements. The project team may need energy modelling, airtightness testing, commissioning or other documentation, and your project information should identify who provides it.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export const Route = createFileRoute("/services/high-performance-homes")({
  head: () => ({
    meta: [
      ...acceptedMetadata("/services/high-performance-homes"),
      { property: "og:image", content: HERO_IMAGE.src },
      { name: "twitter:image", content: HERO_IMAGE.src },
    ],
  }),
  component: HighPerformancePage,
});

function HighPerformancePage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />

      {/* ---------- Hero: full-bleed render, copy low ---------- */}
      <section
        data-section="High-Performance Homes"
        className="grain relative isolate overflow-hidden bg-overlay text-white"
      >
        <div data-anim="photo" className="absolute inset-0 -z-10 overflow-hidden">
          <div data-photo-inner className="absolute inset-x-0 -inset-y-[6%]">
            <img
              {...imgProps(HERO_IMAGE, "100vw")}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <div aria-hidden className="absolute inset-0 bg-overlay/45" />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-overlay via-overlay/85 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-overlay/70 to-transparent"
          />
        </div>
        <RefTag image={HERO_IMAGE} className="right-5 top-36 sm:right-8 lg:top-40" />

        <div className="wrap flex min-h-svh flex-col justify-end pb-16 pt-40 lg:pb-20">
          <div data-hero-copy className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p
                data-anim="fade"
                className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
              >
                <span aria-hidden className="h-px w-10 bg-gold" />
                High-Performance Homes
              </p>
              <HeroTitle
                lines={["Bring comfort and", "energy goals into", "the design brief."]}
                max="5.25rem"
                className="mt-7"
              />
            </div>
            <div className="lg:col-span-5">
              <p data-anim="fade" className="text-base leading-relaxed text-white/85">
                &ldquo;High-performance home&rdquo; is useful only when the project explains what
                performance means. It may involve energy demand, comfort, airtightness, moisture
                management, durability or another measurable priority. A broad label is not a
                substitute for a brief, model, test or certification.
              </p>
              <div data-anim="fade" className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
                <LineLink to={CTA.call.to} dark>
                  {CTA.call.label}
                </LineLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Target → method → evidence ---------- */}
      <section data-section="Claims and evidence" className="bg-background py-24 sm:py-28">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Kicker>Claims and evidence</Kicker>
              <p
                data-reveal
                className="mt-6 font-serif text-[clamp(1.5rem,1.4vw+1rem,2.375rem)] leading-[1.25]"
              >
                Performance claims are most useful when they have a defined target, a suitable
                method of assessment and project-specific evidence.
              </p>
            </div>
            <p
              data-reveal
              className="text-base leading-relaxed text-muted-foreground lg:col-span-5 lg:col-start-8"
            >
              Broad labels alone cannot show how a home will perform.
            </p>
          </div>

          <ol className="mt-14 grid gap-4 md:grid-cols-3 md:gap-0">
            {CLAIM_PARTS.map((part, i) => (
              <li
                key={part}
                data-reveal
                className="relative border border-border bg-secondary/40 p-8 lg:p-10"
                style={{ zIndex: CLAIM_PARTS.length - i }}
              >
                <span className="font-serif text-6xl leading-none text-transparent [-webkit-text-stroke:1px_var(--gold)]">
                  {pad(i + 1)}
                </span>
                <span className="mt-8 block font-serif text-2xl leading-tight">{part}</span>
                {i < CLAIM_PARTS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 place-items-center bg-gold text-black md:grid"
                  >
                    <ArrowRight className="size-3.5" />
                  </span>
                )}
              </li>
            ))}
          </ol>

          <p
            data-reveal="left"
            className="mt-12 max-w-3xl border-l-2 border-gold pl-6 font-serif text-xl leading-snug"
          >
            If an airtight house is part of your brief, agree the target, detailing approach and
            testing method early. The phrase alone does not prove a measured result.
          </p>
        </div>
      </section>

      {/* ---------- Start with the outcome you want to understand ---------- */}
      <section data-section="The outcome" className="bg-secondary py-24 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Kicker>The first conversation</Kicker>
              <h2 data-split className={`${HEADING} mt-6`}>
                Start with the outcome you want to understand
              </h2>
              <p data-reveal className="mt-6 text-base leading-relaxed text-muted-foreground">
                A useful early conversation starts with:
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ol className="border-t border-slate/20">
              {QUESTIONS.map((q, i) => (
                <li
                  key={q}
                  data-reveal
                  className="group flex items-baseline gap-6 border-b border-slate/20 py-6 transition-colors duration-500 hover:text-primary"
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-gold">{pad(i + 1)}</span>
                  <span className="font-serif text-[clamp(1.25rem,0.8vw+1rem,1.75rem)] leading-snug transition-transform duration-500 group-hover:translate-x-1.5">
                    {q}
                  </span>
                </li>
              ))}
            </ol>
            <p
              data-reveal="left"
              className="mt-8 border-l-2 border-gold pl-6 text-base leading-relaxed text-muted-foreground"
            >
              The answers can guide the envelope and systems conversation without turning an
              aspiration into a guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Connected parts of the brief: a linked row ---------- */}
      <section data-section="Connected parts" className="bg-background py-24 sm:py-28">
        <div className="wrap">
          <Kicker>The brief</Kicker>
          <h2 data-split className={`${HEADING} mt-6`}>
            Connected parts of the brief
          </h2>
          <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {/* the thread connecting every part (lg) */}
            <span
              aria-hidden
              data-rule
              className="absolute left-0 top-6 hidden h-px w-full origin-left bg-gold/60 lg:block"
            />
            {PARTS.map((p, i) => (
              <li key={p.title} data-reveal className="relative">
                <span className="relative grid size-12 place-items-center border border-gold bg-background font-serif text-lg text-gold">
                  {pad(i + 1)}
                </span>
                <h3 className="mt-6 font-serif text-2xl leading-tight">{p.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- How high-performance differs (definitions, dark) ---------- */}
      <section
        data-section="Definitions"
        className="grain relative bg-overlay py-24 text-white sm:py-28"
      >
        <div className="wrap">
          <Kicker dark>Terminology</Kicker>
          <h2 data-split className={`${HEADING} mt-6 max-w-4xl`}>
            How high-performance differs from Passive House and net zero
          </h2>
          <dl className="mt-12 border-t border-white/15">
            {TERMS.map((t, i) => (
              <div
                key={t.term}
                data-reveal
                className="grid gap-3 border-b border-white/15 py-7 lg:grid-cols-12 lg:items-baseline lg:gap-10"
              >
                <dt className="flex items-baseline gap-5 lg:col-span-5">
                  <span className="text-xs font-bold tracking-[0.2em] text-gold">{pad(i + 1)}</span>
                  <span className="font-serif text-[clamp(1.5rem,1vw+1rem,2.25rem)] leading-tight">
                    {t.term}
                  </span>
                </dt>
                <dd className="pl-9 text-base leading-relaxed text-white/80 sm:text-lg lg:col-span-7 lg:pl-0">
                  {t.def}
                </dd>
              </div>
            ))}
          </dl>
          <p
            data-reveal="left"
            className="mt-10 max-w-3xl border-l-2 border-gold pl-6 font-serif text-xl leading-snug"
          >
            A project can discuss more than one of these ideas, but keep the definitions separate so
            the goal and evidence remain clear.
          </p>
          <div data-reveal className="mt-8">
            <LineLink to="/services/passive-home-builder-bc" dark>
              Passive-Home Principles for BC Projects
            </LineLink>
          </div>
        </div>
      </section>

      {/* ---------- Cost and scope ---------- */}
      <section data-section="Cost and scope" className="bg-background py-24 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker>Budget</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              Cost and scope without a universal premium
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p data-reveal className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Performance goals can affect:
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {COST_FACTORS.map((f) => (
                <li
                  key={f}
                  data-reveal
                  className="border border-slate/25 px-4 py-2 font-serif text-lg transition-colors duration-300 hover:border-gold hover:bg-gold/10"
                >
                  {f}
                </li>
              ))}
            </ul>
            <p
              data-reveal="left"
              className="mt-8 border-l-2 border-gold pl-6 font-serif text-2xl leading-snug"
            >
              There is no evidence-safe universal percentage to add to every project.
            </p>
            <p data-reveal className="mt-6 text-base leading-relaxed text-muted-foreground">
              An estimate can help frame choices once its assumptions are clear. The actual cost
              remains specific to the design, site and construction scope.
            </p>
          </div>
        </div>
      </section>

      <HomeFaqs items={FAQS} />
      <HomeClosing
        title="Define your performance brief"
        body="Bring your property, priorities and questions to the first conversation. Together, identify the performance goal and the evidence needed to assess it."
        note={null}
        link={null}
      />
      <RelatedLinks
        links={[
          { label: "Design and Interiors", to: "/services/design-and-interiors" },
          { label: "Process", to: "/process" },
          { label: "Estimate", to: "/estimate" },
          { label: "Resources", to: "/resources" },
        ]}
      />
    </div>
  );
}
