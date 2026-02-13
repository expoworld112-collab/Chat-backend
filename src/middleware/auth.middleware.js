import jwt from "jsonwebtoken";
import User from"../models/User.js";
import{ ENV }from "../lib/env.js";


export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // ✅ VERY IMPORTANT

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not authorized" });
  }
};
