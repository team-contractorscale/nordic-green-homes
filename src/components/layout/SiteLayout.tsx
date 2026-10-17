import * as React from "react";
import { Link } from "@tanstack/react-router";
import { BRAND, ASSETS } from "@/lib/content-data";
import { Phone, Mail, MapPin, Menu, X, ArrowRight, ShieldCheck, ChevronDown } from "lucide-react";

export function PreviewBanner() {
  return (
    <div className="bg-brand-dark text-white/90 text-xs px-4 py-2 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-medium tracking-wide uppercase">
            Internal Pilot Preview
          </span>
          <span className="hidden sm:inline text-white/70">
            Nordic Green Homes — Private architecture preview based on verified O'Brien Contracting
            Ltd. standards.
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-white/60">
          <span>Location ID: yHohxdtdZLdf0DUv8x7z</span>
          <span className="hidden md:inline">Unpublished Sandbox</span>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border/80 transition-shadow duration-200">
      {/* Top Utility Bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={BRAND.phoneTel}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{BRAND.phone}</span>
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{BRAND.email}</span>
            </a>
            <span className="inline-flex items-center gap-1.5 opacity-90">
              <MapPin className="w-3.5 h-3.5" />
              <span>{BRAND.location} (Serving Fraser Valley, Kelowna & Victoria)</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="opacity-80">Hours: {BRAND.hours}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={ASSETS.logo}
              alt="Nordic Green Homes & O'Brien Contracting"
              className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-foreground leading-tight">
                {BRAND.name}
              </span>
              <span className="text-[11px] font-sans text-muted-foreground uppercase tracking-wider">
                Net-Zero Custom Homes
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-foreground/80">
            <Link
              to="/"
              activeProps={{ className: "text-primary font-semibold" }}
              activeOptions={{ exact: true }}
              className="hover:text-primary transition-colors"
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div className="relative group" onMouseLeave={() => setAboutOpen(false)}>
              <button
                type="button"
                onClick={() => setAboutOpen(!aboutOpen)}
                onMouseEnter={() => setAboutOpen(true)}
                className="inline-flex items-center gap-1 hover:text-primary transition-colors py-2"
                aria-expanded={aboutOpen}
              >
                <span>About Us</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              {aboutOpen && (
                <div
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={() => setAboutOpen(false)}
                  className="absolute top-full left-0 w-56 rounded-md shadow-lg bg-card border border-border py-2 z-50 animate-in fade-in slide-in-from-top-1"
                >
                  <Link
                    to="/about-us"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setAboutOpen(false)}
                  >
                    Our Story & Team
                  </Link>
                  <Link
                    to="/process"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setAboutOpen(false)}
                  >
                    Our 8-Step Process
                  </Link>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative group" onMouseLeave={() => setServicesOpen(false)}>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                onMouseEnter={() => setServicesOpen(true)}
                className="inline-flex items-center gap-1 hover:text-primary transition-colors py-2"
                aria-expanded={servicesOpen}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              {servicesOpen && (
                <div
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  className="absolute top-full left-0 w-64 rounded-md shadow-lg bg-card border border-border py-2 z-50 animate-in fade-in slide-in-from-top-1"
                >
                  <Link
                    to="/services"
                    className="block px-4 py-2 text-sm font-semibold text-primary border-b border-border/50 hover:bg-muted transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    All Services Overview
                  </Link>
                  <Link
                    to="/services/new-builds"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    New Builds & Custom Homes
                  </Link>
                  <Link
                    to="/services/home-renovations"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    Home Renovations
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/process"
              activeProps={{ className: "text-primary font-semibold" }}
              className="hover:text-primary transition-colors"
            >
              Our Process
            </Link>

            <Link
              to="/projects"
              activeProps={{ className: "text-primary font-semibold" }}
              className="hover:text-primary transition-colors"
            >
              Projects
            </Link>

            <Link
              to="/faqs"
              activeProps={{ className: "text-primary font-semibold" }}
              className="hover:text-primary transition-colors"
            >
              FAQs
            </Link>

            <Link
              to="/contact"
              activeProps={{ className: "text-primary font-semibold" }}
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm shadow hover:bg-primary/90 transition-all focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span>Book Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            className="block py-2 text-base font-medium text-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="block py-2 text-base font-medium text-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us & Team
          </Link>
          <Link
            to="/services"
            className="block py-2 text-base font-medium text-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services Overview
          </Link>
          <div className="pl-4 space-y-1 border-l-2 border-primary/20">
            <Link
              to="/services/new-builds"
              className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              — New Builds & Custom Homes
            </Link>
            <Link
              to="/services/home-renovations"
              className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              — Home Renovations
            </Link>
          </div>
          <Link
            to="/process"
            className="block py-2 text-base font-medium text-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Our 8-Step Process
          </Link>
          <Link
            to="/projects"
            className="block py-2 text-base font-medium text-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects Gallery
          </Link>
          <Link
            to="/faqs"
            className="block py-2 text-base font-medium text-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Frequently Asked Questions
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-base font-medium text-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact & Consultation
          </Link>

          <div className="pt-4 border-t border-border">
            <Link
              to="/contact"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-primary text-primary-foreground font-medium text-sm shadow"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Book Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="mt-3 text-center text-xs text-muted-foreground">
              Call us:{" "}
              <a href={BRAND.phoneTel} className="underline text-foreground">
                {BRAND.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={ASSETS.logoTransparentWhite}
                alt={BRAND.name}
                className="h-12 w-auto object-contain brightness-110"
              />
              <div>
                <span className="font-serif text-lg font-bold text-white tracking-wide block">
                  {BRAND.name}
                </span>
                <span className="text-[11px] text-white/60 tracking-wider uppercase block">
                  {BRAND.sourceCompany}
                </span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Our commitment to green building practices means you can trust us to deliver a home
              that is as kind to the planet as it is to you and your family.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Net-Zero Trained Craftsmanship & RenoMark Member</span>
              </span>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white tracking-wide mb-4 border-b border-white/10 pb-2">
              Core Services
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link
                  to="/services/new-builds"
                  className="hover:text-emerald-300 transition-colors"
                >
                  New Builds & Custom Homes
                </Link>
              </li>
              <li>
                <Link
                  to="/services/home-renovations"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Home Renovations
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-300 transition-colors">
                  Custom Garage Builds
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-300 transition-colors">
                  Custom Pool Bars & Cabanas
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-300 transition-colors">
                  Backyard Upgrades & Decks
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white tracking-wide mb-4 border-b border-white/10 pb-2">
              Site Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link to="/about-us" className="hover:text-emerald-300 transition-colors">
                  About Us (Lane & Kylie)
                </Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-emerald-300 transition-colors">
                  Our 8-Step Process
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-emerald-300 transition-colors">
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-emerald-300 transition-colors">
                  Building FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-300 transition-colors">
                  Book a Discovery Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white tracking-wide mb-4 border-b border-white/10 pb-2">
              Contact & Location
            </h3>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{BRAND.location} — Fraser Valley, BC</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a href={BRAND.phoneTel} className="hover:text-emerald-300 transition-colors">
                  {BRAND.phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${BRAND.email}`}
                  className="hover:text-emerald-300 transition-colors"
                >
                  {BRAND.email}
                </a>
              </div>
              <div className="pt-2 text-xs text-white/50">Operating Hours: {BRAND.hours}</div>
            </div>
          </div>
        </div>

        {/* Legal & Attribution Sub-Footer */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div>
            © {new Date().getFullYear()} {BRAND.name} (Pilot for {BRAND.sourceCompany}). All rights
            reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white/80 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-white/30">|</span>
            <span>Unpublished Pilot</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function StickyMobileCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border px-4 py-2.5 shadow-lg flex items-center justify-between gap-3">
      <a
        href={BRAND.phoneTel}
        className="flex items-center justify-center p-2.5 rounded-md border border-input text-foreground hover:bg-muted transition-colors"
        aria-label="Call Nordic Green Homes"
      >
        <Phone className="w-5 h-5 text-primary" />
      </a>
      <Link
        to="/contact"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-md bg-primary text-primary-foreground font-medium text-xs sm:text-sm shadow"
      >
        <span>Book Discovery Call</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export function PageContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
