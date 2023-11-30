import { Router } from "express";

import GroupController from "./group.controller.js";

const groupRouter = Router()
const groupController = new GroupController()

groupRouter.post('/', groupController.create)
groupRouter.get('/:id', groupController.getGroupsByUserId)
// groupRouter.get('/:id', groupController.getGroupById)

export default groupRouter