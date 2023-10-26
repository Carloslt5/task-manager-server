import express from 'express'
import { isAuthenticated } from '../middlewares/verifyToken.middleware'
import { getAllProject, getOneProject, createProject, updateProject, updateOrderSates, deleteProject } from '../controllers/project.controllers'
import { schemaValidation } from '../middlewares/schemaValidation'
import { projectSchema, updateProjectSchema } from '../schemas/project.schema'

const router = express.Router()

router.get('/getAllProject', isAuthenticated, getAllProject)
router.get('/getOneProject/:projectId', isAuthenticated, getOneProject)
router.post('/createProject/:kanbanBoardId', schemaValidation(projectSchema), isAuthenticated, createProject)
router.put('/updateProject/:projectId', schemaValidation(updateProjectSchema), isAuthenticated, updateProject)
router.put('/updateOrderSates/:projectId', isAuthenticated, updateOrderSates)
router.delete('/deleteProject/:projectId', isAuthenticated, deleteProject)

export default router
