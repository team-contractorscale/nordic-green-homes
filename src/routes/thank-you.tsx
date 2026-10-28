import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { H2 } from "@/components/home/NordicHome";
import { CheckCircle2, ArrowRight, ArrowUpRight, Clock, Mail } from "lucide-react";
import { IMAGES } from "@/lib/home-content";

const DESCRIPTION =
  "Thank you for reaching out to Nordic Green Homes. We have received your project enquiry and will be in touch shortly to arrange the next step.";

const HEADER_IMAGE = IMAGES.farmhouseRear.src;

const NEXT_STEPS = [
  {
    icon: Clock,
    title: "What happens next",
    body: "We review your project details and reach out to arrange a complimentary 15-minute discovery call at a time that suits you.",
  },
  {
    icon: Mail,
    title: "Watch for a message",
    body: "If you included a phone number or email, expect a message from the Nordic Green Homes team within the next business day.",
  },
];

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You | Nordic Green Homes" },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Thank You | Nordic Green Homes" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: HEADER_IMAGE },
      { name: "twitter:image", content: HEADER_IMAGE },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <div>
      <PageHeader
        image={HEADER_IMAGE}
        imageAlt={IMAGES.farmhouseRear.alt}
        eyebrow="Thank you"
        title="Your enquiry is in"
        description={DESCRIPTION}
      />

      <section className="bg-secondary/50 py-24 sm:py-28">
        <div className="wrap max-w-3xl">
          <div className="text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-white">
              <CheckCircle2 className="size-8" aria-hidden />
            </div>
            <h2 className={`${H2} mt-8`}>Thank you — your enquiry is in</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              We have received your project details and will be in touch shortly to arrange the next
              step. If you included a phone number or email, watch for a message from the Nordic
              Green Homes team.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {NEXT_STEPS.map(({ icon: Icon, title, body }) => (
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

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              Back to home <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-input bg-background px-6 text-base font-bold text-foreground transition-colors hover:bg-muted"
            >
              Explore projects <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
