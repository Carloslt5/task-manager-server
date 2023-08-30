import { type Request } from 'express'
import Project from '../models/Project.model'
import State from '../models/State.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const getStates: AsyncRequestHandler<Request> = async (req, res, next) => {
  const { projectId } = req.params
  try {
    const states = await State.find({ project: projectId }).populate('project')
    console.log('esto', states)
    res.status(200).json(states)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const createState: AsyncRequestHandler<Request> = async (req, res, next) => {
  const { projectId } = req.params
  const { stateName } = req.body

  try {
    const createdStates = await State.create({ stateName })
    const updateProject = await Project.findByIdAndUpdate(projectId, { $addToSet: { state: createdStates } }, { new: true })
    res.status(200).json(updateProject)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

export {
  getStates,
  createState
}
