import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { H3, HomeConsultation, RefImg } from "@/components/home/NordicHome";
import { SERVICES, PHOTOS } from "@/lib/home-content";

const DESCRIPTION = "Find the right starting point for your home";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Services | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: PHOTOS.shopSide.src },
      { name: "twitter:image", content: PHOTOS.shopSide.src },
    ],
  }),
  component: ServicesOverviewPage,
});

function ServicesOverviewPage() {
  return (
    <div>
      <PageHeader
        image={PHOTOS.shopSide.src}
        imageAlt={PHOTOS.shopSide.alt}
        eyebrow="What we build"
        title="Find the right starting point for your home"
      />

      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link key={s.key} to={s.to} className="group flex flex-col">
              <RefImg image={s.image} className="aspect-[4/5] rounded-lg" />
              <h2 className={`mt-6 ${H3}`}>{s.title}</h2>
              <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">
                {s.body}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-base font-bold text-primary underline underline-offset-4">
                {s.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <HomeConsultation />
    </div>
  );
}
