import express from "express" ;
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
getallContacts ,
getMessagesByUserId,
sendMessage ,
getUserChats,
getChatPartners,
getUnreadCounts,
markMessagesAsSeen,

} from "../controllers/message.controllers.js";
import multer from "multer" ;
import { arjectProtection } from "../middleware/Arcjet.middleware.js";
const messageRoutes = express.Router() ;
const upload = multer({dest: "uploads/"}) ;

messageRoutes.use(arjectProtection , protectRoute) ;
//meta
messageRoutes.get("/unread",  getUnreadCounts);
//contacts and chats
messageRoutes.get("/contacts" , getallContacts) ;
messageRoutes.get("/chats", getUserChats);

//send message and text file
messageRoutes.post(
  "/send/:id",
  upload.single("file"),
 sendMessage
);
//mark seen
messageRoutes.put("/mark-seen/:senderId",  markMessagesAsSeen);

messageRoutes.get("/chats" ,  getChatPartners) ;
//message keep last
messageRoutes.get("/:id" ,getMessagesByUserId) ;






export default messageRoutes;