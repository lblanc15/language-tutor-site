"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";

type Founder = {
  role: string;
  name: string;
  image: string;
  bio: ReactNode;
};

const FOUNDERS: Founder[] = [
  {
    role: "Founder",
    name: "Leizel Sumayod Rico",
    image:"/assets/images/founder.jpg",
    bio: (
      <>
        She is a <b>Licensed Professional Teacher </b> and holds a Bachelor of Secondary Education
        degree, major in English. She has four years of experience in the BPO industry, including
        two years working in Spanish-bilingual roles.
        <br />
        <br />
        With her background in education and professional experience using Spanish, Leizel helps
        ensure that AER provides structured, practical, and learner-friendly programs for Filipino
        students.
      </>
    ),
  },
    {
    role: "Co-Founder",
    name: "Jasper Genes Rico",
    image:"/assets/images/co-founder.jpg",
    bio: (
      <>
        He holds a Bachelor of Secondary Education degree, major in English, and has four years
        of experience working in Spanish-bilingual roles.
        He began teaching Spanish in 2024 and helped create AER to provide Filipino learners
        with a clear, practical, and encouraging way to study the language
        <br />
        <br />
        His teaching approach focuses on simple explanations, guided practice, real-life
        conversations, and helping students build confidence in using Spanish for work, travel,
        and everyday communication.

      </>
    ),
  }
];

// Kept as a constant (not state) so the server-rendered markup and the first
// client paint match, and so React never fights gsap over the inline styles.
const INITIAL_ACTIVE = 0;

export const Founders = () => {
  const [active, setActive] = useState<number>(INITIAL_ACTIVE);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const textRef = useRef<HTMLDivElement | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          opacity: i === INITIAL_ACTIVE ? 1 : 0.45,
          scale: i === INITIAL_ACTIVE ? 1 : 0.98,
          width: i === INITIAL_ACTIVE ? "56%" : "40%",
        });
      });
    }, rootRef);

    ctxRef.current = ctx;
    return () => ctx.revert();
  }, []);

  const handleSelect = (index: number) => {
    if (index === active) return;

    ctxRef.current?.add(() => {
      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: i === index ? 1 : 0.45,
          scale: i === index ? 1 : 0.98,
          width: i === index ? "56%" : "40%",
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      });

      gsap
        .timeline({ overwrite: "auto" })
        .to(textRef.current, {
          autoAlpha: 0,
          y: 12,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => setActive(index),
        })
        .to(textRef.current, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" });
    });
  };

  const current = FOUNDERS[active];

  return (
    <div ref={rootRef} className="flex flex-col lg:flex-row justify-center items-start gap-6 py-4">
      <div ref={textRef} className="w-full lg:w-2/5">
        <h3 className="text-xl sm:text-2xl font-extrabold text-yellow-800">{current.role}</h3>
        <h4 className="text-base sm:text-lg font-semibold mt-2">{current.name}</h4>
        <p className="mt-4 text-sm text-gray-600 lg:pr-12">{current.bio}</p>
      </div>
      <div className="w-full lg:w-3/5 flex flex-col sm:flex-row flex-wrap gap-3">
        {FOUNDERS.map((founder, i) => (
          <button
            key={founder.name}
            type="button"
            ref={(el: HTMLButtonElement | null) => void (panelRefs.current[i] = el)}
            onClick={() => handleSelect(i)}
            aria-pressed={active === i}
            aria-label={`Show ${founder.name}`}
            // Below `sm` the panels stack, so they take the full column; the
            // 1/3-vs-2/3 split only reads as an active state side by side.
            className={`w-full h-56 sm:h-80 lg:h-120 rounded-lg relative overflow-hidden ${
              active === i ? "bg-amber-600" : "bg-amber-400"
            }`}
          >
            <Image className="absolute object-cover z-10" src={founder.image} alt={founder.name} fill />
          </button>
        ))}
      </div>
    </div>
  );
};
