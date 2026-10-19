import { createFileRoute } from "@tanstack/react-router";
import { BRAND, ASSETS, FOUR_PILLARS } from "@/lib/content-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, Info } from "lucide-react";
import { Placeholder } from "@/components/home/NordicHome";
import { PLACEHOLDER } from "@/lib/home-content";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us | Nordic Green Homes" },
      {
        name: "description",
        content:
          "Nordic Green Homes is a new entity, building alongside Nordic Green Design. About the team, approach and pending details for the internal pilot.",
      },
      { property: "og:title", content: "About Us | Nordic Green Homes" },
      {
        property: "og:description",
        content:
          "Nordic Green Homes is a new entity building alongside Nordic Green Design. Internal pilot — details pending.",
      },
      { property: "og:image", content: ASSETS.family },
      { name: "twitter:image", content: ASSETS.family },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <PageHeader
        image={ASSETS.family}
        imageAlt="Lane and Kylie O'Brien with their family outside their British Columbia home (reference image)"
        eyebrow="About Us · Internal pilot"
        title="Building Legacies, Grounded in Stewardship"
        description="Nordic Green Homes is a new entity, building alongside Nordic Green Design. The team, legal entity and contact details below are pending confirmation."
      />

      {/* Origin Story & Free Guide */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Guide Card Preview — pending recovery & rebrand */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="bg-card border border-dashed border-gold bg-gold/5 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center">
                <div className="mb-4 w-full">
                  <Placeholder>{PLACEHOLDER.guide}</Placeholder>
                </div>
                <div className="flex aspect-[3/4] w-44 items-center justify-center rounded-md bg-muted border border-border text-center">
                  <span className="px-4 text-xs text-muted-foreground">Cover pending</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mt-5">
                  Future-Proofing Your Home
                </h3>
                <p className="text-xs text-muted-foreground mt-2 max-w-sm">
                  The revised guide was supplied in January. The file is being recovered, inspected,
                  rebranded and confirmed for delivery and attribution before the download is
                  re-enabled.
                </p>
                <button
                  type="button"
                  disabled
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-muted text-muted-foreground text-xs sm:text-sm font-medium border border-dashed border-gold cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  <span>Download — pending rebrand</span>
                </button>
              </div>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Our Journey
              </span>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-foreground">
                A new home-building entity
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground text-base leading-relaxed">
                <p>
                  Our journey began with a simple belief: that building homes could be done
                  differently — better for our families, our community, and our planet. Nordic Green
                  Homes brings together careful building practice and considered design for families
                  planning their forever home.
                </p>
                <p>
                  We design and build homes that aim to be energy-efficient and environmentally
                  thoughtful; quiet, comfortable, light-filled spaces designed for everyday family
                  life.
                </p>
                <p>
                  We understand that starting a construction project is a milestone life step.
                  That's why we prioritise clear communication and transparency from the outset,
                  with a process designed to be straightforward and stress-free.
                </p>
              </div>

              {/* Relationship wording — narrowed per client confirmation */}
              <div className="mt-8 border-l-2 border-gold pl-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Who we are
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Nordic Green Homes is a new entity. Nordic Green Design operates separately
                  alongside it, and Nordic Green Homes is the master brand. O'Brien Contracting Ltd.
                  remains open during the transition. The exact public and legal wording is pending.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Placeholder>{PLACEHOLDER.relationship}</Placeholder>
                  <Placeholder>{PLACEHOLDER.legalEntity}</Placeholder>
                </div>
              </div>

              {/* Credentials & badges — held pending confirmation */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  <Info className="w-4 h-4" />
                  <span>Credentials &amp; badges — pending</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  RenoMark, Abbotsford Votes, As Seen On, Red Seal, WorkSafeBC, licensing and
                  warranty wording are not approved Nordic Green Homes claims yet and are not
                  displayed here.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Placeholder>{PLACEHOLDER.assurance}</Placeholder>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lane & Kylie Biographies */}
      <section className="py-16 md:py-24 bg-muted/40 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Leadership & Design
            </span>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Meet Lane & Kylie O'Brien
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Husband and wife partners dedicated to healthy, long-lasting homes for British
              Columbia families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Lane */}
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-xs flex flex-col">
              <div className="aspect-4/3 overflow-hidden bg-muted">
                <img
                  src={ASSETS.lanePortrait}
                  alt="Lane O'Brien (reference image — pending approval)"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">Lane O'Brien</h3>
                  <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase block mt-1">
                    Founder &amp; builder
                  </span>
                  <div className="mt-4 text-base text-muted-foreground space-y-3 leading-relaxed">
                    <p>
                      A Saskatchewan prairie boy who found his true home in British Columbia. Lane
                      builds with a focus on careful, high-performance construction practice.
                    </p>
                    <p>
                      After years working with conventional construction companies, Lane grew
                      frustrated by the volume of construction waste and lack of envelope
                      performance in standard homes. He set out to build better homes that stand up
                      to BC's climate.
                    </p>
                    <p>
                      A loving father of three and devoted husband, he stays close to the local
                      building community and keeps building-practice standards front of mind across
                      projects.
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Placeholder>{PLACEHOLDER.legalEntity}</Placeholder>
                    <Placeholder>{PLACEHOLDER.assurance}</Placeholder>
                  </div>
                </div>
              </div>
            </div>

            {/* Kylie */}
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-xs flex flex-col">
              <div className="aspect-4/3 overflow-hidden bg-muted">
                <img
                  src={ASSETS.kyliePortrait}
                  alt="Kylie O'Brien (reference image — pending approval)"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">Kylie O'Brien</h3>
                  <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase block mt-1">
                    Interior design partner · Nordic Green Design
                  </span>
                  <div className="mt-4 text-base text-muted-foreground space-y-3 leading-relaxed">
                    <p>
                      A BC native who partnered with Lane in life and in business. With a previous
                      background in law, Kylie shifted to her creative calling in interior design.
                    </p>
                    <p>
                      Kylie leads design work through Nordic Green Design, a separate entity that
                      operates alongside Nordic Green Homes. She is drawn to eco-friendly, non-toxic
                      materials, tactile timber selections, and serene Scandinavian aesthetics that
                      feel warm and inviting.
                    </p>
                    <p>
                      Lane and Kylie collaborate on new home and renovation projects, so structural
                      building practice and interior elegance can blend together.
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Placeholder>{PLACEHOLDER.relationship}</Placeholder>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars Deep Dive */}
      <section className="py-16 md:py-24 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Core Principles
            </span>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Our Four Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FOUR_PILLARS.map((p, i) => (
              <div key={i} className="p-8 rounded-xl bg-card border border-border shadow-2xs">
                <h3 className="font-serif text-xl font-bold text-foreground">{p.title}</h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium text-sm shadow hover:bg-primary/90 transition-all"
            >
              <span>{BRAND.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
