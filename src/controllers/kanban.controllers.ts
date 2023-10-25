import KanbanBoard from '../models/KanbanBoard.model'
import Project from '../models/Project.model'
import { type UserPayload } from '../models/User.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const getKanbanBoard: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const _id = req.payload?._id

  try {
    const kanbanBoards = await KanbanBoard.find({ owner: _id }).populate('project')
    res.status(200).json(kanbanBoards)
  } catch (error) {
    next(error)
  }
}

const getOneKanbanBoard: AsyncRequestHandler = async (req, res, next) => {
  const { kanbanBoardId } = req.params

  try {
    const kanbanBoard = await KanbanBoard.findById(kanbanBoardId).populate('project')
    res.status(200).json(kanbanBoard)
  } catch (error) {
    next(error)
  }
}

const createKanbanBoard: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const _id = req.payload?._id
  const { title } = req.body

  try {
    const kanbanboard = await KanbanBoard.create({ title, owner: _id })
    if (kanbanboard === null) {
      res.status(500).json({ message: 'Error can not Create' })
    } else {
      res.status(201).json(kanbanboard)
    }
  } catch (error) {
    next(error)
  }
}

const updateKanbanBoard: AsyncRequestHandler = async (req, res, next) => {
  const { KanbanBoardId } = req.params
  const { title } = req.body

  try {
    const kanbanBoardUpdated = await KanbanBoard.findByIdAndUpdate({ _id: KanbanBoardId }, { $set: { title } }, { new: true })
    if (kanbanBoardUpdated === null) {
      res.status(500).json({ message: 'Error can not Update' })
    } else {
      res.status(201).json(kanbanBoardUpdated)
    }
  } catch (error) {
    next(error)
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
      res.status(400).json({ message: 'Project not found' })
      return
    }
    if (kanbanBoardUpdated === null) {
      res.status(400).json({ message: 'Kanban Board not found' })
      return
    }
    res.status(201).json(kanbanBoardUpdated)
  } catch (error) {
    next(error)
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
