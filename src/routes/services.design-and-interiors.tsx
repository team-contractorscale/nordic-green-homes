import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CTA, IMAGES, type RefImage } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { RefTag, imgProps } from "@/components/home/shared";
import {
  HEADING,
  Kicker,
  LineLink,
  RelatedLinks,
  ScrollProgress,
  SectionIndicator,
  SweepLink,
  HeroTitle,
  HeroBackdrop,
} from "@/components/home/kit";
import { HomeClosing, HomeFaqs } from "@/components/home/HomeSections";

/* Design and Interiors — homepage design language and motion, laid out like a design brief.
 * Copy is the client-supplied Design & Interiors content (2026-11-04); SEO from the
 * 4 November manifest append.
 * Order: hero with two-image collage (dark) → the brief (a checklist sheet) → design areas
 * (list + sticky image that follows the area in view) → design meets construction (dark) →
 * material direction (swatches) → FAQs → start your design brief (dark) → related.
 */

const TITLE = "Design and Interiors | Nordic Green Homes";
const DESCRIPTION =
  "Explore layout, materials, finishes and everyday details, with design responsibilities defined for your project.";

const BRIEF = [
  "who will use the home and how needs may change;",
  "which spaces need to work hardest;",
  "circulation, storage, privacy and accessibility priorities;",
  "natural light, views and connection to outdoor space;",
  "material, maintenance and durability preferences;",
  "performance goals that could affect form, windows or systems;",
  "existing plans, surveys or reference images; and",
  "budget context and the decisions most likely to change it.",
];

const AREAS: { title: string; body: string; image: RefImage }[] = [
  {
    title: "Spatial planning",
    body: "Room relationships, circulation, storage and the way spaces support everyday routines.",
    image: IMAGES.intro,
  },
  {
    title: "Materials and finish direction",
    body: "A coordinated view of colour, texture, fixtures and finishes, considered alongside maintenance, availability and budget.",
    image: IMAGES.entry,
  },
  {
    title: "Kitchens, bathrooms and joinery",
    body: "Functional requirements, layout and coordination with the wider design. Cabinetry drawings, procurement and supplier management depend on the agreed scope.",
    image: IMAGES.office,
  },
  {
    title: "Lighting and ceiling design",
    body: "Ambience, task needs and coordination with the architecture and services. Your written scope should list the exact deliverables.",
    image: IMAGES.interior,
  },
  {
    title: "Visualization and documentation",
    body: "Floorplans, renderings, schedules or other documentation may support decisions, but the provider, level of detail and purpose must be clear.",
    image: IMAGES.hausPatio,
  },
];

// The palette the copy names, as swatches (CSS only, no imagery claims).
const SWATCHES = [
  { name: "Warm timber", style: "linear-gradient(135deg,#a67c52,#7a5434 60%,#8e6440)" },
  { name: "Stone", style: "linear-gradient(135deg,#b9b4ab,#8f8a82 55%,#a7a199)" },
  {
    name: "Texture",
    style:
      "repeating-linear-gradient(45deg,#d9d2c5 0 6px,#cfc6b7 6px 12px),linear-gradient(#d4ccbe,#d4ccbe)",
  },
  { name: "Light", style: "linear-gradient(160deg,#fbf7ef,#efe6d6)" },
  { name: "Neutral colour", style: "linear-gradient(135deg,#e2e5e4,#c9cdca)" },
];

const FAQS = [
  {
    q: "Can design begin before I own a site?",
    a: "An early brief may begin before a site is chosen, but site-specific design and buildability decisions need the actual property and relevant information.",
  },
  {
    q: "Can I bring an existing architect or designer?",
    a: "We work alongside your architect or designer. Bring your plans to the call. Your project scope will confirm design, coordination and approval responsibilities.",
  },
  {
    q: "What does an interiors service include?",
    a: "Only the items listed in the agreed scope. Ask whether the service includes advice, selections, drawings, schedules, procurement or installation coordination.",
  },
  {
    q: "How do design changes affect price?",
    a: "Changes can affect quantities, products, labour, documentation, structure, services and sequencing. The estimate or project record should show which assumption changed.",
  },
  {
    q: "Does “sustainable design” guarantee a healthy or low-impact home?",
    a: "No. Those outcomes need defined criteria, product information and project evidence. Ask what decisions, methods and evidence support any sustainability or health-related claim.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export const Route = createFileRoute("/services/design-and-interiors")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: IMAGES.interior.src },
      { name: "twitter:image", content: IMAGES.interior.src },
    ],
  }),
  component: DesignInteriorsPage,
});

function DesignInteriorsPage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />

      {/* ---------- Hero: copy + two-image collage ---------- */}
      <section
        data-section="Design and Interiors"
        className="grain relative isolate overflow-hidden bg-overlay text-white"
      >
        <HeroBackdrop image={IMAGES.office} />
        <div className="wrap grid min-h-svh items-center gap-14 pb-20 pt-36 lg:grid-cols-12 lg:pt-40">
          <div data-hero-copy className="lg:col-span-6">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              Design &amp; Interiors
            </p>
            <HeroTitle
              lines={["What custom home", "design in BC", "should make clear."]}
              max="5rem"
              indent
              className="mt-7"
            />
            <p
              data-anim="fade"
              className="mt-8 max-w-[34rem] text-base leading-relaxed text-white/85 sm:text-lg"
            >
              A custom home is experienced through everyday decisions: how rooms connect, where
              natural light enters, what needs to be stored, which materials suit the household and
              how details come together across the project.
            </p>
            <p
              data-anim="fade"
              className="mt-5 max-w-[34rem] border-l-2 border-gold pl-5 font-serif text-xl leading-snug"
            >
              A warm, natural design language can bring texture and calm to a home while leaving
              room for the site, budget and practical requirements to lead the decisions.
            </p>
            <div data-anim="fade" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
              <LineLink to={CTA.call.to} dark>
                {CTA.call.label}
              </LineLink>
            </div>
          </div>

          <div className="relative lg:col-span-5 lg:col-start-8">
            <div
              data-anim="photo"
              className="relative ml-auto aspect-[4/5] w-4/5 overflow-hidden border border-white/15 shadow-2xl shadow-black/40"
            >
              <div data-photo-inner className="absolute inset-x-0 -inset-y-[6%]">
                <img
                  {...imgProps(IMAGES.interior, "(min-width: 1024px) 30vw, 80vw")}
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                />
              </div>
              <RefTag image={IMAGES.interior} className="right-3 top-3" />
            </div>
            <div
              data-anim="photo"
              className="absolute -bottom-10 left-0 aspect-square w-1/2 overflow-hidden border-4 border-overlay shadow-2xl shadow-black/40"
            >
              <img
                {...imgProps(IMAGES.entry, "(min-width: 1024px) 20vw, 50vw")}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Start with how you want to live: the brief sheet ---------- */}
      <section data-section="The brief" className="bg-secondary py-24 sm:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker>The brief</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              Start with how you want to live
            </h2>
            <p
              data-reveal
              className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              The first design step is to separate preferences from requirements. A useful brief can
              cover:
            </p>
            <p
              data-reveal="left"
              className="mt-8 border-l-2 border-gold pl-6 text-base leading-relaxed text-muted-foreground"
            >
              The purpose is to create something that can be tested: not to imply that an early
              concept is approved, priced or buildable.
            </p>
          </div>
          <div
            data-reveal
            className="bg-background p-8 shadow-2xl shadow-brand-dark/10 sm:p-10 lg:col-span-7"
          >
            <div className="flex items-center justify-between border-b-2 border-gold pb-4">
              <span className="font-serif text-2xl">Design brief</span>
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-slate">
                {pad(BRIEF.length)} items
              </span>
            </div>
            <ul className="divide-y divide-border">
              {BRIEF.map((item) => (
                <li key={item} className="flex items-start gap-4 py-4 text-base">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center border border-gold text-gold">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Design areas: list + sticky image following the area in view ---------- */}
      <section data-section="Design areas" className="bg-background py-24 sm:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Kicker>Your project scope</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              Design areas to discuss in your project scope
            </h2>
            <ol className="mt-12 border-t border-border">
              {AREAS.map((a, i) => (
                <li key={a.title} data-stage className="border-b border-border py-10 lg:py-14">
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden lg:hidden">
                    <img
                      {...imgProps(a.image, "100vw")}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <RefTag image={a.image} className="left-3 top-3" />
                  </div>
                  <span className="text-xs font-bold tracking-[0.2em] text-gold">{pad(i + 1)}</span>
                  <h3 className="mt-3 font-serif text-[clamp(1.75rem,1.6vw+1rem,2.75rem)] leading-tight">
                    {a.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {a.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div aria-hidden className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32 aspect-[4/5] overflow-hidden bg-secondary shadow-2xl shadow-brand-dark/15">
              {AREAS.map((a, i) => (
                <div
                  key={a.title}
                  data-stage-nav
                  data-active={i === 0}
                  className="absolute inset-0 scale-105 opacity-0 transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[active=true]:scale-100 data-[active=true]:opacity-100"
                >
                  <img
                    {...imgProps(a.image, "40vw")}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-overlay/85 to-transparent p-6 pt-16 text-white">
                    <span className="text-xs font-bold tracking-[0.2em] text-gold">
                      {pad(i + 1)}
                    </span>
                    <span className="mt-1 block font-serif text-2xl">{a.title}</span>
                  </span>
                  <RefTag image={a.image} className="left-4 top-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Design and construction meet early (dark) ---------- */}
      <section
        data-section="Design meets construction"
        className="grain relative bg-overlay py-24 text-white sm:py-28"
      >
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 data-split className={`${HEADING} lg:col-span-6`}>
            Design and construction questions should meet early
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-white/80 sm:text-lg lg:col-span-5 lg:col-start-8">
            <p data-reveal>
              Some design decisions affect structure, sequencing, lead times, performance and price.
              Considering those consequences early can make the brief more useful and reduce the
              risk of treating selections in isolation.
            </p>
            <p
              data-reveal="left"
              className="border-l-2 border-gold pl-6 font-serif text-xl leading-snug text-white"
            >
              Your agreed scope should state who coordinates design, construction, approvals and
              specialist input.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- A calm, natural material direction: swatches ---------- */}
      <section data-section="Material direction" className="bg-background py-24 sm:py-32">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Kicker>Materials</Kicker>
              <h2 data-split className={`${HEADING} mt-6`}>
                A calm, natural material direction
              </h2>
            </div>
            <p
              data-reveal
              className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-5 lg:col-start-8"
            >
              Warm timber, stone, texture, light and neutral colour can create a home that feels
              grounded without making the design feel fixed. The right palette still depends on how
              the rooms are used, how much maintenance you want and what products are available.
            </p>
          </div>
          <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {SWATCHES.map((sw, i) => (
              <li key={sw.name} data-reveal className="group">
                <span
                  aria-hidden
                  className="block aspect-[3/4] shadow-lg shadow-brand-dark/10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2"
                  style={{ background: sw.style }}
                />
                <span className="mt-4 flex items-baseline gap-3">
                  <span className="text-xs font-bold tracking-[0.2em] text-gold">{pad(i + 1)}</span>
                  <span className="font-serif text-xl">{sw.name}</span>
                </span>
              </li>
            ))}
          </ul>
          <p
            data-reveal="left"
            className="mt-12 max-w-3xl border-l-2 border-gold pl-6 font-serif text-xl leading-snug"
          >
            Bring reference images, material preferences and practical requirements to the brief.
            Then test the choices against performance, budget, lead times and construction details.
          </p>
        </div>
      </section>

      <HomeFaqs items={FAQS} />
      <HomeClosing
        title="Start your design brief"
        body="Bring your plans, ideas, reference images and questions. Begin with the way you want the home to work, then identify the decisions that need to happen next."
        note={null}
        link={null}
      />
      <RelatedLinks
        links={[
          { label: "Services", to: "/services" },
          { label: "Garden Suites", to: "/services/garden-suites" },
          {
            label: "Passive-Home Principles for BC Projects",
            to: "/services/passive-home-builder-bc",
          },
          { label: "High-Performance Homes", to: "/services/high-performance-homes" },
          { label: "Process", to: "/process" },
        ]}
      />
    </div>
  );
}
