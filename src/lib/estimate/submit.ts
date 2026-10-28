import { computeEstimate, formatCurrency } from "./calculate";
import { flattenAnswers, summarizeAnswers } from "./flatten-answers";
import type { Answers, Survey } from "./types";
import {
  CUSTOM_FIELD_IDS,
  TRACKING_IDS,
  getTrackingSessionId,
  postTrackingEvent,
} from "@/lib/form-tracking";

// Sends a completed estimate through the same CRM tracking the contact form uses, so it obeys
// PILOT_CRM_ENABLED and lands in the same HighLevel location.
export function submitEstimateLead(survey: Survey, answers: Answers) {
  const flat = flattenAnswers(survey, answers);
  const result = computeEstimate(survey, answers);
  const range =
    result.basis === "unavailable"
      ? "Not calculated"
      : `${formatCurrency(result.low)} – ${formatCurrency(result.high)}`;
  const location = [flat["address1"], flat["city"], flat["state"], flat["postalCode"]]
    .filter(Boolean)
    .join(", ");
  const details = summarizeAnswers(survey, answers)
    .map((i) => `${i.label}: ${i.value}`)
    .join("\n");

  postTrackingEvent(
    {
      type: "external_form_submission",
      timestamp: Date.now(),
      formId: `estimate-${survey.id}`,
      formData: {
        first_name: flat["firstName"] ?? "",
        last_name: flat["lastName"] ?? "",
        email: flat["email"] ?? "",
        phone: flat["phone"] ?? "",
      },
      formLabels: {
        first_name: "First Name",
        last_name: "Last Name",
        email: "Email Address",
        phone: "Phone Number",
      },
      url: window.location.href,
      title: document.title,
      path: window.location.pathname,
      userAgent: navigator.userAgent,
      trackingId: TRACKING_IDS.trackingId,
      locationId: TRACKING_IDS.locationId,
      projectId: TRACKING_IDS.projectId,
      sessionId: getTrackingSessionId(),
      properties: {
        deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
        source: "ai_studio",
        projectId: TRACKING_IDS.projectId,
        formName: `${survey.label} Estimate`,
      },
    },
    {
      customFields: {
        [CUSTOM_FIELD_IDS.projectType]: { value: survey.label, label: "Project Type" },
        [CUSTOM_FIELD_IDS.targetTimeline]: { value: flat["timeline"], label: "Target Timeline" },
        [CUSTOM_FIELD_IDS.estimatedBudget]: { value: flat["budget"], label: "Estimated Budget" },
        [CUSTOM_FIELD_IDS.propertyLocation]: { value: location, label: "Property Location" },
        [CUSTOM_FIELD_IDS.projectDetails]: {
          value: `Instant estimate: ${range}\n\n${details}`,
          label: "Project Details",
        },
      },
    },
  );
}
