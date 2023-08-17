import express from 'express'
import { getAllBoards, createBoard, updateBoard, addParticipants, deleteBoard } from './../controllers/board.controllers'
import { isAuthenticated } from '../middlewares/verifyToken.middleware'
const router = express.Router()

router.get('/getAllBoards', isAuthenticated, getAllBoards)
router.post('/createBoard', isAuthenticated, createBoard)
router.put('/updateBoard', isAuthenticated, updateBoard)
router.put('/addParticipants', isAuthenticated, addParticipants)
router.delete('/deleteBoard/:_id', isAuthenticated, deleteBoard)

export default router
