import Ticket from '../models/Ticket.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const createdTicket: AsyncRequestHandler = async (req, res, next) => {
  const { _id } = req.payload
  const { projectId } = req.params
  const { title, satateId } = req.body

  try {
    const createdTicket = await Ticket.create({ title, projectId, state: satateId, owner: _id })
    res.status(200).json(createdTicket)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

export {
  createdTicket
}
