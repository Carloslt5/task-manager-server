import express from 'express'
import todoRoutes from './todo.routes'
import authRoutes from './auth.routes'

const router = express.Router()

router.use('/todos', todoRoutes)
router.use('/auth', authRoutes)

export default router
