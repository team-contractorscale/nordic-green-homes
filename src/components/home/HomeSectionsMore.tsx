import { Link } from "@tanstack/react-router";
import {
  BRAND,
  ASSETS,
  FOUR_PILLARS,
  PROCESS_STEPS,
  PROJECTS_GALLERY,
  SOURCE_TESTIMONIALS,
} from "@/lib/content-data";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Download,
  Star,
  ChevronRight,
  Leaf,
  Home as HomeIcon,
  Phone,
} from "lucide-react";

export function HomeExpertsSection() {
  return (
    <section className="bg-brand-dark text-white py-16 md:py-24 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Experts In Custom Home Design For Fraser Valley And Surrounding Areas
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src={ASSETS.family}
                alt="Lane and Kylie O'Brien and Family"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
              At O'Brien Contracting, we bring your vision to life with disciplined craftsmanship
              and a sustainability-first approach. Led by Lane O'Brien, our team works closely with
              you to plan and build a high-performance home that fits your lifestyle and long-term
              goals. From innovative floor plans to unique architectural details, we ensure every
              aspect of your custom home in Fraser Valley is thoughtfully crafted.
            </p>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed">
              Our design process combines creativity with practicality, let's turn your dream home
              into your next home. Whether custom build or major renovation, let's turn your ideas
              into a home built to last.
            </p>

            <div className="pt-2">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors shadow-md"
              >
                <span>About O'Brien Contracting</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeTrustedPartnerSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Trusted Partnership
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Trusted Net-Zero Home Builder and Renovator in Fraser Valley, Kelowna & Victoria BC
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Welcome to O'Brien Contracting, a vision brought to life by Lane O'Brien. Founded on
              the principles of sustainability, family, and luxury, we're not just a construction
              company; we're your partners in building a future. Since our inception, we've
              dedicated ourselves to building homes that stand at the intersection of eco-friendly
              innovation and bespoke luxury.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              If you're looking for a trusted partner for your project, connect with O'Brien
              Contracting. We ensure a seamless, worry-free construction experience.{" "}
              <Link to="/contact" className="text-primary font-semibold hover:underline">
                Book a free consultation with O'Brien Contracting
              </Link>{" "}
              to discuss your project and next steps.
            </p>

            <div className="pt-2">
              <div className="font-serif text-lg font-bold text-foreground">
                Lane & Kylie O'Brien
              </div>
              <div className="text-xs text-muted-foreground">Director | O'Brien Contracting</div>
            </div>

            <div className="pt-6 border-t border-border">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-3">
                As Seen On
              </span>
              <img
                src={ASSETS.asSeenOnLogo}
                alt="Featured in As Seen On publications"
                className="h-10 w-auto object-contain opacity-85"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl">
              <img
                src={ASSETS.lane}
                alt="Lane and Kylie O'Brien Directors"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeFourPillarsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Built On Four Pillars
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            At O'Brien Contracting, everything we do is rooted in four core principles that guide
            every decision, every design, and every build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FOUR_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-card rounded-xl border border-border p-6 shadow-2xs hover:shadow-sm transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {idx === 0 && <Leaf className="w-5 h-5" />}
                  {idx === 1 && <HomeIcon className="w-5 h-5" />}
                  {idx === 2 && <Sparkles className="w-5 h-5" />}
                  {idx === 3 && <ShieldCheck className="w-5 h-5" />}
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground">{pillar.title}</h3>
                <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {pillar.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeDesignPartnerBanner() {
  return (
    <section className="relative bg-brand-dark text-white py-16 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src={ASSETS.hero3}
          alt="Interior design textures"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <img
          src={ASSETS.logoTransparentWhite}
          alt="Nordic Green Design Logo"
          className="h-16 w-auto mx-auto object-contain"
        />
        <h2 className="font-serif text-2xl sm:text-3xl font-bold">
          Check out our interior design partner, Nordic Green Design!
        </h2>
        <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
          Just like us, Nordic is passionate about green design & using sustainable materials in all
          of their projects!
        </p>
        <div className="pt-2">
          <Link
            to="/about-us"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-brand-dark hover:bg-white/90 font-semibold text-sm transition-colors shadow-md"
          >
            <span>Design with us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomeProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            How We Work
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Building With Certainty: Our Straight-Forward Approach
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            At O'Brien Contracting, we work closely with you and your architect or building designer
            to ensure your dreams and ideas are brought to life. Unlike some builders who pass you
            off to other staff, you'll work directly with Lane through every step of our proven
            process:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-card rounded-xl border border-border p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-full bg-emerald-950/10 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold flex items-center justify-center mb-3">
                  0{step.step}
                </div>
                <h3 className="font-serif text-base font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-5">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center max-w-xl mx-auto">
          <p className="text-xs text-muted-foreground mb-4">
            Our systematic approach eliminates guesswork and stress from your building experience.
            Every step protects your investment while delivering the quality your family deserves.
          </p>
          <Link
            to="/process"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <span>Explore full 8-step breakdown</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomeEbookSection() {
  return (
    <section className="bg-brand-dark text-white py-16 md:py-20 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Let's Get Your Dream Started
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              Simple Changes To A Greener Home
            </h2>

            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold block">
                Inside This Guide You'll Discover
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    How to integrate smart technology that adapts to your lifestyle and reduces
                    energy costs
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Renewable energy solutions including solar, geothermal, and energy storage
                    systems
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Water conservation strategies that minimize waste and lower utility bills
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Flexible design approaches that allow your home to evolve as your family grows
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Resilient materials and infrastructure upgrades for long-term durability
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Real case studies showing how homes adapt to different climates and lifestyles
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <a
                href={BRAND.freePdfGuideUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Free E-Book Guide</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-xs sm:max-w-sm rounded-xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src={ASSETS.ebookCover}
                alt="Simple Changes to a Greener Home E-Book"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeReviewsAndPortfolioSection() {
  return (
    <>
      {/* Reviews */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-border shadow-md">
                <img
                  src={PROJECTS_GALLERY[0]?.image ?? ASSETS.hero2}
                  alt="Completed home renovation project"
                  className="w-full h-full object-cover aspect-4/5"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Client Reviews
                </span>
                <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground uppercase">
                  Don't Take Our Word For It
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    Verified Google Reviews for O'Brien Contracting Ltd.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SOURCE_TESTIMONIALS.slice(0, 4).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-lg bg-card border border-border shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex text-amber-500 mb-2">
                        {[...Array(item.stars)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed italic line-clamp-5">
                        "{item.text}"
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">{item.name}</span>
                      <span className="text-[11px] text-muted-foreground">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Home Projects */}
      <section className="py-16 md:py-24 bg-muted/40 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Latest Portfolio
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              See Some Our Signature Home Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS_GALLERY.slice(0, 6).map((proj) => (
              <div
                key={proj.id}
                className="bg-card rounded-xl border border-border overflow-hidden shadow-2xs group flex flex-col"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-muted">
                  <img
                    src={proj.image}
                    alt={proj.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-brand-dark/80 backdrop-blur-xs text-[11px] font-medium text-white">
                    {proj.type}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-base font-bold text-foreground line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>{proj.location}</span>
                    <span className="text-emerald-700 font-medium">Verified Project</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-card border border-input hover:bg-muted text-foreground font-semibold text-sm transition-colors shadow-xs"
            >
              <span>View Full Projects Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final Consultation Strip */}
      <section className="bg-brand-dark text-white py-16 md:py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Complimentary Consultation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Ready to Build What Moves Your Soul?
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            Book a complimentary 15-minute discovery call directly with Lane O'Brien to discuss site
            feasibility, Net-Zero performance, and design possibilities.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm shadow-lg hover:bg-primary/90 transition-all"
            >
              <span>{BRAND.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={BRAND.phoneTel}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white/10 text-white font-medium text-sm border border-white/20 hover:bg-white/20 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{BRAND.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
