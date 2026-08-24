import { Faq } from "./components/Faq";
import { Founders } from "./components/Founders";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { NavigationMobile } from "./components/NavigationMobile";
import { Courses } from "./components/Courses";
import { Contact } from "./components/Contact";

export default function Page() {
  return (
    <main className="w-full h-full relative pb-23 lg:pb-0 pt-0">
      <Navigation />
      <NavigationMobile />
      <Hero />
      <Courses />
      <Founders />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
