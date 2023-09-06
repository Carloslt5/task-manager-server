import express from 'express'
import { isAuthenticated } from '../middlewares/verifyToken.middleware'
import { getTicket, createdTicket, updateStateTicket } from '../controllers/ticket.conrollers'

const router = express.Router()

router.get('/getTicket/:projectId', isAuthenticated, getTicket)
router.post('/createdTicket/:projectId', isAuthenticated, createdTicket)
router.put('/updateStateTicket', isAuthenticated, updateStateTicket)

export default router
