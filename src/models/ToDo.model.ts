import { type ObjectId, Schema, model } from 'mongoose'
import { type IState } from './State.model'
import { type IProject } from './Project.model'

export interface IToDo {
  title: string
  description: string
  completed: boolean
  projectId: IProject
  state: IState[]
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
    state: {
      type: Schema.Types.ObjectId,
      ref: 'State'
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
