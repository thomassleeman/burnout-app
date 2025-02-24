"use client";

import { app } from "@firebase/auth/appConfig";
import { doc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore";
import calculateRecommendedArticles from "./calculateRecommendedArticles";
import { AssessmentScores } from "@/types/chatbot";

export default async function updateDatabase(
  assessment1: AssessmentScores,
  assessment2: AssessmentScores
) {
  try {
    // 1) Get user ID
    const response = await fetch("/api/accessUserId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { userID } = await response.json();

    // 2) Prepare your data
    const assessmentsObject = { assessment1, assessment2 };

    // 3) Encrypt numeric fields in the entire object
    const encryptRes = await fetch("/api/encryption/encryptNumber", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numberInputs: assessmentsObject }),
    });

    if (!encryptRes.ok) {
      throw new Error(`Encryption failed: ${await encryptRes.text()}`);
    }

    // The shape will be exactly the same as 'assessmentsObject',
    // except every numeric property is now { iv, encryptedData }
    const encryptedAssessments = await encryptRes.json();

    // 4) Write to Firestore
    const db = getFirestore(app);
    const userRef = doc(db, "users", userID);
    const createdAt = serverTimestamp();
    const recommendedArticles = calculateRecommendedArticles(assessment2);

    await setDoc(
      userRef,
      {
        assessments: {
          burnoutAssessment: {
            // We attach createdAt, but do not re-encrypt it.
            ...encryptedAssessments,
            createdAt,
          },
        },
        articles: {
          recommended: recommendedArticles,
        },
      },
      { merge: true }
    );

    console.log(
      "Successfully updated Firestore with field-by-field encryption."
    );
  } catch (error) {
    console.error("Error in updateDatabase:", (error as Error).message);
  }
}

// "use client";

// import { app } from "@firebase/auth/appConfig";
// import { doc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore";
// import { AssessmentScores } from "@/types/chatbot";
// import calculateRecommendedArticles from "./calculateRecommendedArticles";

// export default async function updateDatabase(
//   assessment1: AssessmentScores,
//   assessment2: AssessmentScores
// ) {
//   try {
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
//     const assessmentsObject = {
//       assessment1: assessment1,
//       assessment2: assessment2,
//     };

//     const date = new Date();
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = date.toLocaleString("en-US", { month: "short" });
//     const year = date.getFullYear();
//     const recordNameDateElement = `${day}${month}${year}`;
//     // const assessmentRecordName = `assessment-${recordNameDateElement}`;
//     const recommendedArticles = calculateRecommendedArticles(assessment2);

//     setDoc(
//       userRef,
//       {
//         assessments: {
//           burnoutAssessment: {
//             // [assessmentRecordName]: {
//             ...assessmentsObject,
//             createdAt: createdAt,
//           },
//         },
//         // },
//         articles: {
//           recommended: recommendedArticles, // Removed arrayUnion to overwrite
//         },
//       },
//       { merge: true }
//     );
//   } catch (error) {
//     console.error("Error:", (error as Error).message);
//   }
// }
