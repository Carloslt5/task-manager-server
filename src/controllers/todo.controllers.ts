import { type RequestHandler } from 'express'

const getAllTodos: RequestHandler = (req, res, next) => {
  res.json('All good getAllTodos')
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
