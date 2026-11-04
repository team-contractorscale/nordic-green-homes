import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CornerDownRight } from "lucide-react";
import { CTA, IMAGES } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import {
  HEADING,
  Kicker,
  ScrollProgress,
  SectionIndicator,
  HeroTitle,
  HeroBackdrop,
} from "@/components/home/kit";
import { HomeClosing, HomeFaqs } from "@/components/home/HomeSections";

/* Our Process — homepage design language and motion, laid out as a journey of connected
 * decisions. Copy is the client-supplied Process content (2026-11-04); SEO fields from the
 * 3 November manifest.
 * Order: hero with stage map (dark) → how it starts (3-step flow) → the eight stages with a
 * sticky tracker → FAQs → start with your project (dark).
 */

const TITLE = "Planning and Building Your Custom Home | Nordic Green Homes";
const DESCRIPTION =
  "Understand the decisions from the early brief to handover, with scope, responsibilities and project-specific next steps kept clear.";

const INTRO =
  "A custom home is not a single decision. It is a series of connected decisions about the site, design, approvals, materials, performance, price and construction. A clear process helps you understand what each stage is for, what information is needed and who is responsible before the project moves forward.";
const SCOPE_NOTE =
  "This overview shows the decisions a project may involve. Your written scope will set out the stages, deliverables and responsibilities for your home.";

type Stage = {
  title: string;
  body: string[];
  quote?: { text: string; after: string };
  list?: string[];
  outcome: string;
};

const STAGES: Stage[] = [
  {
    title: "Start with the brief",
    body: [
      "Start with the property, project type, intended use, priorities, budget context, timing and any existing design information.",
    ],
    outcome:
      "Use this stage to identify what is known, what is assumed and what needs confirmation.",
  },
  {
    title: "Understand the site and rules",
    body: [
      "Review the site information, local requirements and professional inputs that may affect the project. This is not a building approval decision. It is a way to identify the questions that need answers.",
    ],
    outcome: "Use this stage to list the property, approval and technical questions to answer.",
  },
  {
    title: "Understand the early options",
    body: [
      "Use an indicative estimate or planning discussion to see how project type, size, specification and other choices may affect the range.",
    ],
    quote: {
      text: "Every change changes the price point.",
      after: "Keep the assumptions beside the range so you can see what the number means.",
    },
    outcome:
      "Use this stage to review the assumptions behind a range or decision list. An estimate is not a quote.",
  },
  {
    title: "Choose the next step",
    body: [
      "The consultation identifies project fit, open questions and the next useful step. If private preliminary planning is available, it follows that conversation and has a defined scope, fee, deliverables and exclusions.",
    ],
    outcome:
      "Use this stage to confirm the next step and its boundaries before authorizing further work.",
  },
  {
    title: "Develop the design and documents",
    body: [
      "Translate the brief into the drawings, selections, technical inputs and approval documents required for the project. Confirm who prepares, coordinates and approves each item.",
    ],
    outcome:
      "Use this stage to identify which documents are needed, who prepares them and which decisions remain open.",
  },
  {
    title: "Prepare to build",
    body: [
      "Resolve information needed for pricing, procurement, sequencing, site setup and the construction agreement. Keep unresolved allowances and assumptions visible.",
    ],
    outcome:
      "Before construction, review the scope, price basis, schedule assumptions and open items.",
  },
  {
    title: "Build and record change",
    body: ["Record decisions and changes as work progresses. A useful change record states:"],
    list: [
      "what changed;",
      "why it changed;",
      "who requested and approved it;",
      "the effect on price, timing, materials, approvals or performance; and",
      "what documents were updated.",
    ],
    outcome: "Keep one current record of decisions, scope and approved changes.",
  },
  {
    title: "Complete and hand over",
    body: [
      "Review inspection, completion, documentation, training, deficiencies and post-build responsibilities. A written warranty or service package should identify the responsible entity, coverage, exclusions and claims process.",
    ],
    outcome:
      "Use handover to review what is complete, which documents are supplied and what responsibilities follow.",
  },
];

const FAQS = [
  {
    q: "Is an estimate the same as a quote?",
    a: "No. An estimate is usually based on assumptions and limited information. A quote has a defined scope and commercial basis. The range and process should match the calculator assumptions and the terms you receive in writing.",
  },
  {
    q: "Who manages approvals?",
    a: "The responsible party should be identified for your project, based on the scope and local requirements. Ask who prepares, coordinates and approves each item.",
  },
  {
    q: "Can the sequence change?",
    a: "Yes. Project type, site, existing design work, approvals and performance goals can change what needs to happen and when.",
  },
  {
    q: "How should changes be handled?",
    a: "In a current written record showing the requested change, approval and effect on scope, price, timing and related documentation.",
  },
  {
    q: "What happens after the first call?",
    a: "That depends on the consultation and any preliminary-planning option available. The next step does not promise a quote, approval or free technical work.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: IMAGES.newBuilds.src },
      { name: "twitter:image", content: IMAGES.newBuilds.src },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />
      <ProcessHero />
      <HowItStarts />
      <Stages />
      <HomeFaqs items={FAQS} />
      <HomeClosing
        title="Start with your project"
        body={null}
        note={null}
        link={{ label: "Choose a service", to: "/services" }}
      />
    </div>
  );
}

/* ---------- Hero ----------
 * Text-led, no photo: the masked H1 and intro on the left; on the right a "stage map" listing
 * all eight stages (each jumps to its section), so the whole journey is visible up front.
 */
function ProcessHero() {
  const lines = ["What a custom home", "building process in BC", "should make clear."];
  return (
    <section
      data-section="Our process"
      className="grain relative isolate overflow-hidden bg-overlay text-white"
    >
      <HeroBackdrop image={IMAGES.newBuilds} />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_85%_40%,rgb(187_137_92/0.14),transparent_70%)]"
      />
      <div className="wrap grid min-h-svh items-center gap-14 pb-20 pt-36 lg:grid-cols-12 lg:pt-40">
        <div data-hero-copy className="lg:col-span-7">
          <p
            data-anim="fade"
            className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
          >
            <span aria-hidden className="h-px w-10 bg-gold" />
            Our process
          </p>
          <HeroTitle lines={lines} max="4.5rem" className="mt-7" />
          <p
            data-anim="fade"
            className="mt-8 max-w-[38rem] text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {INTRO}
          </p>
          <p
            data-anim="fade"
            className="mt-6 max-w-[38rem] border-l-2 border-gold pl-5 font-serif text-xl leading-snug"
          >
            {SCOPE_NOTE}
          </p>
        </div>

        <nav aria-label="Process stages" className="lg:col-span-4 lg:col-start-9">
          <p
            data-anim="fade"
            className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold"
          >
            Eight stages
          </p>
          <span data-rule aria-hidden className="mt-4 block h-px w-full origin-left bg-white/20" />
          <ol>
            {STAGES.map((s, i) => (
              <li key={s.title} data-anim="stat" className="border-b border-white/10">
                <a
                  href={`#stage-${i + 1}`}
                  className="group flex items-baseline gap-4 py-3 transition-colors duration-300 hover:text-gold"
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-gold">{pad(i + 1)}</span>
                  <span className="flex-1 font-serif text-lg leading-tight transition-transform duration-500 group-hover:translate-x-1.5">
                    {s.title}
                  </span>
                  <ArrowRight className="size-3.5 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

/* ---------- How it starts ----------
 * The entry path as three connected steps: estimate → call with Lane → (optional) private
 * preliminary planning. The optional step is dashed and unlinked.
 */
function HowItStarts() {
  const steps = [
    { label: CTA.estimate.label, to: CTA.estimate.to },
    { label: CTA.call.label, to: CTA.call.to },
    { label: "Private preliminary planning", note: "If it suits your project" },
  ] as const;
  return (
    <section data-section="How it starts" className="bg-background py-24 sm:py-28">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Kicker>How it starts</Kicker>
            <p data-split className={`${HEADING} mt-6`}>
              Start with a ballpark estimate, then a 15-minute call with Lane.
            </p>
          </div>
          <p
            data-reveal
            className="text-base leading-relaxed text-muted-foreground lg:col-span-5 lg:col-start-8"
          >
            Private preliminary planning may follow the call if it suits your project.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-3 md:gap-0">
          {steps.map((step, i) => {
            const inner = (
              <>
                <span className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.22em]">
                  <span className="text-gold">Step {pad(i + 1)}</span>
                  {"to" in step && (
                    <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
                  )}
                </span>
                <span className="mt-10 block font-serif text-2xl leading-tight sm:text-3xl">
                  {step.label}
                </span>
                {"note" in step && (
                  <span className="mt-3 block text-xs font-bold uppercase tracking-[0.2em] text-slate">
                    {step.note}
                  </span>
                )}
              </>
            );
            const cls = "group relative block h-full p-8 transition-colors duration-500 lg:p-10";
            return (
              <li
                key={step.label}
                data-reveal
                className="relative"
                // each card is its own stacking context (reveal transform): keep arrows on top
                style={{ zIndex: steps.length - i }}
              >
                {"to" in step ? (
                  <Link
                    to={step.to}
                    className={`${cls} border border-border bg-secondary/40 hover:border-gold hover:bg-gold/10`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className={`${cls} border border-dashed border-slate/40`}>{inner}</div>
                )}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 place-items-center bg-gold text-black md:grid"
                  >
                    <ArrowRight className="size-3.5" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- The stages ----------
 * Sticky tracker on the left (lg): all eight stages, the one crossing mid-screen marked active
 * with a gold bar, and a gold line filling with progress (useHomeMotion: data-stage /
 * data-stage-nav / data-stage-fill). Right: one card per stage — outlined number, heading,
 * copy, then the stage's outcome as a highlighted "what to come away with" line. Stage 3 sets
 * its key line as a pull quote; stage 7 sets the change-record contents as a checklist.
 */
function Stages() {
  return (
    <section data-section="The stages" className="bg-secondary py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-32">
            <Kicker>The stages</Kicker>
            <ol className="relative mt-8 border-l border-slate/20">
              <span
                aria-hidden
                data-stage-fill
                className="absolute -left-px top-0 h-full w-px origin-top bg-gold motion-reduce:hidden"
                style={{ transform: "scaleY(0)" }}
              />
              {STAGES.map((s, i) => (
                <li
                  key={s.title}
                  data-stage-nav
                  data-active={i === 0}
                  className="group/nav relative"
                >
                  <a
                    href={`#stage-${i + 1}`}
                    className="flex items-baseline gap-4 py-2.5 pl-6 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground group-data-[active=true]/nav:text-foreground"
                  >
                    <span
                      aria-hidden
                      className="absolute -left-px inset-y-1.5 w-[3px] origin-top scale-y-0 bg-gold transition-transform duration-500 group-data-[active=true]/nav:scale-y-100"
                    />
                    <span className="text-xs font-bold tracking-[0.2em] text-gold">
                      {pad(i + 1)}
                    </span>
                    <span className="font-serif text-lg leading-tight">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ol data-stages className="space-y-6 lg:col-span-8 lg:space-y-8">
          {STAGES.map((s, i) => (
            <li key={s.title} id={`stage-${i + 1}`} data-stage className="scroll-mt-28">
              <article
                data-reveal
                className="group bg-background p-8 shadow-xl shadow-brand-dark/5 sm:p-10 lg:p-12"
              >
                <div className="flex items-start gap-6">
                  <span className="font-serif text-6xl leading-none text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_var(--gold)] group-hover:text-gold sm:text-7xl">
                    {pad(i + 1)}
                  </span>
                  <h2 className="pt-2 font-serif text-[clamp(1.75rem,1.4vw+1rem,2.5rem)] leading-tight">
                    {s.title}
                  </h2>
                </div>

                <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                {s.list && (
                  <ul className="mt-6 divide-y divide-border border-y border-border">
                    {s.list.map((item, j) => (
                      <li key={item} className="flex items-baseline gap-4 py-3 text-base">
                        <span className="text-xs font-bold tracking-[0.2em] text-gold">
                          {pad(j + 1)}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.quote && (
                  <figure className="mt-8 border-l-2 border-gold pl-6">
                    <blockquote className="font-serif text-[clamp(1.75rem,1.4vw+1rem,2.5rem)] leading-tight">
                      &ldquo;{s.quote.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {s.quote.after}
                    </figcaption>
                  </figure>
                )}

                <p className="mt-8 flex gap-3 bg-secondary/60 p-5 text-base leading-relaxed text-foreground sm:p-6">
                  <CornerDownRight aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" />
                  {s.outcome}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
