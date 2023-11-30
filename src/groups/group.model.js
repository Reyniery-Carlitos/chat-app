import { Schema, model } from "mongoose";

// const membersSchema = new Schema(
//   {
//     memberId: {type: Schema.Types.ObjectId, ref: 'users'}
//   }
// )

const groupSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 40 },
    description: { type: String, required: true, minLength: 3, maxLength: 200 },
    members: [
      {
        userId: {type: Schema.Types.ObjectId, ref: 'User'},
        username: {type: Schema.Types.ObjectId}
      }
    ]
  }, 
  {
    timestamps: true
  }
)

const groupModel = model('Group', groupSchema)

export default groupModel