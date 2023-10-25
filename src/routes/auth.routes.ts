import express from 'express'
import { signup, login, verify } from '../controllers/auth.controllers'
import { isAuthenticated } from '../middlewares/verifyToken.middleware'
import { schemaValidation } from '../middlewares/schemaValidation'
import { signUpSchema } from '../schemas/auth.schema'

const router = express.Router()

router.post('/signup', schemaValidation(signUpSchema), signup)
router.post('/login', login)
router.get('/verify', isAuthenticated, verify)

export default router
