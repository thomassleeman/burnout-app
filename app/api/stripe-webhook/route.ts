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
  const sig = request.headers.get("stripe-signature")!;
  const body = await request.text(); // Get raw body
  console.log("stripe webhook ran");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event);
      break;
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await handleSubscriptionEvent(event);
      break;
    // Handle other event types as needed
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  const customerId = session.customer as string;

  // Retrieve the customer to get their email
  const customer = (await stripe.customers.retrieve(
    customerId
  )) as Stripe.Customer;
  const email = customer.email;

  if (!email) {
    console.error("Customer email not found");
    return;
  }

  // Retrieve the subscription to get quantity and other details
  const subscriptionId = session.subscription as string;
  if (subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const quantity = subscription.items.data[0]?.quantity || 1;
    const status = subscription.status;

    // Find the user in Firebase by email
    const user = await auth().getUserByEmail(email);

    // Fetch existing custom claims
    const existingCustomClaims = user.customClaims || {};

    // Update custom claims without overwriting existing ones
    await auth().setCustomUserClaims(user.uid, {
      ...existingCustomClaims,
      subscriptionStatus: status,
      subscriptionQuantity: quantity,
    });
  }
}

async function handleSubscriptionEvent(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;

  const customerId = subscription.customer as string;
  const status = subscription.status;
  const quantity = subscription.items.data[0]?.quantity || 1;

  // Retrieve the customer to get their email
  const customer = (await stripe.customers.retrieve(
    customerId
  )) as Stripe.Customer;
  const email = customer.email;

  if (!email) {
    console.error("Customer email not found");
    return;
  }

  // Find the user in Firebase by email
  const user = await auth().getUserByEmail(email);

  // Fetch existing custom claims
  const existingCustomClaims = user.customClaims || {};

  // Update custom claims without overwriting existing ones
  await auth().setCustomUserClaims(user.uid, {
    ...existingCustomClaims,
    subscriptionStatus: status,
    subscriptionQuantity: quantity,
  });
}
