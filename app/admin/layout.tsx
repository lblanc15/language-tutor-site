import { createClerkClient } from "@clerk/nextjs/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";
import { AdminAccessDenied } from "./AdminAccessDenied";
import { AdminSignIn } from "./AdminSignIn";

type AdminAccess = "signed-out" | "denied" | "allowed";

async function getAdminAccess(): Promise<AdminAccess> {
  const { env } = await getCloudflareContext({ async: true });
  const secretKey = env.CLERK_SECRET_KEY || process.env.CLERK_SECRET_KEY;
  const publishableKey =
    env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!secretKey || !publishableKey) {
    return "denied";
  }

  try {
    const requestHeaders = await headers();
    const host = requestHeaders.get("host") ?? "localhost";
    const request = new Request(`https://${host}/admin`, {
      headers: requestHeaders,
    });
    const clerk = createClerkClient({ secretKey, publishableKey });
    const requestState = await clerk.authenticateRequest(request);

    if (!requestState.isAuthenticated) {
      return "signed-out";
    }

    return requestState.toAuth().orgRole === "org:admin" ? "allowed" : "denied";
  } catch {
    return "denied";
  }
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const access = await getAdminAccess();

  if (access === "signed-out") {
    return <AdminSignIn />;
  }

  if (access === "denied") {
    return <AdminAccessDenied />;
  }

  return children;
}