import express from 'express';
import { createProject, getOneProject, getUserProject } from '../controllers/project.controllers';
import { isAuthenticated } from '../middlewares/verifyToken.middleware';

const router = express.Router();

router.get('/getAllProject', isAuthenticated, getUserProject);
router.post('/createProject', isAuthenticated, createProject);
router.get('/getOneProject/:projectId', getOneProject);
// router.put('/updateProject/:projectId', schemaValidation(updateProjectSchema), updateProject);
// router.put('/updateOrderSates/:projectId', updateOrderSates);
// router.delete('/deleteProject/:projectId', deleteProject);

export default router;
