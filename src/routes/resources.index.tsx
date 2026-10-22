import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { H2, HomeConsultation } from "@/components/home/NordicHome";
import { RelatedPages } from "@/components/page/PageParts";
import { IMAGES, PHOTOS } from "@/lib/home-content";

const DESCRIPTION =
  "Use the resources hub to understand the questions that affect a project before detailed design or construction decisions are locked in.";

// Topics from the brief; each links to the page that covers it, where one exists.
const TOPICS = [
  { label: "Custom home planning, site and brief.", to: "/resources/guide" },
  { label: "Garden suites and local terminology.", to: "/services/garden-suites" },
  {
    label: "High-performance and passive-home principles.",
    to: "/services/high-performance-homes",
  },
  {
    label: "BC Energy Step Code and other BC energy requirements.",
    to: "/resources/bc-energy-step-code",
  },
  { label: "Design and interiors.", to: "/services/design-and-interiors" },
  { label: "Budget, scope and change.", to: "/services/luxury-custom-homes" },
  { label: "Process and approvals.", to: "/process" },
] as const;

const FEATURED = [
  {
    title: "BC Energy Step Code",
    body: "Understand why location, permit date, design decisions and technical review matter.",
    cta: "Read the article",
    to: "/resources/bc-energy-step-code",
    image: PHOTOS.shopInterior,
  },
] as const;

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Resources | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: IMAGES.office.src },
      { name: "twitter:image", content: IMAGES.office.src },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <div>
      <PageHeader
        image={IMAGES.office.src}
        imageAlt={IMAGES.office.alt}
        eyebrow="Resources"
        title="Resources for making better early decisions"
        description={DESCRIPTION}
      />

      <section className="py-24 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <h2 className={H2}>Explore the questions behind a project</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Start with the question closest to your project. The BC Energy Step Code article
              provides a more focused explanation of energy requirements and technical review.
            </p>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {TOPICS.map((t) => (
              <li key={t.label}>
                <Link
                  to={t.to}
                  className="group flex items-center justify-between gap-4 py-4 text-base text-foreground hover:text-primary"
                >
                  {t.label}
                  <ArrowRight className="size-4 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap">
          <div className="grid max-w-xl gap-8">
            {FEATURED.map((f) => (
              <Link
                key={f.to}
                to={f.to}
                className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <img
                  src={f.image.src}
                  alt={f.image.alt}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="p-8">
                  <h2 className="font-serif text-2xl text-foreground">{f.title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{f.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-base font-bold text-primary underline underline-offset-4">
                    {f.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <RelatedPages
            links={[
              { label: "Planning guide", to: "/resources/guide" },
              { label: "BC Energy Step Code", to: "/resources/bc-energy-step-code" },
              { label: "FAQs", to: "/faqs" },
              { label: "Discuss your project", to: "/contact" },
            ]}
          />
        </div>
      </section>

      <HomeConsultation />
    </div>
  );
}
