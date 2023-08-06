import ToDo from './../models/ToDo.model'
import type { AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

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
  const { id } = req.params

  try {
    const todo = await ToDo.findByIdAndUpdate(id, { $addToSet: { completed: !true } }, { new: true })
    res.status(200).json({ todo })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}
const deleteTodo: AsyncRequestHandler = async (req, res, next) => {
  const { id } = req.params

  try {
    await ToDo.findByIdAndDelete(id)
    res.status(204)
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
