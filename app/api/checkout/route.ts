import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY missing on Vercel" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);

    const body = await req.json();
    const items = body.items || [];
    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        quantity: item.quantity || 1,
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name || "LA VIE Perfume",
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
      })),
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Checkout failed" },
      { status: 500 }
    );
  }
}