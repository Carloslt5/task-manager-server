import express from 'express'
import { isAuthenticated } from '../middlewares/verifyToken.middleware'
import { getAllProject, createProject, updateProject, deleteProject } from '../controllers/board.controllers'

const router = express.Router()

router.get('/getAllProject', isAuthenticated, getAllProject)
router.post('/createProject', isAuthenticated, createProject)
router.put('/updateProject', isAuthenticated, updateProject)
router.delete('/deleteProject/:projectId', isAuthenticated, deleteProject)

export default router
