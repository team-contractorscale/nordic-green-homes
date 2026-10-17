import { createFileRoute } from "@tanstack/react-router";
import { BRAND, SERVICES, ASSETS } from "@/lib/content-data";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Building & Renovation Services | Nordic Green Homes" },
      {
        name: "description",
        content:
          "Discover our high-performance new builds, custom home design, whole-home renovations, and custom garage builds across Fraser Valley, Kelowna & Victoria.",
      },
      { property: "og:title", content: "Building & Renovation Services | Nordic Green Homes" },
      {
        property: "og:description",
        content:
          "High-performance net-zero builds and thoughtful renovations led by Lane O'Brien in British Columbia.",
      },
      { property: "og:image", content: ASSETS.hero2 },
      { name: "twitter:image", content: ASSETS.hero2 },
    ],
  }),
  component: ServicesOverviewPage,
});

function ServicesOverviewPage() {
  return (
    <div>
      {/* Header Banner */}
      <section className="bg-brand-dark text-white py-16 md:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            What We Do
          </span>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Services Built to Move Your Soul
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
            We manage every detail of your journey—from initial concept and site feasibility to
            final handover—ensuring disciplined craftsmanship and healthy, energy-efficient living.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.slug}
                className="bg-card rounded-lg border border-border shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
              >
                <div className="relative aspect-16/9 overflow-hidden bg-muted">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-foreground">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {service.shortDesc}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-foreground/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/60">
                    {service.slug === "new-builds" || service.slug === "home-renovations" ? (
                      <Link
                        to={`/services/${service.slug}` as any}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-emerald-700 transition-colors"
                      >
                        <span>Explore details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-emerald-700 transition-colors"
                      >
                        <span>Inquire about this build</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation CTA Banner */}
          <div className="mt-16 bg-muted/60 border border-border rounded-xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Ready to plan your next building project?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Connect directly with Lane O'Brien to review site feasibility, building goals, and
                budget expectations.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium text-sm shadow hover:bg-primary/90 transition-all shrink-0"
            >
              {BRAND.primaryCtaText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
