import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { Eyebrow, RefTag } from "./Hero";
import { SERVICES, type RefImage } from "@/lib/home-content";

const SERVICE_HREF: Record<(typeof SERVICES)[number]["key"], string> = {
  newBuilds: "/services/new-builds",
  customHomes: "/services/new-builds",
  renovations: "/services/home-renovations",
};

export function ServicesSection() {
  return (
    <section data-anim="services" className="relative bg-primary text-white">
      {/* Desktop pinned horizontal panel */}
      <div className="hidden lg:block">
        <div className="wrap py-24">
          <div className="max-w-2xl">
            <Eyebrow tone="light">What we build</Eyebrow>
            <h2
              data-anim="reveal"
              className="mt-5 font-serif text-[clamp(2.2rem,3vw+1rem,3.4rem)] leading-[1.05] tracking-[-0.02em]"
            >
              Three ways we build
              <span className="text-gold"> your forever home.</span>
            </h2>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div
            data-services-track
            className="flex gap-8 px-[max(1.5rem,calc((100vw-1400px)/2+2rem))] pb-24"
          >
            {SERVICES.map((s) => {
              const img: RefImage = s.image;
              return (
                <Link
                  key={s.key}
                  to={SERVICE_HREF[s.key]}
                  className="group relative flex h-[60vh] min-w-[min(78vw,46rem)] shrink-0 overflow-hidden rounded-md"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[9000ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <h3 className="font-serif text-3xl">{s.title}</h3>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-white/85">
                      {s.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold">
                      Explore {s.title.toLowerCase()} <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <RefTag image={img} className="right-4 top-4" />
                </Link>
              );
            })}
            <div className="flex min-w-[min(50vw,22rem)] shrink-0 items-center">
              <div className="max-w-sm">
                <p className="font-serif text-2xl text-white/90">
                  Every project starts with listening.
                </p>
                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center gap-2 text-base font-bold text-gold underline underline-offset-4"
                >
                  See all services <MoveRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stacked */}
      <div className="lg:hidden">
        <div className="wrap py-20">
          <Eyebrow tone="light">What we build</Eyebrow>
          <h2
            data-anim="reveal"
            className="mt-5 font-serif text-[clamp(2rem,2.5vw+1rem,3rem)] leading-[1.06] tracking-[-0.02em]"
          >
            Three ways we build
            <span className="text-gold"> your forever home.</span>
          </h2>
          <div className="mt-10 grid gap-6">
            {SERVICES.map((s) => {
              const img: RefImage = s.image;
              return (
                <Link
                  key={s.key}
                  to={SERVICE_HREF[s.key]}
                  className="group relative overflow-hidden rounded-md"
                >
                  <div className="relative">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
                    />
                    <RefTag image={img} className="right-3 top-3" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-serif text-2xl">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/85">{s.body}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-base font-bold text-gold underline underline-offset-4"
            >
              See all services <MoveRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
