import express from "express" ;
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
getallContacts ,
getMessagesByUserId,
sendMessage ,
getUserChats,
getChatPartners,
getUnreadCounts,
markMessagesAsSeen

} from "../controllers/message.controllers.js";

import { arjectProtection } from "../middleware/Arcjet.middleware.js";
const messageRoutes = express.Router() ;

//these will run in serial order 

messageRoutes.use(arjectProtection , protectRoute) ;
messageRoutes.get("/unread", protectRoute, getUnreadCounts);

messageRoutes.get("/contacts" , getallContacts) ;

messageRoutes.get("/chats" , getChatPartners) ;

messageRoutes.get("/:id" ,getMessagesByUserId) ;

messageRoutes.get("/chats", protectRoute, getUserChats);
messageRoutes.post("/send/:id"  , sendMessage) ;
messageRoutes.put("/mark-seen/:senderId", protectRoute, markMessagesAsSeen);

export default messageRoutes;