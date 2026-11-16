import { createFileRoute } from "@tanstack/react-router";
import { CinematicHome } from "@/components/home-2/CinematicHome";
import { IMAGES } from "@/lib/home-content";

const TITLE = "Nordic Green Homes | The Nordic Green Story";
const DESCRIPTION =
  "A cinematic look at sustainable luxury custom homes in British Columbia — design, materials, comfort and long-term thinking, considered together.";

export const Route = createFileRoute("/home-2")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      // Alternate design variant — keep it out of the index to avoid competing with /.
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: IMAGES.hero.src },
      { name: "twitter:image", content: IMAGES.hero.src },
    ],
  }),
  component: CinematicHome,
});
