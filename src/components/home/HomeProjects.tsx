import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { IMAGES, type RefImage } from "@/lib/home-content";
import { RefTag, imgProps } from "./shared";
import { HEADING, Kicker, LineLink } from "./kit";

/* ---------- 8. Selected work ----------
 * Even gallery: every frame is the same 4:5 size (4 across on lg, 2 on sm). The seven images
 * plus a matching "View projects" tile fill two clean rows. Each frame wipes open as it enters
 * ([data-reveal-img]). Hover: the image eases in to full colour, the title and index slide up,
 * gold corner ticks frame it, and a gold "View" cursor follows the pointer ([data-hcursor]).
 */

type Item = { image: RefImage; title: string };

const ITEMS: Item[] = [
  { image: IMAGES.poolRender, title: "Rear porch & pool" },
  { image: IMAGES.entry, title: "Front entry" },
  { image: IMAGES.hausPatio, title: "Covered patio & living" },
  { image: IMAGES.interior, title: "Media room" },
  { image: IMAGES.farmhouseRear, title: "Rear terrace" },
  { image: IMAGES.intro, title: "Entry hall arches" },
  { image: IMAGES.renovations, title: "Barn-door hallway" },
];

const TICK =
  "absolute size-4 border-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100";

function Tile({ item, index }: { item: Item; index: number }) {
  return (
    <Link
      to="/projects"
      data-hcard
      className="group relative block aspect-[4/5] overflow-hidden bg-muted"
    >
      <div data-reveal-img className="absolute inset-0 overflow-hidden">
        <img
          {...imgProps(item.image, "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw")}
          loading="lazy"
          className="h-full w-full object-cover saturate-[0.85] transition-[scale,filter] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:saturate-100"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-100"
      />
      <span aria-hidden className={`${TICK} left-3 top-3 border-l border-t`} />
      <span aria-hidden className={`${TICK} bottom-3 right-3 border-b border-r`} />
      <RefTag image={item.image} className="right-3 top-3" />
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
        <div className="overflow-hidden">
          <p className="translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-y-[130%] lg:group-hover:translate-y-0">
            <span className="block text-[0.62rem] font-bold tracking-[0.22em] text-gold">
              {String(index).padStart(2, "0")}
            </span>
            <span className="mt-1 block font-serif text-xl leading-tight sm:text-2xl">
              {item.title}
            </span>
          </p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center border border-white/40 transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}

export function HomeProjects() {
  return (
    <section
      data-gallery
      data-section="Selected work"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      {/* pointer-follow "View" cursor (desktop, fine pointers only) */}
      <span
        data-hcursor
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-30 hidden size-24 -translate-x-1/2 -translate-y-1/2 scale-0 place-items-center bg-gold text-xs font-bold uppercase tracking-[0.18em] text-black [@media(hover:hover)]:lg:grid"
      >
        View
      </span>

      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker>Selected work</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              Design and build, in detail
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p data-reveal className="text-base leading-relaxed text-muted-foreground">
              A covered porch. A framed view. An entry that opens into the home. Explore the spaces
              and details that catch your eye as you gather ideas for your own brief.
            </p>
            <div data-reveal className="mt-6">
              <LineLink to="/projects">View projects</LineLink>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Tile key={item.image.src} item={item} index={i + 1} />
          ))}
          <Link
            to="/projects"
            data-reveal
            className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden bg-brand-dark p-7 text-white"
          >
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold">
              {String(ITEMS.length + 1).padStart(2, "0")} · More
            </span>
            <span>
              <span className="block font-serif text-3xl leading-tight">View all projects</span>
              <span className="mt-6 grid size-12 place-items-center border border-white/30 transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
