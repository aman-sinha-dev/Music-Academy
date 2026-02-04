import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {  JWT_SECRET } from "../../config/env.js";
import Admin from "./model.js";
import { loginSchema, registerSchema } from "./validator.js";

// Register Admin
export const register = async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      const validationErrors =
        parsed.error?.issues?.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })) || [];

      return res.status(400).json({
        success: false,
        message: validationErrors[0]?.message || "Validation error",
        errors: validationErrors,
      });
    }

    const { email, password } = parsed.data;

    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin account already exists. Registration is closed.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: { email: admin.email },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// Admin Login
export const login = async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      const validationErrors =
        parsed.error?.issues?.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })) || [];

      return res.status(400).json({
        success: false,
        message: validationErrors[0]?.message || "Please provide valid data",
        errors: validationErrors,
      });
    }

    const { email, password } = parsed.data;

    const admin = await Admin.findOne({ email });

    // ❌ LOGIN FAILED — EMAIL NOT FOUND
    if (!admin) {
      const reason = "Email not registered";

     

      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    // ❌ LOGIN FAILED — WRONG PASSWORD
    if (!isMatch) {
      const reason = "Incorrect password";

     
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ LOGIN SUCCESS
    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
      expiresIn: "5d",
    });

    

    return res.json({
      success: true,
      message: "Login successful",
      data: { token },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
