// Shared types for the instant-estimate funnel (/estimate, /estimate/custom-home,
// /estimate/garden-suite, /consult, /result). Ported from CS-Web-Template; Nordic only estimates
// the two project types it builds (renovations and extensions stay with O'Brien Contracting).

export type ProjectType = "customHome" | "gardenSuite";

export type QuestionType = "single" | "multi" | "fieldGroup";

/** Lets the estimate engine find the important questions generically. */
export type QuestionRole = "finishLevel" | "size" | "budget";

export interface Option {
  label: string;
  value: string;
}

export interface FieldDef {
  /** Sub-field key within a fieldGroup answer object. */
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "number";
  required?: boolean;
  /** Layout width hint for the field grid. */
  half?: boolean;
  defaultValue?: string;
}

export interface Question {
  /** Answer key within Answers. */
  id: string;
  type: QuestionType;
  title: string;
  subText?: string;
  required?: boolean;
  role?: QuestionRole;
  options?: Option[];
  unit?: string;
  fields?: FieldDef[];
  /** Presentation-only grouping label for the wizard's staged progress bar. */
  stage?: string;
}

export interface Survey {
  id: ProjectType;
  label: string;
  description: string;
  questions: Question[];
}

export type AnswerValue = string | string[] | Record<string, string>;
export type Answers = Record<string, AnswerValue>;

export type EstimateBasis = "calculated" | "budget" | "unavailable";

export interface EstimateResult {
  projectType: ProjectType;
  projectLabel: string;
  low: number;
  high: number;
  currency: string;
  basis: EstimateBasis;
}
