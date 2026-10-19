import { Eyebrow } from "./Hero";
import { Placeholder } from "@/components/home/NordicHome";
import {
  ASSURANCE,
  IMAGES,
  PLACEHOLDER,
  REFERENCE_BASE,
  REFERENCE_SERVICE_AREA,
} from "@/lib/home-content";

export function AssuranceStrip() {
  return (
    <section
      data-anim="assurance"
      className="relative isolate overflow-hidden bg-primary text-primary-foreground"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={IMAGES.interior.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/92" />
      </div>
      <div className="wrap grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <Eyebrow tone="gold">{ASSURANCE.eyebrow}</Eyebrow>
          <h2
            data-anim="reveal"
            className="mt-5 font-serif text-[clamp(2rem,2.5vw+1rem,3rem)] leading-[1.08] tracking-[-0.02em]"
          >
            {ASSURANCE.title}
          </h2>
          <p data-anim="reveal" className="mt-5 max-w-xl text-base leading-relaxed text-white/85">
            {ASSURANCE.body}
          </p>
          <div className="mt-6">
            <Placeholder>{PLACEHOLDER.assurance}</Placeholder>
          </div>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-md border border-white/15 bg-black/25 p-6 text-sm text-white/80 backdrop-blur-md">
            <p className="font-bold uppercase tracking-[0.18em] text-gold">Based in</p>
            <p className="mt-2 text-base">
              {REFERENCE_BASE} <span className="text-white/55">(reference)</span>
            </p>
            <p className="mt-4 font-bold uppercase tracking-[0.18em] text-gold">Service area</p>
            <p className="mt-2 text-base">
              {REFERENCE_SERVICE_AREA} <span className="text-white/55">(reference)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
