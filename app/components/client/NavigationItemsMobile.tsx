"use client";

import { useActiveSection } from "@/app/hooks/useActiveSection";
import { BookOpen, CircleQuestionMark, Home, Mail, User } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const NavigationItemsMobile = () => { 
  const ITEMS = [
    { label: "Home", Icon: Home },
    { label: "Courses", Icon: BookOpen },
    { label: "Founders", Icon: User },
    { label: "Faq", Icon: CircleQuestionMark },
    { label: "Contact", Icon: Mail },
  ];
  const IDS = ITEMS.map(({ label }) => label);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const hasAnimated = useRef(false);
  const { active, scrollToSection } = useActiveSection(IDS);

  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const state = { fontWeight: i === active ? 700 : 400, scale: i === active ? 1.05 : 1 };
      if (hasAnimated.current) {
        gsap.to(el, { ...state, duration: 0.18, overwrite: "auto" });
      } else {
        gsap.set(el, state);
      }
    });
    hasAnimated.current = true;
  }, [active]);

  const handleHoverEnter = (index: number) => {
    if (index === active) return;
    const el = itemRefs.current[index];
    if (el) {
      gsap.to(el, { scale: 1.05, duration: 0.2, overwrite: "auto" });
    }
  };

  const handleHoverLeave = (index: number) => {
    if (index === active) return;
    const el = itemRefs.current[index];
    if (el) {
      gsap.to(el, { scale: 1, duration: 0.2, overwrite: "auto" });
    }
  };

  return (
    <ul className="flex items-center justify-around  gap-8 font-body">
      {ITEMS.map(({ label, Icon }, i) => (
        <li
          key={label}
          ref={(el: HTMLLIElement | null) => void (itemRefs.current[i] = el)}
          onClick={() => scrollToSection(i)}
          onMouseEnter={() => handleHoverEnter(i)}
          onMouseLeave={() => handleHoverLeave(i)}
          className={`cursor-pointer select-none transition-transform flex flex-col items-center justify-center gap-1 ${active === i ? "font-bold" : ""}`}
          role="button"
          aria-current={active === i ? "page" : undefined}
        >
          <Icon size={18} color={active === i ? "rgb(30, 58, 138)" : "currentColor"} />
          <span className={`text-xs ${active === i ? "text-blue-950" : "text-gray-700"}`}>
            {label}
          </span>
        </li>
      ))}
    </ul>
  )
}