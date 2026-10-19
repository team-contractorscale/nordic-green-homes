import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CinematicHero } from "./sections/Hero";
import { PhilosophySection } from "./sections/Philosophy";
import { ApproachSection } from "./sections/Approach";
import { ServicesSection } from "./sections/Services";
import { JourneySection } from "./sections/Journey";
import { AssuranceStrip } from "./sections/Assurance";
import { ReferenceSection } from "./sections/Reference";
import { FinalCta } from "./sections/FinalCta";

gsap.registerPlugin(ScrollTrigger);

/**
 * CinematicHome — the /home-2 orchestrator.
 *
 * Sections live in ./sections/* (each focused + reviewable). GSAP wiring is
 * the only thing kept here. All animation respects prefers-reduced-motion:
 * under reduced motion, content snaps to its final visible state and the
 * pinned horizontal services scroll is disabled.
 */
export function CinematicHome() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-reveal-img]", { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      /* ---- Hero entrance timeline ---- */
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from('[data-anim="hero-eyebrow"]', { y: 24, opacity: 0, duration: 0.7 })
        .from('[data-anim="hero-title"]', { y: 60, opacity: 0, duration: 1.1 }, "-=0.3")
        .from('[data-anim="hero-body"]', { y: 28, opacity: 0, duration: 0.8 }, "-=0.6")
        .from('[data-anim="hero-cta"]', { y: 24, opacity: 0, duration: 0.7 }, "-=0.4")
        .from('[data-anim="hero-cue"]', { opacity: 0, duration: 0.6 }, "-=0.2");

      /* ---- Generic section-intro reveals ---- */
      gsap.utils.toArray<HTMLElement>('[data-anim="reveal"]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
        });
      });

      /* ---- Image clip reveals + subtle inner parallax ---- */
      gsap.utils.toArray<HTMLElement>("[data-reveal-img]").forEach((img) => {
        gsap.to(img, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: img, start: "top 88%", toggleActions: "play none none none" },
        });
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      /* ---- Pillars: scrubbed stagger ---- */
      gsap.utils.toArray<HTMLElement>("[data-pillar]").forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.04,
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      /* ---- Approach facets ---- */
      gsap.utils.toArray<HTMLElement>("[data-facet]").forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });

      /* ---- Journey: progress rail fill + stage reveals ---- */
      const journey = root.querySelector<HTMLElement>("[data-journey]");
      const fill = root.querySelector<HTMLElement>("[data-journey-fill]");
      if (journey && fill) {
        gsap.to(fill, {
          height: "100%",
          ease: "none",
          scrollTrigger: { trigger: journey, start: "top 80%", end: "bottom 75%", scrub: true },
        });
      }
      gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((el) => {
        gsap.from(el, {
          x: -24,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
        });
      });

      /* ---- Services: pinned horizontal scroll, desktop + motion only ---- */
      gsap
        .matchMedia()
        .add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          const track = root.querySelector<HTMLElement>("[data-services-track]");
          const section = root.querySelector<HTMLElement>('[data-anim="services"]');
          if (!track || !section) return;
          const distance = () => Math.max(track.scrollWidth - window.innerWidth, 1);
          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => "+=" + distance(),
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          return () => {
            tween?.scrollTrigger?.kill();
            gsap.set(track, { clearProps: "x,transform" });
          };
        });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="cinematic-home">
      <CinematicHero />
      <PhilosophySection />
      <ApproachSection />
      <ServicesSection />
      <JourneySection />
      <AssuranceStrip />
      <ReferenceSection />
      <FinalCta />
    </div>
  );
}
