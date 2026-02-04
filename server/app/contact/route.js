import express from "express";
import { submitContact, getContacts } from "./controller.js";
import auth from "../../middlewares/auth.js";
import { authLimiter, contactLimiter } from "../../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/", contactLimiter, submitContact);

router.get("/", authLimiter, auth, getContacts);

export default router;
