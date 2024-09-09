"use client";

import { app } from "@firebase/auth/appConfig";
import { doc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore";

export default async function updateDatabase(
  encryptedUserInputs: any,
  selectedDate: string
) {
  const db = getFirestore(app);

  try {
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
    const userDoc = doc(db, "users", result.userID);

    // Update the journal field with the selected date as the key
    await setDoc(
      userDoc,
      {
        journal: {
          [selectedDate]: {
            encryptedUserInput: encryptedUserInputs, // Now uses prompt IDs as keys
            createdAt: new Date(),
          },
        },
      },
      { merge: true }
    );

    return true;
  } catch (error) {
    console.error("Error updating the database:", error);
    return false;
  }
}
