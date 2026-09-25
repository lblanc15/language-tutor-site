"use client";

import { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { toast } from "sonner";

export function AdminAccessDenied() {
  useEffect(() => {
    toast.error("Admin access required");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <p className="font-body text-sm text-slate-700">
        You do not have permission to access this area.
      </p>
      <div className="mt-4">
        <UserButton />
      </div>
    </main>
  );
}
