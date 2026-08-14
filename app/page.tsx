import Image from "next/image";
import { Faq } from "./components/Faq";
import { Founders } from "./components/Founders";
import { Schedule } from "./components/Schedule";
import { Button } from "@/components/ui/button";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Phone } from "lucide-react";
import { Navigation } from "./components/Navigation";
import { NavigationMobile } from "./components/NavigationMobile";
import { Courses } from "./components/Courses";

export default function Page() {
  return (
    <main className="w-full h-full relative pb-23 lg:pb-0 pt-0">
      <Navigation />
      <NavigationMobile />
      <Hero />
      <Courses />
      <Founders />
      <Faq />
      <Footer />
    </main>
  );
}
