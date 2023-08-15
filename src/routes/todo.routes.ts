import express from 'express'
import { getAllTodos, createdTodo, updateTodo, deleteTodo } from './../controllers/todo.controllers'
import { isAuthenticated } from './../middlewares/verifyToken.middleware'
import { checkUserOwner } from './../middlewares/checkUserOwner'

const router = express.Router()

router.get('/getAllTodos', isAuthenticated, checkUserOwner, getAllTodos)
router.post('/createdTodo', isAuthenticated, checkUserOwner, createdTodo)
router.put('/updateTodo', isAuthenticated, checkUserOwner, updateTodo)
router.delete('/deleteTodo/:_id', isAuthenticated, checkUserOwner, deleteTodo)

export default router
