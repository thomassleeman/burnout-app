"use server";

import { adminInit } from "@/firebase/auth/adminConfig";
import { getFirestore } from "firebase-admin/firestore";

export async function getFirestoreUser(uid: string): Promise<UserData | null> {
  try {
    adminInit();
    const db = getFirestore();
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return null;
    }

    return userDoc.data() as UserData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
