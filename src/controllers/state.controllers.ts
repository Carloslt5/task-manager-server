import Project from '../models/Project.model'
import State from '../models/State.model'
import Ticket from '../models/Ticket.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const getStates: AsyncRequestHandler = async (req, res, next) => {
  const { projectId } = req.params
  try {
    const states = await State.find({ project: projectId }).populate('project')
    console.log('esto', states)
    res.status(200).json(states)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const createState: AsyncRequestHandler = async (req, res, next) => {
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

const editState: AsyncRequestHandler = async (req, res, next) => {
  const { _id: stateId, stateName } = req.body

  try {
    const updateState = await State.findByIdAndUpdate(stateId, { stateName }, { new: true })
    res.status(200).json(updateState)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const deleteState: AsyncRequestHandler = async (req, res, next) => {
  const { stateId } = req.params
  try {
    await Ticket.deleteMany({ state: stateId })
    await State.findByIdAndDelete(stateId)
    await Project.findOneAndUpdate(
      { state: stateId },
      { $pull: { state: stateId } }
    )
    res.status(200).json({ success: true })
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
