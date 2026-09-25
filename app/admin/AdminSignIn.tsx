"use client";

import { SignInButton } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export function AdminSignIn() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.click();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <SignInButton mode="modal" forceRedirectUrl="/admin">
        <button
          ref={buttonRef}
          type="button"
          aria-label="Sign in to admin"
          className="sr-only"
        >
          Sign in to admin
        </button>
      </SignInButton>
    </main>
  );
}