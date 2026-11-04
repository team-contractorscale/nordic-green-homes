import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronDown, Phone, Mail } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CTA, FOOTER_COLUMNS, NAV, PLACEHOLDER } from "@/lib/home-content";

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

// Square gold CTA; a deep-green fill sweeps in from the left on hover (homepage SweepLink style).
function HeaderCta({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/estimate"
      className={`group relative h-11 items-center gap-3 overflow-hidden bg-gold px-5 text-xs font-bold uppercase tracking-[0.18em] text-black ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-[101%] bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
      />
      <span className="relative">Online Estimate</span>
      <ArrowUpRight className="relative size-4 transition-transform duration-500 group-hover:rotate-45" />
    </Link>
  );
}

const NAV_LINK =
  "group/nav relative inline-flex h-full items-center gap-1.5 px-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/85 transition-colors hover:text-white xl:px-4";
// Gold underline: draws in on hover, stays drawn on the active route.
const NAV_UNDERLINE =
  "absolute inset-x-3.5 bottom-5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/nav:scale-x-100 group-data-[status=active]/nav:scale-x-100 xl:inset-x-4";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      // Slide away on scroll-down past 240px, return on any scroll-up.
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Full-width square bar floating over each page's image hero: smoked glass at the top, solid
  // deep green once scrolled, so the navigation always stays readable.
  return (
    <header className="sticky top-0 z-50 h-0">
      <div
        className={`border-b backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "border-white/10 bg-brand-dark/95" : "border-white/15 bg-overlay/25"
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div
          className={`wrap flex items-center justify-between gap-6 transition-[height] duration-500 ${
            scrolled ? "h-[4.25rem]" : "h-20"
          }`}
        >
          <Wordmark />

          <nav className="hidden h-full items-center lg:flex">
            {NAV.map((item) => (
              <div key={item.to} className="group relative h-full">
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className={NAV_LINK}
                  activeProps={{ className: "!text-gold" }}
                >
                  {item.label}
                  {"children" in item && (
                    <ChevronDown className="size-3 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                  )}
                  <span aria-hidden className={NAV_UNDERLINE} />
                </Link>
                {"children" in item && (
                  <div className="invisible absolute left-0 top-full translate-y-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="min-w-72 border border-white/10 border-t-gold bg-brand-dark py-3 shadow-2xl shadow-black/40">
                      {item.children.map((child, i) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          activeOptions={{ exact: true }}
                          className="group/sub relative flex items-center gap-4 whitespace-nowrap px-6 py-3 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                          activeProps={{ className: "!text-gold" }}
                        >
                          <span
                            aria-hidden
                            className="absolute inset-y-2 left-0 w-0.5 origin-top scale-y-0 bg-gold transition-transform duration-300 group-hover/sub:scale-y-100"
                          />
                          <span className="text-[0.65rem] font-bold tracking-[0.2em] text-gold">
                            0{i + 1}
                          </span>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${PLACEHOLDER.phone.replace(/[^\d+]/g, "")}`}
              className="hidden items-center gap-2 text-xs font-bold tracking-[0.12em] text-white/85 transition-colors hover:text-gold 2xl:inline-flex"
            >
              <Phone className="size-3.5 text-gold" aria-hidden />
              {PLACEHOLDER.phone}
            </a>
            <HeaderCta className="hidden xl:inline-flex" />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className="flex size-11 flex-col items-end justify-center gap-1.5 border border-white/25 px-2.5 text-white transition-colors hover:border-gold lg:hidden"
                aria-label="Open menu"
              >
                <span className="h-px w-full bg-current" />
                <span className="h-px w-2/3 bg-current" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full overflow-y-auto border-0 bg-brand-dark p-0 text-white sm:max-w-sm"
              >
                <SheetTitle className="border-b border-white/10 px-6 py-6 font-serif text-lg text-white">
                  Nordic Green Homes
                </SheetTitle>
                <nav className="flex flex-col px-6 py-4">
                  {NAV.map((item, i) => (
                    <React.Fragment key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        activeOptions={{ exact: item.to === "/" || "children" in item }}
                        className="flex items-baseline gap-4 border-b border-white/10 py-4 font-serif text-2xl text-white/90 hover:text-gold"
                        activeProps={{ className: "!text-gold" }}
                      >
                        <span className="text-xs font-bold tracking-[0.2em] text-gold">
                          0{i + 1}
                        </span>
                        {item.label}
                      </Link>
                      {"children" in item &&
                        item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={() => setOpen(false)}
                            className="border-b border-white/5 py-3 pl-9 text-xs font-bold uppercase tracking-[0.18em] text-white/65 hover:text-white"
                            activeProps={{ className: "!text-gold" }}
                          >
                            {child.label}
                          </Link>
                        ))}
                    </React.Fragment>
                  ))}
                </nav>
                <div className="px-6 pb-8 pt-2" onClick={() => setOpen(false)}>
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

// Footer column label: gold rule + tracked uppercase (matches the nav dropdown numbering).
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gold">
      <span className="h-px w-6 bg-gold" aria-hidden />
      {children}
    </p>
  );
}

// Footer: same deep green and gold top edge as the nav dropdown panels. Brand panel (logo,
// tagline, contact, CTAs) beside a four-column site map; legal bar below.
export function SiteFooter() {
  return (
    <footer className="border-t border-gold bg-brand-dark text-white [main:has(.consult-band)+&]:pt-20 lg:[main:has(.consult-band)+&]:pt-28">
      <div className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:gap-0 lg:py-20">
        {/* brand panel */}
        <div className="lg:col-span-4 lg:border-r lg:border-white/10 lg:pr-12">
          <Wordmark />
          <p className="mt-8 font-serif text-2xl leading-snug text-white">
            Sustainable luxury. Built around your life.
          </p>
          <ul className="mt-8 border-y border-white/10 text-sm">
            <li className="border-b border-white/10">
              <a
                href={`tel:${PLACEHOLDER.phone.replace(/[^\d+]/g, "")}`}
                className="group flex items-center gap-4 py-4 text-white/85 transition-colors hover:text-gold"
              >
                <span className="grid size-9 shrink-0 place-items-center border border-white/15 text-gold transition-colors duration-500 group-hover:border-gold">
                  <Phone className="size-3.5" aria-hidden />
                </span>
                {PLACEHOLDER.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${PLACEHOLDER.email}`}
                className="group flex items-center gap-4 py-4 text-white/85 transition-colors hover:text-gold"
              >
                <span className="grid size-9 shrink-0 place-items-center border border-white/15 text-gold transition-colors duration-500 group-hover:border-gold">
                  <Mail className="size-3.5" aria-hidden />
                </span>
                {PLACEHOLDER.email}
              </a>
            </li>
          </ul>
          <div className="mt-8 flex flex-col items-start gap-3">
            <Link
              to={CTA.estimate.to}
              className="group relative inline-flex h-12 items-center gap-3 overflow-hidden bg-gold px-5 text-xs font-bold uppercase tracking-[0.18em] text-black"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-[101%] bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
              />
              <span className="relative">{CTA.estimate.label}</span>
              <ArrowUpRight className="relative size-4 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
            <Link
              to={CTA.call.to}
              className="group inline-flex h-12 items-center gap-3 border border-white/25 px-5 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              {CTA.call.label}
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          </div>
        </div>

        {/* site map */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:col-span-8 lg:pl-12">
          {FOOTER_COLUMNS.map((groups) => (
            <div key={groups[0].title} className="space-y-10">
              {groups.map((group) => (
                <div key={group.title}>
                  <FooterHeading>{group.title}</FooterHeading>
                  <ul className="mt-5 space-y-1">
                    {group.links.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className="group/f relative block py-1.5 pl-3 text-sm text-white/75 transition-colors hover:text-white"
                          activeOptions={{ exact: true }}
                          activeProps={{ className: "!text-gold" }}
                        >
                          <span
                            aria-hidden
                            className="absolute inset-y-1.5 left-0 w-0.5 origin-top scale-y-0 bg-gold transition-transform duration-300 group-hover/f:scale-y-100"
                          />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center gap-3 py-6 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/60 lg:flex-row lg:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} Nordic Green Homes</span>
            <Link to="/privacy" className="transition-colors hover:text-gold">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-gold">
              Terms
            </Link>
          </div>
          <a href="https://contractorscale.com" className="transition-colors hover:text-gold">
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
        Discuss your project <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
