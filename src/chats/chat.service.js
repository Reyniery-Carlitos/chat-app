import { StatusCodes } from "http-status-codes";
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
}