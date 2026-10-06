import { auth } from "@clerk/nextjs/server";
import { AdminAccessDenied } from "./AdminAccessDenied";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { has } = await auth();

  if (!has({ role: "org:admin" })) {
    return <AdminAccessDenied />;
  }

  return (
    <main className="min-h-screen text-xs font-body">
      <header>
        <div className="flex items-center justify-between bg-slate-100 px-6 py-4">
          <div className="flex gap-3 items-center">
            <Image alt="logo" src="/assets/images/aer-logo.png" width={45} height={45} className="h-11 w-11" priority />
            <div className="font-heading font-bold uppercase text-xs"><span className="text-blue-950">Academia de Español</span> <span className="text-red-800">Rico</span></div>
          </div>
          <UserButton />
        </div>
        <div className="mt-8 px-6">
          <h1 className="font-heading text-2xl font-bold text-blue-950">Administration</h1>
          <p className="text-slate-600">Manage and oversee the different activities and submissions across the platform</p>
        </div>
      </header>
      <section className="px-6">
        {children}
      </section>
    </main>
  );
}