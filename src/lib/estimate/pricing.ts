import type { ProjectType } from "./types";

export interface ProjectPricing {
  /** Base build cost per square foot (CAD). */
  basePerUnit: number;
  /** Multipliers applied to the base rate by chosen finish level. */
  finish: Record<string, number>;
}

export interface PricingConfig {
  rangeSpread: number;
  roundTo: number;
  projects: Record<ProjectType, ProjectPricing>;
}

// PILOT RATES: stand-ins until Nordic Green Homes supplies its own rate card. computeEstimate()
// (./calculate.ts) is the only reader, so swapping real rates in here updates every page.
export const pricing: PricingConfig = {
  rangeSpread: 0.12,
  roundTo: 5000,
  projects: {
    customHome: {
      basePerUnit: 550,
      finish: { Standard: 1, Premium: 1.25, Luxury: 1.5 },
    },
    gardenSuite: {
      basePerUnit: 500,
      finish: { Standard: 1, Premium: 1.2, Luxury: 1.4 },
    },
  },
};
