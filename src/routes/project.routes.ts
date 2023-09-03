import express from 'express'
import { isAuthenticated } from '../middlewares/verifyToken.middleware'
import { getAllProject, getOneProject, createProject, updateProject, deleteProject } from '../controllers/project.controllers'

const router = express.Router()

router.get('/getAllProject', isAuthenticated, getAllProject)
router.get('/getOneProject/:projectId', isAuthenticated, getOneProject)
router.post('/createProject/:kanbanBoardId', isAuthenticated, createProject)
router.put('/updateProject/:projectId', isAuthenticated, updateProject)
router.delete('/deleteProject/:projectId', isAuthenticated, deleteProject)

export default router
