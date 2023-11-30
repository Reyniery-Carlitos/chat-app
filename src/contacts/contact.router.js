import { Router } from "express";

import ContactController from "./contact.controller.js";

const contactRouter = Router()
const contactController = new ContactController()

contactRouter.post('/agregar', contactController.add)
contactRouter.get('/:userId', contactController.getContactsByUserId)

export default contactRouter