import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { H2, HomeConsultation, TEXT_LINK } from "@/components/home/NordicHome";
import {
  CardSection,
  ClosingSection,
  FaqList,
  ListColumns,
  SplitIntro,
} from "@/components/page/PageParts";
import { IMAGES } from "@/lib/home-content";

const DESCRIPTION =
  "Passive House is a building standard with published criteria and a quality-assurance process. A project may also use passive-home principles without pursuing certification. Decide which path is intended and what evidence supports the wording.";

const PRINCIPLES = [
  {
    title: "Thermal insulation",
    body: "The building envelope needs a continuous, project-specific insulation strategy. Product selection alone does not establish performance.",
  },
  {
    title: "High-performance windows",
    body: "Glazing, frames, installation, orientation and shading need to be considered together. A window specification is one part of the whole-building result.",
  },
  {
    title: "Ventilation with heat recovery",
    body: "Controlled ventilation is part of the Passive House framework. System design, commissioning and operation need qualified project input.",
  },
  {
    title: "Thermal-bridge control",
    body: "Junctions and penetrations need to be detailed so that the envelope strategy is not undermined by avoidable heat-flow paths.",
  },
  {
    title: "Airtightness",
    body: "An airtightness target needs design, installation and testing. Calling a home “airtight” without a defined target and test evidence is not enough.",
  },
];

const LISTS = [
  {
    title: "Principles, certification and project proof",
    intro: "Three statements are materially different:",
    items: [
      "Designed with passive-home principles: describes an approach but needs the actual brief.",
      "Designed to meet the Passive House standard: describes an intended target and needs responsible professionals and criteria.",
      "Certified Passive House: describes a verified building outcome and requires certification evidence.",
    ],
    outro: "Use the narrowest statement the evidence supports when describing the project.",
  },
  {
    title: "Passive House vs net zero",
    intro:
      "Passive House focuses on defined building-performance criteria, including energy demand and airtightness. Net-zero language concerns an energy or carbon balance over a stated boundary and period. The terms can relate, but one does not automatically prove the other.",
    outro:
      "The Passive House Institute also distinguishes certification classes that account for renewable-energy generation. That is why the project brief should name the standard and evidence rather than using “passive” and “net zero” as synonyms.",
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

export const Route = createFileRoute("/services/passive-home-builder-bc")({
  head: () => ({
    meta: [
      { title: "Passive Home Builder BC | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Passive Home Builder BC | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: IMAGES.nordicHaus.src },
      { name: "twitter:image", content: IMAGES.nordicHaus.src },
    ],
  }),
  component: PassiveHomePage,
});

function PassiveHomePage() {
  return (
    <div>
      <PageHeader
        image={IMAGES.nordicHaus.src}
        imageAlt={IMAGES.nordicHaus.alt}
        eyebrow="Passive Home Builder BC"
        title="Passive House starts with a defined standard, not a label"
        description={DESCRIPTION}
      />

      <SplitIntro
        lead="A passive house is designed around a connected set of building-performance principles, including a well-insulated envelope, high-performance windows, controlled ventilation, thermal-bridge control and airtightness."
        eyebrow="What is a passive house?"
        paragraphs={[
          "The project still needs a defined target and evidence if certification is being considered.",
          "The Passive House Institute identifies five core principles: very good thermal insulation, highly energy-efficient windows, controlled mechanical ventilation with heat recovery, avoidance of thermal bridges and airtightness.",
        ]}
      />

      <CardSection
        title="What the principles mean in a project conversation"
        items={PRINCIPLES}
        note="These explanations are educational summaries of the official framework, not a Nordic project specification."
        tinted
      />

      <ListColumns lists={LISTS} />

      {/* BC code + early questions */}
      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className={H2}>How BC code requirements fit into the conversation</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                The BC Energy Step Code establishes performance requirements for energy efficiency
                in new buildings. The required pathway depends on the project&rsquo;s permit date
                and location, and local governments can require higher steps. The City of Vancouver
                uses its own Building By-law.
              </p>
              <p>
                Code compliance, a voluntary performance target and Passive House certification are
                separate questions.
              </p>
            </div>
            <Link to="/resources/bc-energy-step-code" className={`${TEXT_LINK} mt-6`}>
              Read the supporting BC Energy Step Code guide
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div>
            <h2 className={H2}>Questions worth answering early</h2>
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
        </div>
      </section>

      <ClosingSection
        title="Discuss your performance brief"
        body="Bring the property, your priorities and any performance target you have in mind. The first conversation should clarify the goal and identify the technical work it may require."
        links={[
          { label: "Design and Interiors", to: "/services/design-and-interiors" },
          { label: "Process", to: "/process" },
          { label: "Resources", to: "/resources" },
          { label: "Discuss a performance brief", to: "/contact" },
        ]}
      />

      <HomeConsultation />
    </div>
  );
}
