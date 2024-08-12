import { auth } from "@clerk/nextjs/server";
import User from "@/models/user";

import { MAX_FREE_COUNTS } from "@/constants/constant";
import { connectToDb } from "./connect-to-db";

export const increaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  await connectToDb();

  const userApiLimit = await User.findOne({ clerkUserId: userId });

  if (userApiLimit) {
    await User.updateOne(
      { clerkUserId: userId },
      { $set: { freeCounts: userApiLimit.freeCounts + 1 } },
    );
  } else {
    await User.create({ clerkUserId: userId, freeCounts: 1 });
  }
};

export const checkApiLimit = async (): Promise<boolean> => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  await connectToDb();

  const userApiLimit = await User.findOne({ clerkUserId: userId });

  if (!userApiLimit || userApiLimit.freeCounts < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async (): Promise<number> => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  await connectToDb();

  const userApiLimit = await User.findOne({ clerkUserId: userId });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.freeCounts;
};
