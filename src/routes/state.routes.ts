import express from 'express'
import { getStates, createState } from '../controllers/state.controllers'

const router = express.Router()

router.get('/getStates/:projectId', getStates)
router.post('/createState/:projectId', createState)

export default router
