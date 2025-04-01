"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { auth } from "@/firebase/auth/appConfig";
import Stripe from "stripe";
import { usePathname } from "next/navigation";
import Spinner from "@/components/ui/_components/Spinner";
import { useAuthState } from "react-firebase-hooks/auth";
import PaymentSuccessful from "./PaymentSuccessful";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const url = usePathname();

  const [user, authStateloading, error] = useAuthState(auth);
  const [session, setSession] = useState<Stripe.Checkout.Session | null>(null);
  const [claimsLoading, setClaimsLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [subscriptionQuantity, setSubscriptionQuantity] = useState<
    number | null
  >(null);
  const [errorUi, setErrorUi] = useState(false);

  useEffect(() => {
    const refreshTokenAndCheckClaims = async (retries = 3) => {
      while (retries > 0) {
        if (!authStateloading && user) {
          try {
            if (!user) throw new Error("User not authenticated");
            //Forces a token refresh to ensure the latest custom claims are included.
            await user.getIdToken(true);
            //retrieves the token.
            const idTokenResult = await user.getIdTokenResult();
            const quantity =
              Number(idTokenResult.claims.subscriptionQuantity) || 1;
            setSubscriptionQuantity(quantity);
            setClaimsLoading(false);
            return;
          } catch (error) {
            console.error("Error refreshing claims:", error);
            // Sentry.captureException(error);
            setClaimsLoading(false);
            setErrorUi(true);
            setSubscriptionQuantity(null); // Fallback if claims are not updated
          }
        }
        retries--;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait before retrying
      }
    };

    refreshTokenAndCheckClaims();
  }, [authStateloading, user]);

  useEffect(() => {
    const fetchSessionWithRetry = async (retries = 3) => {
      while (retries > 0) {
        try {
          const response = await fetch(`/api/checkout-session/${sessionId}`);
          const data = await response.json();

          if (response.ok) {
            console.log("session: ", session);
            setSession(data.session);
            setSessionLoading(false);

            return;
          } else {
            console.error("Error fetching session:", data.error);
          }
        } catch (error) {
          console.error("Error fetching session:", error);
          setErrorUi(true);
          setSessionLoading(false);
        }
        retries--;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait before retrying
      }
      setSessionLoading(false);
    };

    if (sessionId) {
      fetchSessionWithRetry();
    } else {
      setSessionLoading(false);
    }
  }, [sessionId, session]);

  console.log("session: ", session);

  const loading = claimsLoading || sessionLoading;
  if (loading && !errorUi) {
    return (
      <div className="container mx-auto mt-12 p-4">
        <div className="flex items-center justify-center gap-x-4">
          <Spinner size="medium" />
          <p className="text-xl">Loading your subscription details...</p>
        </div>
      </div>
    );
  }

  if (errorUi) {
    const readableTimestamp = new Date().toLocaleString();
    // Sentry.captureMessage(
    //   `Error occured at ${url}. Session is false. Session: ${sessionId}. This means that the user's stripe provided sessionId failed to be validated by stripe.`
    // );

    return (
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-balance mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Please bear with us,
          </h1>
          <p className="my-6 text-base font-semibold text-red-400">
            An error has occurred with our payment provider
          </p>
          <p className="text-pretty mt-6 max-w-2xl text-lg font-medium text-gray-500 sm:text-xl/8">
            Your payment has been processed but we have encountered an issue
            retrieving your subscription details from our payment provider. This
            may be due to a network issue. Please try again by refreshing the
            page.
            <br />
            If the problem persists please{" "}
            <span className="hidden md:inline-block">click</span>
            <span className="inline-block md:hidden">tap</span> below to email
            the details to support.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={`mailto:support@pasuhealth.com?subject=urgent user error: ${readableTimestamp} &body=Error occured at ${url}. Session is false. Session: ${sessionId}`}
              className="text-lg font-semibold text-emerald-700"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      {session ? (
        <PaymentSuccessful
          email={session.customer_details?.email || ""}
          quantity={subscriptionQuantity ?? 1}
        />
      ) : (
        <Spinner size="medium" />
      )}

      {/* Display additional session details as needed */}
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuccessPageContent />
    </Suspense>
  );
}
