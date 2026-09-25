import { auth } from "@clerk/nextjs/server";
import { AdminAccessDenied } from "./AdminAccessDenied";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { has } = await auth();

  if (!has({ role: "org:admin" })) {
    return <AdminAccessDenied />;
  }

  return children;
}