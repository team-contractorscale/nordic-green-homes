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
  legalEntity: "[Legal entity, licence & warranty wording — pending]",
  relationship:
    "[Nordic Green Homes (new entity) · Nordic Green Design (separate) · O'Brien Contracting remains open during transition — exact public/legal wording pending]",
} as const;

const OB = "https://obriencontracting.ca/wp-content/uploads";
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
  obrienPoolBar: {
    src: `${OB}/2025/12/143732770_1946069238868993_8364835802107115038_n.jpg`,
    alt: "Covered outdoor bar with stone base, timber ceiling and bar seating beside a patio",
    kind: "Photo",
    source: "obriencontracting.ca · O'Brien Contracting project",
    w: 960,
  },
  obrienReno: {
    src: `${OB}/2025/12/314603326_553240643476346_4953318663269826168_n.jpeg`,
    alt: "Renovated kitchen with white shaker cabinets, stone-look backsplash and gas range",
    kind: "Photo",
    source: "obriencontracting.ca · O'Brien Contracting project",
    w: 1000,
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
  farmhouseRear: {
    src: `${NGD}/a370208d-18d0-4a81-93f2-629f2c909642/23-10-06+-+Rear+Right+Perspective.jpg?format=2500w`,
    alt: "Concept render of a stone and board-and-batten farmhouse with a covered rear porch",
    kind: "Concept render",
    source: "nordicgreendesign.ca · Modern Belgian Farmhouse plan",
    w: 1920,
  },
} satisfies Record<string, RefImage>;

// O'Brien Contracting project photos (obriencontracting.ca/projects) — the site's real project imagery.
const OB_PROJECTS = "https://obriencontracting.ca/wp-content/uploads/2025/12";
export const projectPhoto = (file: string) => `${OB_PROJECTS}/${file}`;
const ob = (file: string, alt: string, w: number): RefImage => ({
  src: projectPhoto(file),
  alt,
  kind: "Photo",
  source: "obriencontracting.ca · Projects",
  w,
});
export const PHOTOS = {
  shopSide: ob("MKPhoto-1821-1.jpg", "Completed shop building with timber-framed canopy", 1000),
  shopWide: ob("MKPhoto-1842.jpg", "Three-bay shop building with timber and blue cladding", 1000),
  shopTrailer: ob("MKPhoto-1848-1.jpg", "Completed shop building exterior", 1000),
  shopDusk: ob("MKPhoto-1888-1.jpg", "Completed shop building at dusk", 1000),
  shopStairs: ob("MKPhoto-1892.jpg", "Interior with timber stair and sliding barn door", 1000),
  shopInterior: ob("MKPhoto-1897-1.jpg", "Bright interior with stair and loft", 1000),
  shopBays: ob("MKPhoto-1912.jpg", "Interior with overhead doors open", 1000),
  shopTrucks: ob("MKPhoto-1947-1.jpg", "Completed shop building with bays open", 1000),
  bathVanity: ob("2020-05-1410.54.13.jpg", "Bathroom with vanity and wall sconces", 1000),
  bathTub: ob("2020-05-1410.56.35.jpg", "Bathroom with freestanding tub", 1000),
  cabana: ob(
    "143732770_1946069238868993_8364835802107115038_n-2.jpg",
    "Covered outdoor bar beside a stone patio",
    960,
  ),
  barWindow: ob(
    "143892405_1946069332202317_5054969848558874853_n-1.jpg",
    "Outdoor bar counter with framed window",
    720,
  ),
  barCovered: ob(
    "144076210_1946069355535648_3573319870902758670_n.jpg",
    "Covered outdoor bar with timber ceiling",
    720,
  ),
  barSeating: ob(
    "144189453_1946069295535654_263749928670396645_n.jpg",
    "Outdoor bar seating under a timber ceiling",
    720,
  ),
  barLounge: ob(
    "144228196_1946069278868989_2068492409410308495_n.jpg",
    "Outdoor bar with seating and stone base",
    720,
  ),
  barStone: ob(
    "144476719_1946069255535658_4440791575658560592_n.jpg",
    "Stone-clad outdoor bar counter",
    720,
  ),
  kitchen: ob(
    "314603326_553240643476346_4953318663269826168_n.jpeg",
    "Kitchen with white cabinets and stainless appliances",
    1000,
  ),
  kitchenCabinets: ob(
    "315099227_553240650143012_5160812216121899677_n.jpeg",
    "White shaker kitchen cabinets",
    1000,
  ),
  kitchenRange: ob(
    "315249565_553240626809681_1484751327160491613_n.jpeg",
    "Kitchen range with stainless hood",
    1000,
  ),
};

export const HERO = {
  eyebrow: "Custom home builder BC",
  titleLead: "A home that looks right.",
  titleAccent: "And lives well.",
  body: "Space for the way you live. Materials you want to live with. Comfort that matters as much as the finish.",
  brand: "Sustainable luxury custom homes",
  cta: "Discuss your project",
  secondary: "See the process",
  // Crossfades slowly. Mixed sources on purpose so the client can react to both looks.
  slides: [IMAGES.hero, IMAGES.nordicHaus, IMAGES.hausPatio],
};

export const INTRO = {
  eyebrow: "Nordic Green Homes",
  lead: [
    "Nordic Green Homes brings the site, your daily life and the practical work of building into one conversation.",
    "For homeowners seeking a sustainable luxury custom home builder BC, the early decisions matter: layout, materials, comfort, performance and what the property can support.",
    "Your new home starts with what matters to you: the site, your daily routines and the choices that will shape life there.",
  ],
  title: "A home for the life you actually lead",
  body: [
    "A kitchen with room for everyone. A quiet place to work. Storage where you need it. Light in the rooms you use most.",
    "The details that make a home yours belong in the conversation from the start. So do the practical questions: what suits the site, what fits the budget and how your choices affect the build.",
  ],
  designBuild: {
    label: "Design and build, considered together",
    body: [
      "A floorplan, a material palette and a performance goal each affect the others. A larger window changes more than the view. A different layout can change the structure. A finish affects both the look and the upkeep.",
      "Thinking about these choices together gives your brief a stronger starting point.",
    ],
  },
};

export const SERVICES = [
  {
    key: "luxuryCustomHomes",
    title: "Luxury Custom Homes",
    body: "Start with how you want to live, then consider the layout, materials and details that bring it together. Explore the choices that shape a custom home, from the first brief to the relationship between design, budget and buildability.",
    cta: "Explore Luxury Custom Homes",
    to: "/services/luxury-custom-homes",
    image: PHOTOS.shopDusk,
  },
  {
    key: "gardenSuites",
    title: "Garden Suites",
    body: "Making space for family or planning a separate dwelling? Begin with your property, the way the space will be used and the local rules. Access, services and site conditions all help determine what is possible.",
    cta: "Explore Garden Suites",
    to: "/services/garden-suites",
    image: PHOTOS.cabana,
  },
  {
    key: "passiveHome",
    title: "Passive Home Builder BC",
    body: "Considering a Passive House? Understand how insulation, windows, airtightness and ventilation work together, and what separates passive-home principles from formal building certification.",
    cta: "Explore Passive Home Builder BC",
    to: "/services/passive-home-builder-bc",
    image: PHOTOS.shopWide,
  },
  {
    key: "highPerformance",
    title: "High-Performance Homes",
    body: "Think beyond the finishes. Explore how the building envelope, windows, ventilation and moisture control relate to the comfort and energy goals in your brief.",
    cta: "Explore High-Performance Homes",
    to: "/services/high-performance-homes",
    image: PHOTOS.shopTrucks,
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

export const PROJECT_PHOTOS = [
  "MKPhoto-1821-1.jpg",
  "MKPhoto-1842.jpg",
  "MKPhoto-1848-1.jpg",
  "MKPhoto-1888-1.jpg",
  "MKPhoto-1892.jpg",
  "MKPhoto-1897-1.jpg",
  "MKPhoto-1899.jpg",
  "MKPhoto-1904.jpg",
  "MKPhoto-1908.jpg",
  "MKPhoto-1910-1.jpg",
  "MKPhoto-1912.jpg",
  "MKPhoto-1925.jpg",
  "MKPhoto-1927.jpg",
  "MKPhoto-1947-1.jpg",
  "2020-05-1410.53.57.jpg",
  "2020-05-1410.54.13.jpg",
  "2020-05-1410.54.29.jpg",
  "2020-05-1410.56.24.jpg",
  "2020-05-1410.56.35.jpg",
  "143732770_1946069238868993_8364835802107115038_n-2.jpg",
  "143892405_1946069332202317_5054969848558874853_n-1.jpg",
  "144076210_1946069355535648_3573319870902758670_n.jpg",
  "144189453_1946069295535654_263749928670396645_n.jpg",
  "144228196_1946069278868989_2068492409410308495_n.jpg",
  "144476719_1946069255535658_4440791575658560592_n.jpg",
  "314603326_553240643476346_4953318663269826168_n.jpeg",
  "315099227_553240650143012_5160812216121899677_n.jpeg",
  "315249565_553240626809681_1484751327160491613_n.jpeg",
].map(projectPhoto);

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
    image: PHOTOS.barCovered,
  },
  {
    key: "richmondTsawwassen",
    title: "Richmond and Tsawwassen",
    to: "/service-areas/richmond-and-tsawwassen",
    image: PHOTOS.barSeating,
  },
  {
    key: "vancouverIsland",
    title: "Vancouver Island",
    to: "/service-areas/vancouver-island",
    image: PHOTOS.shopSide,
  },
] as const;

// The four principles behind a considered home — wording adapted and kept claim-free.
export const PILLARS = [
  {
    title: "Considered design",
    body: "Good design has a job to do. Rooms need to work together, storage needs to be useful and materials need to suit everyday use as well as the overall look.",
  },
  {
    title: "Clear decisions",
    body: "A change in size, layout or specification can change the cost. Knowing which choices matter helps you weigh the options before settling on a direction.",
  },
  {
    title: "Responsible performance",
    body: "Energy and comfort goals deserve more than a label. The useful questions are what you want to achieve, how it will be assessed and what evidence will show the result.",
  },
  {
    title: "Coordinated planning",
    body: "Design, approvals and construction are connected. Clear responsibilities and early technical input help you understand what needs to happen next.",
  },
] as const;

// Five stages from the recommended sitemap.
export const PROCESS = [
  {
    title: "Consultation",
    body: "Start with your site, ideas, timing and budget. Bring the questions you have now, whether you have detailed drawings or are still working out what the home needs to be.",
  },
  {
    title: "Design and planning",
    body: "Turn your priorities into a clearer brief. Consider layout, light, materials and performance goals alongside the site and budget. If you have an architect or designer, establish who is responsible for each part of the work.",
  },
  {
    title: "Materials and approvals",
    body: "Bring finishes, fixtures and key specifications together with the documents your project needs. The approval path depends on your location, property and design.",
  },
  {
    title: "Construction",
    body: "Before site work starts, understand what is included, how changes will be handled and how you will receive updates. Keep the agreed scope and key decisions close throughout the build.",
  },
  {
    title: "Handover and ongoing care",
    body: "Get to know your finished home, its systems and the care they need. Handover documents, product information and written warranty terms help you understand what comes next.",
  },
] as const;

export const ASSURANCE = {
  eyebrow: "Our commitment",
  title: "A considered approach to sustainability",
  subtitle: "Sustainability belongs in the details",
  body: [
    "The materials you choose. The energy goals you set. The way the home can adapt as your needs change. Sustainable design involves practical choices with consequences for the whole home.",
    "Put those questions alongside appearance, budget and maintenance from the outset.",
  ],
  link: "Explore our approach",
};

export const GUIDE = {
  eyebrow: "Guide",
  title: "Future-proofing your home",
  body: "The best time to think about tomorrow is while you are planning today. What might your home need as your household, technology and daily routines change?",
  // Topic list from the existing guide description (reference). Final contents follow the recovered file.
  topics: [
    {
      title: "Smart technology",
      body: "Think about the systems you want to use and the wiring or space they may need.",
    },
    {
      title: "Renewable energy",
      body: "Consider whether renewable energy belongs in your plans and what specialist advice the property needs.",
    },
    {
      title: "Water conservation",
      body: "Look at fixtures, water use and the practical choices relevant to your site.",
    },
    {
      title: "Flexible design",
      body: "Consider how a room could serve a different purpose as your needs change.",
    },
    {
      title: "Resilient materials",
      body: "Weigh appearance alongside exposure, maintenance and expected use.",
    },
  ],
  cta: "Explore resources",
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
    q: "Do I need finished plans before the first conversation?",
    a: "You can start organising your ideas before you have finished plans. Gather the property details, your priorities, budget context and any surveys, sketches or inspiration you already have.",
  },
  {
    q: "Which service should I start with?",
    a: "Explore Custom Homes if you are planning a new home, or Garden Suites if you are considering a separate dwelling. For energy and comfort goals, compare Passive House and High-Performance Homes. Design and Interiors is a useful starting point for layout, materials and finishes.",
  },
  {
    q: "Is a high-performance home automatically a Passive House?",
    a: "No. \u201cHigh-performance\u201d is a broad term. Passive House is a building standard with specific criteria and a formal certification path. A home can include energy-efficiency goals without being a certified Passive House.",
  },
  {
    q: "Can the website estimate tell me what my home will cost?",
    a: "A website estimate is not a construction quote. Your site, design, materials, services and project scope all affect the cost. Treat any early range as a starting point for questions, not a fixed price.",
  },
  {
    q: "Can I bring my own architect or designer?",
    a: "If you already have an architect, designer or plans, include those details in your enquiry. It is important to establish who is responsible for design, approvals and construction before agreeing the next stage.",
  },
];

const ABOUT_LINKS = [
  { label: "Why Choose Us", to: "/about-us/why-choose-us" },
  { label: "Our Guarantee", to: "/about-us/our-guarantee" },
  { label: "Process", to: "/process" },
] as const;

const SERVICE_LINKS = [
  { label: "Luxury Custom Homes", to: "/services/luxury-custom-homes" },
  { label: "Garden Suites", to: "/services/garden-suites" },
  { label: "Passive Home Builder BC", to: "/services/passive-home-builder-bc" },
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

// Footer columns: the full site map, including pages kept out of the header (service areas, FAQs).
export const FOOTER_COLUMNS = [
  {
    title: "About",
    links: [
      { label: "About Us", to: "/about-us" },
      ...ABOUT_LINKS,
      { label: "Projects", to: "/projects" },
      { label: "Contact", to: "/contact" },
    ],
  },
  { title: "Services", links: SERVICE_LINKS },
  { title: "Floorplans", links: FLOORPLAN_LINKS },
  { title: "Service Areas", links: AREA_LINKS },
  {
    title: "Resources",
    links: [
      { label: "Resources", to: "/resources" },
      { label: "Planning Guide", to: "/resources/guide" },
      { label: "BC Energy Step Code", to: "/resources/bc-energy-step-code" },
      { label: "FAQs", to: "/faqs" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
] as const;
