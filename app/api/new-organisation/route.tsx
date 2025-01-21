import { NextRequest, NextResponse } from "next/server";
import { auth } from "firebase-admin";
import { adminInit } from "@/firebase/auth/adminConfig";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

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

    const decodedToken = await auth().verifyIdToken(idToken);
    console.log("decodedToken:", decodedToken);
    const uid = decodedToken.uid;
    const displayName = decodedToken.displayName;

    // Parse the incoming form data
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const logoFile = formData.get("logo") as File;

    if (!name) {
      return NextResponse.json(
        { error: "Organisation name is required" },
        { status: 400 }
      );
    }

    if (!logoFile) {
      return NextResponse.json(
        { error: "Logo file is required" },
        { status: 400 }
      );
    }

    // **Step 1: Check for existing organisation allocation**
    const db = getFirestore();
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData?.organisations?.length >= 1) {
        return NextResponse.json(
          { error: "Seats have already been allocated to an organisation." },
          { status: 403 }
        );
      }
    }

    // **Step 2: Ensure the user has subscription seats available**
    const subscriptionQuantity = decodedToken.subscriptionQuantity || 0;
    if (subscriptionQuantity < 2) {
      return NextResponse.json(
        { error: "No subscription seats available." },
        { status: 400 }
      );
    }

    // **Step 3: Upload the logo to Firebase Storage**
    const bucket = getStorage().bucket(process.env.FIREBASE_STORAGE_BUCKET);
    const logoFileName = `logos/${uid}_${Date.now()}_${logoFile.name}`;
    const logoBuffer = Buffer.from(await logoFile.arrayBuffer());

    const file = bucket.file(logoFileName);
    await file.save(logoBuffer, {
      metadata: {
        contentType: logoFile.type,
      },
      public: true,
    });

    // Get the public URL to the uploaded file
    const logoUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

    // **Step 4: Create the organisation**
    const organisationRef = db.collection("organisations");
    const newDocRef = await organisationRef.add({
      name,
      ownerId: uid,
      members: {
        admin: [uid],
        standard: [],
      },
      ownerEmail: decodedToken.email,
      subscriptionStatus: decodedToken.subscriptionStatus || "active",
      subscriptionQuantity,
      logoUrl,
      createdAt: FieldValue.serverTimestamp(),
    });

    const organisationId = newDocRef.id;

    // **Step 5: Update user's custom claims to include organisationId**
    // Fetch user's existing custom claims
    const user = await auth().getUser(uid);
    const existingCustomClaims = user.customClaims || {};

    // Update only non-reserved custom claims
    await auth().setCustomUserClaims(uid, {
      ...existingCustomClaims, // Only existing custom claims are included
      organisationId, // Add the new organisationId
    });

    // **Step 6: Update user's Firestore record to reflect the new organisation**
    await userRef.set(
      {
        organisation: {
          organisationId,
          name,
          subscriptionQuantity: subscriptionQuantity,
          childUsers: [],
          logoUrl,
          role: "admin",
          joined: FieldValue.serverTimestamp(),
        },
      },
      { merge: true } // Merge to avoid overwriting existing user data
    );

    // **Step 7: Return success response**
    return NextResponse.json(
      {
        message: "Organisation created successfully",
        organisationId,
        logoUrl,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating organisation:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
