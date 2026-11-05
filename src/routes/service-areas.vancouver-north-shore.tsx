import { acceptedMetadata } from "@/lib/accepted-metadata";
import { createFileRoute } from "@tanstack/react-router";
import { AreaPage } from "@/components/page/PageParts";
import { SERVICE_AREAS } from "@/lib/home-content";

const AREA = SERVICE_AREAS[0];

const DESCRIPTION =
  "Tell us whether your property is in Vancouver, West Vancouver or North Vancouver, and bring the site details and plans you already have. Access, slope, servicing and municipal requirements need to be considered for that property.";

export const Route = createFileRoute("/service-areas/vancouver-north-shore")({
  head: () => ({
    meta: [
      ...acceptedMetadata("/service-areas/vancouver-north-shore"),
      { property: "og:image", content: AREA.image.src },
      { name: "twitter:image", content: AREA.image.src },
    ],
  }),
  component: NorthShorePage,
});

function NorthShorePage() {
  return (
    <AreaPage
      title={AREA.title}
      headline={AREA.title}
      description={DESCRIPTION}
      image={AREA.image}
      lists={[
        {
          title: "Bring the right details",
          intro:
            "Share the address, project type, existing plans, survey information and the priorities that matter to your household. Tell us whether you are considering a custom home, a secondary dwelling or a performance-led brief.",
          outro:
            "Your property, municipal requirements and agreed scope guide the design and delivery arrangements.",
        },
        {
          title: "A project conversation grounded in the site",
          intro:
            "Use the early discussion to separate what is known from what needs checking. That may include access, orientation, servicing, approvals, design responsibilities, performance goals and construction scope.",
        },
      ]}
    />
  );
}
