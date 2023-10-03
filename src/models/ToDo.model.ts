import { type ObjectId, Schema, model } from 'mongoose'
import { type IProject } from './Project.model'
import { type ITicket } from './Ticket.model'

export interface IToDo extends Document {
  title: string
  description: string
  completed: boolean
  projectId: IProject
  ticket: ITicket
  owner: ObjectId
  order: number
}

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    order: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)
const ToDo = model<IToDo>('ToDo', todoSchema)

export default ToDo
