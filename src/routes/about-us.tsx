import { createFileRoute } from "@tanstack/react-router";
import { BRAND, ASSETS, FOUR_PILLARS } from "@/lib/content-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, Award, Shield, Heart, Sparkles, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us | Nordic Green Homes & O'Brien Contracting" },
      {
        name: "description",
        content:
          "Meet Lane & Kylie O'Brien. Net-Zero trained builder and interior design partners crafting sustainable, family-oriented homes in Fraser Valley, Kelowna & Victoria, BC.",
      },
      { property: "og:title", content: "About Us | Nordic Green Homes & O'Brien Contracting" },
      {
        property: "og:description",
        content:
          "Founded on the principles of sustainability, family, and luxury. Craftsmanship rooted in integrity.",
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
        imageAlt="Lane and Kylie O'Brien with their family outside their British Columbia home"
        eyebrow="About Our Family & Mission"
        title="Building Legacies, Grounded in Stewardship"
        description="Welcome to Nordic Green Homes, a vision brought to life by Lane and Kylie O'Brien. Founded on the principles of sustainability, family, and bespoke luxury."
      />

      {/* Origin Story & Free Guide */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Guide Card Preview */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center">
                <img
                  src={ASSETS.futureProofingGuide}
                  alt="Future-Proofing Your Home Guide cover"
                  className="w-48 sm:w-56 h-auto object-contain rounded-md shadow-md mb-6"
                />
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Free Homeowner's Guide
                </h3>
                <p className="text-xs text-muted-foreground mt-2 max-w-sm">
                  Inside: how smart technology, renewable energy, healthy indoor air, and resilient
                  assemblies future-proof your family home.
                </p>
                <a
                  href={BRAND.freePdfGuideUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-xs sm:text-sm font-medium shadow hover:bg-primary/90 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free PDF Guide</span>
                </a>
              </div>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Our Journey
              </span>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-foreground">
                Trusted Net-Zero Home Builder & Renovator
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground text-base leading-relaxed">
                <p>
                  Our journey began with a simple belief: that building homes could be done
                  differently—better for our families, our community, and our planet. With Lane's
                  expertise as a Net-Zero trained builder and Red Seal carpenter, and Kylie's flair
                  for interior design through Nordic Green Design, we've created a unique approach
                  that blends sustainable building science with luxurious finishes.
                </p>
                <p>
                  Our homes are not only energy-efficient and environmentally responsible; they are
                  quiet, comfortable, light-filled spaces designed for everyday family life.
                </p>
                <p>
                  We understand that starting a construction project is a milestone life step.
                  That's why we prioritize clear communication and transparency from the get-go. Our
                  process is designed to be straightforward and stress-free.
                </p>
              </div>

              {/* Verified Badges Row */}
              <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center gap-6">
                <img
                  src={ASSETS.renoMarkLogo}
                  alt="RenoMark Member"
                  className="h-10 w-auto object-contain"
                />
                <img
                  src={ASSETS.abbotsfordVotesWinner}
                  alt="Abbotsford Votes 2023 Winner"
                  className="h-10 w-auto object-contain"
                />
                <img
                  src={ASSETS.asSeenOnLogo}
                  alt="As Seen On"
                  className="h-8 w-auto object-contain opacity-80"
                />
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
                  alt="Lane O'Brien - Net-Zero Builder & Red Seal Journeyman Carpenter"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">Lane O'Brien</h3>
                  <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase block mt-1">
                    Founder, Net-Zero Trained Builder & Red Seal Carpenter
                  </span>
                  <div className="mt-4 text-base text-muted-foreground space-y-3 leading-relaxed">
                    <p>
                      A Saskatchewan prairie boy who found his true home in British Columbia! Lane
                      is a Net-Zero trained builder with a solid foundation as a Red Seal Journeyman
                      Carpenter.
                    </p>
                    <p>
                      After years working with conventional construction companies, Lane grew
                      frustrated by the volume of construction waste and lack of envelope
                      performance in standard homes. He launched his own company to build better,
                      high-performance homes that stand up to BC's climate.
                    </p>
                    <p>
                      A loving father of three and devoted husband, he is deeply active in the local
                      builders association and continually advances building science standards
                      across our projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kylie */}
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-xs flex flex-col">
              <div className="aspect-4/3 overflow-hidden bg-muted">
                <img
                  src={ASSETS.kyliePortrait}
                  alt="Kylie O'Brien - Interior Designer & Partner"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">Kylie O'Brien</h3>
                  <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase block mt-1">
                    Interior Design Partner | Founder of Nordic Green Design
                  </span>
                  <div className="mt-4 text-base text-muted-foreground space-y-3 leading-relaxed">
                    <p>
                      A BC native who partnered with Lane in life and in business! With a previous
                      background in law, Kylie shifted to her creative calling in interior design,
                      earning certification through the Interior Design Institute.
                    </p>
                    <p>
                      Kylie directs our design partner firm, Nordic Green Design. She is passionate
                      about eco-friendly, non-toxic materials, tactile timber selections, and serene
                      Scandinavian aesthetics that feel warm and inviting.
                    </p>
                    <p>
                      Lane and Kylie collaborate on all new home and renovation projects, ensuring
                      that structural building envelope science and interior elegance blend
                      seamlessly.
                    </p>
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
