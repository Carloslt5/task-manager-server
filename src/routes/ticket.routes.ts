import express from 'express'
import { isAuthenticated } from '../middlewares/verifyToken.middleware'
import { getTicket, createdTicket, updateTickettTitle, updateStateTicket, deleteTicket } from '../controllers/ticket.conrollers'

const router = express.Router()

router.get('/getTicket/:projectId', isAuthenticated, getTicket)
router.post('/createdTicket/:projectId', isAuthenticated, createdTicket)
router.put('/updateTickettTitle/:ticketID', isAuthenticated, updateTickettTitle)
router.put('/updateStateTicket', isAuthenticated, updateStateTicket)
router.delete('/deleteTicket/:ticketId', isAuthenticated, deleteTicket)

export default router
