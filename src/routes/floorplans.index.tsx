import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { H3, HomeConsultation, RefImg } from "@/components/home/NordicHome";
import { FLOORPLANS, IMAGES } from "@/lib/home-content";

export const Route = createFileRoute("/floorplans/")({
  head: () => ({
    meta: [
      { title: "Floorplans | Nordic Green Homes" },
      { property: "og:title", content: "Floorplans | Nordic Green Homes" },
      { property: "og:image", content: IMAGES.hausRear.src },
      { name: "twitter:image", content: IMAGES.hausRear.src },
    ],
  }),
  component: FloorplansPage,
});

function FloorplansPage() {
  return (
    <div>
      <PageHeader image={IMAGES.hausRear.src} imageAlt={IMAGES.hausRear.alt} title="Floorplans" />

      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {FLOORPLANS.map((p) => (
            <Link key={p.key} to={p.to} className="group flex flex-col">
              <RefImg image={p.image} className="aspect-[4/3] rounded-lg" />
              <h2 className={`mt-6 ${H3} group-hover:text-primary`}>{p.title}</h2>
            </Link>
          ))}
        </div>
      </section>

      <HomeConsultation />
    </div>
  );
}
