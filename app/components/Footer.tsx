"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { SocialIcon } from "react-social-icons";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export const Footer = () => {
  const sitemapRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (sitemapRef.current) {
      gsap.from(sitemapRef.current.children, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });
    }
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    const target = document.querySelector(hash);
    if (target) {
      gsap.to(window, {
        scrollTo: {
          y: target,
          offsetY: 92,
        },
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  return (
    <footer className="w-screen bg-gray-900 px-12 py-8 sm:-ml-6 lg:-ml-12 xl:-ml-32 grid gap-8 md:gap-10 md:grid-cols-3 items-start">
      <div className="flex justify-center md:justify-start">
        <img className="h-28 w-28 sm:h-40 sm:w-40 lg:h-48 lg:w-48" alt="footer-img" src="/assets/images/watermark.png" />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <ul ref={sitemapRef} className="p-0 mt-4 text-white font-light flex flex-col gap-2">
          <li className="text-xs">
            <a
              href="#home"
              className="text-white/70 hover:text-white transition"
              onClick={(event) => handleNavClick(event, "#home")}
            >
              Home
            </a>
          </li>
          <li className="text-xs">
            <a
              href="#overview"
              className="text-white/70 hover:text-white transition"
              onClick={(event) => handleNavClick(event, "#overview")}
            >
              Overview
            </a>
          </li>
          <li className="text-xs">
            <a
              href="#founders"
              className="text-white/70 hover:text-white transition"
              onClick={(event) => handleNavClick(event, "#founders")}
            >
              Founders
            </a>
          </li>
          <li className="text-xs">
            <a
              href="#faq"
              className="text-white/70 hover:text-white transition"
              onClick={(event) => handleNavClick(event, "#faq")}
            >
              FAQ
            </a>
          </li>
          <li className="text-xs">
            <a
              href="#schedule"
              className="text-white/70 hover:text-white transition"
              onClick={(event) => handleNavClick(event, "#schedule")}
            >
              Schedule
            </a>
          </li>
        </ul>
      </div>
      <div className="text-white text-sm flex flex-col h-full justify-center items-center">
        <div>
          <div className="font-semibold mb-1">Academia de Español Rico</div>
          <p className="text-xs mb-4 font-light">Connect with us on social</p>
          <div className="flex gap-1 justify-center md:justify-start">
            <SocialIcon
              url="https://www.facebook.com/ricospanishacademy"
              target="_blank"
              style={{ height: 25, width: 25 }}
            />
            <SocialIcon
              url="mailto:ricospanishacademy@gmail.com"
              target="_blank"
              style={{ height: 25, width: 25 }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};