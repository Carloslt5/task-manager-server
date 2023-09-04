import Kanbanboard from '../models/KanbanBoard.model'
import Project from '../models/Project.model'
import { type UserPayload } from '../models/User.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const getAllProject: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const _id = req.payload?._id
  try {
    const projects = await Project.find({ owner: _id })
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}
const getOneProject: AsyncRequestHandler = async (req, res, next) => {
  const { projectId } = req.params

  try {
    const project = await Project.findById(projectId).populate('state')
    res.status(200).json(project)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const createProject: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const _id = req.payload?._id
  const { kanbanBoardId } = req.params
  const { title, description } = req.body

  try {
    const createProject = await Project.create({ title, description, owner: _id })
    const kanbanBoard = await Kanbanboard.findByIdAndUpdate(kanbanBoardId, { $push: { project: createProject } }, { new: true })
    res.status(200).json({ createProject, kanbanBoard })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const updateProject: AsyncRequestHandler = async (req, res, next) => {
  const { projectId } = req.params
  const { title } = req.body

  try {
    const project = await Project.findByIdAndUpdate(projectId, { title }, { new: true })
    res.status(200).json({ project })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const deleteProject: AsyncRequestHandler = async (req, res, next) => {
  const { projectId } = req.params

  try {
    await Project.findByIdAndRemove(projectId)
    res.status(200).json({ message: 'Project is deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}
export {
  getAllProject,
  getOneProject,
  createProject,
  updateProject,
  deleteProject
}
