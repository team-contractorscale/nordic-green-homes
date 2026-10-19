import { Eyebrow } from "./Hero";
import { Placeholder } from "@/components/home/NordicHome";
import {
  ASSURANCE,
  IMAGES,
  PLACEHOLDER,
  REFERENCE_BASE,
  REFERENCE_SERVICE_AREA,
} from "@/lib/home-content";

/**
 * AssuranceStrip — Green Mastery Assurance, rebalanced to light.
 *
 * The earlier draft sat on a 90%-opaque green field, which was part of the
 * "too much green" problem. Here the section is warm mist with a light
 * green-tinted gradient over a single framed image, and the based-in /
 * service-area reference details as small light cards.
 */
export function AssuranceStrip() {
  return (
    <section
      data-anim="assurance"
      className="relative isolate overflow-hidden bg-secondary/60 py-24 text-foreground lg:py-32"
    >
      <div className="wrap grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow>{ASSURANCE.eyebrow}</Eyebrow>
          <h2
            data-anim="reveal"
            className="mt-5 font-serif text-[clamp(2rem,2.5vw+1rem,3rem)] leading-[1.06] tracking-[-0.02em]"
          >
            {ASSURANCE.title}
          </h2>
          <p
            data-anim="reveal"
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            {ASSURANCE.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Placeholder>{PLACEHOLDER.assurance}</Placeholder>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-border bg-background p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Based in</p>
              <p className="mt-2 text-base text-foreground">
                {REFERENCE_BASE} <span className="text-muted-foreground/70">(reference)</span>
              </p>
            </div>
            <div className="rounded-md border border-border bg-background p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                Service area
              </p>
              <p className="mt-2 text-base text-foreground">
                {REFERENCE_SERVICE_AREA}{" "}
                <span className="text-muted-foreground/70">(reference)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="group relative overflow-hidden rounded-md border border-border shadow-lg">
            <img
              src={IMAGES.office.src}
              alt={IMAGES.office.alt}
              loading="lazy"
              data-reveal-img
              className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
