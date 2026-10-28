import type { Answers, EstimateResult, ProjectType } from "./types";

const KEY = "estimateFunnel:v1";

export interface StoredState {
  projectType?: ProjectType;
  answers?: Answers;
  result?: EstimateResult;
  updatedAt?: number;
}

export function loadState(): StoredState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredState) : {};
  } catch {
    return {};
  }
}

export function saveState(patch: StoredState): StoredState {
  if (typeof window === "undefined") return patch;
  const next: StoredState = { ...loadState(), ...patch, updatedAt: Date.now() };
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Ignore quota/serialization errors — the wizard still works, it just
    // won't have the answers to prefill the result page.
  }
  return next;
}
