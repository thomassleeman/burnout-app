"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "firebase-admin";
import { adminInit } from "@/firebase/auth/adminConfig";
import { AuthClaims } from "@/types/auth";

type AuthOptions = {
  requiredClaims?: {
    [key: string]: any;
  };
  redirectTo?: string;
  returnClaims?: boolean;
};

/**
 * Server action to verify authentication
 * @param options Configuration options
 * @returns Decoded claims if returnClaims is true, otherwise undefined
 */
export async function verifyAuth(
  options: AuthOptions = {}
): Promise<AuthClaims | undefined> {
  const {
    requiredClaims = {},
    redirectTo = "/signin",
    returnClaims = false,
  } = options;

  // Get the session cookie
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) {
    redirect(redirectTo);
  }

  try {
    // Initialize Firebase Admin
    adminInit();

    // Verify the session cookie
    const decodedClaims = await auth().verifySessionCookie(sessionCookie, true);

    // Check required claims if any are specified
    for (const [key, value] of Object.entries(requiredClaims)) {
      if (decodedClaims[key] !== value) {
        // User doesn't have required claims - handle accordingly
        if (key === "admin" && value === true) {
          redirect("/401"); // Special case for admin access
        } else if (key === "subscriptionStatus" && value === "active") {
          // Handle premium content access
          const url = new URL("/access-paid-content", "http://localhost");
          redirect(`/access-paid-content?action=premium`);
        } else {
          redirect(redirectTo);
        }
      }
    }

    // Return the decoded claims if requested
    if (returnClaims) {
      return decodedClaims as unknown as AuthClaims;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    // Clear the invalid cookie
    cookies().delete("session");
    redirect(redirectTo);
  }
}

/**
 * API route helper for authentication (doesn't redirect)
 */
export async function verifyAuthApi() {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) {
    return { authenticated: false, error: "No session cookie found" };
  }

  try {
    adminInit();
    const decodedClaims = await auth().verifySessionCookie(sessionCookie, true);
    return { authenticated: true, user: decodedClaims };
  } catch (error) {
    console.error("API authentication error:", error);
    return { authenticated: false, error: "Invalid session" };
  }
}
