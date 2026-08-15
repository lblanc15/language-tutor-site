"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: "1",
    title: "Is the course suitable for complete beginners?",
    desc: "Yes. Spanish Foundations is designed for beginners, including students with little or no previous Spanish experience."
  },
  {
    id: "2",
    title: "How are the classes conducted?",
    desc: "Classes are held live online through Google Meet. Students can participate in discussions, guided practice, speaking activities, and exercises during each session."
  },
  {
    id: "3",
    title: "What is the class schedule?",
    desc: "Please send us a message to check available class schedules."
  },
  {
    id: "4",
    title: "How long is the program?",
    desc: "The program includes 30 live sessions, with two hours per session, for a total of 60 learning hours."
  },
  {
    id: "5",
    title: "What level can I reach after the course?",
    desc: "The program aims to help students reach a solid A2 level, with progress toward B1. Results may vary depending on attendance, participation, practice, and study habits"
  },
  {
    id: "6",
    title: "What skills will I learn?",
    desc: "Students will develop their Spanish speaking, listening, reading, writing, grammar, pronunciation, and vocabulary skills."
  },
  {
    id: "7",
    title: "What happens if I miss a class?",
    desc: "Session recordings may be provided for review. However, students are strongly encouraged to attend live classes because many activities involve interaction and speaking practice."
  },
  {
    id: "8",
    title: "Are the lessons explained in English or Filipino?",
    desc: "Lessons may be explained in English or Filipino when needed to help students understand difficult topics more clearly."
  },
  {
    id: "9",
    title: "Is the course focused only on grammar?",
    desc: "No. The course combines grammar with vocabulary, pronunciation, listening, speaking, reading, writing, guided conversations, and real-life activities."
  },
  {
    id: "10",
    title: "Will there be homework and assessments?",
    desc: "Yes. Students may receive homework, self-learning activities, speaking exercises, quizzes, and assessments to help reinforce each lesson."
  },
  {
    id: "11",
    title: "Do I need to buy a textbook?",
    desc: "No, digital lesson materials and class resources will be provided every after class."
  },
  {
    id: "12",
    title: "What device do I need?",
    desc: "Students may use a laptop, desktop computer, tablet, or mobile phone. A stable internet connection, microphone, and camera are recommended."
  },
  {
    id: "13",
    title: "Will I receive a certificate?",
    desc: "A certificate of completion may be issued to students who meet the required attendance, participation, assessment, and course-completion requirements."
  },
  {
    id: "14",
    title: "How can I reserve a slot?",
    desc: "A slot is confirmed only after the required reservation fee or payment has been received. Submitting the enrollment form alone does not guarantee a slot"
  },
  {
    id: "15",
    title: "Is the reservation fee refundable?",
    desc: "No, the reservation fee is not refundable"
  },
  {
    id: "16",
    title: "How can I enroll?",
    desc: (
      <>
        To enroll please fill out our enrollment form: <a className="text-destructive/60 font-semibold" href="https://forms.gle/MfadAgmc2uE2QqL27" target="_blank" rel="noopener noreferrer">https://forms.gle/MfadAgmc2uE2QqL27</a> or send us a message at: <a className="text-destructive/60 font-semibold" href="https://www.facebook.com/ricospanishacademy" target="_blank" rel="noopener noreferrer">https://www.facebook.com/ricospanishacademy</a>
      </>
    )
  },

];

function generateFaq() {
  const third = Math.ceil(faqs.length / 3);
  return [
    faqs.slice(0, third),
    faqs.slice(third, third * 2),
    faqs.slice(third * 2),
  ];
}

export const Faq = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const groups = generateFaq();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-header",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-header",
            start: "top 90%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".faq-column",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-column",
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".faq-item",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-item",
            start: "top 92%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="Faq" ref={sectionRef} className="px-6 lg:px-12 w-full py-12 bg-slate-50 rounded-t-[50px]">
      <div className="faq-header uppercase mb-6 px-4 py-2 rounded-full border border-slate-700 font-body font-light text-xs w-fit">Frequently asked questions</div>
      <h2 className="faq-header text-2xl font-semibold uppercase mb-2 text-blue-950">Got Questions?</h2>
      <p className="faq-header font-body lg:max-w-xl text-sm mb-8">We compiled answers to the common questions about our service.</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {groups.map((group, i) => (
          <Accordion
            key={i}
            defaultValue={group[0] ? [group[0].id] : []}
            className="faq-column w-full font-body"
          >
            {group.map((faq) => (
              <AccordionItem key={faq.id} className="faq-item bg-slate-100 hover:bg-slate-200 p-4 mb-2 shadow-sm">
                <AccordionTrigger className="cursor-pointer">{faq.title}</AccordionTrigger>
                <AccordionContent className="pr-0 sm:pr-4 wrap-break-word">{faq.desc}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ))}
      </div>
    </section>
  )
}