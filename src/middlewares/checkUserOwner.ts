import { type AsyncRequestHandler } from '../controllers/Types/AsyncRequestHandler.Type'

import ToDo from '../models/ToDo.model'
import { type UserPayload } from '../models/User.model'

const checkUserOwner: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const userId = req.payload?._id
  try {
    const checkOuner = await ToDo.find({ owner: userId })
    if (checkOuner.length > 0) {
      next()
    } else {
      res.status(401).json({ errorMessages: ['No eres el dueño de este perfil'] })
    }
  } catch (error) {
    next(error)
  }
}

export { checkUserOwner }
