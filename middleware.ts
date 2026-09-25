// Kept as `middleware.ts` (deprecated in Next 16) instead of `proxy.ts` on purpose:
// `proxy.ts` always runs on Node.js, which @opennextjs/cloudflare does not support.
// `middleware.ts` runs on the Edge runtime, which Cloudflare Workers can execute.
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isAdminRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
