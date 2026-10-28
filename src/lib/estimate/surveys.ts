// Question sets for Nordic's two instant-estimate wizards (/estimate/custom-home,
// /estimate/garden-suite). Structure ported from CS-Web-Template; questions and size bands are
// written for BC custom homes and garden suites. Sizes are in square feet.

import type { Option, ProjectType, Question, Survey } from "./types";

const opt = (values: string[]): Option[] => values.map((v) => ({ label: v, value: v }));
const yesNo: Option[] = opt(["Yes", "No"]);

const finishQuestion: Question = {
  id: "finishLevel",
  type: "single",
  role: "finishLevel",
  title: "What level of finish are you picturing?",
  subText: "Choose the quality of finishes and materials closest to your brief.",
  required: true,
  options: opt(["Standard", "Premium", "Luxury"]),
};

const performanceQuestion: Question = {
  id: "performanceGoal",
  type: "single",
  title: "What performance goal do you have in mind?",
  subText: "This shapes the envelope, windows and ventilation conversation, not the estimate.",
  required: true,
  options: opt([
    "Meet current code",
    "High-performance home",
    "Passive House principles",
    "Not sure yet",
  ]),
};

const timelineQuestion: Question = {
  id: "timeline",
  type: "single",
  title: "When would you like to get started?",
  subText: "Select your preferred project timeline.",
  required: true,
  options: opt([
    "As Soon As Possible",
    "Within 3-6 Months",
    "Within 6-12 Months",
    "Just Gathering Information",
  ]),
};

const ownerQuestion: Question = {
  id: "ownerAuthorized",
  type: "single",
  title: "Are you the property owner or authorized decision maker?",
  subText: "It helps to know who will make the decisions on the project.",
  required: true,
  options: yesNo,
};

const designerQuestion: Question = {
  id: "designerSelected",
  type: "single",
  title: "Have you selected a designer or architect?",
  subText: "Let us know if your design process has already started.",
  required: true,
  options: yesNo,
};

const plansQuestion: Question = {
  id: "completedPlans",
  type: "single",
  title: "Do you already have completed plans?",
  subText: "Existing plans help make the first conversation more specific.",
  required: true,
  options: yesNo,
};

const financingQuestion: Question = {
  id: "financing",
  type: "single",
  title: "Do you have financing in place?",
  subText: "Understanding your readiness helps us guide the next steps.",
  required: true,
  options: opt(["Yes", "Not Yet"]),
};

const budgetQuestion = (values: string[]): Question => ({
  id: "budget",
  type: "single",
  role: "budget",
  title: "What is your estimated budget?",
  subText: "Choose the range closest to your planned investment.",
  required: true,
  options: opt(values),
});

const contactQuestion: Question = {
  id: "contact",
  type: "fieldGroup",
  title: "Where should we send your estimate?",
  subText:
    "Your range appears on the next screens. These details let us follow up if you ask us to.",
  required: true,
  fields: [
    { id: "firstName", label: "First Name", required: true, half: true },
    { id: "lastName", label: "Last Name", required: true, half: true },
    { id: "email", label: "Email Address", type: "email", required: true },
    { id: "phone", label: "Phone Number", type: "tel", required: true },
  ],
};

const addressQuestion = (title: string, subText: string): Question => ({
  id: "propertyAddress",
  type: "fieldGroup",
  title,
  subText,
  required: true,
  fields: [
    { id: "address1", label: "Address", required: true },
    { id: "city", label: "City", required: true, half: true },
    { id: "state", label: "Province", placeholder: "British Columbia", half: true },
    { id: "postalCode", label: "Postal Code", half: true },
  ],
});

// Size is a fixed set of bands rather than an open field, so an unrealistic size can't produce a
// misleading price. Each band's value is the square footage the estimate is priced on.
const sizeQuestion = (config: {
  title: string;
  subText: string;
  bands: { label: string; range: string; sqft: number }[];
}): Question => ({
  id: "size",
  type: "single",
  role: "size",
  required: true,
  unit: "sq ft",
  title: config.title,
  subText: config.subText,
  options: config.bands.map((b) => ({ label: `${b.label} · ${b.range}`, value: String(b.sqft) })),
});

const customHome: Survey = {
  id: "customHome",
  label: "Luxury Custom Home",
  description: "A new home designed around your site, your routines and the way you want to live.",
  questions: [
    {
      id: "homeType",
      type: "single",
      title: "What type of home are you planning?",
      subText: "Choose the form closest to what you have in mind.",
      required: true,
      options: opt(["Single Storey Home", "Two Storey Home", "Multi Storey Home"]),
      stage: "The Basics",
    },
    {
      id: "landStatus",
      type: "single",
      title: "Do you already have the land?",
      subText: "The property shapes almost every other decision.",
      required: true,
      options: opt(["I own the land", "Buying land", "Knockdown-rebuild", "Not yet"]),
      stage: "The Basics",
    },
    {
      id: "bedrooms",
      type: "single",
      title: "How many bedrooms would you like?",
      subText: "Select the number of bedrooms required.",
      required: true,
      options: opt(["2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms", "6 Bedrooms"]),
      stage: "The Basics",
    },
    {
      id: "bathrooms",
      type: "single",
      title: "How many bathrooms do you need?",
      subText: "Select the number of bathrooms required.",
      required: true,
      options: opt(["2 Bathrooms", "3 Bathrooms", "4 Bathrooms", "5 Bathrooms", "6 Bathrooms"]),
      stage: "The Basics",
    },
    {
      id: "livingAreas",
      type: "single",
      title: "How many living or dining areas would you like?",
      subText: "This helps us understand how the household uses the home.",
      required: true,
      options: opt(["1 Area", "2 Areas", "3 Areas", "4 Areas"]),
      stage: "The Basics",
    },
    {
      id: "carSpaces",
      type: "single",
      title: "How many garage spaces would you like?",
      subText: "Let us know your garage or carport needs.",
      required: true,
      options: opt(["None", "Single", "Double", "Triple+"]),
      stage: "The Basics",
    },
    {
      ...sizeQuestion({
        title: "What size of home are you looking to build?",
        subText: "Choose the approximate finished floor area.",
        bands: [
          { label: "Compact", range: "2,000 – 2,500 sq ft", sqft: 2250 },
          { label: "Family", range: "2,500 – 3,500 sq ft", sqft: 3000 },
          { label: "Large", range: "3,500 – 4,500 sq ft", sqft: 4000 },
          { label: "Estate", range: "4,500 – 6,000 sq ft", sqft: 5250 },
          { label: "Grand estate", range: "6,000+ sq ft", sqft: 6500 },
        ],
      }),
      stage: "Style & Finish",
    },
    { ...finishQuestion, stage: "Style & Finish" },
    { ...performanceQuestion, stage: "Style & Finish" },
    { ...designerQuestion, stage: "Style & Finish" },
    { ...plansQuestion, stage: "Style & Finish" },
    { ...financingQuestion, stage: "Budget & Timeline" },
    {
      ...budgetQuestion([
        "$1,000,000 - $1,500,000",
        "$1,500,000 - $2,000,000",
        "$2,000,000 - $3,000,000",
        "$3,000,000 - $4,000,000",
        "$4,000,000+",
      ]),
      stage: "Budget & Timeline",
    },
    { ...timelineQuestion, stage: "Budget & Timeline" },
    { ...ownerQuestion, stage: "Budget & Timeline" },
    {
      ...addressQuestion(
        "Where do you intend to build your new home?",
        "The location helps identify the local rules that need checking.",
      ),
      stage: "Your Details",
    },
    { ...contactQuestion, stage: "Your Details" },
  ],
};

const gardenSuite: Survey = {
  id: "gardenSuite",
  label: "Garden Suite",
  description: "A secondary home on your property: garden suite, coach house or laneway home.",
  questions: [
    {
      id: "suiteType",
      type: "single",
      title: "What kind of secondary home are you considering?",
      subText: "Local governments may define these differently. Pick the closest.",
      required: true,
      options: opt(["Garden suite", "Coach house", "Laneway home", "Not sure yet"]),
      stage: "The Basics",
    },
    {
      id: "intendedUse",
      type: "single",
      title: "How will the space be used?",
      subText: "The intended use is a planning input, not proof the use is permitted.",
      required: true,
      options: opt(["Family accommodation", "Guest space", "Home office or studio", "Rental"]),
      stage: "The Basics",
    },
    {
      id: "bedrooms",
      type: "single",
      title: "How many bedrooms would you like?",
      subText: "Select the number of bedrooms required.",
      required: true,
      options: opt(["0 Bedrooms", "1 Bedroom", "2 Bedrooms", "3 Bedrooms"]),
      stage: "The Basics",
    },
    {
      id: "bathrooms",
      type: "single",
      title: "How many bathrooms do you need?",
      subText: "Select the number of bathrooms required.",
      required: true,
      options: opt(["1 Bathroom", "2 Bathrooms"]),
      stage: "The Basics",
    },
    {
      ...sizeQuestion({
        title: "What size of suite are you picturing?",
        subText: "Choose the approximate finished floor area.",
        bands: [
          { label: "Studio", range: "400 – 600 sq ft", sqft: 500 },
          { label: "One bedroom", range: "600 – 800 sq ft", sqft: 700 },
          { label: "Two bedroom", range: "800 – 1,000 sq ft", sqft: 900 },
          { label: "Large suite", range: "1,000+ sq ft", sqft: 1150 },
        ],
      }),
      stage: "Style & Finish",
    },
    { ...finishQuestion, stage: "Style & Finish" },
    { ...performanceQuestion, stage: "Style & Finish" },
    { ...designerQuestion, stage: "Style & Finish" },
    { ...financingQuestion, stage: "Budget & Timeline" },
    {
      ...budgetQuestion([
        "$300,000 - $450,000",
        "$450,000 - $600,000",
        "$600,000 - $800,000",
        "$800,000+",
      ]),
      stage: "Budget & Timeline",
    },
    { ...timelineQuestion, stage: "Budget & Timeline" },
    { ...ownerQuestion, stage: "Budget & Timeline" },
    {
      ...addressQuestion(
        "Where is the property?",
        "Zoning, lot conditions and servicing depend on the address.",
      ),
      stage: "Your Details",
    },
    { ...contactQuestion, stage: "Your Details" },
  ],
};

const surveys: Record<ProjectType, Survey> = { customHome, gardenSuite };

export function getSurvey(type: ProjectType): Survey {
  return surveys[type];
}

/** Route for each project type's wizard. */
export const typeToPath = {
  customHome: "/estimate/custom-home",
  gardenSuite: "/estimate/garden-suite",
} as const satisfies Record<ProjectType, string>;

/** Matching service page, so the result can point back at what was estimated. */
export const typeToServicePath = {
  customHome: "/services/luxury-custom-homes",
  gardenSuite: "/services/garden-suites",
} as const satisfies Record<ProjectType, string>;
