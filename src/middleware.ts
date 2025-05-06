import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { isAdmin } from "./logic/clerk-user-data-helper-utils";
import { NextResponse } from "next/server";
import { PageUrl } from "./logic/enums";

const isPublicRoute = createRouteMatcher([
  PageUrl.Home,
  PageUrl.PageNotRestricted,
]);
const isAdminRoute = createRouteMatcher([PageUrl.Admin]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect(); // -- if not login redirect to sign in otherwise contine

    // --- come here means user is logged in
    const { userId } = await auth();
    const client = await clerkClient();

    if (isAdminRoute(req)) {
      const user = await client.users.getUser(userId!); // userId can not be null after auth.protect()
      if (!isAdmin(user)) {
        return NextResponse.redirect(new URL("/403", req.url));
      }
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
