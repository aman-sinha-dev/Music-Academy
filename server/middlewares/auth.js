import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import Admin from "../app/admin/model.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Something went wrong! Please Login Again" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res
        .status(401)
        .json({ message: "Something went wrong! Please Login Again" });
    }

    req.admin = { id: decoded.id, email: admin.email };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Something went wrong! Please Login Again" });
    }
    if (err.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Something went wrong! Please login again." });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export default auth;
