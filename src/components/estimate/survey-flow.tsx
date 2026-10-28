import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { computeEstimate, getFinishPriceHints } from "@/lib/estimate/calculate";
import { loadState, saveState } from "@/lib/estimate/state";
import { validateQuestion } from "@/lib/estimate/validate";
import { getSurvey } from "@/lib/estimate/surveys";
import { submitEstimateLead } from "@/lib/estimate/submit";
import type { AnswerValue, Answers, ProjectType, Question } from "@/lib/estimate/types";
import { QuestionRenderer } from "./question-renderer";

const HINT_TEXT: Record<Question["type"], string> = {
  single: "Tap an option to continue",
  multi: "Select all that apply, then continue",
  fieldGroup: "Fill in the fields, then continue",
};

export function SurveyFlow({
  projectType,
  backHref = "/estimate",
  onAnswersChange,
}: {
  projectType: ProjectType;
  backHref?: string;
  onAnswersChange?: (answers: Answers) => void;
}) {
  const navigate = useNavigate();
  const survey = getSurvey(projectType);
  const questions = survey.questions;

  // Resumes a matching in-progress attempt (same project type) from
  // sessionStorage — a refresh or accidental back-nav mid-survey no longer
  // wipes everything. Picks up right after the last question that already
  // has a valid answer, rather than always restarting at the top.
  const [answers, setAnswers] = useState<Answers>(() => {
    const saved = loadState();
    return saved.projectType === projectType && saved.answers ? saved.answers : {};
  });
  const [index, setIndex] = useState(() => {
    const saved = loadState();
    if (saved.projectType !== projectType || !saved.answers) return 0;
    const firstUnanswered = questions.findIndex(
      (q) => validateQuestion(q, saved.answers![q.id]) !== null,
    );
    return firstUnanswered === -1 ? 0 : firstUnanswered;
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Autosave — a plain external side effect (sessionStorage), not derived
  // React state, so it belongs in an effect rather than at each call site.
  useEffect(() => {
    saveState({ projectType: survey.id, answers });
  }, [answers, survey.id]);

  const current = questions[index]!;
  const total = questions.length;
  const isLast = index === total - 1;

  const setAnswer = (value: AnswerValue) => {
    const merged = { ...answers, [current.id]: value };
    setAnswers(merged);
    onAnswersChange?.(merged);
    if (error) setError(null);
  };

  const submit = async (finalAnswers: Answers) => {
    setSubmitting(true);
    const result = computeEstimate(survey, finalAnswers);
    saveState({ projectType: survey.id, answers: finalAnswers, result });

    // Best-effort CRM write through the site's existing tracking (gated by PILOT_CRM_ENABLED). The
    // estimate is already saved locally above, so a failed write never blocks the visitor.
    try {
      submitEstimateLead(survey, finalAnswers);
    } catch (err) {
      console.error("[SurveyFlow] error submitting lead:", err);
    }

    navigate({ to: "/consult" });
  };

  const goNext = (mergedAnswers?: Answers) => {
    const data = mergedAnswers ?? answers;
    const err = validateQuestion(current, data[current.id]);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    if (isLast) {
      void submit(data);
      return;
    }
    setIndex((i) => i + 1);
  };

  const goBack = () => {
    setError(null);
    if (index > 0) {
      setIndex((i) => i - 1);
    } else {
      navigate({ to: backHref });
    }
  };

  const handleSingleSelect = (value: string) => {
    const merged = { ...answers, [current.id]: value };
    setAnswers(merged);
    onAnswersChange?.(merged);
    setError(null);
    window.setTimeout(() => {
      if (isLast) {
        void submit(merged);
        return;
      }
      setIndex((i) => i + 1);
    }, 220);
  };

  // Stage grouping is presentation-only (Question.stage, see types.ts) — a
  // survey with no stage tags on its questions falls back to one flat
  // progress bar across all of it, unchanged from before.
  const stages = Array.from(new Set(questions.map((q) => q.stage).filter((s): s is string => !!s)));
  const hasStages = stages.length > 0;
  const stageIndices = stages.map((stage) =>
    questions.map((q, i) => (q.stage === stage ? i : -1)).filter((i) => i !== -1),
  );
  const currentStageIndex = hasStages ? stages.indexOf(current.stage ?? stages[0] ?? "") : -1;

  const stageFill = (stageIndex: number) => {
    if (stageIndex < currentStageIndex) return 100;
    if (stageIndex > currentStageIndex) return 0;
    const indices = stageIndices[stageIndex]!;
    return ((indices.indexOf(index) + 1) / indices.length) * 100;
  };

  const dotIndices = hasStages
    ? (stageIndices[currentStageIndex] ?? [])
    : questions.map((_, i) => i);
  const dotCount = Math.min(dotIndices.length, 12);
  const dotStep = dotIndices.length / dotCount;

  const priceHints = current.role === "finishLevel" ? getFinishPriceHints(survey) : undefined;

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-background p-6 shadow-sm sm:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="font-sans text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
          {survey.label}
        </p>
        <p className="font-sans text-[11px] font-bold text-muted-foreground tabular-nums">
          {index + 1} / {total}
        </p>
      </div>

      {hasStages ? (
        <>
          <div className="mt-3 flex items-center gap-1.5">
            {stages.map((stage, i) => (
              <div key={stage} className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-500 ease-out"
                  style={{ width: `${stageFill(i)}%` }}
                />
              </div>
            ))}
          </div>
          <p className="mt-2 mb-5 font-sans text-xs font-semibold text-muted-foreground">
            Step {currentStageIndex + 1} of {stages.length} — {current.stage}
          </p>
        </>
      ) : (
        <div className="mt-3 mb-5 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gold transition-all duration-500 ease-out"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      )}

      <div className="mb-8 flex items-center gap-1.5">
        {Array.from({ length: dotCount }, (_, i) => {
          const mappedIndex = dotIndices[Math.round(i * dotStep)] ?? 0;
          const isPast = mappedIndex < index;
          const isCurrent = mappedIndex === index;
          return (
            <span
              key={i}
              className={
                isCurrent
                  ? "h-2 w-6 rounded-full bg-primary transition-all duration-300"
                  : isPast
                    ? "h-2 w-2 rounded-full bg-primary/40 transition-all duration-300"
                    : "h-2 w-2 rounded-full bg-border transition-all duration-300"
              }
            />
          );
        })}
      </div>

      <div key={index} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 font-sans text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
          <span className="size-1.5 rounded-full bg-gold" />
          Question {index + 1}
        </span>

        <h2 className="mt-3 font-serif text-2xl leading-snug text-foreground sm:text-[28px]">
          {current.title}
        </h2>
        {current.subText && (
          <p className="mt-1.5 font-sans text-sm text-muted-foreground">{current.subText}</p>
        )}

        <div className="mt-5">
          <QuestionRenderer
            question={current}
            value={answers[current.id]}
            onChange={setAnswer}
            onSingleSelect={handleSingleSelect}
            priceHints={priceHints}
          />
        </div>

        {error && (
          <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 font-sans text-sm font-medium text-destructive">
            {error}
          </p>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={submitting}
          className="tap-target relative inline-flex items-center gap-2 font-sans text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>

        <p className="hidden font-sans text-xs text-muted-foreground sm:block">
          {HINT_TEXT[current.type]}
        </p>

        {current.type !== "single" && (
          <button
            type="button"
            onClick={() => goNext()}
            disabled={submitting}
            className="group inline-flex h-12 min-w-[160px] items-center justify-center gap-3 rounded-full bg-gold py-1 pr-1.5 pl-6 font-sans text-base font-semibold text-black shadow-md shadow-gold/0 transition-all duration-300 hover:scale-[1.04] hover:shadow-lg hover:shadow-gold/40 disabled:pointer-events-none disabled:opacity-60"
          >
            {submitting ? (
              <>
                Calculating
                <Loader2 className="size-4 animate-spin" />
              </>
            ) : (
              <>
                {isLast ? "Get My Estimate" : "Continue"}
                <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-45">
                  <ArrowRight className="size-4" />
                </span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
