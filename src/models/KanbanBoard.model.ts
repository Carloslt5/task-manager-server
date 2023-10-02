import { Schema, model, type ObjectId } from 'mongoose'
import { type IProject } from './Project.model'

export interface IKanbanBoard extends Document {
  title: string
  project: IProject[]
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
