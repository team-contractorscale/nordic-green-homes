import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

// INTERNAL authoring template — noindex, and deliberately absent from nav, footer and sitemap.

const BRIEF = [
  "Working title:",
  "Route: /resources/[article]/",
  "Primary homeowner question:",
  "Audience and project stage:",
  "One next action:",
];

const STRUCTURE = [
  "A direct answer to the homeowner’s question.",
  "The context they need before making a decision.",
  "The property, scope or technical factors that can change the answer.",
  "Practical questions to ask a project team.",
  "FAQs where they remove a real point of confusion.",
  "One approved call to action.",
];

const QA = [
  "One H1 and a clear search intent.",
  "Accurate, current claims with a traceable source.",
  "BC terminology, spelling and jurisdiction.",
  "No unsupported client claims or cross-client details.",
  "Working internal and external links.",
  "Approved images, captions and reuse rights.",
  "Correct canonical, metadata and one clear CTA.",
  "No retired routes or untested form promises.",
];

export const Route = createFileRoute("/resources/article-template")({
  head: () => ({
    meta: [
      { title: "Resource Article Template (Internal) | Nordic Green Homes" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ArticleTemplatePage,
});

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-foreground">{title}</h2>
      <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-foreground">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
          {i}
        </li>
      ))}
    </ul>
  );
}

function ArticleTemplatePage() {
  return (
    <div className="bg-secondary/50 pb-24 pt-36 sm:pt-44">
      <div className="wrap max-w-3xl">
        <p className="rounded-lg border-2 border-dashed border-gold bg-gold/10 p-4 text-sm font-bold text-foreground">
          INTERNAL TEMPLATE: Keep this page private and out of navigation. Supply and verify the
          topic, source, claims, author, links, assets, CTA and publication details article by
          article.
        </p>

        <h1 className="mt-10 font-serif text-[clamp(2rem,2vw+1rem,3rem)] leading-tight text-foreground">
          Nordic Green Homes: Resource Article Template
        </h1>

        <div className="mt-12 space-y-12 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <Part title="Article brief">
            <dl className="divide-y divide-border border-y border-border">
              {BRIEF.map((b) => (
                <div key={b} className="py-3 font-bold text-foreground">
                  {b}
                </div>
              ))}
            </dl>
          </Part>

          <Part title="Write for the homeowner">
            <p>
              Start with the question the reader is trying to answer. Explain the decision in plain
              language, show which parts depend on the property or project, and give the reader one
              useful next step.
            </p>
            <p>
              Use one clear H1. Keep the article focused on the reader&rsquo;s decision rather than
              the company&rsquo;s process.
            </p>
          </Part>

          <Part title="Recommended structure">
            <Checklist items={STRUCTURE} />
          </Part>

          <Part title="Evidence and localisation">
            <p>
              Use current BC sources and name the source where the claim needs checking. Do not
              transfer Australian prices, locations, suppliers, timelines or performance claims. Do
              not transfer Blaise, O&rsquo;Brien or Nordic Green Design identity or claims without
              individual evidence.
            </p>
          </Part>

          <Part title="Article QA">
            <Checklist items={QA} />
          </Part>

          <Part title="Internal research and approval notes">
            <p>
              This page is an internal authoring template. Keep it private, noindex and out of
              navigation. The topic, keyword, source ledger, technical reviewer, claims, images,
              author, links, CTA and publication details must be approved for each article.
            </p>
          </Part>
        </div>
      </div>
    </div>
  );
}
