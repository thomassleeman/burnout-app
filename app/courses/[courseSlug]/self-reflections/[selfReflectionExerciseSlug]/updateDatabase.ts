"use client";

import { app } from "@firebase/auth/appConfig";
import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export default async function updateDatabase(
  encryptedUserInput: string,
  courseSlug: string,
  exerciseSlug: string,
  allFieldsCompleted: boolean // Accept the allFieldsCompleted parameter
) {
  try {
    // Fetch the user ID from your API
    const response = await fetch("/api/accessUserId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const userID = result.userID;

    const db = getFirestore(app);
    const userRef = doc(db, "users", userID);
    const createdAt = serverTimestamp();

    // Retrieve existing courses data
    const userSnapshot = await getDoc(userRef);
    let existingCourses: { [key: string]: any } = {}; // Explicitly typed
    if (userSnapshot.exists()) {
      existingCourses = userSnapshot.data().courses || {};
    }

    // Merge new resource completion status with existing data
    const existingResourcesCompleted =
      existingCourses[courseSlug]?.resourcesCompleted || {};

    // Update the completion status based on allFieldsCompleted
    const updatedResourcesCompleted = {
      ...existingResourcesCompleted,
      [exerciseSlug]: allFieldsCompleted, // Now updates to true or false
    };

    const updatedCourseData = {
      // courseName: courseSlug,
      [exerciseSlug]: {
        encryptedUserInput: encryptedUserInput,
        createdAt: createdAt,
      },
      resourcesCompleted: updatedResourcesCompleted,
    };

    // Write back the updated data using setDoc with merge: true
    await setDoc(
      userRef,
      {
        courses: {
          [courseSlug]: updatedCourseData,
        },
      },
      { merge: true }
    );

    return true;
  } catch (error) {
    console.error("Error updating database:", (error as Error).message);
    return false;
  }
}
