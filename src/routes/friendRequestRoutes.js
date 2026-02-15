import express from "express";
import { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getFriendData , getallContacts ,removeFriend } from "../controllers/friendController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/incoming", protectRoute, getFriendData);               
router.post("/send/:receiverId", protectRoute, sendFriendRequest);
router.put("/accept/:requestId", protectRoute, acceptFriendRequest);
router.put("/reject/:requestId", protectRoute, rejectFriendRequest);
router.delete("/:friendId", protectRoute, removeFriend);
router.get("/check", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});
router.get("/contacts", protectRoute, getallContacts);



export default router;

