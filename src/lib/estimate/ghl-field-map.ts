// GoHighLevel custom-field mapping for the "O'Brien Contracting Ltd" sub-account
// (locationId yHohxdtdZLdf0DUv8x7z), which Nordic reuses by agreement. Fetched from that
// account's real contact custom fields via the GHL API on 28 October 2026 and matched by name to
// this app's survey question ids (same structure as CS-Web-Template). A key missing here shows as
// "Needs ID" on /audit: create the field in HighLevel, then add its id below.
//
// Re-sync if the client's GHL fields change:
//   GET https://services.leadconnectorhq.com/locations/yHohxdtdZLdf0DUv8x7z/customFields?model=contact

export const ghlFieldMap: Record<string, string> = {
  // ── Computed / meta (auto-set by the app) ──
  projectType: "QhNOcjRK349mkqOPg9U4", // Project Type (dropdown)
  estimateLow: "5lTQLNCuc38KxPQ6jv4m", // Quote (number)
  estimateHigh: "mPVcjGGiVtRrwjE7VrGj", // Estimate – High (text)
  estimateRange: "Q57C7AXxa2nHTxWW1tk2", // Quote Range (text)
  propertyLocation: "MmloWfeY4uxourKWTLin", // Property Location (large text)
  details: "CZnRAdMA3DtectHXwtA4", // Project Details (large text)

  // ── Shared survey questions (asked by both surveys) ──
  timeline: "EmCelWWjJ9caHbNd5WBb", // Target Timeline (dropdown)
  budget: "Xv5zDcrcW98GWT8nHBJJ", // Estimated Budget (dropdown)
  bedrooms: "hrxMrYmeeXHOeDmBJ0kB", // Bedrooms (dropdown)
  bathrooms: "UMS9uI0qxuSgoX01HZpk", // Bathrooms (dropdown)
  finishLevel: "wkzTofRMHefR9YbuleMa", // Finish Level (dropdown)
  performanceGoal: "eTpWCGB9yCmYhA5mPGaK", // Performance Goal (dropdown)
  designerSelected: "iNiM0cJQ7YEKxJVXJzcR", // Designer Selected (dropdown)
  financing: "GhUg38BMuEczDpNIzVog", // Financing (dropdown)
  ownerAuthorized: "CDSburyyNkz3tCgQmihw", // Owner Authorized (dropdown)

  // ── Custom-home-only questions ──
  homeType: "gHfmkBBMlT6CITzSFXwA", // Home Type (dropdown)
  landStatus: "bONFyHJhRfAYdi2AII1T", // Land Status (dropdown)
  livingAreas: "kjoQRBev5AQP7EeWWfDU", // Living Areas (dropdown)
  carSpaces: "SZ9xfcD35zvobDWjulJW", // Garage Spaces (dropdown)
  completedPlans: "Torg3xE4yabolv3ZOoj8", // Completed Plans (dropdown)
  size: "0wFzYFPZnLQC8cBIDVDV", // Home Size (text)

  // ── Garden-suite-only questions ──
  suiteType: "mo6W2mVuKgL6Tsxtz9kZ", // Suite Type (dropdown)
  intendedUse: "LlOPo1Y7D2GZnuQ1xgLM", // Intended Use (dropdown)

  // ── Contact form (discovery call) ──
  designStage: "ZnW2JK4XlTMRwqJLZc7u", // Current Design Stage (dropdown)
  projectGoals: "A7M2x1w4arz0D4MFJaY2", // Project Goals (large text)
  preferredNextStep: "4e7aAYQmutKHr2eNsX82", // Preferred Next Step (dropdown)
};

// {{contact.xxx}} merge tags for the fields above — usable in GHL workflows/emails.
export const ghlMergeTagMap: Record<string, string> = {
  timeline: "{{contact.target_timeline}}",
  budget: "{{contact.estimated_budget}}",
  projectType: "{{contact.project_type}}",
  estimateLow: "{{contact.quote}}",
  estimateHigh: "{{contact.estimate_high}}",
  estimateRange: "{{contact.quote_range}}",
  propertyLocation: "{{contact.property_location}}",
  details: "{{contact.project_details}}",
  bedrooms: "{{contact.bedrooms}}",
  bathrooms: "{{contact.bathrooms}}",
  finishLevel: "{{contact.finish_level}}",
  performanceGoal: "{{contact.performance_goal}}",
  designerSelected: "{{contact.designer_selected}}",
  financing: "{{contact.financing}}",
  ownerAuthorized: "{{contact.owner_authorized}}",
  homeType: "{{contact.home_type}}",
  landStatus: "{{contact.land_status}}",
  livingAreas: "{{contact.living_areas}}",
  carSpaces: "{{contact.garage_spaces}}",
  completedPlans: "{{contact.completed_plans}}",
  size: "{{contact.home_size}}",
  suiteType: "{{contact.suite_type}}",
  intendedUse: "{{contact.intended_use}}",
  designStage: "{{contact.current_design_stage}}",
  projectGoals: "{{contact.project_goals}}",
  preferredNextStep: "{{contact.preferred_next_step}}",
};

// Dropdown fields only store a value that matches one of their options; /audit flags any survey
// option that doesn't. Copied from the same API read.
// Dropdown fields only store a value that matches one of their options; /audit flags any survey
// option that doesn't. These must match the options configured in HighLevel for the three fields
// the client created (budget, timeline, projectType). Re-sync after any HighLevel option change.
export const ghlFieldOptions: Record<string, readonly string[]> = {
  // "When would you like to get started?" — sent by both estimate surveys
  timeline: [
    "As Soon As Possible",
    "Within 3-6 Months",
    "Within 6-12 Months",
    "Just Gathering Information",
  ],
  // "What is your estimated budget?" — sent by both estimate surveys (custom-home + garden-suite ranges)
  budget: [
    "$300,000 - $450,000",
    "$450,000 - $600,000",
    "$600,000 - $800,000",
    "$800,000+",
    "$1,000,000 - $1,500,000",
    "$1,500,000 - $2,000,000",
    "$2,000,000 - $3,000,000",
    "$3,000,000 - $4,000,000",
    "$4,000,000+",
  ],
  // "Project Type" — sent by estimate surveys (survey.label) AND the contact form (SERVICES titles)
  projectType: [
    "Luxury Custom Home",
    "Garden Suite",
    "Luxury Custom Homes",
    "Garden Suites",
    "Passive Home Builder BC",
    "High-Performance Homes",
    "Design and Interiors",
  ],
};
