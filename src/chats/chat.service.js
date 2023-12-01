import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";
import validator from "validator";

import chatModel from "./chat.model.js";

export default class ChatService {
  async getChatByGroupId(id) {
    if (!validator.isMongoId(id)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: `El id ${id} no es un id de mongo valido `
      }
    }

    const chat = await chatModel.findOne({ groupId: id })
      .populate('participants.username', 'username')
      .select('-__v -updatedAt')
      .exec()

    if (!chat) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        data: null,
        message: `Chat con el id ${id} no existe`
      }
    }

    return {
      statusCode: StatusCodes.OK,
      data: chat,
      message: 'Grupos encontrados exitosamente'
    }
  }

  async getChatByUsersId({userId, userId2}) {
    if (!validator.isMongoId(userId)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: `El id ${userId} no es un id de mongo valido `
      }
    }

    if (!validator.isMongoId(userId2)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: `El id ${userId2} no es un id de mongo valido `
      }
    }

    const objId1 = new ObjectId(userId)
    const objId2 = new ObjectId(userId2)

    const chat = await chatModel.find({
      type: 'privado',
      participants: {
        $size: 2, 
        $elemMatch: {userId: objId1}
      }, 
      participants: {
        $elemMatch: {userId: objId2}
      }
    })
      .exec()

    if (!chat) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        data: null,
        message: `Chat con el id ${userId} no existe`
      }
    }

    return {
      statusCode: StatusCodes.OK,
      data: chat,
      message: 'Chat encontrado exitosamente'
    }
  }
}