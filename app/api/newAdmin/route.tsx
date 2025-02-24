import { adminInit } from "@/firebase/auth/adminConfig";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "firebase-admin";

adminInit();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, id } = body;
    if (!name || !id) {
      return NextResponse.json(
        { error: "Missing name or id" },
        { status: 400 }
      );
    }

    // Fetch existing custom claims
    const user = await auth().getUser(id);
    const existingCustomClaims = user.customClaims || {};

    await auth().setCustomUserClaims(id, {
      ...existingCustomClaims,
      admin: true,
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("******Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
