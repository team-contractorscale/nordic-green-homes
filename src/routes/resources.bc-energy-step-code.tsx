import { acceptedMetadata } from "@/lib/accepted-metadata";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { IMAGES } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import {
  HEADING,
  HeroBackdrop,
  HeroTitle,
  Kicker,
  RelatedLinks,
  ScrollProgress,
  SectionIndicator,
} from "@/components/home/kit";
import { HomeClosing, HomeFaqs } from "@/components/home/HomeSections";

/* BC Energy Step Code article — homepage design language and motion, laid out as a long read:
 * sticky contents beside the article (the section in view is marked: useHomeMotion stage
 * tracker), then frameworks (dark), questions, FAQs, sources and the closing.
 * Copy is the existing article copy; the general-education disclaimer box and the
 * "not a Nordic specification" line were removed on client direction (2026-11-04).
 */

const TITLE = "BC Energy Step Code: What Homeowners Should Understand Early | Nordic Green Homes";
const DESCRIPTION =
  "The BC Energy Step Code sets performance requirements for energy efficiency in new buildings. Instead of prescribing one fixed combination of products, the performance pathway allows the design and building team to determine how the project will meet the applicable outcome.";

const AFFECTED = [
  "building form and orientation;",
  "insulation and thermal continuity;",
  "window and door performance;",
  "airtightness detailing and testing;",
  "ventilation and mechanical systems;",
  "energy modelling and documentation; and",
  "coordination between design and construction.",
];

const FRAMEWORKS = [
  {
    title: "BC Energy Step Code",
    body: "A provincial performance framework for energy efficiency in new buildings, applied through the current code and relevant local requirements.",
  },
  {
    title: "Passive House",
    body: "A building standard with published criteria covering very good insulation, high-performance windows, heat-recovery ventilation, thermal-bridge control and airtightness. Certification requires project evidence.",
  },
  {
    title: "Net zero",
    body: "An outcome claim that needs a defined energy or carbon boundary, calculation method and evidence.",
  },
];

const QUESTIONS = [
  "Which code and local requirements apply to this property and permit timing?",
  "Who is responsible for energy modelling and compliance documentation?",
  "Which design decisions need to be made before pricing?",
  "What airtightness, mechanical or other testing is required?",
  "Which assumptions could change as the design develops?",
  "What completion evidence will the homeowner receive?",
];

const FAQS = [
  {
    q: "Is the BC Energy Step Code mandatory for every project?",
    a: "Do not assume one answer for every building, renovation or jurisdiction. The applicable code, project type, location, permit date and local rules need to be checked.",
  },
  {
    q: "Which step applies to my home?",
    a: "Confirm this with the authority having jurisdiction and qualified project professionals using the current rules for the permit date and location.",
  },
  {
    q: "Does the Step Code apply in the City of Vancouver?",
    a: "The Province notes that Vancouver has its own Building By-law. Use the current City of Vancouver requirements for a Vancouver project rather than assuming the provincial pathway applies unchanged.",
  },
  {
    q: "Does a higher step guarantee lower bills or better comfort?",
    a: "A higher step does not guarantee a household bill, comfort outcome or saving. Actual performance and use depend on the building, systems, occupants and other conditions.",
  },
  {
    q: "Is Step Code compliance the same as Passive House certification?",
    a: "No. They are separate frameworks with different requirements and evidence.",
  },
];

const BC_CODES =
  "https://www2.gov.bc.ca/gov/content/industry/construction-industry/building-codes-standards/bc-codes";
const SOURCES = [
  {
    label: "Province of British Columbia: BC Energy Step Code",
    href: `${BC_CODES}/2024-bc-codes/step-codes/energy`,
  },
  {
    label: "Province of British Columbia: BC Step Code requirements",
    href: `${BC_CODES}/2024-bc-codes/step-codes/requirements`,
  },
  { label: "Province of British Columbia: About the BC Building Code", href: BC_CODES },
  {
    label: "Passive House Institute: Building certification",
    href: "https://passivehouse.com/en/home/building-certification/",
  },
];

const BLOCKS = [
  "What “performance-based” means",
  "Why location and permit date matter",
  "Which parts of a home may be affected",
  "Who confirms compliance?",
];

const pad = (n: number) => String(n).padStart(2, "0");

export const Route = createFileRoute("/resources/bc-energy-step-code")({
  head: () => ({
    meta: [
      ...acceptedMetadata("/resources/bc-energy-step-code"),
      {
        property: "og:title",
        content: "BC Energy Step Code: what homeowners should understand early",
      },
      { property: "og:image", content: IMAGES.hausSide.src },
      { name: "twitter:image", content: IMAGES.hausSide.src },
    ],
  }),
  component: StepCodeArticle,
});

function Block({ index, children }: { index: number; children: ReactNode }) {
  return (
    <section
      id={`part-${index + 1}`}
      data-stage
      className="scroll-mt-28 border-t border-border pt-10"
    >
      <span className="text-xs font-bold tracking-[0.2em] text-gold">{pad(index + 1)}</span>
      <h2 className="mt-3 font-serif text-[clamp(1.75rem,1.4vw+1rem,2.5rem)] leading-tight">
        {BLOCKS[index]}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {children}
      </div>
    </section>
  );
}

function StepCodeArticle() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />

      {/* ---------- Hero ---------- */}
      <section
        data-section="BC Energy Step Code"
        className="grain relative isolate overflow-hidden bg-overlay pb-20 pt-36 text-white lg:pb-24 lg:pt-44"
      >
        <HeroBackdrop image={IMAGES.hausSide} />
        <div data-hero-copy className="wrap grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              Resources · Article
            </p>
            <HeroTitle
              lines={["BC Energy Step Code:", "what homeowners should", "understand early."]}
              max="4.75rem"
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
      </section>

      {/* ---------- Article with sticky contents ---------- */}
      <section data-section="The article" className="bg-background py-24 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-32">
              <Kicker>In this article</Kicker>
              <ol className="relative mt-8 border-l border-border">
                <span
                  aria-hidden
                  data-stage-fill
                  className="absolute -left-px top-0 h-full w-px origin-top bg-gold motion-reduce:hidden"
                  style={{ transform: "scaleY(0)" }}
                />
                {BLOCKS.map((b, i) => (
                  <li key={b} data-stage-nav data-active={i === 0} className="group/nav relative">
                    <a
                      href={`#part-${i + 1}`}
                      className="flex items-baseline gap-4 py-2.5 pl-6 text-muted-foreground transition-colors duration-300 hover:text-foreground group-data-[active=true]/nav:text-foreground"
                    >
                      <span
                        aria-hidden
                        className="absolute -left-px inset-y-1.5 w-[3px] origin-top scale-y-0 bg-gold transition-transform duration-500 group-data-[active=true]/nav:scale-y-100"
                      />
                      <span className="text-xs font-bold tracking-[0.2em] text-gold">
                        {pad(i + 1)}
                      </span>
                      <span className="font-serif text-lg leading-tight">{b}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <article data-stages className="space-y-14 lg:col-span-7 lg:col-start-6">
            <p
              data-reveal
              className="font-serif text-[clamp(1.375rem,1vw+1rem,1.875rem)] leading-snug text-foreground"
            >
              The exact requirement depends on the project&rsquo;s location and building-permit
              date. Local governments can require higher steps, and the City of Vancouver uses its
              own Building By-law. That is why this article gives you questions to ask rather than a
              one-size-fits-all answer.
            </p>

            <Block index={0}>
              <p>
                The Step Code looks at whole-building performance rather than treating insulation,
                windows, heating and other elements as disconnected choices. The project team can
                choose design and construction solutions that meet the applicable performance
                requirement, subject to the code and local rules.
              </p>
              <p className="border-l-2 border-gold pl-5 font-serif text-xl leading-snug text-foreground">
                For a homeowner, the practical lesson is to discuss energy requirements before
                design decisions are difficult to change.
              </p>
            </Block>

            <Block index={1}>
              <p>
                The Province states that Energy and Zero Carbon Step Code requirements are based on
                where the project is located and the building-permit date. Provincial minimums
                apply, while local governments may require higher steps through bylaw.
              </p>
              <p>
                Avoid a static &ldquo;your municipality requires Step X&rdquo; answer unless the
                local source, access date and project assumptions are current. The requirement needs
                to be checked for the property and permit timing.
              </p>
            </Block>

            <Block index={2}>
              <p>Depending on the project and pathway, the energy conversation can influence:</p>
              <ul className="divide-y divide-border border-y border-border">
                {AFFECTED.map((item) => (
                  <li key={item} className="flex items-start gap-4 py-3 text-base text-foreground">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center border border-gold text-gold">
                      <Check className="size-3" aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Block>

            <Block index={3}>
              <p>
                The responsible authority and qualified project team determine what applies and what
                evidence is required. A builder alone does not automatically certify code
                compliance, and a website estimate cannot answer the question.
              </p>
              <p>
                Ask the project team who is responsible for design, energy modelling, professional
                review, compliance documentation and construction. The authority having jurisdiction
                remains responsible for the applicable regulatory decision.
              </p>
            </Block>
          </article>
        </div>
      </section>

      {/* ---------- Frameworks (dark) ---------- */}
      <section
        data-section="Frameworks"
        className="grain relative bg-overlay py-24 text-white sm:py-28"
      >
        <div className="wrap">
          <Kicker dark>Terminology</Kicker>
          <h2 data-split className={`${HEADING} mt-6 max-w-4xl`}>
            Step Code, Passive House and net zero are different questions
          </h2>
          <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-3">
            {FRAMEWORKS.map((f, i) => (
              <div key={f.title} data-reveal className="bg-overlay p-8 lg:p-10">
                <span className="text-xs font-bold tracking-[0.2em] text-gold">{pad(i + 1)}</span>
                <h3 className="mt-4 font-serif text-2xl leading-tight">{f.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-white/75">{f.body}</p>
              </div>
            ))}
          </div>
          <p
            data-reveal="left"
            className="mt-10 max-w-3xl border-l-2 border-gold pl-6 font-serif text-xl leading-snug"
          >
            Meeting a code requirement does not automatically make a project a certified Passive
            House or net zero. Likewise, using selected passive-home principles does not prove code
            compliance or certification.
          </p>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section data-section="Questions" className="bg-secondary py-24 sm:py-28">
        <div className="wrap">
          <Kicker>Before your design is final</Kicker>
          <h2 data-split className={`${HEADING} mt-6`}>
            Questions to ask before your design is final
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

      {/* ---------- Public sources ---------- */}
      <section
        data-section="Sources"
        className="border-t border-border bg-background py-16 sm:py-20"
      >
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>Public sources</Kicker>
          </div>
          <ul className="border-t border-border lg:col-span-8">
            {SOURCES.map((s) => (
              <li key={s.href} className="border-b border-border">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-4 text-base transition-colors hover:text-primary"
                >
                  {s.label}
                  <ArrowUpRight className="size-4 shrink-0 text-gold transition-transform duration-500 group-hover:rotate-45" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HomeClosing
        title="Plan the next conversation"
        body="If you are planning a new home, bring the property, permit timing, project type and questions to an early discussion. Use the related pages to compare Passive House principles and broader high-performance goals."
        note={null}
        link={null}
      />
      <RelatedLinks
        links={[
          { label: "All resources", to: "/resources" },
          { label: "Passive-Home Principles", to: "/services/passive-home-builder-bc" },
          { label: "High-Performance Homes", to: "/services/high-performance-homes" },
          { label: "Discuss the requirements for your project", to: "/contact" },
        ]}
      />
    </div>
  );
}
