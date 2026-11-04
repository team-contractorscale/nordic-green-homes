import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Gauge, Grid2x2, Layers, Thermometer, Wind } from "lucide-react";
import { IMAGES } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
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

/* Passive-Home Principles for BC Projects — homepage design language and motion, laid out as
 * an educational guide. Copy is the client-supplied content (2026-11-04); SEO from the
 * 4 November manifest append. The route stays /services/passive-home-builder-bc: the
 * /services/passive-home-principles-bc candidate is held for route confirmation (no route or
 * redirect approved). Keep the educational framing; never imply Lane/Nordic certification or
 * licensing.
 * Order: hero with principle index (dark) → what is a passive house → the five principles →
 * principles / certification / proof (ladder) → Passive House vs net zero → BC code →
 * questions worth answering early → FAQs → discuss your performance brief (dark) → related.
 */

const TITLE = "Passive-Home Principles for BC Projects | Nordic Green Homes";
const DESCRIPTION =
  "Learn how insulation, windows, ventilation, thermal bridges and airtightness relate to passive-home principles and formal certification.";

const PRINCIPLES = [
  {
    icon: Layers,
    title: "Thermal insulation",
    body: "The building envelope needs a continuous, project-specific insulation strategy. Product selection alone does not establish performance.",
  },
  {
    icon: Grid2x2,
    title: "High-performance windows",
    body: "Glazing, frames, installation, orientation and shading need to be considered together. A window specification is one part of the whole-building result.",
  },
  {
    icon: Wind,
    title: "Ventilation with heat recovery",
    body: "Controlled ventilation is part of the Passive House framework. System design, commissioning and operation need qualified project input.",
  },
  {
    icon: Thermometer,
    title: "Thermal-bridge control",
    body: "Junctions and penetrations need to be detailed so that the envelope strategy is not undermined by avoidable heat-flow paths.",
  },
  {
    icon: Gauge,
    title: "Airtightness",
    body: "An airtightness target needs design, installation and testing. Calling a home “airtight” without a defined target and test evidence is not enough.",
  },
];

const STATEMENTS = [
  {
    claim: "Designed with passive-home principles",
    meaning: "describes an approach but needs the actual brief.",
  },
  {
    claim: "Designed to meet the Passive House standard",
    meaning: "describes an intended target and needs responsible professionals and criteria.",
  },
  {
    claim: "Certified Passive House",
    meaning: "describes a verified building outcome and requires certification evidence.",
  },
];

const QUESTIONS = [
  "Is certification a goal, or are selected principles being used?",
  "Who is responsible for energy modelling and technical coordination?",
  "Which envelope, window, ventilation and airtightness decisions need early input?",
  "What will be modelled, inspected or tested?",
  "Which current code and local requirements apply?",
  "What evidence will support any public claim at completion?",
];

const FAQS = [
  {
    q: "Is Passive House a style of architecture?",
    a: "No. It is a performance-based building standard. Different architectural styles can pursue it.",
  },
  {
    q: "Is an airtight home the same as a certified Passive House?",
    a: "No. Airtightness is one core principle and a measured criterion, but certification considers the complete published requirements and supporting evidence.",
  },
  {
    q: "Does every project using passive-home principles need certification?",
    a: "Not necessarily, but the intended target should be stated clearly. A project must not be described as certified when certification is not being pursued or verified.",
  },
  {
    q: "Does Passive House guarantee a particular energy bill?",
    a: "Passive House does not guarantee a household bill or saving. Actual use depends on the building, systems, occupants, energy prices and other conditions.",
  },
  {
    q: "When should these goals be introduced?",
    a: "As early as practical, because orientation, form, windows, envelope details and systems can be harder or more expensive to change later.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export const Route = createFileRoute("/services/passive-home-builder-bc")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: PassiveHomePage,
});

function PassiveHomePage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />

      {/* ---------- Hero: statement + principle index ---------- */}
      <section
        data-section="Passive-home principles"
        className="grain relative isolate overflow-hidden bg-overlay text-white"
      >
        <HeroBackdrop image={IMAGES.hausSide} />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_85%_40%,rgb(187_137_92/0.14),transparent_70%)]"
        />
        <div className="wrap grid min-h-svh items-center gap-14 pb-20 pt-36 lg:grid-cols-12 lg:pt-40">
          <div data-hero-copy className="lg:col-span-7">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              Passive-home principles for BC projects
            </p>
            <HeroTitle
              lines={["Passive House starts", "with a defined standard,", "not a label."]}
              max="4.75rem"
              className="mt-7"
            />
            <p
              data-anim="fade"
              className="mt-8 max-w-[36rem] text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Passive House is a building standard with published criteria and a quality-assurance
              process. A project may also use passive-home principles without pursuing
              certification. Decide which path is intended and what evidence supports the wording.
            </p>
          </div>

          <nav aria-label="The five core principles" className="lg:col-span-4 lg:col-start-9">
            <p
              data-anim="fade"
              className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold"
            >
              Five core principles
            </p>
            <span
              data-rule
              aria-hidden
              className="mt-4 block h-px w-full origin-left bg-white/20"
            />
            <ol>
              {PRINCIPLES.map(({ icon: Icon, title }, i) => (
                <li key={title} data-anim="stat" className="border-b border-white/10">
                  <a
                    href={`#principle-${i + 1}`}
                    className="group flex items-center gap-4 py-3.5 transition-colors duration-300 hover:text-gold"
                  >
                    <span className="grid size-9 shrink-0 place-items-center border border-white/15 text-gold transition-colors duration-500 group-hover:border-gold">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="flex-1 font-serif text-lg leading-tight">{title}</span>
                    <ArrowDown className="size-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* ---------- What is a passive house? ---------- */}
      <section data-section="What is a passive house?" className="bg-background py-24 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker>The basics</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              What is a passive house?
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p
              data-reveal
              className="font-serif text-[clamp(1.375rem,1vw+1rem,1.875rem)] leading-snug"
            >
              A passive house is designed around a connected set of building-performance principles,
              including a well-insulated envelope, high-performance windows, controlled ventilation,
              thermal-bridge control and airtightness. The project still needs a defined target and
              evidence if certification is being considered.
            </p>
            <p
              data-reveal="left"
              className="mt-8 border-l-2 border-gold pl-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              The Passive House Institute identifies five core principles: very good thermal
              insulation, highly energy-efficient windows, controlled mechanical ventilation with
              heat recovery, avoidance of thermal bridges and airtightness.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- The five principles ---------- */}
      <section data-section="The principles" className="bg-secondary py-24 sm:py-28">
        <div className="wrap">
          <Kicker>In a project conversation</Kicker>
          <h2 data-split className={`${HEADING} mt-6 max-w-4xl`}>
            What the principles mean in a project conversation
          </h2>
          <ol className="mt-14 grid gap-px border border-slate/15 bg-slate/15 [perspective:1400px] sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                id={`principle-${i + 1}`}
                data-tile
                className="group flex min-h-[18rem] scroll-mt-28 flex-col bg-background p-8 lg:p-10"
              >
                <span className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center border border-gold/60 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-black">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="block overflow-hidden">
                    <span
                      data-num
                      className="block font-serif text-5xl leading-none text-transparent [-webkit-text-stroke:1px_var(--slate)] transition-colors duration-500 group-hover:text-gold group-hover:[-webkit-text-stroke:1px_var(--gold)]"
                    >
                      {pad(i + 1)}
                    </span>
                  </span>
                </span>
                <h3 className="mt-auto pt-10 font-serif text-2xl leading-tight">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
            <li className="flex items-end bg-secondary p-8 lg:p-10">
              <p className="text-sm leading-relaxed text-muted-foreground">
                These explanations are educational summaries of the official framework, not a Nordic
                project specification.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ---------- Principles, certification and project proof (ladder) ---------- */}
      <section data-section="Principles and proof" className="bg-background py-24 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>Wording and evidence</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              Principles, certification and project proof
            </h2>
            <p data-reveal className="mt-6 text-base leading-relaxed text-muted-foreground">
              Three statements are materially different:
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ol className="space-y-3">
              {STATEMENTS.map((s, i) => (
                <li
                  key={s.claim}
                  data-reveal
                  className="relative overflow-hidden border border-border bg-background p-6 sm:p-8"
                >
                  {/* evidence bar: grows with each step up the ladder */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 bg-gold/10"
                    style={{ width: `${(i + 1) * 33.3}%` }}
                  />
                  <span className="relative flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="text-xs font-bold tracking-[0.2em] text-gold">
                      {pad(i + 1)}
                    </span>
                    <span>
                      <span className="block font-serif text-2xl leading-tight">{s.claim}:</span>
                      <span className="mt-2 block text-base leading-relaxed text-muted-foreground">
                        {s.meaning}
                      </span>
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <p
              data-reveal="left"
              className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl leading-snug"
            >
              Use the narrowest statement the evidence supports when describing the project.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Passive House vs net zero ---------- */}
      <section
        data-section="Passive House vs net zero"
        className="grain relative bg-overlay py-24 text-white sm:py-28"
      >
        <div className="wrap">
          <Kicker dark>Terminology</Kicker>
          <h2 data-split className={`${HEADING} mt-6`}>
            Passive House vs net zero
          </h2>
          <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-2">
            <div data-reveal className="bg-overlay p-8 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                Passive House
              </p>
              <p className="mt-4 font-serif text-2xl leading-snug">
                Focuses on defined building-performance criteria, including energy demand and
                airtightness.
              </p>
            </div>
            <div data-reveal className="bg-overlay p-8 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Net zero</p>
              <p className="mt-4 font-serif text-2xl leading-snug">
                Concerns an energy or carbon balance over a stated boundary and period.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 text-base leading-relaxed text-white/80 lg:grid-cols-2">
            <p data-reveal>The terms can relate, but one does not automatically prove the other.</p>
            <p data-reveal>
              The Passive House Institute also distinguishes certification classes that account for
              renewable-energy generation. That is why the project brief should name the standard
              and evidence rather than using &ldquo;passive&rdquo; and &ldquo;net zero&rdquo; as
              synonyms.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- BC code ---------- */}
      <section data-section="BC code" className="bg-background py-24 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker>Code requirements</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              How BC code requirements fit into the conversation
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-6 lg:col-start-7">
            <p data-reveal>
              The BC Energy Step Code establishes performance requirements for energy efficiency in
              new buildings. The required pathway depends on the project&rsquo;s permit date and
              location, and local governments can require higher steps. The City of Vancouver uses
              its own Building By-law.
            </p>
            <p
              data-reveal="left"
              className="border-l-2 border-gold pl-6 font-serif text-xl leading-snug text-foreground"
            >
              Code compliance, a voluntary performance target and Passive House certification are
              separate questions.
            </p>
            <div data-reveal className="pt-2">
              <LineLink to="/resources/bc-energy-step-code">
                Read the supporting BC Energy Step Code guide
              </LineLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Questions worth answering early ---------- */}
      <section data-section="Early questions" className="bg-secondary py-24 sm:py-28">
        <div className="wrap">
          <Kicker>Before the design is set</Kicker>
          <h2 data-split className={`${HEADING} mt-6`}>
            Questions worth answering early
          </h2>
          <ol className="mt-12 grid border-t border-slate/20 md:grid-cols-2">
            {QUESTIONS.map((q, i) => (
              <li
                key={q}
                data-reveal
                className="flex gap-5 border-b border-slate/20 py-6 md:odd:pr-10 md:even:border-l md:even:pl-10"
              >
                <span className="pt-1.5 text-xs font-bold tracking-[0.2em] text-gold">
                  {pad(i + 1)}
                </span>
                <span className="font-serif text-xl leading-snug">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <HomeFaqs items={FAQS} />

      {/* ---------- Discuss your performance brief ---------- */}
      <section
        data-section="Your performance brief"
        className="grain relative isolate overflow-hidden bg-overlay py-24 text-white sm:py-32"
      >
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker dark>Start here</Kicker>
            <h2
              data-split
              className="mt-6 font-serif text-[clamp(2.75rem,4.5vw+1rem,5.5rem)] leading-[1] tracking-[-0.03em]"
            >
              Discuss your performance brief
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p data-reveal className="text-base leading-relaxed text-white/80 sm:text-lg">
              Bring the property, your priorities and any performance target you have in mind. The
              first conversation should clarify the goal and identify the technical work it may
              require.
            </p>
            <div data-reveal className="mt-8">
              <SweepLink to="/contact">Discuss a performance brief</SweepLink>
            </div>
          </div>
        </div>
      </section>

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
