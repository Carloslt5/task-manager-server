import express from 'express'
import { getKanbanBoard, createKanbanBoard, updateKanbanBoard, addProjectToKanban, deleteKanbanBoard } from '../controllers/kanban.controllers'
import { isAuthenticated } from '../middlewares/verifyToken.middleware'
const router = express.Router()

router.get('/getKanbanBoard', isAuthenticated, getKanbanBoard)
router.post('/createKanbanBoard', isAuthenticated, createKanbanBoard)
router.put('/updateKanbanBoard/:KanbanBoardId', isAuthenticated, updateKanbanBoard)
router.put('/addProjectToKanban/:KanbanBoardId', isAuthenticated, addProjectToKanban)
router.delete('/deleteKanbanBoard/:KanbanBoardId', isAuthenticated, deleteKanbanBoard)

export default router
