import { z } from "zod";

export const purchaseSchema = z
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

    courseSlug: z
      .string({ required_error: "Course slug is required" })
      .min(1, "Course slug is required")
      .trim(),

    courseTitle: z
      .string({ required_error: "Course title is required" })
      .min(1, "Course title is required")
      .max(200, "Course title cannot exceed 200 characters")
      .trim(),

    coursePrice: z
      .number({ required_error: "Course price is required" })
      .positive("Course price must be positive"),
  })
  .strict();
