import { type NextFunction, type Request, type Response } from 'express'
import Kanbanboard from '../models/KanbanBoard.model'
import Project from '../models/Project.model'
import { type PayloadRequest } from './Types/AsyncRequestHandler.Type'
import { type CreateProjectParamsType, type ProjectBodyType, type ProjectParamsType } from '../schemas/project.schema'
import { StatusError } from './auth.controllers'

// const getAllProject = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
//   const _id = req.payload?._id

//   try {
//     const projects = await Project.find({ owner: _id })
//     if (projects === null) {
//       throw new StatusError('Error: Projects Board not found', 404)
//     } else {
//       res.status(200).json(projects)
//     }
//   } catch (error) {
//     next(error)
//   }
// }

const getOneProject = async (req: PayloadRequest<ProjectParamsType, unknown, ProjectBodyType>, res: Response, next: NextFunction): Promise<void> => {
  const { projectId } = req.params

  try {
    const project = await Project.findById(projectId).populate('state')
    if (project === null) {
      res.status(404).json({ message: 'Project not found' })
    } else {
      res.status(200).json(project)
    }
  } catch (error) {
    next(error)
  }
}

const createProject = async (req: PayloadRequest<CreateProjectParamsType, unknown, ProjectBodyType>, res: Response, next: NextFunction): Promise<void> => {
  const userID = req.payload?._id
  const { kanbanBoardId } = req.params
  const { title, description } = req.body

  try {
    const createProject = await Project.create({ title, description, owner: userID })
    const kanbanBoard = await Kanbanboard.findByIdAndUpdate(kanbanBoardId, { $push: { project: createProject } }, { new: true })
    if (createProject === null || kanbanBoard === null) {
      throw new StatusError('Error: Project can not created', 422)
    } else {
      res.status(201).json({ createProject, kanbanBoard })
    }
  } catch (error) {
    next(error)
  }
}

const updateProject = async (req: PayloadRequest<ProjectParamsType, unknown, ProjectBodyType>, res: Response, next: NextFunction): Promise<void> => {
  const { projectId } = req.params
  const { title } = req.body

  try {
    const project = await Project.findByIdAndUpdate(projectId, { title }, { new: true })
    if (project === null) {
      throw new StatusError('Error: Project can not edited', 422)
    } else {
      res.status(200).json({ project })
    }
  } catch (error) {
    next(error)
  }
}

const updateOrderSates = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const { projectId } = req.params
  const { oldIndex, newIndex } = req.body

  try {
    const projectFound = await Project.findById(projectId)
    if (projectFound != null) {
      const [movedState] = projectFound?.state.splice(oldIndex, 1)
      projectFound?.state.splice(newIndex, 0, movedState)
      const projectOrderState = await projectFound?.save()
      res.status(200).json(projectOrderState)
    }
  } catch (error) {
    next(error)
  }
}

const deleteProject = async (req: Request<ProjectParamsType, unknown, unknown>, res: Response, next: NextFunction): Promise<void> => {
  const { projectId } = req.params

  try {
    const deletedProject = await Project.findByIdAndRemove(projectId)
    if (deletedProject === null) {
      throw new StatusError('Error: Project can not deleted', 404)
    } else {
      res.status(200).json({ message: 'Project is deleted' })
    }
  } catch (error) {
    next(error)
  }
}

export {
  // getAllProject,
  getOneProject,
  createProject,
  updateProject,
  updateOrderSates,
  deleteProject
}
