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
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
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
          title: "Before you choose this concept",
          paragraphs: [
            "Confirm the current plan information, dimensions, specifications, images, ownership and permitted use. Ask which parts can be changed and who is responsible for design, approvals and construction.",
          ],
          outro:
            "No price, size, room count, garage, performance or net-zero claim is included until the plan information supplied for the home and rights have been checked.",
        },
      ]}
    />
  );
}
