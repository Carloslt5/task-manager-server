import { type NextFunction, type Response } from 'express'
import KanbanBoard from '../models/KanbanBoard.model'
import { type PayloadRequest } from './Types/AsyncRequestHandler.Type'
import { type KanbanBodyType, type KanbanParamsType } from '../schemas/kanban.schema'
import { StatusError } from './auth.controllers'

const getKanbanBoard = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const _id = req.payload?._id

  try {
    const kanbanBoards = await KanbanBoard.find({ owner: _id }).populate('project')
    if (kanbanBoards === null) {
      throw new StatusError('Error: Can not found Boards', 404)
    } else {
      res.status(200).json(kanbanBoards)
    }
  } catch (error) {
    next(error)
  }
}

const getOneKanbanBoard = async (req: PayloadRequest<KanbanParamsType>, res: Response, next: NextFunction): Promise<void> => {
  const { kanbanBoardId } = req.params

  try {
    const kanbanBoard = await KanbanBoard.findById(kanbanBoardId).populate('project')
    if (kanbanBoard === null) {
      throw new StatusError('Error: Kanban  not found', 404)
    } else {
      res.status(200).json(kanbanBoard)
    }
  } catch (error) {
    next(error)
  }
}

const createKanbanBoard = async (req: PayloadRequest<KanbanParamsType, unknown, KanbanBodyType>, res: Response, next: NextFunction): Promise<void> => {
  const _id = req.payload?._id
  const { title } = req.body

  try {
    const kanbanboard = await KanbanBoard.create({ title, owner: _id })
    if (kanbanboard === null) {
      throw new StatusError('Error: Can not create Board', 422)
    } else {
      res.status(201).json(kanbanboard)
    }
  } catch (error) {
    next(error)
  }
}

const updateKanbanBoard = async (req: PayloadRequest<KanbanParamsType, unknown, KanbanBodyType>, res: Response, next: NextFunction): Promise<void> => {
  const { kanbanBoardId } = req.params
  const { title } = req.body

  try {
    const kanbanBoardUpdated = await KanbanBoard.findByIdAndUpdate({ _id: kanbanBoardId }, { $set: { title } }, { new: true })
    if (kanbanBoardUpdated === null) {
      throw new StatusError('Error: Can not Update Board', 422)
    } else {
      res.status(202).json(kanbanBoardUpdated)
    }
  } catch (error) {
    next(error)
  }
}

// const addProjectToKanban = async (req: PayloadRequest<KanbanParamsType, unknown, AddProjectToKanbanBodyType>, res: Response, next: NextFunction): Promise<void> => {
//   const { kanbanBoardId } = req.params
//   const { projectId } = req.body

//   try {
//     const [project, kanbanBoardUpdated] = await Promise.all([
//       Project.findById(projectId),
//       KanbanBoard.findByIdAndUpdate(kanbanBoardId, { $addToSet: { project: projectId } }, { new: true })
//     ])
//     if (project === null) {
//       throw new StatusError('Error: Project not found', 404)
//     }
//     if (kanbanBoardUpdated === null) {
//       res.status(400).json({ message: 'Kanban Board not found' })
//       throw new StatusError('Error: Project not found', 404)
//     }
//     res.status(201).json(kanbanBoardUpdated)
//   } catch (error) {
//     next(error)
//   }
// }

const deleteKanbanBoard = async (req: PayloadRequest<KanbanParamsType>, res: Response, next: NextFunction): Promise<void> => {
  const { kanbanBoardId } = req.params

  try {
    const kanbanBoard = await KanbanBoard.findOneAndRemove({ _id: kanbanBoardId })
    if (kanbanBoard === null) {
      throw new StatusError('Error: Kanban Board not found', 404)
    }
    res.status(200).json({ message: 'Kanban Card is deleted' })
  } catch (error) {
    next(error)
  }
}

export {
  getKanbanBoard,
  getOneKanbanBoard,
  createKanbanBoard,
  updateKanbanBoard,
  // addProjectToKanban,
  deleteKanbanBoard
}
