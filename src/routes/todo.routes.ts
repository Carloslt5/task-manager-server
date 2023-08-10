import express from 'express'
import { getAllTodos, createdTodo, updateTodo, deleteTodo } from './../controllers/todo.controllers'
import { isAuthenticated } from './../middlewares/verifyToken.middleware'

const router = express.Router()

router.get('/getAllTodos', getAllTodos)
router.post('/createdTodo', isAuthenticated, createdTodo)
router.put('/updateTodo', updateTodo)
router.delete('/deleteTodo/:_id', deleteTodo)

export default router
