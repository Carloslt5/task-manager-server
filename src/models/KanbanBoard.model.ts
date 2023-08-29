import { Schema, model, type ObjectId } from 'mongoose'
import { type IProject } from './Project.model'

export interface IKanbanBoard {
  title: string
  project: IProject[]
  completed: boolean
  owner: ObjectId
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
  },
  {
    timestamps: true
  }
)

const Kanbanboard = model<IKanbanBoard>('Kanbanboard', kanbanboardschema)

export default Kanbanboard
