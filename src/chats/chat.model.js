import { Schema } from "mongoose";
import { model } from "mongoose";

const chatSchema = Schema(
  {
    type: {type: Schema.Types.String, required: true},
    participants: [
      {
        userId: {type: Schema.Types.ObjectId, ref: 'User'},
        username: {type: Schema.Types.ObjectId}
      }      
    ],
    groupId: {type: Schema.Types.ObjectId, default: null}
  },
  {
    timestamps: true
  }
)

const chatModel = model("Chat", chatSchema)

export default chatModel