"use client";

import { app } from "@firebase/auth/appConfig";
import {
  doc,
  getFirestore,
  setDoc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { AssessmentScores } from "@/types/chatbot";
import calculateRecommendedArticles from "./calculateRecommendedArticles";

export default async function updateDatabase(
  assessment1: AssessmentScores,
  assessment2: AssessmentScores
) {
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

    const db = getFirestore(app);
    const userID = result.userID;

    const userRef = doc(db, "users", userID);
    const createdAt = serverTimestamp();
    const assessmentsObject = {
      assessment1: assessment1,
      assessment2: assessment2,
    };

    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const recordNameDateElement = `${day}${month}${year}`;
    const assessmentRecordName = `assessment-${recordNameDateElement}`;
    const recommendedArticles = calculateRecommendedArticles(assessment2);

    setDoc(
      userRef,
      {
        exercises: {
          [assessmentRecordName]: {
            ...assessmentsObject,
            createdAt: createdAt,
          },
        },
        articles: {
          recommended: arrayUnion(...recommendedArticles),
        },
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error:", (error as Error).message);
  }
}
