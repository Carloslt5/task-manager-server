import { type RequestHandler } from 'express'
import ToDo from './../models/ToDo.model'
import type { AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const getAllTodos: AsyncRequestHandler = async (req, res, next) => {
  try {
    const todo = await ToDo.find()
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

const createdTodo: RequestHandler = (req, res, next) => {
  res.json('All good createdTodo')
}

const updateTodo: RequestHandler = (req, res, next) => {
  res.json('All good updateTodo')
}

const deleteTodo: RequestHandler = (req, res, next) => {
  res.json('All good deleteTodo')
}

export {
  getAllTodos,
  createdTodo,
  updateTodo,
  deleteTodo
}
