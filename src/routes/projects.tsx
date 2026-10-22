import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { PROJECT_PHOTOS, projectPhoto } from "@/lib/home-content";
import { H2, HomeConsultation } from "@/components/home/NordicHome";

const DESCRIPTION =
  "The useful part of a project story is not a polished image by itself. It is the brief, the decisions, the work completed, the evidence available and what another homeowner can learn from the result.";

const HERO = projectPhoto("MKPhoto-1821-1.jpg");

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
        imageAlt="Completed home project (reference image)"
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
            {PROJECT_PHOTOS.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Project photo ${i + 1} (reference image)`}
                loading="lazy"
                className="mb-4 w-full break-inside-avoid rounded-lg bg-muted"
              />
            ))}
          </div>
        </div>
      </section>

      <HomeConsultation />
    </div>
  );
}
