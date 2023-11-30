import { Schema, model } from "mongoose";

const contactSchema = Schema(
  {
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    contacts: [
      {
        userId: {type: Schema.Types.ObjectId, ref: 'User'},
        username: {type: Schema.Types.String, ref: 'User'}
      }
    ]
  },
  {
    timestamps: true
  }
)

const contactModel = model('Contact', contactSchema)

export default contactModel