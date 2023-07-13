import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { type } from "os";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");

  //Return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const origin = request.nextUrl.origin;

  //Call the authentication endpoint
  const responseAPI = await fetch(`${origin}/api/signin`, {
    method: "GET",
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Get the signed-in user's UID from the response
  const signedInUser = await responseAPI.json();
  const signedInUserUid = signedInUser.decodedClaims.uid;

  // does admin exist on non-admin users as admin:false or is it not present?
  const signedInUserAdmin = signedInUser.decodedClaims.admin;
  const pathname = request.nextUrl.pathname;

  // Check if requested page contains a user ID and ensure it is the current user.
  if (pathname.startsWith("/profile/") && !pathname.includes(signedInUserUid)) {
    return NextResponse.redirect(
      new URL(`/profile/${signedInUserUid}`, request.url)
    );
  }

  //Check if the user is an admin
  if (pathname.startsWith("/admin") && !signedInUserAdmin) {
    return NextResponse.redirect(new URL("/401", request.url));
  }

  //My account is the only super user
  if (
    pathname.includes("superuser") &&
    signedInUserUid !== process.env.NEXT_PUBLIC_SUPER_USER_UID
  ) {
    return NextResponse.redirect(new URL("/401", request.url));
  }

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  matcher: ["/admin/:path*", "/dashboard", "/profile/:path*"],
};
