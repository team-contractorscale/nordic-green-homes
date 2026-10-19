import { createFileRoute } from "@tanstack/react-router";
import { BRAND, ASSETS } from "@/lib/content-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Placeholder } from "@/components/home/NordicHome";
import { PLACEHOLDER } from "@/lib/home-content";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy (Draft) | Nordic Green Homes" },
      {
        name: "description",
        content:
          "Draft privacy policy for the unpublished Nordic Green Homes internal pilot. Not client-approved or in use.",
      },
      { property: "og:title", content: "Privacy Policy (Draft) | Nordic Green Homes" },
      {
        property: "og:description",
        content:
          "Draft privacy policy for the internal Nordic Green Homes pilot — not approved or published.",
      },
      { property: "og:image", content: ASSETS.hero3 },
      { name: "twitter:image", content: ASSETS.hero3 },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div>
      <PageHeader
        image={ASSETS.hero3}
        imageAlt="Architectural exterior of a sustainable Nordic Green custom home (reference image)"
        eyebrow="Legal · Draft"
        title="Privacy Policy"
        description="Draft only — last updated January 2026. This internal pilot is unpublished and this policy is not client-approved or in use."
      />
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-dashed border-gold bg-gold/5 p-5 mb-8">
            <Placeholder>
              [Draft only — legal wording for Nordic Green Homes is pending; do not treat as an
              approved policy.]
            </Placeholder>
          </div>

          <div className="space-y-6 text-base text-foreground/80 leading-relaxed">
            <p>
              This is a draft privacy policy for the internal {BRAND.name} pilot website. It has not
              been reviewed, approved, or published, and does not govern any live customer data. The
              legal entity, contact details and wording below are placeholders pending client
              confirmation.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Information We Collect
            </h2>
            <p>
              When you request a discovery call, consultation, or download resources from this
              pilot, it may collect your name, phone number, email address, project location, and
              project parameters. In this unpublished preview, form submission is disabled and no
              data is sent to a live CRM.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              How Information Is Used
            </h2>
            <p>
              Information collected would be used only to evaluate a building or renovation inquiry,
              schedule a discovery call, provide requested resources, and communicate about project
              feasibility. The published policy will state that personal details are never sold,
              rented, or distributed to third parties for marketing.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Contact & Legal Entity
            </h2>
            <p>
              Contact details and the exact legal-entity wording for {BRAND.name} are pending client
              confirmation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Placeholder>{PLACEHOLDER.phone}</Placeholder>
              <Placeholder>{PLACEHOLDER.email}</Placeholder>
              <Placeholder>{PLACEHOLDER.legalEntity}</Placeholder>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
