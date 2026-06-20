import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Tentukan route yang BOLEH diakses tanpa login
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/",  // landing page (hapus jika ingin semua diproteksi)
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth.protect(); // redirect ke /sign-in jika belum login
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};