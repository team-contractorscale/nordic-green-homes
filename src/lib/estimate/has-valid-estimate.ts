import type { EstimateResult } from "./types";

// Display-state guard only: no rate, calculation or CRM behaviour changes.
export function hasValidEstimate(value: unknown): value is EstimateResult {
  if (!value || typeof value !== "object") return false;
  const r = value as Partial<EstimateResult>;
  return (
    (r.basis === "calculated" || r.basis === "budget") &&
    (r.projectType === "customHome" || r.projectType === "gardenSuite") &&
    r.currency === "CAD" &&
    typeof r.low === "number" &&
    typeof r.high === "number" &&
    Number.isFinite(r.low) &&
    Number.isFinite(r.high) &&
    r.low > 0 &&
    r.high >= r.low
  );
}
