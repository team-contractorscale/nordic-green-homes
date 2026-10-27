import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { H2, HomeConsultation } from "@/components/home/NordicHome";
import {
  CardSection,
  ClosingSection,
  FaqList,
  ListColumns,
  NumberedSteps,
} from "@/components/page/PageParts";
import { IMAGES } from "@/lib/home-content";

const HEADER_IMAGE = IMAGES.customHomes.src;

const DESCRIPTION =
  "The strongest custom-home brief connects the property, the household and the construction decisions that will make the design real. Nordic Green Homes is centred on considered design, durable choices and a clear explanation of how scope changes affect the project.";

const LISTS = [
  {
    title: "What “luxury” means here",
    intro:
      "Luxury is not a price band or a list of finishes. Here, it means giving important decisions enough attention:",
    items: [
      "a brief that reflects daily routines and long-term use;",
      "spaces, light, storage and circulation considered together;",
      "materials chosen with appearance, maintenance and availability in mind;",
      "performance goals introduced before they become late design changes; and",
      "responsibilities and changes recorded clearly.",
    ],
    outro:
      "That approach gives your project a useful starting point. It does not promise a particular inclusion, result, project history or service standard.",
  },
  {
    title: "Build a brief before choosing solutions",
    intro: "Useful early information can include:",
    items: [
      "the property address and what is already known about the site;",
      "who will live in the home and which spaces matter most;",
      "any existing survey, concept, floorplan or inspiration material;",
      "priorities for materials, maintenance, comfort or energy performance;",
      "budget context and timing; and",
      "the decisions that have already been made.",
    ],
    outro:
      "The aim is not to lock in a design during the first conversation. It is to identify the questions that deserve evidence before detailed work begins.",
  },
];

const CONSIDERATIONS = [
  {
    title: "Every change changes the project",
    body: "A larger floor area, added room, different structural requirement, upgraded finish, new service connection or stronger performance target can change design time, materials, labour, approvals and sequencing.\n\nThat is why an early range needs assumptions. If an assumption changes, the range may change too. You should see those assumptions clearly rather than treating a single number as certainty.",
  },
  {
    title: "Design, performance and finish belong in one conversation",
    body: "Layout, glazing, insulation, ventilation, materials and detailing can interact with comfort, maintenance, energy demand and budget. If the brief includes an airtightness target, Passive House certification or net-zero goal, the responsible specialists, calculation method and verification path need to be identified.\n\nNo single product or finish creates a high-performance home, and no design aspiration proves a completed result.",
  },
];

const QUESTIONS = [
  "Who is responsible for design, approvals, construction and technical verification?",
  "What information is included in the early range?",
  "Which assumptions could change that range?",
  "How are decisions, selections and changes recorded?",
  "Which performance terms are being used, and what evidence supports them?",
  "Which projects, reviews or references can be shown with permission?",
  "What happens after the first conversation?",
];

const NEXT_STEPS = [
  "Share the property and project brief.",
  "Identify the decisions that affect scope and cost.",
  "Use the estimate only within its stated assumptions.",
  "Discuss project fit and open questions through the project consultation.",
  "Move to private planning only if that option suits the project.",
  "Confirm responsibilities, deliverables and commercial terms in writing before detailed work.",
];

const FAQS = [
  {
    q: "How early should I speak with a custom-home team?",
    a: "Early enough to identify site, scope and performance questions before the design becomes expensive to change. The right timing still depends on the property and the process set out for your project.",
  },
  {
    q: "What affects the cost of a custom home?",
    a: "Size, site conditions, access, structure, design complexity, materials, services, approvals, performance targets and changes can all matter. An early range cannot replace a project-specific review and written quote.",
  },
  {
    q: "Can I bring my own architect or designer?",
    a: "Potentially, but the responsibilities set out for your project should clearly state who owns coordination and approvals.",
  },
  {
    q: "Is “luxury” the same as high-performance?",
    a: "No. Luxury is a positioning term; high-performance needs a defined technical brief. Neither proves Passive House certification, net-zero status or a specific result.",
  },
];

export const Route = createFileRoute("/services/luxury-custom-homes")({
  head: () => ({
    meta: [
      { title: "Luxury Custom Homes | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Luxury Custom Homes | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: HEADER_IMAGE },
      { name: "twitter:image", content: HEADER_IMAGE },
    ],
  }),
  component: LuxuryCustomHomesPage,
});

function LuxuryCustomHomesPage() {
  return (
    <div>
      <PageHeader
        image={HEADER_IMAGE}
        imageAlt={IMAGES.customHomes.alt}
        eyebrow="Luxury Custom Homes"
        title="A custom home shaped by the site and the way you live"
        description={DESCRIPTION}
      />

      <ListColumns lists={LISTS} />

      <CardSection items={CONSIDERATIONS} tinted />

      {/* Questions + next step */}
      <section className="py-24 sm:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className={H2}>Questions to ask a custom home builder in Vancouver</h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {QUESTIONS.map((q) => (
                <li key={q} className="py-4 text-base leading-relaxed text-foreground">
                  {q}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={H2}>Your next step</h2>
            <NumberedSteps steps={NEXT_STEPS} />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 sm:py-28">
        <div className="wrap max-w-4xl">
          <h2 className={`${H2} text-center`}>Frequently asked questions</h2>
          <FaqList items={FAQS} />
        </div>
      </section>

      <ClosingSection
        title="Start with your project"
        body="Share the property and project brief. Identify the decisions that affect scope and cost. Use the estimate only within its stated assumptions, then discuss project fit and open questions through the project consultation."
        links={[
          { label: "Services", to: "/services" },
          { label: "Design and Interiors", to: "/services/design-and-interiors" },
          { label: "Passive Home Builder BC", to: "/services/passive-home-builder-bc" },
          { label: "High-Performance Homes", to: "/services/high-performance-homes" },
          { label: "Projects", to: "/projects" },
          { label: "Resources", to: "/resources" },
          { label: "Discuss your project", to: "/contact" },
        ]}
      />

      <HomeConsultation />
    </div>
  );
}
