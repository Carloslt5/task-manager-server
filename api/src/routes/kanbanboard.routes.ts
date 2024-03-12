import express from 'express'
import { isAuthenticated } from '../middlewares/verifyToken.middleware'
import { getKanbanBoard, getOneKanbanBoard, createKanbanBoard, updateKanbanBoard, deleteKanbanBoard } from '../controllers/kanban.controllers'
import { createKanbanSchema, kanbanSchema } from '../schemas/kanban.schema'
import { schemaValidation } from '../middlewares/schemaValidation'

const router = express.Router()

router.get('/getKanbanBoard', isAuthenticated, getKanbanBoard)
router.get('/getOneKanbanBoard/:kanbanBoardId', isAuthenticated, getOneKanbanBoard)
router.post('/createKanbanBoard', schemaValidation(createKanbanSchema), isAuthenticated, createKanbanBoard)
router.put('/updateKanbanBoard/:kanbanBoardId', schemaValidation(kanbanSchema), isAuthenticated, updateKanbanBoard)
router.delete('/deleteKanbanBoard/:kanbanBoardId', isAuthenticated, deleteKanbanBoard)

export default router
