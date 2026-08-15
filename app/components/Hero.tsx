"use client";

import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const bilingualPairs = [
  {
    en: "Learn it today,",
    es: "Aprende hoy,",
    accentEn: "Use it right away.",
    accentEs: "Úsalo de inmediato.",
  }
];

export const Hero = () => {
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
    <section id="Home" className="flex flex-col lg:h-[calc(100%-92px)] lg:flex-row items-center lg:pt-23 lg:px-12">
      <div className="order-2 lg:order-1 lg:basis-1/2 font-body px-6 lg:px-0">
        <div className="flex gap-3 items-center lg:hidden mb-8">
          <Image alt="logo" src="/assets/images/aer-logo.png" width={60} height={60} className="h-18 w-18 sm:h-12 sm:w-12 lg:h-15 lg:w-15" priority />
          <div className="text-lg font-bold uppercase leading-6"><span className="text-blue-950">Academia <br /> de Español</span> <span className="text-red-800">Rico</span></div>
        </div>
        <h1 className="text-4xl lg:text-6xl font-heading font-bold text-blue-950 mb-8 leading-8 lg:leading-14">
          <span ref={lineOneRef} key={`${activeIndex}-${isSpanish ? "es" : "en"}`} className="block mb-3">{lineOne}</span>
          <span ref={lineTwoRef} className="block text-red-800">{lineTwo}</span>
        </h1>
        <hr className="w-42 border border-amber-600 mb-6" />
        <p className="text-xl font-bold tracking-wide text-blue-950 mb-4">Practical. Effective. Personal.</p>
        <p className="max-w-lg mb-8">Online Spanish classes for Filipino learners who want to build confidence and open doors to more opportunities.</p>
        <div className="flex gap-2">
          <Button className="font-body text-xs px-8 font-bold bg-red-800 hover:bg-red-500 text-white" size="lg">Enroll now</Button>
          <Button className="font-body text-xs px-8 font-bold border border-gray-500" variant="outline" size="lg">Learn More</Button>
        </div>
      </div>
      <div className="h-[45vh] aspect-video w-full order-1 lg:order-2 lg:basis-1/2 lg:h-full relative">
        <Image className="aspect-video object-cover" src="/assets/images/hero-splash.png" alt="splash" fill />
      </div>
    </section>
  );
};