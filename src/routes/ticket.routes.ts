import express from 'express'
import { isAuthenticated } from '../middlewares/verifyToken.middleware'
import { createdTicket } from '../controllers/ticket.conrollers'

const router = express.Router()

router.post('/createdTicket/:projectId', isAuthenticated, createdTicket)

export default router
