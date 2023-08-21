import { Schema, model, type ObjectId } from 'mongoose'

export interface IKanbanCard {
  boardId: ObjectId[]
  title: string
  order: number
  project: ObjectId[]
  archived: boolean
}

const kanbanboardschema = new Schema(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'Board'
    },
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true
    },
    project: [{
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }],
    archived: {
      type: Boolean,
      default: false
    }
  }
)

const Kanbanboard = model('Kanbanboard', kanbanboardschema)

export default Kanbanboard
