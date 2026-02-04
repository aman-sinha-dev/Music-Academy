import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

import connectDB from "./config/database.js";
import { PORT, CORS_ORIGIN } from "./config/env.js";

import adminRoutes from "./app/admin/route.js";
import contactRoutes from "./app/contact/route.js"


import { globalRateLimiter } from "./middlewares/rateLimiter.js";

const app = express();

app.set("trust proxy", 1); // if behind a proxy (e.g., Nginx, Vercel)
app.disable("x-powered-by");

app.use(express.json({ limit: "100kb" })); 
app.use(express.urlencoded({ limit: "100kb", extended: false }));

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "data:", "https://res.cloudinary.com"],
        "script-src": ["'self'"],
      },
    },
    crossOriginResourcePolicy: { policy: "same-origin" },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    frameguard: { action: "deny" },
    noSniff: true,
  })
);

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(mongoSanitize());
app.use(globalRateLimiter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running...",
  });
});

app.use("/admin", adminRoutes);
app.use("/contact", contactRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method}:${req.originalUrl} not found`,
  });
});

app.use((err, req, res, next) => {
  if (err.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      message: "Payload too large.",
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: "Internal Server Error",
  });
});

connectDB().then(() => {
  app.listen(PORT);
});
