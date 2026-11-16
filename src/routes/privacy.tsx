import { createFileRoute } from "@tanstack/react-router";
import { BRAND } from "@/lib/content-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { COMPANY, IMAGES } from "@/lib/home-content";

const HEADER_IMAGE = IMAGES.hausRear.src;

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Nordic Green Homes" },
      {
        name: "description",
        content:
          "How Nordic Green Homes Inc. collects, uses and protects personal information, including website enquiries and your privacy choices.",
      },
      { property: "og:title", content: "Privacy Policy | Nordic Green Homes" },
      {
        property: "og:description",
        content:
          "How Nordic Green Homes Inc. collects, uses and protects personal information, including website enquiries and your privacy choices.",
      },
      { property: "og:image", content: HEADER_IMAGE },
      { name: "twitter:image", content: HEADER_IMAGE },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div>
      <PageHeader
        image={HEADER_IMAGE}
        imageAlt={IMAGES.hausRear.alt}
        eyebrow="Legal"
        title="Privacy Policy"
        description="Effective 28 October 2026. How we collect, use and protect your personal information."
      />
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-base text-foreground/80 leading-relaxed">
            <p>
              <strong className="text-foreground">Effective date:</strong> 28 October 2026
            </p>
            <p>
              {COMPANY.legalEntity} operates nordicgreenhomes.ca. This policy explains how we handle
              personal information collected through our website and related enquiries.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Who we are</h2>
            <p>
              {COMPANY.legalEntity} operates nordicgreenhomes.ca. This policy explains how we handle
              personal information collected through our website and related enquiries.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Information we collect
            </h2>
            <p>
              When you contact us or use an enquiry or estimate tool, we collect the information you
              provide. This may include your name, email address, telephone number, project
              location, project type, proposed timing, budget and answers about your plans or
              property. Please provide only information relevant to your enquiry.
            </p>
            <p>
              Website services may also collect technical information, such as your IP address,
              browser information, pages visited, referring website and campaign identifiers
              associated with your visit.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              How we use information
            </h2>
            <p>
              We use personal information to respond to enquiries, discuss your project, provide
              information or services you request, manage our communications and maintain website
              security. Referral and campaign information helps us understand where enquiries
              originate.
            </p>
            <p>
              Any optional marketing communications are handled separately from your project
              enquiry. You can ask us to stop marketing communications using the unsubscribe option
              provided or by contacting us.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Cookies and browser storage
            </h2>
            <p>
              Cookies and similar browser storage may support website features, remember estimate
              progress and associate an enquiry with its referral or advertising source. Your
              browser also connects to services that deliver website features, fonts and images.
            </p>
            <p>
              You can manage cookies and stored website data through your browser settings.
              Restricting storage may affect some features. Any additional choices offered through
              the website apply to the relevant optional tracking.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Sharing and processing
            </h2>
            <p>
              Authorised personnel and service providers may handle information to deliver website
              hosting, enquiry management, customer relationship management, communications and
              website support. Sharing is limited to the relevant purpose, your consent, or
              circumstances permitted or required by law.
            </p>
            <p>
              Some service providers may store or process information outside Canada. Information
              processed in another country may be subject to that country's laws and lawful access
              requirements.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Retention and security
            </h2>
            <p>
              We retain personal information for as long as reasonably needed for the purposes
              described above and applicable legal or business requirements. When retention is no
              longer necessary, information is securely destroyed or de-identified, subject to
              applicable retention obligations.
            </p>
            <p>
              We use reasonable safeguards appropriate to the information's sensitivity. No internet
              transmission or storage system can be guaranteed completely secure.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Your choices, access and concerns
            </h2>
            <p>
              You may request access to your personal information, request correction, or withdraw
              consent where applicable. We may need to verify your identity. Legal restrictions or
              retention requirements may affect what we can provide or delete; withdrawing consent
              may also affect services we can offer.
            </p>
            <p>
              Please contact us first with privacy questions or complaints. You may also contact the
              Office of the Information and Privacy Commissioner for British Columbia at{" "}
              <a
                href="https://www.oipc.bc.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                oipc.bc.ca
              </a>
              .
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Privacy contact</h2>
            <p>
              Attention: Privacy Officer, {COMPANY.legalEntity}
              <br />
              Email:{" "}
              <a
                href={`mailto:${COMPANY.email}`}
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {COMPANY.email}
              </a>
              <br />
              Telephone:{" "}
              <a
                href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {COMPANY.phone}
              </a>
              <br />
              Address: {COMPANY.address}
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Updates</h2>
            <p>
              We may update this policy to reflect changes in our practices or legal requirements.
              The effective date above identifies the current version. Where required, we will
              provide additional notice or obtain consent for a new use of personal information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
