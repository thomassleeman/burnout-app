import { NextResponse } from "next/server";
import { adminInit } from "@/firebase/auth/adminConfig";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// Make sure adminInit() is called before using getFirestore()
adminInit();

interface JoinRequestBody {
  orgId: string;
  token: string;
  uid: string;
  role: "admin" | "standard"; // The membership type
}

/**
 * POST /api/join
 * Expects JSON body: { orgId, token, uid, role }
 */
export async function POST(request: Request) {
  try {
    // Parse JSON body
    const { orgId, token, uid, role } =
      (await request.json()) as JoinRequestBody;

    // Basic validation
    if (!orgId || !token || !uid || !role) {
      return NextResponse.json(
        { error: "Missing orgId, token, uid, or role." },
        { status: 400 }
      );
    }

    // Reference Firestore via the Admin SDK
    const db = getFirestore();
    const orgRef = db.collection("organisations").doc(orgId);
    const userRef = db.collection("users").doc(uid);

    // Use a Firestore transaction to avoid concurrency issues
    await db.runTransaction(async (transaction) => {
      // 1) Get organisation doc
      const orgSnapshot = await transaction.get(orgRef);
      if (!orgSnapshot.exists) {
        throw new Error("Organisation not found.");
      }

      const orgData = orgSnapshot.data();
      if (!orgData) {
        throw new Error("Organisation data not found.");
      }

      // 2) Check token
      if (
        !orgData.joinToken ||
        orgData.joinToken.token !== token ||
        !orgData.joinToken.valid
      ) {
        throw new Error("Invalid or missing token.");
      }

      // 3) Check expiry
      const expiresAt = orgData.joinToken.expiresAt;
      const expiresDate = new Date(
        expiresAt.seconds * 1000 + (expiresAt.nanoseconds || 0) / 1_000_000
      );
      if (expiresDate < new Date()) {
        throw new Error("Invitation link has expired.");
      }

      // 4) Check seat availability
      const subscriptionQuantity = orgData.subscriptionQuantity || 0;
      const adminArray = orgData?.members?.admin || [];
      const standardArray = orgData?.members?.standard || [];
      const totalMembersCount = adminArray.length + standardArray.length;

      if (totalMembersCount >= subscriptionQuantity) {
        throw new Error("No seats available in this organisation.");
      }

      // 5) Add user to either admin or standard
      if (role === "admin") {
        if (!adminArray.includes(uid)) {
          adminArray.push(uid);
        }
      } else {
        if (!standardArray.includes(uid)) {
          standardArray.push(uid);
        }
      }

      // 6) Update the organisation doc
      transaction.update(orgRef, {
        "members.admin": adminArray,
        "members.standard": standardArray,
      });

      // 7) Also update the *user doc* with organisation info
      transaction.set(
        userRef,
        {
          organisation: {
            joined: FieldValue.serverTimestamp(), // serverTimestamp
            logoUrl: orgData.logoUrl || "",
            name: orgData.name || "",
            organisationId: orgId,
            role: role,
          },
        },
        { merge: true }
      );
    });

    // If transaction succeeds
    return NextResponse.json({
      success: true,
      message: "Joined organisation and user doc updated.",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error." },
      { status: 400 }
    );
  }
}

// import { NextResponse } from "next/server";
// import { auth } from "firebase-admin";
// import { adminInit } from "@/firebase/auth/adminConfig";
// import { getFirestore, FieldValue } from "firebase-admin/firestore";

// adminInit();

// interface JoinRequestBody {
//   orgId: string;
//   token: string;
//   uid: string;
//   role: "admin" | "standard"; // The membership type
// }

// export async function POST(request: Request) {
//   try {
//     // Parse JSON body
//     const { orgId, token, uid, role } =
//       (await request.json()) as JoinRequestBody;

//     if (!orgId || !token || !uid || !role) {
//       return NextResponse.json(
//         { error: "Missing orgId, token, uid, or role." },
//         { status: 400 }
//       );
//     }

//     const db = getFirestore();
//     const orgRef = db.collection("organisations").doc(orgId);
//         const userRef = db.collection("users").doc(uid);

//     // Use a Firestore transaction to avoid concurrency issues
//     await db.runTransaction(async (transaction) => {
//       const orgSnapshot = await transaction.get(orgRef);
//       if (!orgSnapshot.exists) {
//         throw new Error("Organisation not found.");
//       }

//       const orgData = orgSnapshot.data();
//       if (!orgData) {
//         throw new Error("Organisation data not found.");
//       }

//       // 1) Check token
//       if (
//         !orgData.joinToken ||
//         orgData.joinToken.token !== token ||
//         !orgData.joinToken.valid
//       ) {
//         throw new Error("Invalid or missing token.");
//       }

//       // 2) Check expiry
//       const expiresAt = orgData.joinToken.expiresAt;
//       const expiresDate = new Date(
//         expiresAt.seconds * 1000 + (expiresAt.nanoseconds || 0) / 1_000_000
//       );
//       if (expiresDate < new Date()) {
//         throw new Error("Invitation link has expired.");
//       }

//       // 3) Check seat availability
//       //    We'll consider that both admins and standard users count toward subscription seats
//       const subscriptionQuantity = orgData.subscriptionQuantity || 0;

//       const adminArray = orgData?.members?.admin || [];
//       const standardArray = orgData?.members?.standard || [];

//       // Combined seat usage: admin + standard
//       const totalMembersCount = adminArray.length + standardArray.length;
//       if (totalMembersCount >= subscriptionQuantity) {
//         throw new Error("No seats available in this organisation.");
//       }

//       // 4) Depending on the 'role', push UID into the appropriate array
//       if (role === "admin") {
//         if (!adminArray.includes(uid)) {
//           adminArray.push(uid);
//         }
//       } else {
//         // role === "standard"
//         if (!standardArray.includes(uid)) {
//           standardArray.push(uid);
//         }
//       }

//       // 5) Update Firestore with new arrays
//       transaction.update(orgRef, {
//         "members.admin": adminArray,
//         "members.standard": standardArray,
//       });
//     });

//     // If transaction succeeds
//     return NextResponse.json({
//       success: true,
//       message: "Joined organisation.",
//     });
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, error: error.message || "Unknown error." },
//       { status: 400 }
//     );
//   }
// }
