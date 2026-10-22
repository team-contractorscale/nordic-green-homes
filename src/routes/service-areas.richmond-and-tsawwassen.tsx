import { createFileRoute } from "@tanstack/react-router";
import { AreaPage } from "@/components/page/PageParts";
import { SERVICE_AREAS } from "@/lib/home-content";

const AREA = SERVICE_AREAS[1];

const DESCRIPTION =
  "Planning a new home or secondary dwelling in Richmond or Tsawwassen means starting with the specific property. Access, servicing, existing buildings, site conditions, local requirements and the way you want to use the home all affect the design conversation.";

export const Route = createFileRoute("/service-areas/richmond-and-tsawwassen")({
  head: () => ({
    meta: [
      { title: "Richmond and Tsawwassen | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Richmond and Tsawwassen | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: AREA.image.src },
      { name: "twitter:image", content: AREA.image.src },
    ],
  }),
  component: RichmondTsawwassenPage,
});

function RichmondTsawwassenPage() {
  return (
    <AreaPage
      title={AREA.title}
      headline="Start with the property and the brief"
      description={DESCRIPTION}
      note="Bring the address and the decisions you have already made. The early discussion can identify what needs to be checked before you invest in detailed plans."
      image={AREA.image}
      lists={[
        {
          title: "What to prepare",
          intro:
            "Share any survey, site plan, existing drawings or property information you have. Explain the spaces you need, how the household will use them and any comfort, efficiency or material priorities.",
          outro:
            "Coverage and project suitability depend on the property, written scope and local requirements. This page does not promise a permit outcome, local expertise or a particular delivery area.",
        },
        {
          title: "Make the next decision clearer",
          intro:
            "Use the first conversation to separate the brief from the assumptions. Confirm which questions belong to the property, which require professional advice and which decisions may affect scope, cost or timing.",
        },
      ]}
    />
  );
}
