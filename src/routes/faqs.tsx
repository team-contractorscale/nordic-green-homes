import { createFileRoute } from "@tanstack/react-router";
import { BRAND, FAQS, ASSETS } from "@/lib/content-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Link } from "@tanstack/react-router";
import { ArrowRight, HelpCircle } from "lucide-react";
import * as React from "react";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Nordic Green Homes" },
      {
        name: "description",
        content:
          "Answers to common questions about Net-Zero custom home building, energy codes, remodeling, permits, and timelines in Fraser Valley and BC.",
      },
      { property: "og:title", content: "Frequently Asked Questions | Nordic Green Homes" },
      {
        property: "og:description",
        content:
          "Clear answers on Net-Zero standards, building process, budget transparency, and service areas.",
      },
      { property: "og:image", content: ASSETS.hero2 },
      { name: "twitter:image", content: ASSETS.hero2 },
    ],
  }),
  component: FaqsPage,
});

function FaqsPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div>
      <PageHeader
        image={ASSETS.heroInterior}
        imageAlt="Bright, sustainable interior of a Nordic Green home with timber detailing"
        eyebrow="Got Questions?"
        title="Frequently Asked Questions"
        description="Building or renovating a home is a significant investment. Here are answers to common questions about our building science, process, and working together."
      />

      {/* Accordion FAQ list */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-lg overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-serif text-lg font-semibold text-foreground hover:bg-muted/30 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <span className="text-xl font-mono text-muted-foreground shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center bg-muted/40 p-8 rounded-xl border border-border">
            <h3 className="font-serif text-xl font-bold text-foreground">
              Have a question not covered here?
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              We're happy to walk through your specific lot, building permits, or architectural
              ideas.
            </p>
            <div className="mt-5">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium shadow hover:bg-primary/90 transition-all"
              >
                <span>{BRAND.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
