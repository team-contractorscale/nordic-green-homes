import { CONSULTATION, IMAGES } from "@/lib/home-content";
import { ConsultationButton, Eyebrow, H2, RefTag } from "./shared";

/* Nordic Green Homes — shared home barrel. Inner pages import these primitives and the
 * consultation band from here. Homepage-only sections live in their own modules (HomeHero,
 * HomeSections, HomePillars, HomeAssurance, HomeProjects) so their
 * motion libraries (GSAP, Anime.js, three.js) never ship with inner pages.
 */

export {
  Placeholder,
  RefTag,
  RefImg,
  Eyebrow,
  H2,
  H3,
  TEXT_LINK,
  ConsultationButton,
} from "./shared";

/* ---------- 9. Consultation ----------
 * One CTA card on a photo, straddling the page/footer seam (white above, footer green below),
 * so the page ends in a single consultation moment rather than two stacked green blocks.
 */

export function HomeConsultation() {
  return (
    <section className="consult-band relative z-10 pt-8">
      {/* Offset lives on the wrapper: the reveal animation owns the card's transform. */}
      <div className="wrap translate-y-16 lg:translate-y-24">
        <div
          data-reveal="scale"
          className="relative isolate overflow-hidden rounded-2xl text-white shadow-2xl shadow-black/30"
        >
          <img
            src={IMAGES.hausRear.src}
            alt=""
            loading="lazy"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(13_61_50/0.95)_0%,rgb(18_85_69/0.85)_45%,rgb(18_85_69/0.55)_100%)]"
          />
          <div className="p-8 sm:p-12 lg:p-14">
            <div>
              <Eyebrow dark>{CONSULTATION.eyebrow}</Eyebrow>
              <h2 data-reveal className={`${H2} mt-4`}>
                {CONSULTATION.title}
              </h2>
              <div className="mt-4 max-w-[34rem] space-y-3 text-base leading-relaxed text-white/90">
                {CONSULTATION.body.map((p) => (
                  <p key={p} data-reveal>
                    {p}
                  </p>
                ))}
              </div>
              <div data-reveal className="mt-8">
                <ConsultationButton tone="gold" />
              </div>
            </div>
          </div>
          <RefTag image={IMAGES.hausRear} className="bottom-4 right-4" />
        </div>
      </div>
    </section>
  );
}
