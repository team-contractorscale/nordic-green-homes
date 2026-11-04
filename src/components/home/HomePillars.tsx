import { Gem, HeartHandshake, Leaf, Users, type LucideIcon } from "lucide-react";
import type { PointerEvent } from "react";
import { PILLARS, type RefImage, IMAGES } from "@/lib/home-content";
import { RefTag, imgProps } from "./shared";
import { HEADING, Kicker } from "./kit";

/* ---------- 4. Pillars — "What guides the work" ----------
 * Highwater "Why" hairline bento: 1px gaps on a slate ground; the heading fills the first two
 * cells, the four pillars fill the rest. Scroll-in (useHomeMotion): tiles fold down from their
 * top edge in a staggered wave and the outlined numbers rise out of a mask. Hover (fine
 * pointer): the tile tilts toward the cursor and its photo opens as a circle from the entry
 * point (CSS --x/--y + clip-path transition); text turns white, the number fills gold. Nothing
 * reflows. Touch shows the photo permanently. All four pillars are always readable.
 */

export type Pillar = (typeof PILLARS.items)[number]["title"];

export const PILLAR_MARK: Record<Pillar, LucideIcon> = {
  Sustainable: Leaf,
  Family: Users,
  Luxury: Gem,
  Faith: HeartHandshake,
};

export const PILLAR_IMAGE: Record<Pillar, RefImage> = {
  Sustainable: IMAGES.hausSide,
  Family: IMAGES.hausPatio,
  Luxury: IMAGES.entry,
  Faith: IMAGES.hausGarden,
};

// Circle origin for the photo reveal = where the pointer entered the tile.
function setOrigin(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

type Props = {
  title?: string;
  items?: readonly { title: Pillar; body: string }[];
};

export function HomePillars({ title = PILLARS.title, items = PILLARS.items }: Props = {}) {
  return (
    <section data-section="What guides the work" className="bg-secondary py-24 sm:py-28">
      <div className="wrap">
        <div className="grid gap-px border border-slate/15 bg-slate/15 [perspective:1400px] sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-end bg-secondary p-8 sm:col-span-2 lg:p-12">
            <Kicker>What guides the work</Kicker>
            <h2 data-split className={`${HEADING} mt-6 max-w-2xl`}>
              {title}
            </h2>
          </div>

          {items.map((p, i) => {
            const img = PILLAR_IMAGE[p.title];
            const Mark = PILLAR_MARK[p.title];
            return (
              <article
                key={p.title}
                data-tile
                onPointerEnter={setOrigin}
                className="group relative isolate flex min-h-[20rem] flex-col overflow-hidden bg-background p-8 [--x:50%] [--y:50%] lg:min-h-[24rem] lg:p-10"
              >
                <div className="absolute inset-0 -z-10 [clip-path:circle(0%_at_var(--x)_var(--y))] transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[clip-path:circle(150%_at_var(--x)_var(--y))] pointer-coarse:[clip-path:none]">
                  <img
                    {...imgProps(img, "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw")}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-dark/80" />
                  <RefTag image={img} className="bottom-4 right-4" />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="block overflow-hidden">
                    <span
                      data-num
                      className="block font-serif text-6xl leading-none text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_var(--slate)] group-hover:text-gold group-hover:[-webkit-text-stroke:1px_var(--gold)] pointer-coarse:text-gold pointer-coarse:[-webkit-text-stroke:1px_var(--gold)]"
                    >
                      0{i + 1}
                    </span>
                  </span>
                  <Mark aria-hidden className="size-7 text-gold" strokeWidth={1.4} />
                </div>
                <h3 className="mt-auto pt-10 font-serif text-2xl leading-tight text-foreground transition-colors duration-500 group-hover:text-white pointer-coarse:text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-white/85 pointer-coarse:text-white/85">
                  {p.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
