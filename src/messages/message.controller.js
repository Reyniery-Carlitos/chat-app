import {request, response} from 'express'
import { StatusCodes } from 'http-status-codes'

import MessageService from './message.service.js'

const messageService = new MessageService()

export default class MessageController {
  async create (req = request, res = response) {
    try {
      const result = await messageService.create(req.body)

      res
      .status(result.statusCode)
      .json({
        message: result?.message,
        data: result.data,
        status: result.statusCode
      })
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async getMessagesByChatId (req = request, res = response) {
    try {
      const {chatId} = req.params
      const result = await messageService.getMessagesByChatId(chatId)

      res
      .status(result.statusCode)
      .json({
        message: result?.message,
        data: result.data,
        status: result.statusCode
      })
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
}