import { Router } from "express";

import MessageController from "./message.controller.js";

const messageRouter = Router()
const messageController = new MessageController()

messageRouter.post('/', messageController.create)
messageRouter.get('/:chatId', messageController.getMessagesByChatId)

export default messageRouter