import { verifyToken } from "@clerk/nextjs/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";
import { AdminAccessDenied } from "./AdminAccessDenied";

async function hasAdminAccess() {
  const sessionToken = (await cookies()).get("__session")?.value;

  if (!sessionToken) {
    return false;
  }

  const { env } = await getCloudflareContext({ async: true });
  const secretKey = env.CLERK_SECRET_KEY || process.env.CLERK_SECRET_KEY;

  if (!secretKey) {
    return false;
  }

  try {
    const claims = await verifyToken(sessionToken, { secretKey });
    return claims.org_role === "org:admin";
  } catch {
    return false;
  }
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!(await hasAdminAccess())) {
    return <AdminAccessDenied />;
  }

  return children;
}