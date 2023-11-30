import {request, response} from 'express'
import { StatusCodes } from "http-status-codes";

import ContactService from './contact.service.js';

const contactService = new ContactService()

export default class ContactController {
  async add(req = request, res = response) {
    try {
      const result = await contactService.add(req.body)

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

  async getContactsByUserId(req = request, res = response) {
    try {
      const {userId} = req.params
      const result = await contactService.getContactsByUserId(userId)

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