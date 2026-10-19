// Nordic Green Homes — homepage content for the INTERNAL PILOT (unpublished).
//
// Rules this file follows (see DESIGN.md §5):
// - Copy is adapted from the two supplied reference sites, never invented. No licence, warranty,
//   legal-entity, performance, savings, health, certification, price or delivery claims.
// - Anything the client still has to confirm is a bracketed PLACEHOLDER rendered as a visible
//   dashed chip, so nobody mistakes it for approved copy.
// - Images are hot-linked from nordicgreendesign.ca as *reference only*. Each one carries its
//   kind (photo vs concept render) and an approval flag. Do not copy them into the repo until
//   the client approves use and attribution.

export const PLACEHOLDER = {
  phone: "[Public phone — pending client confirmation]",
  email: "[Public email — pending client confirmation]",
  serviceArea: "[Public service area — pending confirmation]",
  legalEntity: "[Legal entity, licence & warranty wording — pending]",
  bookingOwner: "[Booking & enquiry recipient — pending]",
  relationship: "[Nordic Green Homes ↔ Nordic Green Design relationship wording — pending]",
  assurance: "[Green Mastery Assurance scope & any net-zero wording — pending approval]",
  projects: "[Approved project images & attribution — pending]",
  testimonials: "[Approved testimonials — none confirmed yet]",
  guide: "[Future-Proofing Your Home guide — file to be recovered, checked & rebranded]",
  services: "[Garages & backyard upgrades — held until service priority is confirmed]",
} as const;

// Reference-only wording seen on both live sites. Shown beside its placeholder, never as fact.
export const REFERENCE_SERVICE_AREA = "Fraser Valley, Kelowna & Vancouver Island";
export const REFERENCE_BASE = "Chilliwack, BC";

const OB = "https://obriencontracting.ca/wp-content/uploads";
const NGD = "https://images.squarespace-cdn.com/content/v1/63731d025a6f0837360c4578";

export type RefImage = {
  src: string;
  alt: string;
  // "Origin unverified" = image on a live site that may be stock; never present it as their work.
  kind: "Concept render" | "Photo" | "Origin unverified";
  source: string;
};

export const IMAGES = {
  hero: {
    src: `${NGD}/13c3bdc0-04d9-4071-b3bd-49e5d824397b/23-11-10+-+Front+Entry+Perspective.jpg?format=2500w`,
    alt: "Concept render of a two-storey farmhouse-style home with gabled roofline and stone facade",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Modern Belgian Farmhouse plan",
  },
  intro: {
    src: `${NGD}/ada349e5-d950-4734-bcc1-e6f544bd6fbb/IMG_5578.WEBP?format=1500w`,
    alt: "Bright entry hall with arched openings and black-and-white marble floor",
    kind: "Photo",
    source: "nordicgreendesign.ca · Design portfolio",
  },
  newBuilds: {
    src: `${NGD}/0ec178ed-3ee1-4c54-87bd-eeaea4165cbc/1_3+-+Photo.jpg?format=1500w`,
    alt: "Concept render of a contemporary gabled home with vertical timber cladding and stone base",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Nordic Haus plan",
  },
  customHomes: {
    src: `${NGD}/801d5f5c-cb07-43e7-85e5-59cdf2ddf92c/23-10-03+-+Front+Left+Perspective.jpg?format=1500w`,
    alt: "Concept render of a board-and-batten farmhouse at dusk with landscaped front garden",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Modern Belgian Farmhouse plan",
  },
  renovations: {
    src: `${NGD}/8f96ce42-8cf0-4da2-8ec8-0afdec9c187c/IMG_5326.WEBP?format=1500w`,
    alt: "Renovated hallway with dark timber barn doors and wide-plank flooring",
    kind: "Photo",
    source: "nordicgreendesign.ca · Renovation design",
  },
  interior: {
    src: `${NGD}/0225a776-fd6b-4eaf-9484-73e3334434de/IMG_7561.jpg?format=1500w`,
    alt: "Media room with built-in cabinetry, coffered ceiling and soft neutral seating",
    kind: "Photo",
    source: "nordicgreendesign.ca · Design portfolio",
  },
  entry: {
    src: `${NGD}/55e1c8f0-fef3-488d-981d-373cd4ee4b98/IMG_5322.WEBP?format=1500w`,
    alt: "Front entry with chequered marble floor, timber bench and original artwork",
    kind: "Photo",
    source: "nordicgreendesign.ca · Design portfolio",
  },
  nordicHaus: {
    src: `${NGD}/52fa5a68-c27f-4c32-a4f6-c58ad8e965cf/1_2+-+Photo.jpg?format=2500w`,
    alt: "Concept render of a modern gabled home with dark standing-seam cladding, timber and stone",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Nordic Haus plan",
  },
  poolRender: {
    src: `${NGD}/8f4baf9e-7b8e-4b7d-acfb-6faa0e2911cc/23-10-06+-+Rear+Porch+Perspective.jpg?format=2500w`,
    alt: "Concept render of a stone farmhouse rear porch with pergola overlooking a pool",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Modern Belgian Farmhouse plan",
  },
  obrienKitchen: {
    src: `${OB}/2025/10/Hero-2.png.webp`,
    alt: "Bright white kitchen with island, glass-front cabinets and timber floor",
    kind: "Origin unverified",
    source: "obriencontracting.ca · homepage hero banner (possibly stock)",
  },
  obrienPoolBar: {
    src: `${OB}/2025/12/143732770_1946069238868993_8364835802107115038_n.jpg`,
    alt: "Covered outdoor bar with stone base, timber ceiling and bar seating beside a patio",
    kind: "Photo",
    source: "obriencontracting.ca · O'Brien Contracting project",
  },
  obrienReno: {
    src: `${OB}/2025/12/314603326_553240643476346_4953318663269826168_n.jpeg`,
    alt: "Renovated kitchen with white shaker cabinets, stone-look backsplash and gas range",
    kind: "Photo",
    source: "obriencontracting.ca · O'Brien Contracting project",
  },
  office: {
    src: `${NGD}/3d0f1b89-3fcf-466c-b53f-46f692ead5e2/IMG_5333.WEBP?format=1500w`,
    alt: "Home office with sage-green walls, built-in shelving and garden door",
    kind: "Photo",
    source: "nordicgreendesign.ca · Design portfolio",
  },
} satisfies Record<string, RefImage>;

export const HERO = {
  eyebrow: "Custom homes · New builds · Renovations",
  // Nordic Green Design's own line — reuse.
  titleLead: "Where sustainability",
  titleAccent: "meets style.",
  // Adapted from the shared O'Brien / Nordic line "Sustainable craftsmanship for families…".
  body: "Sustainable craftsmanship for families who want more from their forever home. Thoughtful design and careful building, from the first conversation to the day you move in.",
  cta: "Book a free consultation",
  secondary: "See how we build",
  // Crossfades slowly. Mixed sources on purpose so the client can react to both looks.
  slides: [IMAGES.hero, IMAGES.nordicHaus, IMAGES.obrienKitchen],
};

export const INTRO = {
  relationship: {
    label: "Design + build",
    body: "Nordic Green Homes builds alongside Nordic Green Design, so the way a home looks and the way it's built are considered from the start.",
  },
  eyebrow: "Nordic Green Homes",
  title: "Sustainable craftsmanship for families who demand more from their forever home",
  // Adapted from the Nordic "About" copy; "since our inception" and "worry-free" style promises removed.
  body: [
    "We build homes at the intersection of eco-friendly building and bespoke design: considered, comfortable spaces made to suit the way your family actually lives.",
    "Every project starts with listening. We take time to understand your site, your priorities and your budget before a single plan is drawn, then carry that same care through to construction.",
  ],
  // Verbatim from the live Nordic site. Fuller owner bios stay on hold until verified.
  people: "A vision brought to life by Kylie & Lane O'Brien",
};

export const SERVICES = [
  {
    key: "newBuilds",
    title: "New builds",
    body: "Eco-conscious new homes shaped around your lifestyle and values, planned with sustainable building practice in mind from day one.",
    image: IMAGES.newBuilds,
  },
  {
    key: "customHomes",
    title: "Custom home design",
    body: "Homes designed around you: layout, materials and detail worked through with you before construction begins.",
    image: IMAGES.customHomes,
  },
  {
    key: "renovations",
    title: "Home renovations",
    body: "Kitchens, bathrooms or whole homes, renovated so they feel new again while respecting how you live in them.",
    image: IMAGES.renovations,
  },
] as const;

// The four existing pillars — reuse the themes, wording adapted and kept claim-free.
export const PILLARS = [
  {
    title: "Sustainability",
    body: "Sustainable building practice sits at the centre of design, material and construction decisions.",
  },
  {
    title: "Family",
    body: "Homes planned around real family life — how you gather, rest, grow and host.",
  },
  {
    title: "Bespoke luxury",
    body: "Considered detail and quality finishes, without excess for its own sake.",
  },
  {
    title: "Faith & integrity",
    body: "Honest conversations, clear expectations and service rooted in faith and integrity.",
  },
] as const;

// Eight reference steps grouped into the five stages from the recommended sitemap.
export const PROCESS = [
  {
    title: "Consultation",
    body: "A free first conversation about your goals, site, timing and budget, so we both know whether we're the right fit.",
    includes: ["Consultation"],
  },
  {
    title: "Design & planning",
    body: "Your ideas become a plan, working with you — and your architect or designer where you have one — to refine layout and detail.",
    includes: ["Design"],
  },
  {
    title: "Materials & approvals",
    body: "Selecting materials and finishes together, and preparing the permits and approvals your project needs.",
    includes: ["Material selection", "Permitting"],
  },
  {
    title: "Construction",
    body: "A pre-construction meeting to confirm scope and schedule, then a build with clear, regular communication throughout.",
    includes: ["Pre-construction", "Construction"],
  },
  {
    title: "Handover & ongoing care",
    body: "A detailed final walkthrough together, and seasonal care advice to help your home stay at its best.",
    includes: ["Final walkthrough", "Maintenance"],
  },
] as const;

export const ASSURANCE = {
  eyebrow: "Our commitment",
  title: "Green Mastery Assurance",
  // Adapted: "ensure… exceeds sustainable building standards, including Net-Zero goals" is HELD.
  body: "Green Mastery Assurance is our commitment to keep sustainable building practice at the heart of every project — in how a home is designed, the materials chosen for it and the way it is built — so it's as kind to the planet as it is to your family.",
};

export const GUIDE = {
  eyebrow: "Guide",
  title: "Future-Proofing Your Home",
  body: "A homeowner's guide to the ideas worth considering early in a build or renovation.",
  // Topic list from the existing guide description (reference). Final contents follow the recovered file.
  topics: [
    "Smart technology",
    "Renewable energy",
    "Water conservation",
    "Flexible design",
    "Resilient materials",
  ],
};

export const CONSULTATION = {
  eyebrow: "Start here",
  title: "Book a free consultation",
  body: "Tell us about your new build or renovation. We'll talk through your ideas, your site and your timing, and help you understand the next steps.",
  cta: "Book a free consultation",
};

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about-us" },
  { label: "Services", to: "/services" },
  { label: "Process", to: "/process" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
] as const;
