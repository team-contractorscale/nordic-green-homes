import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { H2, HomeConsultation } from "@/components/home/NordicHome";
import {
  CardSection,
  ClosingSection,
  FaqList,
  ListColumns,
  SplitIntro,
} from "@/components/page/PageParts";
import { PHOTOS } from "@/lib/home-content";

const DESCRIPTION =
  "“High-performance home” is useful only when the project explains what performance means. It may involve energy demand, comfort, airtightness, moisture management, durability or another measurable priority. A broad label is not a substitute for a brief, model, test or certification.";

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

const LISTS = [
  {
    title: "Start with the outcome you want to understand",
    intro: "A useful early conversation starts with:",
    items: [
      "Which comfort, energy, durability or indoor-environment priorities matter most?",
      "What does the site and climate context make easier or harder?",
      "Which design work already exists?",
      "What standard, code requirement or voluntary target is being considered?",
      "Who will model, specify, inspect or test the relevant work?",
      "What evidence will be available at completion?",
    ],
    outro:
      "The answers can guide the envelope and systems conversation without turning an aspiration into a guarantee.",
  },
  {
    title: "How high-performance differs from Passive House and net zero",
    items: [
      "High-performance is a broad description that must be defined in the brief.",
      "Passive House is a building standard with published criteria and a certification pathway.",
      "Net-zero is an outcome claim that needs a stated energy or carbon boundary, calculation method and evidence.",
      "BC Energy Step Code compliance is a code requirement determined by the applicable rules, permit date and location.",
    ],
    outro:
      "A project can discuss more than one of these ideas, but keep the definitions separate so the goal and evidence remain clear.",
  },
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

export const Route = createFileRoute("/services/high-performance-homes")({
  head: () => ({
    meta: [
      { title: "High-Performance Homes | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "High-Performance Homes | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: PHOTOS.shopTrucks.src },
      { name: "twitter:image", content: PHOTOS.shopTrucks.src },
    ],
  }),
  component: HighPerformancePage,
});

function HighPerformancePage() {
  return (
    <div>
      <PageHeader
        image={PHOTOS.shopTrucks.src}
        imageAlt={PHOTOS.shopTrucks.alt}
        eyebrow="High-Performance Homes"
        title="High performance starts with a project definition"
        description={DESCRIPTION}
      />

      <SplitIntro
        lead="Performance claims are most useful when they have a defined target, a suitable method of assessment and project-specific evidence. Broad labels alone cannot show how a home will perform."
        paragraphs={[
          "If an airtight house is part of your brief, agree the target, detailing approach and testing method early. The phrase alone does not prove a measured result.",
        ]}
      />

      <CardSection title="Connected parts of the brief" items={PARTS} tinted />

      <ListColumns lists={LISTS} />

      <SplitIntro
        lead="There is no evidence-safe universal percentage to add to every project."
        eyebrow="Cost and scope without a universal premium"
        paragraphs={[
          "Performance goals can affect design, modelling, materials, windows, mechanical systems, detailing, site quality control and verification.",
          "An estimate can help frame choices once its assumptions are clear. The actual cost remains specific to the design, site and construction scope.",
        ]}
        tinted
      />

      <section className="py-24 sm:py-28">
        <div className="wrap max-w-4xl">
          <h2 className={`${H2} text-center`}>Frequently asked questions</h2>
          <FaqList items={FAQS} />
        </div>
      </section>

      <ClosingSection
        title="Define your performance brief"
        body="Bring your property, priorities and questions to the first conversation. Together, identify the performance goal and the evidence needed to assess it."
        links={[
          { label: "Design and Interiors", to: "/services/design-and-interiors" },
          { label: "Process", to: "/process" },
          { label: "Resources", to: "/resources" },
          { label: "Define your performance brief", to: "/contact" },
        ]}
      />

      <HomeConsultation />
    </div>
  );
}
