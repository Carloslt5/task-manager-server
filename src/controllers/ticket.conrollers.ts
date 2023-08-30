import { type Request } from 'express'
import Ticket from '../models/Ticket.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'
import { type UserPayload } from '../models/User.model'

const getTicket: AsyncRequestHandler<Request> = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().populate('state')
    res.status(200).json(tickets)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const createdTicket: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const _id = req.payload?._id
  const { projectId } = req.params
  const { state: { _id: satateId }, newTicket: { title } } = req.body

  try {
    const createdTicket = await Ticket.create({ title, projectId, state: satateId, owner: _id })
    res.status(200).json(createdTicket)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

export {
  getTicket,
  createdTicket
}
