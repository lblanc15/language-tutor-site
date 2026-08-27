"use client";

import { LucideCopyright } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full px-6 lg:px-12 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.5fr_1.5fr] lg:grid-cols-3 bg-blue-950 py-12 lg:py-12">
      <div className="flex justify-center md:justify-start md:col-span-1 mb-8 md:mb-0">
        <div className="h-32 lg:h-full w-32 relative border mb-4">
          <Image className="absolute object-cover" alt="footer-img" src="/assets/images/watermark.png" fill/>
        </div>
      </div>
      <div className="flex flex-col lg:items-center justify-center h-full font-body">
        <ul className="p-0 mt-4 text-white font-light flex flex-col gap-2">
          <li className="text-xs">
            <a
              href="#Home"
              className="text-white/70 hover:text-white transition"
            >
              Home
            </a>
          </li>
          <li className="text-xs">
            <a
              href="#Courses"
              className="text-white/70 hover:text-white transition"
            >
              Courses
            </a>
          </li>
          <li className="text-xs">
            <a
              href="#Founders"
              className="text-white/70 hover:text-white transition"
            >
              Founders
            </a>
          </li>
          <li className="text-xs">
            <a
              href="#Faq"
              className="text-white/70 hover:text-white transition"
            >
              FAQ
            </a>
          </li>
          <li className="text-xs">
            <a
              href="#Contact"
              className="text-white/70 hover:text-white transition"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="text-white text-sm flex flex-col w-full h-full justify-center items-center">
        <div className="text-[11px] font-body text-white/90">
          <h2 className="text-sm font-bold mb-2">Academia de Español Rico</h2>
          <p className="lg:max-w-3/4 mb-4">Online Spanish classes for Filipino learners who want to build confidence and open doors to more opportunities.</p>
          <div className="flex gap-1 items-center">
            <LucideCopyright size={11}/>2026 Academia de Español Rico. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};