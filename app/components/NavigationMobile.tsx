"use client";

import { NavigationItemsMobile } from "./client/NavigationItemsMobile";

export const NavigationMobile = () => {
  return (
    <header className="flex lg:hidden justify-between items-center w-full p-6 bg-slate-200 rounded-t-3xl fixed bottom-0 left-0 z-50">
        <nav className="w-full">
          <NavigationItemsMobile />
        </nav>
    </header>
  );
};
