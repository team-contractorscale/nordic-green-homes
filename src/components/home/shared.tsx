import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { CONSULTATION, type RefImage } from "@/lib/home-content";

/* Shared home bits — small primitives reused by every home section.
 * Split out of NordicHome.tsx so each section module stays focused and the
 * main file stays under the per-file edit threshold. Re-exported by NordicHome
 * so existing imports (`@/components/home/NordicHome`) keep resolving.
 */

// Visible marker for anything the client hasn't confirmed. Never style this as real copy.
export function Placeholder({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-dashed px-3.5 py-1.5 text-xs font-bold ${
        dark ? "border-gold bg-white/10 text-white" : "border-gold bg-gold/10 text-slate"
      }`}
    >
      {children}
    </span>
  );
}

// Responsive sources for Squarespace-hosted images (?format=NNNw), capped at the file's native
// width so the browser never asks for — or stretches to — more pixels than actually exist.
export function srcSetFor(image: RefImage): string | undefined {
  if (!image.src.includes("squarespace-cdn")) return undefined;
  const base = image.src.split("?")[0];
  const steps = [750, 1000, 1500].filter((x) => x < image.w);
  return [
    ...steps.map((x) => `${base}?format=${x}w ${x}w`),
    `${base}?format=2500w ${image.w}w`,
  ].join(", ");
}

export function imgProps(image: RefImage, sizes = "100vw") {
  return { src: image.src, srcSet: srcSetFor(image), sizes, alt: image.alt };
}

export function RefTag({ image, className = "" }: { image: RefImage; className?: string }) {
  return (
    <span
      title={`Source: ${image.source}. Not approved for public use.`}
      className={`absolute z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm ${className}`}
    >
      {image.kind} · Reference only
    </span>
  );
}

export function RefImg({
  image,
  className = "",
  tagClassName = "left-3 top-3",
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  image: RefImage;
  className?: string;
  tagClassName?: string;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      <img
        {...imgProps(image, sizes)}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <RefTag image={image} className={tagClassName} />
    </div>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      data-reveal="left"
      className={`flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] ${
        dark ? "text-white" : "text-primary"
      }`}
    >
      <span className="size-1.5 rounded-full bg-gold" aria-hidden />
      {children}
    </p>
  );
}

export const H2 = "font-serif text-[clamp(2rem,2vw+1rem,3rem)] leading-[1.1] tracking-[-0.01em]";
export const H3 = "text-lg font-bold";
export const TEXT_LINK =
  "group inline-flex items-center gap-2 text-base font-bold text-primary underline underline-offset-4 hover:text-slate";

export function ConsultationButton({ tone = "green" }: { tone?: "green" | "gold" }) {
  return (
    <Link
      to="/contact"
      className={`group inline-flex h-12 items-center gap-3 rounded-full py-1 pl-6 pr-1.5 text-base font-bold shadow-md shadow-black/0 transition-all duration-300 hover:scale-[1.04] hover:shadow-lg ${
        tone === "gold"
          ? "bg-gold text-black hover:shadow-gold/40"
          : "bg-primary text-primary-foreground hover:shadow-primary/30"
      }`}
    >
      {CONSULTATION.cta}
      <span
        className={`flex size-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-45 ${
          tone === "gold" ? "bg-primary text-white" : "bg-gold text-black"
        }`}
      >
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}
