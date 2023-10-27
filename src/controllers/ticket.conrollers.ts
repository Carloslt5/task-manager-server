import { type NextFunction, type Request, type Response } from 'express'
import Ticket from '../models/Ticket.model'
import ToDo from '../models/ToDo.model'
import { type UserPayload } from '../models/User.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'
import { type TicketBodyType, type TicketParamsType } from '../schemas/ticket.schema'

const getTicket: AsyncRequestHandler = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().populate('state').populate('project')
    res.status(200).json(tickets)
  } catch (error) {
    next(error)
  }
}

const createdTicket: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const _id = req.payload?._id
  const { projectId } = req.params
  const { stateId, newTicket: { title, description, priority } } = req.body

  try {
    const createdTicket = await Ticket.create({ title, description, priority, project: projectId, state: stateId, owner: _id })
    res.status(200).json(createdTicket)
  } catch (error) {
    next(error)
  }
}

const updateTicketDetails = async (req: Request<TicketParamsType, unknown, TicketBodyType>, res: Response, next: NextFunction): Promise<void> => {
  const { ticketID } = req.params
  const { title, description, priority } = req.body

  try {
    const updateTickettTitle = await Ticket.findByIdAndUpdate(ticketID, { title, description, priority }, { new: true })
    res.status(200).json(updateTickettTitle)
  } catch (error) {
    next(error)
  }
}

const updateStateTicket: AsyncRequestHandler = async (req, res, next) => {
  const { ticketId, stateId } = req.body

  try {
    const newStateTicket = await Ticket.findByIdAndUpdate(ticketId, { state: stateId }, { new: true })
    res.status(200).json(newStateTicket)
  } catch (error) {
    next(error)
  }
}

const deleteTicket: AsyncRequestHandler = async (req, res, next) => {
  const { ticketId } = req.params
  const { stateID } = req.body

  try {
    await ToDo.deleteMany({ ticket: ticketId })
    await Ticket.deleteMany({ state: stateID })
    res.status(200).json({ message: 'Todo deleted' })
  } catch (error) {
    next(error)
  }
}

export {
  getTicket,
  createdTicket,
  updateTicketDetails,
  updateStateTicket,
  deleteTicket
}
