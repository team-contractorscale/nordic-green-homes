import { createFileRoute } from "@tanstack/react-router";
import { BRAND, ASSETS } from "@/lib/content-data";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, ShieldCheck, Home, Sparkles } from "lucide-react";

export const Route = createFileRoute("/services/home-renovations")({
  head: () => ({
    meta: [
      { title: "Home Renovations & Transformations | Nordic Green Homes" },
      {
        name: "description",
        content: "Whole-home, kitchen, and bathroom renovations in Chilliwack, Fraser Valley, Kelowna & Victoria. RenoMark standards, clean craftsmanship, and thermal upgrades.",
      },
      { property: "og:title", content: "Home Renovations & Transformations | Nordic Green Homes" },
      {
        property: "og:description",
        content: "Elevate your existing home with disciplined craftsmanship, energy-conscious upgrades, and luxury finishes.",
      },
      { property: "og:image", content: ASSETS.houseRenovation },
      { name: "twitter:image", content: ASSETS.houseRenovation },
    ],
  }),
  component: HomeRenovationsPage,
});

function HomeRenovationsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-brand-dark text-white py-20 border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium tracking-wide uppercase mb-4">
              RenoMark™ Certified Standards
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Transform Your Home With Craftsmanship & Certainty
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
              Whether modernizing an outdated kitchen, re-imagining a primary bath sanctuary, or undertaking a whole-home transformation, we combine disciplined carpentry with sustainable materials to make your home feel new again.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-md bg-emerald-700 text-white font-medium text-sm hover:bg-emerald-600 transition-colors shadow"
              >
                {BRAND.primaryCtaText}
              </Link>
              <Link
                to="/projects"
                className="px-6 py-3 rounded-md bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors border border-white/20"
              >
                View Renovation Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Renovation Pillars */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Renovation Philosophy
              </span>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-foreground">
                Upgrading Function, Comfort, and Efficiency
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Renovating an existing home requires deep technical care: uncovering historical framing quirks, improving insulation where it counts, and respecting your budget and living comfort.
                </p>
                <p>
                  As an active RenoMark member, we abide by a strict Code of Conduct: transparent pricing, written warranties, proof of liability and WCB insurance, and honest communication from start to finish.
                </p>
                <p>
                  In collaboration with interior design partner Nordic Green Design, we ensure every tile selection, custom cabinet, and lighting plan works in harmony.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Complete kitchen & bathroom overhauls with custom cabinetry",
                  "Structural wall removals and open-concept living space redesigns",
                  "Air sealing and insulation upgrades to eliminate cold drafts",
                  "Direct daily communication with Lane O'Brien",
                  "Tidy worksites and respect for your family's home environment",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden border border-border shadow-md">
                <img
                  src={ASSETS.houseRenovation}
                  alt="Modern whole-home renovation in Fraser Valley"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-4 rounded-lg bg-muted text-xs text-muted-foreground border border-border">
                <span className="font-semibold text-foreground">Source Renovation: </span>
                Real transformation completed by O'Brien Contracting Ltd. in Fraser Valley, BC.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-muted/40 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Planning a Renovation in the Fraser Valley or Vancouver Island?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
            Discuss your scope, timing, and ideas with Lane to get transparent guidance before committing to designs or demolition.
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
      </section>
    </div>
  );
}
