import { createFileRoute } from "@tanstack/react-router";
import { AreaPage } from "@/components/page/PageParts";
import { SERVICE_AREAS } from "@/lib/home-content";

const AREA = SERVICE_AREAS[0];

const DESCRIPTION =
  "Every property brings its own questions. On the North Shore, your project conversation may need to account for the site, access, slope, services, local requirements and the way the home should sit within its surroundings.";

export const Route = createFileRoute("/service-areas/vancouver-north-shore")({
  head: () => ({
    meta: [
      { title: "Vancouver North Shore | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Vancouver North Shore | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
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
      headline="Plan carefully for a North Shore property"
      description={DESCRIPTION}
      note="The first step is not to assume what can be built. It is to understand the property and identify the information needed for a responsible next step."
      image={AREA.image}
      lists={[
        {
          title: "Bring the right details",
          intro:
            "Share the address, project type, existing plans, survey information and the priorities that matter to your household. Tell us whether you are considering a custom home, a secondary dwelling or a performance-led brief.",
          outro:
            "The municipality, site conditions, travel requirements and available services must be confirmed for the specific project. This page does not promise approval, local project history or coverage across the whole North Shore.",
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
