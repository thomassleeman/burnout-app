import { NextRequest, NextResponse } from "next/server";
import { auth } from "firebase-admin";
import { adminInit } from "@/firebase/auth/adminConfig";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

adminInit();

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // **Authenticate the user using Firebase Auth**
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.split(" ")[1];

    if (!idToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // **Receive organisation details from the request body**
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Organisation name is required" },
        { status: 400 }
      );
    }

    const db = getFirestore();

    // **Create a new document in the 'organisations' collection**
    const organisationRef = db.collection("organisations").doc();

    const newOrganisation = {
      organisationId: organisationRef.id,
      name,
      ownerId: uid,
      subscriptionStatus: "inactive", // Initialize subscription status
      subscriptionQuantity: 0, // Initialize subscription quantity
      createdAt: FieldValue.serverTimestamp(),
    };

    await organisationRef.set(newOrganisation);

    // **Return success response**
    return NextResponse.json(
      {
        message: "Organisation created successfully",
        organisationId: organisationRef.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating organisation:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
