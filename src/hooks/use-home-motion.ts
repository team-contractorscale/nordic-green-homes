import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const MOTION = "(prefers-reduced-motion: no-preference)";
const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * useHomeMotion — the single GSAP orchestrator for the `/` homepage.
 *
 * Scoped to the returned ref; gsap.matchMedia reverts everything on unmount and when a media
 * query flips. Desktop-only effects (pinned gallery, stacking cards, pointer tilt/cursor) live
 * under DESKTOP. Under prefers-reduced-motion nothing animates and content is simply visible.
 */
export function useHomeMotion<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia(root);

    mm.add(REDUCED, () => {
      gsap.set(q("[data-hscroll-bar], [data-stack-fill]"), { scale: 1 });
    });

    /* ---------------- all viewports, motion allowed ---------------- */
    mm.add(MOTION, () => {
      // top scroll-progress bar
      const bar = q("[data-scroll-bar]")[0];
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: true },
          },
        );
      }

      // hero entrance, then the copy drifts up and fades as you scroll away
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(q('[data-anim="hero-eyebrow"]'), { y: 24, opacity: 0, duration: 0.7 })
        .from(q('[data-anim="hero-title"]'), { y: 56, opacity: 0, duration: 1 }, "-=0.3")
        .from(q('[data-anim="hero-body"]'), { y: 24, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(q('[data-anim="hero-cta"]'), { y: 22, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(q('[data-anim="hero-links"]'), { y: 18, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(q('[data-anim="hero-nav"]'), { opacity: 0, x: 30, duration: 0.8 }, "-=0.4");
      const heroCopy = q("[data-hero-content]")[0];
      if (heroCopy) {
        gsap.to(heroCopy, {
          yPercent: -18,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: heroCopy, start: "top 20%", end: "bottom top", scrub: true },
        });
      }
      q("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // scroll reveal for every tagged element: [data-reveal] / "left" / "right" / "scale".
      // Batched, so elements entering together cascade in order instead of popping at once.
      const FROM: Record<string, gsap.TweenVars> = {
        up: { y: 48 },
        left: { x: -48 },
        right: { x: 48 },
        scale: { scale: 0.94, y: 32 },
      };
      const revealEls = q("[data-reveal]");
      revealEls.forEach((el) => {
        const kind = el.getAttribute("data-reveal") || "up";
        gsap.set(el, { opacity: 0, ...(FROM[kind] ?? FROM["up"]) });
      });
      ScrollTrigger.batch(revealEls, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
          }),
      });

      // generic section-intro + image reveals
      q('[data-anim="reveal"]').forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      q("[data-reveal-img]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(8% 8% 8% 8% round 24px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      // What guides us — panels rise in with a staggered wipe
      const pillars = q("[data-pillar]");
      const firstPillar = pillars[0];
      if (firstPillar) {
        gsap.from(pillars, {
          y: 70,
          opacity: 0,
          clipPath: "inset(30% 0% 0% 0%)",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "clipPath",
          scrollTrigger: { trigger: firstPillar, start: "top 85%", once: true },
        });
      }

      // How we work — cards lift in (all viewports)
      q("[data-stack-card]").forEach((card) => {
        gsap.from(card.firstElementChild, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
      });

      // Guide — topics stagger, book floats
      const topics = q("[data-guide-topic]");
      const firstTopic = topics[0];
      if (firstTopic) {
        gsap.from(topics, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: firstTopic, start: "top 90%", once: true },
        });
      }
      const book = q("[data-book-scroll]")[0];
      if (book) {
        gsap.fromTo(
          book,
          { rotationY: -38, rotationX: 10, y: 40 },
          {
            rotationY: 0,
            rotationX: 0,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: book, start: "top bottom", end: "center 55%", scrub: 1 },
          },
        );
        const stage = q("[data-book-stage]")[0];
        if (stage) {
          gsap.to(stage, { y: -12, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
        }
      }
    });

    /* ---------------- desktop only ---------------- */
    mm.add(DESKTOP, () => {
      // How we work — covered cards shrink + dim as the next one stacks over them
      const cards = q("[data-stack-card]");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        const inner = card.firstElementChild;
        const dim = card.querySelector("[data-stack-dim]");
        if (!next || !inner) return;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: next, start: "top 85%", end: "top 25%", scrub: true },
        });
        tl.to(inner, { scale: 0.93, ease: "none", transformOrigin: "50% 0%" }, 0);
        if (dim) tl.to(dim, { opacity: 0.35, ease: "none" }, 0);
      });
      const navItems = q("[data-stage-nav]");
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (!self.isActive) return;
            navItems.forEach((n, j) => n.setAttribute("data-active", String(j === i)));
          },
        });
      });
      const stack = q("[data-stack]")[0];
      const fill = q("[data-stack-fill]")[0];
      if (stack && fill) {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: stack, start: "top 60%", end: "bottom 80%", scrub: true },
          },
        );
      }

      // Selected work — pin the section, scroll the track sideways
      const section = q("[data-hscroll]")[0] as HTMLElement | undefined;
      const track = q("[data-hscroll-track]")[0];
      if (section && track) {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        const hbar = q("[data-hscroll-bar]")[0];
        if (hbar) {
          gsap.fromTo(
            hbar,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${distance()}`,
                scrub: true,
              },
            },
          );
        }
        const bgWord = q("[data-hscroll-bg]")[0];
        if (bgWord) {
          gsap.fromTo(
            bgWord,
            { xPercent: 0 },
            {
              xPercent: -30,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${distance()}`,
                scrub: true,
              },
            },
          );
        }

        // gold "View" cursor following the pointer over cards
        const cursor = q("[data-hcursor]")[0];
        if (cursor) {
          const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3" });
          const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3" });
          const onMove = (e: PointerEvent) => {
            const r = section.getBoundingClientRect();
            xTo(e.clientX - r.left);
            yTo(e.clientY - r.top);
          };
          const show = () => gsap.to(cursor, { scale: 1, duration: 0.35, ease: "back.out(2)" });
          const hide = () => gsap.to(cursor, { scale: 0, duration: 0.25 });
          section.addEventListener("pointermove", onMove);
          const hcards = q("[data-hcard]");
          hcards.forEach((c) => {
            c.addEventListener("pointerenter", show);
            c.addEventListener("pointerleave", hide);
          });
          return () => {
            section.removeEventListener("pointermove", onMove);
            hcards.forEach((c) => {
              c.removeEventListener("pointerenter", show);
              c.removeEventListener("pointerleave", hide);
            });
          };
        }
      }
      return undefined;
    });

    // pointer tilt on the guide book (desktop, separate so it returns its own cleanup)
    mm.add(DESKTOP, () => {
      const stage = q("[data-book-stage]")[0] as HTMLElement | undefined;
      const book = q("[data-book]")[0];
      if (!stage || !book) return;
      const ry = gsap.quickTo(book, "rotationY", { duration: 0.8, ease: "power3" });
      const rx = gsap.quickTo(book, "rotationX", { duration: 0.8, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        ry(-24 + nx * 36);
        rx(6 - ny * 22);
      };
      const reset = () => {
        ry(-24);
        rx(6);
      };
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", reset);
      return () => {
        stage.removeEventListener("pointermove", onMove);
        stage.removeEventListener("pointerleave", reset);
      };
    });

    // Triggers were created per-feature, not in page order; the pinned gallery adds scroll length
    // to everything below it. Sort by position so pins are measured first, then recompute.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    // images that finish loading after setup change section heights → recompute pins
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      mm.revert();
    };
  }, []);

  return ref;
}
