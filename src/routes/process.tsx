import { createFileRoute } from "@tanstack/react-router";
import { BRAND, PROCESS_STEPS, ASSETS } from "@/lib/content-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Building Process | Nordic Green Homes" },
      {
        name: "description",
        content:
          "A clear construction process from initial consultation to final walkthrough and ongoing care. Work directly with Lane O'Brien — internal pilot.",
      },
      { property: "og:title", content: "Our Building Process | Nordic Green Homes" },
      {
        property: "og:description",
        content:
          "A clear path from first conversation to handover: consultation, design, materials, permits, pre-construction, construction, walkthrough and care.",
      },
      { property: "og:image", content: ASSETS.hero3 },
      { name: "twitter:image", content: ASSETS.hero3 },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <div>
      <PageHeader
        image={ASSETS.hero3}
        imageAlt="New-build home exterior under construction with timber framing and stone details (reference image)"
        eyebrow="How We Work · Draft"
        title="A Clear, Straightforward Approach"
        description="You work directly with Lane through each stage of the process. No hand-offs, no unexpected surprises. Licensing, certification and warranty wording are pending confirmation."
      />

      {/* 8 Process Steps Detailed */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-card border border-border rounded-xl p-8 shadow-xs hover:border-primary/40 transition-colors grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                <div className="md:col-span-2 flex items-center md:flex-col gap-3">
                  <span className="w-12 h-12 rounded-full bg-primary/10 text-primary font-serif font-bold text-xl flex items-center justify-center shrink-0 border border-primary/20">
                    {step.step}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    Step {step.step}
                  </span>
                </div>
                <div className="md:col-span-10">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Six Guarantees */}
          <div className="mt-20 pt-16 border-t border-border">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Our Standards
              </span>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-foreground">
                What You Can Expect Every Day On Site
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "On-Time Delivery",
                  desc: "Clear schedules with regular milestone status updates.",
                },
                {
                  title: "Open Communication",
                  desc: "Direct phone, email, and on-site access to Lane O'Brien throughout.",
                },
                {
                  title: "Dependable Service",
                  desc: "Licensing, insurance and trade memberships are pending confirmation.",
                },
                {
                  title: "Superior Craftsmanship",
                  desc: "Durable materials and a no-shortcuts approach to the build.",
                },
                {
                  title: "Personalised Designs",
                  desc: "Tailored to your family's daily rhythms, accessibility, and tastes.",
                },
                {
                  title: "Transparent Pricing",
                  desc: "Detailed breakdowns before construction with no unexpected hidden costs.",
                },
              ].map((g, idx) => (
                <div key={idx} className="p-6 rounded-lg bg-muted/40 border border-border">
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{g.title}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-primary text-primary-foreground font-medium text-sm shadow hover:bg-primary/90 transition-all"
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
