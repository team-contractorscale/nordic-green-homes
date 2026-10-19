import { createFileRoute } from "@tanstack/react-router";
import { BRAND, ASSETS } from "@/lib/content-data";
import { PageHeader } from "@/components/layout/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Nordic Green Homes" },
      {
        name: "description",
        content: "Terms and conditions for Nordic Green Homes pilot and O'Brien Contracting Ltd.",
      },
      { property: "og:title", content: "Terms & Conditions | Nordic Green Homes" },
      { property: "og:description", content: "Terms and conditions for Nordic Green Homes." },
      { property: "og:image", content: ASSETS.hero2 },
      { name: "twitter:image", content: ASSETS.hero2 },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div>
      <PageHeader
        image={ASSETS.hero2}
        imageAlt="Architectural exterior of a sustainable Nordic Green custom home"
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Last updated January 2026 — terms for the Nordic Green Homes internal preview website."
      />
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-sm text-foreground/80 leading-relaxed">
            <p>
              Welcome to the internal preview website for {BRAND.name}, developed in affiliation
              with {BRAND.sourceCompany}. By accessing this site, you acknowledge that content and
              specifications presented are for informational and conceptual evaluation.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Construction Contracts
            </h2>
            <p>
              Any formal residential building or renovation engagement requires an executed written
              construction contract outlining exact specifications, schedules, engineering
              sign-offs, and payment milestones. Information on this website does not constitute a
              binding unilateral offer.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Intellectual Property & Imagery
            </h2>
            <p>
              All project photography, logos, floorplan designs, and branding remain the property of{" "}
              {BRAND.sourceCompany} and {BRAND.name}.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the Province
              of British Columbia and the federal laws of Canada applicable therein.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
