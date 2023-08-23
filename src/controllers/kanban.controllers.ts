import KanbanBoard from '../models/KanbanBoard.model'
import Project from '../models/Project.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const getKanbanBoard: AsyncRequestHandler = async (req, res, next) => {
  const { _id } = req.payload
  try {
    const kanbanBoards = await KanbanBoard.find({ owner: _id }).populate('project')
    res.status(200).json(kanbanBoards)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const getOneKanbanBoard: AsyncRequestHandler = async (req, res, next) => {
  const { kanbanBoardId } = req.params

  try {
    const kanbanBoard = await KanbanBoard.findById(kanbanBoardId).populate('project')
    res.status(200).json(kanbanBoard)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const createKanbanBoard: AsyncRequestHandler = async (req, res, next) => {
  const { _id } = req.payload
  const { title } = req.body

  try {
    const kanbanboard = await KanbanBoard.create({ title, owner: _id })
    if (kanbanboard === null) {
      res.status(500).json({ message: 'Error can not Create' })
    }
    res.status(200).json(kanbanboard)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const updateKanbanBoard: AsyncRequestHandler = async (req, res, next) => {
  interface UpdateArchived {
    title?: string
    completedValue?: boolean
  }
  const { KanbanBoardId } = req.params
  const { title } = req.body as UpdateArchived

  try {
    const kanbanBoardUpdated = await KanbanBoard.findByIdAndUpdate({ _id: KanbanBoardId }, { $set: { title } }, { new: true })
    if (kanbanBoardUpdated === null) {
      res.status(500).json({ message: 'Error can not Update' })
    }
    res.status(200).json(kanbanBoardUpdated)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const addProjectToKanban: AsyncRequestHandler = async (req, res, next) => {
  const { KanbanBoardId } = req.params
  const { projectId } = req.body

  try {
    const [project, kanbanBoardUpdated] = await Promise.all([
      Project.findById(projectId),
      KanbanBoard.findByIdAndUpdate(KanbanBoardId, { $addToSet: { project: projectId } }, { new: true })
    ])
    if (project === null) {
      res.status(500).json({ message: 'Project not found' })
    }
    if (kanbanBoardUpdated === null) {
      res.status(500).json({ message: 'Kanban Board not found' })
    }
    res.status(200).json(kanbanBoardUpdated)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const deleteKanbanBoard: AsyncRequestHandler = async (req, res, next) => {
  const { KanbanBoardId } = req.params

  try {
    const kanbanBoard = await KanbanBoard.findOneAndRemove({ _id: KanbanBoardId })
    if (kanbanBoard === null) {
      res.status(500).json({ message: 'Kanban Board not found' })
    }
    res.status(200).json({ message: 'Kanban Card is deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

export {
  getKanbanBoard,
  getOneKanbanBoard,
  createKanbanBoard,
  updateKanbanBoard,
  addProjectToKanban,
  deleteKanbanBoard
}
