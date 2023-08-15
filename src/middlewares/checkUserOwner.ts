import { type AsyncRequestHandler } from '../controllers/Types/AsyncRequestHandler.Type'
import ToDo from '../models/ToDo.model'

const checkUserOwner: AsyncRequestHandler = async (req, res, next) => {
  try {
    const { _id: userId } = req.payload
    const checkOuner = await ToDo.find({ owner: userId })

    if (checkOuner.length > 0) {
      console.log(checkOuner)
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