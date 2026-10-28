import { computeEstimate, formatCurrency } from "./calculate";
import { STANDARD_FIELD_KEYS } from "./field-mapping";
import { flattenAnswers, summarizeAnswers } from "./flatten-answers";
import { ghlFieldMap } from "./ghl-field-map";
import type { Answers, Survey } from "./types";
import { TRACKING_IDS, getTrackingSessionId, postTrackingEvent } from "@/lib/form-tracking";

// Sends a completed estimate through the same CRM tracking the contact form uses, so it obeys
// PILOT_CRM_ENABLED and lands in the same HighLevel location. Like CS-Web-Template's
// buildGhlPayload: every answer whose key has an id in ghlFieldMap goes to its own custom field,
// plus the computed fields (project type, estimate low/high/range, location, details).
export function submitEstimateLead(survey: Survey, answers: Answers) {
  const flat = flattenAnswers(survey, answers);
  const result = computeEstimate(survey, answers);
  const hasRange = result.basis !== "unavailable";

  flat["projectType"] = survey.label;
  // Leave the numeric fields unset rather than writing a misleading 0.
  if (hasRange) {
    flat["estimateLow"] = String(result.low);
    flat["estimateHigh"] = String(result.high);
  }
  flat["estimateRange"] = hasRange
    ? `${formatCurrency(result.low)} – ${formatCurrency(result.high)}`
    : "Pending consult";
  flat["propertyLocation"] = [flat["address1"], flat["city"], flat["state"], flat["postalCode"]]
    .filter(Boolean)
    .join(", ");
  flat["details"] = [
    `Instant estimate: ${flat["estimateRange"]}`,
    "",
    ...summarizeAnswers(survey, answers).map((i) => `${i.label}: ${i.value}`),
  ].join("\n");

  const customFields: Record<string, { value: string; label: string }> = {};
  for (const [key, value] of Object.entries(flat)) {
    const id = ghlFieldMap[key];
    if (value && id && !(STANDARD_FIELD_KEYS as readonly string[]).includes(key)) {
      customFields[id] = { value, label: key };
    }
  }

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
        address: flat["address1"] ?? "",
        city: flat["city"] ?? "",
        state: flat["state"] ?? "",
        postal_code: flat["postalCode"] ?? "",
      },
      formLabels: {
        first_name: "First Name",
        last_name: "Last Name",
        email: "Email Address",
        phone: "Phone Number",
        address: "Address",
        city: "City",
        state: "Province",
        postal_code: "Postal Code",
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
    { customFields },
  );
}
