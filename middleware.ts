import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"; // You'll need to install this package

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
  if ((pathname === "/signup" || pathname === "/signin") && session) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

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
    "/home",
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

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest, response: NextResponse) {
//   const session = request.cookies.get("session");
//   const pathname = request.nextUrl.pathname;
//   const origin = request.nextUrl.origin;

//   /* ------------- middleware exceptions ---------------------- */
//   //Allow access to the introduction course page without a session
//   if (
//     pathname.includes(
//       "/courses/stress-to-strength-a-burnout-introduction-course"
//     )
//   ) {
//     if (!session) {
//       return NextResponse.redirect(
//         new URL(
//           //This doesn't work as it causes a redirect loop
//           "/courses/stress-to-strength-a-burnout-introduction-course",
//           request.url
//         )
//       );
//     } else {
//       return NextResponse.next();
//     }
//   }
//   /* ------------------------------------------------------------------------------ */

//   //Return to /login if no session
//   if (!session) {
//     return NextResponse.redirect(new URL("/signin", request.url));
//   }

//   //Call the authentication endpoint
//   const responseAPI = await fetch(`${origin}/api/signin`, {
//     method: "GET",
//     headers: {
//       // Cookie: `session=${session?.value}`,
//       Cookie: session?.value,
//     },
//   });

//   //If session cookie verification fails the endpoint will delete the cookie. Here we redirect the user to sign in.
//   if (responseAPI.status !== 200) {
//     return NextResponse.redirect(new URL("/signin", request.url));
//   }

//   // Get the signed-in user's UID from the response
//   const signedInUser = await responseAPI.json();
//   const signedInUserClaims = signedInUser.decodedClaims;
//   const signedInUserUid = signedInUser.decodedClaims.uid;

//   /* ------------------------------------------ illogical ------------------------------------------ */

//   //If the user is already logged in and they navigate to the signup or signin page, redirect them to home
//   if ((pathname === "/signup" || pathname === "/signin") && session) {
//     return NextResponse.redirect(new URL("/home", request.url));
//   }

//   /* ------------------------------------------ insecure ------------------------------------------ */

//   // Check if requested page contains a user ID and ensure it is the current user.
//   if (pathname.startsWith("/profile/") && !pathname.includes(signedInUserUid)) {
//     return NextResponse.redirect(
//       new URL(`/profile/${signedInUserUid}`, request.url)
//     );
//   }

//   /* ------------------------------------------ premium ------------------------------------------ */
//   const userIsSubscribed = signedInUserClaims.subscriptionStatus === "active";
//   if (pathname.includes("courses") && !userIsSubscribed) {
//     const url = new URL("/access-paid-content", request.url);
//     url.searchParams.set("action", "courses");
//     return NextResponse.redirect(url);
//   }
//   if (pathname.includes("exercises") && !userIsSubscribed) {
//     const url = new URL("/access-paid-content", request.url);
//     url.searchParams.set("action", "exercises");
//     return NextResponse.redirect(url);
//   }

//   /* ------------------------------------------ Site Admins ------------------------------------------ */
//   // does admin exist on non-admin users as admin:false or is it not present?
//   const signedInUserAdmin = signedInUser.decodedClaims.admin;
//   //Check if the user is an admin
//   if (pathname.startsWith("/admin") || pathname.startsWith("/studio")) {
//     if (!signedInUserAdmin) {
//       return NextResponse.redirect(new URL("/401", request.url));
//     }
//     console.log("signedInUserAdmin: ", signedInUserAdmin);
//   }

//   if (pathname.includes("superadmin")) {
//     console.log(signedInUserUid, process.env.SUPER_USER_UID);
//   }

//   //My account is the only super user
//   if (
//     pathname.includes("superadmin") &&
//     signedInUserUid !== process.env.SUPER_USER_UID
//   ) {
//     return NextResponse.redirect(new URL("/401", request.url));
//   }
//   /* --------------------------------------------------------------------------------------------------- */

//   return NextResponse.next();
// }

// //Protected routes
// export const config = {
//   matcher: [
//     "/home",
//     "/profile/:path*",
//     "/admin/:path*",
//     "/profile",
//     "/studio/:path*",
//     "/superadmin/:path*",
//     "/courses/:path*",
//     "/exercises/:path*",
//     "/pasu-ai",
//   ],
// };
