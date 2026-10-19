import { createFileRoute } from "@tanstack/react-router";
import { BRAND, PROJECTS_GALLERY, ASSETS } from "@/lib/content-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Verified Projects Gallery | Nordic Green Homes" },
      {
        name: "description",
        content:
          "Explore verified home renovations, bathrooms, custom garages, and outdoor living projects completed by O'Brien Contracting Ltd. in Fraser Valley, BC.",
      },
      { property: "og:title", content: "Verified Projects Gallery | Nordic Green Homes" },
      {
        property: "og:description",
        content:
          "Real craftsmanship, genuine photography from O'Brien Contracting Ltd. in British Columbia.",
      },
      { property: "og:image", content: ASSETS.hero1 },
      { name: "twitter:image", content: ASSETS.hero1 },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div>
      <PageHeader
        image={ASSETS.hero1}
        imageAlt="Completed custom home project by O'Brien Contracting in the Fraser Valley, BC"
        eyebrow="Portfolio of Craftsmanship"
        title="Real Work, Real Homes"
        description="Every photo shown here is from completed projects by O'Brien Contracting Ltd. in Chilliwack, the Fraser Valley, and surrounding BC communities."
      />

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS_GALLERY.map((p) => (
              <div
                key={p.id}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 text-white text-[11px] font-medium backdrop-blur-xs">
                    {p.type}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{p.location}</span>
                    </div>
                    <h2 className="font-serif text-lg font-bold text-foreground">{p.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{p.status}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-16 bg-muted/50 border border-border rounded-xl p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Have a Project in Mind?
            </h3>
            <p className="mt-2 text-base text-muted-foreground max-w-lg mx-auto">
              Whether you're starting with bare land or renovating an existing home, let's explore
              your possibilities on a 15-minute call.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium shadow hover:bg-primary/90 transition-all"
              >
                <span>{BRAND.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
