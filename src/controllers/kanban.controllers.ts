import KanbanCard from '../models/KanbanCard.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const getKanbanCards: AsyncRequestHandler = async (req, res, next) => {
  const { boardId } = req.params

  try {
    const kanbanCards = await KanbanCard.find({ boardId }).sort('order')
    res.status(200).json({ kanbanCards })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const createKanbanCards: AsyncRequestHandler = async (req, res, next) => {
  const { boardId } = req.params
  const { title, order } = req.body

  try {
    const kanbanCard = await KanbanCard.create({ boardId, title, order })
    res.status(200).json({ kanbanCard })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const updateKanbanCards: AsyncRequestHandler = async (req, res, next) => {
  interface UpdateArchived {
    archivedValue: boolean
  }
  const { kanbanCardId } = req.params
  const { archivedValue } = req.body as UpdateArchived

  try {
    const kanbanCardUpdated = await KanbanCard.findByIdAndUpdate({ _id: kanbanCardId }, { $set: { archived: !archivedValue } }, { new: true })
    res.status(200).json({ kanbanCardUpdated })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const deleteKanbanCards: AsyncRequestHandler = async (req, res, next) => {
  const { kanbanCardId } = req.params

  try {
    await KanbanCard.findOneAndRemove({ _id: kanbanCardId })
    res.status(200).json({ message: 'Kanban Card is deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

export {
  getKanbanCards,
  createKanbanCards,
  updateKanbanCards,
  deleteKanbanCards
}
