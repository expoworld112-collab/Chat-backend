import jwt from "jsonwebtoken"
import User from "../models/User.js";
import {ENV} from "../lib/env.js";
export const socketAuthMiddleware = async  (socket ,next ) => {
   try {
    const token = socket.handshake.header.cookie
    ?.split(";")
    .find((row) =>  row.startsWith("jwt="))
    ?.split("=")[1] ;

    if(!token){
        console.log ("socket conection rejected no token provided");
        return next (newError("Unauthorized - No Token Provided"));
    }
    // verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if(!decoded) {
        console.log("Socket connection rejected : Invalid token");
        return next(newError("Unauthorized-Invalid token"));
    }
    //find the  user fromdb
    const user =await User.findById(decoded.userId).select("-password") ;
    if(!user){
        console.log(" Socket connection rejected: User not found");
        return next (new Error("User not found")) ;
    }

    socket.user = user ;
    socket.userId = user._id.toString() ;
    console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`) ;
   } catch (error) {
    console.log ("error in socket authentication" ,error. message);
    next(new Error ("Unauthorized -authentication failed"));
   }

};