import express from 'express';
import { isAuthenticated } from '../middlewares/verifyToken.middleware';
import { checkUserOwner } from '../middlewares/checkUserOwner';
import {
  getAllTodos,
  createdTodo,
  updateTodo,
  updateTitleToDo,
  deleteTodo,
  deleteCompletedTodos,
  updateTodoOrder,
  getTicketToDos,
} from '../controllers/todo.controllers';
import { schemaValidation } from '../middlewares/schemaValidation';
import { createToDoSchema } from '../schemas/todo.schema';

const router = express.Router();

router.get('/:id/getAllTodos', isAuthenticated, checkUserOwner, getAllTodos);
router.get('/:id/:ticketID/getTicketToDos', isAuthenticated, checkUserOwner, getTicketToDos);
router.post('/:id/createdTodo', schemaValidation(createToDoSchema), isAuthenticated, checkUserOwner, createdTodo);
router.put('/:id/updateTodo', isAuthenticated, checkUserOwner, updateTodo);
router.put('/:id/updateTitleToDo', isAuthenticated, checkUserOwner, updateTitleToDo);
router.put('/:id/updateTodoOrder', isAuthenticated, checkUserOwner, updateTodoOrder);
router.delete('/:id/deleteTodo/:todoID', isAuthenticated, checkUserOwner, deleteTodo);
router.delete('/:id/deleteCompletedTodos', isAuthenticated, checkUserOwner, deleteCompletedTodos);

export default router;
