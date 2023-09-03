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
  const _id = req.payload?._id
  const { projectId } = req.params
  const { stateId, newTicket: { title } } = req.body
  console.log(req.body)

  try {
    const createdTicket = await Ticket.create({ title, projectId, state: stateId, owner: _id })
    res.status(200).json(createdTicket)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

export {
  getTicket,
  createdTicket
}
