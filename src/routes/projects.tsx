import { acceptedMetadata } from "@/lib/accepted-metadata";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { CTA } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import {
  HEADING,
  Kicker,
  LineLink,
  ScrollProgress,
  SectionIndicator,
  SweepLink,
  HeroTitle,
  HeroBackdrop,
} from "@/components/home/kit";

/* Projects — homepage design language and motion. Copy is the client-supplied Projects content
 * (2026-11-04); SEO fields from the 3 November manifest.
 * Photos: the obriencontracting.ca/projects gallery (client-directed 2026-11-04), self-hosted
 * in /public/projects and grouped into the four projects they show. They are O'Brien
 * Contracting work, so every project carries that attribution (the page's own rule: images
 * only with clear attribution); never caption them as Nordic Green Homes builds.
 * Order: hero with project index (dark) → what a useful project story shows → the projects.
 */

const TITLE = "Projects and Design References | Nordic Green Homes";
const DESCRIPTION =
  "Learn what makes project information useful: the brief, design decisions, documented work and clearly attributed images.";
const CREDIT = "O'Brien Contracting Ltd.";

type Photo = { src: string; alt: string };
type Project = { slug: string; title: string; photos: Photo[] };

const photos = (slug: string, alts: string[]): Photo[] =>
  alts.map((alt, i) => ({ src: `/projects/${slug}-${i + 1}.jpg`, alt }));

const PROJECTS: Project[] = [
  {
    slug: "outdoor-kitchen",
    title: "Covered outdoor kitchen",
    photos: photos("outdoor-kitchen", [
      "Covered outdoor kitchen pavilion with a stone bar and patio seating",
      "Stone and brick outdoor bar with timber cabinetry",
      "Long outdoor bar counter with dark timber cabinet doors",
      "Covered bar with a timber ceiling, pendant light and stone counter",
      "Outdoor bar seating under a timber-lined roof",
      "Stone bar end with a counter overhang and bar stools",
    ]),
  },
  {
    slug: "bathroom",
    title: "Bathroom renovation",
    photos: photos("bathroom", [
      "Walk-in glass shower with marble-look tile",
      "Double vanity with a black countertop and wall sconces",
      "Bathroom with a glass shower and double vanity",
      "Shower bench and glass panel with marble-look tile",
      "Freestanding soaker tub beside the glass shower",
    ]),
  },
  {
    slug: "kitchen",
    title: "Kitchen",
    photos: photos("kitchen", [
      "Kitchen with white shaker cabinets and a stainless range hood",
      "White shaker cabinets beside a stainless range",
      "Gas range with a chimney hood and tiled backsplash",
    ]),
  },
  {
    slug: "shop",
    title: "Detached shop and garage",
    photos: photos("shop", [
      "Detached shop with timber accents and two garage doors",
      "Three-bay shop with blue siding and cedar trim",
      "Shop exterior with three wood-look garage doors",
      "Shop at dusk with the garage doors open",
      "Shop interior with a stair and sliding barn door",
      "Shop interior with a stair, workbench and barn door",
      "Shop hallway with a workbench and stair",
      "Shop washroom with a vanity",
      "Compact washroom with a vanity",
      "Workshop bay with a long workbench",
      "Open shop bays with overhead doors",
      "Shop bay with storage",
      "Shop interior with overhead doors and a counter",
      "Shop exterior with vehicles in the open bays",
    ]),
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      ...acceptedMetadata("/projects"),
      { property: "og:image", content: "/projects/shop-2.jpg" },
      { name: "twitter:image", content: "/projects/shop-2.jpg" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />
      <ProjectsHero />
      <StoryShows />
      {PROJECTS.map((p, i) => (
        <ProjectBlock key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}

/* ---------- Hero ----------
 * Heading and intro on the left; on the right an index of the four projects as cover tiles
 * (each jumps to its gallery), credited to O'Brien Contracting.
 */
function ProjectsHero() {
  return (
    <section
      data-section="Projects"
      className="grain relative isolate overflow-hidden bg-overlay text-white"
    >
      <HeroBackdrop image={"/projects/shop-2.jpg"} />
      <div className="wrap grid min-h-svh items-center gap-14 pb-20 pt-36 lg:grid-cols-12 lg:pt-40">
        <div data-hero-copy className="lg:col-span-6">
          <p
            data-anim="fade"
            className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
          >
            <span aria-hidden className="h-px w-10 bg-gold" />
            Projects
          </p>
          <HeroTitle
            lines={["Home concepts and", "design inspiration"]}
            max="5.25rem"
            className="mt-7"
          />
          <p
            data-anim="fade"
            className="mt-8 max-w-[34rem] text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Explore the ideas behind Nordic Haus and Modern Belgian Farmhouse, and the design
            perspective Kylie brings through Nordic Green Design. Use the layouts, spaces and
            material direction to start a conversation about your own home.
          </p>
        </div>

        <nav aria-label="Projects on this page" className="lg:col-span-6">
          <ul className="grid grid-cols-2 gap-2">
            {PROJECTS.map((p, i) => (
              <li key={p.slug} data-anim="stat">
                <a
                  href={`#${p.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden"
                >
                  <img
                    src={p.photos[0]?.src}
                    alt=""
                    fetchPriority={i < 2 ? "high" : "auto"}
                    className="absolute inset-0 h-full w-full object-cover brightness-[0.7] transition-[filter,scale] duration-700 group-hover:scale-[1.05] group-hover:brightness-100"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-overlay/90 via-overlay/20 to-transparent"
                  />
                  <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <span>
                      <span className="block text-[0.62rem] font-bold tracking-[0.2em] text-gold">
                        {pad(i + 1)} · {p.photos.length} photos
                      </span>
                      <span className="mt-1 block font-serif text-lg leading-tight sm:text-xl">
                        {p.title}
                      </span>
                    </span>
                    <ArrowDown className="size-4 shrink-0 transition-transform duration-500 group-hover:translate-y-1" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p
            data-anim="fade"
            className="mt-4 flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-white/60"
          >
            <span aria-hidden className="h-px w-8 bg-gold" />
            Project photos: {CREDIT}
          </p>
        </nav>
      </div>
    </section>
  );
}

/* ---------- What a useful project story shows ----------
 * The paragraph beside the five things it names (numbered hairline row), the attribution rule
 * as a gold-rule note, then the two CTAs.
 */
function StoryShows() {
  return (
    <section data-section="Concepts and design" className="bg-background py-24">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-3">
          <article>
            <h2 className="font-serif text-3xl">Nordic Haus</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              A Nordic/Scandinavian concept with warm timber tones, four upstairs bedrooms and a
              garden around the main living area. Explore how the plan connects everyday spaces with
              the outdoors.
            </p>
            <LineLink to="/floorplans/nordic-haus">Explore Nordic Haus</LineLink>
          </article>
          <article>
            <h2 className="font-serif text-3xl">Modern Belgian Farmhouse</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Sweeping rooflines, layered textures, a vaulted great room and a main-floor primary
              suite give this European-inspired concept its character.
            </p>
            <LineLink to="/floorplans/modern-belgian-farmhouse">
              Explore Modern Belgian Farmhouse
            </LineLink>
          </article>
          <article>
            <h2 className="font-serif text-3xl">Design and interiors</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Kylie brings her design perspective through Nordic Green Design. From floorplans and
              material selections to furnishings and lighting, the starting point is the way you
              want the home to feel and work.
            </p>
            <LineLink to="/services/design-and-interiors">Explore Design and interiors</LineLink>
          </article>
        </div>
        <p className="mt-10 border-l-2 border-gold pl-5 text-base">
          The home concepts are design references, not completed Nordic Green Homes builds. Interior
          design: Nordic Green Design. Drafting: Bronson Design for Nordic Haus and Old Clayburn
          Design for Modern Belgian Farmhouse.
        </p>
        <div className="mt-10 flex flex-wrap gap-8">
          <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
          <LineLink to={CTA.call.to}>{CTA.call.label}</LineLink>
        </div>
      </div>
    </section>
  );
}

/* ---------- One project ----------
 * Header row (number, title, photo count, credit) over an equal-size photo grid. Sections
 * alternate light / mist. Each photo wipes open as it enters; hover eases it in.
 */
function ProjectBlock({ project, index }: { project: Project; index: number }) {
  return (
    <section
      id={project.slug}
      data-section={project.title}
      className={`scroll-mt-24 py-20 sm:py-24 ${index % 2 ? "bg-background" : "bg-secondary"}`}
    >
      <div className="wrap">
        <div className="flex flex-col gap-4 border-b border-slate/20 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-gold">
              Project {pad(index + 1)}
            </span>
            <h2
              data-split
              className="mt-3 font-serif text-[clamp(2rem,2.4vw+1rem,3.5rem)] leading-[1.02] tracking-[-0.02em]"
            >
              {project.title}
            </h2>
          </div>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-[0.2em] text-slate">
            <span>{project.photos.length} photos</span>
            <span aria-hidden className="h-px w-6 bg-gold" />
            <span>Built by {CREDIT}</span>
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {project.photos.map((photo) => (
            <li key={photo.src} className="group relative aspect-[4/3] overflow-hidden bg-muted">
              <div data-reveal-img className="absolute inset-0 overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-[scale] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
