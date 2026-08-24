"use client";

import { SocialIcon } from "react-social-icons";

export const Footer = () => {
  return (
    <footer className="w-full px-6 lg:px-12 grid grid-cols-2 gap-4 md:grid-cols-[1fr_1.5fr_1.5fr] lg:grid-cols-3 bg-blue-950 py-12 lg:py-12">
      <div className="flex justify-center md:justify-start col-span-2 md:col-span-1 mb-8 md:mb-0">
        <img className="h-24 w-24 lg:h-32 lg:w-32 bg-slate-950" alt="footer-img" src="/assets/images/watermark.png" />
      </div>
      <div className="flex flex-col items-center justify-center h-full font-body">
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
      <div className="text-white text-sm flex flex-col h-full justify-center items-center">
        <div>
          <div className="font-semibold">Academia de Español Rico</div>
          <p className="text-xs mb-2 font-light font-body">Connect with us on social</p>
          <div className="flex gap-1 justify-center md:justify-start">
            <SocialIcon
              url="https://www.facebook.com/ricospanishacademy"
              target="_blank"
              style={{ height: 25, width: 25 }}
            />
            <SocialIcon
              url="https://www.tiktok.com/@academiadeespanolrico"
              target="_blank"
              style={{ height: 25, width: 25 }}
            />
            <SocialIcon
              url="mailto:ricospanishacademy@gmail.com"
              target="_blank"
              style={{ height: 25, width: 25 }}
            />
            <SocialIcon
              url="https://wa.me/639206126888"
              target="_blank"
              style={{ height: 25, width: 25 }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};