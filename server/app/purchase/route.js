import express from "express";
import { submitPurchase, getPurchases, getPurchasesByEmail } from "./controller.js";
import auth from "../../middlewares/auth.js";
import { authLimiter, contactLimiter } from "../../middlewares/rateLimiter.js";

const router = express.Router();

// POST - Submit a purchase (public)
router.post("/", contactLimiter, submitPurchase);

// GET - Get all purchases (admin only)
router.get("/", authLimiter, auth, getPurchases);

// GET - Get purchases by email (admin only)
router.get("/email/:email", authLimiter, auth, getPurchasesByEmail);

export default router;
