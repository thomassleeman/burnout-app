import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "firebase-admin";
import { adminInit } from "@/firebase/auth/adminConfig";

adminInit();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase ID token from Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.split(" ")[1];

    const decodedToken = await auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;

    if (!email) {
      return NextResponse.json(
        { error: "Email not available" },
        { status: 400 }
      );
    }

    // Retrieve priceId and quantity from the request body
    const { priceId, quantity } = await request.json();

    if (!priceId || !quantity) {
      return NextResponse.json(
        { error: "Missing priceId or quantity" },
        { status: 400 }
      );
    }

    // Check if user already has a Stripe customer ID
    let customerId: string | undefined = decodedToken.stripeCustomerId;

    if (!customerId) {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email,
        metadata: { firebaseUID: uid },
      });

      customerId = customer.id;

      // Fetch existing custom claims
      const user = await auth().getUser(uid);
      const existingCustomClaims = user.customClaims || {};

      // Update custom claims without overwriting existing ones
      await auth().setCustomUserClaims(uid, {
        ...existingCustomClaims,
        stripeCustomerId: customerId,
      });
    }

    // Create the Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity }],
      success_url: `${request.nextUrl.origin}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { auth } from "firebase-admin";
// import { adminInit } from "@/firebase/auth/adminConfig";

// adminInit();

// // Initialize Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-06-20",
// });

// export async function POST(request: NextRequest) {
//   try {
//     // Verify Firebase ID token from Authorization header, get UID and email
//     const authHeader = request.headers.get("authorization");

//     if (!authHeader) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const idToken = authHeader.split(" ")[1];

//     const decodedToken = await auth().verifyIdToken(idToken);
//     const uid = decodedToken.uid;
//     const email = decodedToken.email;

//     if (!email) {
//       return NextResponse.json(
//         { error: "Email not available" },
//         { status: 400 }
//       );
//     }

//     // Retrieve priceId from the request body
//     const { priceId } = await request.json();
//     if (!priceId) {
//       return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
//     }

//     // Check if user already has a Stripe customer ID
//     let customerId: string | undefined = decodedToken.stripeCustomerId;

//     // Create a new customer in Stripe
//     if (!customerId) {
//       const customer = await stripe.customers.create({
//         email,
//         metadata: { firebaseUID: uid },
//       });

//       customerId = customer.id;

//       // Fetch existing custom claims
//       const user = await auth().getUser(uid);
//       const existingCustomClaims = user.customClaims || {};

//       // Update custom claims without overwriting existing ones
//       await auth().setCustomUserClaims(uid, {
//         ...existingCustomClaims,
//         stripeCustomerId: customerId,
//       });
//     }

//     // Create the Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       customer: customerId,
//       payment_method_types: ["card"],
//       mode: "subscription",
//       line_items: [{ price: priceId, quantity: 1 }],
//       success_url: `${request.nextUrl.origin}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${request.nextUrl.origin}/cancel`,
//     });

//     return NextResponse.json({ sessionId: session.id });
//   } catch (error: any) {
//     console.error("Error creating checkout session:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
