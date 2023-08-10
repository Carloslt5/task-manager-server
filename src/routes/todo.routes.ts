import express from 'express'
import { getAllTodos, createdTodo, updateTodo, deleteTodo } from './../controllers/todo.controllers'
import { isAuthenticated } from './../middlewares/verifyToken.middleware'

const router = express.Router()

router.get('/getAllTodos', isAuthenticated, getAllTodos)
router.post('/createdTodo', isAuthenticated, createdTodo)
router.put('/updateTodo', isAuthenticated, updateTodo)
router.delete('/deleteTodo/:_id', isAuthenticated, deleteTodo)

export default router
