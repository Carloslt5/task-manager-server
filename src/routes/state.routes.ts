import express from 'express'
import { getStates, createState, editState, deleteState } from '../controllers/state.controllers'

const router = express.Router()

router.get('/getStates/:projectId', getStates)
router.post('/createState/:projectId', createState)
router.put('/editState', editState)
router.delete('/deleteState/:stateId', deleteState)

export default router
