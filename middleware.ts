import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// Interface for decoded token claims
interface DecodedToken {
  uid: string;
  email?: string;
  admin?: boolean;
  subscriptionStatus?: string;
  subscriptionQuantity?: number;
  exp?: number;
  // Add other claims as needed
}

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const pathname = request.nextUrl.pathname;
  const origin = request.nextUrl.origin;

  /* ------------- Free content exceptions ---------------------- */
  // Allow access to the introduction course without authentication
  if (
    pathname.includes(
      "/courses/stress-to-strength-a-burnout-introduction-course"
    )
  ) {
    return NextResponse.next();
  }

  /* ------------- Authentication check ---------------------- */
  // Return to /signin if no session cookie exists
  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Optimistically decode the session token without verification
  let decodedToken: DecodedToken;
  try {
    decodedToken = jwtDecode(session.value);

    // Check token expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      // Token expired, redirect to signin
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  } catch (error) {
    // Token cannot be decoded, redirect to signin
    console.error("Failed to decode session token:", error);
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  /* ------------- Auth redirect logic ---------------------- */
  // If the user is logged in and they navigate to signup or signin, redirect to home
  // if ((pathname === "/signup" || pathname === "/signin") && session) {
  //   return NextResponse.redirect(
  //     new URL(`/home/${decodedToken.user_id}`, request.url)
  //   );
  // }

  /* ------------- Profile route protection ---------------------- */
  // Check if requested page contains a user ID and ensure it is the current user
  // if (
  //   pathname.startsWith("/profile/") &&
  //   !pathname.includes(decodedToken.uid)
  // ) {
  //   return NextResponse.redirect(
  //     new URL(`/profile/${decodedToken.uid}`, request.url)
  //   );
  // }

  /* ------------- Premium content check ---------------------- */
  const userIsSubscribed = decodedToken.subscriptionStatus === "active";

  // Restrict access to premium courses
  if (pathname.includes("courses") && !userIsSubscribed) {
    const url = new URL("/access-paid-content", request.url);
    url.searchParams.set("action", "courses");
    return NextResponse.redirect(url);
  }

  // Restrict access to exercises
  if (pathname.includes("exercises") && !userIsSubscribed) {
    const url = new URL("/access-paid-content", request.url);
    url.searchParams.set("action", "exercises");
    return NextResponse.redirect(url);
  }

  /* ------------- Admin routes protection ---------------------- */
  // Check if the user is an admin for admin-only routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/studio")) {
    if (!decodedToken.admin) {
      return NextResponse.redirect(new URL("/401", request.url));
    }
  }

  /* ------------- Super admin protection ---------------------- */
  // Super admin routes are only for specific user ID
  if (
    pathname.includes("superadmin") &&
    decodedToken.uid !== process.env.SUPER_USER_UID
  ) {
    return NextResponse.redirect(new URL("/401", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Protected routes configuration
export const config = {
  matcher: [
    "/home/:uid*",
    "/profile/:path*",
    "/admin/:path*",
    "/profile",
    "/studio/:path*",
    "/superadmin/:path*",
    "/courses/:path*",
    "/exercises/:path*",
    "/pasu-ai",
  ],
};
