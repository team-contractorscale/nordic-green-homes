import { Check, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import { CHAT_COPY } from "@/lib/chat-widget-copy";

export function FeedbackCard({
  onFeedback,
}: {
  onFeedback: (kind: "positive" | "negative") => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-foreground">{CHAT_COPY.feedbackQuestionLabel}</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onFeedback("positive")}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:border-primary hover:bg-muted"
        >
          <ThumbsUp className="h-4 w-4 text-primary" />
          {CHAT_COPY.feedbackPositiveLabel}
        </button>
        <button
          type="button"
          onClick={() => onFeedback("negative")}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:border-primary hover:bg-muted"
        >
          <ThumbsDown className="h-4 w-4 text-muted-foreground" />
          {CHAT_COPY.feedbackNegativeLabel}
        </button>
      </div>
    </div>
  );
}

export function FeedbackSubmittedCard({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex flex-col gap-3 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-5 w-5 text-primary" />
      </div>
      <p className="text-sm font-medium text-foreground">
        {CHAT_COPY.feedbackSubmittedThanksLabel}
      </p>
      <button
        type="button"
        onClick={onRestart}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        <RotateCcw className="h-4 w-4" />
        {CHAT_COPY.feedbackRestartLabel}
      </button>
    </div>
  );
}

export function EndedCard({
  endedReason,
  onRestart,
}: {
  endedReason?: string | null | undefined;
  onRestart: () => void;
}) {
  const label =
    endedReason === "agent_unavailable"
      ? CHAT_COPY.agentUnavailableLabel
      : endedReason === "outside_office_hours"
        ? CHAT_COPY.outsideOfficeHoursLabel
        : CHAT_COPY.endedDefaultLabel;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <button
        type="button"
        onClick={onRestart}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        <RotateCcw className="h-4 w-4" />
        {CHAT_COPY.restartLabel}
      </button>
    </div>
  );
}

export function EmailThankYou() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-6 w-6 text-primary" />
      </div>
      <p className="font-serif text-lg font-semibold text-foreground">
        {CHAT_COPY.emailThankYouTitle}
      </p>
      <p className="text-sm text-muted-foreground">{CHAT_COPY.emailThankYouBody}</p>
    </div>
  );
}
