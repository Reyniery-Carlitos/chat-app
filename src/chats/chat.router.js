import { Router } from "express";

import ChatController from "./chat.controller.js";

const chatRouter = Router()
const chatController = new ChatController()

chatRouter.get('/private', chatController.getChatByUsersId)
chatRouter.get('/:groupId', chatController.getChatByGroupId)

export default chatRouter