import Image from "next/image";
import { About } from "./components/About";
import { Faq } from "./components/Faq";
import { Founders } from "./components/Founders";
import { Schedule } from "./components/Schedule";
import { Button } from "@/components/ui/button";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";

export default function Page() {
  return (
    <main>
      {/* Full-bleed: cancels the body's horizontal padding at every breakpoint so
          the sticky bar reaches the screen edges instead of overflowing past them. */}
      <header className="-mx-4 sm:-mx-6 lg:-mx-32 px-4 sm:px-6 lg:px-32 flex items-center justify-between gap-4 py-3 sm:py-4 z-60 sticky top-0 bg-white">
        {/* <Navigation /> */}
        <Image alt="logo" src="/assets/images/aer-logo.png" width={60} height={60} className="h-10 w-10 sm:h-12 sm:w-12 lg:h-15 lg:w-15" priority />
        <Button className="text-xs! rounded-full px-4 sm:px-6 py-4 shrink-0">Contact us</Button>
      </header>
      <section id="home" className="w-full min-h-[calc(100svh-64px)] lg:min-h-[calc(95vh-92px)] py-10 flex flex-col justify-center items-center">
        <Hero />
      </section>
      <section id="overview" className="w-full relative">
        <div className="absolute left-1/2 top-0 h-full w-screen -translate-x-1/2 z-0 bg-primary/5 rounded-tl-[15%]">
        </div>
        <div className="relative z-10 py-12 sm:py-14 lg:py-18 px-0 sm:px-6 lg:px-32">
          <span className="text-xs sm:text-sm uppercase tracking-wide text-yellow-800">Aprende español,</span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-8 lg:mb-12 font-extrabold">Ábrete al mundo</h3>
          <About />
        </div>
      </section>
      <section id="founders">
        <div className="pt-12 sm:pt-14 lg:pt-18 pb-8 px-0 sm:px-6 lg:px-12 xl:px-32">
          <span className="text-xs sm:text-sm uppercase tracking-wide text-yellow-800">Hola!</span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-8 lg:mb-12 font-extrabold">About the Founders</h3>
          <Founders />
        </div>
      </section>
       <section id="faq" className="w-full relative">
        <div className="absolute left-1/2 top-0 h-full w-screen -translate-x-1/2 z-0 bg-destructive/10 rounded-tl-[15%]">
        </div>
        <div className="relative z-10 py-12 sm:py-14 lg:py-18 px-0 sm:px-6 lg:px-32">
          <span className="text-xs sm:text-sm uppercase tracking-wide text-yellow-800">FAQ&apos;s</span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-8 lg:mb-12 font-extrabold">Frequently Asked Questions</h3>
          <Faq />
        </div>
      </section>
      {/* <section id="schedule">
        <div className="pt-12 sm:pt-14 lg:pt-18 pb-8 px-0 sm:px-6 lg:px-32">
          <Schedule />
        </div>
      </section> */}
      <Footer />
    </main>
  );
}
