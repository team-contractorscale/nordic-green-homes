import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { IMAGES, type RefImage, PHOTOS } from "@/lib/home-content";
import { Eyebrow, RefTag, imgProps } from "./shared";

/* ---------- 7. Selected work ----------
 * Pinned horizontal gallery. Desktop: the section pins and vertical scroll drives the track
 * sideways (GSAP, [data-hscroll] / [data-hscroll-track] / [data-hscroll-bar] in useHomeMotion),
 * with a gold "View" cursor that follows the pointer over cards ([data-hcursor]).
 * Below lg: a native swipeable row with scroll-snap.
 *
 * Card sizes follow each file's native width so nothing is upscaled: ~960px photos are shown at
 * <= 480 CSS px (sharp on 2x screens), 1920px renders can go wider.
 */

type Item = { image: RefImage; title: string; size: "render" | "photo" | "wide-photo" };

const ITEMS: Item[] = [
  { image: PHOTOS.barWindow, title: "Rear porch & pool", size: "render" },
  { image: IMAGES.entry, title: "Front entry", size: "photo" },
  { image: PHOTOS.cabana, title: "Covered patio & living", size: "render" },
  { image: IMAGES.interior, title: "Media room", size: "wide-photo" },
  { image: PHOTOS.kitchen, title: "Rear terrace", size: "render" },
  { image: IMAGES.intro, title: "Entry hall arches", size: "photo" },
  { image: IMAGES.renovations, title: "Barn-door hallway", size: "photo" },
];

const SIZE = {
  render: "w-[82vw] sm:w-[34rem] lg:w-[44rem] aspect-[3/2]",
  "wide-photo": "w-[82vw] sm:w-[30rem] lg:w-[36rem] aspect-[4/3]",
  photo: "w-[78vw] sm:w-[26rem] lg:w-[30rem] aspect-[3/2]",
} as const;

export function HomeProjects() {
  return (
    <section data-hscroll className="relative overflow-hidden bg-background py-24 sm:py-28 lg:py-0">
      {/* pointer-follow "View" cursor (desktop, fine pointers only) */}
      <span
        data-hcursor
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-30 hidden size-24 -translate-x-1/2 -translate-y-1/2 scale-0 place-items-center rounded-full bg-gold text-sm font-bold text-black [@media(hover:hover)]:lg:grid"
      >
        View
      </span>

      {/* oversized outline word drifting behind the track (desktop) */}
      <p
        data-hscroll-bg
        aria-hidden
        className="pointer-events-none absolute bottom-[6vh] left-0 hidden select-none whitespace-nowrap font-serif text-[15vw] leading-none text-transparent [-webkit-text-stroke:1px_rgb(18_85_69/0.14)] lg:block"
      >
        Selected work · Design &amp; build · Selected work
      </p>

      <div className="relative flex min-h-0 flex-col lg:h-[100svh] lg:justify-center lg:pt-16">
        <div
          data-hscroll-track
          className="flex snap-x snap-mandatory items-end gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:snap-none lg:gap-8 lg:overflow-visible lg:pb-0 lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))] lg:pr-[10vw] [scrollbar-width:none]"
        >
          {/* intro panel — first item in the track */}
          <div className="w-[82vw] shrink-0 snap-start self-center sm:w-[24rem] lg:w-[26rem]">
            <Eyebrow>Selected work</Eyebrow>
            <h2
              data-anim="reveal"
              className="mt-4 font-serif text-[clamp(2rem,2vw+1rem,3rem)] leading-[1.1] tracking-[-0.01em]"
            >
              Design and build, in detail
            </h2>
            <p data-anim="reveal" className="mt-4 text-base leading-relaxed text-muted-foreground">
              A covered porch. A framed view. An entry that opens into the home. Explore the spaces
              and details that catch your eye as you gather ideas for your own brief.
            </p>
            <Link
              to="/projects"
              className="group mt-6 inline-flex items-center gap-2 text-base font-bold text-primary underline underline-offset-4 hover:text-gold"
            >
              View projects
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <p className="mt-4 hidden items-center gap-2 text-sm font-bold text-primary lg:flex">
              Keep scrolling <ArrowRight className="size-4 animate-pulse" />
            </p>
          </div>

          {ITEMS.map((item, i) => (
            <Link
              key={item.image.src}
              to="/projects"
              data-hcard
              className={`group relative block shrink-0 snap-start overflow-hidden rounded-lg bg-muted ${SIZE[item.size]} ${
                i % 2 ? "lg:mb-24" : ""
              }`}
            >
              <img
                {...imgProps(item.image, item.size === "render" ? "44rem" : "36rem")}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                <span className="grid size-10 shrink-0 scale-75 place-items-center rounded-full bg-white text-primary opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 lg:hidden">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
              <RefTag image={item.image} className="right-3 top-3" />
            </Link>
          ))}
        </div>

        {/* scrubbed progress line (desktop) */}
        <div className="wrap mt-10 hidden lg:block">
          <div className="h-px w-full bg-border">
            <div
              data-hscroll-bar
              className="h-px w-full origin-left bg-gold"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
