import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MOTION = "(prefers-reduced-motion: no-preference)";
const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const POINTER =
  "(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)";

/**
 * useStoryMotion — all GSAP for /home-2, scoped to the returned ref.
 * gsap.matchMedia reverts every tween, pin and listener on unmount / media change.
 */
export function useStoryMotion<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const one = (sel: string) => q(sel)[0] as HTMLElement | undefined;
    const mm = gsap.matchMedia(root);

    /* ---------- every viewport, motion allowed ---------- */
    mm.add(MOTION, () => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(q("[data-split]"), { yPercent: 60, opacity: 0, duration: 1.2, stagger: 0.14 })
        .from(q("[data-fade]"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.7");

      q("[data-rise]").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // manifesto: words light up as you read down
      const words = q("[data-word]");
      if (words.length) {
        gsap.fromTo(
          words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: words[0]?.parentElement ?? root,
              start: "top 78%",
              end: "bottom 55%",
              scrub: true,
            },
          },
        );
      }

      // velocity marquee: steady drift, speeds up + reverses with scroll direction
      const velo = one("[data-velo]");
      if (velo) {
        let x = 0;
        let dir = 1;
        let boost = 0;
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            dir = self.direction;
            boost = Math.min(Math.abs(self.getVelocity()) / 120, 18);
          },
        });
        const tick = () => {
          const half = velo.scrollWidth / 2;
          x -= (0.6 + boost) * dir;
          if (x <= -half) x += half;
          if (x > 0) x -= half;
          boost *= 0.92;
          gsap.set(velo, { x, skewX: -boost * 0.25 * dir });
        };
        gsap.ticker.add(tick);
        return () => {
          gsap.ticker.remove(tick);
          st.kill();
        };
      }
      return undefined;
    });

    /* ---------- desktop: pins ---------- */
    mm.add(DESKTOP, () => {
      // hero: the photo settles and the copy drifts up as the hero scrolls away
      const hero = one("[data-story-hero]");
      if (hero) {
        const scroll = { trigger: hero, start: "top top", end: "bottom top", scrub: 1 };
        gsap.to(q("[data-hero-img]"), {
          scale: 1,
          yPercent: 6,
          ease: "none",
          scrollTrigger: scroll,
        });
        gsap.to(q("[data-hero-copy]"), {
          yPercent: -12,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: scroll,
        });
      }

      // five chapters: pinned, text swaps, image wipes, segmented progress
      const pin = one("[data-ch-pin]");
      if (pin) {
        const texts = q("[data-ch-text]");
        const imgs = q("[data-ch-img]");
        const segs = q("[data-ch-seg]");
        const num = one("[data-ch-num]");
        const steps = texts.length - 1;
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: `+=${steps * 90}%`,
            pin: true,
            scrub: 1,
            snap: { snapTo: 1 / steps, duration: 0.5, ease: "power1.inOut" },
            onUpdate: (self) => {
              if (num) num.textContent = `0${Math.round(self.progress * steps) + 1}`;
            },
          },
        });
        for (let i = 1; i <= steps; i++) {
          tl.to(texts[i - 1] ?? [], { autoAlpha: 0, y: -50, duration: 0.5 }, i - 1)
            .fromTo(
              texts[i] ?? [],
              { autoAlpha: 0, y: 50 },
              { autoAlpha: 1, y: 0, duration: 0.5 },
              i - 0.5,
            )
            .fromTo(
              imgs[i] ?? [],
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
              i - 1,
            )
            .fromTo(
              imgs[i]?.querySelector("img") ?? [],
              { scale: 1.15 },
              { scale: 1, duration: 1 },
              i - 1,
            )
            .fromTo(segs[i] ?? [], { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none" }, i - 1)
            // hide the covered image's reference tag so labels never stack
            .to(
              imgs[i - 1]?.querySelector("span[title]") ?? [],
              { autoAlpha: 0, duration: 0.2 },
              i - 0.6,
            );
        }
      }

      // assurance: pinned, framed image opens to full bleed, copy rises in
      const sec = one("[data-assure]");
      const frame = one("[data-assure-frame]");
      const aCopy = one("[data-assure-copy]");
      if (sec && frame) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sec, start: "top top", end: "+=100%", pin: true, scrub: 1 },
        });
        tl.fromTo(
          frame,
          { clipPath: "inset(12% 14% 12% 14% round 32px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", duration: 1 },
        );
        if (aCopy) tl.from(aCopy, { y: 60, opacity: 0, duration: 0.5 }, 0.45);
      }
    });

    /* ---------- desktop with a real pointer: hover physics ---------- */
    mm.add(POINTER, () => {
      const offs: Array<() => void> = [];
      const on = (el: Element, type: string, fn: (e: PointerEvent) => void) => {
        el.addEventListener(type, fn as EventListener);
        offs.push(() => el.removeEventListener(type, fn as EventListener));
      };

      // values: image follows the cursor and swaps per row
      const follow = one("[data-value-follow]");
      const list = one("[data-values] ul");
      if (follow && list) {
        const xTo = gsap.quickTo(follow, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(follow, "y", { duration: 0.6, ease: "power3" });
        const rTo = gsap.quickTo(follow, "rotation", { duration: 0.8, ease: "power3" });
        let lastX = 0;
        const imgs = q("[data-value-img]");
        on(list, "pointermove", (e) => {
          xTo(e.clientX);
          yTo(e.clientY);
          rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6));
          lastX = e.clientX;
        });
        on(list, "pointerenter", () =>
          gsap.to(follow, { scale: 1, duration: 0.5, ease: "back.out(1.6)" }),
        );
        on(list, "pointerleave", () => gsap.to(follow, { scale: 0, duration: 0.35 }));
        q("[data-value-row]").forEach((row) => {
          on(row, "pointerenter", () => {
            const idx = Number(row.getAttribute("data-value-row"));
            imgs.forEach((im, j) => gsap.to(im, { opacity: j === idx ? 1 : 0, duration: 0.4 }));
          });
        });
      }

      // service cards: 3D tilt + glare
      q("[data-tilt]").forEach((card) => {
        const el = card as HTMLElement;
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
        on(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width;
          const ny = (e.clientY - r.top) / r.height;
          ry((nx - 0.5) * 14);
          rx((0.5 - ny) * 12);
          el.style.setProperty("--gx", `${nx * 100}%`);
          el.style.setProperty("--gy", `${ny * 100}%`);
        });
        on(el, "pointerleave", () => {
          ry(0);
          rx(0);
        });
      });

      // magnetic CTA
      const mag = one("[data-magnet]");
      const btn = one("[data-magnet-btn]");
      if (mag && btn) {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
        on(mag, "pointermove", (e) => {
          const r = mag.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.45);
        });
        on(mag, "pointerleave", () => {
          xTo(0);
          yTo(0);
        });
      }

      return () => offs.forEach((off) => off());
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      mm.revert();
    };
  }, []);

  return ref;
}
