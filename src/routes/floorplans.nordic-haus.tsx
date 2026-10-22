import { createFileRoute } from "@tanstack/react-router";
import { FloorplanPage } from "@/components/page/PageParts";
import { FLOORPLANS } from "@/lib/home-content";

const PLAN = FLOORPLANS[0];

const DESCRIPTION =
  "Nordic Haus is a concept for discussing the shape and feel of a home before the details are fixed. Use the plan as a starting point for questions about how the rooms connect, how the home sits on the property and what needs to change for your household.";

export const Route = createFileRoute("/floorplans/nordic-haus")({
  head: () => ({
    meta: [
      { title: "Nordic Haus Floorplan | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Nordic Haus Floorplan | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: PLAN.image.src },
      { name: "twitter:image", content: PLAN.image.src },
    ],
  }),
  component: NordicHausPage,
});

function NordicHausPage() {
  return (
    <FloorplanPage
      title={PLAN.title}
      headline="A calm starting point for a custom home"
      description={DESCRIPTION}
      note="The concept is not a promise that the layout suits your site or can be built at a particular price. Site conditions, local requirements, structural design, services and your brief all affect the final result."
      gallery={PLAN.gallery}
      lists={[
        {
          title: "Make the concept yours",
          intro:
            "Start with the way you live. Which spaces need privacy? Where do you want morning light? How much storage, flexibility or connection to the outdoors do you need?",
          outro:
            "From there, review the plan with the property in mind. Access, orientation, setbacks, topography, servicing and approvals may all change the design.",
        },
        {
          title: "What to confirm before you choose a plan",
          items: [
            "The current dimensions and specifications.",
            "Which drawings or files are included.",
            "What may be changed for the site and brief.",
            "Who owns the plan and imagery.",
            "Which design, approval and construction services are available.",
          ],
          outro:
            "No price or performance claim is included until the plan information supplied for the home has been reviewed.",
        },
      ]}
    />
  );
}
