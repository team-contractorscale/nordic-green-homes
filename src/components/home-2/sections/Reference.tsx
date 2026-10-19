import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "./Hero";
import { Placeholder } from "@/components/home/NordicHome";
import { PLACEHOLDER } from "@/lib/home-content";
import { PROJECTS_GALLERY } from "@/lib/content-data";

/**
 * ReferenceSection — selected work, light and clearly labelled.
 *
 * One featured tile + two supporting tiles on a consistent aspect ratio,
 * each with a "Reference only" tag and a hover zoom. Project names,
 * locations and attribution stay as visible placeholders.
 */
export function ReferenceSection() {
  return (
    <section
      data-anim="reference"
      className="relative overflow-hidden bg-background py-24 text-foreground lg:py-32"
    >
      <div className="wrap">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Selected work</Eyebrow>
            <h2
              data-anim="reveal"
              className="mt-5 font-serif text-[clamp(2.2rem,3vw+1rem,3.4rem)] leading-[1.04] tracking-[-0.02em]"
            >
              Design and build, in detail.
            </h2>
            <p
              data-anim="reveal"
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              Every image below is labelled as a photo or a concept render and shown as{" "}
              <span className="text-gold">reference only</span> — project names, locations and
              attribution are pending confirmation for Nordic Green Homes.
            </p>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-base font-bold text-primary underline underline-offset-4 hover:text-foreground"
          >
            View projects{" "}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-12 md:grid-rows-2">
          {(() => {
            const featured = PROJECTS_GALLERY[0];
            if (!featured) return null;
            return (
              <div
                data-anim="img"
                className="group relative aspect-[4/3] overflow-hidden rounded-md md:col-span-7 md:row-span-2 md:aspect-auto"
              >
                <img
                  src={featured.image}
                  alt={featured.alt}
                  loading="lazy"
                  className="h-full w-full object-cover [clip-path:inset(6%_6%_6%_6%)] transition-transform duration-700 group-hover:scale-[1.04]"
                  data-reveal-img
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-[0.7rem] font-bold text-white backdrop-blur-sm">
                  Reference only
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                  <h3 className="font-serif text-xl text-white">{featured.title}</h3>
                  <p className="text-sm text-white/75">
                    {featured.type} · {featured.status}
                  </p>
                </div>
              </div>
            );
          })()}
          {PROJECTS_GALLERY.slice(2, 4).map((p) => (
            <div
              key={p.id}
              data-anim="img"
              className="group relative aspect-[4/3] overflow-hidden rounded-md md:col-span-5"
            >
              <img
                src={p.image}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover [clip-path:inset(6%_6%_6%_6%)] transition-transform duration-700 group-hover:scale-[1.04]"
                data-reveal-img
              />
              <span className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-[0.7rem] font-bold text-white backdrop-blur-sm">
                Reference only
              </span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-4">
                <h3 className="font-serif text-lg text-white">{p.title}</h3>
                <p className="text-xs text-white/70">{p.type}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Placeholder>{PLACEHOLDER.projects}</Placeholder>
          <Placeholder>{PLACEHOLDER.testimonials}</Placeholder>
        </div>
      </div>
    </section>
  );
}
