import { acceptedMetadata } from "@/lib/accepted-metadata";
import { createFileRoute } from "@tanstack/react-router";
import { ConceptPage } from "@/components/floorplans/ConceptPage";
import { FLOORPLANS } from "@/lib/home-content";

// Copy: client-supplied Nordic Haus content (2026-11-04); SEO from the 3 November manifest.
const PLAN = FLOORPLANS[0];
const TITLE = "Nordic Haus Home Concept | Nordic Green Homes";
const DESCRIPTION =
  "Explore Nordic Haus as a home concept. Review site fit, design information, responsibilities and permitted use before relying on a plan.";

export const Route = createFileRoute("/floorplans/nordic-haus")({
  head: () => ({
    meta: [
      ...acceptedMetadata("/floorplans/nordic-haus"),
      { property: "og:image", content: PLAN.image.src },
      { name: "twitter:image", content: PLAN.image.src },
    ],
  }),
  component: NordicHausPage,
});

function NordicHausPage() {
  return (
    <ConceptPage
      index={1}
      name={PLAN.title}
      headline="A calm starting point for a custom home"
      intro="Nordic Haus is a concept for discussing the shape and feel of a home before the details are fixed. Use the plan as a starting point for questions about how the rooms connect, how the home sits on the property and what needs to change for your household."
      note="The concept is not a promise that the layout suits your site or can be built at a particular price. Site conditions, local requirements, structural design, services and your brief all affect the final result."
      gallery={PLAN.gallery}
      credits={[
        { label: "Interior design", value: "Nordic Green Design" },
        { label: "Drafting", value: "Bronson Design" },
      ]}
      sections={[
        {
          title: "Make the concept yours",
          paragraphs: [
            "Start with the way you live. Which spaces need privacy? Where do you want morning light? How much storage, flexibility or connection to the outdoors do you need?",
            "From there, review the plan with the property in mind. Access, orientation, setbacks, topography, servicing and approvals may all change the design.",
          ],
        },
        {
          title: "Inside Nordic Haus",
          paragraphs: [
            "Nordic Haus has a calm, Nordic/Scandinavian feel: warm wood tones, a fireplace and private gardens. The main living area has 10-foot ceilings and large windows. The upper-floor concept allows for vaulted ceilings.",
            "A biophilic garden wraps around the main living area, bringing the outdoors closer to everyday life.",
          ],
        },
        {
          title: "Plan at a glance",
          paragraphs: [
            "A coach house above the garage is a possibility to explore, subject to the property, design, servicing and local approvals. It is not an approved dwelling or a promise of rental income.",
          ],
          list: [
            "Style: Nordic/Scandinavian",
            "Size: 2,580 sq ft, excluding the garage",
            "Bedrooms: 4, all on the second floor",
            "Bathrooms: 2.5 (2 full upstairs, 1 half on the main floor)",
            "Garage: detached two-car garage",
          ],
        },
        {
          title: "Floorplan features",
          paragraphs: [],
          list: [
            "Biophilic garden",
            "Open-concept main floor",
            "Three secondary bedrooms with window seats",
            "Main suite with his and hers closets",
            "Ensuite with steam shower and soaker tub",
            "5' crawl space",
            "Covered rear patio",
            "Optional rooftop deck",
          ],
        },
        {
          title: "What to confirm before you choose a plan",
          paragraphs: [
            "Discuss site fit, the drawings you need and any changes before choosing a plan. The concept is not a construction quote or a verified building-performance result.",
          ],
          list: [
            "The current dimensions and specifications.",
            "Which drawings or files are included.",
            "What may be changed for the site and brief.",
            "Who owns the plan and imagery.",
            "Which design, approval and construction services are available.",
          ],
        },
      ]}
    />
  );
}
