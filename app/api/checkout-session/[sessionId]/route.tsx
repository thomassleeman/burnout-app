import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = params;
  console.log("sessionId api/checkout-session/sessionId:", sessionId);

  if (!sessionId) {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer"],
    });
    return NextResponse.json({ session });
  } catch (error: any) {
    console.error("Error retrieving checkout session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
