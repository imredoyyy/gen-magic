import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  clerkUserId: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  email: string;
  password?: string;
  image?: string;
  stripeCustomerId?: string;
  freeCounts: number;
  phoneNumber?: string;
}

const UserSchema: Schema<UserDocument> = new Schema(
  {
    clerkUserId: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    stripeCustomerId: {
      type: String,
    },
    freeCounts: {
      type: Number,
    },
  },
  { timestamps: true },
);

const User =
  (mongoose.models?.User as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>("User", UserSchema);

export default User;
