import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, PlayCircle, RefreshCcw, TrendingUp, X } from "lucide-react";
import { Eyebrow, H2, Placeholder, imgProps } from "@/components/home/shared";
import { IMAGES } from "@/lib/home-content";

// Bridge page between the estimate wizard and /result (same order as CS-Web-Template's funnel):
// explains the complimentary 15-minute call before the visitor sees their number.

const DESCRIPTION =
  "Before you see your estimate: why the number only becomes useful once it is tested against your property, and what happens on a complimentary 15-minute call with Lane.";

const PROBLEM_POINTS = [
  "Pay again to redraw a design you already love so it fits the budget",
  "Spend well beyond what you planned to build it as drawn",
  "Shelve the project and lose what you spent on the design",
];

const PAIN_POINTS = [
  {
    icon: RefreshCcw,
    title: "Redesign costs",
    body: "Paying to bring a finished design back down to a price you can live with.",
  },
  {
    icon: TrendingUp,
    title: "Budget surprises",
    body: "Finding out the real number after the drawings are done, when changing course costs the most.",
  },
  {
    icon: Clock,
    title: "Stalled projects",
    body: "A design that sits in a drawer because nobody tested it against the budget early.",
  },
];

const CHECKLIST = [
  "Site survey and geotechnical input",
  "Permits and municipal requirements",
  "Servicing and utility connections",
  "Foundations and structure",
  "Building envelope and windows",
  "Ventilation and mechanical systems",
  "Roofing and exterior cladding",
  "Interior finishes and millwork",
  "Project management",
];

const COMPARISON = {
  old: [
    "Hire a designer",
    "Pay for full drawings",
    "Ask builders to price it",
    "Discover the real cost",
    "Redesign, cut scope or walk away",
  ],
  new: [
    "Get an instant estimate",
    "Complimentary 15-minute call with Lane",
    "Preliminary feasibility, explained after the call",
    "Design within a tested budget",
    "Build with clear expectations",
  ],
};

const CALL_STEPS = [
  {
    title: "Your range, in context",
    body: "Lane talks through the estimate you just received and what sits behind it.",
    image: IMAGES.office,
  },
  {
    title: "Your property and brief",
    body: "Where the property is, what you want to build and what is already known.",
    image: IMAGES.customHomes,
  },
  {
    title: "What needs checking",
    body: "The site, access, servicing and local rules that could change the picture.",
    image: IMAGES.hausGarden,
  },
  {
    title: "A clear next step",
    body: "If it looks like a fit, how preliminary feasibility works. No obligation to go further.",
    image: IMAGES.interior,
  },
];

export const Route = createFileRoute("/consult")({
  head: () => ({
    meta: [
      { title: "Your Complimentary 15-Minute Call | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ConsultPage,
});

// The one CTA repeated down the page, always to /result (as in the template funnel).
function ResultButton({ tone = "gold" }: { tone?: "gold" | "green" }) {
  return (
    <Link
      to="/result"
      className={`group inline-flex h-12 items-center gap-3 rounded-full py-1 pl-6 pr-1.5 text-base font-bold shadow-md transition-all duration-300 hover:scale-[1.04] hover:shadow-lg ${
        tone === "gold" ? "bg-gold text-black" : "bg-primary text-white"
      }`}
    >
      See my estimate
      <span
        className={`flex size-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-45 ${
          tone === "gold" ? "bg-primary text-white" : "bg-gold text-black"
        }`}
      >
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}

function ConsultPage() {
  return (
    <div>
      {/* 1. Hero + video from Lane */}
      <section className="relative isolate overflow-hidden bg-primary pt-36 pb-20 text-white sm:pt-44 sm:pb-24">
        <img
          {...imgProps(IMAGES.hausPatio)}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(13_61_50/0.9)_0%,rgb(13_61_50/0.8)_50%,rgb(13_61_50/0.95)_100%)]" />
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-1.5 text-xs font-bold text-black">
              Complimentary 15-minute call with Lane
            </span>
            <h1 className="mt-6 font-serif text-[clamp(2.25rem,3vw+1rem,3.75rem)] leading-[1.08]">
              Don&rsquo;t finalize a design before you know what it could cost
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              Your estimate is ready. Before you see it, here is why the number becomes useful once
              it is tested against your property, and how a short call with Lane does that.
            </p>
            <div className="mt-8">
              <ResultButton />
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/20 bg-black/40 shadow-2xl">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
              <PlayCircle className="size-16 text-gold" aria-hidden />
              <Placeholder dark>[Video from Lane — pending]</Placeholder>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The problem */}
      <section className="py-24 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <h2 className={`${H2} mt-4`}>Designing first and pricing later is a gamble</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              When a design is finished before anyone tests it against the budget, the first real
              price can arrive well above what you planned. At that point every option costs more.
            </p>
          </div>
          <ul className="space-y-4 self-center">
            {PROBLEM_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <X className="size-4" />
                </span>
                <span className="text-base text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. What usually goes wrong */}
      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow>What usually goes wrong</Eyebrow>
            </div>
            <h2 className={`${H2} mt-4`}>Three ways a design-first project derails</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PAIN_POINTS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-7 shadow-sm">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary text-gold">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-serif text-xl text-foreground">{title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What a build involves */}
      <section className="py-24 sm:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              {...imgProps(IMAGES.nordicHaus, "(min-width: 1024px) 50vw, 100vw")}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <Eyebrow>What a build involves</Eyebrow>
            <h2 className={`${H2} mt-4`}>More line items than most people expect</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A drawing rarely prices these in. Bringing a builder into the conversation early is
              how they get counted before the design is locked.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-center gap-3 text-base text-foreground">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-black">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ResultButton tone="green" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Design-first vs cost-first */}
      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow>Two ways to start</Eyebrow>
            </div>
            <h2 className={`${H2} mt-4`}>Design first, or cost first</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-8">
              <h3 className="font-serif text-2xl text-muted-foreground">Design first</h3>
              <ol className="mt-6 space-y-4">
                {COMPARISON.old.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-4 text-base text-muted-foreground"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-sm font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-xl bg-primary p-8 text-white shadow-lg">
              <h3 className="font-serif text-2xl text-gold">Cost first</h3>
              <ol className="mt-6 space-y-4">
                {COMPARISON.new.map((step, i) => (
                  <li key={step} className="flex items-center gap-4 text-base">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-black">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Tagline divider */}
      <section className="bg-primary py-16 text-center text-white">
        <div className="wrap">
          <p className="font-serif text-[clamp(1.5rem,1.5vw+1rem,2.25rem)] leading-snug text-white/85">
            Designers show you what your home could look like.
          </p>
          <p className="mt-2 font-serif text-[clamp(1.5rem,1.5vw+1rem,2.25rem)] leading-snug text-gold">
            Builders make it real.
          </p>
        </div>
      </section>

      {/* 7. What happens on the call */}
      <section className="py-24 sm:py-28">
        <div className="wrap">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow>What to expect</Eyebrow>
            </div>
            <h2 className={`${H2} mt-4`}>What happens on your 15-minute call</h2>
          </div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CALL_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
              >
                <img
                  {...imgProps(step.image, "(min-width: 1024px) 25vw, 50vw")}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-foreground">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="pb-24 sm:pb-28">
        <div className="wrap">
          <div className="relative isolate overflow-hidden rounded-2xl px-8 py-16 text-center text-white sm:px-14">
            <img
              {...imgProps(IMAGES.farmhouseRear)}
              alt=""
              loading="lazy"
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-primary/90" />
            <div className="flex justify-center">
              <Eyebrow dark>Your estimate is ready</Eyebrow>
            </div>
            <h2 className={`${H2} mx-auto mt-4 max-w-3xl`}>
              Take the guesswork out of the first decision
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85">
              See your range, then book a complimentary 15-minute call with Lane to test it against
              your property. There is no obligation to go further.
            </p>
            <div className="mt-8 flex justify-center">
              <ResultButton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
