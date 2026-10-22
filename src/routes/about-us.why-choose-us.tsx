import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { IMAGES } from "@/lib/home-content";
import { HomeConsultation } from "@/components/home/NordicHome";
import { CardSection, ClosingSection, RELATED, SplitIntro } from "@/components/page/PageParts";

const DECISIONS = [
  {
    title: "Design that earns its place",
    body: "Good design is not decoration added at the end. It shapes light, movement, storage, privacy and the way the home supports everyday life.",
  },
  {
    title: "Performance with evidence",
    body: "Comfort and energy goals need clear targets, sound advice and evidence from the project. Broad labels alone cannot show how a home will perform.",
  },
  {
    title: "Construction considered early",
    body: "Materials, approvals, sequencing and buildability affect the design. Bringing those questions into the conversation early helps surface trade-offs while there is still time to make a considered choice.",
  },
  {
    title: "A direct conversation",
    body: "Your project should have a clear next step, a visible set of assumptions and named responsibilities. The project information should set out the delivery model and team roles clearly.",
  },
];

const DESCRIPTION =
  "The best custom homes begin with more than a style reference. They begin with how you move through the day, what the site can support and which decisions will matter long after handover.";

const HEADER_IMAGE = IMAGES.interior.src;

export const Route = createFileRoute("/about-us/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why Choose Us | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Why Choose Us | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: HEADER_IMAGE },
      { name: "twitter:image", content: HEADER_IMAGE },
    ],
  }),
  component: WhyChooseUsPage,
});

function WhyChooseUsPage() {
  return (
    <div>
      <PageHeader
        image={HEADER_IMAGE}
        imageAlt={IMAGES.interior.alt}
        eyebrow="Why Choose Us"
        title="Plan the home around the way you live"
        description={DESCRIPTION}
      />

      <SplitIntro
        lead="Nordic Green Homes brings design, performance, materials and construction planning together early, so you can understand the choices before they become expensive to change."
        eyebrow="A clearer brief"
        paragraphs={[
          "You should not have to choose finishes before the bigger questions are understood. Start with the site, your household, the spaces you need and the way you want the home to feel. From there, work through layout, orientation, materials, comfort, maintenance and performance goals.",
          "Each choice affects the next one. A clear brief keeps those connections visible.",
        ]}
      />

      <CardSection title="Decisions made with care" items={DECISIONS} tinted />

      <ClosingSection
        title="Start with your project"
        body="Tell us what you are planning, where the property is and what matters most to your household. The first conversation is for understanding the brief and identifying the questions that need answers."
        links={[RELATED.about, RELATED.guarantee, RELATED.contact]}
      />

      <HomeConsultation />
    </div>
  );
}
