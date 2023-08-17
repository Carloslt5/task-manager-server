import Board from '../models/Board.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const getAllBoards: AsyncRequestHandler = async (req, res, next) => {
  const { _id } = req.payload

  try {
    const boards = await Board.find({ owner: _id })
    res.status(200).json({ boards })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const createBoard: AsyncRequestHandler = async (req, res, next) => {
  const { title } = req.body
  const { _id } = req.payload

  try {
    const board = await Board.create({ title, owner: _id })
    res.status(200).json({ board })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const updateBoard: AsyncRequestHandler = async (req, res, next) => {
  const { _id, title } = req.body

  try {
    const board = await Board.findByIdAndUpdate(_id, { title }, { new: true })
    res.status(200).json({ board })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}
const addMembers: AsyncRequestHandler = async (req, res, next) => {
  res.json('añadiendo un participante')
}

const deleteBoard: AsyncRequestHandler = async (req, res, next) => {
  const { _id } = req.params
  try {
    await Board.findByIdAndRemove(_id)
    res.status(200).json({ message: 'Board is deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}
export {
  getAllBoards,
  createBoard,
  updateBoard,
  addMembers,
  deleteBoard
}
