import { Schema, model, type ObjectId } from 'mongoose'

export interface IBoard {
  title: string
  cards: ObjectId[]
  owner: ObjectId
}

const boardschema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true
    },
    cards: [{
      ref: 'CanvasCard',
      type: Schema.Types.ObjectId
    }],
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId
    }
  }
)

const Board = model<IBoard>('Board', boardschema)

export default Board
