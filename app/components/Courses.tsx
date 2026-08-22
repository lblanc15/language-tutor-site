"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarDays, ClockCheck, Goal, Keyboard, LucideCheck, LucideComputer } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export const Courses = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".courses-kicker", ".courses-copy", ".courses-item", ".courses-card"], {
        willChange: "transform, opacity",
      });

      gsap.fromTo(
        ".courses-kicker",
        { opacity: 0, y: 18, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".courses-kicker",
            start: "top 92%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".courses-copy",
        { opacity: 0, y: 34, scale: 0.98, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.1,
          ease: "power3.out",
          transformPerspective: 1000,
          scrollTrigger: {
            trigger: ".courses-copy",
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".courses-item",
        { opacity: 0, y: 22, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
          scrollTrigger: {
            trigger: ".courses-item",
            start: "top 88%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".courses-card",
        { opacity: 0, x: 26, y: 20, rotateY: 10 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotateY: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          transformPerspective: 1200,
          scrollTrigger: {
            trigger: ".courses-card",
            start: "top 86%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="Courses" ref={sectionRef} className="px-6 py-12 mt-18 bg-gray-100 rounded-lg lg:mx-12">
      <div className="courses-kicker uppercase mb-6 px-4 py-2 rounded-full border border-slate-700 font-body font-light text-xs w-fit">Courses</div>
      <article className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="courses-copy h-full basis-1/2 pr-4">
          <h2 className="text-2xl font-semibold uppercase mb-2 text-blue-950">Spanish Foundations – Curso de Español</h2>
          <p className="font-body lg:max-w-xl text-sm">A beginner-friendly online program designed to help Filipino learners build a strong and practical foundation in Spanish.</p>
          <ul className="mt-6 font-body flex flex-col gap-1 text-sm mb-12">
            <li className="courses-item flex gap-2 items-center"><LucideCheck className="text-amber-500" size={18} /> 30 live sessions (60 hours of learning)</li>
            <li className="courses-item flex gap-2 items-center"><LucideCheck className="text-amber-500" size={18} />Live classes via Google Meet</li>
            <li className="courses-item flex gap-2 items-center"><LucideCheck className="text-amber-500" size={18} />From basics to A2 level, with progress toward B1</li>
            <li className="courses-item flex gap-2 items-center"><LucideCheck className="text-amber-500" size={18} />Speaking, Listening, Reading, Writing, Grammar, Vocabulary, and more</li>
            <li className="courses-item flex gap-2 items-center"><LucideCheck className="text-amber-500" size={18} />Assessments in Sessions 10, 20, and 30</li>
          </ul>
        </div>
        <div className="basis-1/2 w-full mt-4 lg:mt-0 lg:mb-0">
          <ul className="shadow-sm bg-gray-50 rounded-lg w-full lg:w-3/5 mx-auto font-body">
            <li className="courses-card p-4 border-b border-gray-200 flex gap-4 items-center">
              <div className="p-2 rounded-lg bg-amber-500 *:flex items-center justify-center h-fit">
                <Goal className="text-white" size={18} />
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase">Level Goals</h3>
                <p className="text-xs">Zero to A2 <br/>with progress toward B1</p>
              </div>
            </li>
            <li className="courses-card p-4 border-b border-gray-200 flex gap-4 items-center">
              <div className="p-2 rounded-lg bg-amber-500 *:flex items-center justify-center h-fit">
                <Keyboard className="text-white" size={18} />
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase">Live Online Class</h3>
                <p className="text-xs">Interactive sessions <br/>via Google Meet</p>
              </div>
            </li>
            <li className="courses-card p-4 border-b border-gray-200  flex gap-4 items-center">
              <div className="p-2 rounded-lg bg-amber-500 *:flex items-center justify-center h-fit">
                <CalendarDays className="text-white" size={18} />
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase">Schedule</h3>
                <p className="text-xs">Please send us a message<br/> to check available class schedules.</p>
              </div>
            </li>
            <li className="courses-card p-4 border-b border-gray-200 flex gap-4 items-center">
              <div className="p-2 rounded-lg bg-amber-500 *:flex items-center justify-center h-fit">
                <ClockCheck className="text-white" size={18} />
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase">Total Hours</h3>
                <p className="text-xs">30 sessions <br/>60 hours of guided learning</p>
              </div>
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
};