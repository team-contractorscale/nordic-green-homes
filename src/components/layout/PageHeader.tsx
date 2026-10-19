import type { ReactNode } from "react";

type PageHeaderProps = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
};

/**
 * Reusable image hero for every inner route. The site's floating glass
 * navigation (SiteHeader) sits over the top of this image, so the nav reads
 * as living inside the page header. Each page supplies its own O'Brien
 * source image + alt text.
 */
export function PageHeader({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden bg-primary text-white">
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        loading="eager"
      />
      {/* brand-green gradient keeps the copy + the floating nav legible over any photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(13_61_50/0.82)_0%,rgb(13_61_50/0.6)_45%,rgb(13_61_50/0.9)_100%)]"
      />
      <div className="wrap pt-36 pb-16 text-center sm:pt-44 sm:pb-20">
        <div className="mx-auto max-w-3xl">
          <p className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden />
            {eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.25rem,3vw+1rem,3.5rem)] leading-[1.05] tracking-[-0.02em]">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">{description}</p>
          ) : null}
          {children}
        </div>
      </div>
    </header>
  );
}
