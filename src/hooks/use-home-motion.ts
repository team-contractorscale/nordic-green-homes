import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useHomeMotion — the single GSAP orchestrator for the `/` homepage.
 *
 * Everything is scoped to the returned ref so it reverts cleanly on unmount.
 * Under `prefers-reduced-motion` the hook snaps every `[data-anim]`,
 * `[data-reveal-img]` and the process rail fill to their final visible state
 * and creates no ScrollTriggers, so the page reads correctly with motion off.
 */
export function useHomeMotion<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-anim]", { opacity: 1, y: 0 });
        gsap.set("[data-reveal-img]", { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set("[data-rail-fill]", { scaleY: 1, transformOrigin: "top center" });
        return;
      }

      /* ---- Hero entrance timeline ---- */
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from('[data-anim="hero-eyebrow"]', { y: 24, opacity: 0, duration: 0.7 })
        .from('[data-anim="hero-title"]', { y: 56, opacity: 0, duration: 1 }, "-=0.3")
        .from('[data-anim="hero-body"]', { y: 24, opacity: 0, duration: 0.8 }, "-=0.5")
        .from('[data-anim="hero-cta"]', { y: 22, opacity: 0, duration: 0.7 }, "-=0.4")
        .from('[data-anim="hero-links"]', { y: 18, opacity: 0, duration: 0.7 }, "-=0.4")
        .from('[data-anim="hero-nav"]', { opacity: 0, duration: 0.8 }, "-=0.3");

      /* ---- Generic section-intro reveals ---- */
      gsap.utils.toArray<HTMLElement>('[data-anim="reveal"]').forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
        });
      });

      /* ---- Image clip reveals ---- */
      gsap.utils.toArray<HTMLElement>("[data-reveal-img]").forEach((img) => {
        gsap.set(img, { clipPath: "inset(6% 6% 6% 6%)" });
        gsap.to(img, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: img, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      /* ---- Pillar cards: staggered entrance, reversible on scroll-up ---- */
      gsap.utils.toArray<HTMLElement>("[data-pillar]").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.05,
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });

      /* ---- Process: scrubbed gold rail fill ---- */
      const rail = root.querySelector<HTMLElement>("[data-rail]");
      const fill = root.querySelector<HTMLElement>("[data-rail-fill]");
      if (rail && fill) {
        gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
        gsap.to(fill, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: rail, start: "top 70%", end: "bottom 80%", scrub: true },
        });
      }

      /* ---- Process stages: reveal each as it scrolls in ---- */
      gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
        });
      });

      /* ---- Guide cover card: single lift-in reveal ---- */
      const guideCard = root.querySelector<HTMLElement>("[data-guide-card]");
      if (guideCard) {
        gsap.from(guideCard, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: guideCard,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return ref;
}
