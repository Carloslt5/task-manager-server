import express from 'express'
import { isAuthenticated } from './../middlewares/verifyToken.middleware'
import { checkUserOwner } from './../middlewares/checkUserOwner'
import { getAllTodos, createdTodo, updateTodo, deleteTodo, deleteCompletedTodos } from './../controllers/todo.controllers'

const router = express.Router()

router.get('/getAllTodos', isAuthenticated, checkUserOwner, getAllTodos)
router.post('/createdTodo', isAuthenticated, checkUserOwner, createdTodo)
router.put('/updateTodo', isAuthenticated, checkUserOwner, updateTodo)
router.delete('/deleteTodo/:_id', isAuthenticated, checkUserOwner, deleteTodo)
router.delete('/deleteCompletedTodos', isAuthenticated, checkUserOwner, deleteCompletedTodos)

export default router
