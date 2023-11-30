import { Schema, model } from "mongoose";

const messageSchema = Schema(
  {
    chatId: {type: Schema.Types.ObjectId, ref: 'Chat', required: true},
    senderId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: Schema.Types.String, required: true, minLength: 1}
  },
  {
    timestamps: true
  }
)

const messageModel = model('Message', messageSchema)

export default messageModel