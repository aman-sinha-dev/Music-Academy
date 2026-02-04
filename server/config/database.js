import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    process.exit(1);
  }
};

export default connectDB;
