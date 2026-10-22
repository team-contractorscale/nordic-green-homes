import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { projectPhoto } from "@/lib/home-content";
import { H2, HomeConsultation } from "@/components/home/NordicHome";
import { ClosingSection, FaqList } from "@/components/page/PageParts";

const DESCRIPTION =
  "A custom home is not a single decision. It is a series of connected decisions about the site, design, approvals, materials, performance, price and construction. A clear process helps you understand what each stage is for, what information is needed and who is responsible before the project moves forward.";

type Stage = { title: string; body: string[]; list?: string[]; outcome: string };

const STAGES: Stage[] = [
  {
    title: "Start with the brief",
    body: [
      "Start with the property, project type, intended use, priorities, budget context, timing and any existing design information.",
    ],
    outcome:
      "You leave this stage with a clearer view of what is known, what is assumed and what needs confirmation.",
  },
  {
    title: "Understand the site and rules",
    body: [
      "Review the site information, local requirements and professional inputs that may affect the project. This is not a building approval decision. It is a way to identify the questions that need answers.",
    ],
    outcome: "The result is a clear list of property, approval and technical questions to answer.",
  },
  {
    title: "Understand the early options",
    body: [
      "Use an indicative estimate or planning discussion to see how project type, size, specification and other choices may affect the range.",
      "Every change changes the price point. Keep the assumptions beside the range so you can see what the number means.",
    ],
    outcome: "The result is an assumption-led range or decision list, not a quote.",
  },
  {
    title: "Choose the next step",
    body: [
      "The consultation identifies project fit, open questions and the next useful step. If private preliminary planning is available, it follows that conversation and has a defined scope, fee, deliverables and exclusions.",
    ],
    outcome: "You leave with a clearer next-step recommendation and agreed boundaries.",
  },
  {
    title: "Develop the design and documents",
    body: [
      "Translate the brief into the drawings, selections, technical inputs and approval documents required for the project. Confirm who prepares, coordinates and approves each item.",
    ],
    outcome:
      "You have a clearer view of which documents are needed, who prepares them and which decisions remain open.",
  },
  {
    title: "Prepare to build",
    body: [
      "Resolve information needed for pricing, procurement, sequencing, site setup and the construction agreement. Keep unresolved allowances and assumptions visible.",
    ],
    outcome:
      "Before construction, you can review the scope, price basis, programme basis and open items.",
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
      "At handover, you can see what is complete, which documents are supplied and what responsibilities follow.",
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

const HEADER_IMAGE = projectPhoto("MKPhoto-1842.jpg");

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Our Process | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: HEADER_IMAGE },
      { name: "twitter:image", content: HEADER_IMAGE },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <div>
      <PageHeader
        image={HEADER_IMAGE}
        imageAlt="Completed building exterior (reference image)"
        title="What a custom home building process in BC should make clear"
        description={DESCRIPTION}
      >
        <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
          Every project is different, but the same questions return: what does the site require,
          what does the household need, what changes the scope and who is responsible for the next
          decision?
        </p>
      </PageHeader>

      {/* Eight stages as a numbered timeline */}
      <section className="py-24 sm:py-28">
        <div className="wrap max-w-4xl">
          <ol>
            {STAGES.map((s, i) => (
              <li key={s.title} className="relative flex gap-6 pb-14 last:pb-0 sm:gap-8">
                {i < STAGES.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[1.375rem] top-12 bottom-0 w-px bg-border"
                  />
                )}
                <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg text-white">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-serif text-2xl text-foreground">{s.title}</h3>
                  <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                    {s.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  {s.list && (
                    <ul className="mt-4 space-y-2">
                      {s.list.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-base leading-relaxed text-foreground"
                        >
                          <span
                            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-5 border-l-2 border-gold pl-4 text-base font-bold leading-relaxed text-foreground">
                    {s.outcome}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap max-w-4xl">
          <h2 className={`${H2} text-center`}>Frequently asked questions</h2>
          <FaqList items={FAQS} />
        </div>
      </section>

      <ClosingSection
        title="Start with your project"
        links={[
          { label: "Discuss your project", to: "/contact" },
          { label: "Choose a service", to: "/services" },
        ]}
      />

      <HomeConsultation />
    </div>
  );
}
