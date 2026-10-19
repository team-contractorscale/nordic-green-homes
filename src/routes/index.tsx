import { createFileRoute } from "@tanstack/react-router";
import { IMAGES } from "@/lib/home-content";
import {
  HomeAssurance,
  HomeConsultation,
  HomeGuide,
  HomeHero,
  HomeIntro,
  HomePillars,
  HomeProcess,
  HomeProjects,
  HomeServices,
} from "@/components/home/NordicHome";

const DESCRIPTION =
  "Nordic Green Homes: sustainable craftsmanship for families who want more from their forever home. Custom homes, new builds and renovations.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nordic Green Homes | Where Sustainability Meets Style" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Nordic Green Homes | Where Sustainability Meets Style" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: IMAGES.hero.src },
      { name: "twitter:image", content: IMAGES.hero.src },
    ],
  }),
  component: Index,
});

// Section order: Ambient's structure (services → about → process → proof → assurance → guide →
// consultation) merged with the Web Template homepage rhythm. See DESIGN.md §3.
function Index() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <HomeServices />
      <HomePillars />
      <HomeProcess />
      <HomeAssurance />
      <HomeProjects />
      <HomeGuide />
      <HomeConsultation />
    </>
  );
}
