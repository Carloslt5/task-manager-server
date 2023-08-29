import { type AsyncRequestHandler } from '../controllers/Types/AsyncRequestHandler.Type'
import { type UserPayload } from '../models/User.model'
import ToDo from '../models/ToDo.model'

const checkUserOwner: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const userId = req.payload?._id
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
