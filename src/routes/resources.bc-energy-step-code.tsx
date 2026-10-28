import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { H2, HomeConsultation, TEXT_LINK } from "@/components/home/NordicHome";
import { ClosingSection, FaqList } from "@/components/page/PageParts";
import { IMAGES } from "@/lib/home-content";

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

export const Route = createFileRoute("/resources/bc-energy-step-code")({
  head: () => ({
    meta: [
      {
        title: "BC Energy Step Code: What Homeowners Should Understand Early | Nordic Green Homes",
      },
      { name: "description", content: DESCRIPTION },
      {
        property: "og:title",
        content: "BC Energy Step Code: what homeowners should understand early",
      },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: IMAGES.hausSide.src },
      { name: "twitter:image", content: IMAGES.hausSide.src },
    ],
  }),
  component: StepCodeArticle,
});

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-[clamp(1.5rem,1vw+1rem,2rem)] leading-tight text-foreground">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function StepCodeArticle() {
  return (
    <div>
      <PageHeader
        image={IMAGES.hausSide.src}
        imageAlt={IMAGES.hausSide.alt}
        title="BC Energy Step Code: what homeowners should understand early"
        description={DESCRIPTION}
      />

      {/* Article body */}
      <article className="py-24 sm:py-28">
        <div className="wrap max-w-3xl space-y-14">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p className="font-serif text-xl leading-snug text-foreground">
              The exact requirement depends on the project&rsquo;s location and building-permit
              date. Local governments can require higher steps, and the City of Vancouver uses its
              own Building By-law. That is why this article gives you questions to ask rather than a
              one-size-fits-all answer.
            </p>
            <p className="rounded-lg border border-dashed border-gold bg-gold/5 p-4 text-sm text-foreground/80">
              This article is general education, not legal, planning, engineering, energy-advising
              or code-compliance advice. Confirm the current requirement with the authority having
              jurisdiction and qualified project professionals.
            </p>
          </div>

          <Block title="What “performance-based” means">
            <p>
              The Step Code looks at whole-building performance rather than treating insulation,
              windows, heating and other elements as disconnected choices. The project team can
              choose design and construction solutions that meet the applicable performance
              requirement, subject to the code and local rules.
            </p>
            <p>
              For a homeowner, the practical lesson is to discuss energy requirements before design
              decisions are difficult to change.
            </p>
          </Block>

          <Block title="Why location and permit date matter">
            <p>
              The Province states that Energy and Zero Carbon Step Code requirements are based on
              where the project is located and the building-permit date. Provincial minimums apply,
              while local governments may require higher steps through bylaw.
            </p>
            <p>
              Avoid a static &ldquo;your municipality requires Step X&rdquo; answer unless the local
              source, access date and project assumptions are current. The requirement needs to be
              checked for the property and permit timing.
            </p>
          </Block>

          <Block title="Which parts of a home may be affected">
            <p>Depending on the project and pathway, the energy conversation can influence:</p>
            <ul className="space-y-2">
              {AFFECTED.map((item) => (
                <li key={item} className="flex gap-3 text-foreground">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              This list describes common decision areas, not a Nordic specification or guarantee.
            </p>
          </Block>

          <Block title="Who confirms compliance?">
            <p>
              The responsible authority and qualified project team determine what applies and what
              evidence is required. A builder alone does not automatically certify code compliance,
              and a website estimate cannot answer the question.
            </p>
            <p>
              Ask the project team who is responsible for design, energy modelling, professional
              review, compliance documentation and construction. The authority having jurisdiction
              remains responsible for the applicable regulatory decision.
            </p>
          </Block>
        </div>
      </article>

      {/* Frameworks + questions */}
      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap">
          <div className="max-w-2xl">
            <h2 className={H2}>Step Code, Passive House and net zero are different questions</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FRAMEWORKS.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-8 shadow-sm">
                <span className="block h-1 w-10 rounded-full bg-gold" aria-hidden />
                <h3 className="mt-5 font-serif text-2xl text-foreground">{f.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Meeting a code requirement does not automatically make a project a certified Passive
            House or net zero. Likewise, using selected passive-home principles does not prove code
            compliance or certification.
          </p>

          <div className="mt-20 max-w-3xl">
            <h2 className={H2}>Questions to ask before your design is final</h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {QUESTIONS.map((q) => (
                <li key={q} className="py-4 text-base leading-relaxed text-foreground">
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="wrap max-w-4xl">
          <h2 className={`${H2} text-center`}>Frequently asked questions</h2>
          <FaqList items={FAQS} />

          {/* Related reading + public sources */}
          <div className="mt-16 grid gap-10 border-t border-border pt-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Related reading
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Process, Services and Resources can help you organise the next questions.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <Link to="/process" className={TEXT_LINK}>
                  Process
                </Link>
                <Link to="/services" className={TEXT_LINK}>
                  Services
                </Link>
                <Link to="/resources" className={TEXT_LINK}>
                  Resources
                </Link>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Public sources
              </p>
              <ul className="mt-4 space-y-3">
                {SOURCES.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-1.5 text-base text-primary underline underline-offset-4 hover:text-gold"
                    >
                      {s.label}
                      <ArrowUpRight className="mt-1 size-4 shrink-0" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ClosingSection
        title="Plan the next conversation"
        body="If you are planning a new home, bring the property, permit timing, project type and questions to an early discussion. Use the related pages to compare Passive House principles and broader high-performance goals."
        links={[
          { label: "All resources", to: "/resources" },
          { label: "Passive Home Builder BC", to: "/services/passive-home-builder-bc" },
          { label: "High-Performance Homes", to: "/services/high-performance-homes" },
          { label: "Discuss the requirements for your project", to: "/contact" },
        ]}
      />

      <HomeConsultation />
    </div>
  );
}
