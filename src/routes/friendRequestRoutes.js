import express from "express";
import { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getFriendData } from "../controllers/friendController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/incoming", protectRoute, getFriendData);                // fetch friends + requests
router.post("/send/:receiverId", protectRoute, sendFriendRequest);
router.put("/accept/:requestId", protectRoute, acceptFriendRequest);
router.put("/reject/:requestId", protectRoute, rejectFriendRequest);

export default router;

