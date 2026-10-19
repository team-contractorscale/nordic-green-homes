import { createFileRoute } from "@tanstack/react-router";
import { BRAND, ASSETS } from "@/lib/content-data";
import { PageHeader } from "@/components/layout/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Nordic Green Homes" },
      {
        name: "description",
        content: "Privacy policy for Nordic Green Homes pilot and O'Brien Contracting Ltd.",
      },
      { property: "og:title", content: "Privacy Policy | Nordic Green Homes" },
      { property: "og:description", content: "Privacy policy for Nordic Green Homes." },
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
        imageAlt="Nordic Green home exterior with sustainable timber detailing"
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated January 2026 — how Nordic Green Homes and O'Brien Contracting Ltd. handle your information."
      />
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-sm text-foreground/80 leading-relaxed">
            <p>
              At {BRAND.name} (operating in affiliation with {BRAND.sourceCompany}), we respect your
              privacy and are committed to protecting any personal information you provide when
              inquiring about building or renovation services.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              Information We Collect
            </h2>
            <p>
              When you request a discovery call, consultation, or download resources from our
              website, we may collect your name, phone number, email address, project location, and
              project parameters.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">
              How We Use Your Information
            </h2>
            <p>
              Information collected is strictly used to evaluate your building or renovation
              inquiry, schedule discovery calls, provide requested architectural guides, and
              communicate directly regarding project feasibility. We never sell, rent, or distribute
              your personal details to third parties for marketing purposes.
            </p>

            <h2 className="font-serif text-lg font-bold text-foreground mt-6">Contact Us</h2>
            <p>
              If you have questions regarding this privacy statement, please contact us at{" "}
              {BRAND.email} or call {BRAND.phone}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
