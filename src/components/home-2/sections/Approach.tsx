import { Eyebrow } from "./Hero";
import { Placeholder } from "@/components/home/NordicHome";
import { IMAGES, INTRO, PLACEHOLDER, type RefImage } from "@/lib/home-content";

/**
 * ApproachSection — "One complete home", rebalanced.
 *
 * The earlier draft used an inconsistent 7/5/5/4/3 col-span mix that made
 * images vary wildly in size. Here every facet is the same shape: a fixed
 * ~18rem image column + text, alternating which side the image sits on.
 * Consistent aspect-[3/2] tiles, hover zoom + gold number, light card frames.
 */
const FACETS: ReadonlyArray<{
  k: string;
  title: string;
  body: string;
  image: RefImage;
}> = [
  {
    k: "design",
    title: "Design",
    body: "Every project starts with listening. We take time to understand your site, your priorities and your budget before a single plan is drawn, then carry that same care through to construction.",
    image: IMAGES.entry,
  },
  {
    k: "materials",
    title: "Materials",
    body: "Considered material choices made together — balancing durability, maintenance, aesthetics and budget, with indoor air quality and long-term running costs in mind.",
    image: IMAGES.obrienReno,
  },
  {
    k: "practice",
    title: "Building practice",
    body: "Careful envelope detailing, balanced ventilation and construction methods chosen with comfort and longevity in mind. Sustainable building practice sits at the centre of how we design and build.",
    image: IMAGES.newBuilds,
  },
  {
    k: "comfort",
    title: "Comfort",
    body: "Homes designed to be healthy, quiet and comfortable year-round — the way your family actually lives, gathers, rests and grows.",
    image: IMAGES.interior,
  },
  {
    k: "longterm",
    title: "Long-term thinking",
    body: "Built to last for generations, with seasonal care advice to help your home stay at its best long after handover.",
    image: IMAGES.customHomes,
  },
];

export function ApproachSection() {
  return (
    <section
      data-anim="approach"
      className="relative overflow-hidden bg-secondary/60 py-24 text-foreground lg:py-32"
    >
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>One complete home</Eyebrow>
            <h2
              data-anim="reveal"
              className="mt-5 font-serif text-[clamp(2.2rem,3vw+1rem,3.4rem)] leading-[1.04] tracking-[-0.02em]"
            >
              Design, materials and building practice,{" "}
              <span className="text-primary">considered as one.</span>
            </h2>
            <p
              data-anim="reveal"
              className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground"
            >
              {INTRO.relationship.body}
            </p>
            <div className="mt-6">
              <Placeholder>{PLACEHOLDER.assurance}</Placeholder>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 lg:col-start-5">
          <div className="space-y-6">
            {FACETS.map((f, i) => {
              const flip = i % 2 === 1;
              return (
                <article
                  key={f.k}
                  data-facet
                  className="group grid gap-6 overflow-hidden rounded-md border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg sm:grid-cols-[minmax(0,18rem)_1fr] sm:p-6"
                >
                  <div className={`overflow-hidden rounded-sm ${flip ? "sm:order-2" : ""}`}>
                    <img
                      src={f.image.src}
                      alt={f.image.alt}
                      loading="lazy"
                      data-reveal-img
                      className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className={flip ? "sm:order-1" : ""}>
                    <span className="font-serif text-2xl text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-foreground">{f.title}</h3>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                      {f.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
