import express from 'express'
import todoRoutes from './todo.routes'
import authRoutes from './auth.routes'
import projectRoutes from './project.routes'
import kanbanboard from './kanbanboard.routes'

const router = express.Router()

router.use('/todos', todoRoutes)
router.use('/auth', authRoutes)
router.use('/project', projectRoutes)
router.use('/kanbanboard', kanbanboard)

export default router
