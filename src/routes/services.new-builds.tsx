import { createFileRoute } from "@tanstack/react-router";
import { BRAND, ASSETS } from "@/lib/content-data";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, ShieldCheck, Flame, Wind, Sun } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const Route = createFileRoute("/services/new-builds")({
  head: () => ({
    meta: [
      { title: "New Builds & Custom Homes | Nordic Green Homes" },
      {
        name: "description",
        content:
          "High-performance custom homes for British Columbia families. Careful envelope detailing, balanced ventilation and refined architectural design — internal pilot.",
      },
      { property: "og:title", content: "New Builds & Custom Homes | Nordic Green Homes" },
      {
        property: "og:description",
        content:
          "Custom home construction led by Lane O'Brien — internal pilot, details pending confirmation.",
      },
      { property: "og:image", content: ASSETS.newBuild },
      { name: "twitter:image", content: ASSETS.newBuild },
    ],
  }),
  component: NewBuildsPage,
});

function NewBuildsPage() {
  return (
    <div>
      <PageHeader
        image={ASSETS.newBuild}
        imageAlt="High-performance custom home exterior with timber and stone detailing (reference image)"
        eyebrow="New Builds · Draft"
        title="High-Performance Custom Homes Built to Last"
        description="We design and craft high-performance forever homes with careful envelope detailing and refined architectural design. Led by Lane O'Brien, the team delivers considered comfort and enduring beauty. Licensing, certification and performance claims are pending confirmation."
      >
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="px-6 py-3 rounded-md bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors shadow"
          >
            {BRAND.primaryCtaText}
          </Link>
          <Link
            to="/process"
            className="px-6 py-3 rounded-md bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors border border-white/20"
          >
            Explore Build Process
          </Link>
        </div>
      </PageHeader>

      {/* Main Narrative & Building Science */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Building Science &amp; Craftsmanship
              </span>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-foreground">
                How We Approach Your Custom New Build
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground text-base leading-relaxed">
                <p>
                  Every custom home begins with a deep exploration of your family's daily lifestyle,
                  the nuances of your building site, and your long-term energy goals. We don't take
                  shortcuts on the building envelope.
                </p>
                <p>
                  Your home is designed from the foundation up as a balanced system. By paying
                  attention to airtightness, continuous insulation, and balanced mechanical
                  ventilation, we aim to reduce drafts, cold spots, and excessive utility bills.
                </p>
                <p>
                  Throughout construction, Lane works directly with you and your design team to keep
                  material selections, budgeting, and milestone timelines transparent.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <Flame className="w-5 h-5 text-emerald-600 mb-2" />
                  <h3 className="font-semibold text-sm text-foreground">Thermal Envelope</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Continuous exterior insulation &amp; efficient glazing to limit heat loss.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <Wind className="w-5 h-5 text-emerald-600 mb-2" />
                  <h3 className="font-semibold text-sm text-foreground">Continuous Fresh Air</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Balanced ventilation for filtered, fresher indoor air.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <Sun className="w-5 h-5 text-emerald-600 mb-2" />
                  <h3 className="font-semibold text-sm text-foreground">Solar Orientation</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Passive solar considerations and roof design that can support solar later.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
                  <h3 className="font-semibold text-sm text-foreground">Quality Assurance</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Careful inspection and verification through construction.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-lg overflow-hidden border border-border shadow-md">
                <img
                  src={ASSETS.newBuild}
                  alt="Custom high-performance home exterior in Fraser Valley (reference image)"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 p-4 rounded-lg bg-muted text-xs text-muted-foreground border border-dashed border-gold bg-gold/5">
                <span className="font-semibold text-foreground">Reference image. </span>
                Shown for layout and style review only. Not confirmed as completed Nordic Green
                Homes work.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Step Custom Home Path */}
      <section className="py-16 bg-muted/40 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Disciplined Execution
            </span>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Stages of a Custom Home Build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Feasibility & Vision",
                desc: "Site orientation, zoning constraints, budget alignment, and sustainability goals.",
              },
              {
                step: "02",
                title: "Design & Permitting",
                desc: "Architectural drawings, structural engineering, and municipal permit processing.",
              },
              {
                step: "03",
                title: "Envelope & Framing",
                desc: "Precision framing, airtight membrane, and high-performance insulation.",
              },
              {
                step: "04",
                title: "Finishes & Handover",
                desc: "Custom cabinetry, bespoke finishes, blower-door verification, and comprehensive walkthrough.",
              },
            ].map((st) => (
              <div key={st.step} className="bg-card p-6 rounded-lg border border-border shadow-2xs">
                <span className="text-2xl font-serif font-bold text-emerald-700/60">{st.step}</span>
                <h3 className="font-serif text-base font-semibold text-foreground mt-2">
                  {st.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
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
