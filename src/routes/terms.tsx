import { createFileRoute } from "@tanstack/react-router";
import { BRAND } from "@/lib/content-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Placeholder } from "@/components/home/NordicHome";
import { PLACEHOLDER, projectPhoto } from "@/lib/home-content";

const HEADER_IMAGE = projectPhoto("144076210_1946069355535648_3573319870902758670_n.jpg");

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
      { property: "og:image", content: HEADER_IMAGE },
      { name: "twitter:image", content: HEADER_IMAGE },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div>
      <PageHeader
        image={HEADER_IMAGE}
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
              <strong className="text-foreground">Last updated:</strong> [CLIENT TO CONFIRM:
              effective date]
            </p>
            <p>
              These terms apply to your use of this website, operated by {BRAND.name}. By using the
              website, you agree to them.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Who we are</h2>
            <p>
              {BRAND.name} operates this website. The exact legal-entity wording and any
              relationship to {BRAND.sourceCompany} are pending client confirmation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Placeholder>{PLACEHOLDER.legalEntity}</Placeholder>
              <Placeholder>{PLACEHOLDER.relationship}</Placeholder>
            </div>
            <p>
              Contact us at{" "}
              <a
                href={`mailto:${PLACEHOLDER.email}`}
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {PLACEHOLDER.email}
              </a>{" "}
              or{" "}
              <a
                href={`tel:${PLACEHOLDER.phone.replace(/[^\d+]/g, "")}`}
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {PLACEHOLDER.phone}
              </a>{" "}
              with any questions about these terms.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Using this website
            </h2>
            <p>
              This website gives general information about our building services, custom homes,
              garden suites, renovations and past projects, and lets you contact us. Nothing on it
              is an offer or a contract. You agree to use the website only for lawful purposes.
            </p>
            <p>
              The information is general in nature and is not building, design, engineering,
              planning, legal or financial advice for your project. What applies to your project —
              including permits, site requirements and costs — depends on its details and is
              confirmed during the design and pricing process.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Estimates and pricing
            </h2>
            <p>
              Any price range shown by our online estimate tool is an indicative figure based only
              on the answers you give. It is not a quote, a contract or a guarantee of final cost.
            </p>
            <p>
              Pricing for your project is only set out in a written quote and contract with{" "}
              {BRAND.name}. Where a fixed-price contract is agreed, that contract sets out what is
              included and what you will pay.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              House plans, brochures and images
            </h2>
            <p>
              House plans, floor plans and brochures on this website are provided for your personal
              information when considering a build with {BRAND.name}. They remain the property of{" "}
              {BRAND.name} or its design partners and may not be copied, altered or used to build
              without our written agreement.
            </p>
            <p>
              Floor areas, dimensions, room counts and other specifications are indicative. Plans
              can be adapted to suit your site and needs, and final details are confirmed in the
              agreed design. Renders and artist's impressions are illustrative, and items shown in
              images — such as decks, landscaping, furniture and finishes — may not be included.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Projects and reviews
            </h2>
            <p>
              Project descriptions, photos and client reviews show past work. Every project is
              different, and they are not a promise of a particular result, timeframe or cost for
              your project.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Links to other websites
            </h2>
            <p>
              This website links to websites run by others, such as municipalities, government
              agencies and partners. We are not responsible for their content, accuracy or privacy
              practices.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Intellectual property
            </h2>
            <p>
              The content of this website — including text, photos, plans, graphics and logos —
              belongs to {BRAND.name} or its licensors and may not be reproduced or used without
              permission, except for viewing and personal, non-commercial use.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Liability</h2>
            <p>
              We take reasonable care to keep this website accurate and up to date, but we do not
              guarantee that it is complete, current or free of errors. To the extent permitted by
              law, {BRAND.name} is not liable for any loss arising from your use of this website or
              your reliance on its general information.
            </p>
            <p>
              Nothing in these terms limits any rights you have under applicable consumer protection
              laws where those laws apply.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Privacy</h2>
            <p>
              How we handle personal information submitted through this website is explained in our{" "}
              <a
                href="/privacy"
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Governing law</h2>
            <p>
              These terms are governed by the laws of the Province of British Columbia and the
              federal laws of Canada applicable therein, and the British Columbia courts have
              jurisdiction.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Updates</h2>
            <p>
              We may update these terms from time to time. The latest version will be published on
              this page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
