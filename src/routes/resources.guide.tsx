import { acceptedMetadata } from "@/lib/accepted-metadata";
import { createFileRoute } from "@tanstack/react-router";
import { IMAGES } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import {
  HEADING,
  HeroBackdrop,
  HeroTitle,
  Kicker,
  RelatedLinks,
  ScrollProgress,
  SectionIndicator,
} from "@/components/home/kit";
import { HomeClosing } from "@/components/home/HomeSections";

/* Planning Guide — homepage design language and motion, laid out like a book: a contents list
 * in the hero, then six chapters. Copy is the existing guide copy (disclaimer line removed on
 * client direction, 2026-11-04).
 * Order: hero with contents (dark) → introduction → chapters → discuss your project → related.
 */

const TITLE = "A Practical Guide to Planning Your Custom Home | Nordic Green Homes";
const DESCRIPTION =
  "A custom home is easier to plan when you understand the questions before you are asked to make expensive decisions. This guide is designed to help you organise the brief, test the property and prepare for the conversations that shape design and construction.";

const CHAPTERS = [
  {
    title: "Start with the site",
    body: "Gather the address, access information, existing drawings, survey material and the questions you already have. The property sets limits and creates opportunities.",
  },
  {
    title: "Define how you want to live",
    body: "Write down the rooms, routines, storage, privacy, light and flexibility that matter to your household. A clear brief gives every later decision a reason.",
  },
  {
    title: "Understand performance goals",
    body: "Comfort, energy, ventilation, airtightness and durability need clear definitions. The guide helps you separate a goal from a promise and identify where technical evidence is needed.",
  },
  {
    title: "Keep scope and budget connected",
    body: "Size, structure, materials, services, approvals and performance goals can all change the project. Keep assumptions visible as the brief develops.",
  },
  {
    title: "Prepare for approvals and change",
    body: "Know which questions need the municipality, a designer, an engineer, an energy advisor or the builder. Record changes so you can see their effect on scope, cost and timing.",
  },
  {
    title: "Choose the next conversation",
    body: "Use your notes to decide whether you need a feasibility discussion, design input, a performance brief or another project-specific next step.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export const Route = createFileRoute("/resources/guide")({
  head: () => ({
    meta: [
      ...acceptedMetadata("/resources/guide"),
      { property: "og:image", content: IMAGES.office.src },
      { name: "twitter:image", content: IMAGES.office.src },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />

      {/* ---------- Hero: title + contents ---------- */}
      <section
        data-section="Planning guide"
        className="grain relative isolate overflow-hidden bg-overlay text-white"
      >
        <HeroBackdrop image={IMAGES.hausGarden} />
        <div className="wrap grid min-h-svh items-center gap-14 pb-20 pt-36 lg:grid-cols-12 lg:pt-40">
          <div data-hero-copy className="lg:col-span-7">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              Planning guide
            </p>
            <HeroTitle
              lines={["A practical guide", "to planning your", "custom home."]}
              max="5rem"
              indent
              className="mt-7"
            />
            <p
              data-anim="fade"
              className="mt-8 max-w-[34rem] border-l-2 border-gold pl-5 font-serif text-2xl leading-snug"
            >
              Make the early decisions with more confidence
            </p>
          </div>

          <nav aria-label="Inside the guide" className="lg:col-span-4 lg:col-start-9">
            <p
              data-anim="fade"
              className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold"
            >
              Contents
            </p>
            <span
              data-rule
              aria-hidden
              className="mt-4 block h-px w-full origin-left bg-white/20"
            />
            <ol>
              {CHAPTERS.map((c, i) => (
                <li key={c.title} data-anim="stat" className="border-b border-white/10">
                  <a
                    href={`#chapter-${i + 1}`}
                    className="group flex items-baseline gap-4 py-3 transition-colors duration-300 hover:text-gold"
                  >
                    <span className="text-xs font-bold tracking-[0.2em] text-gold">
                      {pad(i + 1)}
                    </span>
                    <span className="flex-1 font-serif text-lg leading-tight transition-transform duration-500 group-hover:translate-x-1.5">
                      {c.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* ---------- Introduction ---------- */}
      <section data-section="Introduction" className="bg-background py-24 sm:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>About this guide</Kicker>
          </div>
          <p
            data-reveal
            className="font-serif text-[clamp(1.5rem,1.4vw+1rem,2.375rem)] leading-[1.3] tracking-[-0.01em] lg:col-span-8"
          >
            {DESCRIPTION}
          </p>
        </div>
      </section>

      {/* ---------- Chapters ---------- */}
      <section data-section="Chapters" className="bg-secondary py-24 sm:py-28">
        <div className="wrap">
          <Kicker>Inside the guide</Kicker>
          <h2 data-split className={`${HEADING} mt-6`}>
            Six chapters
          </h2>
          <ol className="mt-14 grid gap-px border border-slate/15 bg-slate/15 [perspective:1400px] md:grid-cols-2 lg:grid-cols-3">
            {CHAPTERS.map((c, i) => (
              <li
                key={c.title}
                id={`chapter-${i + 1}`}
                data-tile
                className="group flex min-h-[18rem] scroll-mt-28 flex-col bg-background p-8 lg:p-10"
              >
                <span className="flex items-baseline justify-between">
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-slate">
                    Chapter
                  </span>
                  <span className="block overflow-hidden">
                    <span
                      data-num
                      className="block font-serif text-6xl leading-none text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_var(--gold)] group-hover:text-gold"
                    >
                      {pad(i + 1)}
                    </span>
                  </span>
                </span>
                <h3 className="mt-auto pt-10 font-serif text-2xl leading-tight">{c.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-section="Beyond move-in" className="bg-background py-20">
        <div className="wrap">
          <h2 className="font-serif text-4xl">Think beyond the first move-in day</h2>
          <div className="mt-8 grid gap-x-12 lg:grid-cols-2">
            <article className="py-6">
              <h3 className="font-serif text-2xl">Rooms that can change with you</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Consider how a room might serve different needs over time: working from home,
                visiting family or changing storage needs. Bring those possibilities into the layout
                brief.
              </p>
            </article>
            <article className="py-6">
              <h3 className="font-serif text-2xl">Water and everyday use</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Include water use in conversations about fixtures, landscaping and household
                routines. Compare options against your needs and local conditions rather than
                assuming a saving.
              </p>
            </article>
            <article className="py-6">
              <h3 className="font-serif text-2xl">Energy systems as options, not inclusions</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Solar, geothermal, energy storage and smart controls are topics to discuss with the
                appropriate specialists. Suitability, cost and any benefit depend on the property,
                design and system. They are not standard Nordic inclusions.
              </p>
            </article>
            <article className="py-6">
              <h3 className="font-serif text-2xl">Materials for the long term</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Consider maintenance, repair and replacement alongside the initial look of a
                material. Ask how each choice fits the way you intend to use the home.
              </p>
            </article>
          </div>
        </div>
      </section>

      <HomeClosing title="Discuss your project" body={null} note={null} link={null} />
      <RelatedLinks
        links={[
          { label: "All resources", to: "/resources" },
          { label: "BC Energy Step Code", to: "/resources/bc-energy-step-code" },
          { label: "Discuss your project", to: "/contact" },
        ]}
      />
    </div>
  );
}
