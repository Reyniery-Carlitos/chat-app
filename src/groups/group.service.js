import validator from 'validator'
import StatusCodes from 'http-status-codes'

import groupModel from './group.model.js'
import chatModel from '../chats/chat.model.js'

export default class GroupService {
  async create(data) {
    const group = new groupModel(data)

    await group.save()

    const chatData = {
      type: "grupo",
      groupId: group._id,
      participants: group.members
    }

    // Inicializa un chat vacio para el grupo
    const chat = new chatModel(chatData)
    await chat.save()

    return {
      data: { groupId: group._id, name: group.name, description: group.description, members: group.members },
      message: 'Grupo creado exitosamente',
      statusCode: StatusCodes.OK
    }
  }

  async getGroupById(id) {
    if (!validator.isMongoId(id)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: `El id ${id} no es un id de mongo valido `
      }
    }

    const group = await groupModel.findById(id).exec()

    if (!group) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        data: null,
        message: `Grupo con el id ${id} no existe`
      }
    }

    const { _id, name, description, members } = group

    return {
      statusCode: StatusCodes.OK,
      data: { groupId: _id, name, description, members },
      message: 'Grupo devuelto con exito'
    }
  }

  async getGroupsByUserId(id) {
    if (!validator.isMongoId(id)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: `El id ${id} no es un id de mongo valido `
      }
    }

    const group = await groupModel.find({ 'members.userId': id })
      .select('-createdAt -updatedAt -__v')
      .exec()

    if (!group) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        data: null,
        message: `Grupo con el id ${id} no existe`
      }
    }

    return {
      statusCode: StatusCodes.OK,
      data: group,
      message: 'Grupos encontrados exitosamente'
    }
  }
}