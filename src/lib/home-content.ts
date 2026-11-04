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
  phone: "+1 (604) 996-4217",
  email: "info@nordicgreenhomes.ca",
  legalEntity: "[Legal entity, licence & warranty wording — pending]",
  relationship:
    "[Nordic Green Homes (new entity) · Nordic Green Design (separate) · O'Brien Contracting remains open during transition — exact public/legal wording pending]",
} as const;

const NGD = "https://images.squarespace-cdn.com/content/v1/63731d025a6f0837360c4578";

export type RefImage = {
  src: string;
  alt: string;
  // "Origin unverified" = image on a live site that may be stock; never present it as their work.
  kind: "Concept render" | "Photo" | "Origin unverified";
  source: string;
  // Native pixel width of the original file. Drives srcset and decides which slots an image may
  // fill: ~960px photos go in small tiles only; 1920px renders can go large without blurring.
  w: number;
};

export const IMAGES = {
  hero: {
    src: `${NGD}/13c3bdc0-04d9-4071-b3bd-49e5d824397b/23-11-10+-+Front+Entry+Perspective.jpg?format=2500w`,
    alt: "Concept render of a two-storey farmhouse-style home with gabled roofline and stone facade",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Modern Belgian Farmhouse plan",
    w: 1920,
  },
  intro: {
    src: `${NGD}/ada349e5-d950-4734-bcc1-e6f544bd6fbb/IMG_5578.WEBP?format=1500w`,
    alt: "Bright entry hall with arched openings and black-and-white marble floor",
    kind: "Photo",
    source: "nordicgreendesign.ca · Design portfolio",
    w: 1080,
  },
  newBuilds: {
    src: `${NGD}/0ec178ed-3ee1-4c54-87bd-eeaea4165cbc/1_3+-+Photo.jpg?format=1500w`,
    alt: "Concept render of a contemporary gabled home with vertical timber cladding and stone base",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Nordic Haus plan",
    w: 1920,
  },
  customHomes: {
    src: `${NGD}/801d5f5c-cb07-43e7-85e5-59cdf2ddf92c/23-10-03+-+Front+Left+Perspective.jpg?format=1500w`,
    alt: "Concept render of a board-and-batten farmhouse at dusk with landscaped front garden",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Modern Belgian Farmhouse plan",
    w: 1920,
  },
  renovations: {
    src: `${NGD}/8f96ce42-8cf0-4da2-8ec8-0afdec9c187c/IMG_5326.WEBP?format=1500w`,
    alt: "Renovated hallway with dark timber barn doors and wide-plank flooring",
    kind: "Photo",
    source: "nordicgreendesign.ca · Renovation design",
    w: 960,
  },
  interior: {
    src: `${NGD}/0225a776-fd6b-4eaf-9484-73e3334434de/IMG_7561.jpg?format=1500w`,
    alt: "Media room with built-in cabinetry, coffered ceiling and soft neutral seating",
    kind: "Photo",
    source: "nordicgreendesign.ca · Design portfolio",
    w: 1284,
  },
  entry: {
    src: `${NGD}/55e1c8f0-fef3-488d-981d-373cd4ee4b98/IMG_5322.WEBP?format=1500w`,
    alt: "Front entry with chequered marble floor, timber bench and original artwork",
    kind: "Photo",
    source: "nordicgreendesign.ca · Design portfolio",
    w: 960,
  },
  nordicHaus: {
    src: `${NGD}/52fa5a68-c27f-4c32-a4f6-c58ad8e965cf/1_2+-+Photo.jpg?format=2500w`,
    alt: "Concept render of a modern gabled home with dark standing-seam cladding, timber and stone",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Nordic Haus plan",
    w: 1920,
  },
  poolRender: {
    src: `${NGD}/8f4baf9e-7b8e-4b7d-acfb-6faa0e2911cc/23-10-06+-+Rear+Porch+Perspective.jpg?format=2500w`,
    alt: "Concept render of a stone farmhouse rear porch with pergola overlooking a pool",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Modern Belgian Farmhouse plan",
    w: 1920,
  },
  office: {
    src: `${NGD}/3d0f1b89-3fcf-466c-b53f-46f692ead5e2/IMG_5333.WEBP?format=1500w`,
    alt: "Home office with sage-green walls, built-in shelving and garden door",
    kind: "Photo",
    source: "nordicgreendesign.ca · Design portfolio",
    w: 960,
  },
  hausPatio: {
    src: `${NGD}/4f00ec4b-71af-4905-afde-3acf199b1cd5/1_22+-+Photo.jpg?format=2500w`,
    alt: "Concept render of a covered patio opening into a timber-lined living room",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Nordic Haus plan",
    w: 1920,
  },
  hausSide: {
    src: `${NGD}/47e8f025-387e-4a11-bdd7-0fff7e9bb4c6/1_19+-+Photo.jpg?format=2500w`,
    alt: "Concept render of a timber-clad home with stone base and a planted side walkway",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Nordic Haus plan",
    w: 1920,
  },
  hausGarden: {
    src: `${NGD}/7c3f5cf0-6635-4f0e-8c4a-3a809d7bee93/1_24+-+Photo.jpg?format=2500w`,
    alt: "Concept render of a stone wall and timber deck path through a lush side garden",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Nordic Haus plan",
    w: 1920,
  },
  hausRear: {
    src: `${NGD}/91b37dcd-b3a3-4309-8ec9-d394469d2b5a/1_17+-+Photo.jpg?format=2500w`,
    alt: "Concept render of the rear of a gabled home with timber cladding and a stone-clad terrace",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Nordic Haus plan",
    w: 1920,
  },
  // Homepage hero background (client-directed 2026-11-04). Self-hosted copy of
  // obriencontracting.ca/wp-content/uploads/2025/12/bg-obrien.png; likely stock, so never caption it as built work.
  heroPhoto: {
    src: "/home/hero-1920.jpg",
    alt: "Two-storey modern home with white render, vertical timber cladding and a glass balcony",
    kind: "Origin unverified",
    source: "obriencontracting.ca · supplied hero background",
    w: 1920,
  },
  farmhouseRear: {
    src: `${NGD}/a370208d-18d0-4a81-93f2-629f2c909642/23-10-06+-+Rear+Right+Perspective.jpg?format=2500w`,
    alt: "Concept render of a stone and board-and-batten farmhouse with a covered rear porch",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Modern Belgian Farmhouse plan",
    w: 1920,
  },
} satisfies Record<string, RefImage>;

// Homepage copy below follows the client-supplied homepage content (2026-11-04).
const AREAS = "Vancouver, West Van, North Van, Richmond, Tsawwassen and Vancouver Island";

export const CTA = {
  estimate: { label: "Get your ballpark estimate", to: "/estimate" },
  call: { label: "Book a 15-minute call with Lane", to: "/contact" },
} as const;

export const HERO = {
  eyebrow: "Nordic Green Homes",
  // Three masked lines so no word sits alone; the last line is the gold accent.
  titleLines: ["Sustainable luxury.", "Built around", "your life."],
  body: "A home with presence, purpose and room for the life you want to lead. Nordic Green Homes brings building and design together, so the way your home looks, feels and works is considered from the start.",
  quote: { text: "We provide sustainable luxury. And that's it.", by: "Lane" },
  image: IMAGES.heroPhoto,
  // Square slider in the hero (bottom right, above service 05). Large 1920px renders only.
  slides: [IMAGES.hero, IMAGES.nordicHaus, IMAGES.hausPatio],
};

export const BUDGET = {
  eyebrow: "Design and budget",
  title: "A luxury build can go wrong before ground is broken",
  manifesto:
    "The plans are beautiful. You've pictured the kitchen, the windows, and the way the house sits on the land. Then someone prices the build, and the design is well beyond what you intended to spend.",
  cause:
    "It happens when plans get drawn before anyone has priced them. More rooms, more glazing, a bigger footprint: each decision changes what it takes to build the home.",
  story:
    "Lane describes a shop quoted at $300,000 that became a $500,000 shop as the design grew. His point is simple:",
  quote: "Every change you make changes your price point.",
  close:
    "Bring the budget into the design conversation early. Start with a ballpark, then work through the choices with us while there's still room to shape them. The estimate is an early planning range, not a construction quote.",
};

export const SERVICES = [
  {
    key: "luxuryCustomHomes",
    title: "Luxury Custom Homes",
    body: "Start with how you want to live, then consider the layout, materials and details that bring it together. Explore the choices that shape a custom home, from the first brief to the relationship between design, budget and buildability.",
    cta: "Explore Luxury Custom Homes",
    to: "/services/luxury-custom-homes",
    // Board-and-batten farmhouse render — a home, not the shop/garage photo it replaced.
    image: IMAGES.customHomes,
  },
  {
    key: "gardenSuites",
    title: "Garden Suites",
    body: "Making space for family or planning a separate dwelling? Begin with your property, the way the space will be used and the local rules. Access, services and site conditions all help determine what is possible.",
    cta: "Explore Garden Suites",
    to: "/services/garden-suites",
    // Garden path render — replaced the pool-bar/cabana photo that read as a bar, not a suite.
    image: IMAGES.hausGarden,
  },
  {
    key: "passiveHome",
    title: "Passive Home Builder BC",
    body: "Considering a Passive House? Understand how insulation, windows, airtightness and ventilation work together, and what separates passive-home principles from formal building certification.",
    cta: "Explore Passive Home Builder BC",
    to: "/services/passive-home-builder-bc",
    // Nordic Haus render — replaced the shop/garage photo.
    image: IMAGES.nordicHaus,
  },
  {
    key: "highPerformance",
    title: "High-Performance Homes",
    body: "Think beyond the finishes. Explore how the building envelope, windows, ventilation and moisture control relate to the comfort and energy goals in your brief.",
    cta: "Explore High-Performance Homes",
    to: "/services/high-performance-homes",
    // Rear elevation render — replaced the shop-with-trucks photo.
    image: IMAGES.hausRear,
  },
  {
    key: "designInteriors",
    title: "Design and Interiors",
    body: "Bring the rooms, materials and everyday details into focus. Consider how you move through the home, where you need light and storage, and which finishes suit the way you live.",
    cta: "Explore Design and Interiors",
    to: "/services/design-and-interiors",
    image: IMAGES.interior,
  },
] as const;

// Homepage service copy (SERVICES above stays as-is for /services, /contact and the audit).
export const HOME_SERVICES = {
  title: "Custom homes in Vancouver and beyond",
  areas: `We build for homeowners in ${AREAS}.`,
  items: [
    {
      key: "luxuryCustomHomes",
      title: "Luxury Custom Homes",
      body: "A home designed around your routines, your taste and your site. Bring the big ideas into focus alongside the practical work of building them.",
      cta: "Explore Luxury Custom Homes",
      to: "/services/luxury-custom-homes",
      image: IMAGES.customHomes,
    },
    {
      key: "gardenSuites",
      title: "Garden Suites",
      body: "More room for family, guests or a separate household. Start with what you want the space to do and how it can work on your property.",
      cta: "Explore Garden Suites",
      to: "/services/garden-suites",
      image: IMAGES.hausGarden,
    },
    {
      key: "passiveHome",
      title: "Passive-Home Principles",
      body: "Comfort, insulation, airtightness and ventilation, considered as one system. Explore passive-home principles and how they differ from formal Passive House certification.",
      cta: "Explore Passive-Home Principles",
      to: "/services/passive-home-builder-bc",
      image: IMAGES.nordicHaus,
    },
    {
      key: "highPerformance",
      title: "High-Performance Homes",
      body: "Put the way your home feels alongside the way it looks. Bring energy use, year-round comfort and durable construction into the design brief.",
      cta: "Explore High-Performance Homes",
      to: "/services/high-performance-homes",
      image: IMAGES.hausRear,
    },
    {
      key: "designInteriors",
      title: "Design and Interiors",
      body: "Rooms that flow. Materials with warmth and character. Details that feel like you. Explore the design perspective Kylie brings through Nordic Green Design.",
      cta: "Explore Design and Interiors",
      to: "/services/design-and-interiors",
      image: IMAGES.interior,
    },
  ],
} as const;

export const FLOORPLANS = [
  {
    key: "nordicHaus",
    title: "Nordic Haus",
    to: "/floorplans/nordic-haus",
    image: IMAGES.nordicHaus,
    gallery: [
      IMAGES.nordicHaus,
      IMAGES.newBuilds,
      IMAGES.hausPatio,
      IMAGES.hausSide,
      IMAGES.hausGarden,
      IMAGES.hausRear,
    ],
  },
  {
    key: "modernBelgianFarmhouse",
    title: "Modern Belgian Farmhouse",
    to: "/floorplans/modern-belgian-farmhouse",
    image: IMAGES.customHomes,
    gallery: [IMAGES.customHomes, IMAGES.hero, IMAGES.poolRender, IMAGES.farmhouseRear],
  },
] as const;

export const SERVICE_AREAS = [
  {
    key: "northShore",
    title: "Vancouver North Shore",
    to: "/service-areas/vancouver-north-shore",
    image: IMAGES.hausSide,
  },
  {
    key: "richmondTsawwassen",
    title: "Richmond and Tsawwassen",
    to: "/service-areas/richmond-and-tsawwassen",
    image: IMAGES.newBuilds,
  },
  {
    key: "vancouverIsland",
    title: "Vancouver Island",
    to: "/service-areas/vancouver-island",
    image: IMAGES.nordicHaus,
  },
] as const;

// The four principles behind a considered home — wording adapted and kept claim-free.
export const PILLARS = {
  title: "Four pillars. One way of building.",
  items: [
    {
      title: "Sustainable",
      body: "Make thoughtful choices about materials, energy and the life of the home. Sustainability belongs in the design, not as an afterthought.",
    },
    {
      title: "Family",
      body: "Build around the people who will live here. Shared meals, quiet mornings, growing children and visiting family all have a place in the brief.",
    },
    {
      title: "Luxury",
      body: "Choose the spaces, finishes and details that matter to you. The result should feel considered, personal and a pleasure to come home to.",
    },
    {
      title: "Faith",
      body: "Care, honesty and respect guide how we work and how we treat people.",
    },
  ],
} as const;

export const TIME = {
  eyebrow: "Building and design, together",
  title: "A home that gives you more time for living",
  subtitle: "Your home matters. So does everything else in your life.",
  body: [
    "As Lane puts it, busy clients have \u201cstuff far more important than making a little tile selection.\u201d You want a beautiful result without every detail becoming another job on your list.",
    "We bring the building and design perspectives into the same conversation. The layout, materials, comfort, and finish can be considered together, with your priorities guiding the decisions.",
  ],
};

export const TEAM = {
  eyebrow: "Lane and Kylie",
  title: "Meet the builder-and-designer couple behind Nordic",
  body: [
    "Lane is the builder. Kylie is the designer behind Nordic Green Design. Together, they bring a practical eye for construction and a considered eye for interiors to the home you want to create.",
    "For them, sustainable luxury is personal: a home that feels good to live in, makes thoughtful use of materials and gives family life room to unfold.",
  ],
  // Self-hosted copy of obriencontracting.ca/wp-content/uploads/2025/12/obrien-lane.png.webp
  // (client-directed 2026-11-04). 580×645.
  photo: {
    src: "/home/lane.webp",
    alt: "Kylie and Lane standing together in front of green foliage",
  },
  // Plate order matches the photo: Kylie on the left, Lane on the right.
  people: [
    { name: "Kylie", role: "The designer · Nordic Green Design" },
    { name: "Lane", role: "The builder" },
  ],
  cta: "Meet Lane and Kylie",
};

export const START = {
  eyebrow: "Start here",
  title: "Your ideas. A practical starting point.",
  body: "Start with the estimator to put a ballpark beside your ideas. Then book a short call with Lane to talk about the property, your priorities and the next step.",
  note: "We work alongside your architect or designer. Bring your plans to the call.",
  process: "See our process",
};

export const CONSULTATION = {
  eyebrow: "Start here",
  title: "Discuss your project",
  body: [
    "Have a site in mind, a set of plans or a few ideas you want to explore? Tell us what you are considering, what matters most and where you need clarity.",
    "Start with your property, your priorities and the questions you want answered.",
  ],
  cta: "Discuss your project",
};

export const FAQS = [
  {
    q: "Do I need finished plans before we speak?",
    a: "No. Bring your ideas, your property details and any sketches or plans you already have. We can start with what you know now.",
  },
  {
    q: "Can I bring my own architect or designer?",
    a: "We work alongside your architect or designer. Bring your plans to the call.",
  },
  {
    q: "Where do you build?",
    a: `${AREAS}.`,
  },
  {
    q: "What does the ballpark estimate tell me?",
    a: "It gives you an early range to help connect your ideas with a budget. Your site, design, size and selections shape the next conversation and the project-specific pricing.",
  },
];

const ABOUT_LINKS = [
  { label: "Why Choose Us", to: "/about-us/why-choose-us" },
  { label: "Our approach", to: "/about-us/our-approach" },
  { label: "Process", to: "/process" },
  { label: "FAQs", to: "/faqs" },
] as const;

const SERVICE_LINKS = [
  { label: "Luxury Custom Homes", to: "/services/luxury-custom-homes" },
  { label: "Garden Suites", to: "/services/garden-suites" },
  { label: "Passive-Home Principles", to: "/services/passive-home-builder-bc" },
  { label: "High-Performance Homes", to: "/services/high-performance-homes" },
  { label: "Design and Interiors", to: "/services/design-and-interiors" },
] as const;

const FLOORPLAN_LINKS = [
  { label: "Nordic Haus", to: "/floorplans/nordic-haus" },
  { label: "Modern Belgian Farmhouse", to: "/floorplans/modern-belgian-farmhouse" },
] as const;

const AREA_LINKS = [
  { label: "Vancouver North Shore", to: "/service-areas/vancouver-north-shore" },
  { label: "Richmond and Tsawwassen", to: "/service-areas/richmond-and-tsawwassen" },
  { label: "Vancouver Island", to: "/service-areas/vancouver-island" },
] as const;

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about-us", children: ABOUT_LINKS },
  { label: "Services", to: "/services", children: SERVICE_LINKS },
  { label: "Floorplans", to: "/floorplans", children: FLOORPLAN_LINKS },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
] as const;

// Footer columns: the full site map, including pages kept out of the header (service areas).
// Four columns of link groups; short groups share a column. Privacy/Terms live in the bottom bar.
export const FOOTER_COLUMNS = [
  [
    {
      title: "About",
      links: [
        { label: "About Us", to: "/about-us" },
        ...ABOUT_LINKS,
        { label: "Projects", to: "/projects" },
        { label: "Contact", to: "/contact" },
      ],
    },
  ],
  [{ title: "Services", links: SERVICE_LINKS }],
  [
    { title: "Floorplans", links: FLOORPLAN_LINKS },
    { title: "Service Areas", links: AREA_LINKS },
  ],
  [
    {
      title: "Resources",
      links: [
        { label: "Instant Estimate", to: "/estimate" },
        { label: "Resources", to: "/resources" },
        { label: "Planning Guide", to: "/resources/guide" },
        { label: "BC Energy Step Code", to: "/resources/bc-energy-step-code" },
      ],
    },
  ],
] as const;
