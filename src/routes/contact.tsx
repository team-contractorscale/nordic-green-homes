import { createFileRoute } from "@tanstack/react-router";
import { BRAND, ASSETS } from "@/lib/content-data";
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import * as React from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Discovery Call | Nordic Green Homes" },
      {
        name: "description",
        content: "Schedule your complimentary 15-minute discovery call with Lane O'Brien. Serving Chilliwack, Fraser Valley, Kelowna & Victoria, BC.",
      },
      { property: "og:title", content: "Contact & Discovery Call | Nordic Green Homes" },
      {
        property: "og:description",
        content: "Tell us about your next custom home, new build, or renovation project in British Columbia.",
      },
      { property: "og:image", content: ASSETS.hero1 },
      { name: "twitter:image", content: ASSETS.hero1 },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    timeline: "3-6 months",
    budget: "$500k - $1M",
    projectType: "New Build / Custom Home",
    location: "",
    details: "",
    consent: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Safety requirement: Internal preview mode does not post to live CRM workflows without prior audit.
    setSubmitted(true);
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-brand-dark text-white py-16 md:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Complimentary Consultation
          </span>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Tell Us About Your Next Project
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
            Planning a custom home, renovation, or addition? Share a few details and Lane O'Brien will connect directly with you to discuss feasibility and next steps.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details Left */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Direct Line
                </span>
                <h2 className="font-serif text-2xl font-bold text-foreground mt-1">
                  We're Here to Help
                </h2>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Unlike large builders with layers of sales representatives, your project consultation connects directly with Lane O'Brien.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                  <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block">Phone</span>
                    <a href={BRAND.phoneTel} className="text-sm font-semibold text-foreground hover:underline">
                      {BRAND.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                  <Mail className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block">Email</span>
                    <a href={`mailto:${BRAND.email}`} className="text-sm font-semibold text-foreground hover:underline">
                      {BRAND.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                  <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block">Primary Location</span>
                    <span className="text-sm font-semibold text-foreground">{BRAND.location}</span>
                    <span className="text-xs text-muted-foreground block mt-0.5">
                      Serving Fraser Valley, Kelowna, Victoria & surrounding BC
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                  <Clock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block">Office Hours</span>
                    <span className="text-sm font-semibold text-foreground">{BRAND.hours}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-emerald-950/10 border border-emerald-900/20 text-xs text-emerald-950 dark:text-emerald-300 space-y-2">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Verified Builder Protection</span>
                </div>
                <p className="leading-relaxed opacity-90">
                  Full provincial licensing, comprehensive general liability coverage, WorkSafeBC in good standing, and RenoMark Code of Conduct warranty backing.
                </p>
              </div>
            </div>

            {/* Form Right */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border rounded-xl p-8 shadow-xs">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">
                      Inquiry Received (Preview Mode)
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                      Thank you for testing the discovery request form. In this unpublished sandbox environment, live CRM webhooks remain safely paused to protect production workflows.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-5 py-2 text-xs font-medium text-primary border border-input rounded-md hover:bg-muted"
                    >
                      Reset Form
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border-b border-border pb-3 mb-4">
                      <h3 className="font-serif text-lg font-bold text-foreground">
                        Book Your 15-Minute Discovery Call
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Fill out the short consultation details below. It only takes 2 minutes.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full px-3.5 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (604) 555-0199"
                          className="w-full px-3.5 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full px-3.5 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Project Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                        >
                          <option>New Build / Custom Home</option>
                          <option>Home Renovation / Addition</option>
                          <option>Custom Garage Build</option>
                          <option>Backyard Upgrade / Pool Bar</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Target Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                        >
                          <option>Immediately (1-3 months)</option>
                          <option>3 - 6 months</option>
                          <option>6 - 12 months</option>
                          <option>Planning for next year</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Estimated Budget
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                        >
                          <option>$100k - $250k (Renovations)</option>
                          <option>$250k - $500k</option>
                          <option>$500k - $1M</option>
                          <option>$1M - $2M+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Property Location / City
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Chilliwack, Abbotsford, Kelowna"
                          className="w-full px-3.5 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Tell us about your property and goals
                      </label>
                      <textarea
                        rows={3}
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="Lot size, architectural preferences, must-have features..."
                        className="w-full px-3.5 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex items-start gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="consent-check"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-1 rounded border-input text-primary focus:ring-primary"
                      />
                      <label htmlFor="consent-check" className="text-xs text-muted-foreground leading-normal">
                        I consent to receive communication from Nordic Green Homes / O'Brien Contracting Ltd. regarding my discovery consultation request.
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm shadow hover:bg-primary/90 transition-all focus:outline-hidden focus:ring-2 focus:ring-primary"
                    >
                      Submit Discovery Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
