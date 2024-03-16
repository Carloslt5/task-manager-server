import express from 'express';
import authRoutes from './auth.routes';
import projectRoutes from './project.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/project', projectRoutes);

// router.use('/todos', todoRoutes)
// router.use('/kanbanboard', kanbanboard)
// router.use('/state', state)
// router.use('/ticket', ticket)

export default router;
