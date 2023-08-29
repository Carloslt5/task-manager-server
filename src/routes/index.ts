import express from 'express'
import todoRoutes from './todo.routes'
import authRoutes from './auth.routes'
// import projectRoutes from './project.routes'
// import kanbanboard from './kanbanboard.routes'
// import state from './state.routes'
// import ticket from './ticket.routes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/todos', todoRoutes)
// router.use('/project', projectRoutes)
// router.use('/kanbanboard', kanbanboard)
// router.use('/state', state)
// router.use('/ticket', ticket)

export default router
