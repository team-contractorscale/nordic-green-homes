import { CTA, type RefImage } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { RefTag, imgProps } from "@/components/home/shared";
import {
  HEADING,
  Kicker,
  LineLink,
  RelatedLinks,
  ScrollProgress,
  SectionIndicator,
  SweepLink,
  HeroTitle,
} from "@/components/home/kit";

/* One home concept (Nordic Haus, Modern Belgian Farmhouse) — homepage design language and
 * motion. Order: full-bleed render hero → about the concept + credits card → render gallery →
 * the two planning sections side by side + CTAs → related pages.
 * Credits come from the client's concept attribution; the internal rights-hold note is never
 * rendered. Renders are concepts, never captioned as completed Nordic Green Homes builds.
 */

export type ConceptSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
  /** Closing line, set as a gold-rule note. */
  outro?: string;
};

export function ConceptPage({
  index,
  name,
  headline,
  intro,
  note,
  gallery,
  credits,
  sections,
}: {
  index: number;
  name: string;
  headline: string;
  intro: string;
  note: string;
  gallery: readonly RefImage[];
  credits: { label: string; value: string }[];
  sections: [ConceptSection, ConceptSection];
}) {
  const ref = useHomeMotion<HTMLDivElement>();
  const [cover, ...renders] = gallery as [RefImage, ...RefImage[]];
  const num = String(index).padStart(2, "0");

  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />

      {/* ---------- Hero: the concept's lead render, full bleed ---------- */}
      <section
        data-section={name}
        className="grain relative isolate overflow-hidden bg-overlay text-white"
      >
        <div data-anim="photo" className="absolute inset-0 -z-10 overflow-hidden">
          <div data-photo-inner className="absolute inset-x-0 -inset-y-[6%]">
            <img
              {...imgProps(cover, "100vw")}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <div aria-hidden className="absolute inset-0 bg-overlay/35" />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-overlay via-overlay/80 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-overlay/70 to-transparent"
          />
        </div>
        <RefTag image={cover} className="right-5 top-36 sm:right-8 lg:top-40" />

        <div className="wrap flex min-h-svh flex-col justify-end pb-16 pt-40 lg:pb-20">
          <div data-hero-copy className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p
                data-anim="fade"
                className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
              >
                <span aria-hidden className="h-px w-10 bg-gold" />
                Home concept {num}
              </p>
              <HeroTitle lines={[name]} max="6.5rem" className="mt-6" />
              <p
                data-anim="fade"
                className="mt-4 font-serif text-[clamp(1.375rem,1vw+1rem,2rem)] leading-snug text-gold"
              >
                {headline}
              </p>
            </div>
            <div
              data-anim="fade"
              className="flex flex-wrap items-center gap-x-8 gap-y-5 lg:col-span-5 lg:justify-end"
            >
              <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
              <LineLink to={CTA.call.to} dark>
                {CTA.call.label}
              </LineLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- About the concept + credits ---------- */}
      <section data-section="The concept" className="bg-background py-24 sm:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Kicker>The concept</Kicker>
            <p
              data-reveal
              className="mt-8 font-serif text-[clamp(1.5rem,1.4vw+1rem,2.375rem)] leading-[1.3] tracking-[-0.01em]"
            >
              {intro}
            </p>
            <p
              data-reveal
              className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {note}
            </p>
          </div>
          <aside
            data-reveal
            className="self-start bg-secondary p-8 lg:col-span-4 lg:col-start-9 lg:p-10"
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate">
              Concept attribution
            </p>
            <dl className="mt-6 divide-y divide-slate/20 border-y border-slate/20">
              <div className="py-4">
                <dt className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">
                  Concept
                </dt>
                <dd className="mt-1 font-serif text-xl">{name}</dd>
              </div>
              {credits.map((c) => (
                <div key={c.label} className="py-4">
                  <dt className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">
                    {c.label}
                  </dt>
                  <dd className="mt-1 font-serif text-xl">{c.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Not presented as a completed Nordic Green Homes build.
            </p>
          </aside>
        </div>
      </section>

      {/* ---------- Render gallery: equal frames ---------- */}
      <section data-section="Renders" className="bg-secondary py-20 sm:py-24">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6 border-b border-slate/20 pb-6">
            <Kicker>Concept renders</Kicker>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate">
              {String(gallery.length).padStart(2, "0")} images
            </span>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[cover, ...renders].map((img) => (
              <li key={img.src} className="group relative aspect-[4/3] overflow-hidden bg-muted">
                <div data-reveal-img className="absolute inset-0 overflow-hidden">
                  <img
                    {...imgProps(img, "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw")}
                    loading="lazy"
                    className="h-full w-full object-cover transition-[scale] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <RefTag image={img} className="left-3 top-3" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Planning: two sections side by side, then the CTAs ---------- */}
      <section data-section="Before you choose" className="bg-background py-24 sm:py-28">
        <div className="wrap">
          <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
            {sections.map((s, i) => (
              <article key={s.title} data-reveal className="bg-background p-8 sm:p-10 lg:p-14">
                <span className="text-xs font-bold tracking-[0.2em] text-gold">0{i + 1}</span>
                <h2 data-split className={`${HEADING} mt-4 !text-[clamp(2rem,2vw+1rem,3rem)]`}>
                  {s.title}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {s.list && (
                  <ol className="mt-6 divide-y divide-border border-y border-border">
                    {s.list.map((item, j) => (
                      <li key={item} className="flex items-baseline gap-4 py-3 text-base">
                        <span className="text-xs font-bold tracking-[0.2em] text-gold">
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                )}
                {s.outro && (
                  <p className="mt-8 border-l-2 border-gold pl-5 font-serif text-xl leading-snug">
                    {s.outro}
                  </p>
                )}
              </article>
            ))}
          </div>
          <div data-reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
            <LineLink to={CTA.call.to}>{CTA.call.label}</LineLink>
          </div>
        </div>
      </section>

      <RelatedLinks
        links={[
          { label: "All floorplans", to: "/floorplans" },
          { label: "Design and Interiors", to: "/services/design-and-interiors" },
          { label: "Estimate", to: "/estimate" },
          { label: "Discuss your project", to: "/contact" },
        ]}
      />
    </div>
  );
}
