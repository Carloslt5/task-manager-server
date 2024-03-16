import express, { Request, Response } from 'express';
import { login, signup, verify } from '../controllers/auth.controllers';
import { schemaValidation } from '../middlewares/schemaValidation';
import { isAuthenticated } from '../middlewares/verifyToken.middleware';
import { LoginDataType, SignupDataType } from '../schemas/user.type';

const router = express.Router();

router.post('/signup', schemaValidation(SignupDataType), signup);
router.post('/login', schemaValidation(LoginDataType), login);
router.get('/verify', isAuthenticated, verify);
router.get('/test', (req: Request, res: Response) => {
  res.json('HOLIS ');
});

export default router;
