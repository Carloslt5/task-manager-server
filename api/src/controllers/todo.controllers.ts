import ToDo from '../models/ToDo.model'
import { type ToDoBodyType } from '../schemas/todo.schema'
import { type Response, type NextFunction } from 'express'
import { StatusError } from './auth.controllers'
import { type PayloadRequest } from '../middlewares/verifyToken.middleware'

const getAllTodos = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.payload?._id

  try {
    const todos = await ToDo.find({ owner: userId }).sort('order')
    res.status(200).json(todos)
  } catch (error) {
    next(error)
  }
}

const getTicketToDos = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const { ticketID } = req.params

  try {
    const todos = await ToDo.find({ ticket: ticketID })
    res.status(200).json(todos)
  } catch (error) {
    next(error)
  }
}

const createdTodo = async (req: PayloadRequest<unknown, unknown, ToDoBodyType>, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.payload?._id
  const { newTodo: { title }, ticketID } = req.body

  try {
    const userTodos = await ToDo.find({ owner: userId })
    if (userTodos === null) {
      throw new StatusError('Error: User not found', 404)
    }

    const order = userTodos.length
    const createdToDo = await ToDo.create({ title, owner: userId, order, ticket: ticketID })
    if (createdToDo === null) {
      throw new StatusError('Error: To Do cant not created', 422)
    }

    res.status(200).json({ message: 'Todo Created' })
  } catch (error) {
    next(error)
  }
}

const updateTodo = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const { _id, completed }: { _id: string, completed: boolean } = req.body

  try {
    const todo = await ToDo.findByIdAndUpdate(_id, { $set: { completed: !completed } }, { new: true })
    res.status(200).json({ todo })
  } catch (error) {
    next(error)
  }
}

const updateTitleToDo = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const { _id, title } = req.body

  try {
    const todo = await ToDo.findByIdAndUpdate(_id, { title }, { new: true })
    res.status(200).json({ todo })
  } catch (error) {
    next(error)
  }
}

const deleteTodo = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const { todoID } = req.params

  try {
    const deleteToDo = await ToDo.findByIdAndDelete(todoID)
    if (deleteToDo === null) {
      throw new StatusError('Error: Can not delete To Do', 422)
    }
    res.status(200).json({ message: 'To Do deleted' })
  } catch (error) {
    next(error)
  }
}

const deleteCompletedTodos = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.payload?._id

  try {
    await ToDo.deleteMany({ owner: userId, completed: true })
    res.status(200).json({ message: 'Completed todos deleted' })
  } catch (error) {
    next(error)
  }
}

const updateTodoOrder = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const { updatedOrder } = req.body
  try {
    for (const todo of updatedOrder) {
      await ToDo.findByIdAndUpdate(todo._id, { order: todo.order }, { new: true })
    }
    res.status(200).json({ message: 'Order Completed' })
  } catch (error) {
    next(error)
  }
}

export {
  getAllTodos,
  getTicketToDos,
  createdTodo,
  updateTodo,
  updateTitleToDo,
  deleteTodo,
  deleteCompletedTodos,
  updateTodoOrder
}
