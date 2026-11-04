import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { CTA, IMAGES, TEAM } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { RefTag, imgProps } from "@/components/home/shared";
import {
  HEADING,
  Kicker,
  LineLink,
  ScrollProgress,
  SectionIndicator,
  SweepLink,
  HeroTitle,
} from "@/components/home/kit";
import { HomeClosing, HomeFaqs } from "@/components/home/HomeSections";

/* Luxury Custom Homes — homepage design language and motion, laid out as the story the copy
 * tells. Copy is the client-supplied Luxury Custom Homes content (2026-11-04); SEO from the
 * 4 November manifest append.
 * Order: full-bleed hero → Lane's line + Vancouver and beyond → price the idea (dark, the
 * design growing one decision at a time) → builder + designer → a life beyond the selections
 * → considered beneath (dark) → bring your architect → FAQs → put a ballpark beside your ideas.
 */

const TITLE = "Luxury Custom Homes | Nordic Green Homes";
const DESCRIPTION =
  "Plan a luxury custom home around your life, site and budget. Bring your architect, designer or early ideas to a conversation with Lane.";
const HERO_IMAGE = IMAGES.customHomes;

const GROWTH = ["A larger kitchen.", "Another room.", "More glass.", "A different roofline."];
const STYLES = ["Warm modern farmhouse", "English character", "Belgian simplicity"];

const FAQS = [
  {
    q: "When should we talk?",
    a: "Before the design is settled is a good time to bring the building conversation in. If you already have plans, bring them; we can start there.",
  },
  {
    q: "What changes the price of a custom home?",
    a: "The size, site, access, structure, materials and level of detail all play a part. Design changes affect more than the item you can see, which is why we bring those choices into the budget conversation early.",
  },
  {
    q: "Does the design have to follow a particular style?",
    a: "Your home should reflect your taste and your life. Bring the spaces, materials and references you are drawn to, and tell us what you want the home to feel like.",
  },
];

export const Route = createFileRoute("/services/luxury-custom-homes")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: HERO_IMAGE.src },
      { name: "twitter:image", content: HERO_IMAGE.src },
    ],
  }),
  component: LuxuryCustomHomesPage,
});

function Quote({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <figure data-reveal="left" className="border-l-2 border-gold pl-6 sm:pl-8">
      <blockquote
        className={`font-serif text-[clamp(1.75rem,2.2vw+1rem,3.25rem)] leading-[1.1] tracking-[-0.015em] ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-xs font-bold uppercase tracking-[0.24em] text-gold">
        &mdash; Lane
      </figcaption>
    </figure>
  );
}

function LuxuryCustomHomesPage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />

      {/* ---------- Hero ---------- */}
      <section
        data-section="Luxury Custom Homes"
        className="grain relative isolate overflow-hidden bg-overlay text-white"
      >
        <div data-anim="photo" className="absolute inset-0 -z-10 overflow-hidden">
          <div data-photo-inner className="absolute inset-x-0 -inset-y-[6%]">
            <img
              {...imgProps(HERO_IMAGE, "100vw")}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-overlay/60 lg:bg-transparent lg:bg-gradient-to-r lg:from-overlay/95 lg:via-overlay/70 lg:to-overlay/10"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-overlay/70 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-overlay to-transparent"
          />
        </div>
        <RefTag image={HERO_IMAGE} className="bottom-6 right-5 sm:right-8" />

        <div className="wrap flex min-h-svh items-center pb-20 pt-36 lg:pt-40">
          <div data-hero-copy className="max-w-3xl">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              Luxury Custom Homes
            </p>
            <HeroTitle
              lines={["Luxury custom homes,", "without losing sight", "of your life."]}
              max="5.25rem"
              indent
              className="mt-7"
            />
            <p
              data-anim="fade"
              className="mt-8 max-w-[34rem] font-serif text-xl leading-snug sm:text-2xl"
            >
              A home that feels entirely yours. The right light in the kitchen. Space to gather,
              space to retreat and materials you enjoy every day.
            </p>
            <p
              data-anim="fade"
              className="mt-5 max-w-[34rem] text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Nordic Green Homes brings the builder&rsquo;s and designer&rsquo;s perspectives
              together to create sustainable luxury around the way you live.
            </p>
            <div data-anim="fade" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
              <LineLink to={CTA.call.to} dark>
                {CTA.call.label}
              </LineLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Sustainable luxury in Vancouver and beyond ---------- */}
      <section data-section="Vancouver and beyond" className="bg-background py-24 sm:py-32">
        <div className="wrap">
          <div className="max-w-4xl">
            <Quote text="We provide sustainable luxury. And that's it." />
          </div>
          <div className="mt-20 grid gap-10 lg:grid-cols-12">
            <h2 data-split className={`${HEADING} lg:col-span-5`}>
              Sustainable luxury custom homes in Vancouver and beyond
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-6 lg:col-start-7">
              <p data-reveal>
                That focus shapes the conversation from the beginning. What would make this home a
                pleasure to live in? Which spaces matter most? Where will a thoughtful design
                decision make a difference every day?
              </p>
              <p data-reveal>
                We build for homeowners in Vancouver, West Van, North Van, Richmond, Tsawwassen and
                Vancouver Island. Your home starts with your site and your priorities, not a
                standard plan with a different finish package.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Price the idea (dark): the design grows one decision at a time ---------- */}
      <section
        data-section="Price the idea"
        className="grain relative bg-overlay py-24 text-white sm:py-32"
      >
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Kicker dark>Design and budget</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              Price the idea while you can still shape it
            </h2>
            <p data-reveal className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
              A design can grow one decision at a time. Each choice changes the work behind it.
            </p>
            <ol className="mt-10 space-y-2">
              {GROWTH.map((g, i) => (
                <li
                  key={g}
                  data-reveal
                  className="flex items-center gap-4 border border-white/10 bg-white/[0.03] py-4 pl-5 pr-4"
                  style={{ width: `${70 + i * 10}%` }}
                >
                  <Plus className="size-4 shrink-0 text-gold" aria-hidden />
                  <span className="font-serif text-xl sm:text-2xl">{g}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
            <Quote text="Every change you make changes your price point." dark />
            <p data-reveal className="mt-10 text-base leading-relaxed text-white/80">
              Bringing construction thinking into the design conversation helps you weigh those
              choices early. Start with a ballpark estimate, then talk through the site, size,
              design and selections with Lane. Put your budget beside your ideas before the plans
              take on a life of their own.
            </p>
            <p data-reveal className="mt-5 text-sm text-white/60">
              The ballpark is an early planning range, not a construction quote.
            </p>
            <div data-reveal className="mt-8">
              <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- A builder and a designer ---------- */}
      <section data-section="Builder and designer" className="bg-secondary py-24 sm:py-32">
        <div className="wrap grid items-center gap-14 lg:grid-cols-12">
          <div
            data-reveal-img
            className="relative aspect-[4/5] max-w-md overflow-hidden lg:col-span-5"
          >
            <img
              src={TEAM.photo.src}
              alt={TEAM.photo.alt}
              width={580}
              height={645}
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
            <ul className="absolute inset-x-0 bottom-0 grid grid-cols-2 border-t border-white/15 bg-overlay/75 text-white backdrop-blur-md">
              {TEAM.people.map((p, i) => (
                <li key={p.name} className={`p-4 ${i ? "border-l border-white/15" : ""}`}>
                  <span className="block font-serif text-xl leading-none">{p.name}</span>
                  <span className="mt-2 block text-[0.58rem] font-bold uppercase tracking-[0.2em] text-gold">
                    {p.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Kicker>Lane and Kylie</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              A builder and a designer, thinking about the same home
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p data-reveal>
                Lane looks at how the home will be built. Kylie, the designer behind Nordic Green
                Design, looks at how the spaces and materials will come together around you.
              </p>
              <p data-reveal>
                Those perspectives belong together. A window frames a view and affects the room
                around it. A material sets a mood and has to suit everyday use. The layout needs to
                feel right on paper and in the way you move through the finished home.
              </p>
            </div>
            <div data-reveal className="mt-8">
              <LineLink to="/about-us">Meet Lane and Kylie</LineLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- A life beyond the selections ---------- */}
      <section data-section="Beyond the selections" className="bg-background py-24 sm:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 data-split className={HEADING}>
              You have a life beyond the selections
            </h2>
            <p
              data-reveal="left"
              className="mt-8 border-l-2 border-gold pl-6 font-serif text-2xl leading-snug"
            >
              You want a distinctive home. You don&rsquo;t want a second full-time job choosing
              every detail.
            </p>
            <p
              data-reveal
              className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Tell us what you love, what you use and what you would rather not spend your time on.
              We can bring the design conversation back to the decisions that matter: the spaces,
              materials and details that make the home feel like yours.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p data-reveal className="text-base leading-relaxed text-muted-foreground">
              Whether your taste leans towards a warm modern farmhouse, English character or Belgian
              simplicity, the starting point is how you want to live, not a trend to follow.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <li
                  key={s}
                  data-reveal
                  className="border border-slate/25 px-4 py-2 font-serif text-lg transition-colors duration-300 hover:border-gold hover:bg-gold/10"
                >
                  {s}
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-8">
              <LineLink to="/services/design-and-interiors">Explore Design and Interiors</LineLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Considered beneath (dark, photo) ---------- */}
      <section
        data-section="Considered beneath"
        className="relative isolate overflow-hidden py-24 text-white sm:py-32"
      >
        <img
          {...imgProps(IMAGES.hausSide, "100vw")}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-overlay/85" />
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 data-split className={`${HEADING} lg:col-span-6`}>
            Beautiful on the surface. Considered beneath it.
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-white/80 sm:text-lg lg:col-span-5 lg:col-start-8">
            <p data-reveal>
              A luxury home should feel good beyond the first impression. Comfortable rooms,
              thoughtful use of daylight and materials chosen for the way you live deserve attention
              alongside the finish palette.
            </p>
            <p data-reveal>
              Bring your priorities for energy use, comfort and long-term care into the brief from
              the outset. We can talk through them alongside the design and budget.
            </p>
            <div data-reveal className="pt-3">
              <LineLink to="/services/high-performance-homes" dark>
                Explore High-Performance Homes
              </LineLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Bring your architect or designer ---------- */}
      <section data-section="Your architect" className="bg-secondary py-20 sm:py-24">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-center">
          <h2 data-split className={`${HEADING} lg:col-span-5`}>
            Bring your architect or designer
          </h2>
          <div className="lg:col-span-6 lg:col-start-7">
            <p
              data-reveal="left"
              className="border-l-2 border-gold pl-6 font-serif text-2xl leading-snug"
            >
              We work alongside your architect or designer. Bring your plans to the call.
            </p>
            <p data-reveal className="mt-6 text-base leading-relaxed text-muted-foreground">
              If you&rsquo;re starting with ideas rather than drawings, that&rsquo;s a useful
              starting point too. Tell Lane about the property, the home you have in mind and what
              matters most to you.
            </p>
          </div>
        </div>
      </section>

      <HomeFaqs items={FAQS} />
      <HomeClosing
        title="Put a ballpark beside your ideas"
        body="Start with an estimate, then book 15 minutes with Lane. Bring your property details, priorities and any plans you already have."
        note={null}
        link={null}
        contact
      />
    </div>
  );
}
