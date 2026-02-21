
import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

// Send friend request
export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user._id;
    // const  receiverId  = req.params.id;
    const receiverId = req.params.receiverId;

    if (senderId.toString()===(receiverId)) return res.status(400).json({ message: "You cannot add yourself" });

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ message: "User not found" });

    if (sender.friends.includes(receiverId)) return res.status(400).json({ message: "Already friends" });

    const existing = await FriendRequest.findOne({ sender: senderId, receiver: receiverId, status: "pending" });
    if (existing) return res.status(400).json({ message: "Request already sent" });

    const request = await FriendRequest.create({ sender: senderId, receiver: receiverId });
    res.status(201).json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Accept request
export const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await FriendRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "accepted";
    await request.save();

    await User.findByIdAndUpdate(request.sender, { $addToSet: { friends: request.receiver } });
    await User.findByIdAndUpdate(request.receiver, { $addToSet: { friends: request.sender } });

    res.json({ message: "Friend request accepted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Reject request
export const rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await FriendRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "rejected";
    await request.save();

    res.json({ message: "Friend request rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all friend data (friends + requests)
export const getFriendData = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("friends", "_id fullName profilePic");

    const received = await FriendRequest.find({ receiver: userId, status: "pending" }).populate("sender", "_id fullName profilePic");
    const sent = await FriendRequest.find({ sender: userId, status: "pending" }).populate("receiver", "_id fullName profilePic");

    res.json({
      friends: user.friends,
      received,
      sent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const removeFriend = async (req , res )  => {
 try {
   const userId = req.user._id ;
   const friendId = req.params;
   if (!friendId) {
      return res.status(400).json({ message: "Friend ID required" });
    }
   await User.findByIdAndUpdate(userId,{
     $pull: {friends:friendId} ,
   
   });
   await findByIdAndUpdate(friendId ,{
    $pull : {friends: userId} ,
   });
   res.status(200).json({message: "friend removed"}) ;

 } catch (error) {
  console.error(error);
    res.status(500).json({message:err.message});
     
 }
} ;

