import { createFileRoute } from "@tanstack/react-router";
import { AreaPage } from "@/components/page/PageParts";
import { SERVICE_AREAS } from "@/lib/home-content";

const AREA = SERVICE_AREAS[2];

const DESCRIPTION =
  "Local site conditions, access, approvals, climate and project logistics all need to be considered for the specific property. Start with the project context rather than assuming island-wide availability.";

export const Route = createFileRoute("/service-areas/vancouver-island")({
  head: () => ({
    meta: [
      { title: "Vancouver Island | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Vancouver Island | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: AREA.image.src },
      { name: "twitter:image", content: AREA.image.src },
    ],
  }),
  component: VancouverIslandPage,
});

function VancouverIslandPage() {
  return (
    <AreaPage
      title={AREA.title}
      headline="Start with the project, not a promise of coverage"
      description={DESCRIPTION}
      image={AREA.image}
      lists={[
        {
          title: "Bring the details that shape the conversation",
          intro:
            "Share the part of Vancouver Island where the property is located, the type of home or secondary dwelling you are considering and what is known about access, services, site conditions and approvals.\n\nExisting plans, survey information, inspiration and performance goals can help define the early questions.",
          outro:
            "Coverage, travel requirements and project suitability depend on the property and written scope. This page does not promise island-wide availability or a local project history.",
        },
        {
          title: "Make the next step useful",
          intro:
            "Use the first conversation to separate the property questions from the design brief. Confirm which information needs local advice and which responsibilities belong to the specialists and companies listed in your written scope.",
        },
      ]}
    />
  );
}
