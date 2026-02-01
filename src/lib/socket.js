import  {Server} from "socket.io";
import http from "https" ;
import express from "express" ;
import {ENV} from "./env.js" ;
import { socketAuthMiddleware } from "../../../backend/src/middleware/socket.auth.middleware.js";
const app = express();
const server = http.createServer(app);

const io = new Server(server , 
    {
        cors:{
        orgin:[ENV.CLIENT_URL] ,
        credentials : true ,
    },
    });
    io.use(socketAuthMiddleware) ;
// we will use this function to check if the user is online or not
export function getreceiverSocketId(userId){
    return userSocketMap [userId];
}
// this is fofr storige online users
    const userSocketMap = {};
    io.on("connection " , (socket) => {
        console.log("A user connection" ,socket.user.fullName);
        const userId = socket.userId;
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers" , Object.keys(userSocketMap)) ;
     socket.on("disconnect" ,() => {
console.log("Auser disconnected " , socket.user.fullName);
   delete userSocketMap[userId];
   io.emit("getOnlineUsers" , Object.keys(userSocketMap));
      });
    });
    export {io,app ,server} ;  