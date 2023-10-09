import express from 'express'
import { isAuthenticated } from '../middlewares/verifyToken.middleware'
import { getTicket, createdTicket, updateTicketDetails, updateStateTicket, deleteTicket } from '../controllers/ticket.conrollers'

const router = express.Router()

router.get('/getTicket/:projectId', isAuthenticated, getTicket)
router.post('/createdTicket/:projectId', isAuthenticated, createdTicket)
router.put('/updateTicketDetails/:ticketID', isAuthenticated, updateTicketDetails)
router.put('/updateStateTicket', isAuthenticated, updateStateTicket)
router.delete('/deleteTicket/:ticketId', isAuthenticated, deleteTicket)

export default router
