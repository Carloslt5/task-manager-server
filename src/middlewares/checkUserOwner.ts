import { type AsyncRequestHandler } from '../controllers/Types/AsyncRequestHandler.Type'
import User, { type UserPayload } from '../models/User.model'

const checkUserOwner: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  const userId = req.payload?._id
  const { id: profileId } = req.params

  if (typeof userId === 'string' && typeof profileId === 'string') {
    try {
      const count = await User.checkOwnerForUser(userId, profileId)
      if (count > 0) {
        next()
      } else {
        res.status(401).json({ errorMessages: ['No eres el dueño de este perfil'] })
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.status(400).json({ errorMessages: ['Parámetros inválidos'] })
  }
}

export { checkUserOwner }
