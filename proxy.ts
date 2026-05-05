import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/forgot-password(.*)',
  '/sso-callback(.*)',
  '/pricing(.*)'
]);

const isAuthRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/forgot-password(.*)'
]);

export default clerkMiddleware(async (auth, request) => {
  const authState = await auth();
  const { userId } = authState;
  
  // Smart Redirects: If user is authenticated and tries to access auth routes or home page
  if (userId && isAuthRoute(request)) {
    return NextResponse.redirect(new URL('/scanner', request.url));
  }

  // Protect non-public routes
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
