import { createFileRoute } from "@tanstack/react-router";
import { BRAND, ASSETS } from "@/lib/content-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Placeholder } from "@/components/home/NordicHome";
import { PLACEHOLDER, REFERENCE_BASE } from "@/lib/home-content";
import {
  postTrackingEvent,
  getTrackingSessionId,
  TRACKING_IDS,
  CUSTOM_FIELD_IDS,
} from "@/lib/form-tracking";
import { Phone, Mail, MapPin, Clock, Info, CheckCircle2 } from "lucide-react";
import * as React from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Discovery Call (Draft) | Nordic Green Homes" },
      {
        name: "description",
        content:
          "Internal pilot contact page for Nordic Green Homes. Contact details are pending confirmation; the form is disabled.",
      },
      { property: "og:title", content: "Contact & Discovery Call (Draft) | Nordic Green Homes" },
      {
        property: "og:description",
        content:
          "Internal pilot contact page for Nordic Green Homes. Contact details pending confirmation; form disabled.",
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
    if (!formData.consent) return;

    // Split "Full Name" into first/last for standard CRM keys.
    const nameParts = formData.name.trim().split(/\s+/);
    const first_name = nameParts[0] ?? "";
    const last_name = nameParts.slice(1).join(" ") || "";

    const trackingPayload = {
      type: "external_form_submission",
      timestamp: Date.now(),
      formId: "discovery-call-request",
      formData: {
        first_name,
        last_name,
        email: formData.email,
        phone: formData.phone,
      },
      formLabels: {
        first_name: "First Name",
        last_name: "Last Name",
        email: "Email Address",
        phone: "Phone Number",
      },
      url: window.location.href,
      title: document.title,
      path: window.location.pathname,
      userAgent: navigator.userAgent,
      trackingId: TRACKING_IDS.trackingId,
      locationId: TRACKING_IDS.locationId,
      projectId: TRACKING_IDS.projectId,
      sessionId: getTrackingSessionId(),
      properties: {
        deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
        source: "ai_studio",
        projectId: TRACKING_IDS.projectId,
        formName: "Discovery Call Request",
      },
    };

    postTrackingEvent(trackingPayload, {
      customFields: {
        [CUSTOM_FIELD_IDS.projectType]: {
          value: formData.projectType,
          label: "Project Type",
        },
        [CUSTOM_FIELD_IDS.targetTimeline]: {
          value: formData.timeline,
          label: "Target Timeline",
        },
        [CUSTOM_FIELD_IDS.estimatedBudget]: {
          value: formData.budget,
          label: "Estimated Budget",
        },
        [CUSTOM_FIELD_IDS.propertyLocation]: {
          value: formData.location,
          label: "Property Location",
        },
        [CUSTOM_FIELD_IDS.projectDetails]: {
          value: formData.details,
          label: "Project Details",
        },
      },
    });

    setSubmitted(true);
  };

  return (
    <div>
      <PageHeader
        image={ASSETS.hero1}
        imageAlt="Architectural exterior of a custom home in British Columbia (reference image)"
        eyebrow="Complimentary Consultation · Draft"
        title="Tell Us About Your Next Project"
        description="Planning a custom home, renovation, or addition? Share a few details. Contact details and booking ownership are pending confirmation — the form below is disabled in this internal pilot."
      />

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
                <p className="text-base text-muted-foreground mt-2 leading-relaxed">
                  Unlike large builders with layers of sales representatives, your project
                  consultation is intended to connect directly with Lane O'Brien.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Placeholder>{PLACEHOLDER.bookingOwner}</Placeholder>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                  <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block">Phone</span>
                    <div className="mt-1">
                      <Placeholder>{PLACEHOLDER.phone}</Placeholder>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                  <Mail className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block">Email</span>
                    <div className="mt-1">
                      <Placeholder>{PLACEHOLDER.email}</Placeholder>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                  <MapPin className="5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block">
                      Primary Location
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {REFERENCE_BASE}{" "}
                      <span className="text-muted-foreground font-normal">(reference)</span>
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      <Placeholder>{PLACEHOLDER.serviceArea}</Placeholder>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                  <Clock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block">
                      Office Hours
                    </span>
                    <span className="text-sm font-semibold text-foreground">{BRAND.hours}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-lg border border-dashed border-gold bg-gold/5 text-sm text-foreground/80 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Info className="w-4 h-4 text-primary" />
                  <span>Licensing &amp; insurance — pending</span>
                </div>
                <p className="leading-relaxed">
                  Provincial licensing, liability insurance, RenoMark and warranty wording are not
                  approved Nordic Green Homes claims yet.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Placeholder>{PLACEHOLDER.legalEntity}</Placeholder>
                  <Placeholder>{PLACEHOLDER.assurance}</Placeholder>
                </div>
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
                    <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                      Thank you for testing the discovery request form. In this unpublished sandbox
                      environment, live CRM webhooks remain safely paused to protect production
                      workflows.
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
                  <form onSubmit={handleSubmit} className="space-y-4" aria-disabled="true">
                    <div className="border-b border-border pb-3 mb-4">
                      <h3 className="font-serif text-lg font-bold text-foreground">
                        Book Your 15-Minute Discovery Call
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Fill out the short consultation details below. It only takes 2 minutes.
                      </p>
                    </div>

                    <div className="rounded-lg border border-dashed border-gold bg-gold/5 p-3 text-xs text-foreground/80">
                      <div className="flex items-center gap-2 font-semibold text-foreground">
                        <Info className="w-3.5 h-3.5 text-primary" />
                        <span>Form disabled — internal pilot</span>
                      </div>
                      <p className="mt-1.5 leading-relaxed">
                        CRM routing, consent wording and booking ownership for Nordic Green Homes
                        are pending audit. No data is sent. The form below is read-only for layout
                        review.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          disabled
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full px-3.5 py-2 text-sm rounded-md border border-input bg-muted/60 text-muted-foreground cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          disabled
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (604) 555-0199"
                          className="w-full px-3.5 py-2 text-sm rounded-md border border-input bg-muted/60 text-muted-foreground cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        disabled
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full px-3.5 py-2 text-sm rounded-md border border-input bg-muted/60 text-muted-foreground cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Project Type
                        </label>
                        <select
                          disabled
                          value={formData.projectType}
                          onChange={(e) =>
                            setFormData({ ...formData, projectType: e.target.value })
                          }
                          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-muted/60 text-muted-foreground cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-primary"
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
                          disabled
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-muted/60 text-muted-foreground cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-primary"
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
                          disabled
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-muted/60 text-muted-foreground cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-primary"
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
                          disabled
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Chilliwack, Abbotsford, Kelowna"
                          className="w-full px-3.5 py-2 text-sm rounded-md border border-input bg-muted/60 text-muted-foreground cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Tell us about your property and goals
                      </label>
                      <textarea
                        rows={3}
                        disabled
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="Lot size, architectural preferences, must-have features..."
                        className="w-full px-3.5 py-2 text-sm rounded-md border border-input bg-muted/60 text-muted-foreground cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="rounded-lg border border-dashed border-gold bg-gold/5 p-3 text-xs text-foreground/80 space-y-2">
                      <p className="leading-relaxed">
                        Consent wording for Nordic Green Homes is pending legal review and is not
                        shown here. The previous combined-entity consent line has been removed until
                        routing and ownership are confirmed.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Placeholder>{PLACEHOLDER.legalEntity}</Placeholder>
                        <Placeholder>{PLACEHOLDER.bookingOwner}</Placeholder>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled
                      className="w-full py-3 px-6 rounded-md bg-muted text-muted-foreground font-medium text-sm border border-dashed border-gold cursor-not-allowed"
                      aria-describedby="form-disabled-note"
                    >
                      Submit disabled — pending CRM &amp; consent audit
                    </button>
                    <p id="form-disabled-note" className="sr-only">
                      The discovery form is disabled in this internal pilot. CRM routing, consent
                      wording and booking ownership are pending audit, so no data is sent.
                    </p>
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
