"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/firebase/auth/appConfig";
import Stripe from "stripe";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  const [session, setSession] = useState<Stripe.Checkout.Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionQuantity, setSubscriptionQuantity] = useState<
    number | null
  >(null);

  useEffect(() => {
    const refreshTokenAndGetClaims = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        // Refresh the ID token to get the latest custom claims
        await currentUser.getIdToken(true);
        const idTokenResult = await currentUser.getIdTokenResult();

        // Get the subscriptionQuantity from custom claims
        const quantity = idTokenResult.claims.subscriptionQuantity || 1;
        setSubscriptionQuantity(quantity);
      }
    };

    refreshTokenAndGetClaims();
  }, []);

  console.log("session id: ", sessionId);

  useEffect(() => {
    const fetchSession = async () => {
      if (sessionId) {
        try {
          const response = await fetch(`/api/checkout-session/${sessionId}`);
          const data = await response.json();

          if (response.ok) {
            setSession(data.session);
          } else {
            console.error("Error fetching session:", data.error);
          }
        } catch (error) {
          console.error("Error fetching session:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchSession();
  }, [sessionId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>No session found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase, {session.customer_details?.email}.</p>
      <p>Your subscription is now active.</p>

      {subscriptionQuantity !== null && subscriptionQuantity > 1 ? (
        <div>
          <p>
            You have purchased <strong>{subscriptionQuantity}</strong> seats.
          </p>
          <p>Let&apos;s create an organization to manage your team</p>
          <button
            onClick={() => router.push("/subscribe/create-organisation")}
            className="btn btn-primary mt-4"
          >
            Create Organization
          </button>
        </div>
      ) : (
        <p>You have purchased a single-seat subscription.</p>
      )}

      {/* Display additional session details as needed */}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuccessPageContent />
    </Suspense>
  );
}
