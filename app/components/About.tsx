"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const revealRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const elements = revealRefs.current.filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const ctx = gsap.context(() => {
      elements.forEach((element, index) => {
        gsap.fromTo(
          element,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div
        ref={(el) => {
          revealRefs.current[0] = el;
        }}
        className="relative aspect-video"
      >
        <Image
          className="rounded-lg absolute object-cover"
          loading="eager"
          src="/assets/images/watermark.png"
          alt="About Image"
          fill
        />
      </div>

      <p
        ref={(el) => {
          revealRefs.current[2] = el;
        }}
        className="text-sm text-gray-600 leading-6"
      >
        <span className="text-xl mb-2 font-extrabold flex gap-2 items-center text-destructive/70">
          Spanish Foundations – Curso de Español
        </span>
         Is a beginner-friendly online program designed to help Filipino learners build a strong and practical foundation in Spanish.
      </p>

      <p
        ref={(el) => {
          revealRefs.current[1] = el;
        }}
        className="text-sm text-gray-600 leading-6"
      >
        <span className="text-xl mb-2 font-extrabold flex gap-2 items-center text-destructive/70">
          Live and Guided Learning
        </span>
        The course includes <b>30 live sessions</b> and <b>60 hours of guided learning</b> conducted through Google Meet. Students will develop essential skills in speaking, listening, reading, and writing through clear explanations, structured lessons, guided practice, conversations, activities, and assessments.
      </p>

      <div
        ref={(el) => {
          revealRefs.current[3] = el;
        }}
        className="relative aspect-video"
      >
        <Image
          className="rounded-lg absolute object-cover"
          loading="eager"
          src="/assets/images/watermark.png"
          alt="About Image"
          fill
        />
      </div>

      <div
        ref={(el) => {
          revealRefs.current[4] = el;
        }}
        className="relative aspect-video"
      >
        <Image
          className="rounded-lg absolute object-cover"
          loading="eager"
          src="/assets/images/watermark.png"
          alt="About Image"
          fill
        />
      </div>

      <p
        ref={(el) => {
          revealRefs.current[5] = el;
        }}
        className="text-sm text-gray-600 leading-6"
      >
        <span className="text-xl mb-2 font-extrabold flex gap-2 items-center text-destructive/70">
          A2 Guaranteed
        </span>
        The program begins with basic pronunciation, vocabulary, and sentence construction before progressing to more advanced topics such as past and future tenses, commands, object pronouns, and the subjunctive. By the end of the course, students are expected to reach a <b>solid A2 level</b> with progress toward B1, and communicate more confidently in Spanish for work, travel, and everyday situations
      </p>
    </div>
  );
};