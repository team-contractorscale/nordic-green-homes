import { createFileRoute } from "@tanstack/react-router";
import { FloorplanPage } from "@/components/page/PageParts";
import { FLOORPLANS } from "@/lib/home-content";

const PLAN = FLOORPLANS[1];

const DESCRIPTION =
  "Modern Belgian Farmhouse is a concept for exploring a home with a strong architectural shape, practical rooms and a material palette that can feel both grounded and refined.";

export const Route = createFileRoute("/floorplans/modern-belgian-farmhouse")({
  head: () => ({
    meta: [
      { title: "Modern Belgian Farmhouse Floorplan | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Modern Belgian Farmhouse Floorplan | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: PLAN.image.src },
      { name: "twitter:image", content: PLAN.image.src },
    ],
  }),
  component: ModernBelgianFarmhousePage,
});

function ModernBelgianFarmhousePage() {
  return (
    <FloorplanPage
      title={PLAN.title}
      headline="A warm, structured home concept"
      description={DESCRIPTION}
      note="The name and concept provide a starting point, not a finished specification. The final layout must respond to your property, household, local requirements and the decisions you want to make about light, storage, connection and privacy."
      gallery={PLAN.gallery}
      lists={[
        {
          title: "Begin with the way you want to live",
          intro:
            "Think about the rooms you need, how they connect and which moments matter most: a quiet morning, a shared meal, space for guests or a clear relationship with the garden.",
          outro:
            "Then test the concept against the site. Orientation, access, topography, services, setbacks and approvals may change the design before construction.",
        },
        {
          title: "Before you choose this concept",
          intro:
            "Confirm the current plan information, dimensions, specifications, images, ownership and permitted use. Ask which parts can be changed and who is responsible for design, approvals and construction.",
          outro:
            "No price, size, room count, garage, performance or net-zero claim is included until the plan information supplied for the home and rights have been checked.",
        },
      ]}
    />
  );
}
