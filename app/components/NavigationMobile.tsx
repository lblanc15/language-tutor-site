"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, Info, BookOpen, Calendar, Mail, User, CircleQuestionMark } from "lucide-react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const ITEMS = [
  { label: "Home", Icon: Home },
  { label: "Courses", Icon: BookOpen },
  { label: "Founders", Icon: User },
  { label: "Faq", Icon: CircleQuestionMark },
  { label: "Contact", Icon: Mail },
];

gsap.registerPlugin(ScrollToPlugin);

export const NavigationMobile = () => {
  const [active, setActive] = useState<number>(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { fontWeight: i === active ? 700 : 400 });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (index: number, title: string) => {
    if (index === active) return;
    const prev = itemRefs.current[active];
    const next = itemRefs.current[index];

    if (prev) {
      gsap.to(prev, { fontWeight: 400, scale: 1, duration: 0.18 });
    }
    if (next) {
      gsap.to(next, {
        fontWeight: 700,
        scale: 1.2,
        duration: 0.18,
        onComplete: () => setActive(index),
      });

      gsap.to(window, {
        duration: 1,
         scrollTo: {
          y: `#${title}`,
        },
        ease: "power2.out",
      })
    } else {
      setActive(index);
    }
  };

  const handleHoverEnter = (index: number) => {
    if (index === active) return;
    const el = itemRefs.current[index];
    if (el) {
      gsap.to(el, { scale: 1.15, duration: 0.2, overwrite: "auto" });
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
    <header className="flex lg:hidden justify-between items-center w-full p-6 bg-slate-200 rounded-t-3xl fixed bottom-0 left-0 z-50">
        <nav className="w-full">
          <ul className="flex items-center justify-around  gap-8 font-body">
            {ITEMS.map(({ label, Icon }, i) => (
              <li
                key={label}
                ref={(el: HTMLLIElement | null) => void (itemRefs.current[i] = el)}
                onClick={() => handleClick(i, label)}
                onMouseEnter={() => handleHoverEnter(i)}
                onMouseLeave={() => handleHoverLeave(i)}
                className={`cursor-pointer select-none transition-transform flex flex-col items-center justify-center gap-1 ${active === i ? "font-bold" : ""}`}
                role="button"
                aria-current={active === i ? "page" : undefined}
              >
                <Icon size={24} color={active === i ? "rgb(30, 58, 138)" : "currentColor"} />
                <span className={`text-xs ${active === i ? "text-blue-950" : "text-gray-700"}`}>
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </nav>
    </header>
  );
};