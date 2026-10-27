import { createFileRoute } from "@tanstack/react-router";
import { BRAND } from "@/lib/content-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Placeholder } from "@/components/home/NordicHome";
import { PLACEHOLDER, projectPhoto } from "@/lib/home-content";

const HEADER_IMAGE = projectPhoto("MKPhoto-1848-1.jpg");

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
              <strong className="text-foreground">Last updated:</strong> [CLIENT TO CONFIRM:
              effective date]
            </p>
            <p>
              This policy explains how {BRAND.name} collects, uses and protects personal information
              submitted through this website.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Who we are</h2>
            <p>
              {BRAND.name} operates this website. The exact legal-entity wording is pending client
              confirmation.
            </p>
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
              for privacy questions.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">What we collect</h2>
            <p>
              Information submitted through the website may include your name, phone number, email
              address, project location, project type and other details you choose to share — for
              example whether you have land or plans, rough timing, a rough budget, or answers given
              in our online estimate tool.
            </p>
            <p>
              The website may also collect basic use information through cookies and similar browser
              storage, as described under Cookies and tracking below.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Why we collect it</h2>
            <p>
              To respond to enquiries, discuss and provide building services, follow up where
              requested, operate and improve the website and understand which pages are useful.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Who we share it with
            </h2>
            <p>
              We do not sell personal information. Service providers may help operate the website,
              manage enquiries, provide CRM or lead follow-up, analyse website use or deliver
              advertising. Information may also be shared when required by law.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Cookies and tracking
            </h2>
            <p>
              <strong className="text-foreground">Enquiry management:</strong> when you submit a
              form, your details are sent to our customer relationship management (CRM) system so we
              can respond and follow up. Our CRM provider's tracking script also runs on this
              website to connect form submissions with how visitors found us; it may set cookies.
            </p>
            <p>
              <strong className="text-foreground">Advertising attribution:</strong> if you arrive
              from an advertisement or a tracked link, this website stores the campaign details from
              that link (such as UTM tags and Google or Facebook click identifiers), the page you
              landed on and the referring website in your browser's local storage. These details are
              sent with any form you submit, so we can see which advertising is useful.
            </p>
            <p>
              <strong className="text-foreground">Site features:</strong> the website also uses your
              browser's session storage to remember your progress in the estimate tool and to avoid
              showing the same pop-up twice. This is cleared when you close the browser tab.
            </p>
            <p>
              This website does not currently run a separate analytics service or a cookie consent
              tool. You can manage or delete cookies and stored site data at any time through your
              browser settings; blocking them may affect how some parts of the site work.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Storage and security
            </h2>
            <p>
              Enquiries are stored in our CRM, which is operated by an overseas provider, so your
              information may be stored and processed outside Canada. This website is hosted on
              Cloudflare, which also processes website requests — including IP addresses — for
              delivery and security, and may do so outside Canada.
            </p>
            <p>
              We take reasonable steps to protect personal information from loss and from
              unauthorised access, use or disclosure, and only give access to the people who need it
              to respond to and manage your enquiry.
            </p>
            <p>
              We keep enquiry information for [CLIENT TO CONFIRM: retention period], then delete or
              anonymise it unless we need to keep it to provide services or meet legal obligations.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Your rights</h2>
            <p>
              You can ask what personal information we hold about you and ask for it to be
              corrected. Contact us at{" "}
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
              </a>
              .
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Updates</h2>
            <p>The latest version of this policy will be published on this page.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
