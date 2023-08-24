import State from '../models/State.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const getStates: AsyncRequestHandler = async (req, res, next) => {
  const { projectId } = req.params

  try {
    const states = await State.find({ project: projectId })
    res.status(200).json(states)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const createState: AsyncRequestHandler = async (req, res, next) => {
  const { projectId } = req.params
  const { stateName } = req.body

  try {
    const checkState = await State.findOne({ stateName })
    if (checkState == null) {
      const newOrder = (await State.find()).length + 1
      const createdStates = await State.create({ stateName, order: newOrder, project: projectId })
      res.status(200).json(createdStates)
    } else {
      const updateState = await State.findOneAndUpdate({ stateName }, { $addToSet: { project: projectId } }, { new: true })
      res.status(200).json(updateState)
    }
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

export {
  getStates,
  createState
}
