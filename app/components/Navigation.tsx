"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const ITEMS = ["Home", "About", "Courses", "Schedule", "Contact"];

export const Navigation = () => {
  const [active, setActive] = useState<number>(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { fontWeight: i === active ? 700 : 400 });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (index: number) => {
    if (index === active) return;
    const prev = itemRefs.current[active];
    const next = itemRefs.current[index];

    if (prev) gsap.to(prev, { fontWeight: 400, duration: 0.18 });
    if (next) {
      gsap.to(next, {
        fontWeight: 700,
        duration: 0.18,
        onComplete: () => setActive(index),
      });
    } else {
      setActive(index);
    }
  };

  return (
    <nav className="py-4 px-8 bg-slate-200 rounded-full">
      <ul className="flex gap-12">
        {ITEMS.map((label, i) => (
          <li
            key={label}
            ref={(el: HTMLLIElement | null) => void (itemRefs.current[i] = el)}
            onClick={() => handleClick(i)}
            className={`cursor-pointer text-xs select-none ${active === i ? "font-bold" : ""}`}
            role="button"
            aria-current={active === i ? "page" : undefined}
          >
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
};