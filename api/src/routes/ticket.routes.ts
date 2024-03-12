import express from 'express';
import { isAuthenticated } from '../middlewares/verifyToken.middleware';
import {
  getTicket,
  createdTicket,
  updateTicketDetails,
  updateStateTicket,
  deleteTicket,
} from '../controllers/ticket.conrollers';
import { schemaValidation } from '../middlewares/schemaValidation';
import { createTicketSchema, updateTicketSchema } from '../schemas/ticket.schema';

const router = express.Router();

router.get('/getTicket/:projectId', isAuthenticated, getTicket);
router.post('/createdTicket/:projectId', schemaValidation(createTicketSchema), isAuthenticated, createdTicket);
router.put(
  '/updateTicketDetails/:ticketID',
  schemaValidation(updateTicketSchema),
  isAuthenticated,
  updateTicketDetails,
);
router.put('/updateStateTicket', isAuthenticated, updateStateTicket);
router.delete('/deleteTicket/:ticketId', isAuthenticated, deleteTicket);

export default router;
