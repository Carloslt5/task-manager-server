import ToDo from './../models/ToDo.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'
import { type UpdateCompleted } from './Types/UpdateCompleted.Type'

const getAllTodos: AsyncRequestHandler = async (req, res, next) => {
  try {
    const todos = await ToDo.find()
    res.status(200).json(todos)
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

const createdTodo: AsyncRequestHandler = async (req, res, next) => {
  const { title } = req.body

  try {
    const todo = await ToDo.create({ title })
    res.status(200).json({ todo })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

const updateTodo: AsyncRequestHandler = async (req, res, next) => {
  const { _id, completed } = req.body as UpdateCompleted

  try {
    const todo = await ToDo.findByIdAndUpdate(_id, { $set: { completed: !completed } }, { new: true })
    res.status(200).json({ todo })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

const deleteTodo: AsyncRequestHandler = async (req, res, next) => {
  const { _id } = req.params

  try {
    await ToDo.findByIdAndDelete(_id)
    res.status(204).json({ message: 'Todo deleted' })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

export {
  getAllTodos,
  createdTodo,
  updateTodo,
  deleteTodo
}
