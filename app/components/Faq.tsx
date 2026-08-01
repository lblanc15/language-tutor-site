"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

// Splits the list into 2 near-even groups, the first taking the extra item on
// an odd count. `slice` keeps `faqs` intact — `splice` would drain it.
function generateFaq() {
  const half = Math.ceil(faqs.length / 2);
  return [faqs.slice(0, half), faqs.slice(half)];
}

export const Faq = () => {
  const groups = generateFaq();

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {groups.map((group, i) => (
        <Accordion
          key={i}
          defaultValue={i === 0 ? [group[0].id] : []}
          className="w-full max-w-none lg:max-w-lg flex-1 min-w-0"
        >
          {group.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.title}</AccordionTrigger>
              {/* wrap-break-word: a couple of answers embed bare enrolment URLs
                  wider than a phone viewport that would otherwise overflow. */}
              <AccordionContent className="pr-0 sm:pr-4 wrap-break-word">{faq.desc}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ))}
    </div>
  )
}