import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Eyebrow, RefTag } from "./Hero";
import { Placeholder } from "@/components/home/NordicHome";
import { CONSULTATION, IMAGES, PLACEHOLDER } from "@/lib/home-content";

/**
 * FinalCta — the closing consultation moment, dark green.
 *
 * Image-led, with the gold primary CTA and the CRM-off notice. Kept dark to
 * bookend the hero. Pending placeholders for phone, email and booking owner
 * stay visible.
 */
export function FinalCta() {
  return (
    <section
      data-anim="final"
      className="relative isolate overflow-hidden bg-brand-dark text-white"
    >
      <img
        src={IMAGES.poolRender.src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgb(13_61_50/0.96)_0%,rgb(18_85_69/0.78)_55%,rgb(13_61_50/0.7)_100%)]"
      />
      <RefTag image={IMAGES.poolRender} className="bottom-4 right-4" />

      <div className="wrap py-24 text-center lg:py-32">
        <div className="mx-auto max-w-2xl">
          <Eyebrow tone="gold">{CONSULTATION.eyebrow}</Eyebrow>
          <h2
            data-anim="reveal"
            className="mt-6 font-serif text-[clamp(2.6rem,5vw,4.6rem)] leading-[1.02] tracking-[-0.02em]"
          >
            {CONSULTATION.title}
          </h2>
          <p
            data-anim="reveal"
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {CONSULTATION.body}
          </p>

          <div
            data-anim="reveal"
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/contact"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-gold py-1.5 pl-7 pr-1.5 text-base font-bold text-black transition-all duration-300 hover:scale-[1.03]"
            >
              {CONSULTATION.cta}
              <span className="flex size-11 items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowRight className="size-4" />
              </span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-base font-bold text-white/90 underline underline-offset-4 hover:text-white"
            >
              Contact the team <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <p data-anim="reveal" className="mt-8 text-xs text-white/60">
            Internal pilot: enquiry forms and CRM submission are switched off.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Placeholder>{PLACEHOLDER.phone}</Placeholder>
            <Placeholder>{PLACEHOLDER.email}</Placeholder>
            <Placeholder>{PLACEHOLDER.bookingOwner}</Placeholder>
          </div>
        </div>
      </div>
    </section>
  );
}
