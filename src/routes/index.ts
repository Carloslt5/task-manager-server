import express from 'express'
import todoRoutes from './todo.routes'

const router = express.Router()

router.use('/', todoRoutes)

export default router
