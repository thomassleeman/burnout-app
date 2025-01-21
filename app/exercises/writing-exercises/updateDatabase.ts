"use client";

import { app } from "@firebase/auth/appConfig";
import { doc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore";

interface ProgressData {
  completedPrompts: number;
  totalPrompts: number;
  completionPercentage: number;
}

export default async function updateDatabase(
  encryptedUserInput: string,
  exerciseSlug: string,
  progressData: ProgressData
) {
  try {
    console.log("writing ex db update");
    const response = await fetch("/api/accessUserId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { userID } = await response.json();

    const db = getFirestore(app);
    const userRef = doc(db, "users", userID);
    const createdAt = serverTimestamp();

    await setDoc(
      userRef,
      {
        exercises: {
          [exerciseSlug]: {
            encryptedUserInput,
            createdAt,
            // Store progress in Firestore
            completedPrompts: progressData.completedPrompts,
            totalPrompts: progressData.totalPrompts,
            completionPercentage: progressData.completionPercentage,
          },
        },
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error("Error:", (error as Error).message);
    return false;
  }
}

// "use client";

// import { app } from "@firebase/auth/appConfig";
// import { doc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore";

// interface ProgressData {
//   completedPrompts: number;
//   totalPrompts: number;
//   completionPercentage: number;
// }

// export default async function updateDatabase(
//   encryptedUserInput: string,
//   exerciseSlug: string,
//   progressData: ProgressData
// ) {
//   try {
//     console.log("writing ex db update");
//     const response = await fetch("/api/accessUserId", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const { userID } = await response.json();

//     const db = getFirestore(app);
//     const userRef = doc(db, "users", userID);
//     const createdAt = serverTimestamp();

//     // Merge everything into exercises[exerciseSlug]
//     await setDoc(
//       userRef,
//       {
//         exercises: {
//           [exerciseSlug]: {
//             encryptedUserInput: encryptedUserInput,
//             createdAt: createdAt,
//             completedPrompts: progressData.completedPrompts,
//             totalPrompts: progressData.totalPrompts,
//             completionPercentage: progressData.completionPercentage,
//           },
//         },
//       },
//       { merge: true }
//     );
//     return true;
//   } catch (error) {
//     console.error("Error:", (error as Error).message);
//     return false;
//   }
// }

// "use client";

// import { app } from "@firebase/auth/appConfig";
// import {
//   doc,
//   getFirestore,
//   setDoc,
//   serverTimestamp,
//   arrayUnion,
// } from "firebase/firestore";

// export default async function updateDatabase(
//   encryptedUserInput: string,
//   exerciseSlug: string
// ) {
//   try {
//     console.log("writing ex db update");
//     const response = await fetch("/api/accessUserId", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();

//     const db = getFirestore(app);
//     const userID = result.userID;
//     const userRef = doc(db, "users", userID);
//     const createdAt = serverTimestamp();

//     await setDoc(
//       userRef,
//       {
//         exercises: {
//           [exerciseSlug]: {
//             encryptedUserInput: encryptedUserInput,
//             createdAt: createdAt,
//           },
//         },
//       },
//       { merge: true }
//     );
//     return true;
//   } catch (error) {
//     console.error("Error:", (error as Error).message);
//     return false;
//   }
// }
