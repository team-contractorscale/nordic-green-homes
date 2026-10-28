import { CheckCircle2, Mail, Phone, TrendingUp } from "lucide-react";
import { BRAND } from "@/lib/content-data";
import { computeEstimate, formatCurrency } from "@/lib/estimate/calculate";
import { getSurvey } from "@/lib/estimate/surveys";
import type { Answers, ProjectType } from "@/lib/estimate/types";

const NEXT_STEPS = [
  "Instant indicative range, shown on screen",
  `Complimentary 15-minute call with ${BRAND.directors.split(" ")[0]}`,
  "No obligation to book anything further",
];

// projectType/answers are optional: the same sidebar sits on the /estimate picker, before any
// survey has started, where there's nothing yet to estimate.
export function EstimateSidebar({
  projectType,
  answers,
}: {
  projectType?: ProjectType;
  answers?: Answers;
}) {
  const result = projectType && answers ? computeEstimate(getSurvey(projectType), answers) : null;
  const hasEstimate = !!result && result.basis !== "unavailable";

  return (
    <aside className="flex w-full shrink-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-background shadow-sm lg:sticky lg:top-28 lg:w-[320px] lg:self-start xl:w-[360px]">
      <div className="border-b border-border px-7 py-6">
        <p className="font-serif text-xl text-primary">{BRAND.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">Sustainable luxury homes, BC</p>
      </div>

      {projectType && (
        <div className="border-b border-border bg-secondary/60 px-7 py-6">
          <p className="flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] text-primary uppercase">
            <TrendingUp className="size-3.5" />
            Your estimate so far
          </p>
          {hasEstimate && result ? (
            <p className="mt-2 text-2xl font-extrabold tracking-tight text-primary">
              {formatCurrency(result.low)} – {formatCurrency(result.high)}
            </p>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Keep going. Your range appears here once we know the size and finish level.
            </p>
          )}
        </div>
      )}

      <div className="divide-y divide-border px-7">
        <a href={`tel:${BRAND.phoneTel}`} className="group flex items-center gap-4 py-5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
            <Phone className="size-4" />
          </span>
          <span>
            <span className="block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
              Call
            </span>
            <span className="mt-0.5 block font-bold text-foreground group-hover:underline">
              {BRAND.phoneFormatted}
            </span>
          </span>
        </a>
        <a href={`mailto:${BRAND.email}`} className="group flex items-center gap-4 py-5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
            <Mail className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
              Email
            </span>
            <span className="mt-0.5 block break-all font-bold text-foreground group-hover:underline">
              {BRAND.email}
            </span>
          </span>
        </a>
      </div>

      <div className="mt-auto bg-primary px-7 py-6">
        <p className="text-[10px] font-bold tracking-[0.2em] text-gold uppercase">
          What happens next
        </p>
        <ul className="mt-3 space-y-2.5">
          {NEXT_STEPS.map((step) => (
            <li key={step} className="flex items-start gap-2.5 text-sm text-white/90">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />
              {step}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
