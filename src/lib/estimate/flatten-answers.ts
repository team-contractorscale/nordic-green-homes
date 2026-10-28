import type { Answers, Survey } from "./types";

function toStringValue(value: unknown): string {
  if (value == null) return "";
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
}

/** Flatten survey answers into { key: stringValue }, keyed by question id (and each fieldGroup
 * sub-field's own id). */
export function flattenAnswers(survey: Survey, answers: Answers): Record<string, string> {
  const out: Record<string, string> = {};

  for (const q of survey.questions) {
    const answer = answers[q.id];
    if (q.type === "fieldGroup" && q.fields) {
      const group = (answer as Record<string, string>) || {};
      for (const f of q.fields) {
        const v = toStringValue(group[f.id]);
        if (v) out[f.id] = v;
      }
    } else {
      const v = toStringValue(answer);
      if (v) out[q.id] = v;
    }
  }

  return out;
}

export interface AnswerSummaryItem {
  label: string;
  value: string;
}

/** Human-readable recap of the project answers (contact/address groups skipped). */
export function summarizeAnswers(survey: Survey, answers: Answers): AnswerSummaryItem[] {
  const flat = flattenAnswers(survey, answers);
  const items: AnswerSummaryItem[] = [];

  for (const q of survey.questions) {
    if (q.type === "fieldGroup") continue;
    const value = flat[q.id];
    if (!value) continue;
    const optionLabel = q.options?.find((o) => o.value === value)?.label;
    items.push({ label: q.title, value: optionLabel ?? value });
  }

  return items;
}
