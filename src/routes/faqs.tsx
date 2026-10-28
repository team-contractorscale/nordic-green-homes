import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { IMAGES } from "@/lib/home-content";
import { H2, HomeConsultation } from "@/components/home/NordicHome";
import { FaqList } from "@/components/page/PageParts";

const DESCRIPTION =
  "These answers help you understand what to prepare, which questions depend on the property and what the next step can and cannot tell you.";

const FAQS = [
  {
    q: "What should I prepare before the first conversation?",
    a: "Bring the property or proposed location, your project type, broad goals, timing, budget context and any plans, surveys or inspiration you have.",
  },
  {
    q: "What does an estimate show?",
    a: "It shows an indicative range based on stated assumptions. It is not a quote, approval, contract or promise of final cost.",
  },
  {
    q: "Is an estimate a quote?",
    a: "No. A quote depends on a defined scope and commercial basis.",
  },
  {
    q: "What is the difference between Passive House and high-performance building?",
    a: "Passive House is a defined building standard with published criteria. High-performance is broader and needs a project definition.",
  },
  {
    q: "Can every property support a garden suite?",
    a: "No general website answer can confirm that. Local rules, site conditions, access, servicing and existing buildings all matter.",
  },
  {
    q: "Who handles design and approvals?",
    a: "The responsible party depends on the responsibilities set out for your project. Confirm this before detailed work begins.",
  },
  {
    q: "What makes project proof useful?",
    a: "Projects, images, testimonials, plans and results are most useful when their source, permissions and context are clear.",
  },
];

const HEADER_IMAGE = IMAGES.hausGarden.src;

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Frequently Asked Questions | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: HEADER_IMAGE },
      { name: "twitter:image", content: HEADER_IMAGE },
    ],
  }),
  component: FaqsPage,
});

function FaqsPage() {
  return (
    <div>
      <PageHeader
        image={HEADER_IMAGE}
        imageAlt={IMAGES.hausGarden.alt}
        eyebrow="Frequently Asked Questions"
        title="Questions homeowners ask before starting"
        description={DESCRIPTION}
      />

      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap max-w-4xl">
          <div className="text-center">
            <h2 className={H2}>Answers to common questions</h2>
          </div>
          <FaqList items={FAQS} />
        </div>
      </section>

      <HomeConsultation />
    </div>
  );
}
