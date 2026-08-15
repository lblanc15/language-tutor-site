"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dot } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export const Founders = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".founders-kicker",
        { opacity: 0, y: 18, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".founders-kicker",
            start: "top 90%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".founder-article",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".founder-article",
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".founder-photo",
        { opacity: 0, x: -24, scale: 0.97 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".founder-photo",
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".founder-copy",
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".founder-copy",
            start: "top 82%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="Founders" ref={sectionRef} className="mt-8 lg:mt-18 py-4 px-6 lg:px-12">
      <div className="founders-kicker uppercase mb-6 px-4 py-2 rounded-full border border-slate-700 font-body font-light text-xs w-fit">Founders</div>
      <article className="founder-article lg:grid lg:grid-cols-[1fr_1.3fr] gap-12 items-center">
        <div className="founder-photo relative aspect-3/4 h-130 w-full overflow-hidden rounded-lg mb-6 lg:mt-0">
          <Image
            src="/assets/images/co-founder.jpg"
            alt="founder"
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="founder-copy">
          <h2 className="font-semibold text-xl">Jasper Genes Rico</h2>
          <h3 className="text-sm font-body text-red-800 mb-2">Founder & Lead Instructor</h3>
          <ul className="relative text-sm mb-2 font-body">
            <li className="w-0.5 h-5/7 bg-amber-500 absolute top-1/8 left-5"></li>
            <li className="flex relative z-1 font-bold items-center">
              <Dot className="text-amber-600" size={42}/>
              <p className="text-xs font-normal">Bachelor of Secondary Education major in English</p>
            </li>
            <li className="flex relative z-1 font-bold items-center">
              <Dot className="text-amber-600" size={42}/>
              <p className="text-xs font-normal">6 years in BPO industry</p>
            </li>
            <li className="flex relative z-1 font-bold items-center">
              <Dot className="text-amber-600" size={42}/>
              <p className="text-xs font-normal">4 years as Spanish Bilingual</p>
            </li>
            <li className="flex relative z-1 font-bold items-center">
              <Dot className="text-amber-600" size={42}/>
              <p className="text-xs font-normal">Began teaching Spanish in 2024</p>
            </li>
          </ul>
          <p className="font-body">He focuses on simple explanations, guided practice, real-life conversations, and helping students build confidence in using Spanish.</p>
        </div>
      </article>
      <article className="founder-article grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center mt-6">
        <div className="founder-copy order-2 lg:order-1">
          <h2 className="font-semibold text-xl">Leizel Sumayod Rico</h2>
          <h3 className="text-sm font-body text-red-800 mb-2">Co-Founder & Administrator</h3>
          <ul className="relative text-sm mb-2 font-body">
            <li className="w-0.5 h-5/7 bg-amber-500 absolute top-1/8 left-5"></li>
            <li className="flex relative z-1 font-bold items-center">
              <Dot className="text-amber-600" size={42}/>
              <p className="text-xs font-normal">Licensed Professional Teacher</p>
            </li>
            <li className="flex relative z-1 font-bold items-center">
              <Dot className="text-amber-600" size={42}/>
              <p className="text-xs font-normal">Bachelor of Secondary Education major in English</p>
            </li>
            <li className="flex relative z-1 font-bold items-center">
              <Dot className="text-amber-600" size={42}/>
              <p className="text-xs font-normal">4 years in BPO industry</p>
            </li>
            <li className="flex relative z-1 font-bold items-center">
              <Dot className="text-amber-600" size={42}/>
              <p className="text-xs font-normal">2 years as Spanish Bilingual Virtual Assistant</p>
            </li>
          </ul>
          <p className="font-body">She brings her teaching expertise and real-world experience to ensure effective and learner-friendly Spanish programs.</p>
        </div>
        <div className="founder-photo relative aspect-3/4 h-130 w-full overflow-hidden rounded-lg mt-12 lg:mt-0 lg:mb-6 order-1 lg:order-2">
          <Image
            src="/assets/images/founder.jpg"
            alt="founder"
            fill
            className="object-cover object-top"
          />
        </div>
      </article>
    </section>
  );
};
