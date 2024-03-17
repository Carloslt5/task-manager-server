import express from 'express';
import { login, signup, verify } from '../controllers/auth.controllers';
import { requireAuth } from '../middlewares/requireAuth';
import { schemaValidation } from '../middlewares/schemaValidation';
import { LoginDataType, SignupDataType } from '../schemas/user.type';

const router = express.Router();

router.post('/signup', schemaValidation(SignupDataType), signup);
router.post('/login', schemaValidation(LoginDataType), login);
router.get('/verify', requireAuth, verify);

export default router;
