// Form tracking helper for the Nordic Green Homes discovery call form.
// Wired to the CRM external-tracking endpoint using the connected
// trackingId / locationId / projectId from the form-tracking integration.

type StandardTrackingFieldKey = string;
type RegisteredCustomFieldId = string;
type TrackingCustomField = { value?: unknown; label: string };
type TrackingFileField = { file?: File; label: string };
type TrackingImageDataField = { dataUrl?: string; label: string };

// Internal pilot: nothing may reach the live CRM until the enquiry workflow is tested and approved.
// Gates every form submission (postTrackingEvent) and the chat widget mount in __root.tsx.
export const PILOT_CRM_ENABLED = false;

const TRACKING_ENDPOINT = "https://backend.leadconnectorhq.com/external-tracking/events";

export const TRACKING_IDS = {
  trackingId: "tk_1570958cc8b84389ad27f83994443eaf",
  locationId: "yHohxdtdZLdf0DUv8x7z",
  projectId: "1792226139280090093",
} as const;

export const postTrackingEvent = (
  trackingPayload: Record<string, unknown> & {
    formData: Record<StandardTrackingFieldKey, unknown>;
    formLabels: Record<StandardTrackingFieldKey, string>;
  },
  options: {
    customFields?: Record<RegisteredCustomFieldId, TrackingCustomField>;
    fileFields?: Record<RegisteredCustomFieldId, TrackingFileField>;
    imageDataFields?: Record<RegisteredCustomFieldId, TrackingImageDataField>;
  } = {},
) => {
  const { customFields = {}, fileFields = {}, imageDataFields = {} } = options;
  const eventPayload = {
    ...trackingPayload,
    formData: { ...trackingPayload.formData },
    formLabels: { ...trackingPayload.formLabels },
  };
  const body = new FormData();

  for (const [key, field] of Object.entries(customFields)) {
    if (field.value === undefined) continue;
    eventPayload.formData[key] = field.value;
    eventPayload.formLabels[key] = field.label;
  }

  for (const [key, field] of Object.entries(imageDataFields)) {
    const dataUrl = field.dataUrl;
    if (!dataUrl) continue;
    if (!dataUrl.startsWith("data:image/")) {
      throw new Error("Image data field must be a data:image/* base64 string");
    }
    eventPayload.formData[key] = dataUrl;
    eventPayload.formLabels[key] = field.label;
  }

  for (const [key, field] of Object.entries(fileFields)) {
    const file = field.file;
    if (!file) continue;
    if (file.size > 50 * 1024 * 1024) {
      throw new Error("File must be 50 MB or smaller");
    }
    eventPayload.formData[key] = {
      filename: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
    };
    eventPayload.formLabels[key] = field.label;
    body.append(key, file, file.name);
  }

  for (const key of Object.keys(eventPayload.formData)) {
    eventPayload.formLabels[key] ||= key;
  }

  body.append("event", JSON.stringify(eventPayload));

  if (!PILOT_CRM_ENABLED) {
    console.info("[pilot] CRM submission disabled — event not sent", eventPayload);
    return;
  }

  fetch(TRACKING_ENDPOINT, {
    method: "POST",
    headers: {
      version: "2021-07-28",
    },
    body,
  }).catch(() => {}); // Fire-and-forget — don't block form UX
};

// Reuse the published site's analytics session (set by /__vibe/analytics.js) so the
// submission joins the visit's page views; fall back to a fresh id when it is absent
// or unreadable (document.cookie throws in a sandboxed iframe).
export const getTrackingSessionId = () => {
  try {
    const sid = document.cookie.match(/(?:^|;\s*)__vibe_sid=([0-9a-f-]{36})(?:;|$)/)?.[1];
    if (sid) return sid;
  } catch {}
  return crypto.randomUUID();
};

// Custom field IDs returned by register_custom_field for the discovery form.
export const CUSTOM_FIELD_IDS = {
  projectType: "QhNOcjRK349mkqOPg9U4",
  targetTimeline: "EmCelWWjJ9caHbNd5WBb",
  estimatedBudget: "Xv5zDcrcW98GWT8nHBJJ",
  propertyLocation: "MmloWfeY4uxourKWTLin",
  projectDetails: "CZnRAdMA3DtectHXwtA4",
} as const;
