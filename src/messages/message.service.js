import { StatusCodes } from "http-status-codes";
import validator from "validator";

import messageModel from "./message.model.js";
import chatModel from '../chats/chat.model.js'
import userModel from '../users/user.model.js'

export default class MessageService {
  async create(data) {
    const { chatId, senderId, content, date } = data

    if (!validator.isMongoId(chatId)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: `El id ${chatId} no es un id de mongo valido`
      }
    }

    if (!validator.isMongoId(senderId)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: `El id ${senderId} no es un id de mongo valido`
      }
    }

    const chat = await chatModel.findById(chatId)

    if (!chat) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: `El chat con id ${chatId} no existe en la base de datos`
      }
    }

    const user = await userModel.findById(senderId)

    if (!user) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: `El usuario con id ${senderId} no existe en la base de datos`
      }
    }

    const message = new messageModel({ chatId, senderId, content, date })
    await message.save()

    const { createdAt } = message

    return {
      statusCode: StatusCodes.OK,
      data: { chatId, senderId, content, createdAt },
      message: `Mensaje enviado exitosamente`
    }
  }

  async getMessagesByChatId(chatId) {
    if (!validator.isMongoId(chatId)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: `El id ${chatId} no es un id de mongo valido `
      }
    }

    const messages = await messageModel.find({'chatId': chatId})
    .select('-__v -updatedAt')
    .exec()

    if (!messages) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        data: messages,
        message: `Ningun mensaje encontrado en la db`
      }
    }

    return {
      statusCode: StatusCodes.OK,
      data: messages,
      message: 'Mensajes del chat obtenidos exitosamente'
    }

  }
}