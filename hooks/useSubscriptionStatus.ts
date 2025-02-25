"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase/auth/appConfig";
import { onIdTokenChanged, User } from "firebase/auth";

interface SubscriptionInfo {
  status: "loading" | "active" | "none"; // Define possible status values explicitly for better type safety
  quantity: number;
}

export default function useSubscriptionStatus(): SubscriptionInfo {
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>({
    status: "loading",
    quantity: 0,
  });

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user: User | null) => {
      if (user) {
        const tokenResult = await user.getIdTokenResult(true);
        console.log("token result: ", tokenResult);
        setSubscriptionInfo({
          status:
            (tokenResult.claims.subscriptionStatus as "active" | "none") ||
            "none",
          quantity:
            typeof tokenResult.claims.subscriptionQuantity === "number"
              ? tokenResult.claims.subscriptionQuantity
              : 0,
        });
      } else {
        setSubscriptionInfo({ status: "none", quantity: 0 });
      }
    });
    return () => unsubscribe();
  }, []);

  return subscriptionInfo;
}
