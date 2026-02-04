import rateLimit from "express-rate-limit";

// General API limiter
export const globalRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 30, // limit each IP to 30 requests per windowMs
  message: {
    success: false,
    message: "Too many requests, please try again after sometime.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,
});

// Strict limiter for sensitive routes (login, register)
export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 15, // allow only 15 requests per window
  message: {
    success: false,
    message: "Too many requests, please try again after sometime.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Contact API limiter
export const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3, // allow only 3 requests per window
  message: {
    success: false,
    message: "Too many requests, please try again after sometime.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
