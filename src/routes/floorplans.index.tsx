import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { FLOORPLANS, IMAGES } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { RefTag, imgProps } from "@/components/home/shared";
import {
  RelatedLinks,
  ScrollProgress,
  SectionIndicator,
  SweepLink,
  HeroTitle,
  HeroBackdrop,
} from "@/components/home/kit";

/* Floorplans — homepage design language and motion. Copy is the client-supplied Floorplans
 * content (2026-11-04); SEO from the 3 November manifest.
 * Order: hero (dark) → the two home concepts as full-height panels meeting at a seam (they
 * open outward from it on scroll, like the homepage services doors) → note + CTA → related.
 */

const TITLE = "Home Concepts and Floorplans | Nordic Green Homes";
const DESCRIPTION =
  "Explore Nordic Haus and Modern Belgian Farmhouse as concepts for discussing layout, site fit and design priorities.";
const LEAD =
  "A floorplan helps you discuss layout, scale and priorities before every decision is final. It is not a promise that the plan suits your property, meets local rules or can be built at a stated cost.";

export const Route = createFileRoute("/floorplans/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: FLOORPLANS[0].image.src },
      { name: "twitter:image", content: FLOORPLANS[0].image.src },
    ],
  }),
  component: FloorplansPage,
});

function FloorplansPage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />

      {/* ---------- Hero ---------- */}
      <section
        data-section="Floorplans"
        className="grain relative isolate overflow-hidden bg-overlay pb-20 pt-36 text-white lg:pb-24 lg:pt-44"
      >
        <HeroBackdrop image={IMAGES.hero} />
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-end">
          <div data-hero-copy className="lg:col-span-7">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              Floorplans
            </p>
            <HeroTitle
              lines={["Start with a concept,", "then make it fit", "the site."]}
              max="5.25rem"
              indent
              className="mt-7"
            />
          </div>
          <div className="lg:col-span-5">
            <p data-anim="fade" className="text-base leading-relaxed text-white/85 sm:text-lg">
              {LEAD}
            </p>
            <div data-anim="fade" className="mt-8">
              <SweepLink to="/estimate">Estimate a plan</SweepLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Home concepts ---------- */}
      <section data-section="Home concepts" className="bg-overlay pb-1 text-white">
        <h2 className="sr-only">Home concepts</h2>
        <div className="grid gap-px bg-white/10 lg:grid-cols-2">
          {FLOORPLANS.map((plan, i) => (
            <Link
              key={plan.key}
              to={plan.to}
              data-door={i === 0 ? "left" : "right"}
              className="group relative isolate flex min-h-[32rem] flex-col justify-end overflow-hidden p-6 sm:p-10 lg:min-h-[90svh] lg:p-14"
            >
              <img
                data-door-img
                {...imgProps(plan.image, "(min-width: 1024px) 50vw, 100vw")}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 -z-20 h-full w-full object-cover brightness-[0.75] transition-[filter,scale] duration-700 group-hover:scale-[1.03] group-hover:brightness-100"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-overlay via-overlay/40 to-transparent"
              />
              <RefTag image={plan.image} className="left-6 top-6 sm:left-10 sm:top-10" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                Home concept 0{i + 1} · {plan.gallery.length} renders
              </span>
              <span className="mt-3 flex items-end justify-between gap-6">
                <span className="relative font-serif text-[clamp(2.5rem,3.6vw+1rem,4.75rem)] leading-[0.95] tracking-[-0.03em]">
                  {plan.title}
                  <span
                    aria-hidden
                    className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
                  />
                </span>
                <span className="grid size-12 shrink-0 place-items-center border border-white/30 transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                  <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Before you rely on a concept ---------- */}
      <section data-section="Before you rely on a concept" className="bg-background py-20 sm:py-24">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-center">
          <p
            data-reveal="left"
            className="border-l-2 border-gold pl-6 font-serif text-[clamp(1.5rem,1.4vw+1rem,2.25rem)] leading-snug lg:col-span-8"
          >
            Before you rely on a concept, check how it fits your property, priorities and local
            requirements.
          </p>
          <div data-reveal className="lg:col-span-3 lg:col-start-10 lg:justify-self-end">
            <SweepLink to="/estimate">Estimate a plan</SweepLink>
          </div>
        </div>
      </section>

      <RelatedLinks
        links={[
          { label: "Nordic Haus", to: "/floorplans/nordic-haus" },
          { label: "Modern Belgian Farmhouse", to: "/floorplans/modern-belgian-farmhouse" },
          { label: "Estimate", to: "/estimate" },
          { label: "Discuss your project", to: "/contact" },
        ]}
      />
    </div>
  );
}
