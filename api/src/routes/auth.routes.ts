import express from 'express';
import { signup } from '../controllers/auth.controllers';
import { schemaValidation } from '../middlewares/schemaValidation';
import { signUpSchema } from '../schemas/auth.schema';

const router = express.Router();

router.post('/signup', schemaValidation(signUpSchema), signup);
// router.post('/login', schemaValidation(loginSchema), login);
// router.get('/verify', isAuthenticated, verify);

export default router;
