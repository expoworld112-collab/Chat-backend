import express from "express" ;
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
getallContacts ,
getMessagesByUserId,
sendMessage ,
getChatPartners

} from "../controllers/message.controllers.js";
import { arjectProtection } from "../middleware/Arcjet.middleware.js";
const messageRoutes = express.Router() ;

//these will run in serial order 

messageRoutes.use(arjectProtection , protectRoute) ;

messageRoutes.get("/contacts" , getallContacts) ;

messageRoutes.get("/chats" , getChatPartners) ;

messageRoutes.get("/:id" ,getMessagesByUserId) ;


messageRoutes.get("/send/:id"  , sendMessage) ;

export default messageRoutes;