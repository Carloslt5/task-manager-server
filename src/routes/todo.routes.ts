import express from 'express'
import { isAuthenticated } from './../middlewares/verifyToken.middleware'
import { checkUserOwner } from './../middlewares/checkUserOwner'
import { getAllTodos, createdTodo, updateTodo, deleteTodo, deleteCompletedTodos, updateTodoOrder } from './../controllers/todo.controllers'

const router = express.Router()

router.get('/:id/getAllTodos', isAuthenticated, checkUserOwner, getAllTodos)
router.post('/:id/createdTodo', isAuthenticated, checkUserOwner, createdTodo)
router.put('/:id/updateTodo', isAuthenticated, checkUserOwner, updateTodo)
router.put('/:id/updateTodoOrder', isAuthenticated, checkUserOwner, updateTodoOrder)
router.delete('/:id/deleteTodo/:_id', isAuthenticated, checkUserOwner, deleteTodo)
router.delete('/:id/deleteCompletedTodos', isAuthenticated, checkUserOwner, deleteCompletedTodos)

export default router
