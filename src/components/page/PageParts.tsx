import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { H2, HomeConsultation } from "@/components/home/NordicHome";
import { PageHeader } from "@/components/layout/PageHeader";
import type { RefImage } from "@/lib/home-content";

/* Shared blocks for the inner content pages (service, service-area and resource pages). */

type RelatedTo = NonNullable<LinkProps["to"]>;

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
