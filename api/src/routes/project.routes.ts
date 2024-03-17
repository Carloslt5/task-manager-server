import express from 'express';
import { createProject, getOneProject, getUserProject } from '../controllers/project.controllers';
import { requireAuth } from '../middlewares/requireAuth';

const router = express.Router();

router.get('/getAllProject', requireAuth, getUserProject);
router.post('/createProject', requireAuth, createProject);
router.get('/getOneProject/:projectId', getOneProject);
// router.put('/updateProject/:projectId', schemaValidation(updateProjectSchema), updateProject);
// router.put('/updateOrderSates/:projectId', updateOrderSates);
// router.delete('/deleteProject/:projectId', deleteProject);

export default router;
