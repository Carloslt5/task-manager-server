import express from 'express'
import { isAuthenticated } from '../middlewares/verifyToken.middleware'
import { getAllProject, createProject, updateProject, deleteProject } from '../controllers/project.controllers'

const router = express.Router()

router.get('/getAllProject', isAuthenticated, getAllProject)
router.post('/createProject/:kanbanBoardId', isAuthenticated, createProject)
router.put('/updateProject', isAuthenticated, updateProject)
router.delete('/deleteProject/:projectId', isAuthenticated, deleteProject)

export default router
