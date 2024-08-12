import mongoose, { Schema, Document } from "mongoose";

export interface UserSubscriptionInterface extends Document {
  userId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCurrentPeriodEnd?: Date;
}

const UserSubscriptionSchema: Schema<UserSubscriptionInterface> = new Schema(
  {
    userId: {
      type: String,
    },
    stripeCustomerId: {
      type: String,
      unique: true,
    },
    stripeSubscriptionId: {
      type: String,
      unique: true,
    },
    stripePriceId: {
      type: String,
    },
    stripeCurrentPeriodEnd: {
      type: Date,
    },
  },
  { timestamps: true },
);

const UserSubscription =
  (mongoose.models
    ?.UserSubscription as mongoose.Model<UserSubscriptionInterface>) ||
  mongoose.model<UserSubscriptionInterface>(
    "UserSubscription",
    UserSubscriptionSchema,
  );

export default UserSubscription;
