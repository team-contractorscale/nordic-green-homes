import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { HomeConsultation } from "@/components/home/NordicHome";
import { CardSection, ClosingSection, SplitIntro } from "@/components/page/PageParts";
import { IMAGES } from "@/lib/home-content";

const DESCRIPTION =
  "A custom home is easier to plan when you understand the questions before you are asked to make expensive decisions. This guide is designed to help you organise the brief, test the property and prepare for the conversations that shape design and construction.";

const CHAPTERS = [
  {
    title: "Start with the site",
    body: "Gather the address, access information, existing drawings, survey material and the questions you already have. The property sets limits and creates opportunities.",
  },
  {
    title: "Define how you want to live",
    body: "Write down the rooms, routines, storage, privacy, light and flexibility that matter to your household. A clear brief gives every later decision a reason.",
  },
  {
    title: "Understand performance goals",
    body: "Comfort, energy, ventilation, airtightness and durability need clear definitions. The guide helps you separate a goal from a promise and identify where technical evidence is needed.",
  },
  {
    title: "Keep scope and budget connected",
    body: "Size, structure, materials, services, approvals and performance goals can all change the project. Keep assumptions visible as the brief develops.",
  },
  {
    title: "Prepare for approvals and change",
    body: "Know which questions need the municipality, a designer, an engineer, an energy advisor or the builder. Record changes so you can see their effect on scope, cost and timing.",
  },
  {
    title: "Choose the next conversation",
    body: "Use your notes to decide whether you need a feasibility discussion, design input, a performance brief or another project-specific next step.",
  },
];

export const Route = createFileRoute("/resources/guide")({
  head: () => ({
    meta: [
      { title: "A Practical Guide to Planning Your Custom Home | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "A Practical Guide to Planning Your Custom Home" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: IMAGES.office.src },
      { name: "twitter:image", content: IMAGES.office.src },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <div>
      <PageHeader
        image={IMAGES.office.src}
        imageAlt={IMAGES.office.alt}
        title="A Practical Guide to Planning Your Custom Home"
        description="Make the early decisions with more confidence"
      />

      <SplitIntro
        lead={DESCRIPTION}
        paragraphs={[
          "It is not a quote, approval or substitute for advice on your specific property.",
        ]}
      />

      <CardSection title="Inside the guide" items={CHAPTERS} tinted />

      <ClosingSection
        title="Discuss your project"
        links={[
          { label: "All resources", to: "/resources" },
          { label: "BC Energy Step Code", to: "/resources/bc-energy-step-code" },
          { label: "Discuss your project", to: "/contact" },
        ]}
      />

      <HomeConsultation />
    </div>
  );
}
