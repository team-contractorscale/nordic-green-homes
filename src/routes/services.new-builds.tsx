import { createFileRoute } from "@tanstack/react-router";
import { BRAND, ASSETS } from "@/lib/content-data";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, ShieldCheck, Flame, Wind, Sun } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const Route = createFileRoute("/services/new-builds")({
  head: () => ({
    meta: [
      { title: "Net-Zero Custom Homes & New Builds | Nordic Green Homes" },
      {
        name: "description",
        content:
          "High-performance custom homes in Fraser Valley, Kelowna & Victoria. Net-Zero trained building science, thermal comfort, and disciplined craftsmanship.",
      },
      { property: "og:title", content: "Net-Zero Custom Homes & New Builds | Nordic Green Homes" },
      {
        property: "og:description",
        content:
          "Discover our tailored custom home construction process led by Net-Zero trained builder Lane O'Brien.",
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
        imageAlt="High-performance custom home exterior with timber and stone detailing in the Fraser Valley"
        eyebrow="Net-Zero Custom Homes"
        title="High-Performance Custom Homes Built to Last"
        description="We engineer and craft high-performance forever homes that exceed standard building codes. Led by Lane O'Brien, a Net-Zero trained builder and Red Seal Journeyman Carpenter, we deliver measurable comfort, low energy demand, and enduring beauty."
      >
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="px-6 py-3 rounded-md bg-emerald-700 text-white font-medium text-sm hover:bg-emerald-600 transition-colors shadow"
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
                Building Science & Craftsmanship
              </span>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-foreground">
                How We Approach Your Custom New Build
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Every custom home begins with a deep exploration of your family's daily lifestyle,
                  the nuances of your building site, and your long-term energy goals. We don't take
                  shortcuts on the building envelope.
                </p>
                <p>
                  With Lane O'Brien's Net-Zero training, your home is designed from the foundation
                  up as a balanced system. By optimizing airtightness, continuous insulation, and
                  balanced mechanical ventilation (HRV), we eliminate drafts, cold spots, and
                  excessive utility bills.
                </p>
                <p>
                  Throughout construction, Lane works directly with you and your design team to
                  ensure complete transparency in material selections, budgeting, and milestone
                  timelines.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <Flame className="w-5 h-5 text-emerald-600 mb-2" />
                  <h3 className="font-semibold text-sm text-foreground">Thermal Envelope</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Continuous exterior insulation & triple glazing preventing heat loss.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <Wind className="w-5 h-5 text-emerald-600 mb-2" />
                  <h3 className="font-semibold text-sm text-foreground">Continuous Fresh Air</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Dedicated heat recovery ventilation (HRV) for filtered, allergen-free air.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <Sun className="w-5 h-5 text-emerald-600 mb-2" />
                  <h3 className="font-semibold text-sm text-foreground">Solar Orientation</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Passive solar gain and roof design prepped for solar generation.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
                  <h3 className="font-semibold text-sm text-foreground">Green Mastery Assurance</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Verified airtightness testing and rigorous construction inspection.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-lg overflow-hidden border border-border shadow-md">
                <img
                  src={ASSETS.newBuild}
                  alt="Custom high-performance home exterior in Fraser Valley"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-4 p-4 rounded-lg bg-muted text-xs text-muted-foreground border border-border">
                <span className="font-semibold text-foreground">Source Project: </span>
                High-performance custom build executed by O'Brien Contracting Ltd. in Fraser Valley,
                BC.
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
                desc: "Precision framing by Red Seal carpenters, airtight membrane, and high-performance insulation.",
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
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
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
