import express from 'express'
import { getAllTodos, createdTodo, updateTodo, deleteTodo } from './../controllers/todo.controllers'

const router = express.Router()

router.get('/getAllTodos', getAllTodos)
router.post('/createdTodo', createdTodo)
router.put('/updateTodo', updateTodo)
router.delete('/deleteTodo/:_id', deleteTodo)

export default router
