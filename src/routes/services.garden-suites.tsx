import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { H2, HomeConsultation } from "@/components/home/NordicHome";
import {
  CardSection,
  ClosingSection,
  FaqList,
  ListColumns,
  NumberedSteps,
  SplitIntro,
} from "@/components/page/PageParts";
import { PHOTOS } from "@/lib/home-content";

const DESCRIPTION =
  "A garden suite, coach house or laneway home can add flexible space, but the label alone does not tell you whether a project is allowed, practical or within budget. The property, municipality, access, existing services and intended use all shape the next step.";

const PLANNING = [
  {
    title: "Different names can point to different rules",
    body: "People often use “garden suite,” “coach house,” “laneway home” and “accessory dwelling unit” as if they mean the same thing. Local governments may define and regulate them differently.\n\nUse the language your local authority uses, then check the property-specific rules for the relevant jurisdiction. One municipality’s terminology must not be copied to another.",
  },
  {
    title: "Start with the intended use",
    body: "A useful brief explains what the space needs to do. Examples may include housing for family, a flexible guest space, a dedicated work area or another use allowed by the local authority.\n\nThe intended use is a planning input, not proof that the use is permitted, financially suitable or deliverable on the property.",
  },
];

const LISTS = [
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
      "A website estimate may organise some of these variables once its assumptions have been reviewed with you. It cannot confirm feasibility or final cost.",
  },
];

const NEXT_STEPS = [
  "Share the property and intended use.",
  "Identify the local rules that need checking.",
  "Review site, access and service constraints.",
  "Use an indicative estimate only within its stated assumptions.",
  "Discuss open questions through the project consultation.",
  "Begin design or approvals only after scope and responsibilities are set out in writing.",
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
      { title: "Garden Suites | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Garden Suites | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: PHOTOS.cabana.src },
      { name: "twitter:image", content: PHOTOS.cabana.src },
    ],
  }),
  component: GardenSuitesPage,
});

function GardenSuitesPage() {
  return (
    <div>
      <PageHeader
        image={PHOTOS.cabana.src}
        imageAlt={PHOTOS.cabana.alt}
        eyebrow="Garden Suites"
        title="A secondary home starts with the property"
        description={DESCRIPTION}
      />

      <SplitIntro
        lead="If you are comparing a laneway house builder in Vancouver, start with the address and intended use rather than a standard plan."
        paragraphs={[
          "The laneway house cost in Vancouver can vary with the site, servicing, access, approvals, size and construction scope.",
          "Eligibility, delivery model and coverage depend on the property and written project scope. This page does not promise approval, rental use, income, cost, timing or service availability.",
        ]}
      />

      <CardSection items={PLANNING} tinted />

      <ListColumns lists={LISTS} />

      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap max-w-3xl">
          <h2 className={H2}>Start with the property</h2>
          <NumberedSteps steps={NEXT_STEPS} />
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="wrap max-w-4xl">
          <h2 className={`${H2} text-center`}>Frequently asked questions</h2>
          <FaqList items={FAQS} />
        </div>
      </section>

      <ClosingSection
        title="Start with the property"
        body="Share the property and intended use. Identify the local rules that need checking. Review site, access and service constraints, then discuss open questions through the project consultation."
        links={[
          { label: "Services", to: "/services" },
          { label: "Design and Interiors", to: "/services/design-and-interiors" },
          { label: "Process", to: "/process" },
          { label: "Service Areas", to: "/service-areas" },
          { label: "Resources", to: "/resources" },
          { label: "Discuss your project", to: "/contact" },
        ]}
      />

      <HomeConsultation />
    </div>
  );
}
