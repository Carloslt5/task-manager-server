import express from 'express'
import todoRoutes from './todo.routes'
import authRoutes from './auth.routes'
import boardsRoutes from './boards.routes'
import kanbancards from './kanbancards.routes'

const router = express.Router()

router.use('/todos', todoRoutes)
router.use('/auth', authRoutes)
router.use('/boards', boardsRoutes)
router.use('/kanbancards', kanbancards)

export default router
