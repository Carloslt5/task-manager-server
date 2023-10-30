import express from 'express'
import { getStates, createState, editState, deleteState } from '../controllers/state.controllers'
import { schemaValidation } from '../middlewares/schemaValidation'
import { createStateSchema } from '../schemas/state.schema'

const router = express.Router()

router.get('/getStates/:projectId', getStates)
router.post('/createState/:projectId', schemaValidation(createStateSchema), createState)
router.put('/editState', editState)
router.delete('/deleteState/:stateId', deleteState)

export default router
