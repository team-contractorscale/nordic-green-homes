import { createFileRoute, type LinkProps } from "@tanstack/react-router";
import { CTA, IMAGES } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { RefTag, imgProps } from "@/components/home/shared";
import {
  HEADING,
  Kicker,
  LineLink,
  RelatedLinks,
  ScrollProgress,
  SectionIndicator,
  SweepLink,
  HeroTitle,
} from "@/components/home/kit";
import { HomeClosing } from "@/components/home/HomeSections";

/* Why Choose Us — homepage design language and motion (useHomeMotion + home kit).
 * Copy is the client-supplied Why Choose Us content (2026-11-04).
 * Order: hero (dark) → a clearer brief → decisions made with care (dark) → start with your
 * project (dark CTA) → related pages.
 */

const TITLE = "Why Choose Us | Nordic Green Homes";
const DESCRIPTION =
  "The best custom homes begin with more than a style reference. They begin with how you move through the day, what the site can support and which decisions will matter long after handover.";
const HERO_IMAGE = IMAGES.hausPatio;

const HERO = {
  eyebrow: "Why Choose Us",
  // Masked lines; no word left alone, last line in gold.
  lines: ["Plan the home", "around the way", "you live."],
  body: [
    DESCRIPTION,
    "Nordic Green Homes brings design, performance, materials and construction planning together early, so you can understand the choices before they become expensive to change.",
  ],
};

const BRIEF = {
  title: "A clearer brief",
  manifesto:
    "You should not have to choose finishes before the bigger questions are understood. Start with the site, your household, the spaces you need and the way you want the home to feel. From there, work through layout, orientation, materials, comfort, maintenance and performance goals.",
  close: "Each choice affects the next one. A clear brief keeps those connections visible.",
  // The two stages named in the paragraph above, set as a visual sequence.
  rows: [
    { label: "Start with", items: ["Site", "Household", "Spaces you need", "How it should feel"] },
    {
      label: "Then work through",
      items: ["Layout", "Orientation", "Materials", "Comfort", "Maintenance", "Performance"],
    },
  ],
};

const DECISIONS = {
  title: "Decisions made with care",
  items: [
    {
      title: "Design that earns its place",
      body: "Good design is not decoration added at the end. It shapes light, movement, storage, privacy and the way the home supports everyday life.",
    },
    {
      title: "Performance with evidence",
      body: "Comfort and energy goals need clear targets, sound advice and evidence from the project. Broad labels alone cannot show how a home will perform.",
    },
    {
      title: "Construction considered early",
      body: "Materials, approvals, sequencing and buildability affect the design. Bringing those questions into the conversation early helps surface trade-offs while there is still time to make a considered choice.",
    },
    {
      title: "A direct conversation",
      body: "Your project should have a clear next step, a visible set of assumptions and named responsibilities. The project information should set out the delivery model and team roles clearly.",
    },
  ],
};

const RELATED_LINKS = [
  { label: "About Nordic Green Homes", to: "/about-us" },
  { label: "Our approach to your home", to: "/about-us/our-approach" },
  { label: CTA.estimate.label, to: CTA.estimate.to },
  { label: CTA.call.label, to: CTA.call.to },
] satisfies { label: string; to: LinkProps["to"] }[];

export const Route = createFileRoute("/about-us/why-choose-us")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: HERO_IMAGE.src },
      { name: "twitter:image", content: HERO_IMAGE.src },
    ],
  }),
  component: WhyChooseUsPage,
});

function WhyChooseUsPage() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      <SectionIndicator />
      <WhyHero />
      <Brief />
      <Decisions />
      <HomeClosing
        title="Start with your project"
        body="Tell us what you are planning, where the property is and what matters most to your household. The first conversation is for understanding the brief and identifying the questions that need answers."
        note={null}
        link={null}
      />
      <RelatedLinks links={RELATED_LINKS} />
    </div>
  );
}

/* ---------- Hero ----------
 * Full-bleed editorial cover: the render fills the screen (settles out of a blur, parallax on
 * scroll) under a bottom-weighted scrim; the H1 sits low on the left, the two intro paragraphs
 * and CTAs low on the right, like a magazine opener. The rail lists the four decisions.
 */
function WhyHero() {
  return (
    <section
      data-section="Why Choose Us"
      className="grain relative isolate overflow-hidden bg-overlay text-white"
    >
      <div data-anim="photo" className="absolute inset-0 -z-10 overflow-hidden">
        <div data-photo-inner className="absolute inset-x-0 -inset-y-[6%]">
          <img
            {...imgProps(HERO_IMAGE, "100vw")}
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </div>
        <div aria-hidden className="absolute inset-0 bg-overlay/45" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-overlay via-overlay/85 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-overlay/70 to-transparent"
        />
      </div>
      <RefTag image={HERO_IMAGE} className="right-5 top-36 sm:right-8 lg:top-40" />

      <div className="wrap flex min-h-svh flex-col justify-end pt-40">
        <div data-hero-copy className="grid gap-10 pb-12 lg:grid-cols-12 lg:items-end lg:pb-16">
          <div className="lg:col-span-7">
            <p
              data-anim="fade"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              {HERO.eyebrow}
            </p>
            <HeroTitle lines={HERO.lines} max="5.75rem" className="mt-7" />
          </div>
          <div className="lg:col-span-5">
            <div className="space-y-4 text-base leading-relaxed text-white/85">
              {HERO.body.map((p, i) => (
                <p
                  key={p}
                  data-anim="fade"
                  className={i === 0 ? "font-serif text-xl leading-snug text-white" : ""}
                >
                  {p}
                </p>
              ))}
            </div>
            <div data-anim="fade" className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <SweepLink to={CTA.estimate.to}>{CTA.estimate.label}</SweepLink>
              <LineLink to={CTA.call.to} dark>
                {CTA.call.label}
              </LineLink>
            </div>
          </div>
        </div>

        {/* rail: the four decisions, linking down the page */}
        <nav aria-label="Decisions made with care" className="relative">
          <span
            data-rule
            aria-hidden
            className="absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 origin-left bg-white/20"
          />
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {DECISIONS.items.map((d, i) => (
              <li key={d.title} data-anim="stat" className="border-l border-white/15 pl-4 lg:pl-5">
                <a href="#decisions" className="group block py-5 pr-3 lg:py-7">
                  <span className="text-xs font-bold tracking-[0.2em] text-gold">0{i + 1}</span>
                  <span className="mt-2 block font-serif text-lg leading-tight transition-colors duration-300 group-hover:text-gold sm:text-xl">
                    {d.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

/* ---------- A clearer brief ----------
 * The paragraph lights up word by word (pinned on lg, [data-manifesto]); below, the two stages
 * it names are set as a sequence of outlined labels, and the closing line as a gold-rule note.
 */
function Brief() {
  return (
    <div>
      <section
        data-manifesto
        data-section="A clearer brief"
        className="bg-background py-24 sm:py-28 lg:flex lg:min-h-svh lg:items-center"
      >
        <div className="wrap">
          <Kicker>Why Nordic</Kicker>
          <h2 data-split className={`${HEADING} mt-6`}>
            {BRIEF.title}
          </h2>
          <p
            data-manifesto-text
            className="mt-10 max-w-5xl font-serif text-[clamp(1.5rem,1.6vw+1rem,2.5rem)] leading-[1.25] tracking-[-0.01em] text-foreground"
          >
            {BRIEF.manifesto}
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-background pb-24 pt-14 sm:pb-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            {BRIEF.rows.map((row, r) => (
              <div key={row.label} className="grid gap-4 sm:grid-cols-[10rem_1fr] sm:items-start">
                <p className="flex items-center gap-3 pt-2 text-xs font-bold uppercase tracking-[0.22em] text-slate">
                  <span className="text-gold">0{r + 1}</span>
                  {row.label}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {row.items.map((item) => (
                    <li
                      key={item}
                      data-reveal
                      className="border border-slate/25 px-4 py-2 font-serif text-lg transition-colors duration-300 hover:border-gold hover:bg-gold/10"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p
            data-reveal="left"
            className="self-end border-l-2 border-gold pl-6 font-serif text-2xl leading-snug lg:col-span-4"
          >
            {BRIEF.close}
          </p>
        </div>
      </section>
    </div>
  );
}

/* ---------- Decisions made with care ----------
 * Dark hairline grid: heading cell, then the four decisions. Tiles fold in on scroll and tilt
 * toward the cursor ([data-tile]); outlined numbers rise out of their masks and fill gold on
 * hover ([data-num]).
 */
function Decisions() {
  return (
    <section
      id="decisions"
      data-section="Decisions"
      className="grain relative bg-overlay py-24 text-white sm:py-32"
    >
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker dark>How we work</Kicker>
            <h2 data-split className={`${HEADING} mt-6`}>
              {DECISIONS.title}
            </h2>
          </div>
        </div>
        <div className="mt-14 grid gap-px border border-white/10 bg-white/10 [perspective:1400px] md:grid-cols-2">
          {DECISIONS.items.map((d, i) => (
            <article
              key={d.title}
              data-tile
              className="group relative flex min-h-[18rem] flex-col bg-overlay p-8 transition-colors duration-500 hover:bg-brand-dark lg:min-h-[20rem] lg:p-12"
            >
              <span className="block overflow-hidden">
                <span
                  data-num
                  className="block font-serif text-6xl leading-none text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_rgb(255_255_255/0.45)] group-hover:text-gold group-hover:[-webkit-text-stroke:1px_var(--gold)]"
                >
                  0{i + 1}
                </span>
              </span>
              <h3 className="mt-auto pt-10 font-serif text-[clamp(1.5rem,1vw+1rem,2.25rem)] leading-tight">
                <span className="relative">
                  {d.title}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
                  />
                </span>
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">{d.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
