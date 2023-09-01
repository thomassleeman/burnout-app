import { auth } from "firebase-admin";
import { adminInit } from "@/firebase/auth/adminConfig";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Init the Firebase SDK every time the server is called
adminInit();

/* POST */
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const authorization = headers().get("Authorization");
    if (authorization?.startsWith("Bearer ")) {
      const idToken = authorization.split("Bearer ")[1];
      const decodedToken: auth.DecodedIdToken = await auth().verifyIdToken(
        idToken
      );
      // console.log("***decodedToken: ", decodedToken);

      if (decodedToken) {
        //Set session expiration to 30 days.
        const expiresIn = 60 * 60 * 24 * 30;
        //Generate session cookie
        const sessionCookie = await auth().createSessionCookie(idToken, {
          expiresIn,
        });
        const options = {
          name: "session",
          value: sessionCookie,
          maxAge: expiresIn,
          httpOnly: true,
          secure: true,
        };

        //Add the cookie to the browser
        cookies().set(options);

        //send back confirmed user details
        return NextResponse.json({ decodedToken }, { status: 200 });
      }
    }
    //move return statement back down here if this breaks!
  } catch (error) {
    console.error("******Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* GET */
export async function GET(request: NextRequest) {
  const session = cookies().get("session")?.value || "";

  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  //Use Firebase Admin to validate the session cookie
  const decodedClaims: auth.DecodedIdToken = await auth().verifySessionCookie(
    session,
    true
  );

  //This was to check if the user is an admin or not. We are now using Jotai to check for admin status.
  const admin = decodedClaims.admin || false;

  // console.log('***decodedClaims: ', decodedClaims, '***admin: ', admin);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ decodedClaims }, { status: 200 });
}
