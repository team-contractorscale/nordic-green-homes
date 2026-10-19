import * as React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV, PLACEHOLDER, REFERENCE_BASE, SERVICES } from "@/lib/home-content";
import { Placeholder } from "@/components/home/NordicHome";

export function PreviewBanner() {
  return (
    <div className="relative z-[60] bg-brand-dark px-4 py-2 text-center text-xs text-white/85">
      <span className="mr-2 inline-flex items-center rounded-full bg-gold px-2.5 py-0.5 font-bold text-black">
        Internal pilot
      </span>
      Unpublished, not client-approved. Forms and CRM submission are disabled.
    </div>
  );
}

// Tree mark cropped (in CSS) from the supplied transparent logo PNG + typeset name — a temporary
// horizontal lockup until the client supplies an icon-only / horizontal logo file.
function Wordmark() {
  return (
    <Link
      to="/"
      aria-label="Nordic Green Homes — home"
      className="flex items-center gap-3 text-white"
    >
      <span className="relative block size-11 shrink-0 overflow-hidden">
        <img
          src="/brand/nordic-logo-light.png"
          alt=""
          className="absolute left-[-74%] top-0 w-[246%] max-w-none"
        />
      </span>
      <span className="leading-tight">
        <span className="block whitespace-nowrap font-serif text-lg">Nordic Green Homes</span>
        <span className="block whitespace-nowrap text-xs text-white/75">
          Sustainable Luxury Homes
        </span>
      </span>
    </Link>
  );
}

// Template header sizing (§6): nav text-sm, pill links, h-11 pill CTA with icon chip.
function HeaderCta({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/contact"
      className={`group h-11 items-center gap-2 rounded-full bg-white py-1 pl-5 pr-1 text-sm font-bold text-primary shadow-md shadow-black/0 transition-all duration-300 hover:scale-[1.04] hover:shadow-lg hover:shadow-black/20 ${className}`}
    >
      Book a free consultation
      <span className="flex size-8 items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-45">
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const isHome = useLocation({ select: (l) => l.pathname === "/" });
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // One glass bar holds logo, links and CTA. Over the home hero it's clear glass; once scrolled
  // (or on inner pages, where it sits in flow) it fills with brand green so it stays readable.
  const solid = !isHome || scrolled;

  return (
    <header className={`sticky top-0 z-50 ${isHome ? "h-0" : "bg-background"}`}>
      <div className={`wrap transition-[padding] duration-300 ${solid ? "py-2" : "py-4"}`}>
        <div
          className={`flex items-center justify-between gap-4 rounded-full border py-2 pl-4 pr-2 backdrop-blur-md transition-colors duration-300 sm:pl-5 ${
            solid
              ? "border-primary bg-primary/95 shadow-xl shadow-black/15"
              : "border-white/20 bg-white/10 shadow-lg shadow-black/10"
          }`}
        >
          <Wordmark />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-full px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/15"
                activeProps={{ className: "!bg-white !text-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <HeaderCta className="hidden xl:inline-flex" />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className="flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] border-0 bg-primary p-0 text-white">
                <SheetTitle className="border-b border-white/15 px-6 py-5 font-serif text-lg text-white">
                  Nordic Green Homes
                </SheetTitle>
                <nav className="flex flex-col px-4 py-4">
                  {NAV.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: item.to === "/" }}
                      className="rounded-full px-4 py-3 text-base font-bold text-white/90 hover:bg-white/10"
                      activeProps={{ className: "!bg-white !text-primary" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="px-6" onClick={() => setOpen(false)}>
                  <HeaderCta className="inline-flex" />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
      <span className="size-1.5 rounded-full bg-gold" aria-hidden />
      {children}
    </p>
  );
}

// Compact four-column footer. The consultation CTA lives once, just above it (HomeConsultation).
export function SiteFooter() {
  return (
    <footer className="bg-primary text-white">
      <div className="wrap grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] lg:gap-12">
        <div>
          <img
            src="/brand/nordic-logo-light.png"
            alt="Nordic Green Homes & Design"
            className="w-44"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/80">
            Where sustainability meets style. Custom homes, new builds and renovations for families
            planning their forever home.
          </p>
        </div>

        <div>
          <FooterHeading>Explore</FooterHeading>
          <ul className="mt-5 space-y-3">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-white/85 hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Services</FooterHeading>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((s) => (
              <li key={s.key}>
                <Link to="/services" className="text-sm text-white/85 hover:text-gold">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Contact</FooterHeading>
          <ul className="mt-5 space-y-3 text-sm text-white/85">
            <li>
              {REFERENCE_BASE} <span className="text-white/60">(reference)</span>
            </li>
            <li>
              <Placeholder dark>{PLACEHOLDER.phone}</Placeholder>
            </li>
            <li>
              <Placeholder dark>{PLACEHOLDER.email}</Placeholder>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="wrap flex flex-col items-center gap-3 py-5 text-xs text-white/75 lg:flex-row lg:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} Nordic Green Homes</span>
            <Placeholder dark>{PLACEHOLDER.legalEntity}</Placeholder>
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
          <a href="https://contractorscale.com" className="hover:text-white">
            Website by ContractorScale.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-primary px-4 py-3 lg:hidden">
      <Link
        to="/contact"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gold text-sm font-bold text-black"
      >
        Book a free consultation <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
