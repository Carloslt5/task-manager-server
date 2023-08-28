import Ticket from '../models/Ticket.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const getTicket: AsyncRequestHandler = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().populate('state')
    res.status(200).json(tickets)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const createdTicket: AsyncRequestHandler = async (req, res, next) => {
  const { _id } = req.payload
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
