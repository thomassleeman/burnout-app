import { getAuth } from "firebase-admin/auth";
import { adminInit } from "@/firebase/auth/adminConfig";
import { NextRequest, NextResponse } from "next/server";

//firebase
// import { db } from "@/firebase/auth/appConfig";
// import { doc, setDoc } from "firebase/firestore";

// Init the Firebase SDK every time the server is called
adminInit();

export async function POST(request: NextRequest, response: NextResponse) {
  //get session coookie
  const session = request.cookies.get("session");
  const sessionCookie = session?.value;

  //typechecks: check session cookie exists and is a string
  if (!sessionCookie) {
    return NextResponse.json(
      { error: "No session cookie found." },
      { status: 401 }
    );
  }

  if (typeof sessionCookie !== "string") {
    return NextResponse.json(
      { error: "Invalid session cookie" },
      { status: 401 }
    );
  }

  //Verify session cookie
  const decodedClaims = await getAuth().verifySessionCookie(
    sessionCookie,
    true
  );

  //Get the userID from the decoded cookie
  const userID = decodedClaims.uid;
  console.log("userID: ", userID);

  // const burnoutProfiles = await request.json();
  //   const burnoutProfiles = request.body;
  //   console.log("burnoutProfiles: ", burnoutProfiles);

  //Update the database
  //   try {
  //     const userRef = doc(db, "users", userID);

  //     // const createdAt = new Date();
  //     await setDoc(
  //       userRef,
  //       //   {
  //       //     exercises: {
  //       //       assessments: { ...burnoutProfiles, createdAt },
  //       //     },
  //       //   },
  //       {
  //         displayName: "Jane Doe",
  //       },
  //       { merge: true }
  //     );
  //     console.log("assessment added");
  //   } catch (error) {
  //     console.error("Error creating assessment document", error);
  //     return { error };
  //   }

  return NextResponse.json({ userID });
}
