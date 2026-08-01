"use client";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <>
      <h1 className="font-extrabold text-2xl sm:text-4xl lg:text-5xl text-center text-balance leading-tight">
        <span className="text-2xl sm:text-4xl lg:text-5xl bg-primary box-decoration-clone px-2 sm:px-4 leading-snug">Academia de Español Rico</span><br/>
        Learn Spanish with confidence.
      </h1>
      <h2 className="font-light text-sm sm:text-base mt-1 max-w-3xl mx-auto text-center text-balance text-gray-600">
         Practical and structured online Spanish classes designed for Filipino learners
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
        <Button className="w-full sm:w-auto rounded-full bg-destructive/90 hover:bg-destructive/70 font-semibold text-white text-xs py-5 px-8">Join the Class</Button>
        <Button className="w-full sm:w-auto rounded-full text-xs py-5 px-8 border border-gray-800" variant="ghost">Learn More</Button>
      </div>
    </>
  );
}