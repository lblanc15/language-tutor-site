"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

type Options = {
  /** Px from the top of the viewport that counts as "reached" — match the sticky chrome height. */
  offset?: number;
  /** Slack so a section parked exactly on the line still reads as reached. */
  tolerance?: number;
};

/**
 * Tracks which of `ids` the reader has scrolled to, and scrolls to one on demand.
 * The spy is muted while a click-driven scroll is animating so the nav doesn't
 * flicker through every section it passes on the way.
 */
export const useActiveSection = (
  ids: readonly string[],
  { offset = 0, tolerance = 12 }: Options = {},
) => {
  const [active, setActive] = useState<number>(0);
  const lockedRef = useRef(false);

  useEffect(() => {
    let frame = 0;

    const resolve = () => {
      frame = 0;
      if (lockedRef.current) return;

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight > window.innerHeight + 4;
      if (scrollable && window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
        setActive(ids.length - 1);
        return;
      }

      const line = offset + tolerance;
      let next = 0;
      ids.forEach((id, i) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) next = i;
      });
      setActive(next);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(resolve);
    };

    resolve();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids, offset, tolerance]);

  const scrollToSection = useCallback(
    (index: number) => {
      const id = ids[index];
      if (!id || !document.getElementById(id)) return;

      lockedRef.current = true;
      setActive(index);

      const release = () => {
        lockedRef.current = false;
      };

      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${id}`, offsetY: offset },
        ease: "power2.out",
        onComplete: release,
        onInterrupt: release,
      });
    },
    [ids, offset],
  );

  return { active, scrollToSection };
};
