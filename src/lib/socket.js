import { Server } from "socket.io";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

let io;
let userSocketMap = {};
export const getReceiverSocketId = (userId) =>{
  return userSocketMap[userId] ;
};
export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: ENV.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    // const userId = socket.handshake.query.userId;
     const userId = socket.user._id.toString();
          userSocketMap[userId] = socket.id;

    io.emit("OnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      // if (userId)
       delete userSocketMap[userId];
      io.emit("OnlineUsers", Object.keys(userSocketMap));
    });
  });
};


export { io };
                                