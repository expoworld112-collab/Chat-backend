import  {Server} from "socket.io";
// import http from "https" ;
import http from "http";  

import express from "express" ;
import {ENV} from "./env.js" ;
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";
export const app = express();
export const server = http.createServer(app);

const io = new Server(server , 
    {
        cors:{
        origin: ENV.CLIENT_URL || "http://localhost:5173",
        credentials : true ,
    },
    });
    io.use(socketAuthMiddleware) ;
        const userSocketMap = {};

// we will use this function to check if the user is online or not
export function getReceiverSocketId(userId){
    return userSocketMap [userId];
}
// this is fofr storige online users
    io.on("connection",(socket) => {
        console.log("A user connection" ,socket.user.fullName);
        const userId = socket.userId;
      if (userId)  userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers" , Object.keys(userSocketMap)) ;
     socket.on("disconnect" ,() => {
console.log("Auser disconnected " , socket.user?.fullName);
  if (userId) delete userSocketMap[userId];
   io.emit("getOnlineUsers" , Object.keys(userSocketMap));
      });
    });
    export {io} ;  