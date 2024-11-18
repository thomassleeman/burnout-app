"use client";

import React, { useState } from "react";
import { auth } from "@/firebase/auth/appConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import useSubscriptionStatus from "@/hooks/useSubscriptionStatus";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Pricing = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const { status, quantity } = useSubscriptionStatus(); // Destructure subscription info
  const [isProcessing, setIsProcessing] = useState(false);

  // Plan selection state
  const [selectedPlan, setSelectedPlan] = useState("monthly"); // Default to monthly

  // Number of seats state for tiered plan
  const [quantityState, setQuantityState] = useState(1);

  // Pricing tiers for the tiered plan
  const tiers = [
    { min: 1, max: 5, price: 3.0 },
    { min: 6, max: 25, price: 2.5 },
    { min: 26, max: 50, price: 2.0 },
    { min: 51, max: Infinity, price: 1.5 },
  ];

  // Function to get price per seat based on quantity
  const getPricePerSeat = (quantity: number) => {
    for (let tier of tiers) {
      if (quantity >= tier.min && quantity <= tier.max) {
        return tier.price;
      }
    }
    return tiers[tiers.length - 1].price;
  };

  const pricePerSeat = getPricePerSeat(quantityState);
  const totalPrice = (pricePerSeat * quantityState).toFixed(2);

  // Price IDs for your products (replace with your actual price IDs)
  const priceIds = {
    monthly:
      process.env.NODE_ENV === "development"
        ? "price_1Q559iRt1NtyhKJWmHEzKvQc" // Monthly price ID
        : "",
    yearly:
      process.env.NODE_ENV === "development"
        ? "price_1Q55BBRt1NtyhKJWrTdowOJM" // Yearly price ID
        : "",
    tiered:
      process.env.NODE_ENV === "development"
        ? "price_1Q5mCrRt1NtyhKJW7OJVVmmc" // Tiered price ID
        : "",
  };

  const handleSubscribe = async () => {
    if (!user) {
      router.push("/signin");
      return;
    }

    setIsProcessing(true);

    try {
      const idToken = await user.getIdToken();

      // Determine the priceId and quantity based on the selected plan
      let priceId = "";
      let planQuantity = 1; // Default quantity

      if (selectedPlan === "monthly" || selectedPlan === "yearly") {
        priceId = priceIds[selectedPlan];
        planQuantity = 1; // Single-seat only
      } else if (selectedPlan === "tiered") {
        priceId = priceIds.tiered;
        planQuantity = quantityState;
      }

      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          priceId,
          quantity: planQuantity,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        console.error("Error creating checkout session:", error);
        // Display error to the user
        setIsProcessing(false);
        return;
      }

      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe not loaded");
        setIsProcessing(false);
        return;
      }

      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        console.error("Error redirecting to checkout:", result.error);
        // Display error to the user
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Error in handleSubscribe:", err);
      // Display error to the user
      setIsProcessing(false);
    }
  };

  const userLoading = (
    <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
      <h2 className="text-3xl text-green-900 dark:text-slate-200">
        Loading...
      </h2>
    </div>
  );

  const subscriptionActive = (
    <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
      <h2 className="text-3xl text-green-900 dark:text-slate-200">
        You already have an active subscription.
      </h2>
    </div>
  );

  const userLoaded = (
    <>
      <section id="pricing">
        <div className="mx-auto max-w-5xl px-8 py-24">
          <div className="mb-20 flex w-full flex-col text-center">
            <p className="text-primary mb-2 font-medium">Pricing</p>
          </div>

          <div className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
            <div className="w-full max-w-lg">
              <div className="bg-base-100 relative z-10 flex h-full flex-col gap-5 rounded-xl p-8 lg:gap-8">
                {/* Plan Selection */}
                <div className="flex flex-col gap-4">
                  <label className="font-semibold">Choose a Plan:</label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option value="monthly">Monthly Plan</option>
                    <option value="yearly">Yearly Plan (60% OFF 💰)</option>
                    <option value="tiered">Tiered Plan (Multiple Seats)</option>
                  </select>
                </div>

                {/* Number of Seats Input (only for tiered plan) */}
                {selectedPlan === "tiered" && (
                  <div className="flex flex-col gap-4">
                    <label htmlFor="quantity" className="font-semibold">
                      Number of Seats:
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantityState}
                      onChange={(e) => setQuantityState(Number(e.target.value))}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                )}

                {/* Pricing Display */}
                {selectedPlan !== "tiered" ? (
                  // Fixed pricing for monthly/yearly plans
                  <div className="flex gap-2">
                    <p className={`text-5xl font-extrabold tracking-tight`}>
                      £
                      {selectedPlan === "monthly"
                        ? "9.99"
                        : selectedPlan === "yearly"
                        ? "99.00"
                        : ""}
                    </p>
                    <div className="mb-[4px] flex flex-col justify-end">
                      <p className="text-base-content/80 text-sm font-semibold uppercase tracking-wide">
                        {selectedPlan === "monthly"
                          ? "/month"
                          : selectedPlan === "yearly"
                          ? "/year"
                          : ""}
                      </p>
                    </div>
                  </div>
                ) : (
                  // Pricing for tiered plan
                  <>
                    <div className="flex gap-2">
                      <p className={`text-5xl font-extrabold tracking-tight`}>
                        £{pricePerSeat}{" "}
                        <span className="text-xl">per seat</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className={`text-3xl font-bold tracking-tight`}>
                        Total: £{totalPrice}
                      </p>
                    </div>
                  </>
                )}

                {/* Features List */}
                <ul className="flex-1 space-y-2.5 text-base leading-relaxed">
                  {[
                    { name: "Access to premium features" },
                    { name: "Priority support" },
                    { name: "Regular updates" },
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-[18px] w-[18px] shrink-0 opacity-80"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>

                {/* Subscribe Button */}
                <div className="space-y-2">
                  <button
                    className="btn btn-primary btn-block rounded-md bg-emerald-700 px-3 py-2 text-white"
                    onClick={handleSubscribe}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Subscribe"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Display pricing tiers (only for tiered plan) */}
          {selectedPlan === "tiered" && (
            <div className="mt-10">
              <h3 className="mb-4 text-2xl font-semibold">Pricing Tiers:</h3>
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Number of Seats</th>
                    <th className="px-4 py-2">Price per Seat</th>
                  </tr>
                </thead>
                <tbody>
                  {tiers.map((tier, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        {tier.min} - {tier.max === Infinity ? "∞" : tier.max}
                      </td>
                      <td className="border px-4 py-2">
                        £{tier.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );

  if (loading || status === "loading") {
    return userLoading;
  }

  if (status === "active") {
    return subscriptionActive;
  }

  return userLoaded;
};

export default Pricing;

// "use client";

// import React, { useState } from "react";
// import { auth } from "@/firebase/auth/appConfig";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { loadStripe } from "@stripe/stripe-js";
// import { useRouter } from "next/navigation";
// import useSubscriptionStatus from "@/hooks/useSubscriptionStatus";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// const Pricing = () => {
//   const router = useRouter();
//   const [user, loading, error] = useAuthState(auth);
//   const status = useSubscriptionStatus();
//   const [isProcessing, setIsProcessing] = useState(false);

//   // Plan selection state
//   const [selectedPlan, setSelectedPlan] = useState("monthly"); // Default to monthly

//   // Number of seats state for tiered plan
//   const [quantity, setQuantity] = useState(1);

//   // Pricing tiers for the tiered plan
//   const tiers = [
//     { min: 1, max: 5, price: 3.0 },
//     { min: 6, max: 25, price: 2.5 },
//     { min: 26, max: 50, price: 2.0 },
//     { min: 51, max: Infinity, price: 1.5 },
//   ];

//   // Function to get price per seat based on quantity
//   const getPricePerSeat = (quantity: number) => {
//     for (let tier of tiers) {
//       if (quantity >= tier.min && quantity <= tier.max) {
//         return tier.price;
//       }
//     }
//     return tiers[tiers.length - 1].price;
//   };

//   const pricePerSeat = getPricePerSeat(quantity);
//   const totalPrice = (pricePerSeat * quantity).toFixed(2);

//   // Price IDs for your products (replace with your actual price IDs)
//   const priceIds = {
//     monthly:
//       process.env.NODE_ENV === "development"
//         ? "price_1Q559iRt1NtyhKJWmHEzKvQc" // Monthly price ID
//         : "",
//     yearly:
//       process.env.NODE_ENV === "development"
//         ? "price_1Q55BBRt1NtyhKJWrTdowOJM" // Yearly price ID
//         : "",
//     tiered:
//       process.env.NODE_ENV === "development"
//         ? "price_1Q5mCrRt1NtyhKJW7OJVVmmc" // Tiered price ID
//         : "",
//   };

//   const handleSubscribe = async () => {
//     if (!user) {
//       router.push("/signin");
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       const idToken = await user.getIdToken();

//       // Determine the priceId and quantity based on the selected plan
//       let priceId = "";
//       let planQuantity = 1; // Default quantity

//       if (selectedPlan === "monthly" || selectedPlan === "yearly") {
//         priceId = priceIds[selectedPlan];
//         planQuantity = 1; // Single-seat only
//       } else if (selectedPlan === "tiered") {
//         priceId = priceIds.tiered;
//         planQuantity = quantity;
//       }

//       const response = await fetch("/api/checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${idToken}`,
//         },
//         body: JSON.stringify({
//           priceId,
//           quantity: planQuantity,
//         }),
//       });

//       const { sessionId, error } = await response.json();

//       if (error) {
//         console.error("Error creating checkout session:", error);
//         // Display error to the user
//         setIsProcessing(false);
//         return;
//       }

//       const stripe = await stripePromise;

//       if (stripe) {
//         const { error: stripeError } = await stripe.redirectToCheckout({
//           sessionId,
//         });

//         if (stripeError) {
//           console.error("Error redirecting to checkout:", stripeError);
//           // Display error to the user
//           setIsProcessing(false);
//         }
//       }
//     } catch (err) {
//       console.error("Error in handleSubscribe:", err);
//       // Display error to the user
//       setIsProcessing(false);
//     }
//   };

//   const userLoading = (
//     <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
//       <h2 className="text-3xl text-green-900 dark:text-slate-200">
//         Loading...
//       </h2>
//     </div>
//   );

//   const subscriptionActive = (
//     <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
//       <h2 className="text-3xl text-green-900 dark:text-slate-200">
//         You already have an active subscription.
//       </h2>
//     </div>
//   );

//   const userLoaded = (
//     <>
//       <section id="pricing">
//         <div className="mx-auto max-w-5xl px-8 py-24">
//           <div className="mb-20 flex w-full flex-col text-center">
//             <p className="text-primary mb-2 font-medium">Pricing</p>
//           </div>

//           <div className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
//             <div className="w-full max-w-lg">
//               <div className="bg-base-100 relative z-10 flex h-full flex-col gap-5 rounded-xl p-8 lg:gap-8">
//                 {/* Plan Selection */}
//                 <div className="flex flex-col gap-4">
//                   <label className="font-semibold">Choose a Plan:</label>
//                   <select
//                     value={selectedPlan}
//                     onChange={(e) => setSelectedPlan(e.target.value)}
//                     className="select select-bordered w-full max-w-xs"
//                   >
//                     <option value="monthly">Monthly Plan</option>
//                     <option value="yearly">Yearly Plan (60% OFF 💰)</option>
//                     <option value="tiered">Tiered Plan (Multiple Seats)</option>
//                   </select>
//                 </div>

//                 {/* Number of Seats Input (only for tiered plan) */}
//                 {selectedPlan === "tiered" && (
//                   <div className="flex flex-col gap-4">
//                     <label htmlFor="quantity" className="font-semibold">
//                       Number of Seats:
//                     </label>
//                     <input
//                       type="number"
//                       id="quantity"
//                       min="1"
//                       value={quantity}
//                       onChange={(e) => setQuantity(Number(e.target.value))}
//                       className="input input-bordered w-full max-w-xs"
//                     />
//                   </div>
//                 )}

//                 {/* Pricing Display */}
//                 {selectedPlan !== "tiered" ? (
//                   // Fixed pricing for monthly/yearly plans
//                   <div className="flex gap-2">
//                     <p className={`text-5xl font-extrabold tracking-tight`}>
//                       £
//                       {selectedPlan === "monthly"
//                         ? "9.99"
//                         : selectedPlan === "yearly"
//                         ? "99.00"
//                         : ""}
//                     </p>
//                     <div className="mb-[4px] flex flex-col justify-end">
//                       <p className="text-base-content/80 text-sm font-semibold uppercase tracking-wide">
//                         {selectedPlan === "monthly"
//                           ? "/month"
//                           : selectedPlan === "yearly"
//                           ? "/year"
//                           : ""}
//                       </p>
//                     </div>
//                   </div>
//                 ) : (
//                   // Pricing for tiered plan
//                   <>
//                     <div className="flex gap-2">
//                       <p className={`text-5xl font-extrabold tracking-tight`}>
//                         £{pricePerSeat}{" "}
//                         <span className="text-xl">per seat</span>
//                       </p>
//                     </div>
//                     <div className="flex gap-2">
//                       <p className={`text-3xl font-bold tracking-tight`}>
//                         Total: £{totalPrice}
//                       </p>
//                     </div>
//                   </>
//                 )}

//                 {/* Features List */}
//                 <ul className="flex-1 space-y-2.5 text-base leading-relaxed">
//                   {[
//                     { name: "Access to premium features" },
//                     { name: "Priority support" },
//                     { name: "Regular updates" },
//                   ].map((feature, i) => (
//                     <li key={i} className="flex items-center gap-2">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                         className="h-[18px] w-[18px] shrink-0 opacity-80"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       <span>{feature.name}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 {/* Subscribe Button */}
//                 <div className="space-y-2">
//                   <button
//                     className="btn btn-primary btn-block rounded-md bg-emerald-700 px-3 py-2 text-white"
//                     onClick={handleSubscribe}
//                     disabled={isProcessing}
//                   >
//                     {isProcessing ? "Processing..." : "Subscribe"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Display pricing tiers (only for tiered plan) */}
//           {selectedPlan === "tiered" && (
//             <div className="mt-10">
//               <h3 className="mb-4 text-2xl font-semibold">Pricing Tiers:</h3>
//               <table className="w-full table-auto">
//                 <thead>
//                   <tr>
//                     <th className="px-4 py-2">Number of Seats</th>
//                     <th className="px-4 py-2">Price per Seat</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tiers.map((tier, index) => (
//                     <tr key={index}>
//                       <td className="border px-4 py-2">
//                         {tier.min} - {tier.max === Infinity ? "∞" : tier.max}
//                       </td>
//                       <td className="border px-4 py-2">
//                         £{tier.price.toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );

//   if (loading || status === "loading") {
//     return userLoading;
//   }

//   if (status === "active") {
//     return subscriptionActive;
//   }

//   return userLoaded;
// };

// export default Pricing;
