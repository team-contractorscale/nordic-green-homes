import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { IMAGES } from "@/lib/home-content";
import { H2, HomeConsultation } from "@/components/home/NordicHome";
import {
  CardSection,
  FaqList,
  RELATED,
  RelatedPages,
  SplitIntro,
} from "@/components/page/PageParts";

const VALUES = [
  {
    title: "Considered design",
    body: "Rooms, light, storage, materials and movement through the home should work together.",
  },
  {
    title: "Clear decisions",
    body: "You should know which choices affect scope, cost, performance or the next stage.",
  },
  {
    title: "Responsible performance",
    body: "Comfort, energy, ventilation, moisture and building-envelope goals need defined targets and evidence, not broad labels.",
  },
  {
    title: "Honest coordination",
    body: "Design, approvals and construction responsibilities should be clear before the project moves forward.",
  },
];

const ABOUT_FAQS = [
  {
    q: "Who operates Nordic Green Homes?",
    a: "Before signing, check the legal name on the contract and confirm which entity carries the project responsibilities.",
  },
  {
    q: "How does Nordic Green Design relate to Nordic Green Homes?",
    a: "The public and legal information should explain the relationship between Nordic Green Design and Nordic Green Homes.",
  },
  {
    q: "Where does Nordic work?",
    a: "The service-area information should state where projects are accepted.",
  },
  {
    q: "What credentials and warranty apply?",
    a: "The applicable credentials, licence position and warranty terms should be stated in the project information and contract.",
  },
];

const DESCRIPTION =
  "Nordic Green Homes brings design decisions, construction thinking and the way you want to live into the same conversation.";

const HEADER_IMAGE = IMAGES.intro.src;

export const Route = createFileRoute("/about-us/")({
  head: () => ({
    meta: [
      { title: "About Us | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "About Us | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: HEADER_IMAGE },
      { name: "twitter:image", content: HEADER_IMAGE },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <PageHeader
        image={HEADER_IMAGE}
        imageAlt={IMAGES.intro.alt}
        title="About Nordic Green Homes"
        description={DESCRIPTION}
      />

      <SplitIntro
        lead="Your home should fit the site, support your daily life and make sense to build. That means considering the layout, materials, comfort, performance and practical decisions before they become expensive to change."
        eyebrow="Why Nordic exists"
        paragraphs={[
          "A new home affects daily life for years. The useful decisions happen early: how the home sits on the site, how the rooms connect, which materials suit the household and which comfort or efficiency goals belong in the brief.",
          "Nordic Green Homes brings those questions together through a design-led, sustainability-aware approach. The delivery model and team responsibilities should be clear before work begins.",
        ]}
      />

      {/* Team — names and roles held until confirmed */}
      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap max-w-3xl text-center">
          <h2 className={H2}>The people behind your project</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            You should know who is involved in your project, what each person is responsible for and
            how decisions will be handled before work begins.
          </p>
        </div>
      </section>

      <CardSection title="What matters here" items={VALUES} />

      {/* FAQs */}
      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap max-w-4xl">
          <h2 className={`${H2} text-center`}>Frequently asked questions</h2>
          <FaqList items={ABOUT_FAQS} />

          <RelatedPages links={[RELATED.why, RELATED.guarantee, RELATED.contact]} />
        </div>
      </section>

      <HomeConsultation />
    </div>
  );
}
