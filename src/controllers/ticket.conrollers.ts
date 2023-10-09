import Ticket from '../models/Ticket.model'
import ToDo from '../models/ToDo.model'
import { type UserPayload } from '../models/User.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const getTicket: AsyncRequestHandler = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().populate('state').populate('project')
    res.status(200).json(tickets)
  } catch (error) {
    res.status(500).json({ success: false, error })
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
    res.status(500).json({ success: false, error })
  }
}

const updateTicketDetails: AsyncRequestHandler = async (req, res, next) => {
  const { ticketID } = req.params
  const { title, description, priority } = req.body

  try {
    const updateTickettTitle = await Ticket.findByIdAndUpdate(ticketID, { title, description, priority }, { new: true })
    res.status(200).json(updateTickettTitle)
  } catch (error) {
    console.log(error)
  }
}

const updateStateTicket: AsyncRequestHandler = async (req, res, next) => {
  const { ticketId, stateId } = req.body

  try {
    const newStateTicket = await Ticket.findByIdAndUpdate(ticketId, { state: stateId }, { new: true })
    res.status(200).json(newStateTicket)
  } catch (error) {
    console.log(error)
  }
}

const deleteTicket: AsyncRequestHandler = async (req, res, next) => {
  const { ticketId } = req.params

  try {
    await ToDo.deleteMany({ ticket: ticketId })
    await Ticket.findByIdAndDelete(ticketId)
    res.status(200).json({ message: 'Todo deleted' })
  } catch (error) {
    console.log(error)
  }
}

export {
  getTicket,
  createdTicket,
  updateTicketDetails,
  updateStateTicket,
  deleteTicket
}
