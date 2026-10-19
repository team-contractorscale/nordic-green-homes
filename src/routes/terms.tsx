import { createFileRoute } from "@tanstack/react-router";
import { BRAND, ASSETS } from "@/lib/content-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Placeholder } from "@/components/home/NordicHome";
import { PLACEHOLDER } from "@/lib/home-content";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions (Draft) | Nordic Green Homes" },
      {
        name: "description",
        content:
          "Draft terms for the unpublished Nordic Green Homes internal pilot. Not client-approved or in use.",
      },
      { property: "og:title", content: "Terms & Conditions (Draft) | Nordic Green Homes" },
      {
        property: "og:description",
        content:
          "Draft terms for the internal Nordic Green Homes pilot — not approved or published.",
      },
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
        imageAlt="Architectural exterior of a sustainable Nordic Green custom home (reference image)"
        eyebrow="Legal · Draft"
        title="Terms & Conditions"
        description="Draft only — last updated January 2026. This internal pilot is unpublished and these terms are not client-approved or in use."
      />
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-dashed border-gold bg-gold/5 p-5 mb-8">
            <Placeholder>
              [Draft only — legal wording for Nordic Green Homes is pending; do not treat as
              approved terms.]
            </Placeholder>
          </div>

          <div className="space-y-6 text-base text-foreground/80 leading-relaxed">
            <p>
              These are draft terms for the internal {BRAND.name} pilot website. They have not been
              reviewed, approved, or published. The affiliation wording, legal entity and contact
              details below are placeholders pending client confirmation.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Construction Contracts
            </h2>
            <p>
              Any formal residential building or renovation engagement would require an executed
              written construction contract outlining exact specifications, schedules, engineering
              sign-offs, and payment milestones. Nothing on this draft pilot site constitutes a
              binding offer.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Intellectual Property & Imagery
            </h2>
            <p>
              Project photography, logos, floorplan designs and branding shown on this pilot are
              used for internal evaluation only and remain the property of their respective owners.
              Project images are reference material pending attribution and usage approval — they
              are not presented as completed Nordic Green Homes work.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Legal Entity & Affiliation
            </h2>
            <p>
              The legal-entity wording for {BRAND.name}, and any relationship to{" "}
              {BRAND.sourceCompany}, is pending client confirmation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Placeholder>{PLACEHOLDER.legalEntity}</Placeholder>
              <Placeholder>{PLACEHOLDER.relationship}</Placeholder>
            </div>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Governing Law</h2>
            <p>
              The final terms would be governed by the laws of the Province of British Columbia and
              the federal laws of Canada applicable therein.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
