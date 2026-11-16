import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { COMPANY, IMAGES } from "@/lib/home-content";

const HEADER_IMAGE = IMAGES.hausRear.src;

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Website Terms of Use | Nordic Green Homes" },
      {
        name: "description",
        content:
          "Terms for using the Nordic Green Homes website, including estimates, plans, images, intellectual property and project information.",
      },
      { property: "og:title", content: "Website Terms of Use | Nordic Green Homes" },
      {
        property: "og:description",
        content:
          "Terms for using the Nordic Green Homes website, including estimates, plans, images, intellectual property and project information.",
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
        imageAlt={IMAGES.hausRear.alt}
        eyebrow="Legal"
        title="Website Terms of Use"
        description="Effective 28 October 2026. The terms that govern your use of nordicgreenhomes.ca."
      />
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-base text-foreground/80 leading-relaxed">
            <p>
              <strong className="text-foreground">Effective date:</strong> 28 October 2026
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">About these terms</h2>
            <p>
              These terms apply to nordicgreenhomes.ca, operated by {COMPANY.legalEntity}. They
              concern use of the website, not the terms of a construction or design contract.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Website information
            </h2>
            <p>
              The website provides general information to help you explore and plan a possible
              project. It is not project-specific building, engineering, planning, legal or
              financial advice. Site conditions, municipal requirements, design decisions and the
              agreed scope must be assessed for your individual project.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Estimates and project agreements
            </h2>
            <p>
              Online estimates and price ranges are preliminary planning information based on the
              information supplied and the assumptions explained with the estimate. They are not a
              quotation, offer to build, fixed-price agreement or guarantee of final cost.
            </p>
            <p>
              Project scope, inclusions, exclusions, price, payment terms, schedule and
              responsibilities are established through the applicable written agreement with the
              contracting entity identified in that agreement. Submitting a website enquiry does not
              create a construction or design contract.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Plans, images and project examples
            </h2>
            <p>
              Plans and concept drawings are provided for information, not as approved construction
              documents. Dimensions, specifications and illustrated features must be checked against
              the final project documents. Renders and concept images are illustrative and may show
              optional features or items outside a project's agreed scope.
            </p>
            <p>
              Project descriptions, testimonials and performance discussions are specific to their
              stated context. They do not guarantee the same cost, programme, performance or
              certification for another project. Refer to the stated credits and project roles;
              material shown on this website should not be assumed to be work performed solely by{" "}
              {COMPANY.legalEntity}.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Intellectual property and acceptable use
            </h2>
            <p>
              Website materials remain subject to the rights of their respective owners and
              licensors. Viewing a plan or downloading information does not grant permission to
              reproduce, modify, distribute or build from it. Obtain the necessary written
              permission or licence from the relevant rights holder.
            </p>
            <p>
              Use the website lawfully. Do not attempt unauthorised access, interfere with its
              operation or submit malicious or misleading material.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              External links and website availability
            </h2>
            <p>
              Third-party websites are governed by their own terms and privacy practices. We do not
              control their content. Website information may change, and uninterrupted availability
              or error-free content cannot be guaranteed. Contact us to confirm information
              important to your project.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Your legal rights and privacy
            </h2>
            <p>
              Nothing in these terms excludes rights or protections that cannot lawfully be
              excluded. Personal information is handled as described in our{" "}
              <a
                href="/privacy"
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p>
            <p>
              These terms are governed by the laws of British Columbia and the federal laws of
              Canada applicable there, subject to any mandatory protections that apply to you.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Contact and updates
            </h2>
            <p>
              {COMPANY.legalEntity}
              <br />
              <a
                href={`mailto:${COMPANY.email}`}
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {COMPANY.email}
              </a>{" "}
              |{" "}
              <a
                href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {COMPANY.phone}
              </a>
              <br />
              {COMPANY.address}
            </p>
            <p>
              We may update these website terms. The effective date above identifies the current
              version. Website updates do not amend an existing signed project agreement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
