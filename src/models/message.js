import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    image: {
      type: String,
    },
    seen: {
  type: Boolean,
  default: false,
},
file: String,
  fileType: String,

  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
