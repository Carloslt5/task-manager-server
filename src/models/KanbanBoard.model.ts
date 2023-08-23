import { Schema, model, type ObjectId } from 'mongoose'

export interface IKanbanBoard {
  boardId: ObjectId[]
  title: string
  order: number
  project: ObjectId[]
  archived: boolean
}

const kanbanboardschema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true
    },
    project: [{
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }],
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }
)

const Kanbanboard = model<IKanbanBoard>('Kanbanboard', kanbanboardschema)

export default Kanbanboard
