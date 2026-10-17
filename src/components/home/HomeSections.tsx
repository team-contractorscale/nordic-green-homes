import { Link } from "@tanstack/react-router";
import {
  BRAND,
  ASSETS,
  SERVICES,
  FOUR_PILLARS,
  PROCESS_STEPS,
  PROJECTS_GALLERY,
  SOURCE_TESTIMONIALS,
} from "@/lib/content-data";
import {
  Calendar,
  Phone,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Download,
  Star,
  ChevronRight,
  Leaf,
  Home as HomeIcon,
} from "lucide-react";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HomeHeroSection() {
  const [activeHeroIdx, setActiveHeroIdx] = React.useState(0);
  const heroImages = React.useMemo(
    () => [
      {
        src: ASSETS.hero3,
        title: "Architectural Net-Zero Residence",
        thumbLabel: "Custom Home",
      },
      {
        src: ASSETS.hero2,
        title: "Modern Timber & Stone Design",
        thumbLabel: "Exterior Architecture",
      },
      {
        src: ASSETS.hero1,
        title: "High-Performance Modern Living",
        thumbLabel: "Landscape & Living",
      },
      {
        src: ASSETS.heroInterior,
        title: "Curated Interior Craftsmanship",
        thumbLabel: "Interior Living",
      },
    ],
    [],
  );

  const currentHero = heroImages[activeHeroIdx] || heroImages[0]!;

  return (
    <section className="relative bg-brand-dark text-white overflow-hidden min-h-[620px] lg:min-h-[720px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src={currentHero.src}
          alt={currentHero.title}
          className="w-full h-full object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-r from-brand-dark/95 via-brand-dark/85 to-brand-dark/50" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wider uppercase border border-emerald-400/30">
              <Leaf className="w-3.5 h-3.5" />
              <span>Net-Zero Home Builder & Renovator</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              O'Brien Contracting: Net-Zero Home Builder In Fraser Valley, BC
            </h1>

            <p className="text-lg sm:text-xl text-white/90 font-light leading-relaxed max-w-2xl">
              {BRAND.headline}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm sm:text-base shadow-lg hover:bg-primary/90 transition-all focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span>FREE CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={BRAND.phoneTel}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium text-sm sm:text-base border border-white/20 backdrop-blur-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>CALL US {BRAND.phoneFormatted}</span>
              </a>
            </div>

            <div className="pt-6 border-t border-white/15">
              <div className="p-4 sm:p-5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 backdrop-blur-xs max-w-2xl">
                <div className="flex items-center gap-2 text-emerald-300 text-sm font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Green Mastery Assurance</span>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-white/80 leading-relaxed">
                  We ensure that your project not only meets but exceeds sustainable building
                  standards, including Net-Zero goals. Our commitment to green building practices
                  means you can trust us to deliver a home that's as kind to the planet as it is to
                  you and your family.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-wider text-white/70 font-semibold flex items-center justify-between">
              <span>Gallery Highlights</span>
              <span className="text-emerald-400 font-mono text-[11px]">
                {activeHeroIdx + 1} / {heroImages.length}
              </span>
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {heroImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveHeroIdx(idx)}
                  className={`group relative h-20 sm:h-24 lg:h-20 rounded-lg overflow-hidden border-2 transition-all text-left flex items-center ${
                    activeHeroIdx === idx
                      ? "border-emerald-400 ring-2 ring-emerald-400/50 scale-[1.01]"
                      : "border-white/20 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-1.5 left-2 right-2">
                    <p className="text-[11px] font-medium text-white truncate">{img.thumbLabel}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeConsultationStrip() {
  return (
    <section className="bg-brand-dark text-white border-y border-white/10 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="flex items-center justify-center md:justify-start gap-4 pb-4 md:pb-0 md:pr-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-white">
                Book A Consultation
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-0.5">
                Let's discuss your project and see how it can be brought to life
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 py-4 md:py-0 md:px-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-white">
                Call Us Today
              </h3>
              <a
                href={BRAND.phoneTel}
                className="text-xs sm:text-sm text-emerald-300 hover:underline font-mono mt-0.5 block"
              >
                {BRAND.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-white">
                Monday - Friday
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-0.5">{BRAND.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeBadgesSection() {
  const badges = [
    { src: ASSETS.renoMarkLogo, alt: "RenoMark Renovators Mark of Excellence" },
    { src: ASSETS.badgeImage45, alt: "Net-Zero Certified Builder Training" },
    { src: ASSETS.badgeImage46, alt: "2-5-10 Year Home Warranty Protection" },
    { src: ASSETS.badgeImage47, alt: "RenovationFind Certified Member" },
    { src: ASSETS.abbotsfordVotesWinner, alt: "Abbotsford Community Votes Winner" },
  ];

  return (
    <section className="bg-white dark:bg-card py-8 sm:py-10 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 sm:gap-8">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-85 hover:opacity-100"
            >
              <img
                src={badge.src}
                alt={badge.alt}
                className="h-10 sm:h-12 md:h-14 w-auto object-contain max-w-[140px]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeServicesGrid() {
  const serviceItems = [
    {
      title: "Custom Home Design",
      desc: "Want a new home? We build it just how you dream it—on budget and on time.",
      image: ASSETS.newBuild,
      link: "/services/new-builds",
    },
    {
      title: "Home Renovation",
      desc: "Time for a change? We renovate kitchens, bathrooms, or entire houses to make them feel new again.",
      image: ASSETS.houseRenovation,
      link: "/services/home-renovations",
    },
    {
      title: "Custom Garage Builds",
      desc: "Want the perfect home for your cars or a new functional space? We build custom garages that fit your needs.",
      image: ASSETS.houseOfCars,
      link: "/services",
    },
    {
      title: "Backyard Upgrades",
      desc: "Planning to enhance your outdoor space? We specialise in upgrades like fences, decks, patios, and sheds.",
      image: ASSETS.backyard,
      link: "/services",
    },
    {
      title: "Custom Pool Bars",
      desc: "Outdoor entertainment pavilions and bespoke pool bars designed for seamless summer hospitality.",
      image: ASSETS.customPoolBar,
      link: "/services",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            What We Do
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            We Build What Moves Your Soul
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            We manage every detail of your journey—from initial concept and site feasibility to
            final handover—ensuring a seamless process and an exceptional result.
          </p>
        </div>

        {/* 3-Column Grid Slider */}
        <div className="relative px-2 sm:px-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {serviceItems.map((item, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-4 sm:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-card rounded-xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                    <div className="relative aspect-4/3 overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-border">
                        <Link
                          to={item.link}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                        >
                          <span>Read More</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:flex">
              <CarouselPrevious className="-left-4 sm:-left-6 bg-card border-border shadow-md" />
              <CarouselNext className="-right-4 sm:-right-6 bg-card border-border shadow-md" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
