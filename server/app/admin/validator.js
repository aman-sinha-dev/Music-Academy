import { z } from "zod";

// Register schema
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(6, { message: "Email must be at least 6 characters" })
      .max(50, { message: "Email must be at most 50 characters" })
      .email({ message: "Invalid email address" })
      .toLowerCase()
      .trim(),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must be at most 50 characters" }),
  })
  .strict();

// Login schema
export const loginSchema = z
  .object({
    email: z
      .string()
      .min(6, { message: "Email must be at least 6 characters" })
      .max(50, { message: "Email must be at most 50 characters" })
      .email({ message: "Invalid email address" })
      .toLowerCase()
      .trim(),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must be at most 50 characters" }),
  })
  .strict();
