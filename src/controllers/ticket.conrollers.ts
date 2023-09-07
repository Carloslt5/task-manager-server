import State from '../models/State.model'
import Ticket from '../models/Ticket.model'
import { type UserPayload } from '../models/User.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const getTicket: AsyncRequestHandler = async (req, res, next) => {
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
  const { stateId, newTicket: { title } } = req.body

  try {
    const createdTicket = await Ticket.create({ title, projectId, owner: _id })
    const addTicketToState = await State.findByIdAndUpdate(stateId, { $addToSet: { ticket: createdTicket } }, { new: true })
    res.status(200).json(addTicketToState)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const updateStateTicket: AsyncRequestHandler = async (req, res, next) => {
  const { ticketID, state } = req.body

  try {
    await Ticket.findByIdAndUpdate(ticketID, { $set: { state } })
    res.status(200)
  } catch (error) {
    console.log(error)
  }
}

export {
  getTicket,
  createdTicket,
  updateStateTicket
}
