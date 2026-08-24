"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const DynamicHeader = () => {
  const bilingualPairs = [
    {
      en: "Learn it today,",
      es: "Aprende hoy,",
      accentEn: "Use it right away.",
      accentEs: "Úsalo de inmediato.",
    }
  ];
  const [isSpanish, setIsSpanish] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const lineOneRef = useRef<HTMLSpanElement | null>(null);
  const lineTwoRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const cycle = setInterval(() => {
      setIsSpanish((prev) => !prev);
      setActiveIndex((prev) => (prev + 1) % bilingualPairs.length);
    }, 7000);

    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      lineOneRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 1.2 },
    ).fromTo(
      lineTwoRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1.2 },
      "-=0.75",
    );
  }, [activeIndex, isSpanish]);

  const current = bilingualPairs[activeIndex];
  const lineOne = isSpanish ? current.es : current.en;
  const lineTwo = isSpanish ? current.accentEs : current.accentEn;

  return (
    <h1 className="w-full text-4xl lg:text-6xl font-heading font-bold text-blue-950 mb-8 leading-8 lg:leading-14">
      <span ref={lineOneRef} key={`${activeIndex}-${isSpanish ? "es" : "en"}`} className="block mb-3">{lineOne}</span>
      <span ref={lineTwoRef} className="block text-red-800">{lineTwo}</span>
    </h1>
  )
}