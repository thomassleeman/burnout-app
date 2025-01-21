import { NextRequest, NextResponse } from "next/server";
import { auth } from "firebase-admin";
import { adminInit } from "@/firebase/auth/adminConfig";

adminInit();

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase ID token from Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.split(" ")[1];

    const decodedToken = await auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    await auth().setCustomUserClaims(uid, {});

    return NextResponse.json({
      message: "Custom claims cleared successfully.",
    });
  } catch (error: any) {
    console.error("Error clearing custom claims:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
