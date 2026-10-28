// Derives the /audit field inventory FROM the real survey definitions (surveys.ts) instead of a
// hand-maintained parallel list, so it can't drift (ported from CS-Web-Template).

import { getSurvey } from "./surveys";
import type { ProjectType } from "./types";

export const surveyOrder: ProjectType[] = ["customHome", "gardenSuite"];

export interface MappedField {
  key: string;
  label: string;
  note?: string;
}

// ── Standard fields: contact sub-fields, sent to HighLevel's native contact fields. ──
export const STANDARD_FIELD_KEYS = ["firstName", "lastName", "email", "phone"] as const;

const standardSeen = new Map<string, string>();
for (const type of surveyOrder) {
  for (const q of getSurvey(type).questions) {
    if (q.type !== "fieldGroup") continue;
    for (const f of q.fields ?? []) {
      if ((STANDARD_FIELD_KEYS as readonly string[]).includes(f.id) && !standardSeen.has(f.id)) {
        standardSeen.set(f.id, f.label);
      }
    }
  }
}
export const standardFields: MappedField[] = Array.from(standardSeen, ([key, label]) => ({
  key,
  label,
}));

// ── Custom fields: every non-fieldGroup question, deduped by id, with the surveys that ask it. ──
const customFields = new Map<string, { label: string; surveys: Set<ProjectType> }>();
for (const type of surveyOrder) {
  for (const q of getSurvey(type).questions) {
    if (q.type === "fieldGroup") continue;
    const existing = customFields.get(q.id);
    if (existing) existing.surveys.add(type);
    else customFields.set(q.id, { label: q.title, surveys: new Set([type]) });
  }
}

export const fieldLabels: Record<string, string> = {};
for (const [key, info] of customFields) fieldLabels[key] = info.label;

/** Option values each survey sends for a question, for checking against GHL dropdown options. */
export function optionValues(key: string): string[] {
  const values = new Set<string>();
  for (const type of surveyOrder) {
    for (const q of getSurvey(type).questions) {
      if (q.id === key) for (const o of q.options ?? []) values.add(o.value);
    }
  }
  return [...values];
}

// Nordic has two surveys, so "shared" means asked by both.
export const sharedFieldKeys: string[] = [];
export const perServiceFieldKeys: Record<ProjectType, string[]> = {
  customHome: [],
  gardenSuite: [],
};
for (const [key, info] of customFields) {
  if (info.surveys.size === surveyOrder.length) sharedFieldKeys.push(key);
  else for (const type of info.surveys) perServiceFieldKeys[type].push(key);
}

// ── Computed / meta: set by the app itself, never asked as a question. ──
export const computedFieldKeys = [
  "projectType",
  "estimateLow",
  "estimateHigh",
  "estimateRange",
  "propertyLocation",
  "details",
];
export const computedFieldLabels: Record<string, string> = {
  projectType: "Project Type",
  estimateLow: "Estimate – Low",
  estimateHigh: "Estimate – High",
  estimateRange: "Estimate Range",
  propertyLocation: "Property Location",
  details: "Project Details",
};
export const computedFieldNotes: Record<string, string> = {
  projectType:
    'Auto-set from the survey selected (e.g. "Luxury Custom Home"). Not a user question.',
  estimateLow: "Calculated from size × finish-level pricing (lib/estimate/calculate.ts).",
  estimateHigh: "Calculated from size × finish-level pricing (lib/estimate/calculate.ts).",
  estimateRange: 'Formatted range string, e.g. "$1,815,000 – $2,310,000".',
  propertyLocation: "Address, city, province and postal code combined into one line.",
  details:
    "Every answer plus the range as readable text, so nothing is lost while fields need IDs.",
};
