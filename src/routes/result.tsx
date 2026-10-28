import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Calculator, Calendar, CheckCircle2, Loader2, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { H2, imgProps } from "@/components/home/shared";
import { BRAND } from "@/lib/content-data";
import { IMAGES } from "@/lib/home-content";
import {
  explainEstimate,
  formatCurrency,
  type EstimateExplanation,
} from "@/lib/estimate/calculate";
import { summarizeAnswers } from "@/lib/estimate/flatten-answers";
import { loadState, type StoredState } from "@/lib/estimate/state";
import { getSurvey, typeToServicePath } from "@/lib/estimate/surveys";
import { pricing } from "@/lib/estimate/pricing";

const DISCLAIMER = [
  "This range is a guide. The real cost depends on your site, access, servicing, design and the local rules for your address.",
  "A complimentary 15-minute call with Lane is the quickest way to test it against your property.",
];

const CALL_STEPS = [
  {
    title: "Review your range",
    body: "What sits behind the number and which assumptions matter most.",
  },
  {
    title: "Talk through the property",
    body: "Location, access, servicing and anything already known about the site.",
  },
  {
    title: "Test the brief",
    body: "Size, finish and performance goals against the range you received.",
  },
  {
    title: "Flag what needs checking",
    body: "Local rules and professional inputs to confirm before design.",
  },
  {
    title: "Explain feasibility",
    body: "If it looks like a fit, how preliminary feasibility works and what it covers.",
  },
  { title: "Agree a next step", body: "Or none at all. There is no obligation to go further." },
];

const SPREAD = Math.round(pricing.rangeSpread * 100);

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Your Estimate | Nordic Green Homes" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResultPage,
});

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`text-sm ${strong ? "font-bold text-primary" : "font-bold text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function Breakdown({
  explanation,
  projectLabel,
}: {
  explanation: EstimateExplanation | null;
  projectLabel: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
        <Calculator className="size-5" />
      </span>
      <p className="mt-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">
        How we got this number
      </p>
      <h2 className="mt-2 font-serif text-2xl text-foreground">The math behind your range</h2>
      <div className="mt-5 flex-1">
        {explanation ? (
          <>
            <Row label="Project type" value={projectLabel} />
            <Row
              label="Size used for pricing"
              value={`${explanation.size.toLocaleString("en-CA")} ${explanation.unit}`}
            />
            <Row label="Finish level" value={explanation.finishLabel} />
            <Row
              label="Base rate"
              value={`${formatCurrency(explanation.baseRate)} / ${explanation.unit}`}
            />
            <Row label="Finish multiplier" value={`×${explanation.finishMult}`} />
            <Row label="Subtotal" value={formatCurrency(explanation.subtotal)} />
            <Row
              label={`Estimate range (±${SPREAD}%)`}
              value={`${formatCurrency(explanation.low)} – ${formatCurrency(explanation.high)}`}
              strong
            />
          </>
        ) : (
          <>
            <Row label="Project type" value={projectLabel} />
            <Row label="Calculation basis" value="Selected budget range" />
            <p className="mt-4 text-sm text-muted-foreground">
              This range reflects the budget you selected rather than a size-based calculation.
            </p>
          </>
        )}
      </div>
      <p className="mt-5 text-xs italic text-muted-foreground">
        Indicative rates in CAD. Not a quote: site conditions, approvals and material choices are
        confirmed later.
      </p>
    </div>
  );
}

function ResultPage() {
  // Starts empty on server and client: sessionStorage only exists in the browser. The short
  // "calculating" beat covers the read so nothing visibly jumps.
  const [state, setState] = useState<StoredState>({});
  const [calculating, setCalculating] = useState(true);

  useEffect(() => {
    setState(loadState());
    const t = window.setTimeout(() => setCalculating(false), 1500);
    return () => window.clearTimeout(t);
  }, []);

  const result = state.result;
  const hasResult = !!result && result.basis !== "unavailable";
  const showResult = !calculating && hasResult;
  const midpoint =
    hasResult && result
      ? Math.round((result.low + result.high) / 2 / pricing.roundTo) * pricing.roundTo
      : 0;

  const explanation = useMemo(
    () =>
      hasResult && state.projectType && state.answers
        ? explainEstimate(getSurvey(state.projectType), state.answers)
        : null,
    [hasResult, state.projectType, state.answers],
  );
  const answerSummary = useMemo(
    () =>
      state.projectType && state.answers
        ? summarizeAnswers(getSurvey(state.projectType), state.answers)
        : [],
    [state.projectType, state.answers],
  );

  return (
    <div>
      <section className="relative bg-secondary/50 pb-20">
        {/* Dark band so the floating nav stays legible; the cards overlap its lower edge. */}
        <div className="h-48 bg-primary sm:h-56" />
        <div className="wrap -mt-20">
          <div
            className={`grid gap-6 ${showResult ? "lg:grid-cols-[7fr_4fr] lg:items-stretch" : "mx-auto max-w-xl"}`}
          >
            <div className="relative isolate flex flex-col overflow-hidden rounded-2xl text-center text-white shadow-lg">
              <img
                {...imgProps(IMAGES.hero)}
                alt=""
                className="absolute inset-0 -z-20 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/95 via-primary/90 to-primary" />
              <div className="flex h-full flex-col p-8 sm:p-10">
                <p className="text-sm font-bold tracking-[0.22em] text-gold uppercase">
                  Estimated project cost
                </p>
                <h1 className="mt-3 font-serif text-2xl leading-snug sm:text-3xl">
                  {!calculating && !hasResult
                    ? "Start with a few questions"
                    : "Your project could cost approximately"}
                </h1>

                <div className="mt-6 flex min-h-[80px] flex-1 items-center justify-center">
                  {calculating ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="size-8 animate-spin text-gold" />
                      <p className="text-sm text-white/70">Calculating your estimate…</p>
                    </div>
                  ) : hasResult && result ? (
                    <p className="text-[1.6rem] font-extrabold tracking-tight text-nowrap sm:text-[2.25rem] lg:text-[3.25rem]">
                      {formatCurrency(result.low)} – {formatCurrency(result.high)}
                    </p>
                  ) : (
                    <div>
                      <p className="text-lg font-bold">
                        We don&rsquo;t have an estimate for you yet.
                      </p>
                      <Link
                        to="/estimate"
                        className="mt-2 inline-block text-sm font-bold text-gold underline underline-offset-2"
                      >
                        Start an estimate →
                      </Link>
                    </div>
                  )}
                </div>

                {showResult && result && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm font-bold text-white/70">
                      <span>{formatCurrency(result.low)}</span>
                      <span>{formatCurrency(result.high)}</span>
                    </div>
                    <div className="relative mt-2 h-2.5 w-full rounded-full bg-white/15">
                      <div className="h-full w-full rounded-full bg-gradient-to-r from-gold/40 via-gold to-gold/40" />
                      <span className="absolute top-1/2 left-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-gold shadow" />
                    </div>
                    <p className="mt-3 text-sm text-white/60">
                      Midpoint: {formatCurrency(midpoint)}
                    </p>
                    <div className="mt-6 space-y-2 text-sm italic text-white/70">
                      {DISCLAIMER.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${BRAND.phoneTel}`}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-4 backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-white/15"
                  >
                    <span className="flex size-9 items-center justify-center rounded-full bg-gold text-black transition-transform group-hover:scale-110">
                      <Phone className="size-4" />
                    </span>
                    <span className="text-sm font-bold">Call now</span>
                    <span className="text-xs text-white/60">{BRAND.phoneFormatted}</span>
                  </a>
                  <Link
                    to="/contact"
                    className="group flex flex-col items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-4 backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-white/15"
                  >
                    <span className="flex size-9 items-center justify-center rounded-full bg-gold text-black transition-transform group-hover:scale-110">
                      <Calendar className="size-4" />
                    </span>
                    <span className="text-sm font-bold">Book your call</span>
                    <span className="text-xs text-white/60">Complimentary, 15 minutes</span>
                  </Link>
                </div>
              </div>
            </div>

            {showResult && result && (
              <Breakdown explanation={explanation} projectLabel={result.projectLabel} />
            )}
          </div>
        </div>
      </section>

      {showResult && answerSummary.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="wrap">
            <h2 className={`${H2} text-center`}>What you told us</h2>
            <dl className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {answerSummary.map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-card px-5 py-4">
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="mt-1 font-bold text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={H2}>On your 15-minute call, Lane will</h2>
            <p className="mt-4 text-base text-muted-foreground">
              Turn the range into a clear picture of what applies to your property and what to do
              next.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CALL_STEPS.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                  <CheckCircle2 className="size-5" />
                </span>
                <h3 className="mt-4 font-serif text-xl text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
          {state.projectType && (
            <div className="mt-12 text-center">
              <Link
                to={typeToServicePath[state.projectType]}
                className="inline-flex items-center gap-2 font-bold text-primary underline underline-offset-4 hover:text-gold"
              >
                Read more about {getSurvey(state.projectType).label}s
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
