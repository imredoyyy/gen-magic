import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { connectToDb } from "@/lib/connect-to-db";
import { absoluteUrl } from "@/lib/utils";
import UserSubscription, {
  UserSubscriptionInterface,
} from "@/models/user-subscription";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDb();

    const userSubscription = await UserSubscription.findOne({
      userId,
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeBillingSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return NextResponse.json({ url: stripeBillingSession.url });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "GenMagic Pro",
              description: "Access to all GenMagic features",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (err) {
    console.log(`Stripe Error: ${err}`);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
