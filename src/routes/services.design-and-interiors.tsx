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
import { IMAGES } from "@/lib/home-content";

const DESCRIPTION =
  "A custom home is experienced through everyday decisions: how rooms connect, where natural light enters, what needs to be stored, which materials suit the household and how details come together across the project.";

const LISTS = [
  {
    title: "Start with how you want to live",
    intro:
      "The first design step is to separate preferences from requirements. A useful brief can cover:",
    items: [
      "who will use the home and how needs may change;",
      "which spaces need to work hardest;",
      "circulation, storage, privacy and accessibility priorities;",
      "natural light, views and connection to outdoor space;",
      "material, maintenance and durability preferences;",
      "performance goals that could affect form, windows or systems;",
      "existing plans, surveys or reference images; and",
      "budget context and the decisions most likely to change it.",
    ],
    outro:
      "The purpose is to create something that can be tested: not to imply that an early concept is approved, priced or buildable.",
  },
  {
    title: "Design and construction questions should meet early",
    intro:
      "Some design decisions affect structure, sequencing, lead times, performance and price. Considering those consequences early can make the brief more useful and reduce the risk of treating selections in isolation.",
    outro:
      "Your agreed scope should state who coordinates design, construction, approvals and specialist input.",
  },
];

const AREAS = [
  {
    title: "Spatial planning",
    body: "Room relationships, circulation, storage and the way spaces support everyday routines.",
  },
  {
    title: "Materials and finish direction",
    body: "A coordinated view of colour, texture, fixtures and finishes, considered alongside maintenance, availability and budget.",
  },
  {
    title: "Kitchens, bathrooms and joinery",
    body: "Functional requirements, layout and coordination with the wider design. Cabinetry drawings, procurement and supplier management depend on the agreed scope.",
  },
  {
    title: "Lighting and ceiling design",
    body: "Ambience, task needs and coordination with the architecture and services. Your written scope should list the exact deliverables.",
  },
  {
    title: "Visualisation and documentation",
    body: "Floorplans, renderings, schedules or other documentation may support decisions, but the provider, level of detail and purpose must be clear.",
  },
];

const FAQS = [
  {
    q: "Can design begin before I own a site?",
    a: "An early brief may begin before a site is chosen, but site-specific design and buildability decisions need the actual property and relevant information.",
  },
  {
    q: "Can I bring an existing architect or designer?",
    a: "Potentially. The final answer must follow the responsibilities set out for your project and state who owns coordination, documentation and approvals.",
  },
  {
    q: "What does an interiors service include?",
    a: "Only the items listed in the agreed scope. Ask whether the service includes advice, selections, drawings, schedules, procurement or installation coordination.",
  },
  {
    q: "How do design changes affect price?",
    a: "Changes can affect quantities, products, labour, documentation, structure, services and sequencing. The estimate or project record should show which assumption changed.",
  },
  {
    q: "Does “sustainable design” guarantee a healthy or low-impact home?",
    a: "No. Those outcomes need defined criteria, product information and project evidence. Ask what decisions, methods and evidence support any sustainability or health-related claim.",
  },
];

export const Route = createFileRoute("/services/design-and-interiors")({
  head: () => ({
    meta: [
      { title: "Design & Interiors | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Design & Interiors | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: IMAGES.interior.src },
      { name: "twitter:image", content: IMAGES.interior.src },
    ],
  }),
  component: DesignInteriorsPage,
});

function DesignInteriorsPage() {
  return (
    <div>
      <PageHeader
        image={IMAGES.interior.src}
        imageAlt={IMAGES.interior.alt}
        eyebrow="Design & Interiors"
        title="What custom home design in BC should make clear"
        description={DESCRIPTION}
      >
        <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
          A warm, natural design language can bring texture and calm to a home while leaving room
          for the site, budget and practical requirements to lead the decisions.
        </p>
      </PageHeader>

      <ListColumns lists={LISTS} tinted />

      <CardSection title="Design areas to discuss in your project scope" items={AREAS} />

      <SplitIntro
        lead="Warm timber, stone, texture, light and neutral colour can create a home that feels grounded without making the design feel fixed."
        eyebrow="A calm, natural material direction"
        paragraphs={[
          "The right palette still depends on how the rooms are used, how much maintenance you want and what products are available.",
          "Bring reference images, material preferences and practical requirements to the brief. Then test the choices against performance, budget, lead times and construction details.",
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
        title="Start your design brief"
        body="Bring your plans, ideas, reference images and questions. Begin with the way you want the home to work, then identify the decisions that need to happen next."
        links={[
          { label: "Services", to: "/services" },
          { label: "Garden Suites", to: "/services/garden-suites" },
          { label: "Passive Home Builder BC", to: "/services/passive-home-builder-bc" },
          { label: "High-Performance Homes", to: "/services/high-performance-homes" },
          { label: "Process", to: "/process" },
          { label: "Start your design brief", to: "/contact" },
        ]}
      />

      <HomeConsultation />
    </div>
  );
}
