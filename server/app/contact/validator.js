import { z } from "zod";

export const contactSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, "Name must be at least 2 characters long")
      .max(100, "Name cannot exceed 100 characters")
      .trim(),

    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" })
      .toLowerCase()
      .trim(),

    phone: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => !val || /^[+]?[0-9\s-]+$/.test(val),
        "Phone number contains invalid characters"
      )
      .refine((val) => {
        if (!val) return true;
        const digits = val.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 15;
      }, "Phone number must be between 10 and 15 digits"),

    subject: z
      .string({ required_error: "Subject is required" })
      .min(5, "Subject must be at least 5 characters long")
      .max(200, "Subject cannot exceed 200 characters")
      .trim(),

    message: z
      .string({ required_error: "Message is required" })
      .min(20, "Message must be at least 20 characters long")
      .max(2000, "Message cannot exceed 2000 characters")
      .trim(),
  })
  .strict();
