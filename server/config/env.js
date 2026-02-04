import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;

