import { type NextFunction, type Response } from 'express'
import Ticket from '../models/Ticket.model'
import ToDo from '../models/ToDo.model'
import { type TicketBodyType, type TicketParamsType } from '../schemas/ticket.schema'
import { StatusError } from './auth.controllers'
import { type PayloadRequest } from '../middlewares/verifyToken.middleware'

const getTicket = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const { projectId } = req.params

  try {
    const tickets = await Ticket.find({ project: projectId }).populate('state').populate('project')
    res.status(200).json(tickets)
  } catch (error) {
    next(error)
  }
}

const createdTicket = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
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

const updateTicketDetails = async (req: PayloadRequest<TicketParamsType, unknown, TicketBodyType>, res: Response, next: NextFunction): Promise<void> => {
  const { ticketID } = req.params
  const { title, description, priority } = req.body

  try {
    const updateTickettTitle = await Ticket.findByIdAndUpdate(ticketID, { title, description, priority }, { new: true })
    res.status(200).json(updateTickettTitle)
  } catch (error) {
    next(error)
  }
}

const updateStateTicket = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const { ticketId, stateId } = req.body

  try {
    const newStateTicket = await Ticket.findByIdAndUpdate(ticketId, { state: stateId }, { new: true })
    res.status(200).json(newStateTicket)
  } catch (error) {
    next(error)
  }
}

const deleteTicket = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const { ticketId } = req.params

  try {
    await ToDo.deleteMany({ ticket: ticketId })
    await Ticket.findByIdAndRemove({ _id: ticketId })
    res.status(200).json({ message: 'Ticket deleted' })
  } catch (error) {
    next(new StatusError('Ticket can not delete', 422))
  }
}

export {
  getTicket,
  createdTicket,
  updateTicketDetails,
  updateStateTicket,
  deleteTicket
}
