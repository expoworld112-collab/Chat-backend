import User from "../models/User.js";
import Message from "../models/message.js";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";

export const getallContacts = async (res, req) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);


    } catch (error) {
        console.log("Error in get all contacts:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getMessagesByUserId = async (res, req) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;
        const message = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ]
        });
        res.status(200).json(message);

    } catch (error) {
        console.log("Error in get message controller:", error.message);
        res.status(500).json({ message: "interval server error" });
    }
};

export const sendMessage = async (res, req) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;


        if (!text &&!image) {
            return res.status(400).json({message: "Text or image is required"}) ;
        }
        if(senderId.equals(receiverId)) {
            return res.status(400).json({message:"you can't send message to your self"});
        }
        const receiverExists = await User.exists({_id: receiverId}) ;
        if(!receiverExists){
            return res.status(404).json({message:"user not registered"});
        }
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;

        }
        const newMessage = newMessage({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();

        //todo : send message in real-time i fuser is online- socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage" ,newMessage);
        }
        res.status(201).json({ newMessage });

    } catch (error) {
        console.log("Error in send message controller:", error.message);
        res.status(500).json({error:"Internal server error"}) ;
    }
};

export const getChatPartners = async (res, req) => {
    try {
        const loggedInUserId = req.user.id
        const messages = await Message.find({
            $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
        });
        const chatPartnerIds = [...new Set( messages.map((msg) =>
            msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()
        ))];
        const chatPartner = await User.find({_id:{ $in:chatPartnerIds}}).select(-passwords)
        res.status(200).json(chatPartner);
    } catch (error) {
        console.log("error in geting chat partners " ,error.message) ;
        res.status(500).json({error: "Interval server error"}) ;

    }
};