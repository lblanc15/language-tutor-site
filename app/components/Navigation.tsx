"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "../hooks/useActiveSection";

const ITEMS = ["Home", "Courses", "Founders", "Faq", "Contact"];

/** Height of the sticky header — the line a section has to cross to count as reached. */
const HEADER_OFFSET = 100;

export const Navigation = () => {
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
    <header className="hidden lg:flex justify-between items-center w-screen px-12 py-4 bg-slate-50 sticky top-0 z-999">
      <div className="flex gap-4 items-center">
        <Image alt="logo" src="/assets/images/aer-logo.png" width={60} height={60} className="h-10 w-10 sm:h-12 sm:w-12 lg:h-15 lg:w-15" priority />
        <div className="text-xs font-bold uppercase"><span className="text-blue-950">Academia <br /> de Español</span> <span className="text-red-800">Rico</span></div>
      </div>
      <div className="flex gap-12 items-center">
        <nav>
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
        </nav>
        <Button className="font-body text-xs px-5 font-bold bg-red-800 hover:bg-red-500 text-white" size="lg">Enroll now</Button>
      </div>
    </header>
  );
};
