import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { IMAGES } from "@/lib/home-content";
import { HomeConsultation } from "@/components/home/NordicHome";
import { CardSection, ClosingSection, RELATED } from "@/components/page/PageParts";

const CHECKS = [
  {
    title: "Who your contract is with",
    body: "Your contract should identify the legal entity responsible for the agreement. That name should match the business information you receive.",
  },
  {
    title: "What the protection covers",
    body: "Protection terms should explain the applicable workmanship, defect, warranty or other provisions in plain language. Coverage, time limits, exclusions and conditions should be stated rather than implied.",
  },
  {
    title: "What happens if you raise an issue",
    body: "You should know how to report a concern, which information to include, who receives it and what happens next. That process should match the responsible party and contract terms.",
  },
  {
    title: "No vague promises",
    body: "Words such as “guaranteed”, “lifetime” or “covered” need a defined legal and commercial meaning. They should not suggest protection that has not been verified.",
  },
];

const DESCRIPTION =
  "Building a home involves a long chain of decisions. Before you commit, you should know who is responsible for the contract, what protection applies and where to go if something needs attention after handover.";

const HEADER_IMAGE = IMAGES.hausSide.src;

export const Route = createFileRoute("/about-us/our-guarantee")({
  head: () => ({
    meta: [
      { title: "Our Guarantee | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Our Guarantee | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: HEADER_IMAGE },
      { name: "twitter:image", content: HEADER_IMAGE },
    ],
  }),
  component: OurGuaranteePage,
});

function OurGuaranteePage() {
  return (
    <div>
      <PageHeader
        image={HEADER_IMAGE}
        imageAlt={IMAGES.hausSide.alt}
        eyebrow="Our Guarantee"
        title="Protection should be clear before work begins"
        description={DESCRIPTION}
      >
        <p className="mt-6 font-serif text-xl text-gold">
          Ask for the contract and protection details before you commit.
        </p>
      </PageHeader>

      <CardSection title="What you should be able to see" items={CHECKS} tinted />

      <ClosingSection
        title="Before you move forward"
        body="Ask for the contract and protection details that apply to your project. Read the scope, exclusions and responsibilities for approvals, design, construction and handover before you commit."
        links={[RELATED.about, RELATED.why, RELATED.contact]}
      />

      <HomeConsultation />
    </div>
  );
}
