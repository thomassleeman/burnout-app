"use client";
//react
import { useState, useEffect } from "react";
import { User } from "firebase/auth";

export default function ClearCustomerClaims({ user }: { user: User }) {
  const [customClaims, setCustomClaims] = useState({});

  useEffect(() => {
    const fetchCustomClaims = async () => {
      if (user) {
        try {
          // Fetch the ID token result
          const idTokenResult = await user.getIdTokenResult();
          // Set custom claims
          setCustomClaims(idTokenResult.claims);
          console.log("custom claims: ", idTokenResult.claims);
        } catch (error) {
          console.error("Error fetching custom claims:", error);
        }
      } else {
        return;
      }
    };

    fetchCustomClaims();
  }, [user]);

  const handleClearClaims = async () => {
    if (!user) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      // Retrieve the user's ID token
      const idToken = await user.getIdToken();

      // Make a POST request to the /remove-custom-claims API
      const response = await fetch("/api/remove-custom-claims", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Custom claims cleared successfully.");
      } else {
        alert(result.error || "Failed to clear custom claims.");
      }
    } catch (error: any) {
      console.error("Error clearing custom claims:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      <h2>Custom claims:</h2>
      <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
        {JSON.stringify(customClaims, null, 2)}
      </pre>

      <button
        onClick={handleClearClaims}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Clear Custom Claims
      </button>
    </>
  );
}
