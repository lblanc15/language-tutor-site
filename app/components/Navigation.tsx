import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NavigationItems } from "./client/NavigationItems";
import Link from "next/link";

export const Navigation = () => {
  return (
    <header className="hidden lg:flex justify-between items-center w-screen px-12 py-4 bg-slate-50 sticky top-0 z-50">
      <div className="flex gap-4 items-center">
        <Image alt="logo" src="/assets/images/aer-logo.png" width={60} height={60} className="h-10 w-10 sm:h-12 sm:w-12 lg:h-15 lg:w-15" priority />
        <div className="text-xs font-bold uppercase"><span className="text-blue-950">Academia <br /> de Español</span> <span className="text-red-800">Rico</span></div>
      </div>
      <div className="flex gap-12 items-center">
        <nav>
          <NavigationItems />
        </nav>
        <Link href="https://forms.gle/MfadAgmc2uE2QqL27" target="_blank">
          <Button className="font-body text-xs px-5 font-bold bg-red-800 hover:bg-red-500 text-white" size="lg">Enroll now</Button>
        </Link>
      </div>
    </header>
  );
};
