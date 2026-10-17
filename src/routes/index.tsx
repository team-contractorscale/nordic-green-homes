import { createFileRoute } from "@tanstack/react-router";
import { ASSETS } from "@/lib/content-data";
import {
  HomeHeroSection,
  HomeConsultationStrip,
  HomeBadgesSection,
  HomeServicesGrid,
} from "@/components/home/HomeSections";
import {
  HomeExpertsSection,
  HomeTrustedPartnerSection,
  HomeFourPillarsSection,
  HomeDesignPartnerBanner,
  HomeProcessSection,
  HomeEbookSection,
  HomeReviewsAndPortfolioSection,
} from "@/components/home/HomeSectionsMore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Nordic Green Homes | Net-Zero Custom Homes & Renovations Fraser Valley BC",
      },
      {
        name: "description",
        content:
          "Sustainable craftsmanship for families who demand more from their forever home. Net-Zero custom homes and high-performance renovations in Fraser Valley, Kelowna & Victoria, BC.",
      },
      {
        property: "og:title",
        content: "Nordic Green Homes | Net-Zero Custom Homes & Renovations",
      },
      {
        property: "og:description",
        content:
          "Sustainable craftsmanship for families who demand more from their forever home. Built on verified O'Brien Contracting Ltd. standards.",
      },
      { property: "og:image", content: ASSETS.hero1 },
      { name: "twitter:image", content: ASSETS.hero1 },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground">
      {/* 1. Architectural Hero with O'Brien headline and background rotation */}
      <HomeHeroSection />

      {/* 2. Direct Consultation bar (Book / Call / Hours) */}
      <HomeConsultationStrip />

      {/* 3. Credentials & verified builder badges */}
      <HomeBadgesSection />

      {/* 4. Core Services: "We Build What Moves Your Soul" */}
      <HomeServicesGrid />

      {/* 5. Experts in Custom Home Design (Dark architectural band with O'Brien Family) */}
      <HomeExpertsSection />

      {/* 6. Trusted Net-Zero Home Builder & Renovator (Lane & Kylie profile) */}
      <HomeTrustedPartnerSection />

      {/* 7. Four Pillars */}
      <HomeFourPillarsSection />

      {/* 8. Nordic Green Design Partner banner */}
      <HomeDesignPartnerBanner />

      {/* 9. 8-Step Process: "Building With Certainty" */}
      <HomeProcessSection />

      {/* 10. Ebook Guide: "Simple Changes to a Greener Home" */}
      <HomeEbookSection />

      {/* 11. Client Reviews ("Don't Take Our Word For It") & Signature Projects */}
      <HomeReviewsAndPortfolioSection />
    </div>
  );
}
