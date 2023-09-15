import { type ObjectId, Schema, model } from 'mongoose'
import { type IProject } from './Project.model'
import { type IState } from './State.model'

export interface ITicket {
  title: string
  completed: boolean
  projectId: IProject
  state: IState
  owner: ObjectId
}

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
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
    }
  },
  {
    timestamps: true
  }
)
const Ticket = model<ITicket>('Ticket', ticketSchema)

export default Ticket
