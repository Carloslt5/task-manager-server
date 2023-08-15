import User from '../models/User.model'
import { type AsyncRequestHandler } from '../controllers/Types/AsyncRequestHandler.Type'

const checkUserOwner: AsyncRequestHandler = async (req, res, next) => {
  try {
    const { _id: userId } = req.payload
    const { id: profileId } = req.params

    const count = await User.checkOwnerForUser(userId, profileId)

    if (count === 0) {
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
