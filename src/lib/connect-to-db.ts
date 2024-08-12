import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const url = process.env.MONGODB_URL!;

    if (!url) {
      throw new Error(
        "MONGODB_URL is not defined in the environment variables",
      );
    }

    if (mongoose.connection.readyState === 1) return;

    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to database:", error);
  }
};
