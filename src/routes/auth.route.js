import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arjectProtection } from "../middleware/Arcjet.middleware.js";
import { upload } from "../config/multer.js";

const authRoutes = express.Router();

console.log("AUTH ROUTES LOADED FROM THIS FILE");

// Public
authRoutes.post("/signup" , signup);
authRoutes.post("/login", login);

// Protected
authRoutes.post("/logout", protectRoute, arjectProtection ,logout);
authRoutes.put("/update-profile", protectRoute, arjectProtection , upload.single("profilePic") , updateProfile);
authRoutes.get("/check", protectRoute, arjectProtection , checkAuth);

export default authRoutes;
