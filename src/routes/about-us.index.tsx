import { acceptedMetadata } from "@/lib/accepted-metadata";
import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CTA, IMAGES, TEAM, type RefImage } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { RefTag, imgProps } from "@/components/home/shared";
import {
  HEADING,
  Kicker,
  LineLink,
  PageHero,
  ScrollProgress,
  SectionIndicator,
  SweepLink,
} from "@/components/home/kit";
import { HomeClosing, HomeFaqs } from "@/components/home/HomeSections";
import { HomePillars } from "@/components/home/HomePillars";

/* About Us — same design language and motion as the homepage (useHomeMotion + home kit).
 * Copy is the client-supplied About content (2026-11-04).
 * Order: hero (dark) → the people (Lane, Kylie) → partners (dark) → four pillars →
 * where we build (dark) → FAQs → let's talk (dark).
 */

const TITLE = "About Us | Nordic Green Homes";
const DESCRIPTION =
  "Nordic Green Homes is built around Lane and Kylie, a builder-and-designer couple with a clear focus: sustainable luxury and homes shaped around the people who live in them.";

const HERO = {
  eyebrow: "About Nordic Green Homes",
  // Three masked lines (site max); the last line is the gold accent.
  lines: ["A builder. A designer.", "A shared idea", "of home."],
  body: [
    DESCRIPTION,
    "Building and design are part of the same conversation here. How a room feels matters. So does how it is built, what the materials ask of you and how the choices fit your life.",
  ],
  quote: "We provide sustainable luxury. And that's it.",
  facts: [
    { label: "Builder", value: "Lane" },
    { label: "Designer, Nordic Green Design", value: "Kylie" },
    { label: "Partners in life", value: "Parents of three" },
    { label: "Based in", value: "Fraser Valley" },
  ],
};

const PEOPLE = [
  {
    name: "Lane",
    role: "Builder",
    body: [
      "Raised in Saskatchewan and drawn to life in BC, Lane brings a carpenter's understanding of how a home comes together.",
      "After working in construction, he wanted a different approach to the waste he saw around him. That concern helped shape his focus on more thoughtful building, lasting materials and homes for families like his own.",
      "A father of three, Lane knows a home has to work beyond the photographs. It needs to make room for the people, routines and changes that fill it. He brings that practical perspective to conversations about design and cost:",
    ],
    quote: "Every change you make changes your price point.",
  },
  {
    name: "Kylie",
    role: "Designer, Nordic Green Design",
    body: [
      "Kylie is the founder and lead designer of Nordic Green Design. Born and raised in BC, she moved from a background in law into interior design.",
      "Her influences include Modern Farmhouse and English- and Belgian-inspired homes. She pays close attention to the sustainability and quality of materials, and to the details that make a space fit a family's needs and style.",
      "For Kylie, a beautiful interior is personal. The rooms, textures and finishes should belong to the people who live there, not just look right together.",
    ],
  },
];

const PARTNERS = {
  title: "Partners in life, building and design",
  body: [
    "Lane and Kylie are a couple and parents of three. Their building and design perspectives come together around one question: what will make this a better home for the people living in it?",
    "Lane brings the construction perspective. Kylie brings the interior design perspective through Nordic Green Design. Together, they connect the practical choices with the feeling you want to come home to.",
  ],
  links: [
    {
      label: "Explore Luxury Custom Homes",
      to: "/services/luxury-custom-homes",
      image: IMAGES.customHomes,
      side: "left",
    },
    {
      label: "Explore Design and Interiors",
      to: "/services/design-and-interiors",
      image: IMAGES.interior,
      side: "right",
    },
  ] satisfies { label: string; to: LinkProps["to"]; image: RefImage; side: string }[],
};

const PILLARS = {
  title: "The four pillars behind Nordic",
  items: [
    {
      title: "Sustainable",
      body: "Thoughtful materials, practical energy decisions and care for the life of the home. Sustainability is part of how we think about building, from the first design conversation.",
    },
    {
      title: "Family",
      body: "Home is where everyday life happens. We start with the people who will live there and the spaces that help them gather, rest, work and grow.",
    },
    {
      title: "Luxury",
      body: "A home that feels considered and entirely yours. The right proportions, materials and details bring pleasure to everyday living.",
    },
    {
      title: "Faith",
      body: "Our faith is expressed in care, honesty, and respect for our clients, the people we work with, and the communities we build in.",
    },
  ],
} as const;

const AREAS = {
  title: "Based in the Fraser Valley. Building beyond it.",
  body: "We work with homeowners in Vancouver, West Van, North Van, Richmond, Tsawwassen, and Vancouver Island.",
  note: "We work alongside your architect or designer. Bring your plans to the call. If you're still shaping your ideas, bring those too.",
  places: [
    { name: "Vancouver", to: "/service-areas" },
    { name: "West Van", to: "/service-areas/vancouver-north-shore" },
    { name: "North Van", to: "/service-areas/vancouver-north-shore" },
    { name: "Richmond", to: "/service-areas/richmond-and-tsawwassen" },
    { name: "Tsawwassen", to: "/service-areas/richmond-and-tsawwassen" },
    { name: "Vancouver Island", to: "/service-areas/vancouver-island" },
  ] satisfies { name: string; to: LinkProps["to"] }[],
};

const FAQS = [
  {
    q: "How do Nordic Green Homes and Nordic Green Design work together?",
    a: "Lane brings the building perspective to Nordic Green Homes. Kylie brings her interior design perspective through Nordic Green Design. The two perspectives come together around your home, your priorities and the choices ahead.",
  },
  {
    q: "Can we talk before we have plans?",
    a: "Yes. Start with the property, the way you want to live and any ideas you already have. If you have an architect, designer or plans, bring them into the conversation.",
  },
  {
    q: "Where should we start?",
    a: "Get a ballpark estimate, then request a 15-minute call with Lane to talk about what you have in mind.",
  },
];

export const Route = createFileRoute("/about-us/")({
  head: () => ({
    meta: [
      ...acceptedMetadata("/about-us"),
      { property: "og:image", content: TEAM.photo.src },
      { name: "twitter:image", content: TEAM.photo.src },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />
      <AboutHero />
      <People />
      <Partners />
      <HomePillars title={PILLARS.title} items={PILLARS.items} />
      <Areas />
      <HomeFaqs items={FAQS} />
      <HomeClosing
        title="Let's talk about your home"
        body="A site, a set of plans, or the beginnings of an idea; we can start with where you are."
        note={null}
        link={null}
        contact
      />
    </div>
  );
}

/* ---------- Hero ----------
 * Shared PageHero: four-line H1, intro, Lane's line and both CTAs; the photo of Kylie and Lane
 * framed with name plates matching who stands where; a facts rail.
 */
function AboutHero() {
  return (
    <PageHero
      section="About"
      backdrop={IMAGES.intro}
      eyebrow={HERO.eyebrow}
      lines={HERO.lines}
      image={
        <img
          src={TEAM.photo.src}
          alt={TEAM.photo.alt}
          width={580}
          height={645}
          fetchPriority="high"
          className="h-full w-full object-cover object-top"
        />
      }
      frameOverlay={
        <ul className="absolute inset-x-0 bottom-0 grid grid-cols-2 border-t border-white/15 bg-overlay/75 backdrop-blur-md">
          {TEAM.people.map((p, i) => (
            <li key={p.name} className={`p-4 sm:p-5 ${i ? "border-l border-white/15" : ""}`}>
              <span className="block font-serif text-2xl leading-none">{p.name}</span>
              <span className="mt-2 block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold">
                {p.role}
              </span>
            </li>
          ))}
        </ul>
      }
      rail={
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {HERO.facts.map((f) => (
            <div
              key={f.label}
              data-anim="stat"
              className="border-l border-white/15 py-6 pl-4 lg:py-8 lg:pl-5"
            >
              <dt className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">
                {f.label}
              </dt>
              <dd className="mt-2 font-serif text-xl leading-tight sm:text-2xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      }
    >
      <div className="mt-8 max-w-[34rem] space-y-4 text-base leading-relaxed text-white/85 sm:text-lg">
        {HERO.body.map((p) => (
          <p key={p} data-anim="fade">
            {p}
          </p>
        ))}
      </div>
      <figure data-anim="fade" className="mt-7 max-w-[34rem] border-l-2 border-gold pl-5">
        <blockquote className="font-serif text-xl leading-snug sm:text-2xl">
          &ldquo;{HERO.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-2 text-xs font-bold uppercase tracking-[0.24em] text-gold">
          &mdash; Lane
        </figcaption>
      </figure>
      <div data-anim="fade" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
        <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
        <LineLink to={CTA.call.to} dark>
          {CTA.call.label}
        </LineLink>
      </div>
    </PageHero>
  );
}

/* ---------- The people ----------
 * One editorial row per person: a sticky column with the index, a large name that rises out of
 * a mask and the role; the story beside it. Lane's line is set as a pull quote.
 */
function People() {
  return (
    <section data-section="The people" className="bg-background py-24 sm:py-32">
      <div className="wrap">
        <Kicker>Lane and Kylie</Kicker>
        <h2 data-split className={`${HEADING} mt-6 max-w-3xl`}>
          The people behind your project
        </h2>

        <div className="mt-16 border-t border-border lg:mt-24">
          {PEOPLE.map((p, i) => (
            <article
              key={p.name}
              className="grid gap-8 border-b border-border py-14 lg:grid-cols-12 lg:gap-12 lg:py-20"
            >
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <span className="text-xs font-bold tracking-[0.2em] text-gold">0{i + 1}</span>
                  <h3
                    data-split
                    className="mt-3 font-serif text-[clamp(4rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.04em]"
                  >
                    {p.name}
                  </h3>
                  <p className="mt-5 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-slate">
                    <span aria-hidden className="h-px w-10 bg-gold" />
                    {p.role}
                  </p>
                </div>
              </div>
              <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-6 lg:col-start-7">
                {p.body.map((para) => (
                  <p key={para} data-reveal>
                    {para}
                  </p>
                ))}
                {p.quote && (
                  <figure data-reveal="left" className="!mt-8 border-l-2 border-gold pl-6">
                    <blockquote className="font-serif text-[clamp(1.75rem,1.6vw+1rem,2.5rem)] leading-[1.15] text-foreground">
                      &ldquo;{p.quote}&rdquo;
                    </blockquote>
                  </figure>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Partners ----------
 * Dark band: the shared story on the left; two photo "doors" (the homepage services treatment,
 * opening outward from their seam on lg) linking to the two service pages on the right.
 */
function Partners() {
  return (
    <section
      data-section="Partners"
      className="grain relative bg-overlay py-24 text-white sm:py-32"
    >
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Kicker dark>Building and design</Kicker>
          <h2 data-split className={`${HEADING} mt-6`}>
            {PARTNERS.title}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-white/80">
            {PARTNERS.body.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="group/doors grid gap-px bg-white/10 sm:grid-cols-2 lg:col-span-7">
          {PARTNERS.links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-door={l.side}
              className="group relative isolate flex aspect-[4/5] min-w-0 flex-col justify-end overflow-hidden bg-overlay p-6 transition-opacity duration-500 group-has-[a:hover]/doors:opacity-50 hover:!opacity-100 sm:p-8"
            >
              <img
                data-door-img
                {...imgProps(l.image, "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw")}
                loading="lazy"
                className="absolute inset-0 -z-20 h-full w-full object-cover brightness-[0.7] saturate-[0.8] transition-[filter,scale] duration-700 group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-overlay via-overlay/50 to-transparent"
              />
              <RefTag image={l.image} className="left-4 top-4" />
              <span className="flex items-end justify-between gap-4">
                <span className="relative font-serif text-2xl leading-tight sm:text-3xl">
                  {l.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
                  />
                </span>
                <span className="grid size-10 shrink-0 place-items-center border border-white/30 transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Where we build ----------
 * Dark band: heading + body on the left; the six areas as a large hairline index (each links
 * to its service-area page, gold on hover); the architect/designer note as a gold-rule line.
 */
function Areas() {
  return (
    <section
      data-section="Where we build"
      className="grain relative bg-brand-dark py-24 text-white sm:py-32"
    >
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker dark>Where we build</Kicker>
          <h2 data-split className={`${HEADING} mt-6`}>
            {AREAS.title}
          </h2>
          <p data-reveal className="mt-6 text-base leading-relaxed text-white/80">
            {AREAS.body}
          </p>
          <p
            data-reveal="left"
            className="mt-8 border-l-2 border-gold pl-5 font-serif text-xl leading-snug"
          >
            {AREAS.note}
          </p>
        </div>
        <ol className="border-t border-white/15 lg:col-span-6 lg:col-start-7">
          {AREAS.places.map((place, i) => (
            <li key={place.name} data-reveal className="border-b border-white/15">
              <Link
                to={place.to}
                className="group flex items-baseline gap-6 py-5 transition-colors duration-300 hover:text-gold sm:py-6"
              >
                <span className="text-xs font-bold tracking-[0.2em] text-gold">0{i + 1}</span>
                <span className="flex-1 font-serif text-[clamp(1.75rem,2.4vw+0.75rem,3rem)] leading-none transition-transform duration-500 group-hover:translate-x-2">
                  {place.name}
                </span>
                <ArrowUpRight className="size-5 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
