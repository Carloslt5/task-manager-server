import express from 'express'
import { signup, login, verify, testController } from '../controllers/auth.controllers'
import { isAuthenticated } from '../middlewares/verifyToken.middleware'
import { schemaValidation } from '../middlewares/schemaValidation'
import { loginSchema, signUpSchema } from '../schemas/auth.schema'

const router = express.Router()

router.post('/signup', schemaValidation(signUpSchema), signup)
router.post('/login', schemaValidation(loginSchema), login)
router.get('/verify', isAuthenticated, verify)
router.get('/test', testController)

export default router
