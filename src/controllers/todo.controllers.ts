import { type JwtPayload } from 'jsonwebtoken'
import ToDo from './../models/ToDo.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const getAllTodos: AsyncRequestHandler = async (req, res, next) => {
  const { _id } = req.payload as JwtPayload

  try {
    const todos = await ToDo.find({ owner: _id })
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}
const createdTodo: AsyncRequestHandler = async (req, res, next) => {
  console.log('esto')

  // const _id = req.payload?._id
  // const { title } = req.body

  // try {
  //   const todo = await ToDo.create({ title, owner: _id })
  //   res.status(200).json({ todo })
  // } catch (error) {
  //   res.status(500).json({ success: false, error })
  // }
}

const updateTodo: AsyncRequestHandler = async (req, res, next) => {
  const { _id, completed }: { _id: string, completed: boolean } = req.body

  try {
    const todo = await ToDo.findByIdAndUpdate(_id, { $set: { completed: !completed } }, { new: true })
    res.status(200).json({ todo })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const deleteTodo: AsyncRequestHandler = async (req, res, next) => {
  const { _id } = req.params

  try {
    await ToDo.findByIdAndDelete(_id)
    res.status(200).json({ message: 'Todo deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const deleteCompletedTodos: AsyncRequestHandler = async (req, res, next) => {
  console.log('esto')

  // const _id = req.payload?._id

  // try {
  //   await ToDo.deleteMany({ owner: _id, completed: true })
  //   res.status(200).json({ message: 'Completed todos deleted' })
  // } catch (error) {
  //   res.status(500).json({ success: false, error })
  // }
}

export {
  getAllTodos,
  createdTodo,
  updateTodo,
  deleteTodo,
  deleteCompletedTodos
}
