import { acceptedMetadata } from "@/lib/accepted-metadata";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { IMAGES, type RefImage } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { RefTag, imgProps } from "@/components/home/shared";
import {
  HEADING,
  HeroBackdrop,
  HeroTitle,
  Kicker,
  RelatedLinks,
  ScrollProgress,
  SectionIndicator,
} from "@/components/home/kit";

/* Resources hub — homepage design language and motion. Copy is the existing resources copy.
 * Order: hero (dark) → the questions behind a project (topic index) → featured reading
 * (guide + Step Code as photo panels) → related.
 */

const TITLE = "Resources | Nordic Green Homes";
const DESCRIPTION =
  "Use the resources hub to understand the questions that affect a project before detailed design or construction decisions are locked in.";

// Topics from the brief; each links to the page that covers it.
const TOPICS = [
  {
    label: "Adaptable rooms, water use, energy-system options and long-term material care.",
    to: "/resources/guide",
  },
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

const FEATURED: {
  title: string;
  body: string;
  cta: string;
  to: "/resources/guide" | "/resources/bc-energy-step-code";
  image: RefImage;
}[] = [
  {
    title: "A Practical Guide to Planning Your Custom Home",
    body: "Organise the brief, test the property and prepare for the conversations that shape design and construction.",
    cta: "Read the guide",
    to: "/resources/guide",
    image: IMAGES.office,
  },
  {
    title: "BC Energy Step Code",
    body: "Understand why location, permit date, design decisions and technical review matter.",
    cta: "Read the article",
    to: "/resources/bc-energy-step-code",
    image: IMAGES.hausSide,
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      ...acceptedMetadata("/resources"),
      { property: "og:image", content: IMAGES.office.src },
      { name: "twitter:image", content: IMAGES.office.src },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />

      {/* ---------- Hero ---------- */}
      <section
        data-section="Resources"
        className="grain relative isolate overflow-hidden bg-overlay pb-20 pt-36 text-white lg:pb-24 lg:pt-44"
      >
        <HeroBackdrop image={IMAGES.office} />
        <div data-hero-copy className="wrap grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              Resources
            </p>
            <HeroTitle
              lines={["Resources for", "making better", "early decisions."]}
              max="5.25rem"
              indent
              className="mt-7"
            />
          </div>
          <p
            data-anim="fade"
            className="text-base leading-relaxed text-white/85 sm:text-lg lg:col-span-5"
          >
            {DESCRIPTION}
          </p>
        </div>
      </section>

      {/* ---------- Topic index ---------- */}
      <section data-section="Topics" className="bg-background py-24 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Kicker>Start here</Kicker>
              <h2 data-split className={`${HEADING} mt-6`}>
                Explore the questions behind a project
              </h2>
              <p data-reveal className="mt-6 text-base leading-relaxed text-muted-foreground">
                Start with the question closest to your project. The BC Energy Step Code article
                provides a more focused explanation of energy requirements and technical review.
              </p>
            </div>
          </div>
          <ol className="border-t border-border lg:col-span-7 lg:col-start-6">
            {TOPICS.map((t, i) => (
              <li key={t.label} data-reveal className="border-b border-border">
                <Link
                  to={t.to}
                  className="group flex items-baseline gap-6 py-6 transition-colors duration-300 hover:text-primary"
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-gold">{pad(i + 1)}</span>
                  <span className="flex-1 font-serif text-[clamp(1.375rem,1vw+1rem,2rem)] leading-snug transition-transform duration-500 group-hover:translate-x-1.5">
                    {t.label}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center self-center border border-border transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Featured reading ---------- */}
      <section data-section="Featured reading" className="bg-overlay pb-px text-white">
        <h2 className="sr-only">Featured reading</h2>
        <div className="grid gap-px bg-white/10 lg:grid-cols-2">
          {FEATURED.map((f, i) => (
            <Link
              key={f.to}
              to={f.to}
              data-door={i === 0 ? "left" : "right"}
              className="group relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden p-6 sm:p-10 lg:min-h-[75svh] lg:p-14"
            >
              <img
                data-door-img
                {...imgProps(f.image, "(min-width: 1024px) 50vw, 100vw")}
                loading="lazy"
                className="absolute inset-0 -z-20 h-full w-full object-cover brightness-[0.75] transition-[filter,scale] duration-700 group-hover:scale-[1.03] group-hover:brightness-100"
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-overlay via-overlay/50 to-transparent"
              />
              <RefTag image={f.image} className="left-6 top-6 sm:left-10 sm:top-10" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                Featured {pad(i + 1)}
              </span>
              <span className="mt-3 max-w-xl font-serif text-[clamp(2rem,2.4vw+1rem,3.5rem)] leading-[1.02] tracking-[-0.02em]">
                {f.title}
              </span>
              <span className="mt-4 max-w-lg text-base leading-relaxed text-white/80">
                {f.body}
              </span>
              <span className="mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]">
                <span className="relative">
                  {f.cta}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
                  />
                </span>
                <span className="grid size-10 place-items-center border border-white/30 transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <RelatedLinks
        links={[
          { label: "Planning guide", to: "/resources/guide" },
          { label: "BC Energy Step Code", to: "/resources/bc-energy-step-code" },
          { label: "FAQs", to: "/faqs" },
          { label: "Discuss your project", to: "/contact" },
        ]}
      />
    </div>
  );
}
