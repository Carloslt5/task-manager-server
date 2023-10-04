import ToDo from './../models/ToDo.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'
import { type UserPayload } from '../models/User.model'

const getAllTodos: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const userId = req.payload?._id

  try {
    const todos = await ToDo.find({ owner: userId }).sort('order')
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const getTicketToDos: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const { ticketID } = req.params

  try {
    const todos = await ToDo.find({ ticket: ticketID })
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const createdTodo: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const _id = req.payload?._id
  const { newTodo: { title }, ticketID } = req.body

  try {
    const userTodos = await ToDo.find({ owner: _id })
    let order = 0
    if (userTodos.length > 0) { order = userTodos.length }
    await ToDo.create({ title, owner: _id, order, ticket: ticketID })
    res.status(200).json({ message: 'Todo Created' })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
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
  const { _id: todoID } = req.params

  try {
    await ToDo.findByIdAndDelete(todoID)
    res.status(200).json({ message: 'Todo deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const deleteCompletedTodos: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const _id = req.payload?._id

  try {
    await ToDo.deleteMany({ owner: _id, completed: true })
    res.status(200).json({ message: 'Completed todos deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const updateTodoOrder: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const { updatedOrder } = req.body
  try {
    for (const todo of updatedOrder) {
      await ToDo.findByIdAndUpdate(todo._id, { order: todo.order }, { new: true })
    }
    res.status(200).json({ message: 'Order Completed' })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

export {
  getAllTodos,
  getTicketToDos,
  createdTodo,
  updateTodo,
  deleteTodo,
  deleteCompletedTodos,
  updateTodoOrder
}
