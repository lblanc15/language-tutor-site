import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DynamicHeader } from "./client/DynamicHeader";
import Link from "next/link";

export const Hero = () => {
  return (
    <section id="Home" className="flex flex-col w-full lg:h-[calc(100%-92px)] lg:flex-row items-center lg:pt-23 lg:px-12">
      <div className="order-2 mt-8 lg:mt-0 w-full lg:order-1 lg:basis-1/2 font-body px-6 lg:px-0">
        <div className="flex gap-3 items-center lg:hidden mb-8">
          <Image alt="logo" src="/assets/images/aer-logo.png" width={60} height={60} className="h-18 w-18 sm:h-12 sm:w-12 lg:h-15 lg:w-15" priority />
          <div className="text-lg font-bold uppercase leading-6"><span className="text-blue-950">Academia <br /> de Español</span> <span className="text-red-800">Rico</span></div>
        </div>
        <DynamicHeader />
        <hr className="w-42 border border-amber-600 mb-6" />
        <p className="text-xl font-bold tracking-wide text-blue-950 mb-4">Practical. Effective. Personal.</p>
        <p className="max-w-lg mb-8">Online Spanish classes for Filipino learners who want to build confidence and open doors to more opportunities.</p>
        <div className="flex gap-2">
          <Link href="https://forms.gle/MfadAgmc2uE2QqL27" target="_blank">
            <Button className="font-body text-xs px-8 font-bold w-full md:w-64 py-5  bg-red-800 hover:bg-red-500 text-white" size="lg">Enroll now</Button>
          </Link>
        </div>
      </div>
      <div className="h-[45vh] aspect-video w-full order-1 lg:order-2 lg:basis-1/2 lg:h-full relative">
        <Image className="aspect-video object-cover" src="/assets/images/hero-splash.png" alt="splash" fill />
      </div>
    </section>
  );
};