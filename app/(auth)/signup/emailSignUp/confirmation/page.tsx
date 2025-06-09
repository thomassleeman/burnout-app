"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/auth/appConfig";
import { onAuthStateChanged } from "firebase/auth";
import Spinner from "@/components/ui/_components/Spinner"; // Adjust path as needed

export default function SignUpConfirmation() {
  const router = useRouter();
  const [message, setMessage] = useState("Preparing your account...");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to their home page
        setMessage("Redirecting to your home page...");
        setTimeout(() => {
          router.push(`/home/${user.uid}`);
        }, 1500);
      } else {
        setMessage(
          "Email verified! You are being redirected to the signin page..."
        );
        setTimeout(() => {
          router.push("/signin");
        }, 1500);
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, [router]);

  return (
    <main className="min-h-screen">
      <div className="flex min-h-full flex-1 items-center justify-center">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Email Verification Successful
              </h2>
            </div>
            <div className="mt-8">
              <p className="text-gray-900">{message}</p>
              <div className="mt-4 flex justify-center">
                <Spinner size="medium" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
