import { type NextFunction, type Response } from 'express'
import ToDo from '../models/ToDo.model'
import { type CustomRequest } from '../controllers/Types/AsyncRequestHandler.Type'

const checkUserOwner = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const { _id: userId } = req.payload
  try {
    const checkOuner = await ToDo.find({ owner: userId })

    if (checkOuner.length > 0) {
      next()
    } else {
      res.status(401).json({ errorMessages: ['No eres el dueño de este perfil'] })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ errorMessages: ['Error interno del servidor'] })
  }
}

export { checkUserOwner }
