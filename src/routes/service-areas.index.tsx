import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { H3, HomeConsultation, RefImg } from "@/components/home/NordicHome";
import { SERVICE_AREAS, PHOTOS } from "@/lib/home-content";

export const Route = createFileRoute("/service-areas/")({
  head: () => ({
    meta: [
      { title: "Service Areas | Nordic Green Homes" },
      { property: "og:title", content: "Service Areas | Nordic Green Homes" },
      { property: "og:image", content: PHOTOS.barStone.src },
      { name: "twitter:image", content: PHOTOS.barStone.src },
    ],
  }),
  component: ServiceAreasPage,
});

function ServiceAreasPage() {
  return (
    <div>
      <PageHeader
        image={PHOTOS.barStone.src}
        imageAlt={PHOTOS.barStone.alt}
        title="Service Areas"
      />

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
