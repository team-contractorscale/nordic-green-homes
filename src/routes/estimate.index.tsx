import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Home, Plus, Trees } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { H2, imgProps } from "@/components/home/shared";
import { EstimateSidebar } from "@/components/estimate/estimate-sidebar";
import { IMAGES } from "@/lib/home-content";
import { typeToPath } from "@/lib/estimate/surveys";

const DESCRIPTION =
  "Answer a few questions about your custom home or garden suite and see an indicative price range on the spot. No obligation, no waiting on a callback.";

const HEADER_IMAGE = IMAGES.hero.src;

const PROJECTS = [
  {
    to: typeToPath.customHome,
    label: "Luxury Custom Home",
    blurb: "A new home, designed around your site",
    image: IMAGES.customHomes,
    icon: Home,
  },
  {
    to: typeToPath.gardenSuite,
    label: "Garden Suite",
    blurb: "Garden suite, coach house or laneway home",
    image: IMAGES.hausGarden,
    icon: Trees,
  },
] as const;

const STEPS = [
  {
    title: "Answer a few questions",
    body: "Size, finish level, performance goal and timeline. It takes a few minutes.",
  },
  {
    title: "See an indicative range",
    body: "The range is calculated on the spot from the size and finish you choose.",
  },
  {
    title: "Talk it through with Lane",
    body: "Book a complimentary 15-minute call to test the range against your property and brief.",
  },
];

const FAQS = [
  {
    q: "Is this a quote?",
    a: "No. It is an indicative range based on the size and finish you choose. It is not a quote, approval, contract or promise of final cost.",
  },
  {
    q: "What can change the number?",
    a: "Site conditions, access, servicing, structure, design complexity, materials, approvals and performance targets can all change the cost of a project.",
  },
  {
    q: "Will someone contact me?",
    a: "Only to follow up on your estimate, and you can say no at any time. Booking the 15-minute call is your choice.",
  },
  {
    q: "What happens after the call?",
    a: "If the project looks like a fit, the next step is a preliminary feasibility review. What it covers is explained on the call, before you commit to anything.",
  },
];

export const Route = createFileRoute("/estimate/")({
  head: () => ({
    meta: [
      { title: "Instant Estimate | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Instant Estimate | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: HEADER_IMAGE },
      { name: "twitter:image", content: HEADER_IMAGE },
    ],
  }),
  component: EstimatePage,
});

function EstimatePage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <PageHeader
        image={HEADER_IMAGE}
        imageAlt={IMAGES.hero.alt}
        eyebrow="Instant estimate"
        title="See an indicative range in minutes"
        description={DESCRIPTION}
      />

      <section className="bg-secondary/50 py-20 sm:py-24">
        <div className="wrap flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
              Step 1 of 3
            </p>
            <h2 className={`${H2} mt-3`}>What are you planning to build?</h2>
            <p className="mt-3 text-base text-muted-foreground">Choose a project to get started.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {PROJECTS.map(({ to, label, blurb, image, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="group relative flex h-[280px] flex-col justify-end overflow-hidden rounded-lg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-[340px]"
                >
                  <img
                    {...imgProps(image, "(min-width: 640px) 40vw, 100vw")}
                    alt={label}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <span className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white text-primary transition-colors duration-300 group-hover:bg-gold group-hover:text-black">
                    <Icon className="size-5" />
                  </span>
                  <div className="relative p-5 sm:p-6">
                    <h3 className="font-serif text-2xl text-white">{label}</h3>
                    <p className="mt-1 text-sm text-white/80">{blurb}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-gold">
                      Start estimate
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <EstimateSidebar />
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="wrap">
          <h2 className={`${H2} text-center`}>Three steps to your range</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="rounded-xl border border-border bg-card p-7 shadow-sm"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-primary font-serif text-lg text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-serif text-xl text-foreground">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap max-w-4xl">
          <h2 className={`${H2} text-center`}>Before you start</h2>
          <div className="mt-12 space-y-4">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-serif text-lg text-foreground transition-colors hover:bg-muted/30"
                  >
                    <span>{faq.q}</span>
                    <Plus
                      className={`size-5 shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-border/60 px-6 pb-6 pt-4 text-base leading-relaxed text-muted-foreground">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
