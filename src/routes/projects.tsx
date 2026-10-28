import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { IMAGES } from "@/lib/home-content";
import { H2, HomeConsultation } from "@/components/home/NordicHome";
import { RefTag, imgProps } from "@/components/home/shared";

const DESCRIPTION =
  "The useful part of a project story is not a polished image by itself. It is the brief, the decisions, the work completed, the evidence available and what another homeowner can learn from the result.";

const HERO = IMAGES.poolRender.src;

// Nordic Green Design renders and design work only. Real Nordic project stories replace these once approved.
const GALLERY = Object.values(IMAGES);

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Projects | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: HERO },
      { name: "twitter:image", content: HERO },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div>
      <PageHeader
        image={HERO}
        imageAlt={IMAGES.poolRender.alt}
        eyebrow="Projects"
        title="Projects, documented properly"
        description={DESCRIPTION}
      />

      <section className="py-24 sm:py-28">
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={H2}>What a useful project story shows</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A useful project story explains the brief, the site context, the work completed, the
              decisions made and the evidence available. Client words and images should appear only
              with permission and clear attribution.
            </p>
          </div>

          {/* Masonry via CSS columns — keeps each photo's native aspect ratio. */}
          <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {GALLERY.map((image) => (
              <div
                key={image.src}
                className="relative mb-4 break-inside-avoid overflow-hidden rounded-lg bg-muted"
              >
                <img
                  {...imgProps(image, "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw")}
                  loading="lazy"
                  className="w-full"
                />
                <RefTag image={image} className="left-3 top-3" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeConsultation />
    </div>
  );
}
