import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { CTA, IMAGES } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import {
  HEADING,
  Kicker,
  LineLink,
  ScrollProgress,
  SectionIndicator,
  SweepLink,
  HeroTitle,
  HeroBackdrop,
} from "@/components/home/kit";

/* FAQs (listed under About) — homepage design language and motion. Copy is the client-supplied
 * FAQs content (2026-11-04); SEO from the 3 November manifest.
 * Order: hero with the question index (dark) → every answer open, one row per question →
 * the two CTAs. Answers are always visible (no accordion) so the page reads and indexes fully.
 */

const TITLE = "Custom Home Planning FAQs | Nordic Green Homes";
const DESCRIPTION =
  "Find answers about early planning, estimates, design responsibilities, garden suites and performance terminology.";

const FAQS = [
  {
    q: "What should I prepare before the first conversation?",
    a: "Bring the property or proposed location, your project type, broad goals, timing, budget context and any plans, surveys or inspiration you have.",
  },
  {
    q: "What does an estimate show?",
    a: "It shows an indicative range based on stated assumptions. It is not a quote, approval, contract or promise of final cost.",
  },
  {
    q: "Is an estimate a quote?",
    a: "No. A quote depends on a defined scope and commercial basis.",
  },
  {
    q: "What is the difference between Passive House and high-performance building?",
    a: "Passive House is a defined building standard with published criteria. High-performance is broader and needs a project definition.",
  },
  {
    q: "Can every property support a garden suite?",
    a: "No general website answer can confirm that. Local rules, site conditions, access, servicing and existing buildings all matter.",
  },
  {
    q: "Who handles design and approvals?",
    a: "The responsible party depends on the responsibilities set out for your project. Confirm this before detailed work begins.",
  },
  {
    q: "What makes project proof useful?",
    a: "Projects, images, testimonials, plans and results are most useful when their source, permissions and context are clear.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: FaqsPage,
});

function FaqsPage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />

      {/* ---------- Hero: heading + question index ---------- */}
      <section
        data-section="FAQs"
        className="grain relative isolate overflow-hidden bg-overlay text-white"
      >
        <HeroBackdrop image={IMAGES.farmhouseRear} />
        <div className="wrap grid min-h-svh items-center gap-14 pb-20 pt-36 lg:grid-cols-12 lg:pt-40">
          <div data-hero-copy className="lg:col-span-6">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              Frequently asked questions
            </p>
            <HeroTitle
              lines={["Questions homeowners", "ask before starting."]}
              max="5rem"
              className="mt-7"
            />
            <p
              data-anim="fade"
              className="mt-8 max-w-[34rem] text-base leading-relaxed text-white/85 sm:text-lg"
            >
              These answers help you understand what to prepare, which questions depend on the
              property and what the next step can and cannot tell you.
            </p>
          </div>

          <nav aria-label="Questions on this page" className="lg:col-span-5 lg:col-start-8">
            <p
              data-anim="fade"
              className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold"
            >
              {pad(FAQS.length)} questions
            </p>
            <span
              data-rule
              aria-hidden
              className="mt-4 block h-px w-full origin-left bg-white/20"
            />
            <ol>
              {FAQS.map((f, i) => (
                <li key={f.q} data-anim="stat" className="border-b border-white/10">
                  <a
                    href={`#q-${i + 1}`}
                    className="group flex items-baseline gap-4 py-3 transition-colors duration-300 hover:text-gold"
                  >
                    <span className="text-xs font-bold tracking-[0.2em] text-gold">
                      {pad(i + 1)}
                    </span>
                    <span className="flex-1 font-serif text-lg leading-snug transition-transform duration-500 group-hover:translate-x-1.5">
                      {f.q}
                    </span>
                    <ArrowDown className="size-3.5 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* ---------- Answers: question left, answer right, all open ---------- */}
      <section data-section="Answers" className="bg-background py-24 sm:py-28">
        <div className="wrap">
          <Kicker>Answers</Kicker>
          <h2 data-split className={`${HEADING} mt-6`}>
            Answers to common questions
          </h2>

          <dl className="mt-14 border-t border-border">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                id={`q-${i + 1}`}
                data-reveal
                className="group grid scroll-mt-28 gap-4 border-b border-border py-10 transition-colors duration-500 hover:bg-secondary/40 lg:grid-cols-12 lg:gap-12 lg:px-6 lg:py-12"
              >
                <dt className="flex gap-5 lg:col-span-6">
                  <span className="pt-2 text-xs font-bold tracking-[0.2em] text-gold">
                    {pad(i + 1)}
                  </span>
                  <span className="font-serif text-[clamp(1.5rem,1.2vw+1rem,2.25rem)] leading-tight">
                    {f.q}
                  </span>
                </dt>
                <dd className="border-l-2 border-gold/0 pl-9 text-base leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:border-gold sm:text-lg lg:col-span-5 lg:col-start-8 lg:pl-6">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>

          <div data-reveal className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5">
            <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
            <LineLink to={CTA.call.to}>{CTA.call.label}</LineLink>
          </div>
        </div>
      </section>
    </div>
  );
}
