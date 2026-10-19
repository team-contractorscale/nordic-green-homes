import { Eyebrow } from "./Hero";
import { Placeholder } from "@/components/home/NordicHome";
import { IMAGES, INTRO, PLACEHOLDER, type RefImage } from "@/lib/home-content";

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
    <section data-anim="approach" className="relative overflow-hidden bg-[#f4efe8] text-slate">
      <div className="wrap py-24 lg:py-32">
        <div className="max-w-3xl">
          <Eyebrow>One complete home</Eyebrow>
          <h2
            data-anim="reveal"
            className="mt-5 font-serif text-[clamp(2.2rem,3vw+1rem,3.6rem)] leading-[1.04] tracking-[-0.02em] text-foreground"
          >
            Design, materials and building practice,
            <span className="text-primary"> considered as one.</span>
          </h2>
          <p
            data-anim="reveal"
            className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {INTRO.relationship.body}
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          {FACETS.map((f, i) => (
            <article
              key={f.k}
              data-facet
              className={`relative overflow-hidden rounded-md bg-white/70 p-6 shadow-sm sm:p-8 ${
                i === 0
                  ? "lg:col-span-7"
                  : i === 1
                    ? "lg:col-span-5"
                    : i === 2
                      ? "lg:col-span-5"
                      : i === 3
                        ? "lg:col-span-4"
                        : "lg:col-span-3"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-serif text-3xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
              </div>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
                {f.body}
              </p>
              <div className="mt-6 overflow-hidden rounded-sm">
                <img
                  src={f.image.src}
                  alt={f.image.alt}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover [clip-path:inset(10%_10%_10%_10%)]"
                  data-reveal-img
                />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Placeholder>{PLACEHOLDER.assurance}</Placeholder>
        </div>
      </div>
    </section>
  );
}
