"use client";

import { app } from "@firebase/auth/appConfig";
import {
  doc,
  getFirestore,
  setDoc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";

export default async function updateDatabase(
  encryptedUserInput: string,
  exerciseSlug: string
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

    const result = await response.json();

    const db = getFirestore(app);
    const userID = result.userID;
    const userRef = doc(db, "users", userID);
    const createdAt = serverTimestamp();

    await setDoc(
      userRef,
      {
        exercises: {
          [exerciseSlug]: {
            encryptedUserInput: encryptedUserInput,
            createdAt: createdAt,
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
