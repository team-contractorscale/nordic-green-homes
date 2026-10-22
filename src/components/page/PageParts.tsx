import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";
import { Eyebrow, H2, HomeConsultation, RefImg } from "@/components/home/NordicHome";
import { PageHeader } from "@/components/layout/PageHeader";
import type { RefImage } from "@/lib/home-content";

/* Shared blocks for the inner content pages (About section, service and floorplan pages). */

type Item = { title: string; body: string };
type RelatedTo = NonNullable<LinkProps["to"]>;

export const RELATED = {
  about: { label: "About Nordic Green Homes", to: "/about-us" },
  why: { label: "Why Choose Us", to: "/about-us/why-choose-us" },
  guarantee: { label: "What to check before you sign", to: "/about-us/our-guarantee" },
  contact: { label: "Discuss your project", to: "/contact" },
} as const satisfies Record<string, { label: string; to: RelatedTo }>;

// Large serif lead on the left, eyebrowed body copy on the right.
export function SplitIntro({
  lead,
  eyebrow,
  paragraphs,
  tinted = false,
}: {
  lead: string;
  eyebrow?: string;
  paragraphs: string[];
  tinted?: boolean;
}) {
  return (
    <section className={`py-24 sm:py-28 ${tinted ? "bg-secondary/50" : ""}`}>
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
        <p className="font-serif text-[clamp(1.5rem,1.2vw+1rem,2rem)] leading-snug text-foreground">
          {lead}
        </p>
        <div>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <div
            className={`${eyebrow ? "mt-6" : ""} space-y-4 text-base leading-relaxed text-muted-foreground`}
          >
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CardSection({
  eyebrow,
  title,
  items,
  tinted = false,
  note,
}: {
  eyebrow?: string;
  title?: string;
  items: Item[];
  tinted?: boolean;
  note?: string;
}) {
  return (
    <section className={`py-24 sm:py-28 ${tinted ? "bg-secondary/50" : ""}`}>
      <div className="wrap">
        {(eyebrow || title) && (
          <div className="mb-12 max-w-2xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <h2 className={`${H2} ${eyebrow ? "mt-4" : ""}`}>{title}</h2>}
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((v) => (
            <div key={v.title} className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <span className="block h-1 w-10 rounded-full bg-gold" aria-hidden />
              <h3 className="mt-5 font-serif text-2xl text-foreground">{v.title}</h3>
              <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                {v.body}
              </p>
            </div>
          ))}
        </div>
        {note && <p className="mt-8 text-sm italic text-muted-foreground">{note}</p>}
      </div>
    </section>
  );
}

// Closing copy block + "Explore related pages" row, sat just above HomeConsultation.
export function ClosingSection({
  title,
  body,
  links,
}: {
  title: string;
  body?: string;
  links: { label: string; to: RelatedTo }[];
}) {
  return (
    <section className="bg-secondary/50 py-24 sm:py-28">
      <div className="wrap max-w-3xl text-center">
        <h2 className={H2}>{title}</h2>
        {body && <p className="mt-6 text-base leading-relaxed text-muted-foreground">{body}</p>}
        <RelatedPages links={links} />
      </div>
    </section>
  );
}

export function RelatedPages({ links }: { links: { label: string; to: RelatedTo }[] }) {
  return (
    <div className="mt-16 border-t border-border pt-10 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
        Explore related pages
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group inline-flex items-center gap-1.5 text-base font-bold text-primary underline underline-offset-4 hover:text-gold"
          >
            {l.label}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}

// Native <details> accordion; first item open.
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-12 space-y-4">
      {items.map((faq, i) => (
        <details
          key={faq.q}
          open={i === 0}
          className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-serif text-lg font-semibold text-foreground hover:bg-muted/30 [&::-webkit-details-marker]:hidden">
            {faq.q}
            <Plus
              className="size-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45"
              aria-hidden
            />
          </summary>
          <div className="border-t border-border/60 px-6 pb-6 pt-4 text-base leading-relaxed text-muted-foreground">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  );
}

type BulletList = { title: string; intro?: string; items?: string[]; outro?: string };

// Two headed bullet lists side by side (stacked on mobile).
export function ListColumns({ lists, tinted = false }: { lists: BulletList[]; tinted?: boolean }) {
  return (
    <section className={`py-24 sm:py-28 ${tinted ? "bg-secondary/50" : ""}`}>
      <div className="wrap grid gap-16 lg:grid-cols-2 lg:gap-20">
        {lists.map((l) => (
          <div key={l.title}>
            <h2 className={H2}>{l.title}</h2>
            {l.intro && (
              <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                {l.intro}
              </p>
            )}
            {l.items && (
              <ul className="mt-5 space-y-3">
                {l.items.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-foreground">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {l.outro && (
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{l.outro}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function NumberedSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-8 space-y-5">
      {steps.map((step, i) => (
        <li key={step} className="flex gap-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {i + 1}
          </span>
          <span className="pt-1.5 text-base leading-relaxed text-foreground">{step}</span>
        </li>
      ))}
    </ol>
  );
}

// One floorplan concept: header, concept note + render gallery, two prose/list columns, closing links.
export function FloorplanPage({
  title,
  headline,
  description,
  note,
  lists,
  gallery,
}: {
  title: string;
  headline: string;
  description: string;
  note: string;
  lists: BulletList[];
  gallery: readonly RefImage[];
}) {
  const [hero, ...rest] = gallery;
  return (
    <div>
      <PageHeader
        image={hero!.src}
        imageAlt={hero!.alt}
        eyebrow={title}
        title={headline}
        description={description}
      />

      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap">
          <div className="max-w-3xl">
            <h2 className={H2}>{title}</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{note}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {rest.map((img) => (
              <RefImg key={img.src} image={img} className="aspect-[4/3] rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      <ListColumns lists={lists} />

      <ClosingSection
        title="Discuss this concept"
        links={[
          { label: "All floorplans", to: "/floorplans" },
          { label: "Design and Interiors", to: "/services/design-and-interiors" },
          { label: "Discuss your project", to: "/contact" },
        ]}
      />

      <HomeConsultation />
    </div>
  );
}

// One service area: header (+ optional note), two prose columns, closing links.
export function AreaPage({
  title,
  headline,
  description,
  note,
  image,
  lists,
}: {
  title: string;
  headline: string;
  description: string;
  note?: string;
  image: RefImage;
  lists: BulletList[];
}) {
  return (
    <div>
      <PageHeader
        image={image.src}
        imageAlt={image.alt}
        eyebrow={title}
        title={headline}
        description={description}
      >
        {note && <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">{note}</p>}
      </PageHeader>

      <ListColumns lists={lists} tinted />

      <ClosingSection
        title="Discuss your project"
        links={[
          { label: "All service areas", to: "/service-areas" },
          { label: "Services", to: "/services" },
          { label: "Discuss your project", to: "/contact" },
        ]}
      />

      <HomeConsultation />
    </div>
  );
}
