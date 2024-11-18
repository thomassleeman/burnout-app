"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Firebase imports
import { app } from "@firebase/auth/appConfig";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";

interface GetStartedButtonProps {
  setRevealExercise: (value: boolean) => void;
  exerciseSlug: string;
  headings: string[];
}

export default function GetStartedButton({
  setRevealExercise,
  exerciseSlug,
  headings,
}: GetStartedButtonProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
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

        // Fetch the existing user data
        const userDoc = await getDoc(userRef);
        const existingExercises = userDoc.exists()
          ? userDoc.data().exercises
          : {};

        // Get existing resourcesCompleted for the exercise or initialize it
        const existingResourcesCompleted =
          existingExercises[exerciseSlug]?.resourcesCompleted || {};

        // Check if the user has completed any resources
        const completedResources = Object.values(
          existingResourcesCompleted
        ).filter((completed) => completed);

        if (completedResources.length > 0) {
          // User has completed one or more resources
          setRevealExercise(true);
        }
      } catch (error) {
        console.error("Error:", (error as Error).message);
      }
    };

    fetchUserData();
  }, [exerciseSlug, setRevealExercise]);

  const handleClick = async () => {
    setIsUpdating(true);

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

      // Fetch the existing user data
      const userDoc = await getDoc(userRef);
      const existingExercises = userDoc.exists()
        ? userDoc.data().exercises
        : {};

      // Get existing resourcesCompleted for the exercise or initialize it
      const existingResourcesCompleted =
        existingExercises[exerciseSlug]?.resourcesCompleted || {};

      // Merge new headings with existing ones without overwriting completed statuses
      const resourcesCompleted = { ...existingResourcesCompleted };
      headings.forEach((heading) => {
        if (!(heading in resourcesCompleted)) {
          resourcesCompleted[heading] = false;
        }
      });

      // Prepare the exercise data
      const exerciseData = {
        [exerciseSlug]: {
          resourcesCompleted: resourcesCompleted,
        },
      };

      // Update the user's exercises data in the database
      await setDoc(
        userRef,
        {
          exercises: exerciseData,
        },
        { merge: true }
      );

      // Update state in parent component
      setRevealExercise(true);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      alert("Failed to update database. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isUpdating}
      className="mt-32 w-full rounded-md bg-emerald-800 px-4 py-2 text-xl text-white hover:bg-emerald-700"
    >
      {isUpdating ? "Starting..." : "Get Started"}
    </button>
  );
}
