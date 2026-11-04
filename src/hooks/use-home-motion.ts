import { animate } from "animejs";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
// Pages share this orchestrator and omit sections freely (no rail, no gallery, …), so empty
// selections are expected, not bugs.
gsap.config({ nullTargetWarn: false });

const MOTION = "(prefers-reduced-motion: no-preference)";
const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const FINE = `${DESKTOP} and (hover: hover) and (pointer: fine)`;
const REDUCED = "(prefers-reduced-motion: reduce)";
const INTRO_KEY = "ngh-intro-seen";

/**
 * useHomeMotion — the GSAP orchestrator for the `/` homepage (Highwater motion language).
 *
 * Scoped to the returned ref; gsap.matchMedia reverts everything (tweens, pins, SplitText) on
 * unmount and when a media query flips. Pinning and pointer effects are desktop-only. Under
 * prefers-reduced-motion nothing animates and every section is simply visible. HomeAssurance owns
 * its own pin because it feeds a progress ref to the three.js drawing.
 */
export function useHomeMotion<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia(root);

    /* ---------------- all viewports, motion allowed ---------------- */
    mm.add(MOTION, () => {
      // top scroll-progress bar
      gsap.fromTo(
        q("[data-scroll-bar]"),
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: true },
        },
      );

      // Intro curtain (first homepage view per session): counter + rule run to 100, then the
      // curtain lifts and the hero plays underneath it. Later views skip straight to the hero.
      const intro = gsap.timeline({ delay: 0.15 });
      const loader = q("[data-loader]")[0];
      let seen = true;
      try {
        seen = sessionStorage.getItem(INTRO_KEY) === "1";
      } catch {
        // storage blocked: just play the intro
        seen = false;
      }
      if (loader && !seen) {
        const count = q("[data-loader-count]")[0];
        const n = { v: 0 };
        intro
          .to(n, {
            v: 100,
            duration: 1.3,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count) count.textContent = String(Math.round(n.v));
            },
          })
          .fromTo(
            q("[data-loader-bar]"),
            { scaleX: 0 },
            { scaleX: 1, duration: 1.3, ease: "power2.inOut" },
            0,
          )
          .to(loader, { yPercent: -100, duration: 1, ease: "expo.inOut" })
          .set(loader, { display: "none" })
          // Marked only once it has played (a reverted/interrupted run doesn't count).
          .call(() => {
            try {
              sessionStorage.setItem(INTRO_KEY, "1");
            } catch {
              // storage blocked: the intro simply plays again next time
            }
          });
      } else if (loader) {
        gsap.set(loader, { display: "none" });
      }

      // Hero: photo settles out of a blur + zoom, headline lines rise out of masks, then copy,
      // rule and rail. `[data-anim]` starts hidden via styles.css, so every tween sets autoAlpha.
      const heroIn = gsap
        .timeline()
        .fromTo(
          q("[data-photo-inner]"),
          { scale: 1.08 },
          { scale: 1, duration: 2.6, ease: "power3.out" },
          0,
        )
        .fromTo(
          q('[data-anim="photo"]'),
          { autoAlpha: 0, filter: "blur(14px)" },
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power2.inOut",
            clearProps: "filter",
          },
          0,
        )
        .fromTo(
          q('[data-anim="line"]'),
          { yPercent: 110, autoAlpha: 1 },
          { yPercent: 0, duration: 1.4, stagger: 0.12, ease: "expo.out" },
          0.5,
        )
        .fromTo(
          q('[data-anim="fade"]'),
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.08, ease: "expo.out" },
          0.8,
        )
        .fromTo(
          q("[data-rule]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 1.6, ease: "power3.inOut" },
          0.9,
        )
        .fromTo(
          q('[data-anim="stat"]'),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.07, ease: "expo.out" },
          1.1,
        );
      intro.add(heroIn, intro.duration() ? "-=0.55" : 0);

      // Marquee band: endless loop whose speed, direction and skew follow scroll velocity.
      const marquee = q("[data-marquee]")[0];
      if (marquee) {
        const loop = gsap.to(marquee, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
        const skew = gsap.quickTo(marquee, "skewX", { duration: 0.6, ease: "power3" });
        ScrollTrigger.create({
          trigger: marquee,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            gsap.to(loop, {
              timeScale: self.direction * (1 + Math.min(Math.abs(v) / 250, 5)),
              duration: 0.3,
              overwrite: true,
            });
            gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.3 });
            skew(gsap.utils.clamp(-8, 8, -v / 300));
          },
          onLeave: () => skew(0),
          onLeaveBack: () => skew(0),
        });
      }

      // Hero scroll: photo drifts slower than the page, copy lifts and fades.
      const hero = q("[data-hero-copy]")[0]?.closest("section");
      if (hero) {
        const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-photo-inner]"), { yPercent: 10, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-copy]"), {
          yPercent: -14,
          autoAlpha: 0.15,
          ease: "none",
          scrollTrigger: st,
        });
      }

      // Section headings: masked lines rise in (re-split on resize / font load).
      q("[data-split]").forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.2,
              stagger: 0.1,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        });
      });

      // Generic reveals: [data-reveal] / "left" / "right" / "scale", batched so groups cascade.
      const UP: gsap.TweenVars = { y: 40 };
      const FROM: Record<string, gsap.TweenVars> = {
        left: { x: -40 },
        right: { x: 40 },
        scale: { scale: 0.94, y: 32 },
      };
      const revealEls = q("[data-reveal]");
      revealEls.forEach((el) => {
        gsap.set(el, { autoAlpha: 0, ...(FROM[el.getAttribute("data-reveal") ?? ""] ?? UP) });
      });
      ScrollTrigger.batch(revealEls, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.08,
          }),
      });

      // Photos wipe open upward while the image settles from a zoom.
      q("[data-reveal-img]").forEach((el) => {
        const st = { trigger: el, start: "top 90%", once: true };
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", scrollTrigger: st },
        );
        const img = el.querySelector("img");
        if (img)
          gsap.fromTo(
            img,
            { scale: 1.25 },
            { scale: 1, duration: 2, ease: "expo.out", scrollTrigger: st },
          );
      });

      // Pillars: tiles fold down from their top edge, outlined numbers rise out of their masks.
      const tiles = q("[data-tile]");
      const [firstTile] = tiles;
      if (firstTile) {
        const st = { trigger: firstTile, start: "top 85%", once: true };
        gsap.from(tiles, {
          rotationX: -75,
          autoAlpha: 0,
          transformOrigin: "50% 0%",
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: st,
        });
        gsap.from(q("[data-num]"), {
          yPercent: 110,
          duration: 1.2,
          stagger: 0.1,
          delay: 0.3,
          ease: "expo.out",
          scrollTrigger: st,
        });
      }

      // Closing: the ghosted wordmark drifts sideways with scroll.
      const drift = q("[data-drift]")[0];
      if (drift) {
        gsap.fromTo(
          drift,
          { xPercent: 0 },
          {
            xPercent: -25,
            ease: "none",
            scrollTrigger: {
              trigger: drift.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    });

    /* ---------------- all viewports: Services doors (pins nothing, scrubbed) ---------------- */
    mm.add({ motion: MOTION, lg: "(min-width: 1024px)" }, (ctx) => {
      if (!ctx.conditions?.["motion"]) return;
      const UP = "inset(100% 0% 0% 0%)";
      const CLIP: Record<string, string> = {
        left: "inset(0% 0% 0% 100%)", // opens leftward from the seam on its right
        right: "inset(0% 100% 0% 0%)", // opens rightward from the seam on its left
      };
      q("[data-door]").forEach((door) => {
        const from = (ctx.conditions?.["lg"] && CLIP[door.getAttribute("data-door") ?? ""]) || UP;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: door, start: "top 95%", end: "top 45%", scrub: 0.6 },
        });
        tl.fromTo(door, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0);
        const img = door.querySelector("[data-door-img]");
        if (img) tl.fromTo(img, { scale: 1.35 }, { scale: 1, ease: "none" }, 0);
      });
    });

    /* ---------------- all viewports: Intro manifesto (pinned on lg) ---------------- */
    mm.add({ motion: MOTION, lg: "(min-width: 1024px)" }, (ctx) => {
      if (!ctx.conditions?.["motion"]) return;
      const section = q("[data-manifesto]")[0];
      const text = q("[data-manifesto-text]")[0];
      if (!section || !text) return;
      const split = SplitText.create(text, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: ctx.conditions["lg"]
            ? { trigger: section, start: "top top", end: "+=120%", pin: true, scrub: true }
            : { trigger: text, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    });

    /* ---------------- desktop + fine pointer ---------------- */
    mm.add(FINE, () => {
      const offs: Array<() => void> = [];
      const on = (el: Element, type: string, fn: (e: PointerEvent) => void) => {
        el.addEventListener(type, fn as EventListener);
        offs.push(() => el.removeEventListener(type, fn as EventListener));
      };

      // Selected work: gold "View" cursor following the pointer over cards.
      const section = q("[data-gallery]")[0];
      const cursor = q("[data-hcursor]")[0];
      if (section && cursor) {
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3" });
        on(section, "pointermove", (e) => {
          const r = section.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
        });
        q("[data-hcard]").forEach((c) => {
          on(c, "pointerenter", () =>
            gsap.to(cursor, { scale: 1, duration: 0.35, ease: "back.out(2)" }),
          );
          on(c, "pointerleave", () => gsap.to(cursor, { scale: 0, duration: 0.25 }));
        });
      }

      // Pillars: each tile tilts toward the cursor (±5°).
      q("[data-tile]").forEach((tile) => {
        const rx = gsap.quickTo(tile, "rotationX", { duration: 0.6, ease: "power3" });
        const ry = gsap.quickTo(tile, "rotationY", { duration: 0.6, ease: "power3" });
        on(tile, "pointermove", (e) => {
          const r = tile.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 10);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
        });
        on(tile, "pointerleave", () => {
          rx(0);
          ry(0);
        });
      });

      return () => offs.forEach((off) => off());
    });

    // Stage tracker (Process page, lg): the stage crossing mid-screen marks its index entry
    // active ([data-stage] → [data-stage-nav]); a gold line fills down the index with progress.
    mm.add("(min-width: 1024px)", () => {
      const navs = q("[data-stage-nav]");
      q("[data-stage]").forEach((stage, i) => {
        ScrollTrigger.create({
          trigger: stage,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive)
              navs.forEach((n, j) => n.setAttribute("data-active", String(j === i)));
          },
        });
      });
      const stages = q("[data-stages]")[0];
      if (stages && !window.matchMedia(REDUCED).matches) {
        gsap.fromTo(
          q("[data-stage-fill]"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: stages, start: "top 55%", end: "bottom 55%", scrub: true },
          },
        );
      }
    });

    // Section indicator (xl, left gutter): number + name of the section in view, swapped with an
    // Anime.js slide. Reduced motion swaps instantly.
    mm.add("(min-width: 1280px)", () => {
      const indicator = q("[data-indicator]")[0];
      const num = q("[data-indicator-num]")[0];
      const label = q("[data-indicator-label]")[0];
      if (!indicator || !num || !label) return;
      const reduce = window.matchMedia(REDUCED).matches;
      const sections = q("[data-section]");
      const total = String(sections.length).padStart(2, "0");
      const show = (i: number) => {
        const name = sections[i]?.getAttribute("data-section") ?? "";
        gsap.to(indicator, { opacity: i === 0 ? 0 : 1, duration: 0.4 });
        if (label.textContent === name) return;
        num.textContent = `${String(i + 1).padStart(2, "0")} / ${total}`;
        if (reduce) {
          label.textContent = name;
          return;
        }
        animate(label, {
          y: ["0%", "-110%"],
          duration: 250,
          ease: "inQuad",
          onComplete: () => {
            label.textContent = name;
            animate(label, { y: ["110%", "0%"], duration: 450, ease: "outExpo" });
          },
        });
      };
      sections.forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) show(i);
          },
        });
      });
    });

    // Triggers were created per-feature, not in page order, and pins add scroll length to
    // everything below them. Sort by position so pins are measured first, then recompute.
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
