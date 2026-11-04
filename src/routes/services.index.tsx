import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, IMAGES } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { RefTag, imgProps } from "@/components/home/shared";
import { ScrollProgress, HeroTitle, HeroBackdrop } from "@/components/home/kit";

/* Services overview — homepage design language, kept simple: a compact dark header, then the
 * five services as a card grid (three across, then two wider). Copy is the existing services
 * content (SERVICES); no new copy.
 */

const TITLE = "Services | Nordic Green Homes";
const DESCRIPTION = "Find the right starting point for your home";

const pad = (n: number) => String(n).padStart(2, "0");

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: IMAGES.nordicHaus.src },
      { name: "twitter:image", content: IMAGES.nordicHaus.src },
    ],
  }),
  component: ServicesOverviewPage,
});

function ServicesOverviewPage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <section className="grain relative isolate overflow-hidden bg-overlay pb-20 pt-36 text-white lg:pb-24 lg:pt-44">
        <HeroBackdrop image={IMAGES.nordicHaus} />
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              What we build
            </p>
            <HeroTitle
              lines={["Find the right", "starting point", "for your home."]}
              max="5.5rem"
              indent
              className="mt-7"
            />
          </div>
          <p
            data-anim="fade"
            className="text-xs font-bold uppercase tracking-[0.22em] text-white/60 lg:col-span-4 lg:text-right"
          >
            {pad(SERVICES.length)} services
          </p>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <ul className="wrap grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {SERVICES.map((s, i) => (
            <li key={s.key} data-reveal className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
              <Link to={s.to} className="group flex h-full flex-col">
                <div
                  data-reveal-img
                  className={`relative overflow-hidden ${i < 3 ? "aspect-[4/5]" : "aspect-[16/10]"}`}
                >
                  <img
                    {...imgProps(
                      s.image,
                      "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw",
                    )}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-[scale] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden
                    className="absolute left-3 top-3 size-4 border-l border-t border-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-3 right-3 size-4 border-b border-r border-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <RefTag image={s.image} className="right-3 top-3" />
                </div>
                <span className="mt-6 text-xs font-bold tracking-[0.2em] text-gold">
                  {pad(i + 1)}
                </span>
                <h2 className="mt-2 font-serif text-[clamp(1.75rem,1.2vw+1rem,2.25rem)] leading-tight">
                  <span className="relative">
                    {s.title}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </span>
                </h2>
                <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {s.cta}
                  <span className="grid size-9 place-items-center border border-border transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
