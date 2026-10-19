import { createFileRoute } from "@tanstack/react-router";
import { CinematicHome } from "@/components/home-2/CinematicHome";
import { ASSETS } from "@/lib/content-data";

const DESCRIPTION =
  "Nordic Green Homes — a cinematic look at sustainable craftsmanship for families who want more from their forever home. Custom homes, new builds and renovations.";

const TITLE = "Nordic Green Homes — Cinematic | Where Sustainability Meets Style";

export const Route = createFileRoute("/home-2")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      // Staging noindex — this is an unpublished internal pilot only.
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: ASSETS.hero1 },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ASSETS.hero1 },
    ],
    links: [{ rel: "canonical", href: "/home-2" }],
  }),
  component: HomeTwo,
});

function HomeTwo() {
  return <CinematicHome />;
}
