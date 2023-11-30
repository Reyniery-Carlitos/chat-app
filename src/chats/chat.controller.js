import { StatusCodes } from "http-status-codes";
import {request, response} from 'express'

import ChatService from "./chat.service.js";

const chatService = new ChatService()

export default class ChatController {
  async getChatByGroupId(req = request, res = response) {
    try {
      const {groupId} = req.params
      const result = await chatService.getChatByGroupId(groupId)

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