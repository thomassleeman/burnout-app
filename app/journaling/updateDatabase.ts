"use client";
import { app } from "@firebase/auth/appConfig";
import { doc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore";
import { format, parse, isValid } from "date-fns";
import { EncryptedUserInputs } from "@/types/journal";

export default async function updateDatabase(
  encryptedUserInputs: EncryptedUserInputs,
  selectedDate: string,
  journalName: string // This is the journal slug
) {
  const db = getFirestore(app);

  // **Ensure selectedDate is in "dd-MMM-yyyy" format**
  const parsedDate = parse(selectedDate, "dd-MMM-yyyy", new Date());
  if (!isValid(parsedDate)) {
    console.error(`Invalid date format for selectedDate: ${selectedDate}`);
    return false;
  }
  const formattedDate = format(parsedDate, "dd-MMM-yyyy");

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

    // Save with the correct nested structure
    await setDoc(
      userDoc,
      {
        journaling: {
          [journalName]: {
            [formattedDate]: {
              encryptedUserInput: encryptedUserInputs,
              createdAt: serverTimestamp(),
            },
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
