console.log("AUTH ROUTES LOADED FROM THIS FILE");

import express from "express" ;
import { signup , login , logout , updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arjectProtection } from "../middleware/Arcjet.middleware.js";

const authRoutes= express.Router() ;
authRoutes.use(arjectProtection) ; 
authRoutes.post ("/signup" ,  arjectProtection, signup) ;
authRoutes.post("/login"  ,  arjectProtection,  login) ;
authRoutes.post ("/logout" , arjectProtection, logout) ;
authRoutes.put( "/update-profile" , arjectProtection , protectRoute , updateProfile ) ;
authRoutes.get("/check", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});
export default authRoutes ;