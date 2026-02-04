import express from "express";
import { login, register } from "./controller.js";
import { authLimiter } from "../../middlewares/rateLimiter.js";
const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

export default router;
