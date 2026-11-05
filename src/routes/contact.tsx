import { acceptedMetadata } from "@/lib/accepted-metadata";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CTA, SERVICES, IMAGES } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import {
  HEADING,
  Kicker,
  LineLink,
  ScrollProgress,
  SectionIndicator,
  SweepLink,
  HeroTitle,
  HeroBackdrop,
} from "@/components/home/kit";
import {
  postTrackingEvent,
  getTrackingSessionId,
  TRACKING_IDS,
  CUSTOM_FIELD_IDS,
} from "@/lib/form-tracking";
import { MessageCircle, Ruler, Loader2, Phone, Mail } from "lucide-react";
import * as React from "react";
import { BRAND } from "@/lib/content-data";

const DIRECT = [
  { icon: Phone, label: "Call", value: BRAND.phoneFormatted, href: `tel:${BRAND.phoneTel}` },
  { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
];

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
  "w-full border border-input bg-background px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-gold focus:ring-2 focus:ring-gold/25 focus:outline-none";
const LABEL = "mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate";

const TITLE = "Contact Nordic Green Homes | Nordic Green Homes";
const SEO_DESCRIPTION =
  "Contact Nordic Green Homes about your property, custom home or garden suite. Share your ideas, design stage and questions.";
const HEADER_IMAGE = IMAGES.farmhouseRear.src;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      ...acceptedMetadata("/contact"),
      { property: "og:image", content: HEADER_IMAGE },
      { name: "twitter:image", content: HEADER_IMAGE },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const ref = useHomeMotion<HTMLDivElement>();
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
          [CUSTOM_FIELD_IDS.designStage]: {
            value: form.designStage,
            label: "Current Design Stage",
          },
          [CUSTOM_FIELD_IDS.preferredNextStep]: {
            value: form.nextStep,
            label: "Preferred Next Step",
          },
          [CUSTOM_FIELD_IDS.projectGoals]: { value: form.goals, label: "Project Goals" },
          [CUSTOM_FIELD_IDS.projectDetails]: {
            value: form.goals ? `Goals: ${form.goals}` : "",
            label: "Project Details",
          },
        },
      },
    );

    // Fire-and-forget submission; navigate to the thank-you page after a brief beat.
    window.setTimeout(() => navigate({ to: "/thank-you" }), 600);
  };

  // Picking a conversation pre-fills "Preferred next step"; on small screens (form below the
  // choices) it also brings the form into view.
  const choose = (title: string) => {
    set({ nextStep: title });
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      document.querySelector("form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />

      {/* ---------- Hero: heading + direct contact ---------- */}
      <section
        data-section="Contact"
        className="grain relative isolate overflow-hidden bg-overlay text-white"
      >
        <HeroBackdrop image={IMAGES.poolRender} />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_85%_45%,rgb(187_137_92/0.14),transparent_70%)]"
        />
        <div className="wrap grid gap-14 pb-20 pt-36 lg:grid-cols-12 lg:items-end lg:pb-24 lg:pt-44">
          <div data-hero-copy className="lg:col-span-7">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              Contact
            </p>
            <HeroTitle lines={["Start the", "conversation."]} max="6rem" className="mt-7" />
            <p
              data-anim="fade"
              className="mt-8 max-w-[34rem] text-base leading-relaxed text-white/85 sm:text-lg"
            >
              {DESCRIPTION}
            </p>
            <div data-anim="fade" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
              <LineLink href="#contact-form" dark>
                {CTA.call.label}
              </LineLink>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p
              data-anim="fade"
              className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold"
            >
              Talk to us directly
            </p>
            <span
              data-rule
              aria-hidden
              className="mt-4 block h-px w-full origin-left bg-white/20"
            />
            <ul>
              {DIRECT.map(({ icon: Icon, label, value, href }) => (
                <li key={label} data-anim="stat" className="border-b border-white/10">
                  <a href={href} className="group flex items-center gap-4 py-5">
                    <span className="grid size-11 shrink-0 place-items-center border border-white/20 text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/60">
                        {label}
                      </span>
                      <span className="mt-1 block break-words font-serif text-xl transition-colors duration-300 group-hover:text-gold sm:text-2xl">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base text-white/85">
              Hours: Monday to Friday, 9 a.m. to 5 p.m.
            </p>
            <p className="mt-2 text-base text-white/85">Based in Chilliwack, BC</p>
          </div>
        </div>
      </section>

      {/* ---------- Conversation choice + form ---------- */}
      <section
        id="contact-form"
        data-section="Your enquiry"
        className="scroll-mt-24 bg-secondary py-24 sm:py-28"
      >
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Kicker>Two ways to start</Kicker>
              <h2 data-split className={`${HEADING} mt-6 text-balance`}>
                Choose the conversation that fits
              </h2>
              <ul className="mt-10 space-y-3">
                {CONVERSATIONS.map(({ icon: Icon, title, body }) => {
                  const active = form.nextStep === title;
                  return (
                    <li key={title} data-reveal>
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => choose(title)}
                        className={`group flex w-full gap-5 border p-6 text-left transition-colors duration-500 ${
                          active
                            ? "border-gold bg-background"
                            : "border-slate/20 hover:border-gold/60 hover:bg-background/60"
                        }`}
                      >
                        <span
                          className={`grid size-11 shrink-0 place-items-center border transition-colors duration-500 ${
                            active ? "border-gold bg-gold text-black" : "border-gold/60 text-gold"
                          }`}
                        >
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <span>
                          <span className="block font-serif text-2xl leading-tight">{title}</span>
                          <span className="mt-2 block text-base leading-relaxed text-muted-foreground">
                            {body}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="border-t-2 border-gold bg-background p-6 shadow-2xl shadow-brand-dark/10 sm:p-10 lg:p-12"
            >
              <h2 className="font-serif text-[clamp(1.75rem,1.4vw+1rem,2.5rem)] leading-tight text-foreground">
                Start your project conversation
              </h2>
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
                    className="mt-0.5 size-4 accent-gold"
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
                    <a
                      href="/terms"
                      className="font-bold text-primary underline underline-offset-2"
                    >
                      Terms
                    </a>
                    .
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden bg-gold px-6 text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors duration-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-[101%] bg-brand-dark transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
                  />
                  <span className="relative inline-flex items-center gap-2">
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      "Start your project conversation"
                    )}
                  </span>
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
