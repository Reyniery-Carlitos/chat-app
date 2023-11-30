import {request, response} from 'express'
import StatusCodes from 'http-status-codes'

import GroupService from './group.service.js';

const groupService = new GroupService()

export default class GroupController {
  async create(req = request, res = response) {
    try {
      const result = await groupService.create(req.body)

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

  async getGroupById (req = request, res = response) {
    try {
      const {id} = req.params
      const result = await groupService.getGroupById(id)

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

  async getGroupsByUserId (req = request, res = response) {
    try {
      const {id} = req.params
      const result = await groupService.getGroupsByUserId(id)

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