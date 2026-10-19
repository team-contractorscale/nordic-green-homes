/**
 * ValuesMarquee — a thin dark strip of the brand's values, scrolling slowly.
 *
 * Decorative motion that reinforces the philosophy without claiming anything.
 * The animation lives in src/styles.css (.marquee-track) and is killed by the
 * global prefers-reduced-motion rule, so this is SSR-safe and zero-JS.
 */
const VALUES = [
  "Sustainability",
  "Family",
  "Bespoke Luxury",
  "Faith & Integrity",
  "Crafted Comfort",
  "Considered Design",
] as const;

export function ValuesMarquee() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-white/10 bg-brand-dark py-4 text-white/70"
    >
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap pr-8">
        {[...VALUES, ...VALUES].map((v, i) => (
          <span key={i} className="flex items-center gap-8 font-serif text-lg tracking-wide">
            {v}
            <span className="size-1.5 rounded-full bg-gold/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
