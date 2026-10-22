import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { H2 } from "@/components/home/NordicHome";
import { SERVICES, projectPhoto } from "@/lib/home-content";
import {
  postTrackingEvent,
  getTrackingSessionId,
  TRACKING_IDS,
  CUSTOM_FIELD_IDS,
} from "@/lib/form-tracking";
import { MessageCircle, Ruler, Loader2 } from "lucide-react";
import * as React from "react";

const DESCRIPTION =
  "Tell us what you are planning, where the project is located and what you need to understand first. You can begin with a site, a set of plans or an early idea.";

const CONVERSATIONS = [
  {
    icon: Ruler,
    title: "Talk through a project",
    body: "Share the property, project type, priorities and current design stage. This gives the team context for the first conversation.",
  },
  {
    icon: MessageCircle,
    title: "Ask a general question",
    body: "If you are still working out the right path, tell us what you are trying to decide and where you need clarity.",
  },
];

const FIELD =
  "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-base text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none";
const LABEL = "mb-1.5 block text-sm font-bold text-foreground";

const HEADER_IMAGE = projectPhoto("MKPhoto-1888-1.jpg");

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Contact | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: HEADER_IMAGE },
      { name: "twitter:image", content: HEADER_IMAGE },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    projectType: SERVICES[0].title as string,
    designStage: "",
    goals: "",
    nextStep: CONVERSATIONS[0]!.title,
    consent: false,
  });
  const [status, setStatus] = React.useState<"idle" | "submitting">("idle");
  const navigate = useNavigate();
  const set = (patch: Partial<typeof form>) => setForm({ ...form, ...patch });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setStatus("submitting");

    const [first_name = "", ...rest] = form.name.trim().split(/\s+/);

    postTrackingEvent(
      {
        type: "external_form_submission",
        timestamp: Date.now(),
        formId: "project-conversation",
        formData: {
          first_name,
          last_name: rest.join(" "),
          email: form.email,
          phone: form.phone,
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
          formName: "Project Conversation",
        },
      },
      {
        customFields: {
          [CUSTOM_FIELD_IDS.projectType]: { value: form.projectType, label: "Project Type" },
          [CUSTOM_FIELD_IDS.propertyLocation]: { value: form.location, label: "Property Location" },
          [CUSTOM_FIELD_IDS.projectDetails]: {
            value: `Design stage: ${form.designStage}\nPreferred next step: ${form.nextStep}\n\n${form.goals}`,
            label: "Project Details",
          },
        },
      },
    );

    // Fire-and-forget submission; navigate to the thank-you page after a brief beat.
    window.setTimeout(() => navigate({ to: "/thank-you" }), 600);
  };

  return (
    <div>
      <PageHeader
        image={HEADER_IMAGE}
        imageAlt="Completed building exterior at dusk (reference image)"
        eyebrow="Contact"
        title="Start the conversation"
        description={DESCRIPTION}
      />

      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          {/* Left: which conversation, what to include, contact details */}
          <div>
            <h2 className={H2}>Choose the conversation that fits</h2>
            <div className="mt-8 space-y-4">
              {CONVERSATIONS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="font-serif text-xl text-foreground">{title}</h3>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-l-2 border-gold pl-5">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                What to include
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                Name, email, phone, project location, project type, current design stage, broad
                goals, preferred next step and consent.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10"
          >
            <h2 className="font-serif text-2xl text-foreground">Start your project conversation</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Share what you are planning and where you need clarity. We will get back to you to
              arrange the next step.
            </p>

            <fieldset className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="c-name" className={LABEL}>
                  Name *
                </label>
                <input
                  id="c-name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set({ name: e.target.value })}
                  className={FIELD}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="c-email" className={LABEL}>
                  Email *
                </label>
                <input
                  id="c-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => set({ email: e.target.value })}
                  className={FIELD}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="c-phone" className={LABEL}>
                  Phone *
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => set({ phone: e.target.value })}
                  className={FIELD}
                  placeholder="(604) 555-0000"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-location" className={LABEL}>
                  Project location
                </label>
                <input
                  id="c-location"
                  value={form.location}
                  onChange={(e) => set({ location: e.target.value })}
                  className={FIELD}
                  placeholder="City or region"
                />
              </div>
              <div>
                <label htmlFor="c-type" className={LABEL}>
                  Project type
                </label>
                <select
                  id="c-type"
                  value={form.projectType}
                  onChange={(e) => set({ projectType: e.target.value })}
                  className={FIELD}
                >
                  {SERVICES.map((s) => (
                    <option key={s.key}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="c-stage" className={LABEL}>
                  Current design stage
                </label>
                <input
                  id="c-stage"
                  value={form.designStage}
                  onChange={(e) => set({ designStage: e.target.value })}
                  className={FIELD}
                  placeholder="e.g. early ideas, have plans, ready to build"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-goals" className={LABEL}>
                  Broad goals
                </label>
                <textarea
                  id="c-goals"
                  rows={4}
                  value={form.goals}
                  onChange={(e) => set({ goals: e.target.value })}
                  className={FIELD}
                  placeholder="What are you hoping to achieve? What matters most?"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-next" className={LABEL}>
                  Preferred next step
                </label>
                <select
                  id="c-next"
                  value={form.nextStep}
                  onChange={(e) => set({ nextStep: e.target.value })}
                  className={FIELD}
                >
                  {CONVERSATIONS.map((c) => (
                    <option key={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>
              <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(e) => set({ consent: e.target.checked })}
                  className="mt-0.5 size-4 accent-primary"
                />
                <span>
                  I consent to Nordic Green Homes contacting me about my enquiry. See our{" "}
                  <a
                    href="/privacy"
                    className="font-bold text-primary underline underline-offset-2"
                  >
                    Privacy
                  </a>{" "}
                  and{" "}
                  <a href="/terms" className="font-bold text-primary underline underline-offset-2">
                    Terms
                  </a>
                  .
                </span>
              </label>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  "Start your project conversation"
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </div>
  );
}
