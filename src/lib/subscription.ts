import { auth } from "@clerk/nextjs/server";

import UserSubscription from "@/models/user-subscription";
import { connectToDb } from "./connect-to-db";

const dayInMs = 86400000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  await connectToDb();

  const userSubscription = await UserSubscription.findOne({
    userId,
    stripeSubscriptionId: { $exists: true },
    stripeCurrentPeriodEnd: { $exists: true },
    stripeCustomerId: { $exists: true },
    stripePriceId: { $exists: true },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + dayInMs > Date.now();

  return !!isValid;
};
