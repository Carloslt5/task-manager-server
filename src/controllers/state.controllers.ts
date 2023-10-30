import { type NextFunction, type Request, type Response } from 'express'
import Project from '../models/Project.model'
import State from '../models/State.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'
import { type StateParamsType, type StateBodyType } from '../schemas/state.schema'

const getStates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { projectId } = req.params

  try {
    const states = await State.find({ project: projectId }).populate('project')
    res.status(200).json(states)
  } catch (error) {
    next(error)
  }
}

const createState = async (req: Request<StateParamsType, unknown, StateBodyType>, res: Response, next: NextFunction): Promise<void> => {
  const { projectId } = req.params
  const { stateName } = req.body

  try {
    const createdStates = await State.create({ stateName })
    const updateProject = await Project.findByIdAndUpdate(projectId, { $addToSet: { state: createdStates } }, { new: true })
    res.status(200).json(updateProject)
  } catch (error) {
    next(error)
  }
}

const editState: AsyncRequestHandler = async (req, res, next) => {
  const { _id: stateId, stateName } = req.body

  try {
    const updateState = await State.findByIdAndUpdate(stateId, { stateName }, { new: true })
    res.status(200).json(updateState)
  } catch (error) {
    next(error)
  }
}

const deleteState = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { stateId } = req.params

  try {
    await State.findByIdAndDelete(stateId)
    await Project.findOneAndUpdate(
      { state: stateId },
      { $pull: { state: stateId } }
    )
    res.status(200).json({ message: 'State deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

export {
  getStates,
  createState,
  editState,
  deleteState
}
