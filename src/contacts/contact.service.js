import { StatusCodes } from "http-status-codes";
import validator from 'validator'

import contactModel from "./contact.model.js";
import chatModel from '../chats/chat.model.js'

export default class ContactService {
  async add(data) {
    const { userId, contacts } = data

    if (!validator.isMongoId(userId)) {
      return {
        data: null,
        message: `El id ${userId} no es un id de mongo valido`,
        statusCode: StatusCodes.BAD_REQUEST
      }
    }

    let contact = await contactModel.findOne({ userId })

    if (!contact) {
      contact = new contactModel({ userId, contacts })
      await contact.save()

      // Data para el chat privado vacio
      const chatData = {
        type: "privado",
        groupId: null,
        participants: [
          {
            userId: userId,
            username: 'You'
          },
          {
            userId: contacts[0].userId,
            username: contacts[0].username
          }
        ]
      }

      // Inicializa un chat vacio para el chat privado
      const chat = new chatModel(chatData)
      await chat.save()

      return {
        data: { userId: contact.userId, contacts: contact.contacts },
        message: 'Contacto agregado exitosamente',
        statusCode: StatusCodes.OK
      }
    }

    const existContact = await contactModel.findOne(
      {
        userId: userId,
        contacts: { $elemMatch: { userId: contacts[0].userId } }
      }
    )

    if (existContact) {
      return {
        data: null,
        message: `El contacto con id ${contacts[0].userId} ya existe en tu lista de contactos`,
        statusCode: StatusCodes.BAD_REQUEST
      }
    }

    const newContact = await contactModel.findOneAndUpdate(
      { userId: userId },
      { $push: { contacts: contacts } },
      { new: true }
    )

    const chatData = {
      type: "privado",
      groupId: null,
      participants: [
        {
          userId: userId,
          username: 'You'
        },
        {
          userId: contacts[0].userId,
          username: contacts[0].username
        }
      ]
    }

    // Inicializa un chat vacio para el chat privado
    const chat = new chatModel(chatData)
    await chat.save()

    return {
      data: { userId: newContact.userId, contacts: newContact.contacts },
      message: 'Contacto agregado exitosamente',
      statusCode: StatusCodes.OK
    }
  }

  async getContactsByUserId(userId) {
    if (!validator.isMongoId(userId)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: `El id ${userId} no es un id de mongo valido`
      }
    }

    const contacts = await contactModel.find({ 'userId': userId })
      .select('-__v -updatedAt')
      .exec()

    if (!contacts) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        data: contacts,
        message: `Ningun contacto para el id ${userId}`
      }
    }

    return {
      statusCode: StatusCodes.OK,
      data: contacts,
      message: 'Contactos devueltos exitosamente'
    }
  }
}