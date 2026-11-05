import { acceptedMetadata } from "@/lib/accepted-metadata";
import { createFileRoute } from "@tanstack/react-router";
import { IMAGES } from "@/lib/home-content";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { HomeHero } from "@/components/home/HomeHero";
import { ScrollProgress, SectionIndicator } from "@/components/home/kit";
import {
  HomeClosing,
  HomeFaqs,
  HomeIntro,
  HomeMarquee,
  HomeServices,
  HomeTeam,
} from "@/components/home/HomeSections";
import { HomePillars } from "@/components/home/HomePillars";
import { HomeAssurance } from "@/components/home/HomeAssurance";
import { HomeProjects } from "@/components/home/HomeProjects";

const TITLE = "Nordic Green Homes | Sustainable Luxury. Built Around Your Life.";
const DESCRIPTION =
  "A home with presence, purpose and room for the life you want to lead. Sustainable luxury custom homes in Vancouver, West Van, North Van, Richmond, Tsawwassen and Vancouver Island.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      ...acceptedMetadata("/"),
      { property: "og:image", content: IMAGES.hero.src },
      { name: "twitter:image", content: IMAGES.hero.src },
    ],
  }),
  component: Index,
});

// Highwater Homes layout: dark/light alternation down the page.
// Order follows the client homepage content (2026-11-04): hero (dark) → marquee band →
// design and budget → more time for living + 3D drawing (dark) → Lane and Kylie → services
// (dark) → four pillars → selected work (gallery) → start here (dark) → FAQs.
function Index() {
  const ref = useHomeMotion<HTMLDivElement>();
  return (
    <div ref={ref} className="home-root">
      <ScrollProgress />
      {/* Intro curtain: brand mark + counter, lifted by GSAP before the hero plays (once per
          session; never shown for reduced motion or without JS — see .home-loader). */}
      <div
        data-loader
        aria-hidden
        className="home-loader fixed inset-0 z-[100] flex-col justify-between bg-brand-dark p-6 text-white sm:p-10"
      >
        <div className="flex items-center gap-3">
          <img src="/brand/nordic-logo-light.png" alt="" className="h-20 w-auto sm:h-24" />
        </div>
        <div className="flex items-end justify-between gap-6">
          <p className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-tight">
            Nordic Green Homes
            <span className="mt-2 block font-sans text-xs font-bold uppercase tracking-[0.24em] text-gold">
              Sustainable luxury custom homes
            </span>
          </p>
          <span
            data-loader-count
            className="font-serif text-[clamp(4rem,12vw,10rem)] leading-none tabular-nums text-white/90"
          >
            0
          </span>
        </div>
        <span
          data-loader-bar
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gold"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <SectionIndicator />

      <HomeHero />
      <HomeMarquee />
      <HomeIntro />
      <HomeAssurance />
      <HomeTeam />
      <HomeServices />
      <HomePillars />
      <HomeProjects />
      <HomeClosing />
      <HomeFaqs />
    </div>
  );
}
