import { acceptedMetadata } from "@/lib/accepted-metadata";
import { createFileRoute } from "@tanstack/react-router";
import { ConceptPage } from "@/components/floorplans/ConceptPage";
import { FLOORPLANS } from "@/lib/home-content";

// Copy: client-supplied Modern Belgian Farmhouse content (2026-11-04); SEO from the 3 November manifest.
const PLAN = FLOORPLANS[1];
const TITLE = "Modern Belgian Farmhouse Home Concept | Nordic Green Homes";
const DESCRIPTION =
  "Explore Modern Belgian Farmhouse as a design concept, with the final layout and specifications considered for your property.";

export const Route = createFileRoute("/floorplans/modern-belgian-farmhouse")({
  head: () => ({
    meta: [
      ...acceptedMetadata("/floorplans/modern-belgian-farmhouse"),
      { property: "og:image", content: PLAN.image.src },
      { name: "twitter:image", content: PLAN.image.src },
    ],
  }),
  component: ModernBelgianFarmhousePage,
});

function ModernBelgianFarmhousePage() {
  return (
    <ConceptPage
      index={2}
      name={PLAN.title}
      headline="A warm, structured home concept"
      intro="Modern Belgian Farmhouse is a concept for exploring a home with a strong architectural shape, practical rooms and a material palette that can feel both grounded and refined."
      note="The name and concept provide a starting point, not a finished specification. The final layout must respond to your property, household, local requirements and the decisions you want to make about light, storage, connection and privacy."
      gallery={PLAN.gallery}
      credits={[
        { label: "Interior design", value: "Nordic Green Design" },
        { label: "Drafting", value: "Old Clayburn Design" },
      ]}
      sections={[
        {
          title: "Begin with the way you want to live",
          paragraphs: [
            "Think about the rooms you need, how they connect and which moments matter most: a quiet morning, a shared meal, space for guests or a clear relationship with the garden.",
            "Then test the concept against the site. Orientation, access, topography, services, setbacks and approvals may change the design before construction.",
          ],
        },
        {
          title: "Inside the concept",
          paragraphs: [
            "Sweeping rooflines and layered textures give this concept its European character. A vaulted great room connects with an open-plan layout, while a formal dining room offers a separate place to gather.",
            "The main-floor primary suite has a walk-in closet. An office near the foyer, a pantry with a preparation area, main-floor laundry and mudroom, and a covered patio add practical spaces around the main rooms.",
          ],
        },
        {
          title: "Plan at a glance",
          paragraphs: [
            "The published lower-level concept includes space for a home gym, theatre room, games room and wine cellar. Review these options with the design team as part of your project scope.\nThese are concept details, not a completed Nordic Green Homes build or a promise that the plan will suit your property. Review the current drawings and project requirements before relying on the layout.",
          ],
          list: [
            "Published area: 7,639 sq ft with the basement, or 4,812 sq ft without the basement.",
            "Bedrooms: five, including a main-floor primary suite.",
            "Garage: three-car.",
            "Lower-level options: a basement or full crawl space, to be considered with the site and design team.",
          ],
        },
        {
          title: "Before you choose this concept",
          paragraphs: [
            "Confirm the current plan information, dimensions, specifications, images, ownership and permitted use. Ask which parts can be changed and who is responsible for design, approvals and construction.",
            "The concept is not a construction quote or evidence of an achieved net-zero result. Discuss site fit, the drawings you need and any changes before choosing a plan.",
          ],
        },
      ]}
    />
  );
}
