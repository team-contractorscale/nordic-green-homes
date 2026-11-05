import { acceptedMetadata } from "@/lib/accepted-metadata";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { H3, HomeConsultation, RefImg } from "@/components/home/NordicHome";
import { SERVICE_AREAS, IMAGES } from "@/lib/home-content";

export const Route = createFileRoute("/service-areas/")({
  head: () => ({
    meta: [
      ...acceptedMetadata("/service-areas"),
      { property: "og:image", content: IMAGES.newBuilds.src },
      { name: "twitter:image", content: IMAGES.newBuilds.src },
    ],
  }),
  component: ServiceAreasPage,
});

function ServiceAreasPage() {
  return (
    <div>
      <PageHeader
        image={IMAGES.newBuilds.src}
        imageAlt={IMAGES.newBuilds.alt}
        title="Service Areas"
      />

      <section className="bg-background py-16">
        <div className="wrap space-y-6 text-lg">
          <p>
            We work with homeowners in Vancouver, West Vancouver, North Vancouver, Richmond,
            Tsawwassen and Vancouver Island.
          </p>
          <p>
            Your property and the way you want to live shape the conversation. Bring your plans,
            site information and priorities so we can discuss the design, access, services and
            approvals that matter to your project.
          </p>
          <p>
            Project suitability and delivery arrangements are agreed for the specific property and
            scope.
          </p>
        </div>
      </section>
      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_AREAS.map((a) => (
            <Link key={a.key} to={a.to} className="group flex flex-col">
              <RefImg image={a.image} className="aspect-[4/3] rounded-lg" />
              <h2 className={`mt-6 ${H3} group-hover:text-primary`}>{a.title}</h2>
            </Link>
          ))}
        </div>
      </section>

      <HomeConsultation />
    </div>
  );
}
