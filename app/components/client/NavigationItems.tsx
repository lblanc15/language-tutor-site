"use client";

import { useActiveSection } from "@/app/hooks/useActiveSection";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const NavigationItems = () => { 
  const ITEMS = ["Home", "Courses", "Founders", "Faq", "Contact"];
  const HEADER_OFFSET = 100;
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const hasAnimated = useRef(false);
  const { active, scrollToSection } = useActiveSection(ITEMS, { offset: HEADER_OFFSET });

  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const fontWeight = i === active ? 700 : 400;
      if (hasAnimated.current) {
        gsap.to(el, { fontWeight, duration: 0.18, overwrite: "auto" });
      } else {
        gsap.set(el, { fontWeight });
      }
    });
    hasAnimated.current = true;
  }, [active]);

  return (
    <ul className="flex gap-8 font-body">
      {ITEMS.map((label, i) => (
        <li
          key={label}
          ref={(el: HTMLLIElement | null) => void (itemRefs.current[i] = el)}
          onClick={() => scrollToSection(i)}
          className={`cursor-pointer text-xs select-none ${active === i ? "font-bold" : ""}`}
          role="button"
          aria-current={active === i ? "page" : undefined}
        >
          {label}
        </li>
      ))}
    </ul>
  )
};