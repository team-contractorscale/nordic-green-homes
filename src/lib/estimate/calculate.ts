import { pricing } from "./pricing";
import type { Answers, EstimateResult, Survey } from "./types";

function roundTo(value: number, nearest: number): number {
  if (nearest <= 0) return Math.round(value);
  return Math.round(value / nearest) * nearest;
}

/**
 * Parse a budget option label into a numeric [low, high] band.
 * Handles: "Under $50k", "$100,000 - $250,000", "$1M+", "$350,000+".
 */
export function parseBudgetRange(label: string): [number, number] | null {
  if (!label) return null;
  const cleaned = label.replace(/,/g, "").toLowerCase();

  const toNumber = (raw: string): number => {
    const m = raw.match(/\$?\s*([\d.]+)\s*([km]?)/i);
    if (!m) return NaN;
    let n = parseFloat(m[1]!);
    if (m[2] === "k") n *= 1_000;
    else if (m[2] === "m") n *= 1_000_000;
    return n;
  };

  const numbers = cleaned.match(/\$?\s*[\d.]+\s*[km]?/gi)?.map(toNumber) ?? [];
  if (numbers.length === 0 || numbers.some((n) => Number.isNaN(n))) return null;

  if (/under|below|less than|up to/.test(cleaned)) {
    return [0, numbers[0]!];
  }
  if (/\+|over|above|more than/.test(cleaned) && numbers.length === 1) {
    return [numbers[0]!, Math.round(numbers[0]! * 1.4)];
  }
  if (numbers.length >= 2) {
    return [numbers[0]!, numbers[1]!];
  }
  return [numbers[0]!, numbers[0]!];
}

function findByRole(survey: Survey, role: string) {
  return survey.questions.find((q) => q.role === role);
}

export function computeEstimate(survey: Survey, answers: Answers): EstimateResult {
  const cfg = pricing.projects[survey.id];
  const base: EstimateResult = {
    projectType: survey.id,
    projectLabel: survey.label,
    low: 0,
    high: 0,
    currency: "$",
    basis: "unavailable",
  };

  const sizeQ = findByRole(survey, "size");
  const finishQ = findByRole(survey, "finishLevel");
  const budgetQ = findByRole(survey, "budget");

  const sizeRaw = sizeQ ? answers[sizeQ.id] : undefined;
  const size = typeof sizeRaw === "string" ? parseFloat(sizeRaw.replace(/[^\d.]/g, "")) : NaN;

  const finishVal = finishQ ? (answers[finishQ.id] as string) : "Standard";
  const finishMult = cfg.finish[finishVal] ?? cfg.finish["Standard"] ?? 1;

  // Preferred path: size x base rate x finish multiplier.
  if (cfg && size && size > 0) {
    const mid = cfg.basePerUnit * size * finishMult;
    return {
      ...base,
      low: roundTo(mid * (1 - pricing.rangeSpread), pricing.roundTo),
      high: roundTo(mid * (1 + pricing.rangeSpread), pricing.roundTo),
      basis: "calculated",
    };
  }

  // Fallback: use the selected budget band.
  if (budgetQ) {
    const parsed = parseBudgetRange((answers[budgetQ.id] as string) || "");
    if (parsed) {
      return {
        ...base,
        low: roundTo(parsed[0], pricing.roundTo),
        high: roundTo(parsed[1], pricing.roundTo),
        basis: "budget",
      };
    }
  }

  return base;
}

export function formatCurrency(value: number, currency = "$"): string {
  return `${currency}${Math.round(value).toLocaleString("en-CA")}`;
}

/** Cost impact of each finish-level option relative to "Standard", for
 * display next to the option itself (e.g. "+30%") — purely a presentation
 * hint computed from the same pricing config computeEstimate() already
 * uses, keyed by the option's own value string so it drops straight into
 * a lookup with zero risk to the option values themselves. */
export function getFinishPriceHints(survey: Survey): Record<string, string> {
  const cfg = pricing.projects[survey.id];
  const standard = cfg.finish["Standard"] ?? 1;
  const hints: Record<string, string> = {};
  for (const [label, mult] of Object.entries(cfg.finish)) {
    const pct = Math.round((mult / standard - 1) * 100);
    hints[label] = pct === 0 ? "Standard" : `${pct > 0 ? "+" : ""}${pct}%`;
  }
  return hints;
}

export interface EstimateExplanation {
  size: number;
  unit: string;
  finishLabel: string;
  baseRate: number;
  finishMult: number;
  subtotal: number;
  low: number;
  high: number;
}

/** Reconstructs the size x rate x finish-multiplier math behind a
 * "calculated" result, so the result page can show its work instead of
 * just the final range. Returns null for the budget-band fallback path,
 * where there's no real computation to justify. */
export function explainEstimate(survey: Survey, answers: Answers): EstimateExplanation | null {
  const cfg = pricing.projects[survey.id];
  const sizeQ = findByRole(survey, "size");
  const finishQ = findByRole(survey, "finishLevel");

  const sizeRaw = sizeQ ? answers[sizeQ.id] : undefined;
  const size = typeof sizeRaw === "string" ? parseFloat(sizeRaw.replace(/[^\d.]/g, "")) : NaN;
  if (!cfg || !size || size <= 0) return null;

  const finishVal = finishQ ? (answers[finishQ.id] as string) : "Standard";
  const finishMult = cfg.finish[finishVal] ?? cfg.finish["Standard"] ?? 1;
  const subtotal = cfg.basePerUnit * size * finishMult;

  return {
    size,
    unit: sizeQ?.unit ?? "sq ft",
    finishLabel: finishVal,
    baseRate: cfg.basePerUnit,
    finishMult,
    subtotal: roundTo(subtotal, pricing.roundTo),
    low: roundTo(subtotal * (1 - pricing.rangeSpread), pricing.roundTo),
    high: roundTo(subtotal * (1 + pricing.rangeSpread), pricing.roundTo),
  };
}
